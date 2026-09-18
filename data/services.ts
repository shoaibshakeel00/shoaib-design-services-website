export type Service = { slug:string; title:string; category:string; description:string; price:number; delivery:string; features:string[]; templates?:string[]; image?:string; };
export const services: Service[] = [
{slug:'cv-resume',title:'CV / Resume Design',category:'Documents',description:'Modern, polished CVs designed for recruiters and online applications.',price:500,delivery:'1–2 days',features:['ATS-friendly layouts','Professional formatting','PDF + editable copy'],templates:['modern-cv','professional-cv','ats-cv','corporate-cv','creative-cv','simple-cv','creative-cv-2','creative-cv-3','professional-cv-2','modern-cv-2','modern-cv-3','showcase-cv-resume']},
{slug:'professional-resume',title:'Professional Resume',category:'Documents',description:'Premium resume writing and presentation for competitive roles.',price:700,delivery:'1–2 days',features:['Clean hierarchy','Role-focused presentation','Revision included'],templates:['professional-cv','corporate-cv','simple-cv']},
{slug:'government-job-form',title:'Government Job Form Filling',category:'Jobs',description:'Careful online assistance for government vacancies and portals.',price:200,delivery:'Same day',features:['Form entry','Document checklist','Submission guidance'],templates:['njp-portal','sts-portal']},
{slug:'private-job-form',title:'Private Job Form Filling',category:'Jobs',description:'Application assistance for company career portals and forms.',price:200,delivery:'Same day',features:['Portal assistance','Data entry','Application checklist'],templates:['njp-portal','sts-portal']},
{slug:'college-admission',title:'College Admission Form',category:'Education',description:'Online college admission form assistance with document guidance.',price:300,delivery:'Same day',features:['Accurate data entry','Document review','Submission help'],templates:['college-form','modern-form','form-user','showcase-admission-forms']},
{slug:'university-admission',title:'University Admission Form',category:'Education',description:'University application support from account creation to submission.',price:300,delivery:'Same day',features:['Application entry','Document checklist','Submission support'],templates:['university-form','modern-form','showcase-admission-forms']},
{slug:'job-portal-account',title:'Job Portal Account Creation',category:'Jobs',description:'Create and configure profiles on job portals and career websites.',price:250,delivery:'Same day',features:['Account setup','Profile completion','Email guidance'],templates:['njp-portal','sts-portal']},
{slug:'sts-job-portal',title:'STS / Job Portal Form Services',category:'Jobs',description:'Application assistance for STS and other online job portals.',price:250,delivery:'Same day',features:['Portal navigation','Data entry','Document upload help'],templates:['sts-portal']},
{slug:'passport-photo',title:'Passport Size Photo',category:'Documents',description:'Professional passport/ID photo resizing, cleanup and background options.',price:150,delivery:'Same day',features:['Passport sizes','Background options','Digital delivery'],templates:['passport-white','passport-blue','passport-id','passport-white-user','passport-blue-user','showcase-passport-photo']},
{slug:'photo-editing',title:'Photo Background Removal / Editing',category:'Documents',description:'Clean background removal and practical photo retouching.',price:250,delivery:'Same day',features:['Background removal','Light cleanup','JPG/PNG delivery'],templates:['passport-white','passport-blue','passport-id']},
{slug:'windows-installation',title:'Computer & Laptop Windows Installation',category:'Computer',description:'Windows installation and essential driver/setup assistance.',price:1000,delivery:'Same day',features:['OS installation','Drivers','Basic setup'],templates:['showcase-it-services']},
{slug:'software-installation',title:'Computer Software Installation',category:'Computer',description:'Install and configure common desktop software.',price:500,delivery:'Same day',features:['Software setup','Configuration','Basic troubleshooting'],templates:['showcase-it-services']},
{slug:'ms-office',title:'MS Office Installation',category:'Computer',description:'Microsoft Office setup and configuration for supported systems.',price:500,delivery:'Same day',features:['Office setup','Activation guidance','Basic configuration'],templates:['showcase-it-services']},
{slug:'business-poster',title:'Business Poster Design',category:'Design',description:'Eye-catching promotional posters for shops, offers and services.',price:500,delivery:'1–2 days',features:['Custom layout','Social media sizes','2 revisions'],templates:['poster-modern','poster-restaurant','poster-electronics','poster-computer','poster-realestate','poster-corporate','poster-modern-user','poster-2','poster-3','showcase-business-poster']},
{slug:'business-card',title:'Business Card Design',category:'Design',description:'Professional business cards ready for print and digital use.',price:500,delivery:'1–2 days',features:['Front/back design','Print-ready PDF','Digital JPG/PNG'],templates:['card-modern','card-corporate','card-minimal','card-creative','card-tech','card-user','showcase-business-card']},
{slug:'website-design',title:'Website Design',category:'Websites',description:'Modern responsive websites for businesses, portfolios and services.',price:5000,delivery:'3–7 days',features:['Responsive UI','SEO foundation','Contact/WhatsApp CTA'],templates:['web-business','web-portfolio','web-restaurant','web-ecommerce','web-agency','web-personal','website-user','showcase-website-design']},
{slug:'responsive-website',title:'Website Responsive Design',category:'Websites',description:'Improve an existing website for mobile, tablet and desktop.',price:3500,delivery:'2–4 days',features:['Mobile-first fixes','Tablet layout','Performance cleanup'],templates:['web-business','web-portfolio','web-agency','web-personal']},
{slug:'document-typing',title:'Document Typing / Formatting',category:'Documents',description:'Fast document typing, formatting and clean PDF/Word preparation.',price:200,delivery:'Same day',features:['Word formatting','PDF cleanup','Tables/headings']},
{slug:'online-application',title:'Online Application Assistance',category:'Jobs',description:'Guided assistance for online forms, portals and document submission.',price:200,delivery:'Same day',features:['Form completion','Document upload','Submission guidance'],templates:['njp-portal','sts-portal']}
];
const serviceImages: Record<string,string> = {
  'cv-resume':'/templates/showcase-cv-resume.png',
  'professional-resume':'/templates/pro-cv-fresh.png',
  'government-job-form':'/templates/njp-portal.png',
  'private-job-form':'/templates/sts-portal.png',
  'college-admission':'/templates/college-form.png',
  'university-admission':'/templates/university-form.png',
  'job-portal-account':'/templates/sts-portal.png',
  'sts-job-portal':'/templates/njp-portal.png',
  'passport-photo':'/templates/passportzise-white-background.png',
  'photo-editing':'/templates/passport-id.png',
  'windows-installation':'/templates/poster-computer.png',
  'software-installation':'/templates/web-fresh.png',
  'ms-office':'/templates/modern-form.png',
  'business-poster':'/templates/poster-modern.png',
  'business-card':'/templates/card-modern.png',
  'website-design':'/templates/web-business.png',
  'responsive-website':'/templates/web-agency.png',
  'document-typing':'/templates/form-fresh.png',
  'online-application':'/templates/form-user.png',
};

services.forEach(service => { service.image = serviceImages[service.slug] || '/templates/showcase-it-services.png'; });

export const serviceMap = Object.fromEntries(services.map(s=>[s.slug,s]));
