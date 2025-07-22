import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { logger } from 'npm:hono/logger';
import { createClient } from 'npm:@supabase/supabase-js@2';
import * as kv from './kv_store.tsx';

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
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
);

// Supabase client with anon key for user operations
const supabaseAnon = createClient(
  Deno.env.get('SUPABASE_URL')!,
  Deno.env.get('SUPABASE_ANON_KEY')!
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
  } catch (error) {
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
      supabaseUrl: Deno.env.get('SUPABASE_URL') ? 'set' : 'not set',
      supabaseAnonKey: Deno.env.get('SUPABASE_ANON_KEY') ? 'set' : 'not set',
      supabaseServiceRoleKey: Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ? 'set' : 'not set',
    }
  });
});

// Generate document checklist based on visa category (without Identity Documents)
function generateDocumentChecklist(visaCategory: string) {
  const familyDocuments = [
    {
      id: 'marriage_cert',
      name: 'Marriage Certificate',
      name_zh: '结婚证书',
      completed: false,
      required: true,
      description: 'Official marriage certificate with English translation if needed',
      description_zh: '官方结婚证书，如需要需提供英文翻译',
      fileId: null
    },
    {
      id: 'petitioner_citizenship',
      name: 'Petitioner Citizenship Evidence',
      name_zh: '申请人公民身份证明',
      completed: false,
      required: true,
      description: 'U.S. birth certificate, naturalization certificate, or passport',
      description_zh: '美国出生证明、入籍证书或护照',
      fileId: null
    },
    {
      id: 'affidavit_support',
      name: 'Affidavit of Support (I-864)',
      name_zh: '经济担保书 (I-864)',
      completed: false,
      required: true,
      description: 'Form I-864 with sponsor\'s financial documents',
      description_zh: 'I-864表格及担保人财务文件',
      fileId: null
    }
  ];

  const supportingDocuments = [
    {
      id: 'financial',
      name: 'Financial Documents',
      name_zh: '财务文档',
      completed: false,
      required: false,
      description: 'Bank statements, tax returns, employment verification',
      description_zh: '银行对账单、税务记录、雇佣验证',
      fileId: null
    },
    {
      id: 'medical',
      name: 'Medical Examination',
      name_zh: '体检报告',
      completed: false,
      required: false,
      description: 'Form I-693 from USCIS-approved civil surgeon (for adjustment of status)',
      description_zh: '由USCIS认可的民事外科医生出具的I-693表格（用于身份调整）',
      fileId: null
    }
  ];

  // Build checklist based on category (removed Identity Documents for privacy)
  const checklist = [];

  // Add category-specific documents
  if (visaCategory.includes('I-130') || visaCategory.includes('VAWA')) {
    checklist.push({
      category: 'Family Documents',
      category_zh: '家庭文件',
      items: [...familyDocuments]
    });
  }

  // Always add supporting documents
  checklist.push({
    category: 'Supporting Evidence',
    category_zh: '支持证据',
    items: [...supportingDocuments]
  });

  return checklist;
}

// Helper function to get user ID from Supabase token
async function getUserIdFromToken(accessToken: string): Promise<string | null> {
  if (!accessToken || accessToken.trim().length === 0) {
    console.log('No access token provided');
    return null;
  }

  try {
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(accessToken);
    
    if (error) {
      console.log('Supabase auth error:', error.message);
      return null;
    }

    if (!user?.id) {
      console.log('No user ID found in token response');
      return null;
    }

    return user.id;
  } catch (error) {
    console.log('Error getting user from token:', error);
    return null;
  }
}

