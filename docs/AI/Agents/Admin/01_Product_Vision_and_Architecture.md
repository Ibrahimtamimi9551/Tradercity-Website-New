# TraderCity Admin Dashboard

## Chapter 01 — Product Vision and Architecture

**Document Version:** 2.1  
**Status:** Living Specification

> Read [`07_Vision_Before_Implementation.md`](07_Vision_Before_Implementation.md) for authoritative philosophy and scope. This chapter defines module relationships. Full workflow narrative: [`05_Operations_Center_Vision_Report.md`](05_Operations_Center_Vision_Report.md). Subscription pricing + future payment verification stack: [`08_Subscription_Pricing_and_Payment_Verification_Architecture.md`](08_Subscription_Pricing_and_Payment_Verification_Architecture.md).

---

## Two Products, Not One

| Product | Purpose |
|---------|---------|
| **TraderCity Website** | Sells TraderCity (public) |
| **TraderCity Admin** | Operates TraderCity (internal) |

The Admin Dashboard is **never** an extension of the marketing website. See [`06_Application_Isolation_and_Folder_Architecture.md`](06_Application_Isolation_and_Folder_Architecture.md).

---

## Purpose of This Document

This document is **not** a coding prompt.

It is a Product Architecture Specification (PAS) that teaches an AI agent **how to think** before building or changing the TraderCity Admin Dashboard.

The Admin Dashboard is the internal operating system of TraderCity.

It is:

- the control plane for member lifecycle,
- the verification queue for subscription payments,
- the synchronization layer between TraderCity and Discord,
- the operational hub that connects every business domain.

The goal is to ensure every future module preserves architectural integrity instead of creating isolated admin pages.

---

## What This Platform Is

- An **Operations Center** built around workflows and tickets — not pages
- A **modular management system** organized by business domain
- An **operational inbox** that routes administrators to pre-filtered work
- A **Member Control Center** that reflects cross-module state (never manages)
- A **scalable frontend ecosystem** isolated from the marketing website

## What This Platform Is Not

- A traditional CRUD admin panel built around database tables
- A duplicate of Discord moderation tools
- A analytics-heavy BI dashboard
- A place where frontend calculates business logic
- A collection of one-off pages with unique interaction models

---

## Mission

Build an admin dashboard that helps administrators make faster and better decisions — at scale.

Every module must improve one or more of the following:

- Operational clarity
- Decision speed
- Information hierarchy
- Cross-module consistency
- Scalability without redesign
- Backend integration readiness

Never add decorative complexity for its own sake.

---

## UX Philosophy

Administrators should never wonder what to do next.

Every page should answer **one operational question**:

| Module | Operational Question |
|--------|---------------------|
| Dashboard | What needs attention today? (Operations Queue) |
| Members | Which users exist — and who needs attention? (directory/search) |
| Member Control Center | What is the complete operational state of this user? (reflection) |
| Subscriptions | How do I resolve payment tickets? |
| Discord | How do I resolve sync tickets? |
| Referrals | How do I validate referral rewards? |

Settings, Reports, Notifications — **deferred** (Phases 7–9, not Member Management scope).

### Action Driven Navigation

Dashboard widgets are not decorative. Each workload widget deep-links to a module with filters pre-applied. See chapter 05, section 8.

### Operations Queue

The Dashboard **Needs Attention** section aggregates actionable items across modules into a single inbox.

---

## State-Driven Architecture

Every user exists in one current state.

The frontend should always reflect the current state.

Do not duplicate state calculations in multiple places.

### Membership State Examples

```text
Free
  ↓
Pending Verification
  ↓
VIP
  ↓
Expired
  ↓
Renewed
```

### Subscription Payment State Examples

```text
Pending Verification
  ↓
Verification Required
  ↓
Successful
  ↓
Rejected
```

Expiry belongs to **membership lifecycle**, not payment verification. Do not conflate subscription payment status with membership expiry in the Subscriptions module.

---

## Backend Integration Philosophy

Frontend should never contain business logic.

### Frontend Responsibilities

- Display data
- Validate input
- Navigate modules
- Trigger backend actions

### Backend Responsibilities

- Business logic
- Database
- State changes
- Verification
- Synchronization

Frontend always reflects backend state.

Assume the following already exists (see [`TraderCity_Architecture_Rules.md`](../../Universal/TraderCity_Architecture_Rules.md)):

- NestJS Modular Monolith with DDD
- Prisma ORM + PostgreSQL
- JWT access + refresh token rotation, RBAC
- Stripe + Crypto (USDT BEP20) payments
- Discord Integration Service
- User roles: Guest, Free Member, VIP Member, Analyst, Admin

Do not invent alternative architectures, mock databases, or localStorage persistence.

---

## Dashboard Navigation Architecture

### Scope

**Member Management (Phases 0–6)** is the current build. Sidebar items come from the **architecture flowchart** — not UI mockup sidebars.

### Canonical Sidebar

