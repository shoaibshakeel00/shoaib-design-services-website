import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req: Request) {
  const u = new URL(req.url);
  const code = (u.searchParams.get('code') || '').trim().slice(0, 40);
  const contact = (u.searchParams.get('contact') || '').trim().slice(0, 160);

  if (!code || !contact) return NextResponse.json({ error: 'Order code and contact are required.' }, { status: 400 });

  try {
    const db = createAdminClient();
    const fields = 'order_code,service_title,status,created_at,updated_at';
    const { data: byWhatsapp } = await db.from('orders').select(fields).eq('order_code', code).eq('whatsapp', contact).maybeSingle();
    const { data: order } = byWhatsapp
      ? { data: byWhatsapp }
      : await db.from('orders').select(fields).eq('order_code', code).eq('email', contact).maybeSingle();

    if (!order) return NextResponse.json({ error: 'Order not found. Check the order code and contact details.' }, { status: 404 });
    return NextResponse.json({ order });
  } catch (error) {
    console.error('Track order error:', error);
    return NextResponse.json({ error: 'Unable to check the order right now.' }, { status: 503 });
  }
}
