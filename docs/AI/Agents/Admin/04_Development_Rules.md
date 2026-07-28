# TraderCity Admin Dashboard

## Chapter 04 — Development Rules

**Document Version:** 2.2  
**Status:** Living Specification

> Non-negotiable isolation rules: [`06_Application_Isolation_and_Folder_Architecture.md`](06_Application_Isolation_and_Folder_Architecture.md). Authoritative vision: [`07_Vision_Before_Implementation.md`](07_Vision_Before_Implementation.md). Master report: [`05_Operations_Center_Vision_Report.md`](05_Operations_Center_Vision_Report.md).

---

## Scope Boundaries

### In Scope (create NEW paths only)

```text
src/app/admin/**                              — admin routes (URL namespace)
src/components/admin/layout/**                — shared admin shell
src/components/admin/ui/**                    — cross-product admin primitives
src/components/members/**                     — Member Management domain (sections)
src/types/admin/**                            — shell-only shared types
src/types/members/**                          — Member Management domain types
src/lib/admin/**                              — shell-only shared utilities
src/lib/members/**                            — domain hooks, services, utils
docs/AI/Agents/Admin/**                       — this documentation set
docs/Development/Admin/**                     — phase logs, changelog, debt
```

**Path rule:** Domain sections go in `members/sections/` — **never** `admin/modules/` or `admin/sections/`.

### Homepage Freeze — NEVER MODIFY During Admin Work

```text
src/components/home/**
src/app/page.tsx
src/components/pricing/**
src/components/payment-activation/**
src/components/dashboard/**
src/app/pricing/**
src/app/payment-activation/**
src/app/dashboard/**
src/app/globals.css                       — coordinate separately if needed
```

### Reference Only — Data Shapes, NOT UI Imports

```text
src/components/pricing/**                   — plan ids, prices (read only)
src/components/payment-activation/**        — submission fields (read only)
src/components/dashboard/free/**          — mock data shapes (read only)
src/components/dashboard/vip/**             — mock data shapes (read only)
```

**Never import marketing/homepage components into admin.**

---

## Implementation Principles

1. **Admin ≠ Marketing** — completely isolated applications (ch. 06)
2. **Homepage frozen** — no marketing file edits during admin work
3. **Dashboard UI Design Freeze** — approved `/admin` look is the official admin design language; **do not redesign**; Phases 2–6+ inherit it (ch. 02)
4. **Modular architecture** — one module, one responsibility
5. **Reflection vs Management** — profile cards read-only; actions in domain modules
6. **Operations Center** — Action Driven Navigation from Dashboard widgets
7. **System Health** — backend-computed; frontend displays
8. **Mock data only** — typed seed data; no localStorage persistence
9. **Backend-ready hooks** — NestJS TODO comments on every hook
10. **Admin-only design system** — no homepage component imports; reuse `admin/ui` + `module-surfaces`
11. **Member Management Phases 0–6** — see below; do not skip phases or build Phases 7–9
12. **Mockup sidebar ≠ implementation sidebar** — architecture flowchart is nav authority

---

## Route Map (Member Management — Phases 0–6)

| Route | Phase | Module |
|-------|-------|--------|
| `/admin` | 0–1 | Shell + Dashboard inbox |
| `/admin/members` | 2 | Members directory |
| `/admin/members/[id]` | 3 | User Profile (Control Center) |
| `/admin/subscriptions` | 4 | Subscriptions |
| `/admin/discord` | 5 | Discord |
| `/admin/referrals` | 6 | Referrals |

**Do not create routes** for Reports, Settings, Notifications, or Audit Logs during Phases 0–6.

---

## Member Management Implementation Order (Phases 0–6)

| Phase | Deliverables |
|-------|--------------|
| **0** | Admin layout, sidebar (5 items), header, theme, shared UI primitives |
| **1** | Dashboard inbox, Operations Queue, Recent Activity, Quick Actions, Platform Health |
| **2** | Members table, System Health, search/filters |
| **3** | User Profile — reflection cards, notes, timeline, tabs |
| **4** | Subscriptions — table, details panel, approve/reject, mobile detail |
| **5** | Discord module |
| **6** | Referral module |

Do not begin Phase N+1 until Phase N acceptance criteria are met.

**Full roadmap:** [`docs/Development/Admin/Phase-Roadmap.md`](../../Development/Admin/Phase-Roadmap.md)

### Deferred (Phases 7–9 — not Member Management)

| Phase | Modules | Future home |
|-------|---------|-------------|
| 7 | Reports, Community, Media | Website Content Management |
| 8 | Settings | Future configuration area |
| 9 | Notifications, Audit Logs | Future Analysts / system |

