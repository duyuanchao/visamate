'use client';

import { useAuth } from '@/components/AuthContext';
import { Dashboard } from '@/components/Dashboard';
import { Header } from '@/components/Header';
import { UploadsModal } from '@/components/UploadsModal';
import { redirect, useRouter } from 'next/navigation';
import { useEffect, useState, useCallback } from 'react';

export default function DashboardPage() {
  const { user, loading, refreshUser } = useAuth();
  const router = useRouter();
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  const [showUploadsModal, setShowUploadsModal] = useState(false);

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

  const handleShowUploads = useCallback(() => {
    setShowUploadsModal(true);
  }, []);

  const handleCloseUploads = useCallback(async () => {
    setShowUploadsModal(false);
    
    // Refresh data without full page reload
    try {
      // Re-fetch user data to get updated file counts and RFE risk
      await refreshUser();
      
      console.log('User data refreshed after upload modal close');
    } catch (error) {
      console.error('Error refreshing user data:', error);
      // Fallback to page reload if refresh fails
      window.location.reload();
    }
  }, [refreshUser]);

  const handleNavigation = useCallback((page: string) => {
    // Handle navigation between pages using Next.js router
    switch (page) {
      case 'home':
        router.push('/');
        break;
      case 'how-it-works':
        router.push('/how-it-works');
        break;
      case 'pricing':
        router.push('/pricing');
        break;
      case 'dashboard':
        // Already on dashboard, no need to navigate
        break;
      case 'doc-builder':
        router.push('/doc-builder');
        break;
      case 'rfe-report':
        router.push('/rfe-report');
        break;
      case 'settings':
        router.push('/settings');
        break;
      default:
        console.log('Navigation to:', page);
    }
  }, [router]);

  const handleAuthAction = useCallback((action: 'signin' | 'signup') => {
    if (action === 'signin') {
      router.push('/auth/signin');
    } else {
      router.push('/auth/signup');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentPage="dashboard" 
        onNavigate={handleNavigation} 
        language={language}
        onLanguageChange={setLanguage}
        onAuthAction={handleAuthAction}
      />
      <Dashboard onShowUploads={handleShowUploads} language={language} />
      
      {/* Upload Modal */}
      {showUploadsModal && (
        <UploadsModal 
          onClose={handleCloseUploads} 
          language={language} 
        />
      )}
    </div>
  );
}