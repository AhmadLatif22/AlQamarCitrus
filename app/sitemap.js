import {supabase,SITE} from '../lib/supabase';
export default async function sitemap(){
 const {data}=await supabase.from('products').select('slug,created_at').eq('active',true);
 return [{url:SITE,priority:1},{url:SITE+'/shop',priority:.9},{url:SITE+'/about'},{url:SITE+'/contact'},...(data||[]).map(p=>({url:`${SITE}/product/${p.slug}`,lastModified:p.created_at,priority:.8}))];
}
