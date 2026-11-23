import './globals.css';
import {Inter,Space_Mono} from 'next/font/google';
import CartProvider from '../components/CartProvider';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {SITE} from '../lib/supabase';
const sans=Inter({subsets:['latin'],variable:'--sans'});const mono=Space_Mono({subsets:['latin'],weight:'400',variable:'--mono'});
export const metadata={metadataBase:new URL(SITE),title:{default:'Al Qamer Citrus | Fresh Sargodha Oranges Delivered – Cash on Delivery',template:'%s | Al Qamer Citrus'},
 description:'Buy fresh Sargodha kinnow and oranges online from Al Qamer Citrus. Farm-fresh citrus delivered across Pakistan with cash on delivery.',
 keywords:['Sargodha oranges','buy kinnow online','fresh oranges Pakistan','citrus cash on delivery'],openGraph:{type:'website',siteName:'Al Qamer Citrus',locale:'en_PK'}};
const ld={'@context':'https://schema.org','@type':'LocalBusiness',name:'Al Qamer Citrus',description:'Fresh Sargodha oranges and kinnow delivered across Pakistan',address:{'@type':'PostalAddress',addressLocality:'Sargodha',addressRegion:'Punjab',addressCountry:'PK'},url:SITE,paymentAccepted:'Cash on Delivery'};
export default function Root({children}){
 return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(ld)}}/>
 <CartProvider><Header/><main>{children}</main><Footer/>
 <a className="wa" href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP||''}`}>WhatsApp us</a></CartProvider></body></html>;
}
