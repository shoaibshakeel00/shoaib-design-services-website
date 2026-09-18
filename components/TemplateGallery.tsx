'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Check, Eye, Sparkles } from 'lucide-react';
import { templates } from '@/data/templates';

const aliases: Record<string, string> = {
  'professional-resume': 'cv-resume',
  'private-job-form': 'government-job-form',
  'job-portal-account': 'government-job-form',
  'online-application': 'government-job-form',
  'photo-editing': 'passport-photo',
  'responsive-website': 'website-design',
  'software-installation': 'software-installation',
  'ms-office': 'ms-office',
  'windows-installation': 'windows-installation',
};

const pretty = (value: string) => value.replaceAll('-', ' ').replace(/\b\w/g, c => c.toUpperCase());

export default function TemplateGallery({ serviceSlug }: { serviceSlug?: string }) {
  const resolved = serviceSlug ? aliases[serviceSlug] || serviceSlug : 'all';
  const [active, setActive] = useState(resolved);
  const [preview, setPreview] = useState<any>(null);

  const services = useMemo(
    () => [...new Map(templates.map(t => [t.serviceSlug, t.serviceSlug])).values()],
    []
  );

  const list = useMemo(() => {
    if (active === 'all') return templates;
    return templates.filter(t => t.serviceSlug === active);
  }, [active]);

  return (
    <div className="template-gallery-shell">
      <div className="template-gallery-intro">
        <div>
          <span className="eyebrow"><Sparkles size={14} /> Professional templates</span>
          <p className="muted">Preview a design, select it, then send your information securely.</p>
        </div>
        <span className="template-count">{list.length} templates</span>
      </div>

      {!serviceSlug && (
        <div className="filter-row">
          <button className={active === 'all' ? 'active' : ''} onClick={() => setActive('all')}>All</button>
          {services.map(s => (
            <button key={s} className={active === s ? 'active' : ''} onClick={() => setActive(s)}>
              {pretty(s)}
            </button>
          ))}
        </div>
      )}

      <div className="template-grid">
        {list.map(t => (
          <article className="card template-card template-card-modern" key={t.slug}>
            <button className="template-image-button" type="button" onClick={() => setPreview(t)} aria-label={`Preview ${t.name}`}>
              <img className="template-image" src={t.image} alt={`${t.name} template preview`} loading="lazy" />
              <span className="template-image-overlay"><Eye size={16} /> Preview</span>
            </button>
            <div className="inner">
              <span className="eyebrow">{pretty(t.serviceSlug)}</span>
              <h3>{t.name}</h3>
              <p>{t.description}</p>
              <div className="template-meta"><span className="price">Rs. {t.price.toLocaleString()}</span><span className="muted small">Editable layout</span></div>
              <div className="card-actions">
                <button className="btn btn-ghost" onClick={() => setPreview(t)}><Eye size={16} /> Preview</button>
                <Link className="btn btn-primary" href={`/order?service=${serviceSlug || t.serviceSlug}&template=${t.slug}`}><Check size={16} /> Select</Link>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!list.length && <div className="notice">No template is required for this service. Continue to the order form.</div>}

      {preview && (
        <div className="modal-backdrop" onClick={() => setPreview(null)}>
          <div className="modal template-preview-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <div><span className="eyebrow">Template Preview</span><h2 className="title">{preview.name}</h2><p className="muted">{preview.description}</p></div>
              <button className="icon-btn" onClick={() => setPreview(null)}>×</button>
            </div>
            <img className="modal-image" src={preview.image} alt={preview.name} />
            <ul className="feature-list">{preview.features.map((f: string) => <li key={f}>{f}</li>)}</ul>
            <div className="card-actions"><Link className="btn btn-primary" href={`/order?service=${serviceSlug || preview.serviceSlug}&template=${preview.slug}`}>Select This Template • Rs. {preview.price.toLocaleString()}</Link></div>
          </div>
        </div>
      )}
    </div>
  );
}
