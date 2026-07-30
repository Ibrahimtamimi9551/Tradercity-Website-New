# TraderCity — Referral System Architecture

**Document Version:** 1.0  
**Status:** Official Product + Backend + Frontend + Business Logic Specification  
**Milestone Alignment:** `v1.1.0-admin-referrals` (UI shell complete; NestJS hooks pending)  
**Audience:** Backend engineers, frontend engineers, product owners, AI agents  
**Authority:** Product Architecture Layer (`docs/04_Product_Architecture/`)

---

## Document Role

This is the **canonical Referral System specification** for TraderCity.

| This document owns | Related docs (do not replace this) |
|--------------------|------------------------------------|
| Referral product vision & lifecycle | `docs/AI/Agents/Admin/*` (Admin UI vision) |
| Business rules & reward model | `docs/00_Project_Governance/PROJECT_ARCHITECTURE.md` (domains) |
| Suggested data model & APIs | Admin Module Specs Phase 6 |
| Intelligence formulas | Frontend Referral Intelligence UI |
| Event / job / security contracts | Subscription Pricing Architecture (membership coupling) |

**Rule:** Frontend UI may ship on mocks. Backend must implement this contract before production referral economics go live. Suggested Prisma field names and NestJS module shapes are **implementation recommendations** — backend may refine naming/partitioning while preserving the **behavioral contract**.

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Referral Lifecycle](#2-referral-lifecycle)
3. [Referral Data Model](#3-referral-data-model)
4. [Business Rules](#4-business-rules)
5. [Referral Intelligence](#5-referral-intelligence)
6. [Admin Dashboard](#6-admin-dashboard)
7. [User Dashboard](#7-user-dashboard)
8. [Timeline System](#8-timeline-system)
9. [API Architecture](#9-api-architecture)
10. [Background Jobs](#10-background-jobs)
11. [Event-Driven Architecture](#11-event-driven-architecture)
12. [Security](#12-security)
13. [Future Roadmap](#13-future-roadmap)
14. [Engineering Notes](#14-engineering-notes)

---

## 1. Purpose

### 1.1 Why the Referral System Exists

TraderCity grows through **trusted community invitation**, not only paid acquisition.

The Referral System exists to:

1. Convert existing members into growth channels.
2. Attribute new memberships to the members who introduced them.
3. Reward successful introductions with **credits** that reduce future membership cost.
4. Give Admin operators visibility into program health, abuse risk, and revenue impact.
5. Give members a clear, gamified progress loop toward free / discounted VIP periods.

### 1.2 Contribution to Community Growth

```text
Active VIP Member
        │
        ▼
Shares Referral Link
        │
        ▼
New User Registers
        │
        ▼
New User Activates Membership
        │
        ▼
Referrer Earns Credit
        │
        ▼
Referrer Renews / Upgrades with Credit
        │
        ▼
Stronger Retention + Stronger Community Density
```

Referrals create a **virtuous loop**: members who benefit from TraderCity invite peers who are more likely to convert and stay, because the invitation came from a trusted source.

### 1.3 Why Credits Instead of “Invite Counts”

Simply counting invited users is insufficient.

| Approach | Problem |
|----------|---------|
| Count registrations only | Encourages spam / fake signups |
| Count “invites sent” | No business value |
| Count Discord joins only | Not equal to paid membership |
| **Issue credits on verified VIP activation** | Aligns reward with real revenue |

**Referral Credits** exist because:

- They convert successful growth into **membership economic value**.
- They are redeemable against TraderCity membership pricing (via the Pricing / Quote stack).
- They create retention incentive (credits unused = unused benefit).
- They are auditable, reversible, and finance-friendly.

Credits are **not cash**. They are platform-issued membership purchasing power.

### 1.4 Connection to Memberships

Referral rewards are **gated by membership activation**, not registration alone.

**Approved reward model (current):**

| Referee Membership Purchased | Referrer Credit Issued |
|------------------------------|------------------------|
| Monthly VIP | **$10** |
| Quarterly VIP | **$30** |
| Yearly VIP | **$60** |

These amounts must be **backend-configurable business rules** (not permanently hardcoded UI constants). UI may display configured values.

**Qualification rule (current product intent):**

```text
Referral Link Used
        ↓
Referee Registers Successfully
        ↓
Referee Completes Membership Purchase
        ↓
Payment Verified + Membership Activated
        ↓
Referral marked Successful
        ↓
Referral Credit Issued to Referrer Wallet
```

**Member milestone (display / unlock):** historically communicated as “complete N successful referrals toward next month free” (commonly **6** successful referrals). Milestone target and unlock benefit must also be configurable.

### 1.5 Product Surfaces

```text
Referral Domain
├── Member Experience (Free + VIP dashboards)
│     └── Referral Centre (progress, link, credits, leaderboard snippet)
├── Admin Platform
│     ├── Referral Operations Dashboard   (manage)
│     └── Referral Intelligence Dashboard (analyze)
└── Backend Services
      ├── Attribution
      ├── Qualification
      ├── Wallet / Credits
      ├── Intelligence aggregates
      └── Fraud / Audit
```

**Hard separation:**

| Operations | Intelligence |
|------------|--------------|
| Manage referrals & wallets | Analyze program economics |
| CRUD / validation / timeline | Trends, funnel, leaderboard BI |
| Daily administration | Executive decision-making |
| May show operational pending queues | Must **not** become another CRUD table |

---

## 2. Referral Lifecycle

### 2.1 End-to-End Flow

```text
┌─────────────────────────────────────────────────────────────────┐
│ 1. GENERATE REFERRAL IDENTITY                                   │
│    Member receives unique referralCode + referralLink           │
└───────────────────────────────┬─────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 2. SHARE / OPEN LINK                                            │
│    Candidate opens https://tradercity.com/ref/{code}            │
│    Attribution cookie / token stored (TTL)                      │
└───────────────────────────────┬─────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 3. USER REGISTRATION                                            │
│    Candidate creates account                                    │
│    Referral attribution attached to user record                 │
└───────────────────────────────┬─────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 4. REFERRAL VALIDATION                                          │
│    Anti-self, anti-duplicate, eligibility checks                │
└───────────────────────────────┬─────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 5. REFERRAL CREATED                                             │
│    Referral entity status = REGISTERED                          │
│    Timeline: Registration Complete                              │
└───────────────────────────────┬─────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 6. QUALIFICATION (MEMBERSHIP IN PROGRESS)                       │
│    Plan selected / payment quote / awaiting verification        │
│    Status = MEMBERSHIP_IN_PROGRESS                              │
└───────────────────────────────┬─────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 7. SUCCESSFUL MEMBERSHIP                                        │
│    Payment verified + membership active                         │
│    Status = SUCCESSFUL                                          │
└───────────────────────────────┬─────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 8. REWARD                                                       │
│    Credit issued to referrer wallet                             │
│    Status reward = ISSUED                                       │
└───────────────────────────────┬─────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 9. MEMBERSHIP UNLOCK / REDEMPTION (OPTIONAL)                    │
│    Credits applied to quote / milestone unlock                  │
│    Wallet balance decreases; redemption recorded                │
└───────────────────────────────┬─────────────────────────────────┘
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│ 10. HISTORY                                                     │
│     Immutable timeline + ledger entries retained for audit      │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 Lifecycle Stage Definitions (Intelligence Contract)

| Stage | Definition |
|-------|------------|
| **Registered Referrals** | User successfully registered through a referral link |
| **Membership In Progress** | User selected a plan or reached Membership Activation / Payment stage but is not yet an active member |
| **Successful Memberships** | Membership payment **Admin-approved**, membership activated, referral reward issued |

**Deprecated concept for Intelligence KPIs:** “Pending Referral” as a vague bucket. Use the stages above.

Operations may still track operational queues (e.g. redemption requests requiring admin action) separately from Intelligence lifecycle stages.

### 2.3 Status Machine (Referral Entity)

```text
                    ┌──────────────┐
                    │   CREATED    │  (attribution captured pre-registration)
                    └──────┬───────┘
                           ▼
                    ┌──────────────┐
         ┌─────────│ REGISTERED   │─────────┐
         │         └──────┬───────┘         │
         │                ▼                 │
         │         ┌──────────────┐         │
         │         │ IN_PROGRESS  │         │
         │         └──────┬───────┘         │
         │                ▼                 │
         │         ┌──────────────┐         │
         │         │ SUCCESSFUL   │─────────┼──► REWARD_ISSUED
         │         └──────────────┘         │
         │                                  │
         ▼                                  ▼
  ┌──────────────┐                   ┌──────────────┐
  │  REJECTED    │                   │  REVOKED     │
  │ (fraud/rules)│                   │ (chargeback, │
  └──────────────┘                   │  refund, etc)│
                                     └──────────────┘
```

| Status | Meaning | Credit effect |
|--------|---------|---------------|
| `CREATED` | Click / attribution stored | None |
| `REGISTERED` | Referee account exists | None |
| `IN_PROGRESS` | Membership purchase path started | None |
| `SUCCESSFUL` | Membership active & verified | Credit issued (or queued) |
| `REJECTED` | Failed validation / fraud | None |
| `REVOKED` | Success reversed after fact | Credit reversed / clawed back |

### 2.4 Actor Diagram

```text
Referee (new member)          Referrer (existing member)         Platform
        │                              │                            │
        │── uses link ─────────────────│                            │
        │── registers ─────────────────────────────────────────────►│
        │                              │◄── Referral attributed ────│
        │── purchases VIP ─────────────────────────────────────────►│
        │                              │◄── Credit issued ──────────│
        │                              │── redeems credit ─────────►│
```

---

## 3. Referral Data Model

> Suggested Prisma-oriented models. Backend may split tables or rename; **semantic fields and relationships are required**.

### 3.1 Entity Map

```text
User
 ├── ReferralProfile (1:1)          // code, link, stats snapshot
 ├── ReferralWallet (1:1)           // credit balances
 ├── ReferralsAsReferrer (1:N)      // Referral where referrerId = user
 └── ReferralAsReferee (0:1)       // Referral where refereeId = user

Referral
 ├── ReferralReward (0:1 or 1:N)
 ├── ReferralTimelineEvent (1:N)
 └── Campaign attribution (0:1)

ReferralCreditLedger (N)           // immutable wallet movements
ReferralCampaign (N)
ReferralStatisticSnapshot (N)      // daily/hourly aggregates
UserReferralSummary (materialized or view)
```

---

### 3.2 `ReferralProfile`

**Purpose:** Per-user referral identity and public share artifacts.

**Relationships:** `User` 1:1

| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID PK | |
| `userId` | UUID FK unique | |
| `referralCode` | String unique | Case-normalized |
| `referralSlug` | String? unique | Optional vanity |
| `isActive` | Boolean | Soft disable without deleting history |
| `createdAt` | DateTime | |
| `updatedAt` | DateTime | |

**Indexes:** `userId` unique, `referralCode` unique, `referralSlug` unique (where not null)

**Lifecycle:** Created on first referral feature access or at user registration. Rarely deleted; deactivate instead.

---

### 3.3 `Referral`

**Purpose:** One attributed relationship: referrer → referee.

**Relationships:** Referrer `User`, Referee `User`, optional `ReferralCampaign`

| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID PK | |
| `referrerId` | UUID FK | |
| `refereeId` | UUID FK unique | One primary referral parent per referee |
| `campaignId` | UUID FK? | Future |
| `status` | Enum | See lifecycle |
| `attributionSource` | Enum | `LINK`, `CODE`, `MANUAL_ADMIN` |
| `attributedAt` | DateTime | Click/store time |
| `registeredAt` | DateTime? | |
| `membershipInProgressAt` | DateTime? | |
| `successfulAt` | DateTime? | |
| `rejectedAt` | DateTime? | |
| `revokedAt` | DateTime? | |
| `rejectionReason` | String? | |
| `revokeReason` | String? | |
| `refereePlanAtSuccess` | Enum? | `MONTHLY` / `QUARTERLY` / `YEARLY` |
| `businessRevenueUsd` | Decimal? | Snapshot of attributed membership revenue |
| `deviceFingerprintHash` | String? | Privacy-preserving hash |
| `ipHash` | String? | |
| `createdAt` | DateTime | |
| `updatedAt` | DateTime | |

**Indexes:**

- `(referrerId, status, successfulAt)`
- `(status, createdAt)`
- `refereeId` unique
- `(campaignId, status)`

**Lifecycle:** Created at registration (or earlier as `CREATED` if pre-registration capture is used). Transitions only via domain service, never raw client writes.

---

### 3.4 `ReferralReward`

**Purpose:** Record of reward decision for a successful referral.

| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID PK | |
| `referralId` | UUID FK unique | |
| `referrerId` | UUID FK | Denormalized for queries |
| `amountUsd` | Decimal | Configured rule result |
| `ruleKey` | String | e.g. `vip_monthly_v1` |
| `status` | Enum | `PENDING`, `ISSUED`, `REVERSED`, `FAILED` |
| `issuedAt` | DateTime? | |
| `reversedAt` | DateTime? | |
| `ledgerEntryId` | UUID FK? | Credit ledger link |
| `createdAt` | DateTime | |

**Indexes:** `(referrerId, status)`, `referralId` unique

---

### 3.5 `ReferralWallet`

**Purpose:** Current credit balances for a member (wallet economics).

| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID PK | |
| `userId` | UUID FK unique | |
| `availableUsd` | Decimal | Spendable |
| `pendingUsd` | Decimal | Reserved / awaiting approval |
| `lifetimeIssuedUsd` | Decimal | |
| `lifetimeRedeemedUsd` | Decimal | |
| `updatedAt` | DateTime | |

**Rule:** Balances must be recomputable from `ReferralCreditLedger`. Wallet table is a cache/projection.

---

### 3.6 `ReferralCredit` / `ReferralCreditLedger`

**Purpose:** Immutable ledger of credit movements (source of truth).

| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID PK | |
| `walletId` | UUID FK | |
| `userId` | UUID FK | |
| `type` | Enum | `ISSUE`, `REDEEM`, `REVERSE`, `ADJUST_ADMIN`, `EXPIRE` |
| `amountUsd` | Decimal | Signed or absolute + direction |
| `direction` | Enum | `CREDIT`, `DEBIT` |
| `referralId` | UUID FK? | |
| `rewardId` | UUID FK? | |
| `membershipQuoteId` | UUID FK? | When redeemed into pricing quote |
| `idempotencyKey` | String unique | Prevent double-issue |
| `meta` | Json? | |
| `createdAt` | DateTime | |
| `createdBy` | Enum/UUID | `SYSTEM` / admin user |

**Indexes:** `(userId, createdAt)`, `idempotencyKey` unique, `(type, createdAt)`

---

### 3.7 `ReferralCampaign` (Future-ready)

**Purpose:** Named campaigns / bonus periods (not required for v1 launch).

| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID PK | |
| `code` | String unique | |
| `name` | String | |
| `startsAt` | DateTime | |
| `endsAt` | DateTime? | |
| `rewardOverrides` | Json? | Optional rule overrides |
| `isActive` | Boolean | |
| `createdAt` | DateTime | |

---

### 3.8 `ReferralStatisticSnapshot`

**Purpose:** Pre-aggregated intelligence for dashboards.

| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID PK | |
| `periodType` | Enum | `HOUR`, `DAY`, `WEEK`, `MONTH`, `QUARTER`, `YEAR` |
| `periodStart` | DateTime | |
| `metrics` | Json | Typed payload (revenue, growth, credits, etc.) |
| `createdAt` | DateTime | |

**Indexes:** unique `(periodType, periodStart)`

---

### 3.9 `ReferralTimelineEvent`

**Purpose:** Unified timeline (Discord-style) for referral journeys.

| Field | Type | Notes |
|-------|------|-------|
| `id` | UUID PK | |
| `referralId` | UUID FK? | Null for profile-level events |
| `userId` | UUID FK | Subject (referrer or referee context) |
| `actorUserId` | UUID FK? | Who caused it (admin/system) |
| `eventType` | Enum | See Timeline section |
| `title` | String | |
| `description` | String? | |
| `status` | Enum | `COMPLETE`, `CURRENT`, `PENDING`, `ERROR` |
| `payload` | Json? | |
| `occurredAt` | DateTime | |
| `createdAt` | DateTime | |

**Indexes:** `(referralId, occurredAt)`, `(userId, occurredAt)`, `(eventType, occurredAt)`

---

### 3.10 `UserReferralSummary`

**Purpose:** Fast admin / member projections (materialized).

| Field | Type | Notes |
|-------|------|-------|
| `userId` | UUID PK/FK | |
| `successfulCount` | Int | |
| `registeredCount` | Int | |
| `inProgressCount` | Int | |
| `conversionRate` | Decimal | |
| `availableCreditUsd` | Decimal | |
| `lifetimeEarnedUsd` | Decimal | |
| `lifetimeRedeemedUsd` | Decimal | |
| `businessRevenueGeneratedUsd` | Decimal | Admin-only metric source |
| `leaderboardRank` | Int? | |
| `progressTarget` | Int | Config e.g. 6 |
| `lastReferralAt` | DateTime? | |
| `updatedAt` | DateTime | |

---

## 4. Business Rules

### 4.1 Core Attribution Rules

| ID | Rule |
|----|------|
| BR-01 | A user **cannot refer themselves** (same `userId`, same email, same verified identity). |
| BR-02 | A referee may have **at most one** primary referrer. |
| BR-03 | Attribution is captured from referral code/link at registration (or first authenticated action if deferred capture is enabled). |
| BR-04 | Changing referral attribution after `SUCCESSFUL` requires Super Admin + audit reason (normally forbidden). |
| BR-05 | Reward amounts come from **config**, keyed by referee plan at success time. |

### 4.2 Qualification Rules

| ID | Rule |
|----|------|
| BR-10 | Registration alone does **not** issue credits. |
| BR-11 | Credits issue only after membership payment is **verified** and membership is **activated**. |
| BR-12 | If payment fails / expires / is disputed before activation → no reward. |
| BR-13 | Plan at success determines reward amount (Monthly/Quarterly/Yearly). |
| BR-14 | Free membership does **not** qualify for reward. |

### 4.3 Duplicate & Fraud Heuristics

| ID | Rule |
|----|------|
| BR-20 | Duplicate **device fingerprint** between referrer and referee → flag / hold / reject (policy configurable: hard reject vs review queue). |
| BR-21 | Duplicate **payment wallet** between referrer and referee → reject reward. |
| BR-22 | Same IP hash burst patterns → rate-limit / review. |
| BR-23 | Rapid register→pay loops from shared identifiers → fraud score increase. |
| BR-24 | Admin may manually reject/revoke with mandatory reason. |

Exact thresholds belong in fraud config; this document defines **required capability**.

### 4.4 Account State Handling

| Scenario | Behavior |
|----------|----------|
| Referee account deleted before success | Referral → `REJECTED` or closed; no credit |
| Referee suspended before success | Hold qualification until restored or reject |
| Referrer suspended | Pause payouts; existing unused credits may be frozen |
| Referrer deleted | Wallet closed; outstanding credits forfeited (policy) + audit |
| Membership refund / chargeback after success | Referral → `REVOKED`; credit reversed if unspent; if spent, create clawback debt / admin case |

### 4.5 Credit / Wallet Rules

| ID | Rule |
|----|------|
| BR-30 | Credits are membership purchasing power only (not withdrawable cash). |
| BR-31 | Ledger is append-only; corrections use compensating entries. |
| BR-32 | Redemption applies through Pricing Quote adjustments (`referral` adjustment type — reserved in pricing architecture). |
| BR-33 | Cannot redeem more than available balance. |
| BR-34 | Credit expiration is **future optional**; if enabled, expire via job + ledger `EXPIRE`. |
| BR-35 | Admin adjustments require permission + audit log. |

### 4.6 Milestone / Unlock Rules

| ID | Rule |
|----|------|
| BR-40 | Progress target (e.g. 6 successful referrals) is configurable. |
| BR-41 | Milestone unlock benefit (e.g. next month free) is configurable and may route through credits or subscription extension. |
| BR-42 | Member UI may show progress; Admin Intelligence may show concentration / dependency metrics. |

### 4.7 Campaign Rules (Future)

| ID | Rule |
|----|------|
| BR-50 | Active campaign may override reward table within start/end window. |
| BR-51 | Campaign attribution stored on `Referral.campaignId`. |
| BR-52 | No UTM / “how did you hear” survey required for core referral model. |

### 4.8 Geographic / Source Analytics

| Topic | Status |
|-------|--------|
| Geographic analytics | **Out of scope** — do not collect location solely for referrals |
| Referral source / UTM campaigns | **Future marketing phase** — not core referral v1 |

---

## 5. Referral Intelligence

Intelligence answers:

> How healthy is TraderCity’s referral program?  
> How much revenue does it generate?  
> Who drives growth?  
> Where do users drop off?  
> How can TraderCity improve referral-driven growth?

### 5.1 Surfaces

| Surface | Audience | Contains business revenue? |
|---------|----------|----------------------------|
| Admin Referral Intelligence | Admin / future Super Admin | **Yes** |
| Member leaderboard snippet | Member | **No** |

### 5.2 Funnel Metrics

```text
Referral Link Opens
        ↓
Registration
        ↓
Membership In Progress
        ↓
Membership Activated
        ↓
Referral Credit Issued
        ↓
Referral Credit Redeemed
```

**Drop-off % (stage n):**

\[
\text{DropOff}_n = \frac{\text{Count}_{n-1} - \text{Count}_n}{\text{Count}_{n-1}} \times 100
\]

### 5.3 Conversion Metrics

| Metric | Formula |
|--------|---------|
| **Conversion Rate** | `SuccessfulMemberships / RegisteredReferrals × 100` |
| **Activation Rate** | `SuccessfulMemberships / MembershipInProgress × 100` (optional companion) |
| **Redemption Rate** | `CreditsRedeemed / CreditsIssued × 100` |
| **Avg Revenue / Referrer** | `TotalReferralRevenue / ActiveReferrers` |
| **Avg Referral Value** | `TotalReferralRevenue / SuccessfulMemberships` |
| **Avg Time to Convert** | Mean(`successfulAt - registeredAt`) for successful referrals |
| **VIP Conversion Rate** | Successful VIP referred / Registered referred × 100 |
| **Growth Velocity** | Δ successful referrals (or revenue) over period / period length |

### 5.4 Wallet Intelligence (Wallet Journey)

Treat credits as a lifecycle:

```text
Credits Issued
      ↓
Credits Redeemed
      ↓
Unused Referral Credits
```

Supporting:

- Average wallet balance
- Highest wallet balance
- Redemption rate

### 5.5 Leaderboard / Performance

Unified Admin **Referral Performance Leaderboard** dimensions:

| Dimension | Meaning |
|-----------|---------|
| Successful Memberships | Volume |
| Revenue Generated | Business impact (admin-only) |
| Credits Earned | Reward volume |
| Conversion Rate | Efficiency |
| Revenue Share | `ReferrerRevenue / TotalReferralRevenue × 100` |

Executive highlights (winners per dimension):

- Highest Revenue Contributor
- Highest Conversion
- Most Memberships
- Highest Credits Earned

Default sort: Revenue Generated DESC (admin).

### 5.6 Referral Health Score (Recommended)

Composite 0–100 score for program monitoring:

| Component | Weight (suggested) | Input |
|-----------|--------------------|-------|
| Conversion health | 30% | Conversion rate vs target |
| Revenue growth | 25% | MoM referral revenue trend |
| Fraud pressure | 20% | Inverse of flagged rate |
| Redemption balance | 15% | Redemption rate in healthy band |
| Concentration risk | 10% | Inverse of top-referrer revenue share |

Exact weights are configurable. Admin sees score + drivers, not a black box.

### 5.7 Fake / Inactive Detection Signals

| Signal | Example |
|--------|---------|
| Fake referral | Shared device/wallet, burst signups, never activates |
| Inactive referral | Registered, no membership progress beyond TTL |
| High-value referrer | Top revenue / conversion quartile |
| Stalled milestone | Members at N-1 of progress target |

### 5.8 Admin Usage Guidance

| Question | Use |
|----------|-----|
| Is the program making money? | Revenue Overview + Trends |
| Which plan benefits most? | Membership Revenue cards |
| Where do users drop? | Referral Journey funnel |
| Are credits stuck? | Wallet Journey |
| Who should we celebrate / study? | Performance Leaderboard |
| What should we do next? | Business Insights |

---

## 6. Admin Dashboard

### 6.1 Module Placement

```text
Admin → Referrals
          ├── Operations Dashboard   /admin/referrals
          └── Referral Intelligence  /admin/referrals/intelligence
```

Primary sidebar remains a single **Referrals** entry; in-module nav switches Operations ↔ Intelligence.

### 6.2 Referral Operations Dashboard

**Question:** *What referral progress exists — and what needs validation?*

| Area | Responsibility |
|------|----------------|
| Header | Title, last sync, refresh |
| KPI widgets | Successful, operational queues, available credits, redeemed, revenue summary link |
| Filters / search | Username, plan, progress, credit, pending |
| Table | Directory of referrers / progress |
| Detail panel (desktop) | Full member referral context |
| Detail page (mobile) | `/admin/referrals/[id]` |

**Does not own:** deep analytics charts, executive storytelling modules.

### 6.3 Referral Intelligence Dashboard

**Question:** *How much business is the referral program generating, who drives it, and how healthy is it?*

Canonical section order:

```text
Revenue Overview
        ↓
Membership Revenue
        ↓
Referral Journey (Lifecycle Summary + Funnel)
        ↓
Revenue Trends
        ↓
Wallet Journey
        ↓
Referral Performance Leaderboard
        ↓
Business Insights
```

### 6.4 Page Inventory (Current + Planned)

| Page / Area | Status | Notes |
|-------------|--------|-------|
| Operations list + detail | **Shipped (UI)** | Mock-backed |
| Intelligence dashboard | **Shipped (UI)** | Mock-backed |
| Referral Overview widgets | Shipped as Operations KPIs | |
| Referral Analytics | Intelligence | |
| Referral Timeline | In Operations detail | Align to §8 |
| Referral Queue | Ops filters / future dedicated queue | Redemptions, fraud holds |
| Referral Search | Ops search | |
| Referral Detail | Ops panel/page | |
| Referral Activity | Detail activity feed | |
| Leaderboard | Intelligence unified table | |
| Campaigns | **Future** | |
| Wallet admin tools | Partial via Ops; deeper tools future | |

### 6.5 Access (Current vs Future)

**Current:** Follow existing Admin auth; no separate portal / password.

**Future RBAC (approved conceptually — do not implement until dedicated session):**

| Role | Access |
|------|--------|
| Admin | Referral Operations |
| Super Admin | Operations + Intelligence + other executive dashboards |

Backend must enforce authorization even if UI hides routes.

---

## 7. User Dashboard

### 7.1 Member Referral Centre (Free + VIP)

Members see **personal progress**, not platform business analytics.

**Allowed:**

- Available Referral Credits
- Lifetime Credits Earned
- Successful Referrals
- Leaderboard Rank
- Next Milestone / Progress
- Referral link / share controls
- Rules summary

**Forbidden on member UI:**

- Platform revenue
- Revenue attribution / share
- Business generated totals
- Admin fraud scores

### 7.2 Components

| Component | Purpose |
|-----------|---------|
| Referral Card / Centre | Link, rules, progress rings/slots |
| Progress | `current / target` + milestone label |
| Credits | Available + lifetime earned |
| Timeline (optional member) | Personal referral events only |
| Rewards | Credit grants |
| Membership Progress | How referrals relate to unlock |
| Unlocked Benefits | Milestone outcomes |
| Referral History | Past successful referrals (privacy-safe) |
| Upcoming Rewards | Next milestone preview |
| Future Campaigns | Promo banners when campaigns exist |

---

## 8. Timeline System

### 8.1 Design Principle

Mirror Discord / Subscription timeline patterns: **one vertical stepped log**, status-colored, newest-relevant ordering, shared Admin `Timeline` primitive.

### 8.2 Event Types

| Event Type | Typical Status | Description |
|------------|----------------|-------------|
| `LINK_GENERATED` | COMPLETE | Referral identity created |
| `LINK_OPENED` | COMPLETE | Candidate opened link |
| `REGISTRATION` | COMPLETE | Referee registered |
| `VALIDATION_PASSED` | COMPLETE | Anti-fraud checks passed |
| `VALIDATION_FAILED` | ERROR | Rejected |
| `MEMBERSHIP_IN_PROGRESS` | CURRENT/COMPLETE | Plan/payment stage |
| `MEMBERSHIP_ACTIVATED` | COMPLETE | VIP active |
| `REWARD_GRANTED` | COMPLETE | Credit issued |
| `REWARD_REVERSED` | ERROR | Clawback |
| `CREDIT_REDEEMED` | COMPLETE | Applied to membership |
| `MILESTONE_REACHED` | COMPLETE | Progress target hit |
| `ADMIN_NOTE` | COMPLETE | Manual annotation |

### 8.3 Status → Visual Language

| Status | Meaning | Color guidance (Admin system) |
|--------|---------|-------------------------------|
| `COMPLETE` | Done | Emerald / success |
| `CURRENT` | In flight | Violet / info |
| `PENDING` | Waiting | Amber |
| `ERROR` | Failed / reversed | Rose |

### 8.4 Sorting

- Default: `occurredAt DESC` for activity feeds
- Journey view: chronological ASC for storytelling
- Always stable-sort by `id` when timestamps equal

### 8.5 Write Rules

- Domain services emit timeline events transactionally with state changes
- Clients never invent timeline events
- Reversals append new events; do not rewrite history

---

## 9. API Architecture

> REST sketch for NestJS (or equivalent). Paths are recommendations under `/api/v1`.

### 9.1 Member APIs

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/me/referral/profile` | Code, link, summary |
| `GET` | `/me/referral/wallet` | Balances |
| `GET` | `/me/referral/history` | Personal referrals |
| `GET` | `/me/referral/timeline` | Personal timeline |
| `GET` | `/me/referral/leaderboard-snippet` | Rank + safe metrics |
| `POST` | `/me/referral/link/regenerate` | Optional controlled regen |

### 9.2 Admin Operations APIs

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/admin/referrals` | Paginated directory |
| `GET` | `/admin/referrals/:id` | Detail + timeline |
| `GET` | `/admin/referrals/stats` | Ops KPIs |
| `POST` | `/admin/referrals/:id/reject` | Reject |
| `POST` | `/admin/referrals/:id/revoke` | Revoke success |
| `POST` | `/admin/referrals/wallet/:userId/adjust` | Admin credit adjust |
| `GET` | `/admin/referrals/queue` | Holds / redemptions needing action |

### 9.3 Admin Intelligence APIs

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/admin/referral-intelligence/overview` | Revenue + lifecycle KPIs |
| `GET` | `/admin/referral-intelligence/trends` | `?period=7d\|30d\|quarter\|year` |
| `GET` | `/admin/referral-intelligence/membership-revenue` | Plan breakdown |
| `GET` | `/admin/referral-intelligence/funnel` | Journey funnel |
| `GET` | `/admin/referral-intelligence/wallet` | Wallet journey metrics |
| `GET` | `/admin/referral-intelligence/leaderboard` | Sortable contributors |
| `GET` | `/admin/referral-intelligence/insights` | Generated insights |

### 9.4 Controllers / Services (Suggested Nest Modules)

```text
referral/
  referral.module.ts
  controllers/
    member-referral.controller.ts
    admin-referral-ops.controller.ts
    admin-referral-intelligence.controller.ts
  services/
    referral-attribution.service.ts
    referral-qualification.service.ts
    referral-reward.service.ts
    referral-wallet.service.ts
    referral-timeline.service.ts
    referral-intelligence.service.ts
    referral-fraud.service.ts
  dto/
  listeners/
  jobs/
```

### 9.5 DTO / Validation Principles

- Zod/class-validator on all inputs
- Money as decimal strings or integer cents (pick one platform-wide; prefer **integer cents** for ledger)
- Idempotency keys on issue/redeem/adjust
- Pagination: `page`, `pageSize` (10/25/50)
- Filtering: status, plan, date range, credit presence, search `q`
- Sorting: allowlist only

### 9.6 Permissions

| Endpoint class | Permission |
|----------------|------------|
| Member `/me/*` | Authenticated self |
| Admin Ops | `admin.referrals.ops` |
| Admin Intelligence | `admin.referrals.intelligence` (future Super Admin) |
| Wallet adjust / revoke | Elevated admin permission + audit |

---

## 10. Background Jobs

Suggested queue: **BullMQ** (Redis).

| Job | Schedule / Trigger | Responsibility |
|-----|--------------------|----------------|
| `referral.qualify-from-membership` | Event-driven | Move to SUCCESSFUL + issue reward |
| `referral.rebuild-user-summary` | On change + nightly | Refresh `UserReferralSummary` |
| `referral.refresh-leaderboard` | Hourly / on demand | Ranks |
| `referral.rebuild-statistic-snapshots` | Hourly/daily | Intelligence series |
| `referral.fraud-scan` | Hourly | Score + queue inserts |
| `referral.expire-credits` | Daily (if enabled) | Expire unused credits |
| `referral.insights-generate` | Daily | Business insight texts |
| `referral.clawback-on-refund` | Event-driven | Reverse rewards |

**Job rules:**

- Idempotent
- Retries with backoff
- Dead-letter + admin visibility for poison messages

---

## 11. Event-Driven Architecture

### 11.1 Events Consumed by Referral Domain

| Event | Effect |
|-------|--------|
| `UserRegistered` | Create/attach Referral as REGISTERED |
| `MembershipCheckoutStarted` | IN_PROGRESS |
| `MembershipActivated` | Qualify + reward |
| `MembershipExpired` | No direct credit change (unless policy) |
| `MembershipRefunded` / `PaymentChargeback` | Revoke + clawback |
| `WalletConnected` | Fraud correlation signal |
| `DiscordJoined` | Optional enrichment only (not qualification) |
| `UserSuspended` / `UserDeleted` | Freeze / close referral effects |

### 11.2 Events Emitted by Referral Domain

| Event | Consumers |
|-------|-----------|
| `ReferralCreated` | Analytics, timeline |
| `ReferralStatusChanged` | Summaries, admin ops |
| `ReferralRewardGranted` | Wallet, notifications, timeline |
| `ReferralRewardReversed` | Wallet, admin alerts |
| `ReferralCreditRedeemed` | Pricing confirmation, timeline |
| `ReferralMilestoneReached` | Notifications, subscription unlock flow |
| `ReferralFraudFlagged` | Admin queue |

### 11.3 Integration with Pricing

Referral credits redeem as a **pricing adjustment** in the Payment Quote chain (reserved type: referral). Verification still compares quote expected vs received — credits change the quote, not the verification rule.

---

## 12. Security

### 12.1 Fraud Prevention

- Self-referral blocks
- Device / wallet / IP correlation
- Velocity limits on registration-via-referral
- Manual review queue for borderline scores
- Reward holds until clear

### 12.2 Rate Limiting

| Action | Suggested limit |
|--------|-----------------|
| Link open attribution write | Per-IP / per-device |
| Profile fetch | Standard auth rate limit |
| Admin adjust | Strict + MFA/session freshness (future) |

### 12.3 Duplicate Protection

- Unique `refereeId` on Referral
- Unique `idempotencyKey` on ledger
- Unique reward per referral

### 12.4 Audit Logs

Every admin reject/revoke/adjust must record:

- Actor
- Target
- Before/after
- Reason
- Timestamp

### 12.5 Data Privacy

- Prefer hashes for IP/device storage
- Do not collect geolocation solely for referrals
- Member APIs never expose other members’ revenue attribution

---

## 13. Future Roadmap

| Theme | Items |
|-------|-------|
| Campaigns | Time-boxed multipliers, campaign IDs, UTM later |
| Multi-level referrals | Explicitly **not** in v1; requires new economics design |
| Wallet depth | Partial redeem, expiration policies, statements |
| Coupons + credits stacking | Quote adjustment chain |
| Achievements | Badges for milestones |
| NFT / on-chain rewards | Optional later; keep off critical path |
| Partner / affiliate dashboard | Separate product surface |
| Predictive analytics | Churn/referral propensity |
| Geographic analytics | Only if natural billing-country data appears |
| RBAC | Super Admin intelligence lock |

---

## 14. Engineering Notes

### 14.1 Current Frontend Reality (as of `v1.1.0-admin-referrals`)

| Area | Path |
|------|------|
| Ops UI | `src/components/members/sections/referrals/*` |
| Intelligence UI | `src/components/members/sections/referrals/intelligence/*` |
| Routes | `/admin/referrals`, `/admin/referrals/intelligence`, `/admin/referrals/[id]` |
| Types | `src/types/members/referral.ts`, `referral-intelligence.ts` |
| Mocks | `src/lib/members/mock/referral-*.ts` |
| Member UI | `src/components/dashboard/*/… ReferralCentre` |

Frontend is **mock-backed**. Replace hooks with authenticated APIs without redesigning IA.

### 14.2 Suggested Backend Folder Structure

```text
apps/api/src/modules/referral/
  domain/
  application/
  infrastructure/
  presentation/
```

Or Nest flat module structure in §9.4 — choose one style and keep consistent with platform conventions.

### 14.3 Suggested Frontend Module Ownership (post Platform v2)

```text
src/admin/referrals/           # ops + intelligence UI
src/member/referral/           # member centre
src/shared/referral-types/     # carefully shared DTOs only
```

Until migration: keep Admin under `src/components/members/sections/referrals` and Member under `src/components/dashboard`.

### 14.4 Redis Usage

| Key pattern | Use |
|-------------|-----|
| `referral:attr:{token}` | Short-lived attribution |
| `referral:leaderboard` | Cached ranked list |
| `referral:intel:{period}` | Cached intelligence payloads |
| BullMQ queues | Jobs |

### 14.5 Caching Policy

- Intelligence endpoints: cache 1–5 minutes; invalidate on major ledger events
- Member profile: cache briefly; invalidate on reward/redeem
- Never cache admin fraud queues aggressively

### 14.6 Testing Requirements

| Layer | Must cover |
|-------|------------|
| Unit | Status transitions, reward math, clawback |
| Integration | MembershipActivated → credit issued exactly once |
| E2E Admin | Ops filters, intelligence period switch, leaderboard sort |
| E2E Member | Progress + credits without revenue leakage |
| Security | Self-referral, double-issue idempotency |

### 14.7 Configuration Keys (Suggested)

```text
referral.rewards.monthlyUsd = 10
referral.rewards.quarterlyUsd = 30
referral.rewards.yearlyUsd = 60
referral.milestone.target = 6
referral.milestone.benefit = NEXT_MONTH_FREE | CREDIT_BUNDLE
referral.attribution.ttlDays = 30
referral.fraud.holdThreshold = ...
referral.credits.expirationEnabled = false
```

### 14.8 Non-Goals (v1 Backend)

- Multi-level MLM trees
- Cash payouts
- Mandatory survey attribution
- Geo tracking for its own sake
- Predictive ML models

---

## Appendix A — Glossary

| Term | Meaning |
|------|---------|
| Referrer | Existing member who shares a link |
| Referee | New user acquired via referral |
| Successful Membership | Verified paid VIP activation attributed to a referral |
| Referral Credit | Non-cash membership purchasing power |
| Operations | Admin management surface |
| Intelligence | Admin analytics / BI surface |
| Wallet Journey | Credit issued → redeemed → unused storytelling |

---

## Appendix B — Acceptance Criteria (Backend Launch)

Backend referral v1 is launch-ready when:

1. Attribution + unique referee constraint enforced  
2. Credits issue once on verified activation with correct plan amounts  
3. Ledger is source of truth; wallet balances reconcile  
4. Clawback works on refund/chargeback  
5. Admin Ops + Intelligence APIs feed existing UI contracts  
6. Member APIs never expose business revenue metrics  
7. Timeline events written for all major transitions  
8. Fraud holds can block rewards pending review  
9. Configured rewards/milestones — not hardcoded only in frontend  
10. Audit log covers admin financial actions  

---

## Appendix C — Document Control

| Version | Date | Notes |
|---------|------|-------|
| 1.0 | 2026-07-20 | Initial official Referral System Architecture after Admin UI milestone `v1.1.0-admin-referrals` |

**Maintainers:** Product Architecture owners + Admin/Member domain leads  
**Change policy:** Behavioral contract changes require explicit product approval; schema naming may evolve without changing semantics.
