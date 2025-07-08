import { useState, useEffect } from 'react';

// This project no longer requires paid subscriptions. We therefore
// simplify the hook to always report that the user already has full
// access. This removes the need for any Supabase or backend calls.

type SubscriptionStatus = {
  hasSubscription: boolean;
  isLoading: boolean;
};

export function useSubscription(): SubscriptionStatus {
  const [state] = useState<SubscriptionStatus>({
    hasSubscription: true,
    isLoading: false,
  });

  // No asynchronous logic is required any more.
  return state;
} 