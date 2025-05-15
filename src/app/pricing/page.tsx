'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the premium pricing page
    router.replace('/pricing/premium');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-700">Redirecting to premium pricing...</p>
      </div>
    </div>
  );
} 