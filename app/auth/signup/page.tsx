'use client';

import { AuthPage } from '@/components/AuthPage';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
  const router = useRouter();
  
  const handleNavigate = (page: string) => {
    router.push(`/${page}`);
  };

  const handleSwitchMode = (mode: 'signin' | 'signup') => {
    router.push(`/auth/${mode}`);
  };

  return (
    <AuthPage 
      mode="signup" 
      onNavigate={handleNavigate}
      language="en"
      onSwitchMode={handleSwitchMode}
    />
  );
}