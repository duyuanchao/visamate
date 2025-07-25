import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { createClient } from "@supabase/supabase-js";
import * as kv from "./kv_store"; // 假设你的 kv_store.tsx 文件路径没变

const app = new Hono();

// Middleware
app.use('*', cors({
  origin: '*',
  allowHeaders: ['*'],
  allowMethods: ['*'],
}));
app.use('*', logger(console.log));

// Supabase client with service role for admin operations
const supabaseAdmin = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Supabase client with anon key for user operations
const supabaseAnon = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!
);

// Health check endpoint
app.get('/make-server-54a8f580/health', async (c) => {
  console.log('Health check request received');
  try {
    const testKey = 'health-check-test';
    const testValue = { timestamp: new Date().toISOString() };
    await kv.set(testKey, testValue);
    const retrievedValue = await kv.get(testKey);

    if (!retrievedValue) {
      throw new Error('KV store test failed');
    }

    console.log('Health check passed - KV store working');

    return c.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        kvStore: 'ok',
        server: 'ok'
      }
    });
  } catch (error: any) {
    console.log('Health check failed:', error);
    return c.json({
      status: 'error',
      timestamp: new Date().toISOString(),
      error: error.message
    }, 500);
  }
});

// Test endpoint for debugging
app.get('/make-server-54a8f580/test', async (c) => {
  console.log('Test endpoint called');
  console.log('Request headers:', Object.fromEntries(c.req.raw.headers.entries()));

  return c.json({
    message: 'Server is working',
    timestamp: new Date().toISOString(),
    environment: {
      supabaseUrl: process.env.SUPABASE_URL ? 'set' : 'not set',
      supabaseAnonKey: process.env.SUPABASE_ANON_KEY ? 'set' : 'not set',
      supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'set' : 'not set',
    }
  });
});

// Middleware to extract user from token
const authMiddleware = async (c: any, next: any) => {
  const authHeader = c.req.header('Authorization');
  if (!authHeader) {
    return c.json({ error: 'Authorization header required' }, 401);
  }

  const token = authHeader.replace('Bearer ', '');
  if (!token) {
    return c.json({ error: 'Invalid authorization token' }, 401);
  }

  try {
    // Handle demo tokens for development/testing
    if (token.includes('demo-token-')) {
      const userId = token.split('-')[2] || 'user123';
      c.set('userId', userId);
      c.set('token', token);
      c.set('user', { id: userId, email: `${userId}@demo.com` });
      console.log('Demo token authenticated for user:', userId);
      await next();
      return;
    }

    // Validate real Supabase JWT tokens
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);
    
    if (error || !user) {
      console.error('JWT validation failed:', error?.message || 'No user found');
      return c.json({ error: 'Invalid token', details: error?.message }, 401);
    }

    // Set user info in context
    c.set('userId', user.id);
    c.set('user', user);
    c.set('token', token);
    console.log('JWT token authenticated for user:', user.email, user.id);
    
  } catch (error) {
    console.error('Token validation error:', error);
    return c.json({ error: 'Token validation failed' }, 401);
  }

  await next();
};

