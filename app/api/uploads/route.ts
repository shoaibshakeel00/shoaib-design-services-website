import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { allowedMime, maxFileSize } from '@/lib/validation';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get('content-type') || '';

    // Preferred upload path: send the file as multipart/form-data and let the
    // trusted server upload it to the private Supabase bucket. This avoids
    // browser signed-URL compatibility problems.
    if (contentType.includes('multipart/form-data')) {
      const form = await req.formData();
      const orderId = String(form.get('orderId') || '');
      const file = form.get('file');
      if (!orderId || !(file instanceof File)) {
        return NextResponse.json({ error: 'Order and file are required.' }, { status: 400 });
      }
      if (!allowedMime.includes(file.type) || file.size <= 0 || file.size > maxFileSize) {
        return NextResponse.json({ error: 'Invalid file. Maximum size is 4 MB.' }, { status: 400 });
      }

      const db = createAdminClient();
      const { data: order, error: orderError } = await db.from('orders').select('id').eq('id', orderId).maybeSingle();
      if (orderError) throw orderError;
      if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });

      const safe = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 160);
      const path = `${orderId}/${crypto.randomUUID()}-${safe}`;
      const bytes = Buffer.from(await file.arrayBuffer());
      const { error: uploadError } = await db.storage.from('documents').upload(path, bytes, {
        contentType: file.type,
        upsert: false,
      });
      if (uploadError) throw uploadError;

      const { error: recordError } = await db.from('order_files').insert({
        order_id: orderId,
        file_name: file.name.slice(0, 160),
        storage_path: path,
        mime_type: file.type,
        file_size: file.size,
      });
      if (recordError) {
        await db.storage.from('documents').remove([path]).catch(() => undefined);
        throw recordError;
      }

      return NextResponse.json({ ok: true, path });
    }

    // Legacy JSON preparation path kept for backwards compatibility.
    const { orderId, fileName, mimeType, fileSize } = await req.json();
    const size = Number(fileSize);
    if (!orderId || !fileName || !allowedMime.includes(mimeType) || !Number.isFinite(size) || size <= 0 || size > maxFileSize) {
      return NextResponse.json({ error: 'Invalid file. Maximum size is 4 MB.' }, { status: 400 });
    }
    const db = createAdminClient();
    const { data: order } = await db.from('orders').select('id').eq('id', orderId).maybeSingle();
    if (!order) return NextResponse.json({ error: 'Order not found.' }, { status: 404 });
    const safe = String(fileName).replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 160);
    const path = `${orderId}/${crypto.randomUUID()}-${safe}`;
    const { data, error } = await db.storage.from('documents').createSignedUploadUrl(path);
    if (error || !data?.signedUrl) throw error || new Error('Signed upload unavailable');
    return NextResponse.json({ signedUrl: data.signedUrl, path });
  } catch (error) {
    console.error('Upload error:', error);
    const message = error instanceof Error ? error.message : '';
    if (/Missing Supabase environment variable/i.test(message)) {
      return NextResponse.json({ error: 'Supabase server configuration is missing.' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unable to upload file. Check the Supabase documents bucket and server key.' }, { status: 500 });
  }
}
