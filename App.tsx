import React, { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { AuthPage } from './components/AuthPage';
import { Home } from './components/Home';
import { HowItWorks } from './components/HowItWorks';
import { Pricing } from './components/Pricing';
import { OnboardingStep1 } from './components/OnboardingStep1';
import { Dashboard } from './components/Dashboard';
import { UploadsModal } from './components/UploadsModal';
import { Header } from './components/Header';
import { Footer } from './components/Footer';


// Mock router for demonstration
export type Page = 'home' | 'how-it-works' | 'pricing' | 'onboarding' | 'dashboard' | 'doc-builder' | 'rfe-report' | 'settings' | 'signin' | 'signup';

function AppContent() {
  const { user, loading } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [showUploadsModal, setShowUploadsModal] = useState(false);
  const [language, setLanguage] = useState<'en' | 'zh'>('en');

  // Show loading spinner while checking auth state
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

  // Helper to check if user has valid session
  const hasValidSession = () => {
    const token = localStorage.getItem('visaMate_accessToken');
    return user && token && token.length > 0;
  };

  const handleNavigation = (page: Page) => {
    console.log('Navigation requested to:', page);
    console.log('Has valid session:', hasValidSession());
    
    // Redirect to signin for protected pages when not authenticated
    if (!hasValidSession() && ['dashboard', 'doc-builder', 'rfe-report', 'settings'].includes(page)) {
      console.log('Redirecting to signin for protected page');
      setCurrentPage('signin');
      setAuthMode('signin');
      return;
    }
    setCurrentPage(page);
  };

  const renderPage = () => {
    // Show auth pages
    if (currentPage === 'signin' || currentPage === 'signup') {
      return (
        <AuthPage 
          mode={authMode}
          onNavigate={handleNavigation}
          language={language}
          onSwitchMode={setAuthMode}
        />
      );
    }

    // Regular pages
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigation} language={language} />;
      case 'how-it-works':
        return <HowItWorks onNavigate={handleNavigation} language={language} />;
      case 'pricing':
        return <Pricing language={language} onNavigate={handleNavigation} />;
      case 'onboarding':
        // If user is already logged in with valid session, go to dashboard
        if (hasValidSession()) {
          console.log('User has valid session, redirecting to dashboard');
          setCurrentPage('dashboard');
          return <Dashboard onShowUploads={() => setShowUploadsModal(true)} language={language} />;
        }
        return <OnboardingStep1 onNavigate={handleNavigation} language={language} />;
      case 'dashboard':
        // Double-check session validity before showing dashboard
        if (!hasValidSession()) {
          console.log('No valid session for dashboard, redirecting to signin');
          setCurrentPage('signin');
          setAuthMode('signin');
          return (
            <AuthPage 
              mode={authMode}
              onNavigate={handleNavigation}
              language={language}
              onSwitchMode={setAuthMode}
            />
          );
        }
        return <Dashboard onShowUploads={() => setShowUploadsModal(true)} language={language} />;
      case 'doc-builder':
        return <PlaceholderPage title="Document Builder" subtitle="AI-powered form filling and PDF generation" language={language} />;
      case 'rfe-report':
        return <PlaceholderPage title="RFE Risk Report" subtitle="Comprehensive document analysis and recommendations" language={language} />;
      case 'settings':
        return <PlaceholderPage title="Settings" subtitle="Language preferences and data management" language={language} />;
      default:
        return <Home onNavigate={handleNavigation} language={language} />;
    }
  };

  const showHeaderFooter = !['signin', 'signup'].includes(currentPage);

  return (
    <div className="min-h-screen bg-background">
      {showHeaderFooter && (
        <Header 
          currentPage={currentPage} 
          onNavigate={handleNavigation} 
          language={language}
          onLanguageChange={setLanguage}
          onAuthAction={(action) => {
            setAuthMode(action);
            setCurrentPage(action);
          }}
        />
      )}
      
      <main>
        {renderPage()}
      </main>
      
      {showHeaderFooter && <Footer language={language} />}
      
      {showUploadsModal && (
        <UploadsModal 
          onClose={() => setShowUploadsModal(false)}
          language={language}
        />
      )}

    </div>
  );
}

// Placeholder component for pages not yet implemented
function PlaceholderPage({ title, subtitle, language }: { 
  title: string; 
  subtitle: string; 
  language: 'en' | 'zh';
}) {
  const getText = (en: string, zh: string) => language === 'zh' ? zh : en;
  
  return (
    <div className="container mx-auto px-4 py-24">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="mb-4">{title}</h1>
        <p className="text-muted-foreground mb-8">{subtitle}</p>
        <div className="bg-neutral p-12 rounded-lg border-2 border-dashed border-border">
          <p className="text-muted-foreground">
            {getText(
              'This page is under construction. Navigation and core functionality are ready.',
              '此页面正在建设中。导航和核心功能已准备就绪。'
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}