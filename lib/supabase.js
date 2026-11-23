import {createClient} from '@supabase/supabase-js';
export const supabase=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const SITE=process.env.NEXT_PUBLIC_SITE_URL||'http://localhost:3000';
export const rs=n=>'Rs '+Number(n).toLocaleString('en-PK');
