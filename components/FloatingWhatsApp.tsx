import { MessageCircle } from 'lucide-react';
import { siteConfig, whatsappLink } from '@/data/siteConfig';

export default function FloatingWhatsApp() {
  return (
    <a
      className="floating-whatsapp"
      href={whatsappLink('Hello Shoaib Digital Services, I need help with a service.')}
      target="_blank"
      rel="noreferrer"
      aria-label={`Contact on WhatsApp ${siteConfig.whatsappDisplay}`}
    >
      <MessageCircle size={26} />
      <span className="floating-whatsapp-label">WhatsApp • {siteConfig.whatsappDisplay}</span>
    </a>
  );
}
