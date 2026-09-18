import { CheckCircle2, FileText, Globe2, Smartphone, BriefcaseBusiness, GraduationCap, Image as ImageIcon, Laptop, FileCheck2 } from 'lucide-react';

export default function HeroDevices() {
  return (
    <div className="device-stage" aria-label="Responsive website preview on laptop and mobile">
      <div className="device-grid" />

      <div className="laptop">
        <div className="laptop-screen">
          <div className="screen-inner">
            <img src="/templates/web-fresh.png" alt="Shoaib Digital Services website design preview" />
            <div className="screen-ui">
              <div className="bar" />
              <div>
                <div className="headline">Digital services that work beautifully.</div>
                <div className="mini" />
              </div>
              <div className="chips"><span className="chip"/><span className="chip"/><span className="chip"/><span className="chip"/></div>
            </div>
          </div>
        </div>
        <div className="laptop-base" />
      </div>

      <div className="phone">
        <div className="phone-screen service-phone-screen" aria-label="Animated service showcase">
          <div className="phone-notch" />
          <div className="phone-service-orbit orbit-one" />
          <div className="phone-service-orbit orbit-two" />
          <div className="phone-service-list">
            <div className="phone-service-item"><span><FileText size={14}/></span><b>CV & Resume</b><i>READY</i></div>
            <div className="phone-service-item"><span><BriefcaseBusiness size={14}/></span><b>Job Forms</b><i>FAST</i></div>
            <div className="phone-service-item"><span><GraduationCap size={14}/></span><b>Admissions</b><i>ONLINE</i></div>
            <div className="phone-service-item"><span><ImageIcon size={14}/></span><b>Design</b><i>PRO</i></div>
            <div className="phone-service-item"><span><Laptop size={14}/></span><b>Websites</b><i>LIVE</i></div>
            <div className="phone-service-item"><span><FileCheck2 size={14}/></span><b>Documents</b><i>DONE</i></div>
          </div>
          <div className="phone-service-footer"><Smartphone size={13}/> MOBILE SERVICE HUB</div>
        </div>
      </div>

      <div className="device-badge">
        <b><CheckCircle2 size={15} /> Fully responsive</b>
        <small>Desktop • Tablet • Mobile</small>
      </div>

      <div className="floating-card fc1"><FileText size={16} /><b> CV / Resume</b><br/><small>Professional layouts</small></div>
      <div className="floating-card fc2"><Smartphone size={16} /><b> Mobile ready</b><br/><small>Fast responsive UI</small></div>
      <div className="floating-card fc3"><Globe2 size={16} /><b> Websites</b><br/><small>Modern full-stack builds</small></div>
    </div>
  );
}
