'use client';

import { useAuth } from '@/components/AuthContext';
import { Dashboard } from '@/components/Dashboard';
import { Header } from '@/components/Header';
import { UploadsModal } from '@/components/UploadsModal';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const { user, loading, refreshUser } = useAuth();
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

  const handleShowUploads = () => {
    setShowUploadsModal(true);
  };

  const handleCloseUploads = async () => {
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
  };

  const handleNavigation = (page: string) => {
    // Handle navigation between pages
    switch (page) {
      case 'home':
        window.location.href = '/';
        break;
      case 'how-it-works':
        window.location.href = '/how-it-works';
        break;
      case 'pricing':
        window.location.href = '/pricing';
        break;
      case 'dashboard':
        window.location.href = '/dashboard';
        break;
      case 'doc-builder':
        window.location.href = '/doc-builder';
        break;
      case 'rfe-report':
        window.location.href = '/rfe-report';
        break;
      case 'settings':
        window.location.href = '/settings';
        break;
      default:
        console.log('Navigation to:', page);
    }
  };

  const handleAuthAction = (action: 'signin' | 'signup') => {
    if (action === 'signin') {
      window.location.href = '/auth/signin';
    } else {
      window.location.href = '/auth/signup';
    }
  };

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