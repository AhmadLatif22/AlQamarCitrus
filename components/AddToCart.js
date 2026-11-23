'use client';
import {useState} from 'react';
import {useCart} from './CartProvider';
export default function AddToCart({p}){
 const {add}=useCart();const [ok,setOk]=useState(false);
 return <button className="btn" onClick={()=>{add(p);setOk(true);setTimeout(()=>setOk(false),1200)}}>{ok?'Added ✓':'Add to cart'}</button>;
}
