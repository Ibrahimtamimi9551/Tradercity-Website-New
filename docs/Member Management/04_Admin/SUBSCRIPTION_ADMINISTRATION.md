# Subscription Administration

**Version:** 2.2  
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
| Payment Resolution | Verification Required only — contact, failure summary, checklist, notes, Approve / Reject |
| Actions | Open Explorer · Approve · Reject · Open Profile |
| Mobile | Full-page `/admin/subscriptions/[id]` |

Deep-links from Dashboard, Members directory (`?q=` + `?member=`), and Control Center work against the live UI.

Approve / Reject are **frontend stubs** until NestJS wiring. Payment Resolution does **not** invent a separate decision path — it reuses the same stubs.

---

## Admin actions

| Action | Frontend (now) | Backend (later) |
|--------|----------------|-----------------|
| Open Explorer | Opens `explorerUrl` | Same |
| Open Discord / Send Email | Copy username · `mailto:` (mock) | Optional Discord / email integrations |
| Add Resolution Note | Local mock notes | Persist on ticket |
| Approve | Alert stub + NestJS path | Ticket → Approved → Membership → Discord → Audit |
| Reject | Alert stub + NestJS path | Close ticket — Membership unchanged |
| Open member | Navigate Control Center | Same |

---

## Display states

```text
Blockchain Verifying      ← System-owned; no admin action
Approval Pending          ← Admin-owned; primary Approve queue after auto-verify
Verification Required     ← Admin-owned; Payment Resolution workspace
Rejected
Approved / Successful
```

| State | Owner | Admin action |
|-------|-------|--------------|
| Blockchain Verifying | System | No |
| Verification Required | Admin | Yes — Payment Resolution → Approve / Reject |
| Approval Pending | Admin | Yes — Approve Membership / Reject Payment |

### Verification vs Approval

- **Verification** (system): payment validity  
- **Approval** (admin): authorization to activate Membership  

### Details panel behaviour

| State | Actions | Guidance |
|-------|---------|----------|
| Blockchain Verifying | None | Verification in progress — no admin action |
| Verification Required | Payment Resolution card | Contact member, checklist, notes, then Approve / Reject |
| Approval Pending | Approve Membership / Reject Payment | Final gate before Membership |

---

## Standard workflow

### Approval Pending

```text
Open Subscription ticket (Approval Pending)
        ↓
Review Verification Result + Expected vs Actual amount
        ↓
Click Explorer → inspect on-chain TX
        ↓
Approve Membership / Reject Payment
```

### Verification Required (Payment Resolution)

```text
Open Subscription ticket (Verification Required)
        ↓
Payment Resolution card appears
        ↓
Contact member (Discord / Email) using activation contact fields
        ↓
Follow checklist · request supporting evidence · add admin notes
        ↓
Approve Payment / Reject Payment  (same Membership stubs)
```

---

## Related

- Frontend: [`../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md)  
- API: [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)  
- Admin `08`: pricing / verification stack  
