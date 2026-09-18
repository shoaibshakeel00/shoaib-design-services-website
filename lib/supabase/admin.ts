import { createClient } from '@supabase/supabase-js';

function env(...names: string[]) {
  for (const name of names) {
    const value = process.env[name];
    if (value) return value;
  }
  throw new Error(`Missing Supabase environment variable: ${names.join(' or ')}`);
}

export function createAdminClient() {
  // SUPABASE_SECRET_KEY is the preferred server-only key. The service-role
  // name is supported too so existing Vercel/Supabase projects keep working.
  const url = env('NEXT_PUBLIC_SUPABASE_URL');
  const key = env('SUPABASE_SECRET_KEY', 'SUPABASE_SERVICE_ROLE_KEY');
  return createClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
      detectSessionInUrl: false,
    },
  });
}
