# TraderCity Admin Dashboard

## Operations Center Vision Report

**Document Version:** 2.1  
**Status:** Mandatory specification — read before any Admin Dashboard implementation  
**Companion:** [`07_Vision_Before_Implementation.md`](07_Vision_Before_Implementation.md), [`06_Application_Isolation_and_Folder_Architecture.md`](06_Application_Isolation_and_Folder_Architecture.md)

> This report defines **what** the Admin Dashboard is, **how** administrators work inside it, and **why** the architecture is designed as an Operations Center. **Current build scope = Member Management Phases 0–6.** Phases 7–9 are deferred.

---

## 1. Executive Summary

The TraderCity Admin Dashboard is an **internal Operations Center** used to monitor, verify, and manage the entire TraderCity ecosystem.

It is **not**:

- A traditional CMS or database viewer
- A collection of independent CRUD pages
- An extension of the marketing website
- A place where administrators browse data for exploration

It **is**:

- An operational command center built around **workflows**, not pages
- A system where every module owns one business responsibility
- A hub-and-spoke architecture where the **Member Control Center** reflects state but never owns management logic
- A platform designed to scale from hundreds to thousands of members without architectural redesign

### The One Rule

> **Every module owns its own responsibility. The User Profile only reflects the final state of those modules.**

### The One Loop

```text
Admin Action (in owning module)
        ↓
Database Updated (single source of truth)
        ↓
User Profile reflects new state
        ↓
Members Table updates System Health
        ↓
Dashboard widgets update automatically
```

One decision. One update. Everything reflects.

---

## 2. Paradigm Shift: Pages vs Workflows

Most admin dashboards are built around **pages** — one page per database table. After a few months, every page duplicates information and administrators visit multiple places to understand one user.

TraderCity avoids this from day one by building around **workflows**.

### The Administrator's Real Job

The administrator is not browsing data.

The administrator continuously answers:

> **"Is the system operating correctly? If not, what needs my attention?"**

The dashboard should never encourage exploration.

It should encourage **resolution**.

### Daily Admin Journey

**Scenario A — Everything healthy**

```text
Open Dashboard → 0 Pending Verification → 0 Discord Issues → 0 Referral Requests → System Healthy → Close
```

**Scenario B — Work exists**

```text
Open Dashboard → Pending Verification: 3 → Click widget
        ↓
Subscription Module opens (filter already applied: Pending Verification)
        ↓
Admin resolves: Approve / Approve / Reject
        ↓
Dashboard counter returns to 0
```

This is **Action Driven Navigation** — the system takes the admin directly to work.

---

## 3. Core Philosophy: Management vs Reflection

Every feature has two distinct responsibilities.

### Management

The module where administrators **perform actions**.

| Module | Owns |
|--------|------|
| Subscriptions | Payment verification, activation, renewal |
| Discord | Synchronization, role assignment requests |
| Referrals | Validation, redemption approval |
| Settings | Platform configuration |

### Reflection

The User Profile **never performs management**.

It only reflects the current state produced by each module.

```text
Subscription Module → Payment Verified → Database Updated
        ↓
Discord Bot → Role Updated
        ↓
User Profile → Subscription Card shows "Successful"
```

The profile never decides anything. It displays the latest truth in the database.

### Card-as-Window Pattern

Every card on the User Profile is a **read-only window** into its owning module:

| Card | Action | Redirects To |
|------|--------|--------------|
| Subscription Card | Manage Subscription → | Subscriptions Module |
| Discord Card | Manage Discord → | Discord Module |
| Referral Card | Manage Referral → | Referral Module |

User Profile owns **nothing**. It reflects **everything**.

---

## 4. Source of Truth

There is only one source of truth:

```text
Database
```

Everything else reflects the database.

```text
Website
    ↓
Backend (NestJS)
    ↓
Database
    ↓
Admin Dashboard
    ↓
Discord Bot
    ↓
Discord Server
```

No module should become its own source of truth.

- Discord is not the source of truth
- Payments are not the source of truth
- Referral calculations are not the source of truth
- The Admin Dashboard frontend never calculates business logic

**Backend decides. Modules execute. Dashboard reflects.**

---

## 5. Complete Member Lifecycle

Everything inside the admin dashboard exists to support this lifecycle:

