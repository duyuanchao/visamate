import React, { createContext, useContext, useState, useEffect } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  birthCountry?: string;
  visaCategory?: string;
  createdAt: string;
  caseStatus: string;
  documentsUploaded: number;
  rfeRisk: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (userData: SignUpData) => Promise<void>;
  signOut: () => void;
  refreshUser: () => Promise<void>;
}

interface SignUpData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthCountry: string;
  visaCategory: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('%c=== AUTH PROVIDER INITIALIZATION ===', 'color: blue; font-weight: bold;');
    
    const storedToken = localStorage.getItem('visaMate_accessToken');
    const storedUser = localStorage.getItem('visaMate_user');
    
    console.log('Stored token exists:', !!storedToken);
    console.log('Stored user exists:', !!storedUser);
    
    if (storedToken) {
      console.log('Token prefix:', storedToken.substring(0, 30));
      console.log('Is demo token:', storedToken.startsWith('demo-token-'));
    }
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        console.log('Parsed user data:', userData);
        
        // Simple validation - accept demo tokens or long tokens
        if (storedToken.startsWith('demo-token-') || storedToken.length > 10) {
          setUser(userData);
          console.log('%cRestored session for:', 'color: green;', userData.email);
        } else {
          console.log('%cInvalid token format, clearing session', 'color: red;');
          localStorage.removeItem('visaMate_accessToken');
          localStorage.removeItem('visaMate_user');
        }
      } catch (error) {
        console.error('%cError parsing stored user data:', 'color: red;', error);
        localStorage.removeItem('visaMate_accessToken');
        localStorage.removeItem('visaMate_user');
      }
    }
    
    setLoading(false);
    console.log('%cAuth provider initialization complete', 'color: blue;');
  }, []);

  const signIn = async (email: string, password: string) => {
    console.log('%c=== SIGN IN PROCESS ===', 'color: purple; font-weight: bold;');
    console.log('Email:', email);
    console.log('Is demo account:', email === 'demo@visamate.com');
    
    try {
      setLoading(true);
      
      const requestUrl = `https://${projectId}.supabase.co/functions/v1/make-server-54a8f580/auth/signin`;
      console.log('Request URL:', requestUrl);
      
      const requestBody = { email, password };
      const requestHeaders = {
        'Authorization': `Bearer ${publicAnonKey}`,
        'Content-Type': 'application/json',
      };
      
      console.log('Request headers:', { ...requestHeaders, Authorization: `Bearer ${publicAnonKey.substring(0, 20)}...` });
      console.log('Request body:', requestBody);
      
      console.log('%cSending signin request...', 'color: orange;');
      const response = await fetch(requestUrl, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(requestBody),
      });

      console.log('%cResponse received:', 'color: orange;', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('%cResponse not OK:', 'color: red;', response.status, errorText);
        throw new Error(`Sign in failed: ${response.status} - ${errorText}`);
      }

      let data;
      try {
        data = await response.json();
        console.log('%cResponse data:', 'color: green;', data);
      } catch (error) {
        console.error('%cFailed to parse JSON:', 'color: red;', error);
        throw new Error('Invalid response from server');
      }

      if (!data.success || !data.session || !data.user) {
        console.error('%cInvalid response structure:', 'color: red;', {
          success: data.success,
          hasSession: !!data.session,
          hasUser: !!data.user
        });
        throw new Error('Invalid response from server');
      }

      console.log('%c=== SIGN IN SUCCESS ===', 'color: green; font-weight: bold;');
      console.log('User:', data.user.email);
      console.log('Token:', data.session.access_token.substring(0, 40) + '...');

      // Store data
      setUser(data.user);
      localStorage.setItem('visaMate_accessToken', data.session.access_token);
      localStorage.setItem('visaMate_user', JSON.stringify(data.user));

      console.log('%cSession stored successfully', 'color: green;');

    } catch (error: any) {
      console.error('%c=== SIGN IN ERROR ===', 'color: red; font-weight: bold;');
      console.error('Error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (userData: SignUpData) => {
    // Implementation same as before...
    throw new Error('SignUp not implemented in debug version');
  };

  const signOut = () => {
    console.log('%c=== SIGN OUT ===', 'color: gray; font-weight: bold;');
    setUser(null);
    localStorage.removeItem('visaMate_accessToken');
    localStorage.removeItem('visaMate_user');
  };

  const refreshUser = async () => {
    // Implementation same as before...
    console.log('%cRefresh user not implemented in debug version', 'color: yellow;');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, refreshUser }}>
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

