# TraderCity Admin Dashboard

## Chapter 04 — Development Rules

**Document Version:** 1.0  
**Status:** Living Specification

> This chapter defines coding boundaries, file structure, data alignment, and integration readiness. Follow these rules on every admin implementation task.

---

## Scope Boundaries

### In Scope (create NEW paths only)

```text
src/components/admin/**     — admin UI components
src/app/admin/**            — admin routes
src/types/admin/**          — TypeScript interfaces
src/lib/admin/**            — hooks, formatters, API client stubs
docs/AI/Agents/Admin/**     — this documentation set
docs/Development/Admin/**   — phase logs, changelog, debt (when implementing)
```

### Reference Only — Read patterns, do NOT modify

```text
src/components/pricing/**
src/components/payment-activation/**
src/components/dashboard/free/**
src/components/dashboard/vip/**
src/app/pricing/page.tsx
src/app/payment-activation/page.tsx
src/app/dashboard/free/page.tsx
src/app/dashboard/vip/page.tsx
```

### Out of Scope

- `src/components/home/**`, `src/app/page.tsx`, `src/app/globals.css` (Homepage Agent owns)
- Backend / NestJS / Prisma schema changes
- `src/app/layout.tsx` routing restructure
- Net-new modules beyond Phase 1 without approval (Referrals CMS, Audit Logs, Notifications, Support, Role Management)
- Installing packages without approval

---

## Implementation Principles

1. **Modular architecture** — one module, one responsibility
2. **Reusable components** — no one-off page-specific duplicates
3. **Mock data only** — typed seed data matching backend contracts; no localStorage persistence
4. **Backend-ready hooks** — clear TODO comments for NestJS endpoints
5. **Member journey alignment** — admin mirrors member submission and dashboard fields
6. **Consistent interaction pattern** — widgets → search → filters → table → details → profile
7. **TraderCity brand** — institutional, premium dark — not Arena copy-paste

---

## Route Map (Phase 1)

| Route | Module |
|-------|--------|
| `/admin` | Dashboard shell / redirect |
| `/admin/members` | Members list |
| `/admin/members/[id]` | Member Control Center |
| `/admin/subscriptions` | Subscriptions management |

Legacy prompt alias: `/admin/payment-verification` should redirect to or be consolidated under `/admin/subscriptions` per this architecture.

---

## Suggested Implementation Order

1. Study member flows — read reference code groups (see Module Specs)
2. Scaffold admin shell — `layout.tsx`, sidebar, navbar, optional grid background
3. Shared admin primitives — StatusBadge, StatCard, DataTable, SearchBar, FilterBar, DetailsPanel, ConfirmModal, Timeline, Pagination
4. Types + hooks — `src/types/admin/*.ts`, `src/lib/admin/hooks/*.ts` with NestJS TODOs
5. Subscriptions module — widgets, table, filters, details panel, approve/reject modals
6. Members list — table, filters, add/edit/delete modals
7. Member Control Center — header, overview cards, notes, activity timeline
8. Cross-module navigation — wire links with TODO for backend state refresh

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

Map to backend + member `VerificationSection`:

| Status | Meaning |
|--------|---------|
| PENDING | Submitted, not yet on-chain verified |
| VERIFIED_ON_CHAIN | On-chain verified, admin sign-off pending |
| SUCCESS | Approved — member → active VIP |
| FAILED | On-chain or processing failure |
| REJECTED | Admin rejected — show reason UI |

Admin Subscriptions module UI consolidates to three **display** states (Successful, Pending Verification, Verification Required) while types preserve full backend enum for integration.

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
// src/lib/admin/hooks/useSubscriptions.ts
// TODO: Replace mock data with GET /api/admin/subscriptions
// NestJS: SubscriptionsController.findAll(query)
export function useSubscriptions(filters: SubscriptionFilters) {
  // Phase 1: return typed mock data
}
```

---

## Reuse Member Architecture in Admin UI

| Pattern | Admin Application |
|---------|-------------------|
| Background + Content | AdminBackground + page Content orchestrator |
| Inline typed data | Seed tables/panels until NestJS hooks land |
| Card/status badge vocabulary | Purple=pending, gold=VIP, emerald=success, amber=warning, blue=verification |
| Lucide icons | Crown, Shield, Calendar, Bitcoin, etc. |
| Client/server split | Server layout; `"use client"` for tables/modals |

Implement admin UI primitives locally under `src/components/admin/ui/` — do not modify member files to share.

---

## Required Reading (Agent B)

### Documentation (in order)

1. [`00_Admin_Dashboard_Foundation.md`](00_Admin_Dashboard_Foundation.md)
2. [`01_Product_Vision_and_Architecture.md`](01_Product_Vision_and_Architecture.md)
3. [`02_Frontend_Design_System_and_UX_Rules.md`](02_Frontend_Design_System_and_UX_Rules.md)
4. [`03_Module_Specifications.md`](03_Module_Specifications.md)
5. This file
6. [`docs/Universal/TraderCity_Architecture_Rules.md`](../../Universal/TraderCity_Architecture_Rules.md)
7. [`docs/Universal/TraderCity_Frontend_Constitution_V1.md`](../../Universal/TraderCity_Frontend_Constitution_V1.md)
8. [`AGENTS.md`](../../../AGENTS.md) + [`PROJECT_CONTEXT.md`](../../../PROJECT_CONTEXT.md)

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
| Subscriptions | `POST /admin/subscriptions/:id/approve` | Manual approve |
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
