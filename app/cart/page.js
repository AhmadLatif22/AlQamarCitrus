'use client';
import Link from 'next/link';
import {useState} from 'react';
import {useCart} from '../../components/CartProvider';
import {supabase,rs} from '../../lib/supabase';
export default function Cart(){
 const {items,setQty,clear,total}=useCart();const [done,setDone]=useState(null);
 const [f,setF]=useState({name:'',phone:'',email:'',city:'',address:'',notes:''});const [busy,setBusy]=useState(false);const [err,setErr]=useState('');
 const set=k=>e=>setF({...f,[k]:e.target.value});
 async function submit(e){e.preventDefault();setBusy(true);setErr('');
  const r=await fetch('/api/order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({...f,phone:f.phone.trim(),items:items.map(i=>({id:i.id,qty:i.qty}))})});
  const d=await r.json().catch(()=>({}));
  if(!r.ok){setErr('Could not place order. Please try again.');setBusy(false);return}
  clear();setDone(d.order_no);}
 if(done)return <section><div className="wrap" style={{maxWidth:620}}><div className="box" style={{textAlign:'center'}}><div style={{fontSize:'3rem'}}>🎉</div><h2 style={{fontSize:'2rem',margin:'10px 0'}}>Order placed</h2><p>Your order number is</p><h3 style={{color:'var(--o)',fontSize:'1.8rem',margin:'6px 0 14px'}}>{done}</h3><p className="muted">A confirmation has been sent to your email and we will contact you shortly. Please keep your order number and pay in cash on delivery.</p><br/><Link className="btn" href="/shop">Continue shopping</Link></div></div></section>;
 if(!items.length)return <section><div className="wrap"><h2 style={{marginBottom:20}}>Your cart is empty</h2><Link className="btn" href="/shop">Browse oranges</Link></div></section>;
 return <section style={{paddingTop:50}}><div className="wrap two"><div className="box"><h2 style={{fontSize:'2rem',marginBottom:10}}>Your cart</h2>
 {items.map(i=><div className="item" key={i.id}>{i.image_url?<img src={i.image_url} alt=""/>:<div className="ph" style={{width:64,height:64,fontSize:'1.6rem',borderRadius:12}}>🍊</div>}
 <div className="g1"><strong>{i.name}</strong><div className="muted">{rs(i.price)}</div></div>
 <div className="q"><button onClick={()=>setQty(i.id,i.qty-1)}>−</button>{i.qty}<button onClick={()=>setQty(i.id,i.qty+1)}>+</button></div><strong>{rs(i.price*i.qty)}</strong></div>)}
 <h3 style={{textAlign:'right',marginTop:18}}>Total: <span style={{color:'var(--o)'}}>{rs(total)}</span></h3></div>
 <form className="box" onSubmit={submit}><h2 style={{fontSize:'2rem',marginBottom:10}}>Checkout</h2><span className="badge">Cash on delivery</span><br/><br/>
 <label>Full name<input required value={f.name} onChange={set('name')}/></label>
 <label>Phone<input required type="tel" pattern="[0-9+\- ]{10,15}" value={f.phone} onChange={set('phone')} placeholder="03XX XXXXXXX"/></label>
 <label>Email (for your order confirmation)<input required type="email" value={f.email} onChange={set('email')} placeholder="you@example.com"/></label>
 <label>City<input required value={f.city} onChange={set('city')}/></label>
 <label>Delivery address<textarea required rows="3" value={f.address} onChange={set('address')}/></label>
 <label>Notes (optional)<input value={f.notes} onChange={set('notes')}/></label>
 {err&&<p style={{color:'#ff8080'}}>{err}</p>}<button className="btn" disabled={busy} style={{width:'100%'}}>{busy?'Placing order…':`Place order · ${rs(total)}`}</button></form></div></section>;
}
