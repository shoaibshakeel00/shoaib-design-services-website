import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';

const positions = ['Homepage Hero', 'Homepage Banner', 'Services Page', 'Jobs Page', 'Between Job Cards', 'Sidebar', 'Footer'];
const statuses = ['Active', 'Inactive'];

export async function GET() {
  const { isAdmin, supabase } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabase.from('ads').select('*').order('created_at', { ascending: false });
  return NextResponse.json({ ads: error ? [] : data || [] });
}

export async function POST(req: Request) {
  const { isAdmin, supabase } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const b = await req.json();
  if (!b.title || !positions.includes(b.position) || !statuses.includes(b.status)) return NextResponse.json({ error: 'Invalid advertisement data.' }, { status: 400 });

  const row = {
    title: String(b.title).slice(0, 160), image_url: String(b.image_url || '').slice(0, 1000), description: String(b.description || '').slice(0, 2000),
    button_text: String(b.button_text || 'View').slice(0, 50), destination_url: String(b.destination_url || '/services').slice(0, 1000),
    start_date: b.start_date || null, end_date: b.end_date || null, status: b.status, position: b.position,
  };
  const { error } = b.id ? await supabase.from('ads').update(row).eq('id', b.id) : await supabase.from('ads').insert(row);
  if (error) return NextResponse.json({ error: 'Unable to save advertisement.' }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { isAdmin, supabase } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { error } = await supabase.from('ads').delete().eq('id', id);
  if (error) return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
