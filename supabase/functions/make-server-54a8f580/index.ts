import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as kvStore from './kv_store.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const path = url.pathname;
    
    // 初始化 Supabase 客户端
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 从 Authorization header 获取用户信息
    const authHeader = req.headers.get('Authorization');
    let user = null;
    
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const { data: { user: authUser }, error } = await supabase.auth.getUser(token);
      if (!error && authUser) {
        user = authUser;
      }
    }

    // Health check endpoint
    if (path === '/make-server-54a8f580/health') {
      return new Response(
        JSON.stringify({ 
          status: 'healthy', 
          timestamp: new Date().toISOString(),
          service: 'VisaMate API'
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // Test endpoint
    if (path === '/make-server-54a8f580/test') {
      return new Response(
        JSON.stringify({ 
          message: 'API is working!', 
          timestamp: new Date().toISOString(),
          authenticated: !!user
        }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // User profile endpoint
    if (path === '/make-server-54a8f580/user/profile') {
      if (!user) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401 
          }
        );
      }

      if (req.method === 'GET') {
        // 返回用户配置文件
        const userProfile = {
          userId: user.id,
          email: user.email,
          firstName: user.user_metadata?.firstName || 'User',
          lastName: user.user_metadata?.lastName || '',
          visaCategory: user.user_metadata?.visaCategory || 'EB-1A',
          caseStatus: 'In Preparation',
          documentsUploaded: 5,
          rfeRisk: 25,
          lastUpdated: new Date().toISOString()
        };

        return new Response(
          JSON.stringify({ user: userProfile }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        );
      }

      if (req.method === 'PUT') {
        // 更新用户配置文件
        const updates = await req.json();
        
        // 这里可以添加实际的数据库更新逻辑
        const updatedProfile = {
          userId: user.id,
          email: user.email,
          firstName: updates.firstName || user.user_metadata?.firstName || 'User',
          lastName: updates.lastName || user.user_metadata?.lastName || '',
          visaCategory: updates.visaCategory || user.user_metadata?.visaCategory || 'EB-1A',
          caseStatus: updates.caseStatus || 'In Preparation',
          documentsUploaded: updates.documentsUploaded || 5,
          rfeRisk: updates.rfeRisk || 25,
          lastUpdated: new Date().toISOString()
        };

        return new Response(
          JSON.stringify({ user: updatedProfile }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        );
      }
    }

    // User timeline endpoint
    if (path === '/make-server-54a8f580/user/timeline') {
      if (!user) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401 
          }
        );
      }

      const timeline = [
        {
          id: 1,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
          event: 'Account Created',
          description: 'Welcome to VisaMate! Your journey begins here.',
          type: 'success'
        },
        {
          id: 2,
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          event: 'Profile Setup',
          description: 'Basic profile information completed.',
          type: 'info'
        },
        {
          id: 3,
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          event: 'Documents Uploaded',
          description: 'Initial documents successfully uploaded.',
          type: 'success'
        },
        {
          id: 4,
          date: new Date().toISOString(),
          event: 'Next Steps',
          description: 'Ready to proceed with application review.',
          type: 'pending'
        }
      ];

      return new Response(
        JSON.stringify({ timeline }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // User checklist endpoint
    if (path === '/make-server-54a8f580/user/checklist') {
      if (!user) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401 
          }
        );
      }

      const checklist = [
        {
          id: 1,
          title: 'Personal Information',
          description: 'Complete your basic profile information',
          completed: true,
          required: true,
          category: 'profile'
        },
        {
          id: 2,
          title: 'Educational Background',
          description: 'Upload educational certificates and transcripts',
          completed: true,
          required: true,
          category: 'documents'
        },
        {
          id: 3,
          title: 'Professional Experience',
          description: 'Provide work history and recommendation letters',
          completed: false,
          required: true,
          category: 'documents'
        },
        {
          id: 4,
          title: 'Supporting Evidence',
          description: 'Upload additional supporting documents',
          completed: false,
          required: false,
          category: 'documents'
        },
        {
          id: 5,
          title: 'Application Review',
          description: 'Final review before submission',
          completed: false,
          required: true,
          category: 'review'
        }
      ];

      return new Response(
        JSON.stringify({ checklist }),
        { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200 
        }
      );
    }

    // User files endpoint - Get list of uploaded files
    if (path === '/make-server-54a8f580/user/files') {
      if (!user) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401 
          }
        );
      }

      if (req.method === 'GET') {
        let userFiles = [];
        
        try {
          // Get user's uploaded files from KV store
          const userFilesKey = `user_files_${user.id}`;
          const storedFiles = await kvStore.get(userFilesKey);
          
          console.log('Retrieved files from KV store:', storedFiles);
          
          // If no files stored yet, return empty array (no mock data for real usage)
          userFiles = storedFiles ? storedFiles : [];
          
          console.log(`Returning ${userFiles.length} real user files`);
        
        } catch (error) {
          console.error('Error retrieving user files from KV store:', error);
          console.log('KV store not available, returning empty array');
          // Return empty array on error - graceful degradation
          userFiles = [];
        }

        return new Response(
          JSON.stringify({ files: userFiles }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        );
      }

      if (req.method === 'POST') {
        // Save uploaded file record to user's file list in KV store
        try {
          const fileRecord = await req.json();
          console.log('Saving file record:', fileRecord);
          
          const savedFile = {
            id: fileRecord.fileId,
            name: fileRecord.fileName,
            size: fileRecord.fileSize,
            type: fileRecord.fileType,
            category: fileRecord.category,
            uploadDate: fileRecord.uploadedAt,
            ocrStatus: 'completed',
            fileUrl: fileRecord.publicUrl,
            filePath: fileRecord.filePath
          };

          // Get existing user files
          const userFilesKey = `user_files_${user.id}`;
          let existingFiles = await kvStore.get(userFilesKey) || [];
          
          // Add new file to the list
          existingFiles.push(savedFile);
          
          // Save updated file list back to KV store
          await kvStore.set(userFilesKey, existingFiles);
          
          console.log(`File saved to KV store. User now has ${existingFiles.length} files.`);

          return new Response(
            JSON.stringify({ 
              success: true, 
              file: savedFile,
              message: 'File record saved successfully' 
            }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 200 
            }
          );
          
        } catch (error) {
          console.error('Error saving file record:', error);
          return new Response(
            JSON.stringify({ 
              error: 'Failed to save file record',
              details: error.message 
            }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 500 
            }
          );
        }
      }
    }

    // File upload endpoint
    if (path === '/make-server-54a8f580/upload/file') {
      if (!user) {
        return new Response(
          JSON.stringify({ error: 'Unauthorized' }),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 401 
          }
        );
      }

      if (req.method === 'POST') {
        // 模拟文件上传处理
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const userId = formData.get('userId') as string;
        const fileId = formData.get('fileId') as string;

        if (!file) {
          return new Response(
            JSON.stringify({ error: 'No file provided' }),
            { 
              headers: { ...corsHeaders, 'Content-Type': 'application/json' },
              status: 400 
            }
          );
        }

        // 模拟文件上传成功
        const result = {
          fileId,
          fileName: file.name,
          fileSize: file.size,
          fileType: file.type,
          fileUrl: `https://example.com/files/${fileId}`,
          uploadDate: new Date().toISOString(),
          ocrStatus: 'completed',
          ocrText: 'Sample extracted text from document'
        };

        return new Response(
          JSON.stringify(result),
          { 
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200 
          }
        );
      }
    }

    // 404 for unmatched routes
    return new Response(
      JSON.stringify({ error: 'Not Found', path }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 404 
      }
    );

  } catch (error) {
    console.error('Function error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal Server Error', 
        message: error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});