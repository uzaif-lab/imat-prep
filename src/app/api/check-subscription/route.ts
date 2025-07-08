import { NextResponse } from 'next/server';

// Deprecated: subscriptions are no longer required. Always returns `hasSubscription: true`.
export async function GET() {
  return NextResponse.json({ hasSubscription: true });
} 