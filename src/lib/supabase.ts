import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://bizrdfyfnlehcgcbevvo.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpenJkZnlmbmxlaGNnY2JldnZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MjExNTcsImV4cCI6MjA2MjI5NzE1N30.AErqkjAcKRiYa4SIx137zZf8Wg-yHpUVWUuYW5onvhA';
const supabaseServiceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJpenJkZnlmbmxlaGNnY2JldnZvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjcyMTE1NywiZXhwIjoyMDYyMjk3MTU3fQ.lAYwEOGlLpqr4PhZ0g3f1WktlW64_8GTCk1Tco8QlRA';

// Create a Supabase client for user operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Create a Supabase admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey); 