```text
Dashboard
Members
Subscriptions
Discord
Referrals
```

User Profile is reached via Members table or cross-module links — **not** a sidebar item.

### Future Top-Level Areas (deferred)

```text
Analysts                         — future
Website Content Management       — future (Reports, Community, Media)
Configuration / System           — future (Settings, Notifications, Audit Logs)
```

Do not add deferred items to the sidebar during Phases 0–6.

### Management Module Flow

Every management module follows this interaction flow:

```text
Page Header
  ↓
Statistics Widgets
  ↓
Search + Filters
  ↓
Data Table
  ↓
Details Panel (desktop) / Details Page (mobile)
  ↓
Open Member Control Center
```

Consistency is more important than visual uniqueness.

---

## Member Control Center (User Profile)

The User Profile is the operational identity of one member.

It is **not** a place to manage business logic.

Its responsibility is to aggregate the latest information from every module.

Think of it as the **Control Center** for a single member.

### Purpose

Answer one question:

> What is the complete current state of this member?

The User Profile never edits subscription logic, Discord synchronization, or referral calculations directly.

Instead, every card redirects administrators to the appropriate module.

### Header Contract

The header contains only identity and current status.

**Identity**

- Discord Avatar (from Discord — no upload)
- Discord Username
- Registered Email

**Not included:** Full Name, profile photo upload, duplicate joined dates.

**Status**

- Membership Status
- Discord Status
- Discord Role
- Joined Date (single field only)

**Quick Actions**

- Edit Profile

No delete. No suspend. No activation controls. Those belong to their respective modules.

### Overview Tab Cards

Each card summarizes state from its owning module and links to that module for management:

| Card | Displays | Action Redirects To |
|------|----------|---------------------|
| Membership Activity | Plan, status, dates, renewal, duration | Subscriptions Module |
| Subscription | Latest payment state, hash, method, amount | Subscriptions Module |
| Discord | Role, sync status, access, role history | Discord Module |
| Referral | Progress, credits, redemption status | Referral Module |

### Supporting Sections

**Internal Notes** — Private admin notes (e.g., "VIP activated manually", "Waiting for payment proof").

**Activity Timeline** — Major operational events only:

- Account Registered
- Joined Discord
- Payment Submitted
- Payment Verified
- VIP Activated
- Membership Renewed
- Membership Expired
- Referral Redeemed

Do not include analytics such as lesson views or report downloads.

---

## Module Ownership Matrix

| Domain | Owner Module | Member Control Center Role |
|--------|--------------|----------------------------|
| Member identity | Members | Display identity header |
| Subscription payments | Subscriptions | Display subscription card |
| Membership lifecycle | Subscriptions | Display membership activity card |
| Discord sync | Discord | Display discord card |
| Referral progress | Referrals | Display referral card |
| Internal notes | Member Control Center | Own and display notes |
| Activity timeline | Member Control Center | Aggregate operational events |

No module may duplicate another module's responsibility.

---

## Module Connection Flow

```text
┌─────────────────────┐
│  Subscription Module │
│  (owns payments)     │
└──────────┬──────────┘
           │ updates database
           ▼
┌─────────────────────┐
│  Member Control      │
│  Center              │
│  (reflects state)    │
└──────────┬──────────┘
           │ links to
           ▼
┌─────────────────────┐
│  Discord Module      │
│  (owns sync)         │
└─────────────────────┘
```

The Member Control Center is a **read aggregator with navigation links**, not a business logic engine.

---

## Future Scalability

The dashboard will continue to grow.

Future modules may include:

- Copy Trading
- Vault Management
- Education Progress
- AI Assistant
- Portfolio
- Support Tickets
- Marketplace
- Analytics
- CRM

The architecture must allow adding new modules **without modifying existing modules**.

New modules should:

1. Plug into existing sidebar navigation
2. Follow the standard module pattern
3. Expose summary data to the Member Control Center
4. Accept navigation from the Member Control Center for management actions

---

## Things to Avoid

- Duplicated information across modules
- Duplicated business logic in the frontend
- Multiple sources of truth
- Overly decorative admin interfaces
- Unnecessary analytics in operational views
- Exposing backend implementation details in the UI
- Building pages around database tables

> **Build pages around administrator workflows, not database tables.**

---

## Current Development Stage

### Current Priority

- Frontend architecture
- Reusable components
- UI implementation
- Mock data
- Responsive layouts

### Do Not Implement Yet

- Backend APIs
- Authentication
- Business logic
- Database operations
- Real Discord integration
- Payment verification logic (algorithms, chain access — backend-owned)

Design frontend hooks and shared types that describe required capabilities.  
Leave NestJS / schema / chain design to the backend developer.  
Subscription stack: catalog + pricing (live) and verification capability types in `src/lib/membership/verification/`. See [`08_Subscription_Pricing_and_Payment_Verification_Architecture.md`](08_Subscription_Pricing_and_Payment_Verification_Architecture.md) (includes **Frontend Architecture Ownership**).
