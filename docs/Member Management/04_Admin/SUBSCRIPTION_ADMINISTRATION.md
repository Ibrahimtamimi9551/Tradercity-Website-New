# Subscription Administration

**Version:** 2.4  
**Status:** Active — Admin UI complete on mocks (Crypto + Manual)  
**Authority:** `docs/Member Management/04_Admin/`  
**Last Updated:** July 29, 2026  
**Canonical lifecycle:** [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)  
**Backend contracts:** [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)

---

## Intent

Administrators are the **final operational authority** before Membership activation.

Operate Subscription sources to:

- **Crypto:** Monitor Blockchain Verifying · process Approval Pending · review Verification Required · Approve / Reject
- **Manual:** Record offline / assisted payments · Review · Activate Membership · Cancel

Never treat automatic crypto verification as activation. Manual payments have no blockchain lifecycle — the administrator confirms receipt.

---

## Current Admin capability

Route `/admin/subscriptions` with in-module tabs:

| Tab | Route |
|-----|-------|
| Crypto Payments | `/admin/subscriptions` |
| Manual Payments | `/admin/subscriptions?source=manual` |

### Crypto

| Surface | Capability |
|---------|------------|
| Widgets | Filter by display status |
| Table | Search / filter tickets |
| Details panel | Payment, blockchain, verification, approval, timeline |
| Payment Resolution | Verification Required only |
| Actions | Open Explorer · Approve · Reject · Open Profile |
| Mobile | Full-page `/admin/subscriptions/[id]` |

### Manual

| Surface | Capability |
|---------|------------|
| Widgets | Pending · Activated · Cancelled |
| Table | Member · Plan · Method · Amount · Received · Activated By · Status |
| Filters | Search · Plan · Method · Status · Date range |
| Create | Modal: free-text Discord username · DateTimePicker (IST) · review step → Pending |
| Details | Summary · Payment Information · Review · Membership Result · Timeline |
| Actions | Activate Membership · Cancel · Open Profile (when `memberId` linked) |
| Mobile | Full-page `/admin/subscriptions/mp-*` |

Approve / Activate / Cancel are **frontend stubs** (Crypto alerts; Manual local mock state) until NestJS wiring.

---

## Create Manual Payment (ops notes for backend)

| Field | Ops behaviour |
|-------|----------------|
| Discord Username | Free text — payment may arrive before registration |
| Payment Date | Calendar + time picker; default current IST; set to **actual receipt** time |
| Activate | Separate step after create — writing Membership is not implicit |

Backend must accept create without a resolved Member ID and link later.

---

## Admin actions

| Action | Source | Frontend (now) | Backend (later) |
|--------|--------|----------------|-----------------|
| Open Explorer | Crypto | Opens `explorerUrl` | Same |
| Approve | Crypto | Alert stub | Ticket → Approved → Membership → Discord → Audit |
| Reject | Crypto | Alert stub | Close ticket — Membership unchanged |
| Create Manual Payment | Manual | Mock state append | Persist Manual Payment (`username`, IST `receivedAt`) |
| Activate Membership | Manual | Mock state → Activated | Membership (`activationSource=manual_payment`) → Discord → Audit |
| Cancel | Manual | Mock state → Cancelled | Close — Membership unchanged |
| Open member | Both | Control Center when `memberId` present | Same · resolve username when missing |

---

## Display states

### Crypto

```text
Blockchain Verifying · Approval Pending · Verification Required · Rejected · Approved
```

### Manual

```text
Pending · Activated · Cancelled
```

### Verification vs Approval (Crypto)

- **Verification** (system): payment validity  
- **Approval** (admin): authorization to activate Membership  

### Manual confirmation

- Administrator records payment → Pending  
- Activate Membership → Membership Result + Discord Sync timeline  

---

## Related

Architecture: [`../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md)  
Implementation: [`../06_Implementation/MEMBER_SUBSCRIPTIONS_IMPLEMENTATION.md`](../06_Implementation/MEMBER_SUBSCRIPTIONS_IMPLEMENTATION.md)  
API expectations: [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)  
Phase record: [`../../Development/Admin/Phase-04-Subscriptions.md`](../../Development/Admin/Phase-04-Subscriptions.md)
