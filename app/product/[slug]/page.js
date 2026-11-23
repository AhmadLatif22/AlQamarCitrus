import {notFound} from 'next/navigation';
import {supabase,SITE,rs} from '../../../lib/supabase';
import AddToCart from '../../../components/AddToCart';
export const revalidate=60;
const get=async s=>(await supabase.from('products').select('*').eq('slug',s).eq('active',true).maybeSingle()).data;
export async function generateMetadata({params}){
 const p=await get(params.slug);if(!p)return{};
 return{title:p.name,description:(p.description||`Buy ${p.name} online`).slice(0,155),alternates:{canonical:`/product/${p.slug}`},openGraph:{title:p.name,images:p.image_url?[p.image_url]:[]}};
}
export default async function Product({params}){
 const p=await get(params.slug);if(!p)notFound();
 const ld={'@context':'https://schema.org','@type':'Product',name:p.name,image:p.image_url,description:p.description,brand:{'@type':'Brand',name:'Al Qamar Citrus'},offers:{'@type':'Offer',priceCurrency:'PKR',price:p.price,availability:p.stock>0?'https://schema.org/InStock':'https://schema.org/OutOfStock',url:`${SITE}/product/${p.slug}`}};
 return <section style={{paddingTop:50}}><div className="wrap two"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/>
 <div>{p.image_url?<img src={p.image_url} alt={p.name} style={{width:'100%',borderRadius:18}}/>:<div className="ph" style={{borderRadius:18}}>🍊</div>}</div>
 <div><h1>{p.name}</h1><p className="muted">{p.unit}</p><h2 style={{color:'var(--o)',margin:'14px 0'}}>{rs(p.price)}</h2><p style={{marginBottom:20}}>{p.description}</p><AddToCart p={p}/><p className="muted" style={{marginTop:16}}>💵 Cash on delivery · 📦 Trackable</p></div></div></section>;
}
