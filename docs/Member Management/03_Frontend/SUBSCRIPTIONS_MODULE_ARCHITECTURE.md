# Subscriptions Module Architecture

**Version:** 2.1  
**Status:** Active — **UI complete on mocks** (Phase 4)  
**Authority:** `docs/Member Management/03_Frontend/`  
**Route:** `/admin/subscriptions`  
**Phase record:** [`../06_Implementation/MEMBER_SUBSCRIPTIONS_IMPLEMENTATION.md`](../06_Implementation/MEMBER_SUBSCRIPTIONS_IMPLEMENTATION.md)  
**Canonical lifecycle:** [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)  
**Last Updated:** July 29, 2026

---

## 1. Purpose

Subscriptions is the **payment verification + Admin Approval ticket queue**.

It answers:

> Which payments are verifying, which are verified and waiting for Admin Approval, and which need manual review?

**Owns:** payments, transaction hash, wallet, verification status, **approval decision**, payment timeline, disputes.  
**Does not own:** Membership access state (activation is a backend write triggered **only by Admin Approve**).

### Verification vs Approval

| Stage | Owner | Result |
|-------|-------|--------|
| Verification | System | Verified · Verification Failed |
| Approval | Administrator | Approved · Rejected |

**Verified ≠ Membership Activated.**

Phase 4 implements the **Crypto Payment** workflow only. Ticket contracts include `activationSource` so Manual Payment / Referral Redeem / Admin Grant can extend later without redesign.

---

## 2. Relationship with Member Management

| Concern | Owner |
|---------|-------|
| Payment ticket lifecycle | Subscriptions |
| Admin Approval gateway | Subscriptions (Phase 1 mandatory) |
| Membership plan / VIP / expiry | Membership (backend) — write **after Approve** |
| Reflection of latest payment | Control Center `SubscriptionCard` |
| Attention counts | Dashboard widgets |

Control Center **Manage Subscription** deep-links:

```text
/admin/subscriptions?member=<id>
```

Dashboard deep-links:

```text
/admin/subscriptions?status=blockchain_verifying
/admin/subscriptions?status=approval_pending
/admin/subscriptions?status=verification_required
```

---

## 3. Frontend folder organization

```text
src/types/members/subscription.ts
src/lib/members/mock/subscriptions.ts
src/lib/members/hooks/useSubscriptionsDirectory.ts
src/components/members/sections/subscriptions/
  SubscriptionsPage.tsx
  SubscriptionsDirectoryProvider.tsx
  SubscriptionWidgets.tsx
  SubscriptionFiltersBar.tsx
  SubscriptionTable.tsx
  SubscriptionDetails.tsx
  SubscriptionMemberDetailPage.tsx
  SubscriptionRowActions.tsx
  subscription-actions.ts
  index.ts
src/app/admin/subscriptions/
  layout.tsx          # Suspense + DirectoryProvider
  page.tsx
  [id]/page.tsx       # mobile full-page detail
```

**Naming:** `Subscription*` only — Crypto Payment is the primary source, not a separate module.  
**No** `/admin/payments` route or sidebar item.

---

## 4. Component hierarchy

```text
SubscriptionsPage
├── PageTitle + Refresh
├── SubscriptionWidgets          (stats → filtered hrefs)
├── SubscriptionFiltersBar       (modulePanelSurface gold)
├── AdminDirectoryPanel
│   ├── SubscriptionTable
│   │   └── SubscriptionRowActions
│   └── Pagination
└── AdminMasterDetail detail → SubscriptionDetails
        ├── Payment Summary
        ├── Blockchain Information
        ├── Verification
        ├── Approval (+ Approve / Reject when actionable)
        ├── Membership Result (when approved)
        └── Timeline (from ticket.timeline)
```

Desktop: list + side panel (`?member=`).  
Mobile: navigate to `/admin/subscriptions/[id]` (provider stays mounted in layout).

---

## 5. Mock data contracts

Primary type: `SubscriptionTicket` in `src/types/members/subscription.ts`.

| Field group | Role |
|-------------|------|
| Identity | `id`, `memberId`, `username`, `email` |
| Display | `displayStatus`, `statusLabel`, `statusTone` |
| Source | `activationSource` (Phase 4 mocks = `crypto_payment`) |
| Payment | plan, amounts, method, submittedAt |
| Blockchain | network, wallet, txHash, explorerUrl |
| Verification | result, method, verifiedAt, notes |
| Approval | decision, decidedAt, decidedBy, reason |
| Membership result | post-approve reflection (nullable) |
| Timeline | ordered events for `Timeline` UI |

Display states:

```text
Blockchain Verifying      ← System-owned; no admin action
Approval Pending          ← Admin-owned; primary Approve queue after auto-verify
Verification Required     ← Admin-owned; investigation after auto-verify failure
Rejected
Approved
```

| State | Owner | Admin action |
|-------|-------|--------------|
| Blockchain Verifying | System | No |
| Verification Required | Admin | Yes — Approve / Reject |
| Approval Pending | Admin | Yes — Approve Membership / Reject Payment |

Details panel adapts by state (no Approve/Reject while Blockchain Verifying; investigation vs final-approval banners).

No **Expired** state in Subscriptions — expiry belongs to Membership.

Mock actions (`subscription-actions.ts`) are stubs (`window.alert` + NestJS path). They do **not** mutate Membership.

---

## 6. URL / filter contract

| Param | Meaning |
|-------|---------|
| `q` | Search username / email / TX / wallet |
| `status` | Display status filter |
| `plan` | `monthly` \| `quarterly` \| `yearly` |
| `network` | `bep20` \| `erc20` \| `trc20` |
| `verification` | System verification result |
| `member` / `memberId` | Selection (Control Center deep-link) |
| `page` / `pageSize` | Pagination |

---

## 7. Frontend vs backend responsibilities

### Frontend (this module)

- UI, filters, master-detail, timeline rendering
- Typed mocks + URL-synced directory hook
- Approve / Reject / Explorer interaction model
- Backend-compatible TypeScript contracts

### Backend (not implemented here)

Reserved in [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md):

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/admin/subscriptions` | Ticket list + stats |
| `GET` | `/admin/subscriptions/:id` | Ticket detail |
| `POST` | `/admin/subscriptions/:id/approve` | Membership activate gateway |
| `POST` | `/admin/subscriptions/:id/reject` | Reject — Membership unchanged |

**Contract:** auto-verify success must **not** activate Membership. Only `approve` does.

Replace mock arrays/hooks with API responses without changing component hierarchy.

---

## 8. UI state transitions (mock representation)

```text
Payment Submitted
        ↓
Blockchain Verifying
        ↓
Verified → Approval Pending
   or
Verification Failed → Verification Required
        ↓
Approve → Approved → Membership Result (+ Discord reflect)
   or
Reject → Rejected
```

---

## 9. Status

```text
UI ✔ Complete (mock)
Responsive ✔
Mock Data ✔
Backend Integration ⏳
API ⏳
```
