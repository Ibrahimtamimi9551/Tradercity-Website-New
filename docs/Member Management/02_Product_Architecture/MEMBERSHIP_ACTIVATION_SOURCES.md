# Membership Activation Sources

**Version:** 1.1  
**Status:** Active  
**Authority:** `docs/Member Management/02_Product_Architecture/`  
**Last Updated:** July 29, 2026

---

## Purpose

Formalize how Membership may be **activated or extended** across TraderCity.

> Think **Membership Activation Center** (Subscriptions route) — not “payment tickets only.”  
> Everything under Subscriptions exists because it ultimately changes membership status:  
> `Inactive → VIP → Expired → Renewed` — not because of how the payment happened.

Operational modules may own source-specific validation.  
All of them must converge into **one Membership lifecycle**.

> Membership remains the single Source of Truth for access state.  
> Discord, Dashboard, Analytics, and User Profile are reflections of Membership.

---

## Activation Sources

Membership may be activated or extended through:

| Source | Writer module | Typical trigger |
|--------|---------------|-----------------|
| **Crypto Payment** | Subscriptions (Activation Center) | Admin Approve after payment verification |
| **Manual Payment** | Subscriptions (Activation Center) | Staff-confirmed off-platform payment |
| **Referral Redeem** | Subscriptions (Activation Center) | Admin Approve Redeem Request |
| **Admin Grant** | Admin grant action | Explicit VIP grant (staff / founder / gift) |
| **Future Grant** | Future modules | Campaigns, partners, coupons, integrations |

### Future Membership Activation Sources (docs only — no UI yet)

```text
Future Membership Activation Sources
├── Stripe
├── Promotional Credits
├── Coupon Activation
├── Gift Membership
├── Partner Activation
└── Admin Grant
```

These plug into the **same** Membership lifecycle — they must not invent a second activation pipeline.

> **Referral should NEVER activate memberships.**  
> Referral owns: Wallet → Progress → Analytics → Intelligence → Member Referral Profile.  
> Activation belongs to Subscriptions (Membership Activation Center).

---

## Core principle

```text
Activation Source
        ↓
Validation / Verification
        ↓
Admin Approval (if applicable)
        ↓
Membership Activated / Extended
        ↓
Discord Synchronization
        ↓
Activity Timeline
        ↓
Dashboard
        ↓
User Profile
        ↓
Analytics
```

| Layer | Responsibility |
|-------|----------------|
| Activation source | Source-specific rules (verify crypto, redeem credits, grant policy) |
| Membership | Final access state (plan, status, dates, renewals, activation source) |
| Discord / Profile / Dashboard / Analytics | Read / reflect Membership |

**Do not** create a Referral-owned or Campaign-owned “activation lifecycle.”  
Sources **write into** Membership; they do not replace it.

---

## Source: Crypto Payment

Canonical policy: [`SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](./SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md).

```text
Payment Submitted → Auto Verify → Approval Pending
  → Admin Approve → Membership Activated / Extended
  → Discord → Timeline → Dashboard → Profile
```

Profile Subscription card shows payment ticket fields (hash, method, amount, dates).

---

## Source: Manual Payment

```text
Manual payment recorded → Admin review → Approve
  → Membership Activated / Extended → Discord → … → Profile
```

Profile Subscription card shows: Plan · Amount · Payment Method · Notes · Approved By · Activation Date.

---

## Source: Referral Redeem

```text
Waiting Admin Approval
        ↓
Approve
        ↓
Membership Activated
        ↓
Credits Deducted
        ↓
Wallet Updated
        ↓
Audit Log
        ↓
Timeline Updated
```

**Canonical home:** `/admin/subscriptions?source=referral_redeem` (Membership Activation Center).  
Legacy `/admin/referrals?progress=redeem_requests` redirects there.

### Standardized statuses

| Status | Meaning |
|--------|---------|
| Waiting Admin Approval | In Activation Center queue |
| Approved | Membership activated; credits deducted |
| Rejected | Membership unchanged |
| Expired | Request no longer valid |
| Cancelled | Request cancelled |

Referrals own progress, credits, and wallet history.  
**Referrals do not activate access.** Approve Redeem is processed only in Subscriptions.

Profile Subscription card shows: Plan · Credits Redeemed · Approved By · Activation Date.  
Dashboard Operations Queue deep-link: `/admin/subscriptions?source=referral_redeem`

---

## Source: Admin Grant / Future Grant

```text
Grant decision → Admin Grant action
  → Membership Activated / Extended → Discord → … → Profile
```

Profile shows grant notes + approved by + activation date.  
Future grant types reuse this shape with minimal UI changes.

---

## Frontend type anchor

```text
src/types/members/activation-source.ts
  MembershipActivationSource
  MEMBERSHIP_ACTIVATION_SOURCE_LABELS
```

Profile fields: `subscription.activationSource`, `membership.activationSource`.

---

## Future-proof note

This model intentionally prepares the platform for future Membership activation methods.

Today only a subset of sources is fully implemented (UI mocks + payment policy docs).  
The architecture already treats activation as **pluggable writers** into one Membership pipeline.

New activation sources should:

1. Add a source enum value (or map under `future_grant` until specialized)  
2. Own validation / approval in their module  
3. Write Membership on success  
4. Reflect via Discord · Timeline · Dashboard · Profile  

They must **not** introduce a parallel activation lifecycle.

---

## Related

- Domain model: [`MEMBER_DOMAIN_MODEL.md`](./MEMBER_DOMAIN_MODEL.md)  
- Data flow: [`MEMBER_DATA_FLOW.md`](./MEMBER_DATA_FLOW.md)  
- Payment lifecycle: [`SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](./SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)  
- Referral admin: [`../04_Admin/REFERRAL_ADMINISTRATION.md`](../04_Admin/REFERRAL_ADMINISTRATION.md)  
- Control Center: [`../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md)
