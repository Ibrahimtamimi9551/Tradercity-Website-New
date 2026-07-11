# TraderCity Admin Dashboard

## Chapter 01 — Product Vision and Architecture

**Document Version:** 1.0  
**Status:** Living Specification

> This chapter defines what the Admin Dashboard is, why it exists, and how modules relate to each other. Every future admin decision must align with the principles described here.

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

- A **modular management system** organized by business domain
- An **operational decision platform** for administrators
- A **Member Control Center** that aggregates cross-module state
- A **scalable frontend ecosystem** designed for modular expansion

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
| Dashboard | What needs attention? |
| Members | Who is this member? |
| Member Control Center | What is the complete current state of this member? |
| Subscriptions | What is the payment state? |
| Discord | Is Discord synchronized? |
| Referrals | What is the referral progress? |
| Settings | How is the platform configured? |

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

### Sidebar Groups

```text
Dashboard

Management
├── Members
├── Subscriptions
├── Discord          (future)
├── Referrals        (future)

Content
├── Reports          (future)
├── Learning         (future)
├── Community        (future)
├── Media Library    (future)

System
├── Notifications    (future)
├── Audit Logs       (future)
├── Settings         (future)
```

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

- Discord Avatar
- Discord Username
- Registered Email

**Status**

- Membership Status
- Discord Status
- Discord Role
- Joined Date

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
- Payment verification logic

These will be connected in later development phases.

Design hooks and types for NestJS integration with clear TODO comments.