---

## Data Alignment

### Member-Facing Plan Prices

From `src/components/pricing/PricingContent.tsx`:

| Plan id | Display | Duration |
|---------|---------|----------|
| monthly | $50 (first offer, was $60) | 30 DAYS |
| quarterly | $150 (most popular) | 90 DAYS |
| yearly | $500 | 365 DAYS |

`PaymentSection` hardcodes VIP Monthly at $60 — treat as legacy mock. Admin rows use submitted amount + plan label.

### Backend Plan Prices (NestJS contract)

| Plan | Price |
|------|-------|
| Monthly | $150 |
| 3 Months | $400 |
| 1 Year | $1,400 |
| Lifetime | $2,000 |
| Custom | Variable |

**Categories:** Standard (plan-driven) | VIP (auto Lifetime, ∞ days, $0, forced Active)

Document price mismatches in types/comments — do not silently reconcile.

### Payment Status Enums

Map to backend + member `VerificationSection`. Prefer this vocabulary so **Verification** and **Approval** stay distinct:

| Status | Meaning |
|--------|---------|
| PENDING / Pending Verification | Submitted; automatic verification not finished |
| VERIFYING | Engine validating against Payment Quote |
| VERIFIED | Auto verification passed — **Awaiting Admin Approval** (Membership **not** active) |
| VERIFICATION_REQUIRED | Auto verification failed / ambiguous — manual review |
| APPROVED / SUCCESS | Admin approved — Membership activate → Discord |
| REJECTED | Admin rejected — show reason UI |
| FAILED | Hard verification failure (may map into Verification Required) |

> Legacy alias `VERIFIED_ON_CHAIN` = same as **VERIFIED** (awaiting Admin Approval). Do not treat it as Membership activation.

Admin Subscriptions display states:

```text
Pending Verification · Awaiting Admin Approval · Verification Required · Rejected · Approved (Successful)
```

Types may preserve richer engine outcomes (`underpaid`, `overpaid`, …) for integration — see Admin `08` and `ADMIN_DISPLAY_TO_VERIFICATION_OUTCOMES`.

### Dashboard Fields Admin Must Reflect

From `VipDashboardContent` `mockMembership`:

- joinedDate, status, daysRemaining, paymentMethod, nextBillingDate, currentPlan, accessType

From `FreeDashboardContent` `mockHeroStatus`:

- currentPlan "Free Member", welcomeCredit, discordStatus

---

## Backend Integration Assumptions

Assume these exist — design frontend to consume them:

- Auth: JWT + refresh rotation, RBAC (Admin role)
- Payments: Stripe + Crypto (USDT BEP20 on-chain verification)
- ORM: Prisma + PostgreSQL
- User roles: Guest, Free Member, VIP Member, Analyst, Admin

### DO NOT

- Create mock localStorage databases
- Invent Prisma models or NestJS controllers
- Build fake Next.js API route handlers unless explicitly approved
- Assume undocumented backend modules — stub hooks with TODO

### Frontend Hook Pattern

```typescript
// src/lib/members/hooks/useSubscriptions.ts
// TODO: Replace mock data with GET /api/admin/subscriptions
// NestJS: SubscriptionsController.findAll(query)
export function useSubscriptions(filters: SubscriptionFilters) {
  // Phase 4: return typed mock data
}
```

---

## Reuse Member Data in Admin UI (Not Components)

| Reference | Use For |
|-----------|---------|
| PaymentSection fields | Subscription table columns |
| VerificationSection states | Subscription status badges |
| VipDashboard mockMembership | Profile card field names |
| PricingContent plan ids | Plan labels in types |

Implement admin shell under `src/components/admin/`. Implement Member Management sections under `src/components/members/sections/` — **never import** from `components/home`, `pricing`, or `dashboard`.

---

## Required Reading (Agent B)

### Documentation (in order)