```text
Visitor
    ↓
Register using Email
    ↓
Free Member Created
    ↓
Free Dashboard
    ↓
Join Discord
    ↓
Discord Username Linked
    ↓
Public Discord Role
    ↓
Purchases VIP
    ↓
Payment Submitted
    ↓
Subscription Verification
    ↓
Payment Successful
    ↓
Database Updated
    ↓
Discord Role changed to VIP
    ↓
VIP Dashboard Activated
    ↓
Member Uses Platform
    ↓
Membership Expires
    ↓
Role changed back to Public
    ↓
User Returns to Free State
```

Every admin screen maps to a step in this lifecycle — never to a database table in isolation.

---

## 6. Architecture Model

### Hub-and-Spoke

```text
                    Database
                       │
      ┌────────────────┼────────────────┐
      │                │                │
Subscription      Discord        Referral
      │                │                │
      └────────────────┼────────────────┘
                       │
              Member Control Center
                       │
                  Members Table
                       │
                   Dashboard
```

### Information Flow

```text
User Registers
        │
        ▼
Database creates Free Member
        │
        ▼
Members Table
        │
        ▼
User Profile
        │
        ├──────── Subscription Module
        ├──────── Discord Module
        ├──────── Referral Module
        │
        ▼
Database updated (by module action)
        │
        ▼
User Profile automatically reflects latest state
        │
        ▼
Members Table updates System Health
        │
        ▼
Dashboard widgets update automatically
```

### Operational Cycle

```text
Dashboard → Action Queue → Resolve in Module → Database → Reflection → Dashboard
```

This loop runs continuously. It is the heartbeat of the Operations Center.

---

## 7. Operations Queue (Needs Attention)

Formalize the dashboard inbox as an **Operations Queue**.

Instead of treating pending payments, Discord sync failures, referral redemption requests, and future support tickets as separate problems, treat them all as **action items**.

### Example Queue

```text
Needs Attention (7)

• 3 Pending Subscription Verifications
• 1 Discord Sync Failure
• 2 Referral Redemption Requests
• 1 Membership Expired Today
```

Each item is **clickable** and navigates to the correctly filtered module.

This changes the admin mindset from *"Which page should I open?"* to *"Which task should I resolve next?"*

### Dashboard Workload Widgets

Beyond monitoring statistics, show **workload**:

| Widget | Purpose |
|--------|---------|
| Payments Waiting | Deep-link → Subscriptions (Pending Verification filter) |
| Discord Issues | Deep-link → Discord (Sync Issues filter) |
| Referral Requests | Deep-link → Referrals (Pending Approval filter) |
| Membership Expiring Today | Deep-link → Members (expiry filter) |
| **Total Actions** | Sum of all actionable items |

Revenue charts are secondary. **Operational workload is primary.**

---

## 8. Action Driven Navigation

Every actionable widget deep-links with **pre-applied filters**.

| Widget Click | Destination | Auto-Applied Filter |
|--------------|-------------|---------------------|
| Pending Verification: 4 | `/admin/subscriptions` | `?status=pending_verification` |
| Discord Issues: 2 | `/admin/discord` | `?sync=failed` |
| Referral Requests: 5 | `/admin/referrals` | `?status=pending_approval` |
| Action Required: 18 | `/admin/members` | `?health=needs_attention` |

Query parameter contracts must be documented in [`03_Module_Specifications.md`](03_Module_Specifications.md) and preserved across backend integration.

---

## 9. Ticket Processing Model

Every operational module processes **tickets**. Members and User Profile process nothing.

| Module | Ticket Type | Examples |
|--------|-------------|----------|
| **Subscriptions** | Payment tickets | Pending verification, verification required, disputes |
| **Discord** | Sync tickets | Sync failed, left server, pending invites |
| **Referrals** | Validation tickets | Redemption requests, eligibility review |
| **Members** | None | Directory and search only |
| **User Profile** | None | Reflection only |
| **Dashboard** | None | Monitoring and queue routing only |

---

## 10. Module Specifications Summary

Full UI contracts: [`03_Module_Specifications.md`](03_Module_Specifications.md)

### Dashboard (`/admin`)

**Question:** *"How is TraderCity performing today — and what needs my attention?"*

- Operational overview + Operations Queue
- Widgets: Total Members, VIP Members, Revenue (monitoring), Pending Verification, Discord Issues, Referral Requests, Membership Expiring, Total Actions
- No detailed management — monitoring and routing only

### Members (`/admin/members`)

**Question:** *"Which users need attention?"* (directory/search — not primary work queue)

