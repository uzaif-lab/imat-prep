import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_KEY;

// Verify environment variables are set
if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceRoleKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
}

// Create a Supabase client for user operations
export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Create a Supabase admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl || '', supabaseServiceRoleKey || ''); 