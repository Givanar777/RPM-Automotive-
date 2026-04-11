# RPM Automotive - Product Requirements Document

## Original Problem Statement
Refine the RPM Automotive website with design and functionality improvements. Updated colors and styles to match the metallic chrome RPM logo. Deep navy + electric cyan theme throughout.

## Architecture
- **Frontend**: Next.js 15.5 (TypeScript) at `/app/frontend/`
- **Backend**: FastAPI (Python) at `/app/backend/`
- **Database**: MongoDB - collections: users, leads, clients, service_records, login_attempts
- **Styling**: Tailwind CSS 4, Motion library for animations
- **Auth**: JWT with roles (admin/member), bcrypt
- **Bilingual**: EN/ES via React Context

## Color Palette (Matching Chrome Metallic Logo)
- Primary dark: `#0B1929` (deep navy - body/main backgrounds)
- Secondary dark: `#0F2640` (navy - cards, alternate sections)
- Border/steel: `#1A3652` (borders, subtle surfaces)
- Accent: `#38BDF8` (electric cyan - CTAs, links, highlights)
- Text primary: `#FFFFFF` (white - headings)
- Text body: `#94A3B8` / slate-400 (silver - body text)
- Text muted: `#64748B` / slate-500 (subdued labels)
- Stars: amber-400 (review ratings)

## What's Been Implemented (Jan 2026)

### Phase 1 - Content Refinement
- [x] Remove ASE certification, 12-month warranty, 30-min diagnostic
- [x] Call/Text CTAs (831-429-2096), no booking system
- [x] Address: 110 Stanford Ave. Santa Cruz, CA 95062
- [x] Bilingual EN/ES, site config for easy image/logo changes

### Phase 2 - Features
- [x] Mobile hamburger menu with dark theme
- [x] Google Maps embed in contact section
- [x] SMS notifications (MOCKED - needs Twilio credentials)
- [x] Admin dashboard with JWT auth, leads, clients, service history, team management

### Phase 3 - Logo & Theme Redesign
- [x] RPM metallic chrome logo integrated (navbar, footer, admin sidebar)
- [x] Full dark navy theme to match logo aesthetic
- [x] Electric cyan (#38BDF8) accent color replacing bright blue (#0070ea)
- [x] Dark navbar (bg-zinc-950) for logo contrast
- [x] All pages updated: homepage, services, about, contact, admin

## Key Files
- `/app/frontend/public/logo.webp` - Logo file (replace to change logo)
- `/app/frontend/lib/siteConfig.ts` - Images, contact info, hours
- `/app/frontend/lib/translations.ts` - All EN/ES text content
- `/app/frontend/app/globals.css` - Color variables and theme
- `/app/backend/server.py` - All API endpoints

## Prioritized Backlog
### P1
- Activate Twilio SMS (needs credentials)
- Set up business email
- SEO meta tags, password reset

### P2
- Email notifications, lead export CSV
- Image upload UI, Google reviews integration
- Analytics, invoice generation
