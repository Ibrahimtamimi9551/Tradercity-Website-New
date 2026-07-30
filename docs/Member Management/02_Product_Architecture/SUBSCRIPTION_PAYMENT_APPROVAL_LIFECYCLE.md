# Subscription Payment Approval Lifecycle

**Version:** 2.1  
**Status:** Active — **canonical** Subscription → Membership activation policy  
**Authority:** `docs/Member Management/02_Product_Architecture/`  
**Last Updated:** July 29, 2026  
**Companion:** [`docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md`](../../AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md)  
**Activation sources (all writers → one Membership):** [`MEMBERSHIP_ACTIVATION_SOURCES.md`](./MEMBERSHIP_ACTIVATION_SOURCES.md)

This document is the **Crypto Payment** activation path. Other sources (Manual Payment, Referral Redeem, Admin Grant, Future Grant) share the same Membership write + Discord / Profile reflection pattern.

---

## Product decision (locked)

Automatic blockchain verification **must not** activate Membership.

Successful automatic verification transitions the payment to **Approval Pending**.

**Membership activation always requires one final manual administrator approval** (Phase 1 operational policy).

---

## Principle — Verification ≠ Approval

| Stage | Owner | Question | Outputs |
|-------|-------|----------|---------|
| **Verification** | System (Verification Engine) | Does this blockchain transaction satisfy verification rules (quote expected vs received, network, hash, etc.)? | **Verified** · **Verification Failed** |
| **Approval** | Administrator (Subscriptions module) | Should TraderCity now activate this membership? | **Approved** · **Rejected** |

- Verification determines **payment validity**.  
- Approval authorizes **membership activation**.  
- They are independent business events.

---

## Canonical lifecycle

```text
User Selects Membership Plan
        ↓
Pricing Engine
        ↓
Payment Quote Generated
        ↓
User Completes Crypto Payment
        ↓
Blockchain Detection
        ↓
Automatic Verification Engine
        ↓
Payment Verified
        ↓
Approval Pending
        ↓
Admin Opens Subscription Ticket
        ↓
Transaction Hash + Explorer Link Available
        ↓
Admin Reviews Transaction
        ↓
Approve / Reject
        ↓
Membership Activated   ← only after Approve
        ↓
Discord Synchronization
        ↓
Audit Event Recorded
```

### Happy path (Admin display states)

```text
Payment Submitted
        ↓
Blockchain Verifying
        ↓
Approval Pending
        ↓
Approved
        ↓
Membership Activated
        ↓
Discord Sync
```

### Failure / exception path

```text
Payment Submitted
        ↓
Blockchain Verifying
        ↓
Verification Required
        ↓
Manual Investigation
        ↓
Approve / Reject
```

**Rule:** Membership activation must **never** occur before the final **Approved** stage.

---

## What must NOT happen on Verified alone

Automatic verification alone must never activate:

- Membership  
- Discord roles  
- Access permissions  
- Member entitlements  

Those run **only after Admin Approve**.

---

## Admin display states (Subscriptions + Dashboard)

| Display state | Owner | Meaning | Admin action? |
|---------------|-------|---------|---------------|
| **Blockchain Verifying** | System | Engine validating TX (blockchain confirmation in progress) | No — monitor only |
| **Verification Required** | Admin | Auto verification failed / ambiguous | Yes — investigate explorer → Approve / Reject |
| **Approval Pending** | Admin | Auto-verified — **primary Approve queue** | Yes — Approve Membership / Reject Payment |
| **Rejected** | — | Admin rejected | Closed (optional reopen policies later) |
| **Approved** | — | Admin approved; Membership activated (or activating) | View / audit |

### Operational meaning

**Blockchain Verifying** — System-owned. Transaction submitted; automatic verification still running. No admin interaction required.

**Verification Required** — Admin-owned investigation. Automatic verification could not confidently validate (amount mismatch, invalid TX, wrong network, duplicate, timeout, wallet mismatch, service failure). Admin reviews explorer before deciding.

