'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';

interface SubscriptionGuardProps {
  children: ReactNode;
  testId: string;
}

export default function SubscriptionGuard({ children, testId }: SubscriptionGuardProps) {
  const { isSignedIn, isLoaded } = useAuth();
  const { hasSubscription, isLoading, error } = useSubscription();
  const router = useRouter();
  const [showContent, setShowContent] = useState(false);

  // Free tests that don't require subscription
  const freeTests = ['1', '2', '3'];
  const requiresSubscription = !freeTests.includes(testId);

  useEffect(() => {
    // Always allow free tests, even if there are auth/subscription errors
    if (!requiresSubscription) {
      setShowContent(true);
      return;
    }

    // Wait for auth to load
    if (!isLoaded) {
      return;
    }

    // If not signed in, redirect to login
    if (!isSignedIn) {
      router.push(`/auth/login?redirect=/mock-tests/${testId}`);
      return;
    }

    // While checking subscription status and it's a premium test, wait
    if (isLoading && requiresSubscription) {
      return;
    }

    // If subscription check encountered an error but we're trying to access
    // a premium test, redirect to premium page to be safe
    if (error && requiresSubscription) {
      router.push('/pricing/premium');
      return;
    }

    // If requires subscription but user doesn't have it, redirect to premium page
    if (requiresSubscription && !hasSubscription) {
      router.push('/pricing/premium');
      return;
    }

    // Otherwise, show content
    setShowContent(true);
  }, [isLoaded, isSignedIn, hasSubscription, isLoading, requiresSubscription, router, testId, error]);

  // Show loading state while checking
  if (!showContent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  // Render children once everything checks out
  return <>{children}</>;
} 