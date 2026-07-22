# Admin Dashboard — Phase Development Roadmap

**Document Type:** Engineering Phase Roadmap  
**Module:** Member Management (Operations Center)  
**Status:** Living document  
**Version:** 2.0  
**Last Updated:** July 2026  

**Authoritative plan:** [`admin_vision_documentation_de2ac6f8.plan.md`](../../../.cursor/plans/admin_vision_documentation_de2ac6f8.plan.md)  
**Vision chapter:** [`07_Vision_Before_Implementation.md`](../../AI/Agents/Admin/07_Vision_Before_Implementation.md)

**Related specs:**

- [`07_Vision_Before_Implementation.md`](../../AI/Agents/Admin/07_Vision_Before_Implementation.md) — philosophy, scope boundary, sidebar authority
- [`05_Operations_Center_Vision_Report.md`](../../AI/Agents/Admin/05_Operations_Center_Vision_Report.md)
- [`06_Application_Isolation_and_Folder_Architecture.md`](../../AI/Agents/Admin/06_Application_Isolation_and_Folder_Architecture.md)
- [`04_Development_Rules.md`](../../AI/Agents/Admin/04_Development_Rules.md)

---

## Purpose

This document explains **why** Member Management admin development is sequenced in **Phases 0–6**, **what** each phase delivers, and **when** a phase is considered complete.

Use it to:

- Plan sprints without skipping dependencies
- Know what to demo after each milestone
- Avoid rework (building modules before the shell, or domain modules before the profile hub)
- Track progress in [`PROJECT_STATUS.md`](PROJECT_STATUS.md)

---

## Scope boundary

**In scope (current build):** Member Management — **Phases 0–6**

| Phase | Module | Route |
|-------|--------|-------|
| 0 | Admin Foundation | `/admin` (shell) |
| 1 | Dashboard — Operations Center | `/admin` |
| 2 | Members — directory | `/admin/members` |
| 3 | User Profile — Control Center | `/admin/members/[id]` |
| 4 | Subscriptions | `/admin/subscriptions` |
| 5 | Discord | `/admin/discord` |
| 6 | Referrals | `/admin/referrals` |

**Out of scope (deferred):** Phases 7–9 — not built during Member Management work. May shift to future product areas:

| Deferred | Modules | Future home |
|----------|---------|-------------|
| 7 | Reports, Community, Media Library | Website Content Management |
| 8 | Settings | Future configuration area |
| 9 | Notifications, Audit Logs | Future Analysts / system area |

**Pre-work (complete):** Architecture & documentation (chapters 00–07, this roadmap v2.0).

---

## Canonical sidebar (Member Management only)

The **architecture flowchart** defines sidebar items — not UI mockup sidebars.

```text
Dashboard          ← Phase 1
Members            ← Phase 2
Subscriptions      ← Phase 4
Discord            ← Phase 5
Referrals          ← Phase 6
```

User Profile is a **route**, not a sidebar item (`/admin/members/[id]`).

**Do not build** sidebar links for Reports, Settings, Notifications, Audit Logs, Payments, or Learning during Phases 0–6.

Mobile bottom nav: `Dashboard | Members | Subscriptions | More` — **More** = Discord + Referrals only.

