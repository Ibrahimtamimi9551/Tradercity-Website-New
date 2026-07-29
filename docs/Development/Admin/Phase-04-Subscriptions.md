# Phase 4 — Subscriptions (Crypto + Manual Payment Sources)

**Status:** Complete (UI on mocks)  
**Date:** July 29, 2026  
**Route:** `/admin/subscriptions`  
**Freeze:** Explicit PO override — Subscriptions frontend + related docs only  
**Backend contracts:** [`../../Member Management/05_Backend/API_EXPECTATIONS.md`](../../Member%20Management/05_Backend/API_EXPECTATIONS.md)

## Design

Subscriptions **inherits** the Admin Dashboard design language — no redesign.

- Template: Discord ops module (provider layout, URL-synced directory, master-detail)
- Tone: `gold` (`modulePanelSurface` / `AdminDirectoryPanel`)
- Shared: `PageTitle`, `WidgetCard`, `StatusBadge`, `Timeline`, `AdminMasterDetail`, **`DateTimePicker`**
- Source tabs: **Crypto Payments** · **Manual Payments** (no new sidebar item)

Authority: [`02_Frontend_Design_System_and_UX_Rules.md`](../../AI/Agents/Admin/02_Frontend_Design_System_and_UX_Rules.md)

## Delivered

### Crypto Payments
- `src/types/members/subscription.ts`
- `src/lib/members/mock/subscriptions.ts` — Crypto cohort only
- `src/lib/members/hooks/useSubscriptionsDirectory.ts`
- Section UI: Widgets · Filters · Table · Details · PaymentResolutionCard · RowActions

### Manual Payments (second activation source)
- `src/types/members/manual-payment.ts`
- `src/lib/members/mock/manual-payments.ts` — Manual cohort only
- `src/lib/members/mock/activation-source.ts` — member → one Activation Source SSOT
- `src/lib/members/ist-datetime.ts` — IST helpers
- `src/lib/members/hooks/useManualPaymentsDirectory.ts`
- Section UI under `subscriptions/manual/`
- Create form: **free-text Discord username** · **DateTimePicker (IST default)** · review → Pending
- Lifecycle: Create → Record → Review → Activate → Discord Sync (no blockchain)
- Statuses: `pending` · `activated` · `cancelled`
- Mock mutations: create / activate / cancel (local state)

### Routes
- `/admin/subscriptions` — Crypto list + desktop panel (default)
- `/admin/subscriptions?source=manual` — Manual Payments tab
- `/admin/subscriptions/[id]` — mobile detail (Crypto `sub-*` or Manual `mp-*`)

### Cross-module
- Profile `SubscriptionCard` driven by owning payment record
- Dashboard deep-links for Crypto statuses unchanged

## Exit criteria

- [x] Crypto ticket queue + Payment Resolution
- [x] Manual Payments tab (no separate nav item)
- [x] Manual table / filters / create form / details / timeline
- [x] Free-text username + IST DateTimePicker
- [x] Non-overlapping Crypto / Manual member mocks + profile SSOT
- [x] Activate / Cancel stubs with mock state transitions
- [x] Frontend + backend expectation docs updated

## Next Step

Wire NestJS Crypto + Manual Payment endpoints per [`API_EXPECTATIONS.md`](../../Member%20Management/05_Backend/API_EXPECTATIONS.md) without changing component hierarchy. Backend must support nullable `memberId`, free-text username, and IST `receivedAt`.
