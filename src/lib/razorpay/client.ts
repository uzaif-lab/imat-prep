import Razorpay from 'razorpay';

const keyId = process.env.RAZORPAY_KEY_ID;
const keySecret = process.env.RAZORPAY_KEY_SECRET;

// Verify environment variables are set
if (!keyId || !keySecret) {
  console.error('Missing Razorpay environment variables. Please check your .env file.');
}

// Initialize Razorpay client
const razorpay = new Razorpay({
  key_id: keyId || '',
  key_secret: keySecret || '',
});

export const RAZORPAY_KEY_ID = keyId;

export async function createOrder(amount: number, receipt: string, currency = 'EUR') {
  try {
    if (!keyId || !keySecret) {
      return { success: false, error: 'Razorpay credentials are not configured properly.' };
    }
    
    // Amount should be in the smallest currency unit (paise for INR, cents for EUR)
    // 49 EUR = 4900 cents, 4499 INR = 449900 paise
    const amountInSmallestUnit = Math.round(amount * 100); // Both INR and EUR use 100 as the smallest unit conversion
    
    // Ensure receipt is not too long (max 40 chars)
    const safeReceipt = receipt.substring(0, 40);
    
    // Log the order creation for debugging
    console.log(`Creating Razorpay order: ${amount} ${currency} (${amountInSmallestUnit} in smallest unit)`);
    
    const order = await razorpay.orders.create({
      amount: amountInSmallestUnit,
      currency,
      receipt: safeReceipt,
      payment_capture: 1, // Auto capture payment
    });
    
    return { success: true, order };
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return { success: false, error };
  }
}

export async function verifyPayment(orderId: string, paymentId: string, signature: string) {
  try {
    if (!keySecret) {
      return { success: false, error: 'Razorpay secret key is not configured properly.' };
    }
    
    // Create the payload string that should have been signed
    const payload = `${orderId}|${paymentId}`;
    
    // Use crypto to verify the signature
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(payload)
      .digest('hex');
    
    // Check if signatures match
    const isValid = expectedSignature === signature;
    
    return { success: isValid };
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return { success: false, error };
  }
}

export default razorpay; 