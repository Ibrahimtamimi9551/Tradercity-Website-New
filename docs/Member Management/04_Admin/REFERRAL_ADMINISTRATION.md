# Referral Administration (Members)

**Version:** 1.1  
**Status:** Active — UI mock shipped  
**Authority:** `docs/Member Management/04_Admin/`  
**Last Updated:** July 29, 2026

---

## Intent

Operate referral progress, pending referrals, available credit, and **Referral Redeem Requests**. Use Intelligence workspace for program-level insight (mock).

---

## Workspaces

| Workspace | Route |
|-----------|-------|
| Operations | `/admin/referrals` |
| Intelligence | `/admin/referrals/intelligence` |

---

## Referral Progress filter

| Filter | Shows |
|--------|-------|
| All | All referral rows |
| In Progress | Progress incomplete |
| Completed | Redeem requested **and** admin already approved |
| **Referral Redeem Requests** | **Only** members with status **Waiting Admin Approval** |

Completed and Referral Redeem Requests are mutually exclusive.  
Redeem queue excludes already-approved (Completed), non-eligible, and members who never submitted a redeem request.

Deep-link: `/admin/referrals?progress=redeem_requests`  
Dashboard Operations Queue uses the same label and deep-link.

---

## Admin workflow (UI available)

1. Open Operations or Dashboard **Referral Redeem Requests**  
2. Filter Progress → **Referral Redeem Requests** (Waiting Admin Approval)  
3. Inspect member referral context in panel / detail page  
4. Row ⋮ menu → **Approve Redeem** or **Reject Redeem**  
5. Navigate to Control Center for full member state  
6. NestJS mutations — **backend pending** (UI mock stubs today)

---

## Approval flow → Membership

```text
Referral Eligible
        ↓
Referral Redeem Request
        ↓
Waiting Admin Approval
        ↓
Admin Approves
        ↓
Membership Activated / Extended
        ↓
Discord Sync
        ↓
Activity Timeline
        ↓
Dashboard
        ↓
User Profile
```

Redeem approval is a **writer** into Membership. Referrals do **not** own a separate activation lifecycle.  
Subscriptions remain the payment owner; Referrals do not verify payments.

Canonical sources: [`../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md`](../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md)

---

## Related

[`../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md`](../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md)
