import Link from 'next/link';
import AddToCart from './AddToCart';
import {rs} from '../lib/supabase';
export default function ProductCard({p}){
 return <div className="card"><Link href={`/product/${p.slug}`}>{p.image_url?<img src={p.image_url} alt={p.name} loading="lazy"/>:<div className="ph">🍊</div>}</Link>
 <div className="cb"><Link href={`/product/${p.slug}`}><h3>{p.name}</h3></Link><p className="muted">{p.unit}</p><div className="row"><strong>{rs(p.price)}</strong><AddToCart p={p}/></div></div></div>;
}
