import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck, Sparkles, Zap, Layers3, MessageCircle } from 'lucide-react';
import ServiceCard from '@/components/ServiceCard';
import HeroDevices from '@/components/HeroDevices';
import AdSlot from './components/AdSlot';
import { services } from '@/data/services';
import { siteConfig, whatsappLink } from '@/data/siteConfig';

export default function Home() {
  return (
    <main>
      <div className="container" style={{ paddingTop: 18 }}><AdSlot position="Homepage Hero" /></div>

      <section className="hero">
        <div className="container hero-grid">
          <div>
            <div className="hero-kicker"><span className="hero-kicker-dot" /> Online • Karachi & Pakistan • 24/7 requests</div>
            <span className="eyebrow" style={{ marginTop: 18 }}>Shoaib Digital Services</span>
            <h1>Build it. Design it. <span className="gradient-text">Get it done.</span></h1>
            <p className="lead">Professional CVs, job applications, admission forms, document services, graphics and full-stack websites — delivered through one clean online workflow.</p>
            <div className="hero-actions">
              <Link className="btn btn-primary" href="/services">Explore Services <ArrowRight size={17} /></Link>
              <Link className="btn btn-ghost" href="/order">Start an Order</Link>
              <a className="btn btn-whatsapp" href={whatsappLink()} target="_blank" rel="noreferrer"><MessageCircle size={17} /> WhatsApp</a>
            </div>
            <div className="trust-row">
              <span><CheckCircle2 size={16} /> Secure request workflow</span>
              <span><ShieldCheck size={16} /> Private document storage</span>
              <span><Zap size={16} /> Fast online support</span>
            </div>
          </div>
          <HeroDevices />
        </div>
      </section>

      <div className="marquee"><div className="marquee-track">CV DESIGN • JOB APPLICATIONS • ADMISSION FORMS • PASSPORT PHOTOS • WINDOWS & SOFTWARE • BUSINESS POSTERS • BUSINESS CARDS • RESPONSIVE WEBSITES • DOCUMENT TYPING • ONLINE APPLICATIONS • CV DESIGN • JOB APPLICATIONS • ADMISSION FORMS •</div></div>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <div><span className="eyebrow"><Sparkles size={14}/> Services</span><h2 className="title">Professional help, without the complicated process.</h2><p className="lead">Choose a service, preview a template, upload your information and track your request.</p></div>
            <Link className="btn btn-ghost" href="/services">View all services</Link>
          </div>
          <div className="cards">{services.slice(0, 6).map(s => <ServiceCard service={s} key={s.slug} />)}</div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 20 }}>
        <div className="container">
          <div className="section-head"><div><span className="eyebrow"><Layers3 size={14}/> Simple workflow</span><h2 className="title">From idea to finished work.</h2></div></div>
          <div className="steps">
            {[['01','Choose Service','Find exactly what you need.'],['02','Select Template','Pick a professional design when available.'],['03','Send Information','Fill in details and upload documents.'],['04','Track & Receive','Follow your request until completion.']].map(([n,t,d]) => <div className="card" key={n}><div className="step-num">{n}</div><h3>{t}</h3><p className="muted">{d}</p></div>)}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="card" style={{ background: 'linear-gradient(135deg,rgba(11,55,34,.85),rgba(3,15,9,.96))', borderColor: 'rgba(77,255,169,.2)' }}>
            <div className="two-col" style={{ alignItems: 'center' }}>
              <div><span className="eyebrow">Need something custom?</span><h2 className="title">Full-stack websites with the same premium green-glow direction.</h2><p style={{ color: '#9bb8a8', lineHeight: 1.7 }}>Responsive UI, service ordering, document workflow, tracking, reviews, jobs, advertisements and an admin dashboard are already part of this project.</p></div>
              <div style={{ textAlign: 'right' }}><Link className="btn btn-primary" href="/services/website-design">Website Services</Link></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 10 }}>
        <div className="container contact-grid">
          <div className="info-box"><span className="eyebrow">Contact</span><h2 className="title">Need quick help?</h2><p className="muted">WhatsApp: <b style={{ color: 'var(--text)' }}>{siteConfig.whatsappDisplay}</b><br/>Email: <b style={{ color: 'var(--text)' }}>{siteConfig.email}</b></p></div>
          <div className="info-box"><span className="eyebrow">Order & track</span><h3>Everything stays connected.</h3><p className="muted">Submit an order, upload files, save your order code and check the latest status anytime.</p><div className="card-actions"><Link className="btn btn-primary" href="/order">Create Order</Link><Link className="btn btn-ghost" href="/track">Track Order</Link></div></div>
        </div>
      </section>
    </main>
  );
}
