import Link from 'next/link';
import {ArrowUpRight,Clock,FileText,Monitor,Palette,Globe,Eye} from 'lucide-react';
import type {Service} from '@/data/services';

const icons:any={Documents:FileText,Jobs:FileText,Education:FileText,Computer:Monitor,Design:Palette,Websites:Globe};

export default function ServiceCard({service}:{service:Service}){
  const Icon=icons[service.category]||FileText;
  return <article className="card service-card service-card-pro">
    <Link href={service.templates?.length?`/templates?service=${service.slug}`:`/services/${service.slug}`} className="service-image-wrap" aria-label={`View ${service.title} preview`}>
      <img className="service-image" src={service.image} alt={`${service.title} service preview`} loading="lazy" decoding="async" title={service.title}/>
      <span className="service-image-shade"/>
      <span className="service-image-label"><Eye size={14}/> Preview</span>
      <span className="service-icon service-icon-float"><Icon/></span>
    </Link>
    <div className="service-card-body">
      <span className="eyebrow">{service.category}</span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <div className="two-col service-meta"><span className="price">Rs. {service.price.toLocaleString()}</span><span className="muted small"><Clock size={14}/> {service.delivery}</span></div>
      <div className="service-features-mini">{service.features.slice(0,3).map(f=><span key={f}>✓ {f}</span>)}</div>
      <div className="card-actions">
        <Link className="btn btn-ghost" href={service.templates?.length?`/templates?service=${service.slug}`:`/services/${service.slug}`}><Eye size={16}/> View</Link>
        <Link className="btn btn-primary" href={`/order?service=${service.slug}`}>Order Now <ArrowUpRight size={16}/></Link>
      </div>
    </div>
  </article>
}
