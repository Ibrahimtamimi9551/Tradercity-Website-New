# TraderCity Admin Dashboard

## Chapter 06 — Application Isolation and Folder Architecture

**Document Version:** 2.1  
**Status:** Non-negotiable engineering contract — read before writing any Admin code  
**Companion:** [`07_Vision_Before_Implementation.md`](07_Vision_Before_Implementation.md), [`05_Operations_Center_Vision_Report.md`](05_Operations_Center_Vision_Report.md)

> The Admin Dashboard is **not** an extension of the marketing website. It is a completely different product. This chapter defines permanent isolation rules, folder architecture, component ownership, and the Member Management build order (Phases 0–6).

---

## Two Products, Not One Application

| Product | Purpose | Audience |
|---------|---------|----------|
| **TraderCity Website** | Sells TraderCity | Public |
| **TraderCity Admin** | Operates TraderCity | Internal administrators |

```text
TraderCity Website  →  Public Experience  (homepage, pricing, member dashboards)
TraderCity Admin    →  Internal Operations Platform  (Operations Center)
```

They may share:

- Authentication system
- Backend APIs (NestJS)
- Database (PostgreSQL)

They must **never** share:

- Frontend components
- Page layouts
- Design systems
- Routing concerns

```text
Marketing Components  ←—— NEVER ——→  Admin Components
```

---

## Non-Negotiable Cursor Rules

These rules are **permanent** during Admin Dashboard development:

1. Homepage and Admin Dashboard are completely isolated.
2. Never modify Homepage while implementing Admin Dashboard.
3. Never reuse Homepage sections inside Admin.
4. Admin has its own component library.
5. Every business domain has its own module.
6. User Profile is a reflection layer, not a management layer.
7. Every management action happens inside its dedicated module.
8. Database remains the single source of truth.
9. Every module updates the database.
10. User Profile reflects updated database state automatically.

---

## Homepage Freeze Rule

While building the Admin Dashboard, do **not** modify unless **explicitly requested**:

```text
FORBIDDEN DURING ADMIN WORK

src/components/home/**
src/app/page.tsx
src/components/pricing/**
src/components/payment-activation/**
src/components/dashboard/free/**
src/components/dashboard/vip/**
src/app/pricing/**
src/app/payment-activation/**
src/app/dashboard/**
src/app/globals.css          (coordinate separately if needed)
```

Admin implementation must **never accidentally modify the marketing experience**.

Reference member-facing code for **data shapes only** — never import UI components.

---

## Independent Component Ecosystem

### Marketing owns

```text
Hero, Community, Pricing, Footer, Homepage Sections
Premium marketing visual language
Framer Motion marketing animations
Glass cards, ecosystem illustrations
```

### Admin owns

```text
DataTable, WidgetCard, StatusBadge, FilterBar, SearchInput
SidePanel, Timeline, ActionMenu, InfoCard
OperationsQueue, SystemHealthBadge
Institutional operations visual language
```

**Never reuse homepage or marketing components inside admin.**

Admin builds its own design system under `src/components/admin/ui/` (shared shell primitives).

Member Management domain UI lives under `src/components/members/` — **not** nested inside `admin/modules/`.

---

## Reflection vs Management Components

This separation is **critical** and must never be blurred.

### Management Components

Live inside the **owning section** under `members/sections/`. Perform actions.

```text
members/sections/subscriptions/
  SubscriptionTable.tsx
  SubscriptionFilters.tsx
  SubscriptionDetails.tsx
  SubscriptionWidgets.tsx
  SubscriptionTimeline.tsx
  SubscriptionActions.tsx      ← Approve, Reject, Resolve

members/sections/discord/
  DiscordTable.tsx
  DiscordDetails.tsx
  DiscordSyncActions.tsx       ← Sync Now, Send Invite

members/sections/referrals/
  ReferralTable.tsx
  ReferralApprovalActions.tsx
```

### Reflection Components

Live inside **`members/sections/profile/`**. Read-only display only.

```text
members/sections/profile/
  ProfileHeader.tsx
  MembershipCard.tsx           ← Reflection only
  SubscriptionCard.tsx         ← Reflection only
  DiscordCard.tsx              ← Reflection only
  ReferralCard.tsx             ← Reflection only
  NotesCard.tsx
  ActivityTimeline.tsx
  ProfileTabs.tsx
```

| Component Type | Location | Can Perform Actions? |
|----------------|----------|---------------------|
| Management | `members/sections/{module}/` | Yes — in owning section only |
| Reflection | `members/sections/profile/` | No — links to owning section |

---

## Data Ownership (Never Break)

```text
Members Module       → owns member listing / directory
Subscription Module  → owns subscription logic
Discord Module       → owns Discord logic
Referral Module      → owns referral logic
Settings Module      → owns platform configuration (deferred — Phase 8)
User Profile Module  → owns NOTHING (aggregates only)
Dashboard            → owns NOTHING (monitors and routes only)
```

---

## Navigation Flow

Every management workflow returns to the Member Control Center:

