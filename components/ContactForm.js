'use client';
import {useState} from 'react';
export default function ContactForm(){
 const [f,setF]=useState({name:'',phone:'',msg:''});const s=k=>e=>setF({...f,[k]:e.target.value});
 const go=e=>{e.preventDefault();const t=`Hi Al Qamer Citrus, I'm ${f.name} (${f.phone}). ${f.msg}`;window.open(`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP||''}?text=${encodeURIComponent(t)}`,'_blank')};
 return <form className="box" onSubmit={go}><h3 style={{marginBottom:14}}>Send us a message</h3><input required placeholder="Your name" value={f.name} onChange={s('name')}/><input required placeholder="Phone number" value={f.phone} onChange={s('phone')}/><textarea required rows="5" placeholder="How can we help?" value={f.msg} onChange={s('msg')}/><button className="btn">Send via WhatsApp</button></form>;
}
