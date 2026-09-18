import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { serviceMap } from '@/data/services';
import { templateMap } from '@/data/templates';

function makeOrderCode() {
  const year = new Date().getFullYear();
  const token = crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase();
  return `SDS-${year}-${token}`;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const s = serviceMap[String(body.serviceSlug || '')];
    const customer = body.customer || {};
    const templateSlug = String(body.templateSlug || '');
    const t = templateSlug ? templateMap[templateSlug] : null;

    const name = String(customer.name || '').trim();
    const whatsapp = String(customer.whatsapp || '').trim();
    const email = String(customer.email || '').trim();

    if (!s || !name || !whatsapp || !email) {
      return NextResponse.json({ error: 'Please provide service, name, WhatsApp and email.' }, { status: 400 });
    }
    if (templateSlug && (!t || t.serviceSlug !== s.slug)) {
      return NextResponse.json({ error: 'Selected template does not belong to this service.' }, { status: 400 });
    }

    const db = createAdminClient();
    const payload = {
      service_slug: s.slug,
      service_title: s.title,
      template_slug: t?.slug || null,
      template_name: t?.name || null,
      price: t?.price || s.price,
      customer_name: name.slice(0, 120),
      whatsapp: whatsapp.slice(0, 40),
      email: email.slice(0, 160),
      city: String(customer.city || '').trim().slice(0, 80),
      address: String(customer.address || '').trim().slice(0, 300),
      details: customer,
    };

    // Do not depend on the optional next_order_code() RPC. Generating the code
    // here keeps the order form working even when an older Supabase schema is
    // already deployed. A unique constraint protects against duplicates.
    for (let attempt = 0; attempt < 3; attempt++) {
      const order_code = makeOrderCode();
      const { data, error } = await db.from('orders').insert({ order_code, ...payload }).select().single();
      if (!error && data) return NextResponse.json({ order: data });
      if (error && !/duplicate|unique/i.test(error.message || '')) throw error;
    }

    throw new Error('Unable to generate a unique order code.');
  } catch (error) {
    console.error('Create order error:', error);
    const message = error instanceof Error ? error.message : '';
    if (/Missing Supabase environment variable/i.test(message)) {
      return NextResponse.json({ error: 'Supabase server configuration is missing. Add NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY in Vercel.' }, { status: 500 });
    }
    return NextResponse.json({ error: 'Unable to create request. Please check the Supabase database setup and try again.' }, { status: 500 });
  }
}
