# Subscriptions Module Architecture

**Version:** 2.0  
**Status:** Active — **UI Shell only** (highest Member Management gap)  
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

Dashboard deep-links (preserve when building Phase 4):

```text
/admin/subscriptions?status=pending_verification
/admin/subscriptions?status=awaiting_admin_approval
/admin/subscriptions?status=verification_required
```

---

## 3. Current implementation

```text
src/app/admin/subscriptions/page.tsx
  → ModulePlaceholder
       title: Subscriptions
       subtitle: Payment verification, approval, and subscription tickets.
       phase: Phase 4
```

**Not yet created:**

```text
src/components/members/sections/subscriptions/   ← planned
src/lib/members/hooks/useSubscriptions.ts        ← planned
src/lib/members/mock/subscriptions.ts            ← planned
src/types/members/subscription.ts                ← planned
```

---

## 4. Planned UI (from product specs — not built)

Expected surfaces (inherit Dashboard design language):

- Stats widgets: **Awaiting Admin Approval** · Pending Verification · Verification Required · Rejected · Approved  
- Filterable tickets table  
- Desktop details panel with explorer link + verification fields  
- Mobile detail route  
- Approve / Reject actions (mutations → NestJS)  

Display states:

```text
Pending Verification
Awaiting Admin Approval   ← primary Approve queue after auto-verify
Verification Required
Rejected
Approved / Successful
```

No **Expired** state in Subscriptions — expiry belongs to Membership.

### Details panel required fields

Verification Result · Verification Timestamp · Verification Method · Transaction Hash · **Blockchain Explorer Link** · Expected Amount · Actual Amount · Network · Wallet Address · Verification Notes (future)

### Admin operational workflow

```text
Open Subscription
        ↓
Click Explorer
        ↓
Verify On-chain Transaction
        ↓
Approve / Reject
```

---

## 5. Backend responsibilities

| Concern | Owner |
|---------|-------|
| Quote persistence | Backend |
| On-chain / payment verification algorithms | Backend |
| Transition Verified → Awaiting Admin Approval | Backend |
| **Approve → activate Membership** | Backend orchestration (**only** on Approve) |
| Reject + reason | Backend |
| Discord sync after Membership activation | Backend / Discord service |
| Audit events | Backend |
| Admin ticket list API | Backend |

Frontend must not re-price against live catalog during verification. See  
`docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md`.

---

## 6. Navigation / ownership summary

| From | Behavior |
|------|----------|
| Sidebar Subscriptions | Opens module (placeholder today) |
| Control Center Manage | Filtered by `member` |
| Dashboard widgets | Filtered by `status` (incl. `awaiting_admin_approval`) |
| Directory subscription column | Informational; management in Subscriptions |

---

## 7. Status

```text
UI ⏳ Placeholder
Responsive —
Mock Data ⏳
Backend Integration ⏳
API ⏳
```
