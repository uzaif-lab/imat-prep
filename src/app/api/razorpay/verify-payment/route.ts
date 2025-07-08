import { NextRequest, NextResponse } from 'next/server';
import { verifyPayment } from '@/lib/razorpay/client';
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
    const { 
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature
    } = await req.json();
    
    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { success: false, message: 'Missing required payment verification data' },
        { status: 400 }
      );
    }
    
    // Verify the payment signature
    const { success, error } = await verifyPayment(orderId, paymentId, signature);
    
    if (!success) {
      console.error('Payment verification failed:', error);
      
      // Previously updated payment record; now skipped.
      
      return NextResponse.json(
        { success: false, message: 'Payment verification failed' },
        { status: 400 }
      );
    }
    
    // Payment verified. No database updates required.
    
    // Return success response
    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully'
    });
    
  } catch (error) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    );
  }
} 