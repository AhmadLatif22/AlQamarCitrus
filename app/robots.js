import {SITE} from '../lib/supabase';
export default function robots(){return{rules:{userAgent:'*',allow:'/',disallow:['/admin','/cart']},sitemap:SITE+'/sitemap.xml'}}
