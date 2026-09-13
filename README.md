# S.S Professional Services — Advanced React + Vercel

## Features
- Separate pages for Home, About, Services, Templates, Pricing and Contact.
- Individual service detail pages using React routing-style client navigation.
- 10 template image assets per service.
- Passport-size photo service.
- Government job portal account service.
- CV/Resume, posters, job forms, college forms, Windows and computer services.
- Client can select a service + template and send an order request.
- WhatsApp order links.
- Backend API at `/api/order`.
- Optional email notification through Resend.
- Free Vercel deployment ready.

## Backend / email connection
The frontend POSTs orders to `/api/order`.
For email notification, create these Vercel Environment Variables:
- `RESEND_API_KEY`
- `ADMIN_EMAIL=shoaibportfolio1@gmail.com`
- `FROM_EMAIL` = a verified sender/domain in Resend, e.g. `S.S Professional Services <orders@yourdomain.com>`

Without Resend variables, the API still validates and accepts the order and returns a request ID; it does not persist orders because Vercel serverless functions are stateless.

## Deploy
Upload to GitHub → Vercel → Import Project → Deploy.
No database is required for the basic free deployment.


## Automatic job alerts
The site now has a **Latest Government & Private Jobs** board.
- `/api/jobs` returns configured jobs.
- It includes official FPSC and National Jobs Portal entry points by default.
- Add `JOB_FEED_URLS` in Vercel Environment Variables for RSS/JSON feeds you are authorized to aggregate.
- The API caches responses for 15 minutes and deduplicates jobs.
- Government listings should link back to the official advertisement/application source rather than pretending S.S is the employer.

### About "ads"
There are two separate features:
1. **Job alerts** — latest government/private vacancies shown on your website.
2. **Paid ads** (Google/other advertisers) — ad slots can be added separately and are not the same thing as job alerts.
