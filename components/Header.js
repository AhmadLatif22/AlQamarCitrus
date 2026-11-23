'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {useState} from 'react';
import {useCart} from './CartProvider';
const L=[['/','Home'],['/shop','Shop'],['/about','About Us'],['/contact','Contact Us']];
export default function Header(){
 const {count}=useCart();const p=usePathname();const [o,setO]=useState(false);
 return <header className="hdr"><div className="wrap nav"><Link href="/" className="logo" aria-label="Al Qamar Citrus home"><img src="/images/logo.png" alt="Al Qamar Citrus" className="logoimg" width="180" height="46"/></Link>
 <nav className={'links'+(o?' open':'')} onClick={()=>setO(false)}>{L.map(([h,t])=><Link key={h} href={h} className={p===h?'on':''}>{t}</Link>)}</nav>
 <div className="rt"><Link href="/cart" className="cartbtn">Cart <span>{count||0}</span></Link><button className="burger" aria-label="Menu" onClick={()=>setO(!o)}>{o?'✕':'☰'}</button></div></div></header>;
}
