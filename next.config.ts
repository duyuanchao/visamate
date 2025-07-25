import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Exclude supabase functions from build
  experimental: {
    serverComponentsExternalPackages: ['hono']
  },
  
  // Skip type checking for build (will be done separately)
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // Skip ESLint during build for faster deployment
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Exclude certain directories from compilation
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig;