```text
Dashboard
    ↓
Members (search / directory)
    ↓
Member Profile (reflection)
    ↓
Manage Subscription
    ↓
Subscription Module (action)
    ↓
Back
    ↓
Member Profile (updated reflection)
```

Same pattern for Discord and Referrals.

---

## Target Folder Architecture

Document as **target architecture**. Implement incrementally — no marketing migration required now.

### Two-layer rule

| Layer | Path | Owns |
|-------|------|------|
| **Admin shell** | `src/components/admin/` | Layout, cross-product UI primitives — reused by future Analysts, Website Content Management |
| **Member Management domain** | `src/components/members/` | All Phases 0–6 feature sections — isolated from other future admin product areas |

**Do not** put domain sections under `src/components/admin/modules/` or `src/components/admin/sections/`. That causes path duplication as the admin platform grows.

```text
src/
├── app/
│   ├── page.tsx                    # Homepage — FROZEN during admin work
│   ├── pricing/                    # FROZEN
│   ├── payment-activation/         # FROZEN
│   ├── dashboard/                  # Public member — FROZEN
│   └── admin/                      # Admin URL namespace (routes only)
│       ├── layout.tsx              # Admin shell — composes admin/layout + members sections
│       ├── page.tsx                # Phase 1: Dashboard inbox
│       ├── members/
│       │   ├── page.tsx            # Phase 2: Members directory
│       │   └── [id]/
│       │       └── page.tsx        # Phase 3: User Profile
│       ├── subscriptions/          # Phase 4
│       ├── discord/                # Phase 5
│       └── referrals/              # Phase 6
│
├── components/
│   ├── home/                       # Marketing — FROZEN
│   ├── pricing/                    # FROZEN
│   ├── payment-activation/         # FROZEN
│   ├── dashboard/                  # Public member — FROZEN
│   │
│   ├── admin/                      # Shared admin shell ONLY (cross-product)
│   │   ├── layout/
│   │   │   ├── AdminSidebar.tsx
│   │   │   ├── AdminHeader.tsx
│   │   │   └── AdminBackground.tsx
│   │   └── ui/                     # Shared primitives (DataTable, WidgetCard, etc.)
│   │
│   └── members/                    # Member Management domain (Phases 0–6)
│       └── sections/
│           ├── dashboard/          # Phase 1 — Operations Center sections
│           ├── directory/          # Phase 2 — Members list, filters, table
│           ├── profile/            # Phase 3 — Control Center (reflection)
│           ├── subscriptions/      # Phase 4 — payment tickets (management)
│           ├── discord/            # Phase 5 — sync tickets (management)
│           └── referrals/          # Phase 6 — validation (management)
│
├── types/
│   ├── admin/                      # Shell-only shared types (nav, session, roles)
│   └── members/                    # Member Management domain types
│       ├── member.ts
│       ├── subscription.ts
│       ├── discord.ts
│       ├── referral.ts
│       └── system-health.ts
│
└── lib/
    ├── admin/                      # Shell-only shared utilities (minimal)
    └── members/
        ├── hooks/                  # Domain data hooks (mock → NestJS)
        ├── services/
        └── utils/
```

### Future admin product areas (deferred — same pattern)

When Phases 7–9 and beyond are built, each gets its **own top-level domain folder** — not nested under `admin/`:

```text
src/components/analysts/sections/     # Future
src/components/content/sections/        # Website Content Management — future
```

This prevents `admin/modules/members/` vs `admin/modules/analysts/` duplication and keeps the admin shell thin.

### Current Repo Note

Marketing already lives at existing paths (`src/components/home/**`, etc.). **Member Management work uses:**

- `src/app/admin/**` — routes (URL namespace)
- `src/components/admin/layout/**` + `src/components/admin/ui/**` — shared shell
- `src/components/members/**` — domain sections
- `src/types/admin/**` + `src/types/members/**`
- `src/lib/admin/**` + `src/lib/members/**`

No marketing folder restructure is required to begin implementation.

---

## Admin Shared UI Library

Canonical list — implement once under `src/components/admin/ui/`:

| Component | Purpose |
|-----------|---------|
| `AdminSidebar` | Module navigation |
| `AdminHeader` | Page title, search, admin profile |
| `DataTable` | All module tables |
| `WidgetCard` | KPI / workload widgets (clickable for deep links) |
| `StatusBadge` | Operational state pills |
| `FilterBar` | Module filter controls |
| `SearchInput` | Cross-field search |
| `OperationsQueue` | Needs Attention inbox |
| `SystemHealthBadge` | Healthy / Needs Attention / Action Required |
| `Timeline` | Subscription and activity timelines |
| `ActionMenu` | Row-level actions |
| `InfoCard` | Key-value detail blocks |
| `Pagination` | Table pagination |
| `EmptyState` | No results |
| `LoadingState` | Async loading |
| `ErrorState` | Error with retry |
| `SectionHeader` | Module section titles |
| `PageTitle` | Page header block |

---

## Module Internal Structure

Each Member Management section is self-contained under `src/components/members/sections/`:

