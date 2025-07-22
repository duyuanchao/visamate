'use client';

import React, { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

export function DebugPanel() {
  const [testResults, setTestResults] = useState<any[]>([]);
  const [testing, setTesting] = useState(false);

  const addResult = (test: string, success: boolean, details: any) => {
    setTestResults(prev => [...prev, { test, success, details, timestamp: new Date().toISOString() }]);
  };

  const testConnectivity = async () => {
    setTesting(true);
    setTestResults([]);

    // Test 1: Basic connectivity
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-54a8f580/test`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        addResult('Basic Connectivity', true, data);
      } else {
        addResult('Basic Connectivity', false, { status: response.status, statusText: response.statusText });
      }
    } catch (error) {
      addResult('Basic Connectivity', false, { error: 'error'});
    }

    // Test 2: Health check
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-54a8f580/health`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        addResult('Health Check', true, data);
      } else {
        addResult('Health Check', false, { status: response.status, statusText: response.statusText });
      }
    } catch (error) {
      addResult('Health Check', false, { error: 'error.message '});
    }

    // Test 3: Signin endpoint (with invalid credentials)
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-54a8f580/auth/signin`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: 'test@example.com',
          password: 'invalidpassword'
        })
      });
      
      const data = await response.json();
      if (response.status === 400) {
        addResult('Signin Endpoint (Expected Failure)', true, { message: 'Endpoint reachable', response: data });
      } else {
        addResult('Signin Endpoint', false, { status: response.status, response: data });
      }
    } catch (error) {
      addResult('Signin Endpoint', false, { error: 'error.message' });
    }

    setTesting(false);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg max-w-md max-h-96 overflow-y-auto z-50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium">Debug Panel</h3>
        <button
          onClick={testConnectivity}
          disabled={testing}
          className="px-3 py-1 bg-primary text-primary-foreground rounded text-xs hover:bg-primary/90 disabled:opacity-50"
        >
          {testing ? 'Testing...' : 'Test API'}
        </button>
      </div>

      <div className="space-y-2 text-xs">
        <div className="text-muted-foreground">
          <div>Project ID: {projectId.substring(0, 8)}...</div>
          <div>Public Key: {publicAnonKey.substring(0, 20)}...</div>
        </div>

        {testResults.map((result, index) => (
          <div key={index} className={`p-2 rounded border ${result.success ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
            <div className="flex items-center gap-2">
              <span className={result.success ? 'text-green-600' : 'text-red-600'}>
                {result.success ? '✓' : '✗'}
              </span>
              <span className="font-medium">{result.test}</span>
            </div>
            <div className="mt-1 text-muted-foreground">
              <pre className="whitespace-pre-wrap text-xs">
                {JSON.stringify(result.details, null, 2)}
              </pre>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}