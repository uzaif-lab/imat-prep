import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bizrdfyfnlehcgcbevvo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpenJkZnlmbmxlaGNnY2JldnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MjExNTcsImV4cCI6MjA2MjI5NzE1N30.AErqkjAcKRiYa4SIx137zZf8Wg-yHpUVWUuYW5onvhA';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpenJkZnlmbmxlaGNnY2JldnZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjcyMTE1NywiZXhwIjoyMDYyMjk3MTU3fQ.lAYwEOGlLpqr4PhZ0g3f1WktlW64_8GTCk1Tco8QlRA';

// Create Supabase client with anonymous key (for client-side operations)
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create Supabase admin client with service key (for server-side operations)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

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