// Auth routes
app.post('/make-server-54a8f580/auth/signup', async (c) => {
  try {
    const { email, password, firstName, lastName, visaCategory } = await c.req.json();

    console.log('Signup attempt for email:', email, 'visa category:', visaCategory);
    console.log('Request headers:', Object.fromEntries(c.req.raw.headers.entries()));

    if (!email || !password || !firstName || !lastName) {
      console.log('Missing required fields');
      return c.json({ error: 'Missing required fields' }, 400);
    }

    // Create user with Supabase Auth using admin client
    console.log('Creating user with Supabase admin client');
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: { 
        firstName, 
        lastName,
        visaCategory,
        createdAt: new Date().toISOString()
      },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (authError) {
      console.log('Auth signup error:', authError);
      return c.json({ error: authError.message }, 400);
    }

    console.log('User created successfully:', authData.user.id);

    // Store additional user data (removed birthCountry for privacy)
    const userProfile = {
      userId: authData.user.id,
      email,
      firstName,
      lastName,
      visaCategory,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      caseStatus: 'onboarding',
      documentsUploaded: 0,
      rfeRisk: 85, // Default high risk until documents uploaded
    };

    await kv.set(`user:${authData.user.id}`, userProfile);

    // Initialize case timeline
    const initialTimeline = [
      {
        id: 1,
        title: 'Account Created',
        title_zh: '账户创建',
        description: 'Welcome to VisaMate! Your journey begins here.',
        description_zh: '欢迎来到VisaMate！您的旅程从这里开始。',
        date: new Date().toISOString(),
        status: 'completed',
        type: 'account_created'
      },
      {
        id: 2,
        title: 'Basic Information Collected',
        title_zh: '基本信息收集',
        description: `Personal details and visa category (${visaCategory}) confirmed.`,
        description_zh: `个人详细信息和签证类别（${visaCategory}）已确认。`,
        date: new Date().toISOString(),
        status: 'completed',
        type: 'info_collected'
      }
    ];

    await kv.set(`timeline:${authData.user.id}`, initialTimeline);

    // Generate category-specific document checklist
    const initialChecklist = generateDocumentChecklist(visaCategory || '');
    await kv.set(`checklist:${authData.user.id}`, initialChecklist);

    console.log('User profile and initial data created successfully');

    return c.json({ 
      success: true, 
      user: {
        id: authData.user.id,
        email: authData.user.email,
        ...userProfile
      }
    });

  } catch (error) {
    console.log('Signup error:', error);
    return c.json({ error: 'Internal server error during signup' }, 500);
  }
});

app.post('/make-server-54a8f580/auth/signin', async (c) => {
  try {
    const { email, password } = await c.req.json();

    console.log('Signin attempt for email:', email);
    console.log('Request headers:', Object.fromEntries(c.req.raw.headers.entries()));

    if (!email || !password) {
      console.log('Missing email or password');
      return c.json({ error: 'Email and password are required' }, 400);
    }

    // Use Supabase auth with anon client
    console.log('Attempting Supabase auth with email:', email);
    const { data, error } = await supabaseAnon.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log('Auth signin error:', error.message, error);
      return c.json({ error: error.message }, 400);
    }

    if (!data.user || !data.session) {
      console.log('No user or session returned from signin');
      return c.json({ error: 'Authentication failed' }, 400);
    }

    console.log('User signed in successfully:', data.user.id);

    // Get user profile from KV store
    const userProfile = await kv.get(`user:${data.user.id}`);
    
    if (!userProfile) {
      console.log('User profile not found for user:', data.user.id);
      return c.json({ error: 'User profile not found' }, 404);
    }

    console.log('User profile retrieved successfully');

    return c.json({ 
      success: true, 
      session: data.session,
      user: userProfile
    });

  } catch (error) {
    console.log('Signin error:', error);
    return c.json({ error: 'Internal server error during signin' }, 500);
  }
});

// Get user profile
app.get('/make-server-54a8f580/user/profile', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const userId = await getUserIdFromToken(accessToken);
    
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const userProfile = await kv.get(`user:${userId}`);
    
    if (!userProfile) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    return c.json({ user: userProfile });

  } catch (error) {
    console.log('Get profile error:', error);
    return c.json({ error: 'Internal server error while fetching profile' }, 500);
  }
});

// Update user profile
app.put('/make-server-54a8f580/user/profile', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const userId = await getUserIdFromToken(accessToken);
    
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const updates = await c.req.json();
    const currentProfile = await kv.get(`user:${userId}`);
    
    if (!currentProfile) {
      return c.json({ error: 'User profile not found' }, 404);
    }

    const updatedProfile = {
      ...currentProfile,
      ...updates,
      updatedAt: new Date().toISOString()
    };

    await kv.set(`user:${userId}`, updatedProfile);

    // If visa category changed, regenerate the document checklist
    if (updates.visaCategory && updates.visaCategory !== currentProfile.visaCategory) {
      console.log('Visa category changed - regenerating checklist');
      
      const newChecklist = generateDocumentChecklist(updates.visaCategory);
      await kv.set(`checklist:${userId}`, newChecklist);
    }

    return c.json({ user: updatedProfile });

  } catch (error) {
    console.log('Update profile error:', error);
    return c.json({ error: 'Internal server error while updating profile' }, 500);
  }
});

// Get user timeline
app.get('/make-server-54a8f580/user/timeline', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const userId = await getUserIdFromToken(accessToken);
    
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const timeline = await kv.get(`timeline:${userId}`);
    
    return c.json({ timeline: timeline || [] });

  } catch (error) {
    console.log('Get timeline error:', error);
    return c.json({ error: 'Internal server error while fetching timeline' }, 500);
  }
});

