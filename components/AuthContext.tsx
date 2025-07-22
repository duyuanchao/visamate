import React, { createContext, useContext, useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

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
    const token = localStorage.getItem('visaMate_accessToken');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    // Only add Authorization header if we have a token (for authenticated requests)
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    console.log('Making API call to:', endpoint, 'with token:', !!token);

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-54a8f580${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    console.log('API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API error response:', errorText);
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
  };

  // API call helper for unauthenticated requests (signin/signup)
  const unauthenticatedApiCall = async (endpoint: string, options: RequestInit = {}) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${publicAnonKey}`, // Use public anon key for unauthenticated requests
      ...options.headers,
    };

    console.log('Making unauthenticated API call to:', endpoint);

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-54a8f580${endpoint}`,
      {
        ...options,
        headers,
      }
    );

    console.log('Unauthenticated API response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Unauthenticated API error response:', errorText);
      throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
  };

  // Refresh user data
  const refreshUser = async () => {
    try {
      const token = localStorage.getItem('visaMate_accessToken');
      if (!token) {
        console.log('No access token found for refresh');
        return;
      }

      console.log('Refreshing user data');
      const data = await apiCall('/user/profile');
      if (data.user) {
        console.log('User data refreshed successfully');
        setUser(data.user);
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  };

  // Load user data on mount
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('visaMate_accessToken');
        if (!token) {
          console.log('No access token found, skipping user load');
          setLoading(false);
          return;
        }

        console.log('Loading user with existing token');
        const data = await apiCall('/user/profile');
        if (data.user) {
          console.log('User loaded successfully:', data.user.email);
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error loading user:', error);
        // Clear invalid tokens
        localStorage.removeItem('visaMate_accessToken');
        localStorage.removeItem('visaMate_refreshToken');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const signIn = async (email: string, password: string) => {
    try {
      console.log('Attempting signin for:', email);
      
      const data = await unauthenticatedApiCall('/auth/signin', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      console.log('Signin response:', data);

      if (data.success && data.session && data.user) {
        console.log('Signin successful, storing tokens');
        localStorage.setItem('visaMate_accessToken', data.session.access_token);
        localStorage.setItem('visaMate_refreshToken', data.session.refresh_token || '');
        setUser(data.user);
        return { success: true };
      } else {
        console.log('Signin failed - invalid response format');
        return { success: false, error: data.error || 'Authentication failed' };
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
      
      const data = await unauthenticatedApiCall('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ 
          email, 
          password, 
          firstName, 
          lastName, 
          visaCategory 
        }),
      });

      console.log('Signup response:', data);

      if (data.success && data.user) {
        console.log('Signup successful');
        return { success: true };
      } else {
        console.log('Signup failed');
        return { success: false, error: data.error || 'Registration failed' };
      }
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: error instanceof Error ? error.message : 'Registration failed' };
    }
  };

  const signOut = () => {
    console.log('Signing out user');
    localStorage.removeItem('visaMate_accessToken');
    localStorage.removeItem('visaMate_refreshToken');
    setUser(null);
  };

  const updateProfile = async (updates: Partial<User>) => {
    try {
      console.log('Updating profile with:', updates);
      
      const data = await apiCall('/user/profile', {
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
    const token = localStorage.getItem('visaMate_accessToken');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `https://${projectId}.supabase.co/functions/v1/make-server-54a8f580${endpoint}`,
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
        `https://${projectId}.supabase.co/functions/v1/make-server-54a8f580${endpoint}`,
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