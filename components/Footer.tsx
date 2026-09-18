import Link from 'next/link';
import { Mail, MessageCircle, Phone } from 'lucide-react';
import { siteConfig, whatsappLink } from '@/data/siteConfig';

export default function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand"><span className="brand-mark">SD</span><span>Shoaib <b>Digital</b> Services</span></Link>
          <p className="muted footer-copy">Online digital, design and full-stack services — send your information from anywhere and receive your completed work online.</p>
          <div className="socials"><a href={whatsappLink()} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle /></a></div>
        </div>
        <div><h4>Quick Links</h4><Link href="/services">Services</Link><Link href="/templates">Templates</Link><Link href="/pricing">Pricing</Link><Link href="/jobs">Live Jobs</Link><Link href="/track">Track Order</Link></div>
        <div><h4>Services</h4><Link href="/services/cv-resume">CV / Resume</Link><Link href="/services/government-job-form">Job Forms</Link><Link href="/services/college-admission">Admission Forms</Link><Link href="/services/windows-installation">Computer Services</Link><Link href="/services/business-poster">Design Services</Link><Link href="/services/website-design">Website Design</Link></div>
        <div><h4>Contact</h4><a href={`mailto:${siteConfig.email}`}><Mail size={16}/> {siteConfig.email}</a><a href={whatsappLink()} target="_blank" rel="noreferrer"><Phone size={16}/> {siteConfig.whatsappDisplay}</a></div>
      </div>
      <div className="container footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span><span>Secure requests • Responsive design • Online support</span></div>
    </footer>
  );
}
