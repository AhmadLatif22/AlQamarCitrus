import ContactForm from '../../components/ContactForm';
export const metadata={title:'Contact Us',description:'Contact Al Qamar Citrus in Sargodha, Punjab for orders, bulk requests and questions.',alternates:{canonical:'/contact'}};
const ph=process.env.NEXT_PUBLIC_WHATSAPP,em=process.env.NEXT_PUBLIC_EMAIL;
export default function Contact(){
 return <><div className="wrap pg"><span className="lbl">Get in touch</span><h1>Contact <em>us</em></h1></div>
 <section style={{paddingTop:50}}><div className="wrap two"><div className="box"><h3>Visit or call</h3><div className="ci"><span>📍</span><p>Sargodha, Punjab, Pakistan</p></div>
 {ph&&<div className="ci"><span>📞</span><a href={`tel:+${ph}`}>+{ph}</a></div>}{em&&<div className="ci"><span>✉️</span><a href={`mailto:${em}`}>{em}</a></div>}
 <div className="ci"><span>💬</span><p>WhatsApp is the fastest way to reach us.</p></div></div><ContactForm/></div></section></>;
}
