import {supabase} from '../../lib/supabase';
import ProductCard from '../../components/ProductCard';
export const revalidate=60;
export const metadata={title:'Shop Fresh Oranges & Kinnow Online',description:'Browse and buy fresh Sargodha oranges and kinnow online with cash on delivery.',alternates:{canonical:'/shop'}};
export default async function Shop(){
 const {data}=await supabase.from('products').select('*').eq('active',true).order('created_at',{ascending:false});
 return <><div className="wrap pg"><span className="lbl">The collection</span><h1>Shop <em>oranges</em></h1></div><section style={{paddingTop:40}}><div className="wrap"><div className="grid">{(data||[]).map(p=><ProductCard key={p.id} p={p}/>)}</div>{!data?.length&&<p className="muted">No products yet.</p>}</div></section></>;
}
