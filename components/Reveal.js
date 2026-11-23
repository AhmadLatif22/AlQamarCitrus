'use client';
import {useEffect,useRef,useState} from 'react';
export default function Reveal({children,delay=0}){
 const r=useRef(null),[on,setOn]=useState(false);
 useEffect(()=>{const io=new IntersectionObserver(([e])=>{if(e.isIntersecting){setOn(true);io.disconnect()}},{threshold:.12});io.observe(r.current);return()=>io.disconnect()},[]);
 return <div ref={r} className={'rv'+(on?' in':'')} style={{transitionDelay:`${delay}ms`}}>{children}</div>;
}