**Approval Pending** — Admin-owned final gate. Payment already verified successfully; waiting only for business approval before Membership activation.

Verified payments remain in the Subscription queue until Approved or Rejected.

Dashboard widgets should distinguish at least:

```text
Blockchain Verifying · Approval Pending · Verification Required · Rejected
```

**URL keys:** `blockchain_verifying` · `approval_pending` · `verification_required`  
(Legacy aliases `pending_verification` / `awaiting_admin_approval` still accepted by the FE filter parser.)

---

## Subscription Details panel (required fields)

| Field | Purpose |
|-------|---------|
| Verification Status | Verifying / Verified / Failed / … |
| Verification Timestamp | When engine completed (when available) |
| Verification Method | Automatic / Manual assist |
| Transaction Hash | Copyable |
| Blockchain Explorer Link | Open network explorer (e.g. BSC) |
| Expected Amount | From Payment Quote |
| Actual Amount | Observed on-chain / received |
| Network | e.g. BNB Smart Chain (BEP20) |
| Wallet Address | Copyable |
| Verification Notes / Failure Reason | Shown especially for Verification Required |

### Panel behaviour by state

| State | Show Approve / Reject? | Guidance |
|-------|------------------------|----------|
| Blockchain Verifying | No | “Blockchain verification is in progress. No admin action is required.” |
| Verification Required | Yes (Approve / Reject) | Failure reason + explorer — investigation state |
| Approval Pending | Yes (Approve Membership / Reject Payment) | Verified result + completed time — final gate |

### Standard Admin workflow

```text
Open Subscription ticket
        ↓
Click Explorer
        ↓
Inspect on-chain transaction
        ↓
Compare with system verification result
        ↓
Approve / Reject
```

---

## Timeline events

### Subscription ticket timeline

- Payment Submitted  
- Blockchain Verifying  
- Verification Completed *(or Verification Failed)*  
- Approval Pending  
- Approved *(or Rejected)*  
- Membership Activated  
- Discord Sync Started  
- Discord Sync Completed  

### User Profile / Activity examples

```text
Payment Submitted
        ↓
Blockchain Verifying
        ↓
Approval Pending
        ↓
Membership Activated
        ↓
Discord Role Assigned
```

Do **not** skip the approval stage in examples.

---

## Cross-module write sequence (after Approve only)

```text
Admin Approves
        ↓
Subscription ticket → Approved
        ↓
Membership Domain updated (plan, status, dates)
        ↓
Discord Sync Requested
        ↓
Discord Domain updated
        ↓
Control Center / Directory / Dashboard reflect
        ↓
Audit event recorded
```

---

## Rationale (Phase 1)

The payment verification engine is newly introduced. TraderCity intentionally requires one final administrator approval before granting membership access so the team can:

- Validate verification-engine correctness in production  
- Build operational confidence in automation  
- Detect unexpected edge cases early  
- Ensure every activation is backed by human confirmation during initial rollout  

---

## Future evolution (not Phase 1)

This manual-approval requirement is a **Phase 1 operational policy**, not a permanent architectural limitation.

Architecture must allow a later policy such as:

```text
Automatic Verification
        ↓
Risk Assessment
        ├─ Low Risk  → Automatic Approval → Membership Activated
        └─ High Risk → Approval Pending → Admin Approve / Reject
```

Do **not** redesign Subscription ownership or Verification vs Approval separation when that policy arrives — only the **approval policy** changes.

---

## Related

- Admin pricing / verification stack: `docs/AI/Agents/Admin/08_…`  
- Subscriptions UI: [`../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md)  
- Admin ops: [`../04_Admin/SUBSCRIPTION_ADMINISTRATION.md`](../04_Admin/SUBSCRIPTION_ADMINISTRATION.md)  
- Data flow: [`MEMBER_DATA_FLOW.md`](./MEMBER_DATA_FLOW.md)  
- Shared SoT: `docs/04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md`