// File upload endpoint
app.post('/make-server-54a8f580/upload/file', authMiddleware, async (c: any) => {
  try {
    const userId = c.get('userId');
    console.log('File upload request from user:', userId);

    // Parse form data
    const formData = await c.req.formData();
    const file = formData.get('file') as File;
    const fileId = formData.get('fileId') as string;

    if (!file || !fileId) {
      return c.json({ error: 'File and fileId are required' }, 400);
    }

    // Validate file type and size
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
    if (!allowedTypes.includes(file.type)) {
      return c.json({ error: 'Invalid file type. Only PDF, JPG, and PNG are allowed.' }, 400);
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return c.json({ error: 'File size must be less than 10MB' }, 400);
    }

    // Convert file to base64 for storage (in a real app, you'd use cloud storage)
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);
    
    // Convert to base64 in a more memory-efficient way
    let binary = '';
    const len = uint8Array.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    const base64 = btoa(binary);

    // Create file record
    const fileRecord = {
      id: fileId,
      userId: userId,
      name: file.name,
      size: file.size,
      type: file.type,
      content: base64, // In production, store in cloud storage and save URL
      uploadedAt: new Date().toISOString(),
      status: 'uploaded',
      ocrStatus: 'pending'
    };

    // Store file in KV store with atomic operation
    const fileKey = `user_file_${userId}_${fileId}`;
    const userFilesKey = `user_files_${userId}`;
    
    try {
      // Store individual file record
      await kv.set(fileKey, fileRecord);
      console.log('File record stored successfully:', fileKey);

      // Update user's file list atomically
      const existingFiles = await kv.get(userFilesKey) || { files: [] };
      
      // Check if file already exists in the list to avoid duplicates
      const fileExists = existingFiles.files.some((f: any) => f.id === fileId);
      
      if (!fileExists) {
        existingFiles.files.push({
          id: fileId,
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: fileRecord.uploadedAt,
          status: 'uploaded',
          ocrStatus: 'pending'
        });
        
        await kv.set(userFilesKey, existingFiles);
        console.log('User file list updated successfully:', userFilesKey);
      } else {
        console.log('File already exists in user file list:', fileId);
      }
    } catch (storageError) {
      console.error('Error storing file data:', storageError);
      // If file list update fails, clean up the individual file record
      try {
        await kv.del(fileKey);
      } catch (cleanupError) {
        console.error('Error cleaning up file record:', cleanupError);
      }
      throw new Error('Failed to store file data in database');
    }

    console.log('File uploaded successfully:', fileId);

    return c.json({
      success: true,
      fileId: fileId,
      fileUrl: `data:${file.type};base64,${base64}`, // In production, return cloud storage URL
      message: 'File uploaded successfully'
    });

  } catch (error: any) {
    console.error('File upload error:', error);
    return c.json({ 
      error: 'Upload failed', 
      details: error.message 
    }, 500);
  }
});

// OCR processing endpoint
app.post('/make-server-54a8f580/ocr/process', authMiddleware, async (c: any) => {
  try {
    const userId = c.get('userId');
    const { fileId, fileUrl } = await c.req.json();

    console.log('OCR processing request for file:', fileId);

    // Simulate OCR processing (in a real app, integrate with OCR service)
    await new Promise(resolve => setTimeout(resolve, 2000));

    const extractedData = [
      'Document Type: Immigration Document',
      'Date Fields: Found 3 date entries',
      'Text Content: Successfully extracted and analyzed',
      'Compliance Check: Passed initial validation',
      'Quality Score: 95/100'
    ];

    // Update file record and user file list atomically
    const fileKey = `user_file_${userId}_${fileId}`;
    const userFilesKey = `user_files_${userId}`;
    
    try {
      // Update individual file record
      const fileRecord = await kv.get(fileKey);
      
      if (!fileRecord) {
        throw new Error(`File record not found: ${fileId}`);
      }
      
      fileRecord.ocrStatus = 'completed';
      fileRecord.extractedData = extractedData;
      fileRecord.processedAt = new Date().toISOString();
      
      await kv.set(fileKey, fileRecord);
      console.log('File record updated with OCR results:', fileKey);

      // Update user's file list
      const userFiles = await kv.get(userFilesKey);
      if (userFiles && userFiles.files) {
        const fileIndex = userFiles.files.findIndex((f: any) => f.id === fileId);
        if (fileIndex >= 0) {
          userFiles.files[fileIndex].ocrStatus = 'completed';
          userFiles.files[fileIndex].extractedData = extractedData;
          userFiles.files[fileIndex].processedAt = new Date().toISOString();
          
          await kv.set(userFilesKey, userFiles);
          console.log('User file list updated with OCR results:', userFilesKey);
        } else {
          console.warn(`File not found in user file list: ${fileId}`);
        }
      } else {
        console.warn('User file list not found or empty');
      }
    } catch (updateError) {
      console.error('Error updating file with OCR results:', updateError);
      throw new Error(`Failed to update file with OCR results: ${updateError.message}`);
    }

    console.log('OCR processing completed for file:', fileId);

    return c.json({
      success: true,
      extractedData: extractedData,
      message: 'OCR processing completed'
    });

  } catch (error: any) {
    console.error('OCR processing error:', error);
    return c.json({ 
      error: 'OCR processing failed', 
      details: error.message 
    }, 500);
  }
});

