import { NextRequest, NextResponse } from 'next/server';
import { checkUserSubscription, createUserSubscriptionRecord } from '@/lib/supabase/client';
import { getAuth } from '@clerk/nextjs/server';

export async function GET(req: NextRequest) {
  try {
    // Get the current user
    const { userId } = getAuth(req);
    
    if (!userId) {
      return NextResponse.json(
        { hasSubscription: false },
        { status: 200 }
      );
    }
    
    // Get subscription status from Supabase
    const subscription = await checkUserSubscription(userId);
    
    // If no subscription record found, create one (for new users)
    if (!subscription.status) {
      try {
        // Create a basic subscription record with user ID and a placeholder email
        // The email will be updated when user completes their profile
        await createUserSubscriptionRecord(
          userId, 
          `${userId}@placeholder.com` // Use user ID as placeholder email
        );
      } catch (error) {
        console.error('Failed to create user subscription record:', error);
      }
    }
    
    return NextResponse.json(subscription);
  } catch (error) {
    console.error('Error checking subscription:', error);
    return NextResponse.json(
      { hasSubscription: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
} 