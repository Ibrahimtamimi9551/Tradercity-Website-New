# Phase 4 — Subscriptions (Crypto Payment Tickets)

**Status:** Complete (UI on mocks)  
**Date:** July 29, 2026  
**Route:** `/admin/subscriptions`  
**Freeze:** Explicit PO override — Subscriptions frontend + related docs only

## Design

Subscriptions **inherits** the Admin Dashboard design language — no redesign.

- Template: Discord ops module (provider layout, URL-synced directory, master-detail)
- Tone: `gold` (`modulePanelSurface` / `AdminDirectoryPanel`)
- Shared: `PageTitle`, `WidgetCard`, `StatusBadge`, `Timeline`, `AdminMasterDetail`

Authority: [`02_Frontend_Design_System_and_UX_Rules.md`](../../AI/Agents/Admin/02_Frontend_Design_System_and_UX_Rules.md)

## Delivered

### Types + mock data
- `src/types/members/subscription.ts`
- `src/lib/members/mock/subscriptions.ts` — all display states; `memberId` aligned with directory
- `src/lib/members/hooks/useSubscriptionsDirectory.ts` — `TODO(NestJS)`

### Section UI (`src/components/members/sections/subscriptions/`)
- Widgets · Filters · Table · Details · **PaymentResolutionCard** · RowActions · Provider · Pages
- Approve / Reject / Explorer stubs citing reserved NestJS paths
- Payment Resolution workspace for **Verification Required** (contact, checklist, notes)
- Crypto Payment workflow only; `activationSource` extensible

### Routes
- `/admin/subscriptions` — list + desktop panel
- `/admin/subscriptions/[id]` — mobile detail
- Layout: Suspense + `SubscriptionsDirectoryProvider`

### Cross-module
- Dashboard: `approval_pending` deep-link (+ `blockchain_verifying` / `verification_required`)
- Profile: Manage Subscription → `?member=<id>` (existing `SubscriptionCard`)
- Terminology: Blockchain Verifying · Approval Pending · Verification Required (owner-aware labels)

## Exit criteria

- [x] Ticket queue replaces `ModulePlaceholder`
- [x] Display states: Blockchain Verifying · Approval Pending · Verification Required · Rejected · Approved
- [x] Details show verification fields + explorer link + timeline from mock objects
- [x] Verification Required opens Payment Resolution card (contact, failure summary, checklist, notes)
- [x] Desktop panel + mobile detail route
- [x] Approve / Reject stubs (no Membership mutation)
- [x] No `/admin/payments` sidebar or route
- [x] Design language inherited (no redesign)
- [x] Frontend docs updated

## Next Step

Wire NestJS `GET/POST /admin/subscriptions…` per [`API_EXPECTATIONS.md`](../../Member%20Management/05_Backend/API_EXPECTATIONS.md) without changing component hierarchy.
