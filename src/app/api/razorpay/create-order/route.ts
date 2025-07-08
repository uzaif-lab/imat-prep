import { NextRequest, NextResponse } from 'next/server';
import { createOrder } from '@/lib/razorpay/client';
import { getAuth } from '@clerk/nextjs/server';

export async function POST(req: NextRequest) {
  try {
    // Get the current user
    const { userId } = getAuth(req);
    
    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Parse the request body
    const { amount, currency = 'EUR' } = await req.json();
    
    if (!amount) {
      return NextResponse.json(
        { success: false, message: 'Amount is required' },
        { status: 400 }
      );
    }
    
    // Create a short unique receipt ID (max 40 chars)
    // Use shortened userId (first 10 chars) + timestamp
    const shortUserId = userId.substring(0, 10);
    const timestamp = Date.now().toString().substring(0, 10);
    const receipt = `rcp_${shortUserId}_${timestamp}`;
    
    // Create the order with Razorpay
    const { success, order, error } = await createOrder(amount, receipt, currency);
    
    if (!success || !order) {
      console.error('Failed to create Razorpay order:', error);
      return NextResponse.json(
        { success: false, message: 'Failed to create order' },
        { status: 500 }
      );
    }
    
    // Return the order details needed for client-side payment
    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        amount: order.amount,
        currency: order.currency,
      }
    });
    
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 