// Add timeline event
app.post('/make-server-54a8f580/user/timeline', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const userId = await getUserIdFromToken(accessToken);
    
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { title, title_zh, description, description_zh, type } = await c.req.json();
    const currentTimeline = await kv.get(`timeline:${userId}`) || [];
    
    const newEvent = {
      id: currentTimeline.length + 1,
      title,
      title_zh,
      description,
      description_zh,
      date: new Date().toISOString(),
      status: 'completed',
      type
    };

    const updatedTimeline = [...currentTimeline, newEvent];
    await kv.set(`timeline:${userId}`, updatedTimeline);

    return c.json({ timeline: updatedTimeline });

  } catch (error) {
    console.log('Add timeline event error:', error);
    return c.json({ error: 'Internal server error while adding timeline event' }, 500);
  }
});

// Get user checklist
app.get('/make-server-54a8f580/user/checklist', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const userId = await getUserIdFromToken(accessToken);
    
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const checklist = await kv.get(`checklist:${userId}`);
    
    return c.json({ checklist: checklist || [] });

  } catch (error) {
    console.log('Get checklist error:', error);
    return c.json({ error: 'Internal server error while fetching checklist' }, 500);
  }
});

// Update checklist item
app.put('/make-server-54a8f580/user/checklist/:itemId', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const userId = await getUserIdFromToken(accessToken);
    
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const itemId = c.req.param('itemId');
    const updates = await c.req.json();
    const currentChecklist = await kv.get(`checklist:${userId}`) || [];
    
    const updatedChecklist = currentChecklist.map((category: any) => ({
      ...category,
      items: category.items.map((item: any) => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    }));

    await kv.set(`checklist:${userId}`, updatedChecklist);

    // Update user profile with document count and RFE risk
    const userProfile = await kv.get(`user:${userId}`);
    if (userProfile) {
      const completedItems = updatedChecklist.reduce(
        (sum: number, category: any) => sum + category.items.filter((item: any) => item.completed).length, 
        0
      );
      const totalItems = updatedChecklist.reduce((sum: number, category: any) => sum + category.items.length, 0);
      const completionRate = totalItems > 0 ? completedItems / totalItems : 0;
      
      // Calculate RFE risk based on completion rate
      const newRfeRisk = Math.max(10, Math.round(85 - (completionRate * 75)));
      
      const updatedProfile = {
        ...userProfile,
        documentsUploaded: completedItems,
        rfeRisk: newRfeRisk,
        updatedAt: new Date().toISOString()
      };

      await kv.set(`user:${userId}`, updatedProfile);
    }

    return c.json({ checklist: updatedChecklist });

  } catch (error) {
    console.log('Update checklist error:', error);
    return c.json({ error: 'Internal server error while updating checklist' }, 500);
  }
});

// File upload metadata storage
app.post('/make-server-54a8f580/user/files', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const userId = await getUserIdFromToken(accessToken);
    
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const { filename, size, type, checklistItemId } = await c.req.json();
    
    const fileMetadata = {
      id: Math.random().toString(36).substr(2, 9),
      userId: userId,
      filename,
      size,
      type,
      checklistItemId,
      uploadedAt: new Date().toISOString(),
      status: 'uploaded',
      ocrStatus: 'pending'
    };

    await kv.set(`file:${fileMetadata.id}`, fileMetadata);

    // Update checklist item if provided
    if (checklistItemId) {
      const currentChecklist = await kv.get(`checklist:${userId}`) || [];
      const updatedChecklist = currentChecklist.map((category: any) => ({
        ...category,
        items: category.items.map((item: any) => 
          item.id === checklistItemId 
            ? { ...item, completed: true, fileId: fileMetadata.id }
            : item
        )
      }));
      await kv.set(`checklist:${userId}`, updatedChecklist);
    }

    return c.json({ file: fileMetadata });

  } catch (error) {
    console.log('File upload error:', error);
    return c.json({ error: 'Internal server error while storing file metadata' }, 500);
  }
});

// Get user files
app.get('/make-server-54a8f580/user/files', async (c) => {
  try {
    const authHeader = c.req.header('Authorization');
    const accessToken = authHeader?.split(' ')[1];
    
    if (!accessToken) {
      return c.json({ error: 'No access token provided' }, 401);
    }

    const userId = await getUserIdFromToken(accessToken);
    
    if (!userId) {
      return c.json({ error: 'Unauthorized' }, 401);
    }

    const files = await kv.getByPrefix(`file:`) || [];
    const userFiles = files.filter((file: any) => file.userId === userId);

    return c.json({ files: userFiles });

  } catch (error) {
    console.log('Get files error:', error);
    return c.json({ error: 'Internal server error while fetching files' }, 500);
  }
});

// Start the server
Deno.serve(app.fetch);