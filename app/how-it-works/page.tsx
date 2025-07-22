'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { HowItWorks } from '@/components/HowItWorks';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function HowItWorksPage() {
  const router = useRouter();
  const [language, setLanguage] = useState<'en' | 'zh'>('en');
  
  const handleNavigate = (page: string) => {
    if (page === 'home') {
      router.push('/');
    } else {
      router.push(`/${page}`);
    }
  };

  const handleLanguageChange = (lang: 'en' | 'zh') => {
    setLanguage(lang);
  };

  const handleAuthAction = (action: 'signin' | 'signup') => {
    router.push(`/auth/${action}`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        currentPage="how-it-works"
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={handleLanguageChange}
        onAuthAction={handleAuthAction}
      />
      <main className="flex-1">
        <HowItWorks language={language} onNavigate={handleNavigate} />
      </main>
      <Footer language={language} />
    </div>
  );
}