import {NextResponse} from 'next/server';
import {supabase} from '../../../lib/supabase';
import {sendOrderEmail} from '../../../lib/email';
export async function POST(req){
 const b=await req.json().catch(()=>null);
 if(!b||!Array.isArray(b.items)||!b.items.length||!b.name||!b.phone||!b.address||!/^\S+@\S+\.\S+$/.test(b.email||''))return NextResponse.json({error:'Invalid order'},{status:400});
 const {data:no,error}=await supabase.rpc('place_order',{p_name:b.name,p_phone:b.phone,p_email:b.email,p_address:b.address,p_city:b.city||'',p_notes:b.notes||'',p_items:b.items.map(i=>({id:i.id,qty:Math.max(1,parseInt(i.qty)||1)}))});
 if(error)return NextResponse.json({error:'Could not place order'},{status:500});
 try{const {data}=await supabase.rpc('track_order',{p_no:no,p_phone:b.phone});if(data?.[0])await sendOrderEmail({to:b.email,name:b.name,address:b.address,city:b.city,order:data[0]})}catch(e){console.error('Order email failed:',e)}
 return NextResponse.json({order_no:no});
}
