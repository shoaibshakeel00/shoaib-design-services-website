import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';
import { createAdminClient } from '@/lib/supabase/admin';

const imageTypes = ['image/png', 'image/jpeg', 'image/webp'];
const maxAdImageSize = 5 * 1024 * 1024;

export async function POST(req: Request) {
  const { isAdmin } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const b = await req.json();
    const size = Number(b.fileSize || 0);
    if (!b.fileName || !imageTypes.includes(b.mimeType) || (size && size > maxAdImageSize)) {
      return NextResponse.json({ error: 'Only PNG, JPG and WebP images up to 5 MB are allowed.' }, { status: 400 });
    }

    const safe = String(b.fileName).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 160);
    const path = `ads/${crypto.randomUUID()}-${safe}`;
    const db = createAdminClient();
    const { data, error } = await db.storage.from('ad-images').createSignedUploadUrl(path);
    if (error || !data?.signedUrl) return NextResponse.json({ error: 'Upload unavailable' }, { status: 500 });

    return NextResponse.json({
      signedUrl: data.signedUrl,
      path,
      publicUrl: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/ad-images/${path}`,
    });
  } catch (error) {
    console.error('Ad upload error:', error);
    return NextResponse.json({ error: 'Upload unavailable' }, { status: 500 });
  }
}
