import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { allowedMime, maxFileSize } from '@/lib/validation';

export async function POST(req: Request) {
  try {
    const b = await req.json();
    const orderId = String(b.orderId || '');
    const storagePath = String(b.storagePath || '');
    const fileName = String(b.fileName || '').slice(0, 160);
    const mimeType = String(b.mimeType || '');
    const fileSize = Number(b.fileSize);

    if (!orderId || !storagePath.startsWith(`${orderId}/`) || !fileName || !allowedMime.includes(mimeType) || !Number.isFinite(fileSize) || fileSize <= 0 || fileSize > maxFileSize) {
      return NextResponse.json({ error: 'Invalid upload record.' }, { status: 400 });
    }

    const db = createAdminClient();
    const { data: order } = await db.from('orders').select('id').eq('id', orderId).maybeSingle();
    if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });

    const { data: existing } = await db.from('order_files').select('id').eq('order_id', orderId).eq('storage_path', storagePath).maybeSingle();
    if (existing) return NextResponse.json({ ok: true, duplicate: true });

    const { error } = await db.from('order_files').insert({
      order_id: orderId,
      file_name: fileName,
      storage_path: storagePath,
      mime_type: mimeType,
      file_size: fileSize,
    });
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Complete upload error:', error);
    return NextResponse.json({ error: 'Unable to save file record.' }, { status: 500 });
  }
}
