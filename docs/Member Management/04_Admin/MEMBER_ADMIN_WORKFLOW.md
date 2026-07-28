# Member Admin Workflow

**Version:** 1.0  
**Status:** Active  
**Authority:** `docs/Member Management/04_Admin/`  
**Last Updated:** July 28, 2026

---

## Ops philosophy

```text
What requires attention?     → Dashboard
Who is affected?             → Members Directory
What is their full state?    → Control Center
How do I fix it?             → Owning domain module
```

One rule:

> Every module owns its own responsibility. The User Profile only reflects the final state of those modules.

---

## Daily loops

### Payment attention

```text
Dashboard Approval Pending (or Verification Required)
  → Subscriptions queue
  → Open Explorer → review TX
  → Approve / Reject
  → Membership updates (Approve only)
  → Control Center + Directory reflect
  → Discord sync may enqueue
  → Audit event
```

Canonical: [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md).

### Discord attention

```text
Dashboard Discord Issues
  → /admin/discord?sync=failed
  → Inspect member · sync actions
  → Optional open Control Center
```

### Referral attention

```text
Dashboard Referral Redeem Requests
  → /admin/referrals?progress=redeem_requests
  → Waiting Admin Approval queue
  → Approve Redeem / Reject Redeem
  → Approve → Membership Activated / Extended → Discord → Profile
```

Canonical: [`../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md`](../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md).

### Member investigation

```text
Members Directory (health / search)
  → Control Center
  → Manage → domain module
```

---

## Domain modules

| Module | Workflow doc |
|--------|--------------|
| Subscriptions | [`SUBSCRIPTION_ADMINISTRATION.md`](./SUBSCRIPTION_ADMINISTRATION.md) |
| Discord | [`DISCORD_ADMINISTRATION.md`](./DISCORD_ADMINISTRATION.md) |
| Referrals | [`REFERRAL_ADMINISTRATION.md`](./REFERRAL_ADMINISTRATION.md) |

---

## Out of scope (Phases 7–9)

Reports, Community, Media, Settings, Notifications, Audit Logs — deferred. Do not add sidebar items during Phases 0–6.
