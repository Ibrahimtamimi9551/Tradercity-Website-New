# Member Subscriptions — Implementation Report

**Phase:** 4  
**Status:** UI complete on mocks (Crypto + Manual + Referral Redeem)  
**Last Updated:** July 29, 2026  
**Canonical lifecycle:** [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)  
**Activation sources:** [`../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md`](../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md)  
**Backend contracts:** [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)

---

## Freeze override

Delivered under an **explicit Product Owner override** to Engineering Freeze — scoped to Subscriptions / Membership Activation Center frontend + related documentation only. Unrelated features remain frozen.

---

## Mindset

Subscriptions is the **Membership Activation Center**. Every tab exists because it can change membership status — not merely because a payment occurred.

```text
Membership Activation Center (Subscriptions)
├── Crypto Payments
├── Manual Payments
├── Referral Redeem Requests
└── (Future) Stripe / Promo / Coupon / Gift / Partner / Admin Grant
```

Referral **never** activates memberships. Redeem approval lives here; Referral Ops owns wallet / progress / analytics / intelligence only.

---

## What shipped

### Types + mocks
- `src/types/members/subscription.ts` — Crypto tickets
- `src/types/members/manual-payment.ts` — Manual Payment records
- `src/types/members/referral.ts` — standardized redeem statuses + wallet decision fields
- Mock cohorts + `activation-source.ts` SSOT resolver
- Hooks: `useSubscriptionsDirectory` · `useManualPaymentsDirectory` · `useReferralRedeemRequestsDirectory`

### Section UI
- `SubscriptionsSourceNav` — Crypto · Manual · Referral Redeem
- Crypto / Manual / `referral-redeem/` panels (wallet snapshot + Approve / Reject)
- Gold module surfaces

### Routes
- `/admin/subscriptions` · `?source=manual` · `?source=referral_redeem`
- Layout mounts all three directory providers
- Legacy `/admin/referrals?progress=redeem_requests` redirects to Referral Redeem tab

### Dashboard
- Operations Queue deep-links activation work to Subscriptions

---

## Referral Redeem (activation source)

```text
Waiting Admin Approval → Approve → Membership Activated →
Credits Deducted → Wallet Updated → Audit Log → Timeline Updated
```

Statuses: Waiting Admin Approval · Approved · Rejected · Expired · Cancelled

Detail Wallet Snapshot: Available · Required · Remaining · Requested Plan · Current Membership · Eligibility

---

## What is not shipped

- NestJS APIs · Stripe / promo / coupon UIs · `/admin/payments` module

---

## Related

Architecture: [`../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md)
