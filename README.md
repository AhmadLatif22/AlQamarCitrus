# Al Qamar Citrus
1. Create a free project at supabase.com → SQL Editor → run `supabase/schema.sql` (safe to run again).
2. Auth → Users → add your admin user, then run: `insert into admins values('your@email.com');`
3. Copy `.env.example` to `.env.local` and fill the values. Run `npm i && npm run dev`.
4. Push to GitHub → import in Vercel → add the same env vars → deploy. Admin is at /admin. Set NEXT_PUBLIC_WHATSAPP (e.g. 923001234567) and NEXT_PUBLIC_EMAIL for the footer and contact page.
