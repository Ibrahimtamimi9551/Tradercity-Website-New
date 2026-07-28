# Member Subscriptions — Implementation Report

**Phase:** 4  
**Status:** UI complete on mocks  
**Last Updated:** July 29, 2026  
**Canonical lifecycle:** [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)

---

## Freeze override

Delivered under an **explicit Product Owner override** to Engineering Freeze — scoped to Subscriptions frontend + related documentation only. Unrelated features remain frozen.

---

## What shipped

### Types + mocks
- `src/types/members/subscription.ts` — ticket, filters, stats, verification/approval shapes
- `src/lib/members/mock/subscriptions.ts` — crypto tickets covering all display states
- `src/lib/members/hooks/useSubscriptionsDirectory.ts` — URL-synced filters / pagination / selection

### Section UI (`src/components/members/sections/subscriptions/`)
- Widgets, Filters, Table, Details, RowActions, Provider, Pages
- Approve / Reject / Explorer stubs (`subscription-actions.ts`)
- Gold `modulePanelSurface` / `AdminDirectoryPanel` tone

### Routes
- `/admin/subscriptions` — list + desktop side panel
- `/admin/subscriptions/[id]` — mobile full-page detail
- Layout mounts `SubscriptionsDirectoryProvider` (Discord pattern)

### Dashboard wiring
- Ops queue + operational widget deep-link `?status=approval_pending`
- Existing `blockchain_verifying` / `verification_required` deep-links preserved

### Profile
- `SubscriptionCard` already reflects Activation Source + Manage → Subscriptions; mocks use `crypto_payment` for payment-pending members

---

## Product policy (docs locked)

- Automatic verification → **Approval Pending**
- Membership / Discord / entitlements activate **only after Admin Approve**
- Verification ≠ Approval
- Phase 4 tickets are **Crypto Payment** only; `activationSource` remains extensible

---

## What is not shipped

- NestJS APIs / Prisma / blockchain verification engine
- Manual Payment / Referral Redeem / Admin Grant ticket UIs
- Standalone `/admin/payments` module (intentionally deferred)

---

## Backend impact

APIs reserved in [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md).  
Frontend stubs cite `POST /admin/subscriptions/:id/approve|reject`.

---

## Related

Architecture: [`../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md)  
Admin ops: [`../04_Admin/SUBSCRIPTION_ADMINISTRATION.md`](../04_Admin/SUBSCRIPTION_ADMINISTRATION.md)  
Phase record: [`../../Development/Admin/Phase-04-Subscriptions.md`](../../Development/Admin/Phase-04-Subscriptions.md)
