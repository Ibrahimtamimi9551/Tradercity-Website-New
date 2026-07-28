# Subscription Administration

**Version:** 2.1  
**Status:** Active — Admin UI complete on mocks  
**Authority:** `docs/Member Management/04_Admin/`  
**Last Updated:** July 29, 2026  
**Canonical lifecycle:** [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)

---

## Intent

Administrators are the **final operational authority** before Membership activation.

Operate Subscription tickets to:

- Monitor payments still **Blockchain Verifying**
- Process **Approval Pending** (auto-verified — primary queue)
- Manually review **Verification Required** failures
- **Approve** or **Reject** after inspecting the blockchain explorer
- Never treat automatic verification as activation

---

## Current Admin capability

Route `/admin/subscriptions` renders the Subscriptions ticket queue (mock data).

| Surface | Capability |
|---------|------------|
| Widgets | Filter by display status |
| Table | Search / filter tickets |
| Details panel | Payment, blockchain, verification, approval, timeline |
| Actions | Open Explorer · Approve · Reject · Open Profile |
| Mobile | Full-page `/admin/subscriptions/[id]` |

Deep-links from Dashboard and Control Center work against the live UI.

Approve / Reject are **frontend stubs** until NestJS wiring.

---

## Admin actions

| Action | Frontend (now) | Backend (later) |
|--------|----------------|-----------------|
| Open Explorer | Opens `explorerUrl` | Same |
| Approve | Alert stub + NestJS path | Ticket → Approved → Membership → Discord → Audit |
| Reject | Alert stub + NestJS path | Close ticket — Membership unchanged |
| Open member | Navigate Control Center | Same |

---

## Display states

```text
Blockchain Verifying      ← System-owned; no admin action
Approval Pending          ← Admin-owned; primary Approve queue after auto-verify
Verification Required     ← Admin-owned; investigation after auto-verify failure
Rejected
Approved / Successful
```

| State | Owner | Admin action |
|-------|-------|--------------|
| Blockchain Verifying | System | No |
| Verification Required | Admin | Yes — Approve / Reject |
| Approval Pending | Admin | Yes — Approve Membership / Reject Payment |

### Verification vs Approval

- **Verification** (system): payment validity  
- **Approval** (admin): authorization to activate Membership  

### Details panel behaviour

| State | Actions | Guidance |
|-------|---------|----------|
| Blockchain Verifying | None | Verification in progress — no admin action |
| Verification Required | Approve / Reject | Investigate failure via explorer |
| Approval Pending | Approve Membership / Reject Payment | Final gate before Membership |
---

## Standard workflow

```text
Open Subscription ticket (Approval Pending or Verification Required)
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
