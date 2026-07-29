# Subscriptions Module Architecture

**Version:** 2.4  
**Status:** Active — **UI complete on mocks** (Crypto + Manual Payment sources)  
**Authority:** `docs/Member Management/03_Frontend/`  
**Route:** `/admin/subscriptions`  
**Phase record:** [`../06_Implementation/MEMBER_SUBSCRIPTIONS_IMPLEMENTATION.md`](../06_Implementation/MEMBER_SUBSCRIPTIONS_IMPLEMENTATION.md)  
**Canonical lifecycle:** [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)  
**Backend contracts:** [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)  
**Last Updated:** July 29, 2026

---

## 1. Purpose

Subscriptions is the **Membership Activation Sources** workspace under Admin.

It answers:

> Which crypto payments need verification / approval, and which manual payments have been recorded for activation?

**Owns:** payment tickets (crypto + manual), source-specific validation UI, approval / activation decisions, payment timeline.  
**Does not own:** Membership access state (activation is a backend write triggered by Admin Approve / Activate).

### Activation sources (independent siblings)

```text
Crypto Payment
        │
Manual Payment
        │
Future Payment Sources
        │
        ▼
Membership Domain (Source of Truth)
        ▼
Discord · Dashboard · User Profile · Analytics · Audit
```

Manual Payment is **not** a fallback for Crypto. Each source keeps its own fields and lifecycle while sharing visual language and Membership activation architecture.

### Verification vs Approval (Crypto only)

| Stage | Owner | Result |
|-------|-------|--------|
| Verification | System | Verified · Verification Failed |
| Approval | Administrator | Approved · Rejected |

**Verified ≠ Membership Activated.**

Manual Payments skip verification — the administrator is the confirmation source.

---

## 2. Relationship with Member Management

| Concern | Owner |
|---------|-------|
| Crypto payment ticket lifecycle | Subscriptions (Crypto tab) |
| Manual payment recording / activation | Subscriptions (Manual tab) |
| Membership plan / VIP / expiry | Membership (backend) — write after Approve / Activate |
| Reflection of latest payment | Control Center `SubscriptionCard` |
| Attention counts | Dashboard widgets (Crypto statuses) |

Control Center deep-links:

```text
/admin/subscriptions?member=<id>                 ← Crypto
/admin/subscriptions?source=manual&q=<username>  ← Manual
```

---

## 3. Frontend folder organization

```text
src/types/members/subscription.ts
src/types/members/manual-payment.ts
src/lib/members/mock/subscriptions.ts
src/lib/members/mock/manual-payments.ts
src/lib/members/hooks/useSubscriptionsDirectory.ts
src/lib/members/hooks/useManualPaymentsDirectory.ts
src/components/members/sections/subscriptions/
  SubscriptionsPage.tsx              # switches Crypto / Manual by ?source=
  SubscriptionsSourceNav.tsx         # in-module tabs
  SubscriptionsDirectoryProvider.tsx
  SubscriptionDetailRouter.tsx       # mobile detail → Crypto or Manual
  SubscriptionWidgets.tsx
  SubscriptionFiltersBar.tsx
  SubscriptionTable.tsx
  SubscriptionDetails.tsx
  PaymentResolutionCard.tsx
  SubscriptionMemberDetailPage.tsx
  SubscriptionRowActions.tsx
  subscription-actions.ts
  index.ts
  manual/
    ManualPaymentsPanel.tsx
    ManualPaymentsDirectoryProvider.tsx
    ManualPaymentWidgets.tsx
    ManualPaymentFiltersBar.tsx
    ManualPaymentTable.tsx
    ManualPaymentDetails.tsx
    ManualPaymentForm.tsx
    ManualPaymentRowActions.tsx
    ManualPaymentStatusBadge.tsx
    ManualPaymentMemberDetailPage.tsx
    manual-payment-actions.ts
    index.ts
src/app/admin/subscriptions/
  layout.tsx          # Suspense + both DirectoryProviders
  page.tsx
  [id]/page.tsx       # mobile full-page detail
```

**No** `/admin/payments` route or sidebar item.

---

## 4. Component hierarchy

### Crypto Payments (default)

```text
SubscriptionsPage → CryptoPaymentsPanel
├── PageTitle + Refresh
├── SubscriptionsSourceNav
├── SubscriptionWidgets
├── SubscriptionFiltersBar
├── AdminDirectoryPanel
│   ├── SubscriptionTable
│   └── Pagination
└── AdminMasterDetail → SubscriptionDetails
        ├── Payment Summary · Blockchain · Verification · Approval
        ├── Payment Resolution (Verification Required)
        ├── Membership Result
        └── Timeline
```

### Manual Payments (`?source=manual`)

```text
SubscriptionsPage → ManualPaymentsPanel
├── PageTitle + Refresh
├── SubscriptionsSourceNav
├── ManualPaymentWidgets
├── ManualPaymentFiltersBar (+ Create Manual Payment)
├── AdminDirectoryPanel
│   ├── ManualPaymentTable
│   └── Pagination
├── ManualPaymentForm (create + review modal)
└── AdminMasterDetail → ManualPaymentDetails
        ├── Payment Summary
        ├── Payment Information
        ├── Review — Confirm Activation (Pending)
        ├── Membership Result (Activated)
        └── Timeline
```

Desktop: list + side panel.  
Mobile: `/admin/subscriptions/[id]` (`mp-*` → Manual, else Crypto).

---

## 4.1 Payment Resolution workflow (Crypto only)

**When visible:** `displayStatus === "verification_required"` and `ticket.resolution` is present.  
**Hidden:** all other Crypto states · all Manual Payments.

