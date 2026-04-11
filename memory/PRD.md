# RPM Automotive - Product Requirements Document

## Original Problem Statement
Refine the RPM Automotive website with design and functionality improvements. Ferrari.com-inspired luxury editorial layout with ultra-minimal dark theme. Full CRM admin dashboard.

## Architecture
- **Frontend**: Next.js 15.5 (TypeScript) at `/app/frontend/`
- **Backend**: FastAPI (Python) at `/app/backend/`
- **Database**: MongoDB - collections: users, leads, clients, service_records, login_attempts
- **Styling**: Tailwind CSS 4, Motion library for animations
- **Auth**: JWT with roles (admin/member), bcrypt
- **Bilingual**: EN/ES via React Context

## Design Theme
Ferrari.com-inspired ultra-minimal luxury editorial:
- Dark background: `#0B1929`
- Transparent/glass navbar with backdrop blur
- Video hero section
- Outfit font family
- Minimal white text on dark, white/5 borders
- Bottom-anchored typography

## What's Been Implemented

### Phase 1 - Content & Layout
- [x] Remove ASE certification, 12-month warranty, 30-min diagnostic messaging
- [x] Call/Text CTAs (831-429-2096), no booking system
- [x] Address: 110 Stanford Ave. Santa Cruz, CA 95062
- [x] Bilingual EN/ES, site config for easy image/logo changes
- [x] Ferrari.com editorial layout across all pages

### Phase 2 - Features
- [x] Mobile hamburger menu with dark theme
- [x] Google Maps embed in contact section
- [x] SMS notifications (MOCKED - needs Twilio credentials)
- [x] Admin dashboard with JWT auth (at /admin)
- [x] Leads management with status tracking & conversion
- [x] Team management (admin-only)
- [x] Client management from lead conversion

### Phase 3 - Car Service History (Apr 2026)
- [x] Backend: ServiceRecord model with mileage field
- [x] Backend: Full CRUD for service records (POST, GET, PATCH, DELETE)
- [x] Backend: Client update endpoint (PATCH /api/clients/{phone})
- [x] Frontend: Enhanced Clients page with expandable service history
- [x] Frontend: Add service form with all fields (date, service type, mileage, cost, technician, description, notes)
- [x] Frontend: Inline edit and delete service records
- [x] Frontend: Client search by name/phone/email
- [x] Testing: 100% pass rate on backend + frontend (Iteration 5)

### Phase 4 - Sub-pages & Design
- [x] /servicios page: Ferrari editorial layout with hero, service cards, maintenance section, CTA
- [x] /nosotros page: Ferrari editorial layout with hero, legacy section, founder image, values grid, CTA
- [x] Mobile responsive on all sub-pages
- [x] Transparent/glass navbar, video hero, RPM metallic chrome logo

## Key Files
- `/app/frontend/public/logo.webp` - Logo file
- `/app/frontend/lib/siteConfig.ts` - Business info, images, hours
- `/app/frontend/lib/translations.ts` - EN/ES text content
- `/app/frontend/app/globals.css` - Color variables and theme
- `/app/backend/server.py` - All API endpoints

## Key API Endpoints
- `POST /api/auth/login` - Admin login
- `GET /api/auth/me` - Current user
- `POST /api/leads` - Create lead
- `GET /api/leads` - List leads
- `PATCH /api/leads/{id}` - Update lead
- `POST /api/leads/{id}/convert` - Convert lead to client
- `GET /api/clients` - List clients
- `GET /api/clients/{phone}` - Client detail with service records
- `PATCH /api/clients/{phone}` - Update client
- `POST /api/services` - Create service record (with mileage)
- `GET /api/services` - List service records
- `PATCH /api/services/{id}` - Update service record
- `DELETE /api/services/{id}` - Delete service record

## DB Schema
- `users`: {email, password_hash, role, name, created_at}
- `leads`: {name, phone, email, vehicle, service_type, message, status, notes, assigned_to, created_at}
- `clients`: {name, phone, email, vehicles[], notes, converted_from_lead, created_at}
- `service_records`: {client_phone, vehicle, service_type, description, date, mileage, cost, technician, status, notes, created_at, created_by}

## Prioritized Backlog
### P1
- Activate Twilio SMS (needs user's API credentials)
- SEO meta tags
- Password reset flow

### P2
- Email notifications (needs SMTP/Google Workspace)
- Lead export to CSV
- Google reviews integration
- Analytics dashboard
- Invoice generation
