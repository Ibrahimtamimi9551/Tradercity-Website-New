# TraderCity Admin Dashboard — Cross-Module Data Synchronization Architecture

**Document Version:** 1.0  
**Status:** Official Product + Backend Data-Relationship Contract  
**Milestone Alignment:** Pre-backend Admin domain work (Subscriptions / Discord / Referrals)  
**Audience:** Backend engineers, frontend engineers, product owners, AI agents  
**Authority:** Product Architecture Layer (`docs/04_Product_Architecture/`)

---

## Document Role

This is the **canonical cross-module data ownership and synchronization contract** for the TraderCity Admin Dashboard.

| This document owns | Related docs (do not replace this) |
|--------------------|------------------------------------|
| Field / domain ownership matrix | `docs/AI/Agents/Admin/*` (Admin UI vision & module specs) |
| Write vs read surfaces | `docs/00_Project_Governance/PROJECT_ARCHITECTURE.md` (domain map) |
| Membership as backend domain (not Admin page) | `docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md` |
| Cross-module data-flow sequences | `docs/04_Product_Architecture/REFERRAL_SYSTEM_ARCHITECTURE.md` |
| Development standard for new modules | Admin Discord sync philosophy (`03` / `07`) |

**Rule:** Frontend UI may ship on mocks. Backend must implement this ownership contract before production multi-module state goes live. Suggested domain boundaries are **behavioral contracts** — backend may refine table naming while preserving **one owner per field** and **Membership as the lifecycle SoT**.

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Architecture Map](#2-architecture-map)
3. [Single Source of Truth](#3-single-source-of-truth)
4. [Domain Ownership](#4-domain-ownership)
5. [Synchronization Matrix](#5-synchronization-matrix)
6. [Data Flow Sequences](#6-data-flow-sequences)
7. [Write vs Read Surfaces](#7-write-vs-read-surfaces)
8. [Development Standard](#8-development-standard)
9. [Relationship to Existing Docs](#9-relationship-to-existing-docs)
10. [Non-Goals](#10-non-goals)
11. [Why This Architecture Matters](#11-why-this-architecture-matters)

---

## 1. Purpose

Every Admin module has a dedicated responsibility.

Each module manages only its own domain.

The **User Profile** (Member Control Center) is the aggregation layer where the current state of every domain is reflected.

Therefore:

> **Modules own the data.**  
> **User Profile reflects the data.**  
> **Never duplicate business logic.**

Until now, Admin work designed **pages** (Dashboard, Members, User Profile, Subscription, Discord). This document designs the **data relationship** — so the backend does not become a maze of duplicated VIP / payment / Discord / referral state.

---

## 2. Architecture Map

### 2.1 Admin navigation (pages)

```text
Dashboard
        │
        ▼
Members Table
        │
        ▼
User Profile (Control Center)
        │
 ┌──────┼──────────┬──────────┬──────────┐
 ▼      ▼          ▼          ▼          ▼
Membership  Subscription  Discord  Referral  Notes
 Activity      Card         Card     Card
 (reflect)   (reflect)   (reflect) (reflect) (own)
```

Everything operational eventually **surfaces** in User Profile.

User Profile never **owns** those business domains.

### 2.2 Membership is a backend domain — not an Admin page

```text
                    MEMBERSHIP
             (Backend Domain Model)
                     │
────────────────────────────────────────
      Source of Truth for access
────────────────────────────────────────

Current Plan
Membership Status
VIP / Access Status
Activation Date
Expiry Date
Renewal Count
Membership Duration
Days Remaining
```

This is **not** a sidebar module and **not** a dedicated Admin page.

It is the canonical backend record for “does this member have access, and until when?”

### 2.3 Multiple writers → one Membership state

```text
Subscriptions
        │
Payment Approved
        │
──────────────► Membership

Referral
        │
Redeem Approved
        │
──────────────► Membership

Admin Manual Activation
        │
──────────────► Membership

Future Promotions / Gifts / Coupons / Staff / Founder
        │
──────────────► Membership
```

Multiple modules can **produce lifecycle events**.

Only one domain **owns the resulting state**.

**Canonical Activation Sources taxonomy** (Crypto Payment · Manual Payment · Referral Redeem · Admin Grant · Future Grant):  
[`docs/Member Management/02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md`](../Member%20Management/02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md)

Ops queue terminology: **Referral Redeem Requests** (not “Redemption”). Approve Redeem triggers Membership — Referrals do not own a separate activation lifecycle.

### 2.4 Membership propagates outward (readers)

```text
Membership
      │
      ├── Dashboard
      ├── Members Table
      ├── User Profile
      ├── Discord Integration
      └── Analytics
```

Nobody edits Membership through a “Membership page.”

They act through operational workflows; Membership updates; readers refresh.

```text
                    Operational Writers
         ┌──────────┬──────────┬──────────┬──────────┐
         │Subscrip- │ Referral │  Manual  │  Future  │
         │  tions   │          │ Activation│  Grants │
         └────┬─────┴────┬─────┴────┬─────┴────┬─────┘
              │          │          │          │
              └──────────┴────┬─────┴──────────┘
                              ▼
                     Membership Domain
                              │
         ┌──────────┬─────────┼─────────┬──────────┐
         ▼          ▼         ▼         ▼          ▼
     Dashboard   Members   Profile   Discord    Analytics
```

---

## 3. Single Source of Truth

### 3.1 One rule

Every piece of information must have **exactly one owner**.

If a field belongs somewhere else, do not recreate it. Display it.

### 3.2 Show ≠ Own

| Surface | May show | May write |
|---------|----------|-----------|
| Members Directory | Subscription / Discord / Referral / Membership health | Identity directory fields only (as defined by Identity domain) |
| User Profile | All domain summaries | Internal Notes only |
| Dashboard | Queues and health derived from domains | Nothing (routes only) |
| Subscriptions | Payment ticket + links into Membership outcome | Payment / verification fields; may **emit** Membership updates |
| Discord | Sync / role / connection | Discord sync fields; does not invent VIP |
| Referral | Progress / credits / redeem | Referral fields; may **emit** Membership updates on approved redeem |

### 3.3 Physical source of truth

- **PostgreSQL via backend** is the physical source of truth.
- Frontend never invents business rules or parallel VIP state.
- Discord is a **synchronized reflection** of TraderCity access decisions — not the master.
- Module UIs are operational surfaces over domains — not competing databases.

---

## 4. Domain Ownership

### 4.1 Identity (Members / Registration)

**Purpose (Admin Members module):** Find, search, filter, assess health, navigate to User Profile.

**Owns (identity record):**

| Field | Notes |
|-------|--------|
| Email | Registered account email |
| Discord Username (linked) | Linked identity display field |
| Membership Type (directory label) | Derived display may read Membership; directory must not invent a second VIP flag |
| System Health / Overall Status | Derived rollups from domain states — not independent business truth |
| Search / Filters | Directory UX only |

**Shows (does not manage):**

- Subscription Status
- Discord Status
- Referral Progress
- Membership Status / expiry health

**Does not own:** Payment verification, Discord sync execution, referral ledger, Membership lifecycle writes.

**When clicking a member → open User Profile.**

---

### 4.2 Membership (Backend Domain — not Admin page)

**Purpose:** Single source of truth for access / VIP lifecycle.

**Owns:**

| Field |
|-------|
| Current Plan |
| Membership Status (Active / Expired / etc.) |
| VIP / Access Status |
| Activation Date |
| Expiry Date |
| Days Remaining |
| Renewal Count |
| Membership Duration |

**Writable only via operational writers:**

| Writer | Trigger |
|--------|---------|
| Subscriptions | Payment approved / verified activation |
| Referral | Redeem approved → extend / grant access |
| Manual Activation | Admin grants VIP without payment |
| Future grant sources | Coupon, giveaway, gift, staff, founder, partner, enterprise seats |

**Reflected in:**

- User Profile — Membership Activity card
- Members Table — health / status columns
- Dashboard — expiry / attention queues
- Discord Integration — access-driven sync requests
- Analytics — access cohort metrics

**Must not:**

- Become a separate Admin sidebar page
- Duplicate payment ticket fields
- Duplicate Discord role state
- Duplicate referral credits

---

### 4.3 Subscription (Payment Domain)

**Purpose:** Own everything related to payments and payment verification.

**Owns:**

| Field / concern |
|-----------------|
| Transaction Hash |
| Payment / amount / method |
| Payment Status |
| Verification |
| Wallet |
| Activation Method (payment path) |
| Payment Timeline |
| Payment Proof |
| Manual Verification |
| Dispute / Rejected / Approved |

**Emits into Membership:**

On successful verification / approved activation → update Membership domain (plan, status, dates).

**Reflects into User Profile (Subscription card):**

- Subscription / payment status
- Plan (as payment context; lifecycle dates still owned by Membership)
- Transaction Hash
- Payment Date
- Activation Method

**Must not duplicate:**

- Discord information
- Referral ledger / credits
- A second copy of Membership expiry as Subscription-owned “Expired” ticket state

> Expiration belongs to the **Membership domain**, not the Subscription payment ticket.

---

### 4.4 Discord (Sync Domain)

**Purpose:** Own Discord synchronization — exactly as previously defined in Admin specs.

**Owns:**

| Field / concern |
|-----------------|
| Discord Role |
| Connection Status |
| Sync Status |
| Role History |
| Discord Events |
| Sync Logs |
| Joined Discord |
| Account State (Discord-side) |

**Principle:** Backend decides. Discord executes. TraderCity database is source of truth. Discord is the communication platform — not the master of VIP.

**Reflects into User Profile (Discord card):**

- Current Role
- Connected
- Role History
- Community Access
- Sync Status

**Must not own:**

- Payment
- Membership lifecycle state
- Referral economics

**Reacts to Membership:** When Membership access changes, Discord sync is requested so roles match TraderCity truth.

---

### 4.5 Referral (Referral Domain)

**Purpose:** Own the referral system (see also `REFERRAL_SYSTEM_ARCHITECTURE.md`).

**Owns:**

| Field / concern |
|-----------------|
| Referral Code |
| Successful / Pending Referrals |
| Credits / ledger |
| Redeem Request |
| Verification (referral program) |
| Reward Status |

**Emits into Membership:**

On approved redeem → extend / grant Membership. Referral does **not** become the Membership owner.

**Reflects into User Profile (Referral card):**

- Progress
- Credits
- Eligibility
- Redeem Status

**Must not own:** Payment tickets, Discord roles, Membership dates as a parallel store.

---

### 4.6 User Profile (Control Center — Aggregation Layer)

**Purpose:** Single place to understand one member. Not the place to manage every domain.

> Member Profile should become a **control center**, not a **data center**.

**Owns:**

| Concern | Notes |
|---------|--------|
| Internal Notes | Only business write surface on Profile |
| Recent Activity (presentation) | Aggregates operational events for display |
| Layout / Navigation | Cards, tabs, Manage → links |

**Reflects (read-only cards):**

| Card | Source domain |
|------|----------------|
| Identity header | Identity |
| Membership Activity | Membership |
| Subscription | Subscription |
| Discord | Discord |
| Referral | Referral |

Each reflection card exposes:

```text
Manage Subscription →
Manage Discord →
Manage Referral →
```

(and Membership Activity typically deep-links to Subscriptions for payment-driven ops; Referral / Manual Activation remain valid Membership writers via their own modules.)

**User Profile never edits** Subscription, Discord, Referral, or Membership business fields.

---

### 4.7 Dashboard (Operations Inbox)

**Owns:** Nothing (monitors and routes only).

**Reads:** Derived queues and health from Membership, Subscription, Discord, Referral.

---

### 4.8 Domain summary matrix

| Domain | Owns | Editable From |
|--------|------|---------------|
| Identity | User identity record | Registration / future identity edit flows |
| Membership | Access / VIP lifecycle | Subscriptions, Referral, Manual Activation, future grants |
| Subscription | Payment domain | Subscription Module |
| Discord | Discord sync domain | Discord Sync Service / Discord Module |
| Referral | Referral domain | Referral Module |
| User Profile | Aggregation layer | Internal Notes only |
| Dashboard | Nothing | — |

---

## 5. Synchronization Matrix

| Information | Owner Domain | Reflected In User Profile | Editable In User Profile |
|-------------|--------------|---------------------------|--------------------------|
| Email | Identity | Yes | No |
| Discord Username (linked) | Identity | Yes | No |
| Membership Status | Membership | Yes | No |
| Current Plan | Membership | Yes | No |
| Activation / Expiry / Days Remaining | Membership | Yes | No |
| Renewal Count / Duration | Membership | Yes | No |
| Subscription / Payment Status | Subscription | Yes | No |
| Transaction Hash | Subscription | Yes | No |
| Payment Date / Proof / Wallet | Subscription | Yes (summary) | No |
| Discord Role | Discord | Yes | No |
| Discord Connection | Discord | Yes | No |
| Role History | Discord | Yes | No |
| Sync Status / Logs | Discord | Yes (summary) | No |
| Referral Progress | Referral | Yes | No |
| Credits | Referral | Yes | No |
| Redeem / Eligibility Status | Referral | Yes | No |
| Internal Notes | User Profile | Yes | Yes |
| Recent Activity (presentation) | User Profile (aggregate) | Yes | No (display only) |

**Rule:** If a column is “Reflected In User Profile = Yes” and “Editable In User Profile = No,” the Admin must navigate to the owning module to change it.

---

## 6. Data Flow Sequences

### 6.1 Registration

```text
Registration
        ↓
Database (Identity record)
        ↓
Members Table (directory row)
        ↓
User Profile available (Control Center shell)
        ↓
Other domains update independently thereafter
```

### 6.2 Subscription → Membership → Discord → readers

```text
Payment Submitted
        ↓
Automatic Verification Engine
        ↓
Payment Verified
        ↓
Awaiting Admin Approval          ← Membership NOT written yet
        ↓
Admin Approve (Subscriptions)
        ↓
Membership Domain updated (plan, status, dates)
        ↓
Discord Sync Requested
        ↓
Discord Domain updated (role / sync status)
        ↓
User Profile reflects
        ↓
Members Table / Dashboard reflect
        ↓
Audit event recorded
```

**Rule:** Automatic verification alone must never write Membership or Discord VIP entitlements. Admin Approval is the mandatory gateway (Phase 1 policy). See [`docs/Member Management/02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../Member%20Management/02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md).

### 6.3 Referral completed → Membership → readers

```text
Referral Completed / Redeem Approved
        ↓
Referral Module
        ↓
Admin Verification (referral workflow)
        ↓
Membership Domain extended / updated
        ↓
Membership Activity card updated (Profile)
        ↓
Dashboard / Members reflect
        ↓
Discord sync requested if access changed
```

### 6.4 Discord left server

```text
Member Left Discord Server
        ↓
Discord Service / Discord Module updated
        ↓
User Profile Discord card reflects
        ↓
Members Table health reflects
        ↓
Dashboard queue reflects (if operationally relevant)
```

Membership access state is **not** redefined by Discord leave alone unless product rules explicitly revoke access — Discord owns connection/role sync; Membership owns VIP/access lifecycle.

### 6.5 Manual / promotional grant

```text
Admin Manual Activation / Gift / Coupon / Staff / Founder
        ↓
Operational workflow (not “edit Membership page”)
        ↓
Membership Domain updated
        ↓
Discord Sync Requested (if access requires role)
        ↓
Profile / Members / Dashboard reflect
```

---

## 7. Write vs Read Surfaces

### 7.1 Where writes happen

| Action | Admin surface | Domain written |
|--------|---------------|----------------|
| Approve / reject payment | Subscriptions | Subscription → **then** Membership (**Approve only**) |
| Sync Discord / invite | Discord | Discord |
| Approve referral redeem | Referrals | Referral → then Membership |
| Manual VIP grant | Defined ops flow (Subscriptions or dedicated action — **not** Profile) | Membership |
| Add internal note | User Profile | Notes |

### 7.2 Where reads happen

| Surface | Role |
|---------|------|
| User Profile | Control Center — full member reflection |
| Members Table | Directory + health |
| Dashboard | Attention inbox |
| Module detail panels | Deep operational context for one domain |

### 7.3 Profile Manage links

| Card | Manage target |
|------|----------------|
| Subscription | `/admin/subscriptions?member=…` (or equivalent) |
| Discord | `/admin/discord?member=…` |
| Referral | `/admin/referrals?member=…` |
| Membership Activity | Primary deep-link: Subscriptions for payment-driven lifecycle; Referral module when extension originated from redeem |

---

## 8. Development Standard

Before implementing any new Admin module or domain field, answer:

1. **Who owns this data?**
2. **Where can this data be modified?**
3. **Where should this data be reflected (read-only)?**
4. **Should User Profile display it, or is it operational-only?**

### Membership writer rule

Any new way to grant VIP / access (coupon, giveaway, partner seats, lifetime, enterprise, etc.) **must write the Membership domain**.

It must **not**:

- Fork a second VIP flag inside Subscription
- Fork access state inside Discord
- Fork access state inside Referral
- Invent Profile-local editable VIP fields

Stable pattern:

```text
Any Grant Event
        ↓
Membership Domain
        ↓
Discord Sync (if needed)
        ↓
Profile / Members / Dashboard reflect
```

This same ownership philosophy aligns with Discord synchronization: **TraderCity is the source of truth; Discord is only a synchronized reflection.**

---

## 9. Relationship to Existing Docs

| Topic | Authority |
|-------|-----------|
| Cross-module ownership & sync matrix | **This document** |
| Admin UI philosophy (Control Center, Manage →) | `docs/AI/Agents/Admin/07_Vision_Before_Implementation.md` |
| Admin module UI contracts | `docs/AI/Agents/Admin/03_Module_Specifications.md` |
| Folder / application isolation | `docs/AI/Agents/Admin/06_Application_Isolation_and_Folder_Architecture.md` |
| Referral ledger & economics | `docs/04_Product_Architecture/REFERRAL_SYSTEM_ARCHITECTURE.md` |
| Pricing / payment verification | `docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md` |
| Product domain map | `docs/00_Project_Governance/PROJECT_ARCHITECTURE.md` |
| Code-path module ownership | `docs/00_Project_Governance/MODULE_OWNERSHIP.md` |

Admin chapters remain authoritative for **UI and ops workflows**. This document is authoritative for **data relationship and ownership**. Where older Admin text said “Membership lifecycle owned by Subscriptions,” treat that as superseded: **Subscriptions own payments; Membership owns lifecycle state; Subscriptions (and others) write Membership.**

---

## 10. Non-Goals

This document does **not**:

- Invent a final Prisma schema (backend may refine naming)
- Add a Membership Admin page or sidebar item
- Redesign Admin UI
- Replace Referral or Subscription deep product specs
- Change Marketing ↔ Admin isolation rules
- Authorize product feature code while Engineering Freeze / Platform v2 constraints apply

---

## 11. Why This Architecture Matters

The biggest failure mode in admin systems is the same field living in five places:

```text
Payment Status → Dashboard → Members → Subscription → Profile → Analytics
```

Five copies. Eventually inconsistent.

This architecture avoids that:

```text
Subscription Module
        ↓
Owns Payment
        ↓
Everyone else reads it
```

And for access:

```text
Membership Domain
        ↓
Owns VIP / plan / expiry
        ↓
Everyone else reads it
```

**One owner. Many readers.**

That is the contract the backend should implement before multi-module production state goes live.
