import { NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin';

const categories = ['Government', 'Private', 'Bank', 'IT', 'Education', 'Internship', 'Karachi', 'Sindh', 'Pakistan'];
const statuses = ['Active', 'Draft', 'Expired'];
const lines = (value: unknown) => String(value || '').split('\n').map(x => x.trim()).filter(Boolean).slice(0, 30);

export async function GET() {
  const { isAdmin, supabase } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { data, error } = await supabase.from('jobs').select('*').order('created_at', { ascending: false });
  return NextResponse.json({ jobs: error ? [] : data || [] });
}

export async function POST(req: Request) {
  const { isAdmin, supabase } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const b = await req.json();
  if (!b.title || !b.organization || !b.description || !b.last_date || !b.official_apply_url || !categories.includes(b.category) || !statuses.includes(b.status)) {
    return NextResponse.json({ error: 'Required job fields are missing.' }, { status: 400 });
  }
  const row = {
    title: String(b.title).slice(0, 200), organization: String(b.organization).slice(0, 200), category: b.category,
    location: String(b.location || '').slice(0, 160), qualification: String(b.qualification || '').slice(0, 500), experience: String(b.experience || '').slice(0, 300),
    age_limit: String(b.age_limit || '').slice(0, 100), salary: String(b.salary || '').slice(0, 120), last_date: b.last_date,
    description: String(b.description).slice(0, 6000), requirements: lines(b.requirements), required_documents: lines(b.required_documents),
    official_apply_url: String(b.official_apply_url).slice(0, 1000), image_url: String(b.image_url || '').slice(0, 1000), status: b.status,
  };
  const { error } = b.id ? await supabase.from('jobs').update(row).eq('id', b.id) : await supabase.from('jobs').insert(row);
  if (error) return NextResponse.json({ error: 'Unable to save job.' }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(req: Request) {
  const { isAdmin, supabase } = await requireAdmin();
  if (!isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  const { error } = await supabase.from('jobs').delete().eq('id', id);
  if (error) return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  return NextResponse.json({ ok: true });
}
