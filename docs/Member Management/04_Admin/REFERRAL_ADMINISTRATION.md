# Referral Administration (Members)

**Version:** 1.2  
**Status:** Active — UI mock shipped  
**Authority:** `docs/Member Management/04_Admin/`  
**Last Updated:** July 29, 2026

---

## Intent

Operate referral progress, pending referrals, available credit, and wallet history.  
Use Intelligence for program-level insight (mock).

> **Referral should NEVER activate memberships.**  
> Redeem request approval lives in Membership Activation Center (Subscriptions).

---

## Workspaces

| Workspace | Route |
|-----------|-------|
| Operations | `/admin/referrals` |
| Intelligence | `/admin/referrals/intelligence` |
| Redeem approval (Activation Center) | `/admin/subscriptions?source=referral_redeem` |

---

## Referral Progress filter (Operations)

| Filter | Shows |
|--------|-------|
| All | All referral rows |
| In Progress | Progress incomplete |
| Completed | Redeem requested **and** admin already approved |

Redeem queue is **not** a Referral Ops filter. Use Subscriptions → Referral Redeem Requests.

Legacy deep-link `/admin/referrals?progress=redeem_requests` redirects to Activation Center.

---

## Admin workflow — redeem approval

1. Dashboard Operations Queue → **Referral Redeem**  
   or Subscriptions → **Referral Redeem Requests**
2. Inspect **Wallet Snapshot** (Available / Required / Remaining credits, Requested Plan, Current Membership, Eligibility)
3. **Approve Redeem** or **Reject Redeem**
4. Approve cascade: Membership Activated → Credits Deducted → Wallet Updated → Audit → Timeline
5. NestJS mutations — **backend pending** (UI mock stubs today)

---

## Approval flow → Membership

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

Canonical sources: [`../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md`](../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md)
