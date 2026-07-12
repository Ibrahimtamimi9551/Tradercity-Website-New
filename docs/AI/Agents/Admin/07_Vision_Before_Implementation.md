# TraderCity Admin Dashboard

## Chapter 07 — Vision Before Implementation

**Document Version:** 1.0  
**Status:** Authoritative — philosophy every page, component, and module must follow  
**Scope:** Member Management (Phases 0–6)

> This is **not** a coding prompt. This is the design philosophy that governs all admin implementation. Read before any admin frontend work.

**Implementation roadmap:** [`docs/Development/Admin/Phase-Roadmap.md`](../../Development/Admin/Phase-Roadmap.md)

---

## Core Philosophy

TraderCity Admin Dashboard is **not** a data dashboard.

It is an **Operations Dashboard**.

The purpose is not to display every possible metric.

The purpose is to help administrators answer one simple question:

> **What requires my attention right now?**

Every page should help reduce operational work.

Everything should be simple.

Everything should be connected.

Everything should have one clear responsibility.

---

## Source of Truth

The Backend Database is always the source of truth.

Discord is **not** the source of truth.

The Frontend is **not** the source of truth.

The Dashboard only reflects the current backend state.

```text
Backend
  ↓ updates database
  ↓ database triggers integrations
  ↓ Discord updates
  ↓ Dashboard reflects latest state
```

Never reverse this architecture.

---

## Reflection vs Management

One of the biggest architectural decisions is separating **Reflection** from **Management**.

| | Reflection | Management |
|---|------------|------------|
| Meaning | Read-only information | Where actual actions happen |
| Example | User Profile shows subscription status | Subscription Module approves payments |

User Profile shows Subscription Status, Discord Status, Referral Status, Membership Status — but **never edits them**.

Every section contains **Manage [Module] →** which opens the specialized module.

This architecture prevents duplicate logic.

---

## User Profile Philosophy

User Profile is the **Control Center**.

It is **not** a data center.

It aggregates information. It never owns information.

Everything displayed here is reflected from another module.

| Card | Reflects | Managed by |
|------|----------|------------|
| Subscription | Payment status | Subscriptions Module |
| Discord | Sync state | Discord Module |
| Referral | Progress | Referrals Module |
| Membership Activity | Lifecycle | Subscriptions Module |

### Identity rules

- Discord identity is primary (avatar, username, email)
- **No Full Name**
- **No profile photo upload**
- **One Joined Date only** — no duplicate information

This is the most important architectural decision.

---

## Dashboard Philosophy

Dashboard is the **Operations Center**.

It should immediately answer: *What requires attention today?*

The Dashboard is **not** for analytics.

The Dashboard is **not** for reports.

The Dashboard is the administrator's **inbox**.

### Section order

```text
Header
  ↓
Operational Widgets
  ↓
Operations Queue
  ↓
Recent Activity
  ↓
Quick Actions
  ↓
Platform Health
```

Revenue is private — visible to **Super Admin only**.

---

## Members Module Philosophy

Members page is **not** the user profile.

Members page is a **directory**.

Its purpose:

- Search members
- Filter members
- Understand member health
- Open user profile

Each row includes health indicators for Membership, Subscription, Discord, Referral:

| Color | Meaning |
|-------|---------|
| Green | Everything healthy |
| Yellow | Needs attention |
| Red | Action required |

Clicking Discord Username opens User Profile.

Nothing is edited directly inside the table.

---

## Subscription Module Philosophy

Subscription Module **owns** subscription operations.

Answers: Which payments succeeded? Which require verification? Which failed? What action should be taken?

### Table columns

Date & Time · Discord Username · Subscription Plan · Amount Paid · Transaction Hash · Status · Actions

- Click Discord Username → User Profile
- Click row → Subscription Details

### States

| State | Notes |
|-------|-------|
| Successful | Approved |
| Pending Verification | Awaiting verification |
| Verification Required | Auto verification failed |
| Rejected | Admin rejected |

**No Expired state** in Subscriptions — expiration belongs to Membership.

### Flow

```text
Auto Verification → Failure → Manual Verification → Approve or Reject
  ↓ (on approve only)
Backend activates VIP → Discord Role updated → Profile updated → Dashboard updated
```

---

## Discord Module Philosophy

Discord Module manages **synchronization**.

Discord remains a communication platform. Backend remains the source of truth.

Backend decides Free / VIP / Expired / Role Changes. Discord executes them. Dashboard reflects them.

The module does not replace Discord — it manages the integration between Backend and Discord.

---

## Referral Module Philosophy

Referral Module manages validation, credits, eligibility, and redemption requests.

It **never** changes subscription directly.

```text
Referral requirements completed → User submits redemption request
  ↓
Admin verifies → Backend extends membership → Profile updates
```

---

## Settings Module Philosophy (Deferred)