> **Update (Jul 2026):** Admin sidebar uses platform section nouns (**Members · Analysts · Content**). See [`PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md). Member hrefs above are unchanged. Analyst streams live under [`docs/Analyst/`](../../Analyst/00_Overview/ANALYST_DOCUMENTATION_INDEX.md) and do not replace Member Platform Admin Phases 0–6.

---

## How the sequence was designed

The phase order follows **three constraints simultaneously**:

1. **Technical dependencies** — shared UI before modules; hub before domain modules  
2. **Admin workflow** — how an administrator actually works day-to-day  
3. **Shippable milestones** — each phase produces something demoable without throwaway work  

### Core sequencing rule

```text
Foundation → Inbox → Directory → Hub → Domain Modules
```

Most admin projects fail by either:

- Building **pages first** → inconsistent UI, massive rework when module #2 arrives  
- Building the **hardest module first** (Subscriptions) → no shell, no navigation, nowhere to return after resolving a ticket  

TraderCity avoids both.

---

## Phase dependency map

```text
Pre-work  Documentation ✅
    ↓
Phase 0   Admin Foundation (shell + UI primitives)
    ↓
Phase 1   Dashboard (Operations Inbox)
    ↓
Phase 2   Members (directory + System Health)
    ↓
Phase 3   User Profile (reflection hub)
    ↓
Phase 4   Subscriptions ──┐
Phase 5   Discord         ├── plug into hub (Phase 3)
Phase 6   Referrals      ──┘
    ↓
[Deferred Phases 7–9 → future product areas]
```

Phases **4–6** all depend on Phase 3 (return destination after every action).

**Backend integration and polish** are cross-cutting exit criteria applied per phase — not a separate build phase.

---

## Milestone summary

| After phase | You can demo… |
|-------------|----------------|
| Phase 0 | “Here is the admin product shell” |
| Phase 1 | “Here is the operational inbox” |
| Phase 3 | “Here is the member hub” — **first major demo** |
| Phase 4 | “End-to-end payment resolution” |
| Phase 6 | **Full Member Management Operations Center** |

**MVP Member Management = Phases 0–6 complete.**

---

## Pre-work — Architecture & Documentation

**Status:** Complete (v2.0 + chapter 07)

### Goal

Agree on *what* we're building before writing admin frontend code.

### Deliverables

- [`07_Vision_Before_Implementation.md`](../../AI/Agents/Admin/07_Vision_Before_Implementation.md)
- [`05_Operations_Center_Vision_Report.md`](../../AI/Agents/Admin/05_Operations_Center_Vision_Report.md)
- [`06_Application_Isolation_and_Folder_Architecture.md`](../../AI/Agents/Admin/06_Application_Isolation_and_Folder_Architecture.md)
- Chapters 00–04 updated to v2.0 alignment
- This roadmap v2.0

### Exit criteria

- [x] Every module has a defined “owns / does not own” boundary
- [x] Homepage Freeze rule documented
- [x] Member Management scope = Phases 0–6 agreed
- [x] Phases 7–9 deferred to future product areas
- [x] Canonical sidebar defined (flowchart > mockups)

---

## Phase 0 — Admin Foundation

**Status:** Not started  
**Route:** `/admin` (shell only)

### Goal

Build the admin **chassis** — layout, navigation, theme, and shared UI primitives used by every module in Phases 1–6.

### Build

| Area | Files / components |
|------|-------------------|
| Layout | `src/app/admin/layout.tsx`, `src/components/admin/layout/` (`AdminSidebar`, `AdminHeader`, `AdminBackground`) |
| Shared UI | `src/components/admin/ui/` — `DataTable`, `WidgetCard`, `StatusBadge`, `FilterBar`, `SearchInput`, `Pagination`, `Timeline`, `InfoCard`, `EmptyState`, `LoadingState`, `ErrorState`, `PageTitle`, `SectionHeader` |
| Sidebar | 5 items only: Dashboard, Members, Subscriptions, Discord, Referrals |
| Types | Shell stubs in `src/types/admin/` |
| Theme | Admin-scoped styles — **do not modify** `globals.css` without approval |

**Do not create** `src/components/admin/modules/` or `src/components/admin/sections/` — domain code goes in `src/components/members/sections/` from Phase 1 onward.

### Do not build yet

- Real module workflows
- Profile reflection cards
- Approve/reject actions
- Phases 7–9 routes or sidebar links

### Exit criteria

- [ ] Navigate to `/admin` — consistent shell renders
- [ ] Mock table + mock widgets compose from shared `ui/` components only
- [ ] Sidebar shows 5 Member Management items only (Profile is not a nav item)
- [ ] Zero marketing file modifications
- [ ] Desktop (1280px+) and mobile drawer sidebar work

### Micro-sequence (use for every phase)

```text
1. Types        → src/types/members/ (domain) + src/types/admin/ (shell)
2. Mock hooks   → src/lib/members/hooks/
3. Section UI   → src/components/members/sections/{module}/
4. Page wire    → src/app/admin/ (thin compositors)
5. Deep links   → query param navigation (if applicable)
6. Desktop QA
7. Mobile QA
8. Phase record → docs/Development/Admin/Phase-0X-*.md
```

---

## Phase 1 — Dashboard (Operations Center)

**Status:** Not started  
**Route:** `/admin`

### Goal

Admin **entry point** — answer: *“What needs my attention today?”*

The Dashboard is an **inbox**, not an analytics dashboard.

### Build (section order)

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

**Path:** `src/components/members/sections/dashboard/`

- Workload widgets: Total Members, VIP, Pending Verification, Discord Issues, Referral Requests, Expiring Today, **Total Actions**
- **Operations Queue** (`OperationsQueue` component) — “Needs Attention” list
- **Recent Activity** — system-wide operational event feed
- **Quick Actions** — Add Member, Manual Verification, Export Members (UI stubs OK)
- **Platform Health** — Payment System, Discord Integration, Blockchain, Email, Database status indicators
- **Revenue Overview** — Super Admin only (locked for other roles)
- **Action Driven Navigation** — widget click → module route with pre-applied filter

### Deep-link examples

| Widget | Navigates to |
|--------|--------------|
| Pending Verification: 3 | `/admin/subscriptions?status=pending_verification` |
| Discord Issues: 2 | `/admin/discord?sync=failed` |
| Action Required: 18 | `/admin/members?health=needs_attention` |

Target routes may be stubs — routing contract must exist.

### Depends on

Phase 0 (`WidgetCard`, `OperationsQueue`, shell)

### Exit criteria

- [ ] Dashboard feels like an **inbox**, not a stats brochure
- [ ] Section order matches spec above
- [ ] Every workload widget deep-links with correct query params
- [ ] Operations Queue items are clickable
- [ ] “Total Actions” sums actionable items
- [ ] Revenue widget hidden or locked for non–Super Admin

---

## Phase 2 — Members (Directory)

**Status:** Complete — see [`Phase-02-Members-Directory.md`](Phase-02-Members-Directory.md)  
**Route:** `/admin/members`

### Goal

**Search and prioritization** — *“Who exists, and who needs attention?”*

Members is a **directory**, not the primary work queue.

### Build

**Path:** `src/components/members/sections/directory/`

- Statistics widgets: Total, VIP, Pending Verification (links out), Action Required, New This Month
- Lightweight table columns:
  - Discord Username (→ Profile)
  - Membership, Subscription, Discord, Referral Progress
  - Joined Date, **System Health**
- Search + filters (including `?health=` from Dashboard)
- `SystemHealthBadge` component

### System Health (display only until backend integration)

| State | Meaning |
|-------|---------|
| Healthy | All module states green |
| Needs Attention | Review required (e.g. pending verification) |
| Action Required | Critical (e.g. sync failed) |

Mock-computed in UI until NestJS hooks land.

### Depends on

Phase 0 (`DataTable`, `SystemHealthBadge`) + Phase 1 (deep-link from Dashboard)

### Exit criteria

- [x] Search member by Discord username or email
- [x] System Health column visible on every row
- [x] Username click opens `/admin/members/[id]`
- [x] Dashboard “Action Required” opens filtered member list

---

## Phase 3 — User Profile (Control Center)

**Status:** Complete  
**Route:** `/admin/members/[id]`
**Phase record:** [`Phase-03-User-Profile.md`](Phase-03-User-Profile.md)

### Goal

**Heart of the dashboard** — read-only operational snapshot for one member.

### Identity rules

- Discord identity is primary (avatar, username, email)
- **No Full Name field**
- **No profile photo upload**
- **One Joined Date only** — no duplicate date fields

### Build

**Reflection components only** (`src/components/members/sections/profile/`):

- `ProfileHeader` — identity + 4 status widgets
- `MembershipCard`, `SubscriptionCard`, `DiscordCard`, `ReferralCard` — **read-only**
- `NotesCard`, `ActivityTimeline`, `ProfileTabs`
- Every card: **Manage [Module] →** link to owning module
- Footer note: aggregated from modules; changes happen in management sections

### Critical rule

**No** approve, reject, sync, or validation actions on this page.  
Management stays in domain modules (Phases 4–6).

### Depends on

Phase 2 (navigation from Members table)

### Exit criteria

- [x] Open a member — see full cross-module state on Overview tab
- [x] All “Manage →” links route to correct module (stubs OK)
- [x] Mobile: stacked cards, scrollable tabs, bottom nav shell
- [x] Identity rules enforced (Discord-primary, one joined date)

### Why before Phases 4–6

Every domain workflow **returns here**. Subscriptions without Profile leaves admins with no sensible destination after approving a payment.

---

## Phase 4 — Subscriptions (First domain module)

**Status:** Not started  
**Route:** `/admin/subscriptions`

### Goal

First **ticket processor** — payment verification and VIP activation.

### Subscription display states

| State | Meaning |
|-------|---------|
| Successful | Payment approved — VIP activated |
| Pending Verification | Awaiting auto or manual verification |
| Verification Required | Auto verification failed — admin action needed |
| Rejected | Admin rejected payment |

**No Expired state** in Subscriptions — expiration belongs to Membership lifecycle.

### Build

**Management components** (`src/components/members/sections/subscriptions/`):

- `SubscriptionWidgets`, `SubscriptionFilters`, `SubscriptionTable`
- `SubscriptionDetails` (desktop panel)
- `SubscriptionTimeline`, `SubscriptionActions` (Approve, Reject, Resolve Dispute)
- Mobile: list → full-screen detail page

### Workflow loop

```text
Dashboard (Pending: 3) → Subscriptions (filtered) → Approve → Profile shows VIP Active → Dashboard counter decreases
```

### Depends on

Phases 0–3 (shell, inbox links, return to Profile)

### Exit criteria

- [ ] Full desktop: table + side details panel
- [ ] Full mobile: list + detail with action buttons
- [ ] Approve and Reject confirmation modals
- [ ] Open Member Profile + BSC Explorer links work
- [ ] Matches design reference for subscriptions module

---

## Phase 5 — Discord

**Status:** Not started  
**Route:** `/admin/discord`

### Goal

Second ticket processor — TraderCity ↔ Discord synchronization.

### Principle

Backend decides. Discord executes. Database is source of truth.

### Build

**Path:** `src/components/members/sections/discord/`

- Widgets: Connected, VIP, Sync Issues, Pending Invites
- Table: Role, Connection Status, Sync Status, Last Sync
- Details: role history, linked membership, Sync Now, Send Invite

### Depends on

Phase 4 (linked membership in details panel)

### Exit criteria

- [ ] Sync Issues widget → filtered Discord table
- [ ] Sync Now action (mock) updates Profile Discord card
- [ ] Open Member Profile from details panel

---

## Phase 6 — Referrals

**Status:** Not started  
**Route:** `/admin/referrals`

### Goal

Third ticket processor — referral validation and redemption.

### Build

**Path:** `src/components/members/sections/referrals/`

### Business rules

- $10 credit per successful referral
- 6 successful referrals required for redemption
- Admin validates → membership extended on approval
- Referrals never change subscription directly

### Depends on

Phase 4 (membership extension ties to subscription state)

### Exit criteria

- [ ] Referral Requests queue → filtered referral table
- [ ] Approve redemption (mock) extends membership
- [ ] Profile Referral card reflects updated progress

---

## Cross-cutting: Polish + Backend Integration

Apply throughout Phases 0–6 — not a separate build gate.

| Area | When |
|------|------|
| Mobile hardening | Each phase exit criteria |
| Accessibility | Each phase exit criteria |
| NestJS hook integration | Replace mocks as endpoints land |
| System Health server-side | Phase 2+ (backend when available) |
| Cross-module state refresh | Phases 4–6 after admin actions |
| Pagination / performance | All table modules |

### Production readiness checklist (after Phase 6)

- [ ] All hooks have live API integration (or documented TODO with endpoint map)
- [ ] No localStorage persistence
- [ ] Homepage Freeze maintained throughout
- [ ] `npm run build` passes
- [ ] Desktop + mobile QA complete for Phases 0–6

---

## Admin daily workflow (what the sequence mirrors)

### Resolution path (work queue)

```text
1. Open Dashboard           (Phase 1)
2. See "3 Pending"          (Phase 1)
3. Click → Subscriptions    (Phase 4)
4. Approve payment
5. Open Member Profile      (Phase 3)
6. Confirm VIP Active
7. Back to Dashboard        (Phase 1) — counter now 0
```

### Lookup path (directory)

```text
Dashboard → Members (Phase 2) → Search → Profile (Phase 3) → Manage Discord (Phase 5)
```

Build order follows the same paths the admin will walk.

---

## Rules for organized development

| Rule | Rationale |
|------|-----------|
| **One phase at a time** | Avoid half-built shell + half-built modules |
| **Exit criteria gate** | Do not start Phase N+1 until Phase N checklist passes |
| **Homepage Freeze** | Admin branch never touches marketing files |
| **Dashboard UI Design Freeze** | Approved `/admin` is the official design language — do not redesign; Phases 2–6+ inherit shell, widgets, panels, spacing |
| **Pages stay thin** | `page.tsx` composes module components only |
| **Mock data per phase** | Typed seeds in `lib/members/hooks/` with NestJS TODOs |
| **Document each phase** | Create `Phase-0X-*.md` record when phase completes |
| **No cross-imports** | Marketing components never imported into admin |
| **Reflection vs Management** | Profile cards read-only; actions in domain modules |
| **Scope boundary** | Do not build Phases 7–9 during Member Management work |
| **Sidebar authority** | Architecture flowchart > UI mockup sidebars |
| **Folder rule** | Domain sections in `members/sections/` — not `admin/modules/` or `admin/sections/` |

---

## What not to do

| Anti-pattern | Consequence |
|--------------|-------------|
| Skip Phase 0, jump to Subscriptions | One-off UI, massive rework |
| Build Profile after Discord | No return hub for workflows |
| Build Dashboard last | Modules exist with no inbox routing |
| Redesign admin pages after Dashboard approval | Breaks design freeze — reuse `/admin` system instead |
| Implement backend in Phases 0–4 | UI flows unproven; integration churn |
| Embed approve actions in Profile cards | Breaks Management vs Reflection |
| Add Settings/Reports to sidebar now | Scope creep — deferred to future areas |
| Copy mockup sidebar verbatim | Includes out-of-scope items |

---

## Phase status tracker

Update this table as phases complete. Mirror summary in [`PROJECT_STATUS.md`](PROJECT_STATUS.md).

| Phase | Name | Status | Phase record |
|-------|------|--------|--------------|
| Pre-work | Documentation | Complete | ch. 07 + this roadmap |
| 0 | Admin Foundation | Complete | Phase-00-Admin-Foundation.md |
| 1 | Dashboard (Operations Center) | Complete | Phase-01-Dashboard.md |
| 2 | Members Directory | Complete | [`Phase-02-Members-Directory.md`](Phase-02-Members-Directory.md) |
| 3 | User Profile (Control Center) | Complete | [`Phase-03-User-Profile.md`](Phase-03-User-Profile.md) |
| 4 | Subscriptions | Not started | — |
| 5 | Discord | Not started | — |
| 6 | Referrals | Not started | — |
| 7 | Reports, Community, Media | **Deferred** | Website Content Management |
| 8 | Settings | **Deferred** | Future config area |
| 9 | Notifications, Audit Logs | **Deferred** | Future Analysts / system |

---

## Appendix — Deferred modules (Phases 7–9)

Preserved for future product areas. **Do not implement during Member Management (Phases 0–6).**

### Phase 7 — Reports, Community, Media Library

**Future home:** Website Content Management  
**Routes (future):** `/admin/reports`, `/admin/community`, `/admin/media`  
Educational content, community management, media library.

### Phase 8 — Settings

**Future home:** Configuration area (TBD)  
**Route (future):** `/admin/settings`  
Platform configuration: wallet, blockchain, plans, pricing, discounts, referral config, Discord config, email templates.

### Phase 9 — Notifications, Audit Logs

**Future home:** Analysts or system-wide ops (TBD)  
**Routes (future):** `/admin/notifications`, `/admin/audit-logs`  
System notifications and audit trail.

---

## Next step

Begin **Phase 0: Admin Foundation** on branch `feat/admin-payments-subscriptions`.

Before coding:

1. Read [`07_Vision_Before_Implementation.md`](../../AI/Agents/Admin/07_Vision_Before_Implementation.md)
2. Read [`05_Operations_Center_Vision_Report.md`](../../AI/Agents/Admin/05_Operations_Center_Vision_Report.md)
3. Read [`06_Application_Isolation_and_Folder_Architecture.md`](../../AI/Agents/Admin/06_Application_Isolation_and_Folder_Architecture.md)
4. Confirm Homepage Freeze is understood
5. Confirm sidebar = 5 items only (no Phases 7–9 links)

When Phase 0 completes, create `Phase-00-Admin-Foundation.md` in this folder with files changed, acceptance checklist, and any technical debt notes.