// Get user's files
app.get('/make-server-54a8f580/user/files', authMiddleware, async (c: any) => {
  try {
    const userId = c.get('userId');
    console.log('===== GET USER FILES DEBUG =====');
    console.log('Get user files request from:', userId);
    console.log('Request time:', new Date().toISOString());

    const userFilesKey = `user_files_${userId}`;
    console.log('Looking for user files with key:', userFilesKey);
    
    const userFiles = await kv.get(userFilesKey);
    console.log('Raw user files data from KV store:', JSON.stringify(userFiles, null, 2));

    const files = userFiles?.files || [];
    console.log(`Found ${files.length} files in user file list`);

    // Enrich files with full data for display
    const enrichedFiles = await Promise.all(
      files.map(async (file: any, index: number) => {
        console.log(`Processing file ${index + 1}/${files.length}: ${file.name} (${file.id})`);
        
        const fileKey = `user_file_${userId}_${file.id}`;
        const fullFileRecord = await kv.get(fileKey);
        
        console.log(`Full file record for ${file.id}:`, fullFileRecord ? 'Found' : 'Not found');
        
        const enrichedFile = {
          id: file.id,
          name: file.name,
          size: file.size,
          type: file.type,
          uploadedAt: file.uploadedAt,
          ocrStatus: file.ocrStatus || 'pending',
          extractedData: file.extractedData || [],
          fileUrl: fullFileRecord?.content ? `data:${file.type};base64,${fullFileRecord.content}` : null,
          processedAt: file.processedAt
        };
        
        console.log(`Enriched file ${file.id}:`, JSON.stringify(enrichedFile, null, 2));
        return enrichedFile;
      })
    );

    console.log('===== FINAL RESPONSE =====');
    console.log(`Returning ${enrichedFiles.length} enriched files`);
    console.log('Response:', JSON.stringify({ success: true, files: enrichedFiles }, null, 2));
    console.log('===== END DEBUG =====');

    return c.json({
      success: true,
      files: enrichedFiles,
      debug: {
        userId,
        userFilesKey,
        rawFileCount: files.length,
        enrichedFileCount: enrichedFiles.length,
        timestamp: new Date().toISOString()
      }
    });

  } catch (error: any) {
    console.error('Error getting user files:', error);
    console.error('Error stack:', error.stack);
    return c.json({ 
      error: 'Failed to get files', 
      details: error.message 
    }, 500);
  }
});

// Save file record to user profile
app.post('/make-server-54a8f580/user/files', authMiddleware, async (c: any) => {
  try {
    const userId = c.get('userId');
    const { fileId, name, fileUrl, extractedData } = await c.req.json();

    console.log('Save file record request:', { fileId, name });

    // This endpoint is called after successful OCR processing
    // The file should already be saved, this is just for confirmation
    const fileKey = `user_file_${userId}_${fileId}`;
    const fileRecord = await kv.get(fileKey);
    
    if (fileRecord) {
      fileRecord.finalProcessedAt = new Date().toISOString();
      await kv.set(fileKey, fileRecord);
    }

    return c.json({
      success: true,
      message: 'File record saved successfully'
    });

  } catch (error: any) {
    console.error('Error saving file record:', error);
    return c.json({ 
      error: 'Failed to save file record', 
      details: error.message 
    }, 500);
  }
});

// Delete user's file
app.delete('/make-server-54a8f580/user/files/:fileId', authMiddleware, async (c: any) => {
  try {
    const userId = c.get('userId');
    const fileId = c.req.param('fileId');

    console.log('Delete file request:', { userId, fileId });

    // Delete file record
    const fileKey = `user_file_${userId}_${fileId}`;
    await kv.del(fileKey);

    // Update user's file list
    const userFilesKey = `user_files_${userId}`;
    const userFiles = await kv.get(userFilesKey);
    if (userFiles && userFiles.files) {
      userFiles.files = userFiles.files.filter((f: any) => f.id !== fileId);
      await kv.set(userFilesKey, userFiles);
    }

    return c.json({
      success: true,
      message: 'File deleted successfully'
    });

  } catch (error: any) {
    console.error('Error deleting file:', error);
    return c.json({ 
      error: 'Failed to delete file', 
      details: error.message 
    }, 500);
  }
});