- Widgets: Total Members, VIP Members, Pending Verification (links out), Action Required, New This Month
- Lightweight table: Discord Username, Membership, Subscription, Discord, Referral Progress, Joined Date, **System Health**
- Username click → Member Control Center

### Member Control Center (`/admin/members/[id]`)

**Question:** *"What is the complete operational state of THIS member?"*

- Reflection hub — read-only cards with Manage → links
- Header: identity + 4 status widgets
- Cards: Membership Activity, Subscription, Discord, Referral
- Notes + Activity Timeline
- Tabs: Overview, Subscription, Discord, Referral, Notes, Activity

### Subscriptions (`/admin/subscriptions`)

**Question:** *"What is the payment state — and what needs verification?"*

- **Owns all subscription actions**
- Widgets: Successful, Pending Verification, Verification Required, Rejected
- Table + details panel (desktop); list → detail page (mobile)
- Actions: Approve, Resolve Dispute, Open Profile, BSC Explorer

### Discord (`/admin/discord`) — Phase 5

**Question:** *"Is Discord synchronized with TraderCity?"*

- Principle: Backend decides, Discord executes
- Widgets: Connected Members, VIP Members, Sync Issues, Pending Invites
- Table + details panel with Sync Now, Send Invite

### Referrals (`/admin/referrals`) — Phase 6

**Question:** *"What referral progress exists — and what needs validation?"*

- Rules: $10 per successful referral; 6 required for redemption; admin validates; membership extended on approval
- Owns: validation, approval, history, settings
- Profile reflects: progress, eligibility, credits only

### Reports, Settings, Notifications — Deferred (Phases 7–9)

Not in Member Management scope. Future homes: Website Content Management (Reports, Community, Media), configuration area (Settings), Analysts/system (Notifications, Audit Logs).

---

## 11. System Health

One of the strongest operational concepts: a **single computed state** per member.

Instead of checking four modules separately, the Members table shows one operational state:

| Membership | Subscription | Discord | Referral | System Health |
|------------|--------------|---------|----------|---------------|
| ✅ | ✅ | ✅ | ✅ | **Healthy** |
| ✅ | ❌ | ✅ | ✅ | **Needs Attention** |
| ✅ | ❌ | ❌ | ✅ | **Action Required** |

**Rules:**

- System Health is **backend-computed** in production
- Frontend displays the value — does not derive business rules client-side
- Members table uses System Health for prioritization: *"Who requires attention?"*

---

## 12. Cross-Module Workflows

### Workflow A — Payment Dispute

```text
User submits payment → Auto verification fails → Status: Pending Verification
        ↓
Dashboard: Pending Verification +1
Members Table: System Health → Needs Attention
User Profile: Subscription → Pending Verification
        ↓
Admin clicks Pending Verification widget → Subscriptions (filtered)
        ↓
Admin verifies on-chain → Approve
        ↓
Database → Subscription Active → Discord API → VIP Role
        ↓
Profile, Members Table, Dashboard all update automatically
```

### Workflow B — Discord Disconnect

```text
User leaves Discord server → Discord Bot → Backend → Database
        ↓
Discord State: Disconnected
Members Table: Needs Attention
User Profile: Discord → Disconnected
Dashboard: Discord Issues +1
        ↓
Admin opens Discord Module → Sync Now or Send Invite
        ↓
Resolution → all views reflect
```

### Workflow C — Referral Redemption

```text
User completes 6 referrals → Backend → Referral Module: Eligible
        ↓
Dashboard: Referral Requests +1
User Profile: Eligible
Members Table: Healthy (no issue — referral is not a failure state)
        ↓
Admin opens Referral Module → Reviews → Approves
        ↓
Membership Extended → Subscription Updated → Discord Expiry Updated → Referral Reset
```

---

## 13. Mobile Operations

Mobile is **first-class** for operational tasks — not a squeezed desktop layout.

### Desktop

```text
Sidebar + Table + Details Panel (side-by-side)
```

### Mobile

```text
Bottom Navigation: Dashboard | Members | Subscriptions | More
        ↓
Table / List view
        ↓
Tap row → Full-screen detail page
        ↓
Actions: Approve, Resolve, Open Profile (touch-friendly)
```

### Mobile Requirements

- Bottom nav on all admin mobile views
- Subscription detail: timeline + Approve / Resolve Dispute / Open Profile / BSC Explorer
- Member Control Center: stacked cards, scrollable tabs
- Footer note on profile: *"All information displayed here is aggregated from different modules…"*

