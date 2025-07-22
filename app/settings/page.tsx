'use client';

import { useAuth } from '@/components/AuthContext';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function SettingsPage() {
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      redirect('/auth/signin');
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="mb-4">Settings</h1>
        <p className="text-muted-foreground mb-8">Language preferences and data management</p>
        <div className="bg-neutral p-12 rounded-lg border-2 border-dashed border-border">
          <p className="text-muted-foreground">
            This page is under construction. Navigation and core functionality are ready.
          </p>
        </div>
      </div>
    </div>
  );
}