# Member Subscriptions — Implementation Report

**Phase:** 4  
**Status:** Shell only  
**Last Updated:** July 29, 2026  
**Canonical lifecycle:** [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)

---

## What shipped

Placeholder page only:

```text
src/app/admin/subscriptions/page.tsx → ModulePlaceholder (Phase 4)
```

Deep-links from Dashboard and Control Center are partially specified; add `awaiting_admin_approval` when widgets are updated.

---

## Product policy (docs locked July 29, 2026)

- Automatic verification → **Awaiting Admin Approval**  
- Membership / Discord / entitlements activate **only after Admin Approve**  
- Verification ≠ Approval  

---

## What is not shipped

- `src/components/members/sections/subscriptions/`  
- Subscriptions hook / mock / types  
- Approve / Reject UI  
- Explorer-integrated details panel  

---

## Backend impact

APIs reserved in [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md).  
Verification engine remains backend-owned; Approve is the Membership writer trigger.

---

## Remaining

Full Phase 4 UI — highest Member Management product gap. Inherit Dashboard design language; no redesign. Implement widgets for:

```text
Pending Verification · Awaiting Admin Approval · Verification Required · Rejected · Approved
```

## Related

Architecture: [`../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md)  
Admin ops: [`../04_Admin/SUBSCRIPTION_ADMINISTRATION.md`](../04_Admin/SUBSCRIPTION_ADMINISTRATION.md)
