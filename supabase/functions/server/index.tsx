import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
// import { createClient } from "@supabase/supabase-js";
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
// const supabaseAdmin = createClient(
//     process.env.SUPABASE_URL!,
//     process.env.SUPABASE_SERVICE_ROLE_KEY!
// );
//
// // Supabase client with anon key for user operations
// const supabaseAnon = createClient(
//     process.env.SUPABASE_URL!,
//     process.env.SUPABASE_ANON_KEY!
// );

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

// ...（后面所有业务路由都可以保持不变）

// Start the server (for Node.js/Egde, use app.fetch; for Express use app.requestListener)
export default app;
