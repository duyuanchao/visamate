'use client';

import { AuthPage } from '@/components/AuthPage';
import { useRouter } from 'next/navigation';

export default function SignInPage() {
  const router = useRouter();
  
  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
  };

  const handleSwitchMode = (mode: 'signin' | 'signup') => {
    router.push(`/auth/${mode}`);
  };

  return (
    <AuthPage 
      mode="signin" 
      onNavigate={handleNavigate}
      language="en"
      onSwitchMode={handleSwitchMode}
    />
  );
}