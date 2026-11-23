'use client';
import {useEffect,useState} from 'react';
import {supabase,rs} from '../../lib/supabase';
const ST=['Pending','Confirmed','Packed','Out for Delivery','Delivered','Cancelled'];
export default function Admin(){
 const [u,setU]=useState(null),[tab,setTab]=useState('orders'),[orders,setOrders]=useState([]),[prods,setProds]=useState([]),[em,setEm]=useState(''),[pw,setPw]=useState(''),[err,setErr]=useState('');
 const [np,setNp]=useState({name:'',price:'',unit:'per dozen',description:'',stock:100}),[file,setFile]=useState(null);
 const load=async()=>{setOrders((await supabase.from('orders').select('*').order('created_at',{ascending:false})).data||[]);setProds((await supabase.from('products').select('*').order('created_at',{ascending:false})).data||[])};
 useEffect(()=>{supabase.auth.getSession().then(({data})=>setU(data.session?.user||null))},[]);
 useEffect(()=>{if(u)load()},[u]);
 async function login(e){e.preventDefault();const {data,error}=await supabase.auth.signInWithPassword({email:em,password:pw});error?setErr(error.message):setU(data.user)}
 async function saveOrder(o){const {error}=await supabase.from('orders').update({status:o.status,courier:o.courier,tracking_no:o.tracking_no,tracking_note:o.tracking_note,updated_at:new Date()}).eq('id',o.id);alert(error?error.message:'Saved')}
 const edit=(id,k,v)=>setOrders(orders.map(o=>o.id===id?{...o,[k]:v}:o));
 async function addProd(e){e.preventDefault();let image_url=null;
  if(file){const path=Date.now()+'-'+file.name.replace(/\s/g,'_');const up=await supabase.storage.from('products').upload(path,file);if(up.error)return alert(up.error.message);image_url=supabase.storage.from('products').getPublicUrl(path).data.publicUrl}
  const slug=np.name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
  const {error}=await supabase.from('products').insert({...np,slug,price:+np.price,stock:+np.stock,image_url});
  if(error)return alert(error.message);setNp({name:'',price:'',unit:'per dozen',description:'',stock:100});setFile(null);load()}
 if(!u)return <section><div className="wrap" style={{maxWidth:420}}><form className="box" onSubmit={login}><h2>Admin login</h2><input type="email" placeholder="Email" value={em} onChange={e=>setEm(e.target.value)}/><input type="password" placeholder="Password" value={pw} onChange={e=>setPw(e.target.value)}/>{err&&<p style={{color:'crimson'}}>{err}</p>}<button className="btn g">Sign in</button></form></div></section>;
 return <section><div className="wrap"><div className="tabs"><button className={'btn '+(tab==='orders'?'on':'')} onClick={()=>setTab('orders')}>Orders ({orders.length})</button><button className={'btn '+(tab==='products'?'on':'')} onClick={()=>setTab('products')}>Products</button><button className="btn o" onClick={()=>supabase.auth.signOut().then(()=>setU(null))}>Sign out</button></div>
 {tab==='orders'&&orders.map(o=><div className="box" key={o.id}><b>{o.order_no}</b> · {o.name} · {o.phone} · {o.email} · {o.city}<p className="muted">{o.address}{o.notes&&` — ${o.notes}`}</p><p>{o.items?.map(i=>`${i.qty}× ${i.name}`).join(', ')} — <b>{rs(o.total)}</b> (COD)</p>
 <select value={o.status} onChange={e=>edit(o.id,'status',e.target.value)}>{ST.map(s=><option key={s}>{s}</option>)}</select>
 <input placeholder="Courier (e.g. TCS, Leopards)" value={o.courier||''} onChange={e=>edit(o.id,'courier',e.target.value)}/><input placeholder="Tracking number" value={o.tracking_no||''} onChange={e=>edit(o.id,'tracking_no',e.target.value)}/><input placeholder="Note shown to customer" value={o.tracking_note||''} onChange={e=>edit(o.id,'tracking_note',e.target.value)}/><button className="btn" onClick={()=>saveOrder(o)}>Save update</button></div>)}
 {tab==='products'&&<><form className="box" onSubmit={addProd}><h3>Add product</h3><input required placeholder="Name" value={np.name} onChange={e=>setNp({...np,name:e.target.value})}/><input required type="number" placeholder="Price (Rs)" value={np.price} onChange={e=>setNp({...np,price:e.target.value})}/><input placeholder="Unit (per dozen / per kg)" value={np.unit} onChange={e=>setNp({...np,unit:e.target.value})}/><input type="number" placeholder="Stock" value={np.stock} onChange={e=>setNp({...np,stock:e.target.value})}/><textarea rows="3" placeholder="Description (good for SEO)" value={np.description} onChange={e=>setNp({...np,description:e.target.value})}/><input type="file" accept="image/*" onChange={e=>setFile(e.target.files[0])}/><button className="btn g">Add product</button></form>
 {prods.map(p=><div className="box row" key={p.id}><span>{p.name} — {rs(p.price)} {!p.active&&'(hidden)'}</span><span><button className="btn o" onClick={async()=>{await supabase.from('products').update({active:!p.active}).eq('id',p.id);load()}}>{p.active?'Hide':'Show'}</button> <button className="btn o" onClick={async()=>{if(confirm('Delete?')){await supabase.from('products').delete().eq('id',p.id);load()}}}>Delete</button></span></div>)}</>}</div></section>;
}
