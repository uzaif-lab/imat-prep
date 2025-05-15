import { useState, useEffect } from 'react';
import { useAuth } from '@clerk/nextjs';

type SubscriptionStatus = {
  hasSubscription: boolean;
  status?: string;
  expiryDate?: string;
  isLoading: boolean;
  error?: string;
};

export function useSubscription() {
  const { userId, isLoaded, isSignedIn } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionStatus>({
    hasSubscription: false,
    isLoading: true
  });

  useEffect(() => {
    async function checkSubscription() {
      if (!isLoaded || !isSignedIn || !userId) {
        setSubscription({
          hasSubscription: false,
          isLoading: false
        });
        return;
      }

      try {
        const response = await fetch('/api/check-subscription');
        
        if (!response.ok) {
          console.error('Subscription check failed with status:', response.status);
          setSubscription({
            hasSubscription: false,
            isLoading: false,
            error: 'Failed to check subscription'
          });
          return;
        }
        
        const data = await response.json();
        
        setSubscription({
          ...data,
          isLoading: false
        });
      } catch (error) {
        console.error('Error checking subscription:', error);
        setSubscription({
          hasSubscription: false,
          isLoading: false,
          error: 'Failed to check subscription status'
        });
      }
    }

    checkSubscription();
  }, [isLoaded, isSignedIn, userId]);

  return subscription;
} 