# Member Data Flow

**Version:** 1.1  
**Status:** Active  
**Authority:** `docs/Member Management/02_Product_Architecture/`  
**Last Updated:** July 29, 2026

---

## Purpose

Explain how information flows across Member Management modules and which module owns each piece of data.

---

## Hub-and-spoke

```text
                    PostgreSQL (future NestJS)
                              │
        ┌─────────────────────┼─────────────────────┐
        ▼                     ▼                     ▼
  Subscription          Discord               Referral
  (payments)            (sync/roles)          (credits)
        │                     │                     │
        └──────────┬──────────┴──────────┬──────────┘
                   ▼                     │
              Membership                 │
           (access SoT) ◄────────────────┘
                   │
                   ▼
         Member Control Center
              (reflect)
                   │
         ┌─────────┴─────────┐
         ▼                   ▼
   Members Directory    Dashboard
      (health)           (queues)
```

---

## End-to-end chain (requested view)

```text
Member (Identity)
        ↓
Subscription (payment ticket)
        ↓
Automatic Verification (system)
        ↓
Awaiting Admin Approval
        ↓
Admin Approve
        ↓
Membership activation (backend domain)
        ↓
Discord (role sync)
        ↓
Member Control Center (reflect all domains)
        ↓
Dashboard + Members Directory (read aggregates / health)
        ↓
Referral (credits / redeem → may extend Membership)
```

| Step | Module owner | Control Center role |
|------|--------------|---------------------|
| Identity | Identity / registration | Header display |
| Payment + Approval gateway | Subscriptions | Subscription card (read) |
| Access | Membership (backend) — **after Approve only** | Membership card (read) |
| Attention | Dashboard / Directory | — |
| Community role | Discord | Discord card (read) |
| Growth credits | Referrals | Referral card (read) |
| Notes | Control Center | Notes card (own) |

Canonical payment policy: [`SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](./SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md).  
Activation sources (all writers → one Membership): [`MEMBERSHIP_ACTIVATION_SOURCES.md`](./MEMBERSHIP_ACTIVATION_SOURCES.md).

---

## Operational loop

```text
Admin Action (owning module)
  → Database updated
  → User Profile / Control Center reflects
  → Members Table System Health updates
  → Dashboard widgets update
```

---

## Sequence: payment → Membership (canonical)

```text
Payment Submitted
  → Automatic Verification Engine
  → Payment Verified
  → Awaiting Admin Approval   ← Membership NOT updated yet
  → Admin reviews Explorer → Approve
  → Membership updated (plan / status / dates / activationSource=crypto_payment)
  → Discord sync requested
  → Discord domain updated
  → Profile / Members / Dashboard reflect
  → Audit event recorded
```

**Do not** write Membership on “Verified” alone.
---

## Sequence: Referral Redeem → Membership

```text
Referral Eligible
  → Referral Redeem Request
  → Waiting Admin Approval
  → Admin Approves Redeem   (Referrals module)
  → Membership Activated / Extended (activationSource=referral_redeem)
  → Discord Sync
  → Activity Timeline
  → Dashboard
  → User Profile
```

Referrals **do not** own a separate activation lifecycle. Approve Redeem triggers Membership.  
Ops queue: **Referral Redeem Requests** → `/admin/referrals?progress=redeem_requests`  
Actions: **Approve Redeem** · **Reject Redeem** (Reject leaves Membership unchanged).

---

## Sequence: registration → directory

```text
Register → Identity in DB → Members directory row → Control Center shell available
```

---

## Cross-navigation (shipped frontend)

| From | To | Contract |
|------|----|----------|
| Dashboard widgets | Domain queues | Deep-link query params |
| Dashboard Referral Redeem Requests | Referrals redeem queue | `/admin/referrals?progress=redeem_requests` |
| Directory username | Control Center | `/admin/members/[id]` |
| Control Center Manage Subscription | Subscriptions (or Referrals when source=Referral Redeem) | `/admin/subscriptions?member=<id>` · `/admin/referrals?member=<id>` |
| Control Center Manage Discord | Discord | `/admin/discord?member=<id>` |
| Control Center Manage Referral | Referrals | `/admin/referrals?member=<id>` |
| Discord / Referrals username | Control Center | `/admin/members/[id]` (via `memberId`) |

---

## Related

- Domain model: [`MEMBER_DOMAIN_MODEL.md`](./MEMBER_DOMAIN_MODEL.md)  
- Activation sources: [`MEMBERSHIP_ACTIVATION_SOURCES.md`](./MEMBERSHIP_ACTIVATION_SOURCES.md)  
- Shared contract: `docs/04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md`