// Simplified but robust useApi hook with extensive debugging
export function useApi() {
  const makeRequest = async (url: string, options: RequestInit = {}, requireAuth: boolean = true) => {
    console.log('%c=== API REQUEST START ===', 'color: blue; font-weight: bold;');
    
    const fullUrl = `https://${projectId}.supabase.co/functions/v1${url}`;
    console.log('Full URL:', fullUrl);
    console.log('Method:', options.method || 'GET');
    console.log('Requires auth:', requireAuth);
    
    // Get token from localStorage directly
    const accessToken = localStorage.getItem('visaMate_accessToken');
    console.log('Token from localStorage:', !!accessToken);
    
    if (accessToken) {
      console.log('Token details:');
      console.log('  - Length:', accessToken.length);
      console.log('  - Prefix:', accessToken.substring(0, 30));
      console.log('  - Is demo:', accessToken.startsWith('demo-token-'));
    }
    
    if (requireAuth && !accessToken) {
      console.error('%cNo access token available for authenticated request!', 'color: red; font-weight: bold;');
      throw new Error('No access token available');
    }

    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    if (requireAuth && accessToken) {
      headers['Authorization'] = `Bearer ${accessToken}`;
      console.log('%cAdded auth header with token', 'color: green;');
    } else if (!requireAuth) {
      headers['Authorization'] = `Bearer ${publicAnonKey}`;
      console.log('%cAdded anon key for public endpoint', 'color: blue;');
    }

    console.log('Final headers (sanitized):', {
      'Content-Type': headers['Content-Type'],
      'Authorization': headers['Authorization'] ? `Bearer ${headers['Authorization'].split(' ')[1].substring(0, 20)}...` : 'None'
    });

    try {
      console.log('%cSending request...', 'color: orange;');
      
      const requestConfig = {
        ...options,
        headers,
      };
      
      console.log('Request config (sanitized):', {
        method: requestConfig.method || 'GET',
        hasHeaders: !!requestConfig.headers,
        hasBody: !!requestConfig.body
      });
      
      const response = await fetch(fullUrl, requestConfig);

      console.log('%c=== API RESPONSE ===', 'color: blue; font-weight: bold;');
      console.log('Status:', response.status, response.statusText);
      console.log('Headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        console.error('%cResponse not OK!', 'color: red; font-weight: bold;');
        
        let errorData;
        const responseText = await response.text();
        console.log('Raw error response:', responseText);
        
        try {
          errorData = JSON.parse(responseText);
          console.log('Parsed error data:', errorData);
        } catch (parseError) {
          console.log('Failed to parse error response as JSON');
          errorData = { error: responseText || `HTTP ${response.status}: ${response.statusText}` };
        }
        
        const errorMessage = errorData.error || `Request failed: ${response.status} ${response.statusText}`;
        console.error('%cFinal error message:', 'color: red;', errorMessage);
        throw new Error(errorMessage);
      }
      
      const responseData = await response.json();
      console.log('%cResponse data received successfully', 'color: green;');
      console.log('Data preview:', JSON.stringify(responseData).substring(0, 200) + '...');
      
      return responseData;
      
    } catch (error) {
      console.error('%c=== API ERROR ===', 'color: red; font-weight: bold;');
      console.error('Error details:', error);
      console.error('Error type:', typeof error);
      console.error('Error message:', error.message);
      throw error;
    }
  };

  return {
    get: async (url: string, requireAuth: boolean = true) => {
      return makeRequest(url, { method: 'GET' }, requireAuth);
    },
    
    post: async (url: string, data: any, requireAuth: boolean = true) => {
      return makeRequest(url, {
        method: 'POST',
        body: JSON.stringify(data),
      }, requireAuth);
    },
    
    put: async (url: string, data: any, requireAuth: boolean = true) => {
      return makeRequest(url, {
        method: 'PUT',
        body: JSON.stringify(data),
      }, requireAuth);
    },
  };
}