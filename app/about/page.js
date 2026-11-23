import Link from 'next/link';
export const metadata={title:'About Us',description:'Al Qamar Citrus delivers fresh Sargodha oranges and kinnow across Pakistan, with cash on delivery.',alternates:{canonical:'/about'}};
export default function About(){
 return <><div className="wrap pg"><span className="lbl">Our story</span><h1>Rooted in <em>Sargodha</em></h1></div>
 <section style={{paddingTop:50}}><div className="wrap two"><div><p style={{fontSize:'1.25rem',marginBottom:20}}>Al Qamar Citrus brings the taste of Sargodha's orchards straight to your home.</p><p className="muted" style={{fontSize:'1rem'}}>Sargodha is known across Pakistan as the citrus capital. We work with local growers to select ripe, sweet kinnow and oranges, pack them with care and send them to customers across the country. Ordering is simple: add your fruit to the cart, enter your address and pay in cash when it arrives.</p></div>
 <div className="box"><h3 style={{marginBottom:12}}>What we promise</h3><div className="ci"><span>●</span><p>Fresh fruit from Sargodha</p></div><div className="ci"><span>●</span><p>Cash on delivery, always</p></div><div className="ci"><span>●</span><p>Careful sorting and packing</p></div><br/><Link className="btn" href="/shop">Shop now →</Link></div></div></section></>;
}