// User profile endpoint (for compatibility)
app.get('/make-server-54a8f580/user/profile', authMiddleware, async (c: any) => {
  try {
    const userId = c.get('userId');
    const token = c.get('token');

    // Get user files count for display
    const userFilesKey = `user_files_${userId}`;
    const userFiles = await kv.get(userFilesKey);
    const documentsUploaded = userFiles?.files?.length || 0;

    // Calculate RFE risk based on uploaded documents (simplified)
    const rfeRisk = Math.max(0, 75 - (documentsUploaded * 15));

    const user = {
      userId: userId,
      email: token.includes('demo-token-') ? `user${userId.split('-')[1]}@example.com` : 'user@example.com',
      firstName: 'Demo',
      lastName: 'User',
      visaCategory: 'EB-1A',
      caseStatus: 'In Preparation',
      documentsUploaded: documentsUploaded,
      rfeRisk: Math.min(rfeRisk, 100)
    };

    return c.json({
      success: true,
      user: user
    });

  } catch (error: any) {
    console.error('Error getting user profile:', error);
    return c.json({ 
      error: 'Failed to get user profile', 
      details: error.message 
    }, 500);
  }
});

// User timeline endpoint (for compatibility)
app.get('/make-server-54a8f580/user/timeline', authMiddleware, async (c: any) => {
  try {
    const userId = c.get('userId');

    // Get user files for timeline
    const userFilesKey = `user_files_${userId}`;
    const userFiles = await kv.get(userFilesKey);
    const files = userFiles?.files || [];

    const timeline = [
      {
        id: 'account-created',
        title: 'Account Created',
        description: 'Successfully created your VisaMate account',
        status: 'completed',
        date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        type: 'milestone'
      },
      ...files.map((file: any, index: number) => ({
        id: `file-${file.id}`,
        title: `Document Uploaded: ${file.name}`,
        description: `Successfully uploaded and processed ${file.name}`,
        status: file.ocrStatus === 'completed' ? 'completed' : 'pending',
        date: file.uploadedAt,
        type: 'document'
      }))
    ];

    return c.json({
      success: true,
      timeline: timeline.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    });

  } catch (error: any) {
    console.error('Error getting user timeline:', error);
    return c.json({ 
      error: 'Failed to get user timeline', 
      details: error.message 
    }, 500);
  }
});

// User checklist endpoint (for compatibility)
app.get('/make-server-54a8f580/user/checklist', authMiddleware, async (c: any) => {
  try {
    const userId = c.get('userId');

    // Get user files for checklist
    const userFilesKey = `user_files_${userId}`;
    const userFiles = await kv.get(userFilesKey);
    const files = userFiles?.files || [];

    const checklist = [
      {
        id: 'personal-documents',
        title: 'Personal Documents',
        items: [
          {
            id: 'passport',
            title: 'Valid Passport',
            completed: files.some((f: any) => f.name.toLowerCase().includes('passport')),
            required: true
          },
          {
            id: 'birth-certificate',
            title: 'Birth Certificate',
            completed: files.some((f: any) => f.name.toLowerCase().includes('birth')),
            required: true
          }
        ]
      },
      {
        id: 'professional-documents',
        title: 'Professional Documents',
        items: [
          {
            id: 'resume',
            title: 'Updated Resume/CV',
            completed: files.some((f: any) => f.name.toLowerCase().includes('resume') || f.name.toLowerCase().includes('cv')),
            required: true
          },
          {
            id: 'recommendation-letters',
            title: 'Recommendation Letters',
            completed: files.some((f: any) => f.name.toLowerCase().includes('letter') || f.name.toLowerCase().includes('recommendation')),
            required: true
          }
        ]
      }
    ];

    return c.json({
      success: true,
      checklist: checklist
    });

  } catch (error: any) {
    console.error('Error getting user checklist:', error);
    return c.json({ 
      error: 'Failed to get user checklist', 
      details: error.message 
    }, 500);
  }
});

// ...（后面所有业务路由都可以保持不变）

// Start the server (for Node.js/Egde, use app.fetch; for Express use app.requestListener)
export default app;