Reference: [`assets/member-control-center-mobile.png`](assets/member-control-center-mobile.png) (when available)

---

## 14. Design Reference Index

> **Mockup disclaimer:** UI mockup sidebars may show Settings, Reports, Payments, Notifications — these are **layout reference only**. Canonical sidebar = architecture flowchart (5 items). See chapter 07.

| Asset | Module | Breakpoint |
|-------|--------|------------|
| [`dashboard-desktop.png`](assets/dashboard-desktop.png) | Dashboard | Desktop |
| [`members-desktop.png`](assets/members-desktop.png) | Members | Desktop |
| [`member-profile-desktop.png`](assets/member-profile-desktop.png) | User Profile | Desktop |
| [`subscriptions-desktop.png`](assets/subscriptions-desktop.png) | Subscriptions | Desktop |
| [`discord-desktop.png`](assets/discord-desktop.png) | Discord | Desktop |
| [`member-control-center-reference.png`](assets/member-control-center-reference.png) | User Profile (legacy alias) | Desktop |
| [`subscription-management-reference.png`](assets/subscription-management-reference.png) | Subscriptions (legacy alias) | Desktop |
| `member-profile-mobile.png` | User Profile | Mobile (when available) |
| `subscriptions-mobile.png` | Subscriptions | Mobile (when available) |
| `architecture-flow-diagram.png` | Navigation authority | Reference |

---

## 15. Gap Analysis: v1.0 → v2.0

| Area | v1.0 Docs | v2.0 Vision |
|------|-----------|-------------|
| Mental model | Modular admin pages | **Operations Center** with workflow loops |
| Dashboard | Shell / redirect | **Inbox + Operations Queue** |
| Members table | Heavy CRUD columns (Days Left, Amount) | Lightweight + **System Health** |
| Navigation | Manual page browsing | **Action Driven Navigation** with deep links |
| Admin vs Marketing | Scope boundaries only | **Non-negotiable application isolation** (ch. 06) |
| Components | Reuse member badge vocabulary | **Independent admin design system** |
| Discord / Referrals | Future stubs | Full workflow specs documented |
| Mobile | Responsive tables | **Operational mobile** with bottom nav |
| Build order | Single Phase 1 list | **Member Management Phases 0–6** (ch. 07, Phase-Roadmap) |
| Profile cards | Aggregator | Explicit **reflection vs management** split |

---

## 16. Implementation Phases (Summary)

**Authoritative detail:** [`07_Vision_Before_Implementation.md`](07_Vision_Before_Implementation.md) and [`Phase-Roadmap.md`](../../Development/Admin/Phase-Roadmap.md)

### Member Management (current build — Phases 0–6)

| Phase | Scope |
|-------|-------|
| 0 | Admin Foundation — layout, sidebar (5 items), header, theme, shared UI |
| 1 | Dashboard — inbox, widgets, Operations Queue, Recent Activity, Quick Actions, Platform Health |
| 2 | Members — directory, System Health, search/filters |
| 3 | User Profile — reflection hub, cards, notes, timeline |
| 4 | Subscription Module — payment tickets, verification, details panel |
| 5 | Discord Module — sync tickets, role management UI |
| 6 | Referral Module — validation, redemption approval |

### Deferred (Phases 7–9 — not Member Management)

| Phase | Scope | Future home |
|-------|-------|-------------|
| 7 | Reports, Community, Media | Website Content Management |
| 8 | Settings | Configuration area |
| 9 | Notifications, Audit Logs | Analysts / system |

Backend integration and polish are cross-cutting per-phase exit criteria.

**Do not write frontend code until chapter 07 and Phase-Roadmap are reviewed.**

---

## 17. What Each Module Answers

| Module | Operational Question |
|--------|---------------------|
| Dashboard | What needs attention across the platform? |
| Members | Which users exist — and who needs attention? |
| Member Control Center | What is the complete state of this specific user? |
| Subscriptions | How do I manage payments and activations? |
| Discord | How do I synchronize community access? |
| Referrals | How do I validate referral rewards? |

Deferred modules (Reports, Settings, Notifications) — Phases 7–9, not current scope.

Every module has a single responsibility.

Every module connects through the database.

The Member Control Center unifies without duplicating.

This is the TraderCity Admin Dashboard Operations Center.
