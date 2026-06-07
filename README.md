# Portfolio

A production-ready personal portfolio built with Next.js 14, TypeScript, Tailwind CSS v3, Framer Motion, Lucide icons, and Resend-powered contact delivery.

## Stack

- Next.js 14 App Router
- TypeScript with `strict: true`
- Tailwind CSS v3 with a custom cyberpunk theme
- Framer Motion for section reveals and interface motion
- Lucide React for icons
- Resend for contact email delivery
- Vercel-ready deployment configuration

## Project Notes

- All editable content is centralized in [`lib/data.ts`](./lib/data.ts).
- The contact form posts to [`app/api/contact/route.ts`](./app/api/contact/route.ts).
- GitHub repositories are proxied through [`app/api/github/route.ts`](./app/api/github/route.ts).
- The resume file is expected at [`public/resume.pdf`](./public/resume.pdf).

## Local Setup

1. LOCAL SETUP
   `git clone <repo> && cd portfolio`
   `npm install`
   `cp .env.local.example .env.local   # Fill in all values`
   `npm run dev                         # http://localhost:3000`

2. GITHUB SETUP
   - Create repo on GitHub
   - `git init && git remote add origin <url> && git push -u origin main`

3. VERCEL DEPLOYMENT
   a. Go to vercel.com → New Project → import GitHub repo
   b. Framework preset: Next.js (auto-detected)
   c. Add environment variables (all from .env.local) in Vercel dashboard
      Settings → Environment Variables → add each one for Production
   d. Deploy. Vercel gives you a .vercel.app URL immediately.

4. CUSTOM DOMAIN (optional)
   Vercel dashboard → Settings → Domains → add your domain
   Update your DNS: add CNAME record pointing to cns.vercel-dns.com
   (or use Vercel's nameservers for full management)

5. FUTURE UPDATES
   `git add . && git commit -m "feat: ..." && git push`
   Vercel auto-deploys on every push to main.
   Pull requests get a preview URL automatically.

## Environment Variables

Copy `.env.local.example` to `.env.local` and provide:

- `GITHUB_USERNAME`
- `GITHUB_TOKEN`
- `RESEND_API_KEY`
- `CONTACT_EMAIL`
- `NEXT_PUBLIC_SITE_URL`

## Content Updates

- Update your narrative, links, project metadata, and skills in [`lib/data.ts`](./lib/data.ts).
- Replace or refresh [`public/resume.pdf`](./public/resume.pdf) whenever your resume changes.
- If you want public demos or additional featured project links, add `liveUrl` and `githubUrl` values in [`lib/data.ts`](./lib/data.ts).

## Deployment Tips

- The GitHub API route expects a personal access token with public repository access.
- The contact route requires both `RESEND_API_KEY` and `CONTACT_EMAIL`.
- Set `NEXT_PUBLIC_SITE_URL` to your final production domain so metadata, sitemap, and robots output the correct canonical URLs.
