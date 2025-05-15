import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

// Verify environment variables are set
if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

// Create Supabase client with anonymous key (for client-side operations)
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Create Supabase admin client with service key (for server-side operations)
export const supabaseAdmin = createClient(supabaseUrl || '', supabaseServiceKey || '');

export async function checkUserSubscription(userId: string) {
  if (!userId) return { hasSubscription: false };
  
  const { data, error } = await supabaseAdmin
    .from('user_subscriptions')
    .select('subscription_status, expiry_date')
    .eq('user_id', userId)
    .single();
  
  if (error || !data) {
    return { hasSubscription: false };
  }
  
  const isValid = 
    data.subscription_status === 'premium' && 
    (!data.expiry_date || new Date(data.expiry_date) > new Date());
  
  return { 
    hasSubscription: isValid, 
    status: data.subscription_status,
    expiryDate: data.expiry_date
  };
}

export async function createUserSubscriptionRecord(userId: string, email: string) {
  const { data, error } = await supabaseAdmin
    .from('user_subscriptions')
    .upsert({
      user_id: userId,
      user_email: email,
      subscription_status: 'free'
    }, {
      onConflict: 'user_id'
    });
  
  return { data, error };
}

export async function updateUserSubscription(userId: string, status: 'free' | 'premium') {
  // Calculate expiry date (1 year from now)
  const expiryDate = status === 'premium' 
    ? new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString()
    : null;
  
  const { data, error } = await supabaseAdmin
    .from('user_subscriptions')
    .update({
      subscription_status: status,
      expiry_date: expiryDate
    })
    .eq('user_id', userId);
  
  return { data, error };
}

export async function createPaymentRecord(
  userId: string, 
  orderId: string, 
  amount: number,
  currency = 'EUR'
) {
  const { data, error } = await supabaseAdmin
    .from('payment_records')
    .insert({
      user_id: userId,
      order_id: orderId,
      amount,
      currency,
      status: 'created'
    });
  
  return { data, error };
}

export async function updatePaymentRecord(
  orderId: string, 
  paymentId: string, 
  status: 'attempted' | 'paid' | 'failed'
) {
  const { data, error } = await supabaseAdmin
    .from('payment_records')
    .update({
      payment_id: paymentId,
      status
    })
    .eq('order_id', orderId);
  
  return { data, error };
} 