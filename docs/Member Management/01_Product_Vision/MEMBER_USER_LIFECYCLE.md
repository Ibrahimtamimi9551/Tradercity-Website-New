# Member User Lifecycle

**Version:** 1.1  
**Status:** Active  
**Authority:** `docs/Member Management/01_Product_Vision/`  
**Last Updated:** July 29, 2026

---

## Lifecycle overview

```text
Guest
  → Register
  → Free Member (Identity exists; Membership = free / no VIP)
  → Submit payment (Subscription ticket)
  → Automatic Verification
  → Awaiting Admin Approval
  → Admin Approve
  → VIP Membership active
  → Discord VIP role synced
  → Renew / expire / referral redeem / support events
  → (optional) Suspend account access
```

Canonical payment policy: [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md).  
Activation sources (Crypto · Manual · Referral Redeem · Admin Grant · Future): [`../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md`](../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md).

VIP may also be reached via **Referral Redeem**, **Manual Payment**, or **Admin Grant** — each converges into the same Membership lifecycle after approval.

---

## Stages

| Stage | Identity | Membership | Typical Admin surfaces |
|-------|----------|------------|------------------------|
| Registered Free | Exists | Free / none | Directory · Control Center shell |
| Payment Pending Verification | Exists | Unchanged | Subscriptions · Dashboard |
| Awaiting Admin Approval | Exists | Unchanged until Approve | Subscriptions **primary** queue · Dashboard |
| Verification Required | Exists | Unchanged | Subscriptions manual review |
| VIP Active | Exists | Active plan + dates (**after Admin Approve**) | Directory health · Control Center cards |
| Expiring / Expired | Exists | Expiry owned by Membership | Directory System Health · Dashboard |
| Discord issue | Exists | Unchanged | Discord sync tickets |
| Referral eligible / Redeem Request | Exists | Unchanged until Approve Redeem | Referrals Ops · **Referral Redeem Requests** queue |
| Referral Redeem approved | Exists | Extended / activated (`activationSource=referral_redeem`) | Control Center · Dashboard |
| Suspended account | Exists | Access blocked at account layer | Directory account status (mock override today) |

---

## Control Center reflection by stage

The Member Control Center always answers:

> What is the complete current state of this member?

It shows Membership, Subscription, Discord, Referral, Notes, and Activity — even when some domains are empty (`none`, disconnected, zero progress).

It does **not** advance lifecycle itself. Lifecycle writes happen in owning modules / backend services.

---

## Activity timeline events (frontend kinds)

From `src/types/members/profile.ts` (extend when wiring NestJS):

| Kind | Meaning |
|------|---------|
| `registered` | Account created |
| `joined_discord` | Discord connection |
| `payment_submitted` | Subscription payment submitted |
| `payment_verified` | Automatic verification completed (**not** activation) |
| `awaiting_admin_approval` | *(planned)* Waiting for Admin Approve |
| `vip_activated` | Membership VIP activated (**after Admin Approve**) |
| `membership_renewed` | Renewal |
| `membership_expired` | Access expired |
| `referral_redeemed` | Referral credit redeemed |
| `discord_role` | Role change |
| `note` | Internal note |

### Example Profile timeline

```text
Payment Submitted
        ↓
Payment Verified (Automatic)
        ↓
Awaiting Admin Approval
        ↓
Membership Activated
        ↓
Discord Role Assigned
```

Do **not** skip the approval stage.

Production timelines are backend-aggregated operational events — not marketing analytics.

---

## Related

- Vision: [`MEMBER_PRODUCT_VISION.md`](./MEMBER_PRODUCT_VISION.md)  
- Data flow: [`../02_Product_Architecture/MEMBER_DATA_FLOW.md`](../02_Product_Architecture/MEMBER_DATA_FLOW.md)
