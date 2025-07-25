'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// 创建 Supabase 客户端
const supabase: SupabaseClient = createClient(
  `https://${projectId}.supabase.co`,
  publicAnonKey
);

interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  visaCategory?: string;
  caseStatus?: string;
  documentsUploaded?: number;
  rfeRisk?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signUp: (email: string, password: string, firstName: string, lastName: string, visaCategory?: string) => Promise<{ success: boolean; error?: string }>;
  signOut: () => void;
  updateProfile: (updates: Partial<User>) => Promise<{ success: boolean; error?: string }>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // API call helper for authenticated requests
  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No valid session');
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
      ...(options.headers ? (options.headers as Record<string, string>) : {}),
    };

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
  };

  // Load user profile from our custom API
  const loadUserProfile = async (authUser: any) => {
    try {
      console.log('Loading user profile for:', authUser.email);
      
      // 先尝试从我们的 API 获取用户档案
      const profileData = await apiCall('/make-server-54a8f580/user/profile');
      
      if (profileData.user) {
        setUser(profileData.user);
      } else {
        // 如果没有找到档案，创建一个基础档案
        const basicUser: User = {
          userId: authUser.id,
          email: authUser.email,
          firstName: authUser.user_metadata?.firstName || 'User',
          lastName: authUser.user_metadata?.lastName || '',
          visaCategory: authUser.user_metadata?.visaCategory || 'EB-1A',
          caseStatus: 'In Preparation',
          documentsUploaded: 0,
          rfeRisk: 75
        };
        setUser(basicUser);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
      
      // 创建基础用户档案作为后备
      const basicUser: User = {
        userId: authUser.id,
        email: authUser.email,
        firstName: authUser.user_metadata?.firstName || 'User',
        lastName: authUser.user_metadata?.lastName || '',
        visaCategory: 'EB-1A',
        caseStatus: 'In Preparation',
        documentsUploaded: 0,
        rfeRisk: 75
      };
      setUser(basicUser);
    }
  };

  // Monitor auth state changes
  useEffect(() => {
    console.log('Setting up auth state listener');
    
    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          return;
        }

        if (session?.user) {
          console.log('Found existing session for:', session.user.email);
          await loadUserProfile(session.user);
        } else {
          console.log('No existing session found');
        }
      } catch (error) {
        console.error('Error in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session?.user) {
        await loadUserProfile(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Refresh user data
  const refreshUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (session?.user) {
        await loadUserProfile(session.user);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting signin for:', email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Signin error:', error);
        return { success: false, error: error.message };
      }

      if (data.user && data.session) {
        console.log('Signin successful for:', data.user.email);
        // User profile will be loaded automatically by the auth state listener
        return { success: true };
      } else {
        return { success: false, error: 'Authentication failed' };
      }
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Authentication failed' };
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    firstName: string, 
    lastName: string, 
    visaCategory?: string
  ) => {
    try {
      console.log('Attempting signup for:', email);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            firstName,
            lastName,
            visaCategory: visaCategory || 'EB-1A'
          }
        }
      });

      if (error) {
        console.error('Signup error:', error);
        return { success: false, error: error.message };
      }

      if (data.user) {
        console.log('Signup successful for:', data.user.email);
        
        // If user is immediately confirmed, load their profile
        if (data.session) {
          await loadUserProfile(data.user);
        }
        
        return { success: true };
      } else {
        return { success: false, error: 'Registration failed' };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Registration failed' };
    }
  };

  const signOut = async () => {
    try {
      console.log('Signing out user');
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      console.log('Updating profile with:', updates);
      
      const data = await apiCall('/make-server-54a8f580/user/profile', {
        method: 'PUT',
        body: JSON.stringify(updates),
      });

      if (data.user) {
        console.log('Profile updated successfully');
        setUser(data.user);
        return { success: true };
      } else {
        console.log('Profile update failed');
        return { success: false, error: 'Update failed' };
      }
    } catch (error) {
      console.error('Update profile error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Update failed' };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// API hook for authenticated requests with HTTP method helpers
export function useApi() {
  const apiCall = async (endpoint: string, options: RequestInit = {}) => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.access_token) {
      throw new Error('No valid session');
    }

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
      ...(options.headers as Record<string, string> || {}),
    };

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
  };

  // HTTP method helpers
  const get = async (endpoint: string, requireAuth: boolean = true) => {
    if (!requireAuth) {
      // For health checks and other non-authenticated endpoints
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1${endpoint}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          }
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      return response.json();
    }
    
    return apiCall(endpoint, { method: 'GET' });
  };

  const post = async (endpoint: string, data: any) => {
    return apiCall(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  };

  const put = async (endpoint: string, data: any) => {
    return apiCall(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  };

  const del = async (endpoint: string) => {
    return apiCall(endpoint, { method: 'DELETE' });
  };

  return { apiCall, get, post, put, delete: del };
}

// Export the supabase client for direct use if needed
export { supabase };