```text
members/sections/directory/
  MembersWidgets.tsx
  MembersFilters.tsx
  MembersTable.tsx

members/sections/profile/
  ProfileHeader.tsx
  MembershipCard.tsx
  SubscriptionCard.tsx
  DiscordCard.tsx
  ReferralCard.tsx
  NotesCard.tsx
  ActivityTimeline.tsx
  ProfileTabs.tsx

members/sections/subscriptions/
  SubscriptionWidgets.tsx
  SubscriptionFilters.tsx
  SubscriptionTable.tsx
  SubscriptionDetails.tsx
  SubscriptionTimeline.tsx
  SubscriptionActions.tsx

members/sections/dashboard/
  DashboardWidgets.tsx
  OperationsQueue.tsx
  RecentActivityFeed.tsx
  QuickActions.tsx
  PlatformHealthBar.tsx
```

---

## Page Composition Rule

Pages are **thin orchestrators** — composition only, no business logic:

```tsx
// src/app/admin/members/page.tsx
import { MembersWidgets, MembersFilters, MembersTable } from '@/components/members/sections/directory';

export default function MembersPage() {
  return (
    <>
      <MembersWidgets />
      <MembersFilters />
      <MembersTable />
    </>
  );
}
```

Business logic lives in:

- Section components under `src/components/members/sections/`
- `src/lib/members/hooks/` (with NestJS TODO stubs)
- Backend (production)

---

## Member Management Development Strategy (Phases 0–6)

Build in this exact order. Each phase depends on the previous without creating rework.

| Phase | Name | Deliverables |
|-------|------|--------------|
| **0** | Admin Foundation | Admin layout, sidebar (5 items), header, theme, all shared UI primitives |
| **1** | Dashboard | Workload widgets, Operations Queue, Recent Activity, Quick Actions, Platform Health |
| **2** | Members | Directory table, System Health column, search/filters |
| **3** | User Profile | Reflection hub — profile cards, notes, activity timeline, tabs |
| **4** | Subscriptions | Payment tickets, table, details panel, approve/reject flows |
| **5** | Discord | Sync tickets, table, details panel, Sync Now / Send Invite |
| **6** | Referrals | Validation UI, redemption approval, referral rules |

### Deferred (Phases 7–9)

| Phase | Modules | Future home |
|-------|---------|-------------|
| 7 | Reports, Community, Media | Website Content Management |
| 8 | Settings | Configuration area |
| 9 | Notifications, Audit Logs | Analysts / system |

Do **not** build Phases 7–9 routes or sidebar links during Member Management work.

### Why This Order

Mirrors how administrators actually work:

1. **Foundation** — shell exists
2. **Dashboard** — see what needs attention
3. **Members** — find a user
4. **Profile** — understand one user's complete state
5. **Domain modules** — resolve issues (Subscriptions, Discord, Referrals plug into profile hub)

**Full phase guide** (dependencies, exit criteria, micro-sequence, anti-patterns): [`docs/Development/Admin/Phase-Roadmap.md`](../../Development/Admin/Phase-Roadmap.md)

| Route | Phase | Module |
|-------|-------|--------|
| `/admin` | 0–1 | Shell + Dashboard inbox |
| `/admin/members` | 2 | Members directory |
| `/admin/members/[id]` | 3 | User Profile (Control Center) |
| `/admin/subscriptions` | 4 | Subscriptions |
| `/admin/discord` | 5 | Discord |
| `/admin/referrals` | 6 | Referrals |

---

## Deep-Link Query Contracts

Action Driven Navigation requires stable query parameters:

| Parameter | Values | Used By |
|-----------|--------|---------|
| `?status=` | `pending_verification`, `verification_required`, `successful` | Subscriptions |
| `?sync=` | `failed`, `pending`, `synced` | Discord |
| `?health=` | `healthy`, `needs_attention`, `action_required` | Members |
| `?referral=` | `pending_approval`, `eligible` | Referrals |
| `?memberId=` | UUID | Cross-module links to pre-select member |

Document any additions in [`03_Module_Specifications.md`](03_Module_Specifications.md).

---

## Branch / Worktree

**Branch:** `feat/admin-payments-subscriptions`

Work in isolated worktree. Admin paths only — marketing paths frozen per Homepage Freeze Rule above.

---

## Verification Before Coding

- [ ] Read [`05_Operations_Center_Vision_Report.md`](05_Operations_Center_Vision_Report.md)
- [ ] Read this file
- [ ] Confirm no marketing files will be touched
- [ ] Confirm admin shell lives under `src/components/admin/layout/` and `src/components/admin/ui/` only
- [ ] Confirm Member Management sections live under `src/components/members/sections/`
- [ ] Confirm no domain code under `src/components/admin/modules/` or `src/components/admin/sections/`
- [ ] Confirm reflection components live in `members/sections/profile/`
- [ ] Confirm management components live in their owning `members/sections/{module}/`
- [ ] Confirm build follows Member Management Phases 0–6 order
- [ ] Confirm sidebar has 5 items only (no Phases 7–9 links)

If any item fails, stop and resolve before writing frontend code.
