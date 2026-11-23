const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const rs=n=>'Rs '+Number(n).toLocaleString('en-PK');
export async function sendOrderEmail({to,name,address,city,order}){
 const key=process.env.RESEND_API_KEY;if(!key)return;
 const td='padding:10px 0;border-bottom:1px solid #e8e4da';
 const rows=order.items.map(i=>`<tr><td style="${td}">${esc(i.name)} × ${i.qty}</td><td align="right" style="${td}">${rs(i.price*i.qty)}</td></tr>`).join('');
 const html=`<div style="background:#f3f0e8;padding:24px;font-family:Arial,sans-serif;color:#16231c"><div style="max-width:560px;margin:auto;background:#fff;border-radius:16px;overflow:hidden">
 <div style="background:#012B1D;padding:22px;text-align:center"><img src="${process.env.NEXT_PUBLIC_SITE_URL||''}/images/logo.png" alt="Al Qamar Citrus" height="48" style="height:48px;width:auto"></div>
 <div style="padding:28px"><h2 style="margin:0 0 8px;color:#012B1D">Thank you, ${esc(name)}!</h2><p style="margin:0 0 18px">Your order has been received. We will contact you shortly to confirm delivery.</p>
 <p style="background:#fff3ea;border-left:4px solid #FF6A00;padding:12px 16px;margin:0 0 20px">Order number: <b style="color:#FF6A00">${esc(order.order_no)}</b></p>
 <table width="100%" cellspacing="0" style="font-size:15px">${rows}<tr><td style="padding:14px 0"><b>Total (cash on delivery)</b></td><td align="right"><b style="color:#FF6A00;font-size:17px">${rs(order.total)}</b></td></tr></table>
 <p style="margin:20px 0 4px"><b>Delivery address</b></p><p style="margin:0;color:#555">${esc(address)}, ${esc(city)}</p>
 <p style="margin:24px 0 0;color:#555;font-size:14px">Please keep the amount ready in cash. Just reply to this email if you have any questions.</p></div>
 <div style="background:#011710;color:#9db;padding:16px;text-align:center;font-size:12px">Al Qamar Citrus · Sargodha, Punjab, Pakistan</div></div></div>`;
 const body={from:process.env.EMAIL_FROM||'Al Qamar Citrus <orders@alqamercitrus.com>',to:[to],subject:`Order ${order.order_no} confirmed – Al Qamar Citrus`,html};
 if(process.env.RESEND_REPLY_TO)body.reply_to=process.env.RESEND_REPLY_TO;
 const r=await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},body:JSON.stringify(body)});
 if(!r.ok)throw new Error(await r.text());
}
