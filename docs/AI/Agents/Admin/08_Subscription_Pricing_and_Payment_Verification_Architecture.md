# Subscription Pricing & Payment Verification Architecture

**Document Version:** 2.0  
**Status:** Living Specification — frontend architecture & product behavior  
**Authority for Admin agents:** read alongside [`04_Development_Rules.md`](04_Development_Rules.md)  
**Canonical activation policy:** [`docs/Member Management/02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../../Member%20Management/02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)  
**Last Updated:** July 29, 2026

---

## Frontend Architecture Ownership

This document (and related Admin architecture chapters) describe **product vision**, **frontend architecture**, and intended system behavior from the **frontend perspective**.

Their purpose is to:

* Communicate business rules  
* Document user flows  
* Define frontend responsibilities  
* Describe expected system capabilities  
* Provide implementation **context** for future backend development  

These documents are **not** backend implementation specifications.

### Responsibility boundary

| Owned by Frontend | Owned by Backend Developer |
|-------------------|----------------------------|
| Product behavior | NestJS module architecture |
| User journeys & UI flows | Database schema |
| Business scenarios | API design |
| Frontend state models & shared types | Blockchain integration |
| Pricing architecture | Payment verification **algorithms** |
| Payment flow architecture | Background jobs, queues |
| Required backend **capabilities** (what must be possible) | Transaction validation, security, performance, error handling |
| Future extension points | How those capabilities are built |

### Documentation philosophy

Whenever this document describes future backend behavior, treat it as a **functional requirement**, not an implementation instruction.

✔️ **Correct**

> The Payment Verification Engine should validate that the payment received matches the **Payment Quote** issued when the member started that payment attempt (expected amount frozen at quote time).

❌ **Not appropriate (frontend must not dictate)**

> Create a NestJS `PaymentVerificationService`, poll the blockchain every 30 seconds, and store the result in a `payment_verifications` table.

The first describes **what the system should achieve**.  
The second dictates **how** the backend must be implemented — that decision belongs to the backend developer.

### Collaboration goal

Frontend architecture should give the backend developer enough context to understand the product vision and expected behavior, while leaving implementation decisions to backend architecture. Each layer can evolve independently without coupling frontend docs to NestJS, Prisma, or chain-polling details.

---

## Purpose

Define the modular subscription payment stack so Pricing and Verification stay independent.

This document verifies the **current** frontend layers and describes **required capabilities** of a future Payment Verification Engine as product behavior — without prescribing backend modules, APIs, schemas, or blockchain integration details.

---

## Architecture Layers

### Implemented today (frontend)

```text
Membership Catalog
        ↓
Pricing Engine
        ↓
Payment Flow (UI)
        ↓
Admin Management (UI / tickets)
```

### Target capability stack (product behavior)

```text
Membership Catalog
        │
        ▼
Pricing Engine
        │
        ▼
Payment Quote
(Standard Price · Adjustments · Expected Amount)
        │
        ▼
User Pays
        │
        ▼
Verification Engine          ← system: payment validity only
        │
        ▼
Awaiting Admin Approval      ← human checkpoint (Phase 1 mandatory)
        │
        ▼
Admin Approve / Reject
        │
        ▼
Membership Activation        ← only after Approve
        │
        ▼
Discord Access
```

| Layer | Owns (capability) | Does not own |
|-------|-------------------|--------------|
| **Membership Catalog** | Official plan ids + list prices (Monthly $60 / Quarterly $150 / Yearly $500) | Promotions, blockchain |
| **Pricing Engine** | Eligible adjustments → expected payable for a user/context | On-chain verification; persistence |
| **Payment Quote** | Frozen pricing decision for one payment attempt (standard, adjustments, expected amount) | Recalculating later; verification algorithms |
| **Payment Verification Engine** | Validate received payment matches the **Payment Quote** for that attempt | Membership activation; Discord roles; Admin Approval |
| **Admin Approval** | Final authority to activate Membership after verification | Chain algorithms; inventing prices |
| **Membership Activation** | VIP status, duration, renewals — **triggered only by Admin Approve** | Payment math; auto-activate on verify |
| **Discord Access** | Role assignment after activation | Pricing or verification math |
| **Admin Management** | Ticket queue, explorer review, approve/reject UI, reporting on **standard** catalog prices | Inventing prices or chain logic |

### Verification vs Approval (locked)

| Concept | Owner | Question | Output |
|---------|-------|----------|--------|
| **Verification** | System | Does this TX satisfy verification rules? | Verified · Verification Failed |
| **Approval** | Administrator | Should TraderCity activate this membership? | Approved · Rejected |

**Verified ≠ Activated.** Automatic verification alone must never grant Membership, Discord roles, access permissions, or entitlements.

---

## Source of Truth (frontend code)

| Layer | Path | Status |
|-------|------|--------|
| Membership Catalog | `src/lib/membership/plans.ts` | **Live** |
| Pricing Engine | `src/lib/membership/pricing/` | **Live** |
| Payment Quote | `src/lib/membership/pricing/quote.ts` | **Type / product concept** (not a DB table) |
| Payment Verification | `src/lib/membership/verification/` | **Frontend types / capability placeholders only** |
| Payment Flow UI | `src/components/pricing/**`, `payment-activation/**`, `dashboard/free/**` | **Live** (consumes catalog + pricing) |
| Admin UI | `src/components/members/**`, `src/app/admin/subscriptions/**` | **Live** (display / mocks) |

Admin re-exports: `src/types/admin/membership.ts`

---

## Layer Responsibilities

### 1. Membership Catalog

Defines only:

- `MONTHLY` / `QUARTERLY` / `YEARLY`
- Official subscription list prices

Never knows about Welcome Credit, coupons, or campaigns.

### 2. Pricing Engine

Calculates for a **user-specific** context:

```text
Standard Plan Price
        ↓
Eligible Pricing Adjustments
        ↓
Expected Payable Amount
```

Example (Welcome Credit eligible):

```text
Monthly Plan          $60
Welcome Credit       -$10
Expected Payment      $50
```

**Pricing determines what the member should pay.**  
It does **not** verify blockchain payments.

Active adjustment today: Welcome Credit (`welcome_credit`).  
Reserved types (not implemented): referral, coupon, promotional, seasonal, admin credit, wallet balance.

### 3. Payment Quote (critical business object)

The Pricing Engine’s output for a payment attempt is not a transient note — it is a **Payment Quote** (backend may equivalently call this a **Payment Intent**).

A Payment Quote freezes:

```text
Standard Price
Adjustments
Expected Amount
```

…for **that user**, for **that payment attempt**, at **quote time**.

#### Why a quote — not live recalculation

When the member starts Activate / Pay, verification must **not** ask the Pricing Engine “what would this cost *now*?”

It must compare payment received against the **exact pricing decision** that existed when the quote was issued.

That matters when, later:

* Coupon validity changes  
* Promotions expire  
* Referral credits are revoked  
* Catalog plan prices change  

**Functional rule:** Verification verifies against the Payment Quote issued for that transaction — never against a fresh Pricing Engine run.

Persisting a quote is a **backend capability**. Frontend documents the concept and type only (`PaymentQuote` in `src/lib/membership/pricing/quote.ts`) — not a database table or API.

### 4. Payment Verification Engine (Future capability)

Completely separate from Pricing. Implementation is **backend-owned**.

**Functional requirement — question it must answer:**

> Did the payment received match the **Payment Quote** issued for **this user** / **this attempt**?

**Product rule:**

```text
Payment Quote.Expected Amount  ==  Payment Received
```

Never assume `Monthly === always $60`.  
Never re-run the Pricing Engine at verification time.

#### User-specific examples (business scenarios)

| User | Plan | Adjustments (on quote) | Quote expected | Received | Verification result | Next |
|------|------|------------------------|----------------|----------|---------------------|------|
| A | Monthly | Welcome −$10 | $50 | $50 | **Verified** | Awaiting Admin Approval |
| B | Monthly | None | $60 | $60 | **Verified** | Awaiting Admin Approval |
| C | Monthly | Referral −$20 (future) | $40 | $40 | **Verified** | Awaiting Admin Approval |

Why this matters: Welcome Credits, Referral Credits, Coupons, Seasonal Campaigns, Wallet Credits, and Admin Credits can evolve **without** changing the verification *rule* (quote expected vs received). How the backend stores quotes, reads the chain, or runs jobs is out of frontend scope.

#### Information verification will need (capability inputs)

Frontend documents these as **required data concepts** (also reflected in shared types for UI readiness). Backend chooses schema and transport:

- Discord Username  
- User ID  
- Selected Membership Plan  
- **Payment Quote** (standard price, adjustments, expected amount)  
- Transaction Hash  
- Wallet Address  
- Blockchain Network  
- Payment Timestamp  

See `PaymentQuote` (`pricing/quote.ts`) and `PaymentVerificationInput` (`verification/types.ts`) — frontend state / capability shapes, **not** DB or API contracts.

#### Expected user journey (product flow) — canonical

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
Load Payment Quote for this attempt
        ↓
Compare Quote Expected Amount vs Received Amount
        ↓
Payment Verified
        ↓
Awaiting Admin Approval
        ↓
Admin Opens Subscription Ticket
        ↓
Transaction Hash + Explorer Link Available
        ↓
Admin Reviews Transaction
        ↓
Approve / Reject
        ↓
Membership Activated          ← Approve only
        ↓
Discord Synchronization
        ↓
Audit Event Recorded
```

Steps after “User Completes Crypto Payment” are backend + Admin capabilities. Frontend defines outcomes the member + Admin UIs must support.

**Failure path:** Verification Failed → Manual Review Required (`Verification Required`) → Admin Approve / Reject. Still no Membership until Approve.

#### Verification engine outcomes (product / UI)

| Outcome | Meaning | Advances to |
|---------|---------|-------------|
| `pending` | Waiting for payment confirmation | — |
| `verifying` | Payment is being validated | — |
| `verified` | Payment matches quote expected amount | **Awaiting Admin Approval** (not activation) |
| `underpaid` | Received below quote expected | Manual Review Required |
| `overpaid` | Received above quote expected | Manual Review Required |
| `expired` | Verification window / quote validity exceeded | Manual Review Required |
| `failed` | Payment invalid | Manual Review Required / Reject path |
| `cancelled` | Activation cancelled before approval | Closed |
| `refund_required` | Manual review / refund path | Manual Review Required |

> Legacy name `successful` on the verification engine meant “amount matched.” Prefer **`verified`** so it is not confused with Admin **Approved** / Membership activated.

**Do not implement verification algorithms in the frontend.**  
Admin Phase 4 UI display states:

```text
Pending Verification · Awaiting Admin Approval · Verification Required · Rejected · Approved (Successful)
```

Mapping hints: `ADMIN_DISPLAY_TO_VERIFICATION_OUTCOMES` (keep in sync with this policy).

### 5. Admin Management

- Subscription tickets surface **Awaiting Admin Approval** as the primary work queue after auto-verify  
- Admin must open explorer, compare verification result, then Approve / Reject  
- Revenue / membership analytics use **standard catalog** prices  
- Details panel must show: Verification Result · Timestamp · Method · TX hash · Explorer link · Expected vs Actual amount · Network · Wallet · (future) Verification Notes  

### 6. Phase 1 policy & future automation

**Phase 1:** Manual Admin Approval is **mandatory** after every successful automatic verification — to validate the verification engine in production, build confidence, catch edge cases, and ensure human confirmation before access.

**Future (allowed without redesign):** Risk Assessment may auto-approve low-risk verified payments while keeping high-risk tickets in Awaiting Admin Approval. Verification and Approval remain separate events; only the approval *policy* changes.

Canonical write-up: [`SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../../Member%20Management/02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md).

---

## Frontend Verification Checklist (current)

| Concern | Status |
|---------|--------|
| Catalog isolated from promotions (`plans.ts`) | ✅ |
| Pricing Engine owns adjustments + payable (`pricing/`) | ✅ |
| Payment Quote defined as product object (`pricing/quote.ts`) | ✅ type / concept |
| Homepage Pricing / Free Dashboard / Payment Activation consume shared engine | ✅ |
| Admin types re-export catalog + pricing + quote | ✅ |
| Verification capability documented as functional requirements + frontend types | ✅ |
| Backend payment verification / quote persistence implemented | ❌ backend-owned; out of frontend scope |

---

## Constraints (frontend)

- Do **not** implement payment verification algorithms in Next.js  
- Do **not** add blockchain integrations in the frontend app  
- Do **not** invent database schemas, API routes, or backend modules from these docs  
- Catalog list prices remain $60 / $150 / $500  
- Describe required **capabilities**; leave **implementation** to the backend developer  

---

## Related Documents

- [`04_Development_Rules.md`](04_Development_Rules.md) — data alignment, plan prices, Welcome Credit  
- [`03_Module_Specifications.md`](03_Module_Specifications.md) — Subscriptions UI + workflows  
- [`01_Product_Vision_and_Architecture.md`](01_Product_Vision_and_Architecture.md) — Admin as operations center  
- [`docs/Development/Admin/Phase-Roadmap.md`](../../Development/Admin/Phase-Roadmap.md) — Phase 4 Subscriptions timing  
