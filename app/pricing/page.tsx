'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Pricing } from '@/components/Pricing';
import { Footer } from '@/components/Footer';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
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
        currentPage="pricing"
        onNavigate={handleNavigate}
        language={language}
        onLanguageChange={handleLanguageChange}
        onAuthAction={handleAuthAction}
      />
      <main className="flex-1">
        <Pricing language={language} />
      </main>
      <Footer language={language} />
    </div>
  );
}