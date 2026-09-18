# Shoaib Digital Services — Neon Engineering Full-Stack Theme

A Next.js + Supabase service platform redesigned around the supplied black + neon-green engineering reference.

## Frontend
- Black / deep-green engineering visual system
- Animated grid, scan-line, glow and floating effects
- Reference-inspired laptop + mobile hero showcase using the existing website template assets
- Responsive navigation and layouts for desktop, tablet and mobile
- Hover previews and animated service/template cards
- Floating WhatsApp contact: **0315 3400086**
- Email: **shoaibportfolio1@gmail.com**

## Service platform
- Service catalog and professional templates
- Service order flow
- Document upload with per-file progress
- Order tracking
- Reviews with admin approval
- Contact messages
- Live jobs with official apply links
- Admin advertisements
- Server-side admin authentication/session + role check
- Admin dashboard for orders, customers, documents, jobs, ads, reviews and messages

## Supabase connection
The app uses these exact environment variable names:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- `SUPABASE_SECRET_KEY`
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_BUSINESS_EMAIL`

Database/storage schema: `supabase/schema.sql`
Deployment guide: `VERCEL-SETUP.txt`

### Health check
After configuration, open `/api/health`. It checks the server-side Supabase database and private document storage connection.

## Run locally
```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Important
Never commit a real Supabase secret key to GitHub. Put it in `.env.local` locally and in Vercel Environment Variables for deployment.
