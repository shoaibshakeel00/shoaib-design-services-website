import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';

export async function GET() {
  const { isAdmin, supabase } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
  return NextResponse.json({ orders: error ? [] : data || [] });
}

export async function PATCH(req: Request) {
  const { isAdmin, supabase } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const b = await req.json();
  const allowed = ['New', 'Pending', 'In Progress', 'Completed', 'Cancelled'];
  if (!b.id || !allowed.includes(b.status)) return NextResponse.json({ error: 'Invalid update' }, { status: 400 });
  const { error } = await supabase.from('orders').update({ status: b.status, admin_notes: String(b.admin_notes || '').slice(0, 4000) }).eq('id', b.id);
  if (error) return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { isAdmin, supabase } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { error } = await supabase.from('orders').delete().eq('id', id);
  if (error) return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