1. [`00_Admin_Dashboard_Foundation.md`](00_Admin_Dashboard_Foundation.md)
2. [`07_Vision_Before_Implementation.md`](07_Vision_Before_Implementation.md) — **mandatory**
3. [`05_Operations_Center_Vision_Report.md`](05_Operations_Center_Vision_Report.md) — **mandatory**
4. [`06_Application_Isolation_and_Folder_Architecture.md`](06_Application_Isolation_and_Folder_Architecture.md) — **mandatory before coding**
5. [`docs/Development/Admin/Phase-Roadmap.md`](../../Development/Admin/Phase-Roadmap.md) — **mandatory**
6. [`01_Product_Vision_and_Architecture.md`](01_Product_Vision_and_Architecture.md)
7. [`02_Frontend_Design_System_and_UX_Rules.md`](02_Frontend_Design_System_and_UX_Rules.md)
8. This file
9. [`03_Module_Specifications.md`](03_Module_Specifications.md)
10. [`docs/Universal/TraderCity_Architecture_Rules.md`](../../Universal/TraderCity_Architecture_Rules.md)
11. [`docs/Universal/TraderCity_Frontend_Constitution_V1.md`](../../Universal/TraderCity_Frontend_Constitution_V1.md)
12. [`AGENTS.md`](../../../AGENTS.md) + [`PROJECT_CONTEXT.md`](../../../PROJECT_CONTEXT.md)

### Member Flow Code

9. `src/components/pricing/Pricing.tsx` + `PricingContent.tsx`
10. `src/components/payment-activation/PaymentActivationContent.tsx` + `sections/PaymentSection.tsx`
11. `src/components/payment-activation/sections/VerificationSection.tsx`
12. `src/components/payment-activation/sections/ResultSection.tsx`
13. `src/components/dashboard/free/FreeDashboardContent.tsx`
14. `src/components/dashboard/vip/VipDashboardContent.tsx`

---

## Verification Checklist

### Architecture

- [ ] Every module follows widgets → search → filters → table → details pattern
- [ ] Member Control Center aggregates — does not own business logic
- [ ] No duplicated information or logic across modules
- [ ] Cross-module navigation wired (UI level)

### Member Journey Alignment

- [ ] Subscription table columns match PaymentSection submission fields
- [ ] Approve flow conceptually unlocks VIP dashboard active state
- [ ] Days Left colors match VipDashboard RenewalCentre urgency
- [ ] Plan labels consistent with pricing ids + backend enums documented in types
- [ ] Free vs VIP category matches dashboard comparison

### Admin UI (Desktop 1280px+)

- [ ] Admin shell: sidebar, collapsible, navbar
- [ ] Subscriptions: widgets, table, filters, details panel, approve modal
- [ ] Members: table, filters, add/edit modal with VIP override
- [ ] Member Control Center: header, cards, notes, timeline
- [ ] Status badges match color system

### Mobile (375px)

- [ ] Sidebar → drawer overlay
- [ ] Row tap → full-screen details page
- [ ] Modals usable on small screens

### Integration Readiness

- [ ] No localStorage mock persistence
- [ ] Types align with Architecture Rules
- [ ] Hooks have NestJS TODO comments
- [ ] No member/homepage/pricing/payment-activation/dashboard files modified
- [ ] Price alignment mismatches documented in types/comments

### Quality

- [ ] TypeScript strict
- [ ] No new packages without approval
- [ ] TraderCity brand tone — institutional
- [ ] Background + Content pattern for admin shells

---

## Backend Endpoints Needed (Documentation Only)

Do not implement backend. Frontend types and hooks should anticipate:

| Domain | Endpoint (illustrative) | Purpose |
|--------|---------------------------|---------|
| Members | `GET /admin/members` | List with filters |
| Members | `GET /admin/members/:id` | Member Control Center aggregate |
| Members | `POST /admin/members` | Create member |
| Members | `PATCH /admin/members/:id` | Update identity |
| Members | `DELETE /admin/members/:id` | Remove member |
| Subscriptions | `GET /admin/subscriptions` | List with filters |
| Subscriptions | `GET /admin/subscriptions/:id` | Details + timeline |
| Subscriptions | `POST /admin/subscriptions/:id/approve` | **Mandatory** Admin Approve after Verified (Phase 1) — activates Membership |
| Subscriptions | `POST /admin/subscriptions/:id/reject` | Reject with reason |
| Notes | `GET/POST /admin/members/:id/notes` | Internal notes |
| Activity | `GET /admin/members/:id/activity` | Operational timeline |

Exact paths follow NestJS module conventions when backend is connected.

---

## Branch / Worktree

**Branch:** `feat/admin-payments-subscriptions`

Work in isolated worktree. Do not edit homepage, pricing, payment-activation, or member dashboard paths.

---

## Documentation Maintenance

Per [`Homepage Development Documentation Policy.md`](../Homepage/Homepage%20Development%20Documentation%20Policy.md), admin implementation phases must update:

```text
docs/Development/Admin/
  Phase-01-*.md
  CHANGELOG.md
  TECHNICAL_DEBT.md
  PROJECT_STATUS.md
```

Documentation is part of the implementation — not optional.
