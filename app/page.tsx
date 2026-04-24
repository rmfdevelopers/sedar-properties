'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Building2, 
  Key, 
  ShieldCheck, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Instagram, 
  Mail, 
  ArrowRight, 
  CheckCheck, 
  Loader2, 
  Menu, 
  X, 
  Building,
  Briefcase,
  PieChart,
  Map,
  ImageOff
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: bold
// Depth Treatment: layered
// Divider Style: D-STAT
// Typography Personality: refined

const brand = {
  name: "SEDAR Properties",
  tagline: "Realty Redefined",
  description: "Your trusted real estate partner in Lagos. We specialize in buying, selling, renting, and managing residential and commercial properties with an expert team.",
  industry: "Real Estate Services",
  region: "Nigeria",
  currency: "₦"
};

const colors = {
  primary: "#1A3080",
  secondary: "#F8F8F6",
  accent: "#F07020"
};

const IMAGES = {
  hero: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop",
  products: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2070&auto=format&fit=crop"
  ]
};

const useScrollReveal = <T extends HTMLElement>(threshold = 0.15) => {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

function SafeImage({ src, alt, fill, width, height, className, priority }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-navy-900 ${className}`}>
        <ImageOff size={28} className="text-white/20" />
      </div>
    );
  }
  return (
    <Image src={src} alt={alt} fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} priority={priority}
      onError={() => setError(true)} />
  );
}

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <main className="relative">
      <Navbar scrolled={scrolled} mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />
      <Hero />
      <Features />
      <About />
      <Divider />
      <Products />
      <Contact />
      <Footer />
    </main>
  );
}

function Navbar({ scrolled, mobileMenu, setMobileMenu }: any) {
  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#features" },
    { name: "Listings", href: "#products" },
    { name: "About", href: "#about" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4 ${
      scrolled ? 'bg-primary shadow-2xl py-3' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center font-black text-white text-xl shadow-lg group-hover:rotate-6 transition-transform">
            S
          </div>
          <span className="font-heading font-black text-2xl tracking-tighter text-white">
            SEDAR <span className={scrolled ? 'text-accent' : 'text-accent'}>Properties</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-semibold text-white/90 hover:text-accent transition-colors uppercase tracking-widest">
              {link.name}
            </a>
          ))}
          <a href="#contact" className="bg-accent text-white px-6 py-2.5 rounded-full font-bold text-sm hover:scale-105 transition-all shadow-lg">
            Book Consultation
          </a>
        </div>

        <button className="md:hidden text-white" onClick={() => setMobileMenu(true)}>
          <Menu size={32} />
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 z-[60] transition-transform duration-500 md:hidden ${mobileMenu ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileMenu(false)} />
        <div className="absolute right-0 top-0 h-full w-[80%] max-w-sm bg-primary p-8 shadow-2xl flex flex-col">
          <button className="self-end text-white mb-12" onClick={() => setMobileMenu(false)}>
            <X size={32} />
          </button>
          <div className="space-y-6">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setMobileMenu(false)}
                className="block text-2xl font-heading font-bold text-white hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#contact" 
              onClick={() => setMobileMenu(false)}
              className="inline-block w-full text-center bg-accent text-white py-4 rounded-xl font-bold text-lg"
            >
              Book Consultation
            </a>
          </div>
          <div className="mt-auto border-t border-white/10 pt-8">
            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Lagos Office</p>
            <p className="text-white/70 text-sm">{brand.region}</p>
          </div>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();
  return (
    <section id="home" className="min-h-screen relative flex items-center pt-20 overflow-hidden bg-primary">
      <SafeImage src={IMAGES.hero} alt="Luxury Property Lagos" fill className="object-cover opacity-60" priority />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-transparent" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-16 w-full relative z-10">
        <div ref={ref} className={`max-w-4xl transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <h1 className="font-heading text-4xl md:text-7xl font-black text-white leading-[1] tracking-tight mb-8">
            Luxury Living, <span className="text-accent">Redefined</span> Through Expertise
          </h1>
          <p className="text-white/70 mt-6 text-lg md:text-xl max-w-2xl leading-relaxed">
            Navigate the Lagos property market with confidence. We buy, sell, and manage high-value assets with precision and sharp delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 mt-12">
            <a href="#contact" className="bg-accent text-white px-10 py-5 font-black text-lg hover:brightness-110 transition rounded-full shadow-[0_10px_30px_rgba(240,112,32,0.3)] text-center">
              Book a Consultation
            </a>
            <a href="#products" className="text-white border-2 border-white/30 px-10 py-5 rounded-full hover:bg-white hover:text-primary transition-all font-bold text-lg text-center backdrop-blur-md">
              View Listings
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const features = [
    { title: "Buy & Sell", desc: "Seamless acquisition and liquidation of high-value assets across Lagos.", icon: Building2 },
    { title: "Property Management", desc: "Comprehensive oversight to ensure your investments maintain peak value.", icon: ShieldCheck },
    { title: "Rental Services", desc: "Connecting quality tenants with premium residential and commercial spaces.", icon: Key },
    { title: "Investment Advisory", desc: "Expert guidance on portfolio diversification through strategic real estate.", icon: TrendingUp },
  ];

  return (
    <section id="features" ref={ref} className="py-28 px-6 bg-secondary relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="font-heading text-5xl md:text-6xl font-black text-primary mb-6">Our Services</h2>
          <div className="w-24 h-2 bg-accent mb-6" />
          <p className="text-primary/60 text-xl max-w-2xl font-medium">Tailored real estate solutions for every investor and homeowner in the Lagos market.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`p-8 rounded-3xl border border-primary/5 bg-white shadow-xl hover:-translate-y-2 transition-all duration-500 group ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center text-accent mb-8 group-hover:bg-accent group-hover:text-white transition-all duration-500">
                <f.icon size={32} />
              </div>
              <h3 className="font-heading text-2xl font-bold text-primary mb-4 group-hover:text-accent transition-colors">{f.title}</h3>
              <p className="text-primary/50 leading-relaxed font-medium">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  return (
    <section id="about" ref={ref} className="py-28 px-6 bg-primary text-white overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-20'}`}>
          <h2 className="font-heading text-5xl md:text-6xl font-black mb-8 leading-tight">Your Trusted Partner in <span className="text-accent">Lagos Realty</span></h2>
          <p className="text-white/60 text-lg leading-relaxed mb-10">
            At SEDAR Properties, we believe real estate is more than just transactions—it&apos;s about building futures. Our expert team provides personalized service to ensure seamless transactions for residential and commercial properties. 
            <br /><br />
            From Lekki Phase 1 to the emerging corridors of Epe, we bring a level of local expertise and transparency that is unmatched. Sharp property acquisition, zero stress.
          </p>
          <div className="flex gap-4 items-center p-6 bg-white/5 rounded-2xl border border-white/10 border-l-4 border-l-accent">
            <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0">
              <CheckCheck className="text-white" size={24} />
            </div>
            <p className="text-sm font-semibold tracking-wide italic">Sharp property acquisition, nationwide reach.</p>
          </div>
        </div>
        
        <div className={`grid grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-20'}`}>
          {[
            { n: "500+", l: "Land Acres Sold", i: Map },
            { n: "1.2k+", l: "Residential Units", i: Building },
            { n: "85+", l: "Commercial Leases", i: Briefcase },
            { n: "₦10B+", l: "Managed Assets", i: PieChart }
          ].map((stat, i) => (
            <div key={i} className="bg-navy-900/50 p-8 rounded-3xl border border-white/5 hover:border-accent/40 transition-colors">
              <stat.i className="text-accent mb-4" size={28} />
              <p className="text-4xl font-black mb-1">{stat.n}</p>
              <p className="text-white/40 text-xs uppercase tracking-widest font-bold">{stat.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Divider() {
  const stats = [
    { number: '500+', label: 'Clients Served' },
    { number: '48h',  label: 'Avg. Turnaround' },
    { number: '100%', label: 'Satisfaction' }
  ];
  return (
    <div className="bg-accent py-12">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-black/10 text-center">
        {stats.map((s, i) => (
          <div key={i} className="px-8 py-6">
            <p className="text-4xl md:text-5xl font-black text-white tracking-tight">{s.number}</p>
            <p className="text-white/80 text-sm mt-1 font-black uppercase tracking-widest">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Products() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const products = [
    {
      name: "Luxury 4-Bedroom Terrace",
      description: "Modern architecture in the heart of Lekki Phase 1 with premium finishing and 24/7 security.",
      price: "₦185,000,000",
      image: IMAGES.products[0]
    },
    {
      name: "Commercial Office Wing",
      description: "Prime commercial real estate in Victoria Island, perfect for corporate headquarters.",
      price: "₦45,000,000/yr",
      image: IMAGES.products[1]
    },
    {
      name: "Prime Development Land",
      description: "500sqm dry land plot in a rapidly developing corridor of Epe, Lagos.",
      price: "₦15,000,000",
      image: IMAGES.products[2]
    }
  ];

  return (
    <section id="products" ref={ref} className="py-28 px-6 bg-secondary">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="font-heading text-5xl md:text-6xl font-black text-primary mb-4">Featured Listings</h2>
            <p className="text-primary/50 text-xl font-medium">Explore our curated selection of prime properties in Lagos.</p>
          </div>
          <a href="#contact" className="text-accent font-black text-lg border-b-4 border-accent pb-1 hover:text-primary hover:border-primary transition-all">
            See All Listings →
          </a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((p, i) => (
            <div 
              key={i} 
              className={`group bg-white rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 ${isVisible ? 'scale-100 opacity-100' : 'scale-90 opacity-0'}`}
              style={{ transitionDelay: `${i * 200}ms` }}
            >
              <div className="relative h-80">
                <SafeImage src={p.image} alt={p.name} fill className="object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-4 right-4 bg-accent text-white px-4 py-2 rounded-full text-xs font-black uppercase tracking-widest shadow-xl">
                  Featured
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
              </div>
              <div className="p-8">
                <h3 className="font-heading text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">{p.name}</h3>
                <p className="text-primary/50 text-sm mb-8 leading-relaxed line-clamp-2">{p.description}</p>
                <div className="flex items-center justify-between border-t border-primary/5 pt-6">
                  <p className="text-2xl font-black text-primary">{p.price}</p>
                  <a href="#contact" className="w-12 h-12 bg-primary group-hover:bg-accent text-white rounded-full flex items-center justify-center transition-all">
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <section id="contact" ref={ref} className="py-32 bg-primary relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h2 className="font-heading text-5xl md:text-7xl font-black text-white leading-[1] mb-8">
              Let&apos;s Build Your <br />
              <span className="text-accent">Wealth</span> Through Realty
            </h2>
            <p className="text-white/60 text-lg md:text-xl max-w-xl mb-12 leading-relaxed font-medium">
              Whether you&apos;re looking for a luxury home or a high-yield investment, our team is ready to guide you through the Lagos market.
            </p>
            
            <div className="space-y-4 md:space-y-6">
              {[
                { icon: Phone, label: "Call Us", value: "0902 299 8123" },
                { icon: Mail, label: "Email", value: "invest@sedarproperties.com" },
                { icon: Instagram, label: "Follow", value: "@sedarproperties" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 md:gap-6 p-4 md:p-5 rounded-2xl md:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all group overflow-hidden">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/20 group-hover:scale-110 transition-transform duration-500 shrink-0">
                    <item.icon className="w-6 h-6 md:w-8 md:h-8" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] font-black mb-1">{item.label}</p>
                    <p className="text-white text-base md:text-2xl font-black break-all md:break-normal line-clamp-1 md:line-clamp-none">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            {sent ? (
              <div className="bg-white p-12 rounded-[3.5rem] text-center shadow-2xl animate-scaleIn">
                <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/20">
                  <CheckCheck size={48} className="text-white" />
                </div>
                <h3 className="text-4xl font-heading font-black text-primary mb-4 uppercase tracking-tighter">Request Received</h3>
                <p className="text-primary/60 text-xl font-medium">Our investment team will contact you within 24 hours.</p>
              </div>
            ) : (
              <div className="bg-white p-8 md:p-14 rounded-[3.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.3)] relative">
                <div className="absolute -top-6 -right-6 w-28 h-28 bg-accent rounded-full flex flex-col items-center justify-center -rotate-12 shadow-2xl border-8 border-white">
                  <span className="text-white font-black text-3xl leading-none">24h</span>
                  <span className="text-white/80 font-bold text-[10px] uppercase tracking-widest mt-1">Reply</span>
                </div>
                
                <h3 className="font-heading text-4xl font-black text-primary mb-10 tracking-tight uppercase italic">Request a Callback</h3>
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <input 
                      type="text" 
                      placeholder="Name" 
                      className="w-full p-5 rounded-2xl bg-secondary border-2 border-transparent focus:border-accent outline-none transition-all font-bold text-primary placeholder:text-primary/30"
                      required
                      onChange={(e) => setForm({...form, name: e.target.value})}
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone" 
                      className="w-full p-5 rounded-2xl bg-secondary border-2 border-transparent focus:border-accent outline-none transition-all font-bold text-primary placeholder:text-primary/30"
                      required
                      onChange={(e) => setForm({...form, phone: e.target.value})}
                    />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full p-5 rounded-2xl bg-secondary border-2 border-transparent focus:border-accent outline-none transition-all font-bold text-primary placeholder:text-primary/30"
                    required
                    onChange={(e) => setForm({...form, email: e.target.value})}
                  />
                  <textarea 
                    placeholder="How can we help you today?" 
                    rows={4}
                    className="w-full p-5 rounded-2xl bg-secondary border-2 border-transparent focus:border-accent outline-none transition-all font-bold text-primary placeholder:text-primary/30 resize-none"
                    required
                    onChange={(e) => setForm({...form, message: e.target.value})}
                  />
                  <button 
                    disabled={loading}
                    className="w-full bg-primary text-white py-6 rounded-2xl font-black text-xl hover:bg-accent hover:scale-[1.02] active:scale-[0.98] transition-all shadow-xl shadow-primary/20 flex items-center justify-center gap-4 group"
                  >
                    {loading ? <Loader2 className="animate-spin" /> : (
                      <>
                        Get Started
                        <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-navy-900 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
          <div className="md:col-span-2">
            <a href="#home" className="flex items-center gap-2 mb-8 group">
              <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center font-black text-white text-2xl shadow-lg">
                S
              </div>
              <span className="font-heading font-black text-3xl tracking-tighter text-white">
                SEDAR <span className="text-accent">Properties</span>
              </span>
            </a>
            <p className="text-white/40 max-w-sm text-lg leading-relaxed mb-8">
              Lagos&apos; premier partner for high-yield real estate investment and luxury living. Realty redefined with precision.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
                <Instagram size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
                <Phone size={20} />
              </a>
              <a href="#" className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-accent hover:border-accent transition-all">
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-black text-xl mb-8 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-4">
              <li><a href="#home" className="text-white/50 hover:text-accent transition-colors font-medium">Home</a></li>
              <li><a href="#features" className="text-white/50 hover:text-accent transition-colors font-medium">Services</a></li>
              <li><a href="#products" className="text-white/50 hover:text-accent transition-colors font-medium">Listings</a></li>
              <li><a href="#about" className="text-white/50 hover:text-accent transition-colors font-medium">About</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-black text-xl mb-8 uppercase tracking-widest">Contact Us</h4>
            <ul className="space-y-4 text-white/50 font-medium">
              <li>Lagos, Nigeria</li>
              <li>09022998123</li>
              <li>invest@sedarproperties.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/20 text-sm font-medium">
            © {new Date().getFullYear()} SEDAR Properties. All Rights Reserved.
          </p>
          <div className="flex gap-8">
            <a href="#" className="text-white/20 text-xs uppercase tracking-widest font-black hover:text-accent transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/20 text-xs uppercase tracking-widest font-black hover:text-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}