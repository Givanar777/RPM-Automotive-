# RPM Automotive - Product Requirements Document

## Original Problem Statement
Refine the RPM Automotive website with design and functionality improvements. Specific changes: remove ASE certification, 12-month warranty, "Get a diagnostic in 30 min", communication via text/call only (831-429-2096), new address 110 Stanford Ave Santa Cruz CA 95062. Add lead management, team roles, service history tracking, mobile navigation, Google Maps, and SMS notifications.

## Architecture
- **Frontend**: Next.js 15.5 (TypeScript) at `/app/frontend/`
- **Backend**: FastAPI (Python) at `/app/backend/`
- **Database**: MongoDB (local) - collections: users, leads, clients, service_records, login_attempts
- **Styling**: Tailwind CSS 4, Motion library for animations
- **Auth**: JWT-based with role-based access (admin/member), bcrypt password hashing
- **Bilingual**: EN/ES language support via React Context

## User Personas
1. **Vehicle Owner** - Needs car repair/diagnostics, contacts via phone or text
2. **Business Owner (Admin)** - Manages leads, team, clients, and service history
3. **Team Member** - Views leads, manages clients and service records

## What's Been Implemented (Jan 2026)

### Phase 1 - Content & Design Refinement
- [x] Remove all ASE certification references
- [x] 12-month warranty (was 24 months)
- [x] "Get a Diagnostic in 30 Min" (was Free Diagnostic)
- [x] Replace booking system with Call/Text CTAs
- [x] Phone: (831) 429-2096, Address: 110 Stanford Ave. Santa Cruz, CA 95062
- [x] Bilingual EN/ES support
- [x] Site config file for easy image/logo changes (`/app/frontend/lib/siteConfig.ts`)
- [x] Improved fonts (Outfit + DM Sans), spacing, and visual polish

### Phase 2 - Features (Current)
- [x] **Mobile Hamburger Menu** - Responsive navigation with animated slide-down, language toggle, call CTA
- [x] **Google Maps Embed** - Dark-themed map in contact section showing shop location
- [x] **SMS Notifications** - Twilio integration (MOCKED - needs credentials to activate)
- [x] **Admin Dashboard** (`/admin`) with:
  - JWT authentication with login/logout
  - Dashboard overview with 6 stat cards
  - Lead management with status filters (new/contacted/converted/lost)
  - Lead detail panel with notes and status updates
  - Lead-to-client conversion flow
  - Client management with expandable service history
  - Service record creation and tracking (vehicle, type, cost, technician, date)
  - Team management with role-based access (admin can add/remove members)
  - Admin seeded: admin@rpm.com / admin123

## API Endpoints
### Public
- `POST /api/leads` - Create lead from website contact form
- `GET /api/health` - Health check

### Authenticated
- `POST /api/auth/login` - Login
- `POST /api/auth/register` - Register (admin only)
- `GET /api/auth/me` - Current user
- `POST /api/auth/logout` - Logout
- `GET /api/leads` - List leads (with status filter)
- `PATCH /api/leads/{id}` - Update lead status/notes
- `DELETE /api/leads/{id}` - Delete lead (admin only)
- `POST /api/leads/{id}/convert` - Convert lead to client
- `GET /api/clients` - List clients
- `GET /api/clients/{phone}` - Client detail with service records
- `POST /api/clients` - Create client
- `POST /api/services` - Create service record
- `GET /api/services` - List service records
- `DELETE /api/services/{id}` - Delete service record
- `GET /api/team` - List team members
- `PATCH /api/team/{id}` - Update team member role (admin only)
- `DELETE /api/team/{id}` - Delete team member (admin only)
- `GET /api/dashboard/stats` - Dashboard statistics

## Key Files
- `/app/frontend/lib/siteConfig.ts` - Edit to change images, logo, contact info, hours
- `/app/frontend/lib/translations.ts` - All EN/ES text content
- `/app/backend/server.py` - All API endpoints
- `/app/backend/.env` - Backend config (JWT secret, admin credentials, Twilio config)

## Prioritized Backlog

### P0 (Critical) - All completed

### P1 (Important)
- Activate Twilio SMS (needs account SID, auth token, phone number)
- Set up business email (Google Workspace recommended)
- SEO meta tags per page
- Password reset flow

### P2 (Nice to have)
- Email notifications for new leads (via SendGrid/Resend)
- Lead export (CSV download)
- Image upload UI for site admin
- Google Business / Yelp reviews API integration
- Analytics tracking (Google Analytics)
- Service invoice/receipt generation
- Client communication log (track calls/texts)

## Next Tasks
1. Get Twilio credentials to activate real SMS notifications
2. Set up business email (Google Workspace or similar)
3. Add SEO meta tags for all pages
4. Add password reset functionality