Purpose: structured dispute / investigation workspace for failed automatic verification.

---

## 4.2 Manual Payment workflow

```text
Create Manual Payment
        ↓
Enter Payment Information
  · Discord username (free text — member may not exist yet)
  · Plan / amount / method
  · Payment Date via DateTimePicker (IST default, editable)
  · Received By / Reason / Notes
        ↓
Review
        ↓
Create → Pending  (memberId may be null)
        ↓
Activate Membership → Activated (+ Discord Sync)
   or
Cancel → Cancelled
```

| Status | Admin action |
|--------|--------------|
| Pending | Activate Membership · Cancel |
| Activated | Read-only reflection |
| Cancelled | Read-only |

**Do not display** Network · Wallet · TX Hash · Explorer · Verification Status on Manual records.

### Create form UX (frontend)

| Control | Implementation |
|---------|----------------|
| Discord Username | Free-text input — type / paste; `@` optional |
| Payment Date | `DateTimePicker` (`src/components/admin/ui/DateTimePicker.tsx`) — calendar popup + hour/minute/AM·PM |
| Timezone | Default + display: **IST (`Asia/Kolkata`)** via `src/lib/members/ist-datetime.ts` |
| Review | Shows formatted IST receipt timestamp before create |

Date and time edit independently. Changing date does not reset time (and vice versa). `receivedAt` is the **actual receipt time**, not create-time.

---

## 5. Mock data contracts

### Crypto — `SubscriptionTicket`

| Field group | Role |
|-------------|------|
| Identity | `id`, `memberId`, `username`, `email` |
| Display | `displayStatus`, `statusLabel`, `statusTone` |
| Source | `activationSource` = `crypto_payment` |
| Payment | plan, amounts, method, submittedAt |
| Blockchain | network, wallet, txHash, explorerUrl |
| Verification / Approval / Resolution | Crypto-only |
| Timeline | ordered events |

### Manual — `ManualPayment`

| Field group | Role |
|-------------|------|
| Identity | `id`, `memberId` (**nullable**), `username` (required), `email` (nullable) |
| Plan | `planKey`, `planLabel` |
| Payment | method, amount, currency, **`receivedAt` (IST / +05:30)**, referenceNumber |
| Administration | receivedBy, reason, notes |
| Status | `pending` \| `activated` \| `cancelled` |
| Membership result | post-activate reflection (nullable) |
| Timeline | Created → Recorded → Activated → Discord Sync |

**Create input** (`ManualPaymentCreateInput`): free-text `username` (not `memberId`); backend resolves Member ID later.

**Member partition (no overlap):** Crypto `m-001…004, m-007, m-009, m-011` · Manual `m-005, m-006, m-008, m-010, m-012`.  
Profile / Control Center resolve Activation Source via `src/lib/members/mock/activation-source.ts` from the owning payment record — one member → one source.

Extensible enums: `ManualPaymentMethod`, `ManualPaymentReason`, `ManualPaymentCurrency`.

Mock mutations in `useManualPaymentsDirectory`: `createPayment` · `activatePayment` · `cancelPayment` (local state until NestJS).

---

## 6. URL / filter contract

### Shared

| Param | Meaning |
|-------|---------|
| `source` | omit / `crypto` (default) · `manual` |
| `q` | Search |
| `page` / `pageSize` | Pagination |

### Crypto

| Param | Meaning |
|-------|---------|
| `status` | Display status filter |
| `plan` / `network` / `verification` | Filters |
| `member` / `memberId` | Selection |

### Manual

| Param | Meaning |
|-------|---------|
| `mpStatus` | `pending` \| `activated` \| `cancelled` |
| `mpPlan` / `mpMethod` | Plan / payment method |
| `mpFrom` / `mpTo` | Received date range |
| `payment` | Selected Manual Payment id |

---

## 7. Frontend vs backend responsibilities

### Frontend (this module)

- UI, filters, master-detail, timeline rendering
- Typed mocks + URL-synced directory hooks
- Create / Activate / Cancel / Approve / Reject interaction model
- Backend-compatible TypeScript contracts

### Backend (not implemented here)

Reserved in [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md):

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/admin/subscriptions` | Crypto ticket list + stats |
| `POST` | `/admin/subscriptions/:id/approve` | Crypto → Membership activate |
| `POST` | `/admin/subscriptions/:id/reject` | Reject — Membership unchanged |
| `GET` | `/admin/subscriptions/manual-payments` | Manual list + stats |
| `POST` | `/admin/subscriptions/manual-payments` | Create Manual Payment (`username` + IST `receivedAt`) |
| `POST` | `/admin/subscriptions/manual-payments/:id/activate` | Manual → Membership activate |
| `POST` | `/admin/subscriptions/manual-payments/:id/cancel` | Cancel — Membership unchanged |

**Backend must support:** nullable `memberId`, free-text username, IST receipt timestamps, Activate ≠ Create.

Replace mock arrays/hooks with API responses without changing component hierarchy.

---

## 8. UI state transitions

### Crypto

```text
Payment Submitted → Blockchain Verifying
        ↓
Verified → Approval Pending → Approve / Reject
   or
Verification Failed → Verification Required → Payment Resolution
```

### Manual

```text
Created (Pending) → Activate → Activated (+ Discord)
                 → Cancel → Cancelled
```

---

## 9. Status

```text
Crypto UI ✔ Complete (mock)
Manual UI ✔ Complete (mock)
Responsive ✔
Mock Data ✔
Backend Integration ⏳
API ⏳
```
