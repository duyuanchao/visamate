'use client';

import { EB1ACoverLetterSection } from '@/components/EB1ACoverLetterSection';

export default function TestEB1APage() {
  const handleShowUploads = () => {
    console.log('Show uploads modal');
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">EB1A Cover Letter Generator Test</h1>
          <p className="text-muted-foreground">
            This is a test page to verify the EB1A Cover Letter Generator functionality.
          </p>
        </div>
        
        <EB1ACoverLetterSection language="en" onShowUploads={handleShowUploads} />
      </div>
    </div>
  );
}