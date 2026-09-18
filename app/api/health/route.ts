import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  const checkedAt = new Date().toISOString();
  try {
    const db = createAdminClient();
    const [{ error: dbError }, { error: storageError }] = await Promise.all([
      db.from('settings').select('key').limit(1),
      db.storage.from('documents').list('', { limit: 1 }),
    ]);

    const database = !dbError;
    const storage = !storageError;
    const ok = database && storage;

    return NextResponse.json(
      {
        ok,
        database,
        storage,
        environment: {
          supabaseUrl: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
          publishableKey: Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
          secretKey: Boolean(process.env.SUPABASE_SECRET_KEY),
        },
        checkedAt,
      },
      { status: ok ? 200 : 503 },
    );
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        ok: false,
        database: false,
        storage: false,
        error: 'Supabase connection is not configured or unavailable.',
        checkedAt,
      },
      { status: 503 },
    );
  }
}
