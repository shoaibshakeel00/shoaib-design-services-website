export const siteConfig = {
  name: 'Shoaib Digital Services',
  email: process.env.NEXT_PUBLIC_BUSINESS_EMAIL || 'shoaibportfolio1@gmail.com',
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '923153400086',
  whatsappDisplay: '0315 3400086',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  description: 'Professional online CV, job form, admission, document, computer, design and website services.',
  social: { facebook: '', instagram: '', linkedin: '' },
};

export const whatsappLink = (message = 'Hello, I need help with an online service.') =>
  `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(message)}`;
