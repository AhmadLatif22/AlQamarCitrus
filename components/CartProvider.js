'use client';
import {createContext,useContext,useEffect,useState} from 'react';
const C=createContext({});
export const useCart=()=>useContext(C);
export default function CartProvider({children}){
 const [items,setItems]=useState([]);
 useEffect(()=>{try{setItems(JSON.parse(localStorage.getItem('aqc')||'[]'))}catch{}},[]);
 const save=n=>{setItems(n);localStorage.setItem('aqc',JSON.stringify(n))};
 const add=(p,q=1)=>{const f=items.find(i=>i.id===p.id);save(f?items.map(i=>i.id===p.id?{...i,qty:i.qty+q}:i):[...items,{id:p.id,name:p.name,price:p.price,image_url:p.image_url,qty:q}])};
 const setQty=(id,q)=>save(q<1?items.filter(i=>i.id!==id):items.map(i=>i.id===id?{...i,qty:q}:i));
 const clear=()=>save([]);
 const count=items.reduce((a,i)=>a+i.qty,0),total=items.reduce((a,i)=>a+i.qty*i.price,0);
 return <C.Provider value={{items,add,setQty,clear,count,total}}>{children}</C.Provider>;
}
