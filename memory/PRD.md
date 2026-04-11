# RPM Automotive - Product Requirements Document

## Original Problem Statement
Refine the RPM Automotive website with both design and functionality improvements while keeping the current theme. Specific changes requested:
- Remove ASE certification references
- Change 24 months warranty to 12 month warranty
- Change Free Diagnostic to "Get a diagnostic in 30 min"
- All communication via text or call only (no booking system) - phone: (831) 429-2096
- New address: 110 Stanford Ave. Santa Cruz, CA 95062
- Add lead management to save contacts when reached via text/call
- Make it easy to change pictures and logo in the future

## Architecture
- **Frontend**: Next.js 15.5 (TypeScript) at `/app/frontend/`
- **Backend**: FastAPI (Python) at `/app/backend/`
- **Database**: MongoDB (local) for lead storage
- **Styling**: Tailwind CSS 4, Motion library for animations
- **Bilingual**: EN/ES language support via React Context

## User Personas
1. **Vehicle Owner** - Needs car repair/diagnostics, contacts via phone or text
2. **Business Owner** - Manages leads and updates site content/images

## Core Requirements
- [x] Remove all ASE certification references
- [x] Change warranty from 24 months to 12 months
- [x] Change "Free Diagnostic" to "Get a diagnostic in 30 min"
- [x] Replace booking system with Call/Text CTAs
- [x] Update phone: (831) 429-2096
- [x] Update address: 110 Stanford Ave. Santa Cruz, CA 95062
- [x] Update location: Santa Cruz, CA (was Milpitas)
- [x] Bilingual EN/ES support
- [x] Lead management backend (MongoDB)
- [x] Site config file for easy image/logo changes (`/app/frontend/lib/siteConfig.ts`)

## What's Been Implemented (Jan 2026)
1. **Content Updates**: All text changes applied in both EN/ES translations
2. **Design Improvements**: Updated fonts (Outfit + DM Sans), refined spacing, modern borders, improved color consistency
3. **Communication**: All CTAs now link to tel: or sms: for direct phone/text contact
4. **Lead Management Backend**: FastAPI endpoints (POST/GET/PATCH/DELETE /api/leads) with MongoDB storage
5. **Contact Form**: Submits leads to backend API for storage and retrieval
6. **Site Config**: Centralized config file (`siteConfig.ts`) for easy image/logo/contact updates
7. **Removed**: Booking modal, ASE references, old address/phone, booking-related actions

## Pages
- `/` - Homepage (Hero, Stats, Services, Trust, Testimonials, Contact, Footer)
- `/servicios` - Detailed services page
- `/nosotros` - About us page with founder history
- `/contacto` - Contact page with form

## Key Files
- `/app/frontend/lib/siteConfig.ts` - **Edit this to change images, logo, contact info**
- `/app/frontend/lib/translations.ts` - All EN/ES text content
- `/app/backend/server.py` - Lead management API

## Prioritized Backlog
### P0 (Critical)
- All completed

### P1 (Important)
- Admin dashboard UI to view/manage leads (currently API-only)
- Mobile hamburger menu for responsive nav
- Google Maps embed on contact page
- SEO meta tags per page

### P2 (Nice to have)
- Email/SMS notification when new lead comes in
- Lead export (CSV)
- Image upload UI for site admin
- Google Business reviews integration
- Analytics tracking (Google Analytics)

## Next Tasks
1. Build admin dashboard page to view/manage leads from browser
2. Add mobile hamburger navigation menu
3. Add Google Maps embed for the new address
4. Set up email notifications for new leads (e.g., via SendGrid or Resend)
