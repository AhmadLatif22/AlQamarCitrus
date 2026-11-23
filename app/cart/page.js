'use client';
import Link from 'next/link';
import {useEffect,useState} from 'react';
import {useCart} from '../../components/CartProvider';
import {rs} from '../../lib/supabase';
const CITIES=['Abbottabad','Attock','Bahawalnagar','Bahawalpur','Bhakkar','Chakwal','Chiniot','Dera Ghazi Khan','Dera Ismail Khan','Faisalabad','Gujranwala','Gujrat','Hafizabad','Hyderabad','Islamabad','Jhang','Jhelum','Karachi','Kasur','Khanewal','Khushab','Kohat','Lahore','Larkana','Layyah','Mandi Bahauddin','Mardan','Mianwali','Mirpur','Multan','Muzaffargarh','Nankana Sahib','Narowal','Okara','Pakpattan','Peshawar','Quetta','Rahim Yar Khan','Rawalpindi','Sahiwal','Sargodha','Sheikhupura','Sialkot','Sukkur','Toba Tek Singh','Vehari','Wah Cantt','Other'];
const E={email:'',first:'',last:'',address:'',city:'',postal:'',phone:'',notes:''};
function F({label,err,children}){return <><div className={'fld'+(err?' err':'')}><label>{label}</label>{children}</div>{err&&<p className="ferr">{err}</p>}</>}
export default function Cart(){
 const {items,setQty,clear,total}=useCart();
 const [f,setF]=useState(E),[errs,setErrs]=useState({}),[save,setSave]=useState(false),[busy,setBusy]=useState(false),[err,setErr]=useState(''),[done,setDone]=useState(null);
 useEffect(()=>{try{const s=JSON.parse(localStorage.getItem('aqc_info')||'null');if(s){setF(x=>({...x,...s}));setSave(true)}}catch{}},[]);
 const set=k=>e=>setF({...f,[k]:e.target.value});
 async function submit(e){
  e.preventDefault();setErr('');
  const digits=f.phone.replace(/\D/g,'').replace(/^(92|0)/,'');const v={};
  if(!/^\S+@\S+\.\S+$/.test(f.email))v.email='Enter a valid email address';
  if(!f.first.trim())v.first='Enter your first name';
  if(!f.address.trim())v.address='Enter your delivery address';
  if(!f.city)v.city='Please select city from dropdown';
  if(!/^\d{9,10}$/.test(digits))v.phone='Enter a valid mobile number, e.g. 3XX XXXXXXX';
  setErrs(v);if(Object.keys(v).length)return;
  setBusy(true);
  try{if(save)localStorage.setItem('aqc_info',JSON.stringify({email:f.email,first:f.first,last:f.last,address:f.address,city:f.city,postal:f.postal,phone:f.phone}));else localStorage.removeItem('aqc_info')}catch{}
  const r=await fetch('/api/order',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:`${f.first} ${f.last}`.trim(),email:f.email,phone:'+92'+digits,city:f.city,address:f.address+(f.postal?`, ${f.postal}`:''),notes:f.notes,items:items.map(i=>({id:i.id,qty:i.qty}))})});
  const d=await r.json().catch(()=>({}));
  if(!r.ok){setErr('Could not place order. Please try again.');setBusy(false);return}
  clear();setDone(d.order_no);
 }
 if(done)return <section><div className="wrap" style={{maxWidth:620}}><div className="box" style={{textAlign:'center'}}><div style={{fontSize:'3rem'}}>🎉</div><h2 style={{fontSize:'2rem',margin:'10px 0'}}>Order placed</h2><p>Your order number is</p><h3 style={{color:'var(--o)',fontSize:'1.8rem',margin:'6px 0 14px'}}>{done}</h3><p className="muted">A confirmation has been sent to your email and we will contact you shortly. Please keep the amount ready in cash.</p><br/><Link className="btn" href="/shop">Continue shopping</Link></div></div></section>;
 if(!items.length)return <section><div className="wrap"><h2 style={{marginBottom:20}}>Your cart is empty</h2><Link className="btn" href="/shop">Browse oranges</Link></div></section>;
 return <section style={{paddingTop:50}}><div className="wrap two">
 <form onSubmit={submit} noValidate>
 <h3 className="sec" style={{marginTop:0}}>Contact</h3>
 <F label="Email" err={errs.email}><input type="email" value={f.email} onChange={set('email')} autoComplete="email"/></F>
 <h3 className="sec">Delivery</h3>
 <F label="Country/Region"><input value="Pakistan" readOnly/></F>
 <div className="g2"><div><F label="First name" err={errs.first}><input value={f.first} onChange={set('first')} autoComplete="given-name"/></F></div><div><F label="Last name"><input value={f.last} onChange={set('last')} autoComplete="family-name"/></F></div></div>
 <F label="Address" err={errs.address}><input value={f.address} onChange={set('address')} autoComplete="street-address" placeholder="House no, street, area"/></F>
 <div className="g2"><div><F label="City" err={errs.city}><select value={f.city} onChange={set('city')}><option value="">Select city from dropdown</option>{CITIES.map(c=><option key={c}>{c}</option>)}</select></F></div><div><F label="Postal code (optional)"><input value={f.postal} onChange={set('postal')} inputMode="numeric"/></F></div></div>
 <F label="Phone" err={errs.phone}><div className="ph2"><span>🇵🇰 +92</span><input type="tel" value={f.phone} onChange={set('phone')} placeholder="3XX XXXXXXX" autoComplete="tel-national"/></div></F>
 <F label="Order notes (optional)"><input value={f.notes} onChange={set('notes')} placeholder="Landmark, delivery time, etc."/></F>
 <label className="chk"><input type="checkbox" checked={save} onChange={e=>setSave(e.target.checked)}/>Save this information for next time</label>
 <h3 className="sec">Shipping method</h3>
 <div className="opt"><div><b>Cash on Delivery (COD)</b><small>Delivered to your door across Pakistan</small></div><b>Free</b></div>
 <h3 className="sec">Payment</h3><p className="muted" style={{marginBottom:12}}>Cash on delivery is the only payment method. No card or advance payment needed.</p>
 <div className="opt"><div><b>Cash on Delivery (COD)</b><small>You'll pay in cash when your order is delivered.</small></div><span style={{fontSize:'1.6rem'}}>💵</span></div>
 {err&&<p style={{color:'#ff8f8f',marginTop:14}}>{err}</p>}
 <button className="btn" disabled={busy} style={{width:'100%',marginTop:22,padding:'16px'}}>{busy?'Placing order…':`Complete order · ${rs(total)}`}</button></form>
 <aside className="box sum"><h2 style={{fontSize:'1.5rem',marginBottom:6}}>Order summary</h2>
 {items.map(i=><div className="item" key={i.id}>{i.image_url?<img src={i.image_url} alt=""/>:<div className="ph" style={{width:64,height:64,fontSize:'1.6rem',borderRadius:12}}>🍊</div>}
 <div className="g1"><strong>{i.name}</strong><div className="muted">{rs(i.price)}</div></div>
 <div className="q"><button type="button" onClick={()=>setQty(i.id,i.qty-1)}>−</button>{i.qty}<button type="button" onClick={()=>setQty(i.id,i.qty+1)}>+</button></div></div>)}
 <div className="tr"><span>Subtotal</span><span>{rs(total)}</span></div><div className="tr"><span>Shipping</span><span>Free</span></div>
 <div className="tr big"><span>Total</span><span>{rs(total)}</span></div></aside></div></section>;
}
