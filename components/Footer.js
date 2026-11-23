import Link from 'next/link';
const ph=process.env.NEXT_PUBLIC_WHATSAPP,em=process.env.NEXT_PUBLIC_EMAIL;
export default function Footer(){
 return <footer><div className="wrap"><div className="fg">
 <div><img src="/images/logo.png" alt="Al Qamar Citrus" className="logoimg big"/><p>Fresh Sargodha oranges and kinnow, picked at peak ripeness and delivered to your door across Pakistan.</p></div>
 <div><h4>Explore</h4><Link href="/">Home</Link><Link href="/shop">Shop</Link><Link href="/about">About Us</Link><Link href="/contact">Contact Us</Link><Link href="/cart">Cart</Link></div>
 <div><h4>Customer care</h4><p>Cash on delivery</p><p>Nationwide delivery</p><p>Farm-fresh quality</p></div>
 <div><h4>Contact</h4><p>Sargodha, Punjab, Pakistan</p>{ph&&<a href={`tel:+${ph}`}>+{ph}</a>}{em&&<a href={`mailto:${em}`}>{em}</a>}</div></div>
 <div className="fb"><span>© {new Date().getFullYear()} Al Qamar Citrus. All rights reserved.</span><span>Grown in Sargodha 🍊</span></div></div></footer>;
}