Settings is **configuration only** — never operational work.

Examples: wallet address, blockchain, membership plans, pricing, discount rules, referral config, Discord config, email templates.

**Not in scope** for Member Management (Phases 0–6). Deferred to future configuration area.

---

## Navigation Philosophy

```text
Dashboard → Members → User Profile → Manage Subscription → Subscription Module → Back
```

The User Profile is the hub. Everything returns to the User Profile.

---

## Information Flow

```text
Dashboard → Members → User Profile → Subscription / Discord / Referral → Backend Database → Dashboard updates
```

The Dashboard should feel like one connected ecosystem — never isolated pages.

---

## Scope Boundary

### Member Management — Phases 0–6 (current build)

| Phase | Module | Route |
|-------|--------|-------|
| 0 | Admin Foundation | `/admin` |
| 1 | Dashboard | `/admin` |
| 2 | Members | `/admin/members` |
| 3 | User Profile | `/admin/members/[id]` |
| 4 | Subscriptions | `/admin/subscriptions` |
| 5 | Discord | `/admin/discord` |
| 6 | Referrals | `/admin/referrals` |

### Deferred — Phases 7–9 (not Member Management)

| Phase | Modules | Future home |
|-------|---------|-------------|
| 7 | Reports, Community, Media Library | Website Content Management |
| 8 | Settings | Future configuration area |
| 9 | Notifications, Audit Logs | Future Analysts / system area |

Do **not** build Phases 7–9 routes, components, or sidebar links during Member Management work.

---

## Sidebar Authority

| Source | Role |
|--------|------|
| **Architecture flowchart** | **Canonical sidebar** — what gets built |
| **UI mockup images** | Visual/layout reference only — **not nav authority** |

### Canonical sidebar (Member Management)

```text
Dashboard
Members
Subscriptions
Discord
Referrals
```

User Profile is a route, not a sidebar item.

### Mockup-only / deferred (do not build now)

- Payments (standalone) — Subscriptions owns payments
- Reports, Community, Media Library — Phase 7 deferred
- Settings — Phase 8 deferred
- Notifications, Audit Logs — Phase 9 deferred
- Learning — mockup-only

Mobile bottom nav: `Dashboard | Members | Subscriptions | More` — **More** = Discord + Referrals.

---

## File Structure Philosophy

Admin Dashboard must be completely isolated from the public website.

Never modify Homepage components. Never share layouts.

### Two-layer structure

| Layer | Path | Purpose |
|-------|------|---------|
| **Admin shell** | `src/components/admin/layout/`, `src/components/admin/ui/` | Shared across all admin product areas |
| **Member Management** | `src/components/members/sections/` | Phases 0–6 domain UI |

```text
src/app/admin/**              — routes (URL namespace)
src/components/admin/         — shell + shared primitives ONLY
src/components/members/       — Member Management domain
  └── sections/
      ├── dashboard/
      ├── directory/
      ├── profile/
      ├── subscriptions/
      ├── discord/
      └── referrals/
src/types/admin/**            — shell types
src/types/members/**          — domain types
src/lib/admin/**              — shell utilities
src/lib/members/**            — domain hooks
```

**Do not** place domain sections under `admin/sections/` or `admin/modules/`. As the admin platform grows (Analysts, Website Content Management), each product area gets its own top-level folder (`analysts/`, `content/`) — preventing path duplication under `admin/`.

The admin dashboard evolves independently. Homepage development must never be affected by admin development.

---

## Implementation Sequence

Build in this exact order. Full exit criteria: [`Phase-Roadmap.md`](../../Development/Admin/Phase-Roadmap.md).

| Phase | Scope |
|-------|-------|
| 0 | Admin Foundation — layout, sidebar, header, theme, shared components, responsive system |
| 1 | Dashboard — Operations Center |
| 2 | Members — directory, search, filters, health status |
| 3 | User Profile — Control Center |
| 4 | Subscription Module |
| 5 | Discord Module |
| 6 | Referral Module |

Every phase reuses components from previous phases. Never duplicate components.

---

## Design Principles

- Minimal
- Operational
- Fast
- Readable
- Enterprise
- Dark Theme
- Premium
- No unnecessary animations
- No unnecessary widgets
- No duplicated information
- No unnecessary clicks

Every page should solve **one operational problem**.

---

## Development Rules

- Do not redesign modules without discussion
- Reuse shared components wherever possible
- Keep backend architecture unchanged
- Keep database as the single source of truth
- Keep modules independent
- User Profile reflects — modules manage
- Homepage must never be modified during Admin implementation
- Every new module integrates into the existing ecosystem
- Mockup sidebar ≠ implementation sidebar
- Do not build Phases 7–9 during Member Management work

The goal is not to build beautiful pages.

The goal is to build an operational platform that can efficiently manage thousands of TraderCity members with minimal administrative effort.
