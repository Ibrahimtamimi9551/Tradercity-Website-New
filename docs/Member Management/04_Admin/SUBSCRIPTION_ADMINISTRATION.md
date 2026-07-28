# Subscription Administration

**Version:** 2.0  
**Status:** Draft — UI not built (placeholder route)  
**Authority:** `docs/Member Management/04_Admin/`  
**Last Updated:** July 29, 2026  
**Canonical lifecycle:** [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)

---

## Intent

Administrators are the **final operational authority** before Membership activation.

Operate Subscription tickets to:

- Monitor payments still **Pending Verification**
- Process **Awaiting Admin Approval** (auto-verified — primary queue)
- Manually review **Verification Required** failures
- **Approve** or **Reject** after inspecting the blockchain explorer
- Never treat automatic verification as activation

---

## Current Admin capability

Route `/admin/subscriptions` renders `ModulePlaceholder` only. No approve/reject UI yet.

Deep-links from Dashboard and Control Center must work when Phase 4 lands.

---

## Planned admin actions

| Action | Effect (backend) |
|--------|------------------|
| Open Explorer | External chain inspection (required step in workflow) |
| Approve | Ticket → Approved → **Membership activated** → Discord sync → Audit |
| Reject | Close ticket with reason — Membership unchanged |
| Open member | Navigate Control Center or filtered ticket |

---

## Display states

```text
Pending Verification
Awaiting Admin Approval
Verification Required
Rejected
Approved / Successful
```

### Verification vs Approval

- **Verification** (system): payment validity  
- **Approval** (admin): authorization to activate Membership  

---

## Standard workflow

```text
Open Subscription ticket (Awaiting Admin Approval or Verification Required)
        ↓
Review Verification Result + Expected vs Actual amount
        ↓
Click Explorer → inspect on-chain TX
        ↓
Approve / Reject
```

---

## Related

- Frontend: [`../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md)  
- API: [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)  
- Admin `08`: pricing / verification stack  
