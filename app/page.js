import Link from 'next/link';
import {supabase} from '../lib/supabase';
import ProductCard from '../components/ProductCard';
import Reveal from '../components/Reveal';
export const revalidate=60;
// HERO IMAGE: put your transparent-background orange photo at public/images/orange.png (or change this path)
const HERO_IMAGE='/images/orange.png';
const T='Sargodha Kinnow • Fresh Oranges • Cash on Delivery • Farm to Door • ';
const H=[['Fresh'],['citrus,'],['straight',1],['from'],['the'],['orchard.']];
const d=s=>({animationDelay:s+'s'});
export default async function Home(){
 const {data}=await supabase.from('products').select('*').eq('active',true).order('created_at',{ascending:false}).limit(8);
 return <>
 <div className="hero"><span className="leaf" style={{left:'6%',top:'18%'}}>🍃</span><span className="leaf" style={{left:'48%',top:'8%',...d(2)}}>🍃</span><span className="leaf" style={{left:'90%',top:'72%',...d(4)}}>🍃</span>
 <div className="wrap"><div><span className="lbl a" style={d(.1)}>Sargodha, Punjab — Pakistan</span>
 <h1>{H.map(([w,e],i)=><span key={i}>{e?<em><span className="w" style={d(.25+i*.1)}>{w}</span></em>:<span className="w" style={d(.25+i*.1)}>{w}</span>}{' '}</span>)}</h1>
 <p className="a" style={d(.95)}>Sweet, juicy kinnow and oranges grown in Pakistan's citrus capital and delivered to your door. Pay only when it arrives.</p>
 <div className="a btnrow" style={d(1.1)}><Link className="btn" href="/shop">Shop now →</Link></div>
 <div className="stats a" style={d(1.3)}><div><b>100%</b><span className="muted">Farm fresh</span></div><div><b>COD</b><span className="muted">Pay on delivery</span></div><div><b>PK</b><span className="muted">Nationwide delivery</span></div></div></div>
 <div className="a" style={d(.5)}><div className="orb"><img src={HERO_IMAGE} alt="Fresh Sargodha oranges" width="800" height="800"/></div></div></div></div>
 <div className="strip"><div>{T.repeat(8)}</div></div>
 <section><div className="wrap"><Reveal><div className="sh"><div><span className="lbl">Fresh picks</span><h2>Our oranges</h2></div><Link className="btn o" href="/shop">View all</Link></div></Reveal>
 <div className="grid">{(data||[]).map((p,i)=><Reveal key={p.id} delay={(i%4)*100}><ProductCard p={p}/></Reveal>)}</div>{!data?.length&&<p className="muted">Products coming soon.</p>}</div></section>
 <section style={{paddingTop:0}}><div className="wrap"><Reveal><span className="lbl">Why Al Qamar</span><h2 style={{margin:'10px 0 36px'}}>Grown with care</h2></Reveal>
 <div className="why">{[['01','Sargodha grown','Our fruit comes from the orchards around Sargodha, known across Pakistan for its citrus.'],['02','Pay on delivery','No advance payment and no online card needed. You pay when the oranges reach you.'],['03','Packed fresh','Every order is sorted and packed carefully so it reaches you sweet and juicy.']].map(([n,t,x],i)=><Reveal key={n} delay={i*150}><div><span>{n}</span><h3>{t}</h3><p className="muted">{x}</p></div></Reveal>)}</div></div></section>
 <section style={{paddingTop:0}}><div className="wrap"><Reveal><div className="cta"><h2>Taste the difference of real Sargodha citrus.</h2><Link className="btn" href="/shop">Order now →</Link></div></Reveal></div></section></>;
}
