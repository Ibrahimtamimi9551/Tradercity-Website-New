# TraderCity Admin Dashboard

## Chapter 02 — Frontend Design System and UX Rules

**Document Version:** 2.3  
**Status:** Living Specification — **Dashboard UI Design Frozen (July 2026)**

> Admin has its **own** design system — independent from the marketing website. Never import homepage components. See [`06_Application_Isolation_and_Folder_Architecture.md`](06_Application_Isolation_and_Folder_Architecture.md).

---

## Dashboard UI Design Freeze (AUTHORITATIVE)

**Status:** Finalized and approved — July 2026  
**Source of truth (live UI):** `/admin` — Phase 1 Dashboard Operations Center  
**Canonical implementation:**

```text
src/components/members/sections/dashboard/
src/components/admin/ui/WidgetCard.tsx
src/components/admin/ui/OperationsQueue.tsx
src/lib/admin/module-surfaces.ts
src/components/admin/layout/
```

### Rule

**DO NOT redesign the Admin interface.**

The current Dashboard visual system is the **official design language** for the entire TraderCity Admin Dashboard.

Every new module or page **must inherit** this exact visual system — do not invent new card styles, color philosophies, spacing scales, or interaction patterns.

### Applies to all present and future surfaces

| Module | Route |
|--------|-------|
| Dashboard | `/admin` |
| Members | `/admin/members` |
| User Profile | `/admin/members/[id]` |
| Subscriptions | `/admin/subscriptions` |
| Discord | `/admin/discord` |
| Referrals | `/admin/referrals` |
| Future sections | Any later admin modules |

### What is frozen (must be reused)

1. **Shell** — sidebar, header, mobile bottom nav, page background
2. **Typography** — page titles, section headers, body/meta hierarchy
3. **Statistic widgets** — `WidgetCard` accents, priority (critical / important / informational), mobile 2-up grid
4. **Module panels** — tinted gradients via `modulePanelSurface` (burgundy, navy, purple, gold, emerald)
5. **Operations patterns** — queue metrics (count + Oldest Waiting + primary CTA), activity lists, quick actions
6. **Spacing & density** — card padding, grid gaps, section rhythm
7. **Interaction** — deep links, hover treatments, CTA styles
8. **Shared primitives** — `src/components/admin/ui/*` only; no page-one-off redesigns

### What is still allowed

- New **content** and **workflows** for Phases 2–6 (tables, filters, detail panels, actions)
- Extending shared tokens/helpers when a new module needs an additional panel tone — **matching the same philosophy**
- Bug fixes, accessibility, and responsiveness that **preserve** the approved look

### What is forbidden

- Redesigning pages to look “different” or “fresher”
- Flat generic dark cards when module-colored surfaces are the standard
- New widget/card visual languages outside `WidgetCard` / `module-surfaces`
- Marketing / homepage visual patterns inside admin

**When in doubt:** match `/admin` and extend shared primitives — never fork a new aesthetic.

---

## Application Isolation (Design)

- Admin visual language: institutional, operational, data-dense but calm
- Marketing visual language: premium storytelling, hero sections, motion — **never mixed**
- Reference member-facing code for **data field names only**
- Shared shell + primitives: `src/components/admin/`
- Member Management domain: `src/components/members/sections/`

---

## Reflection vs Management Components

| Type | Location | Example |
|------|----------|---------|
| **Management** | `members/sections/{module}/` | `members/sections/subscriptions/SubscriptionActions` |
| **Reflection** | `members/sections/profile/` | `members/sections/profile/SubscriptionCard` |
| **Shared shell** | `admin/layout/`, `admin/ui/` | `AdminSidebar`, `DataTable` |

Reflection cards are read-only and link to the owning module. Never embed approve/reject actions in profile cards.

---

## Frontend Development Philosophy

The objective is not to build static pages.

The objective is to build a **reusable dashboard ecosystem**.

Every page should be composed of reusable UI components.

### Required Generic Components

| Component | Purpose |
|-----------|---------|
| Statistics Widget | Top-of-page KPI cards with filter actions |
| Search Bar | Cross-field search (username, hash, wallet) |
| Filter Bar | Status, plan, method, date range dropdowns |
| Data Table | Sortable, selectable rows with actions |
| Side Details Panel | Deep-dive on selected record (desktop) |
| Status Badge | Consistent color-coded operational states |
| Action Buttons | Context-aware primary/secondary actions |
| Information Card | Key-value summary blocks |
| Timeline Component | Vertical stepped activity log |
| Empty State | No results / no selection guidance |
| Loading State | Skeleton or spinner for async views |
| Pagination | Standard page navigation |
| Confirmation Modal | Irreversible action guard |
| User Avatar | Discord avatar with fallback |
| Internal Notes Block | Admin-only note list + add |
| Activity Feed | Operational event timeline |
| **OperationsQueue** | Needs Attention inbox on Dashboard |
| **SystemHealthBadge** | Healthy / Needs Attention / Action Required |
| **WidgetCard (clickable)** | Deep-links to filtered module on click |

Avoid creating one-off components for individual pages.

Implement shared primitives under `src/components/admin/ui/`.

---

## UI Consistency Rules

Every module should follow the same visual hierarchy.

```text
Page Header
  ↓
Statistics Widgets
  ↓
Search + Filters
  ↓
Table
  ↓
Details Panel
  ↓
Pagination
  ↓
Footer (optional)
```

The administrator should immediately understand any page because every page follows the same interaction pattern.

---

## Page Structure Contract

### Page Header

- Module title
- One-line operational subtitle (what this module manages)
- Global actions (Export, Refresh) when applicable
- Breadcrumbs on nested views (e.g., Members > User Profile)

### Statistics Widgets

- 3–4 primary KPI cards per management module
- Each widget may filter the table when clicked ("View all")
- Include trend indicator only when meaningful — avoid decorative metrics

### Search + Filters

- Search always above the table
- Filters as dropdowns or pill groups — never hidden behind excessive clicks
- Clear filters action always visible when filters are active

### Table

- Scannable columns — prioritize operational fields
- Row click opens details panel (desktop)
- Inline actions for primary workflow (Approve, View, Resolve)
- Discord username links to Member Control Center

### Details Panel

- Fixed right panel on desktop (see Subscription reference)
- Header: member identity snippet + link to full profile
- Body: key-value information + timeline
- Footer: primary actions (Open Member Profile, Open Blockchain Explorer)

---

## Design Language

| Token | Value | Usage |
|-------|-------|-------|
| Theme | Modern, Premium, Dark, Minimal, Functional | Overall tone |
| Background | Deep Space Navy `#05081A` (approx.) | Admin shell background |
| Primary Accent | Purple | Active nav, primary buttons, VIP badges |
| Secondary Accent | Gold | VIP status, referral highlights |
| Success | Green / Emerald | Active, connected, successful |
| Warning | Orange / Amber | Pending, eligible, verification queue |
| Danger | Red | Verification required, errors |
| Info | Blue | Discord-related states |

Information density should remain **low**.

Whitespace and hierarchy are preferred over excessive visual effects.

TraderCity brand tone is **institutional** — not crypto-casino, not Arena copy-paste.

### Status Badge Color Semantics

Align with member dashboard vocabulary:

| State | Color |
|-------|-------|
| Active / Successful / Connected | Emerald |
| VIP | Gold |
| Pending Verification | Amber |
| Verification Required | Red |
| Expired | Rose |
| Suspended | Amber |
| Verification queue (on-chain verified, admin pending) | Blue |

### Module Panel Color Identity

Large dashboard sections communicate **module identity through color** while keeping layout, typography, spacing, and interaction patterns unchanged.

| Panel | Tone | Helper |
|-------|------|--------|
| Operations Queue | Dark Burgundy | `modulePanelSurface("burgundy")` |
| Recent Activity | Dark Navy Blue | `modulePanelSurface("navy")` |
| Quick Actions | Deep Purple | `modulePanelSurface("purple")` |
| Revenue Overview | Dark Gold | `modulePanelSurface("gold")` |
| Platform Health | Dark Emerald | `modulePanelSurface("emerald")` |

Implementation: `src/lib/admin/module-surfaces.ts` — soft tinted gradients, light borders (no heavy frames).

### Operations Queue Metrics

Queue rows prioritize operational urgency over decorative content:

- **No** avatar stacks
- **No** descriptive subtitles
- Show **count**, **Oldest Waiting** (from oldest unresolved item), and a **primary action** CTA

---

## Component Reusability Rules

The following UI must be generic components — never page-specific duplicates:

- Widget Card
- Data Table
- Search Bar
- Filter Dropdown
- Status Badge
- Timeline
- Details Panel
- User Avatar
- Pagination
- Confirmation Modal
- Information Card

Every module reuses these components with typed props and module-specific column/action configuration.

---

## Responsive Design

Desktop is the primary experience.

Mobile is supported.

### Desktop (1280px+)

```text
Table + Details Panel (side-by-side)
Collapsible sidebar
Full filter bar
```

### Mobile (375px) — Operational First

```text
Bottom Navigation: Dashboard | Members | Subscriptions | More
        ↓
More drawer: Discord, Referrals (no Settings during Phases 0–6)
        ↓
List / Table (scrollable)
        ↓
Tap row → Full-screen detail page
        ↓
Primary actions: Approve, Resolve, Open Profile (large touch targets)
```

- Sidebar → drawer overlay on tablet/mobile
- Subscription detail on mobile: full-page with timeline + action buttons
- Member Control Center: stacked cards, horizontal scroll tabs
- Profile footer note visible on mobile
- Avoid squeezing desktop table + panel layouts

---

## Performance Philosophy

Only render information required for the current view.

- Use pagination — never render unbounded datasets
- Lazy-load details panel content on row selection
- Avoid rendering large datasets unnecessarily
- Keep interactive tables/modals in `"use client"` leaf components
- Keep admin layout server-friendly where possible

The dashboard should remain responsive even with thousands of members.

---

## Motion and Interaction

- Prefer CSS transitions for admin tables, panels, and modals
- Framer Motion is optional and subtle only (if used at all)
- Toast feedback for copy actions, approve success, and errors
- Hover states should be subtle — operational clarity over decoration

---

## Admin Shell

Based on design references and TraderCity brand:

- Collapsible sidebar with **5 Member Management items** (Dashboard, Members, Subscriptions, Discord, Referrals)
- Top navbar: search (global, future), admin avatar dropdown
- **Do not** add Settings, Reports, Notifications, or Payments to sidebar during Phases 0–6
- UI mockup sidebars showing extra items are **layout reference only**
- Optional grid background echoing member Background pattern — implement in admin layout, do not couple to member files
- Admin-scoped Tailwind or layout CSS variables — do not modify `globals.css` without coordination

---

## Empty, Loading, and Error States

Every module must handle:

| State | Behavior |
|-------|----------|
| Loading | Skeleton rows in table, skeleton in details panel |
| Empty table | Clear message + suggested action (adjust filters) |
| No row selected | Details panel shows selection prompt |
| Error | Inline error with retry — no silent failures |

---

## Accessibility

- Sufficient color contrast on dark backgrounds
- Keyboard navigable tables and modals
- Focus rings on interactive elements
- Status not conveyed by color alone — include text labels
- Copy buttons with accessible labels and toast confirmation

---

## File Organization Pattern

```text
src/app/admin/
  layout.tsx              # Admin shell — imports admin/layout components
  page.tsx                # Phase 1 — composes members/sections/dashboard
  members/
  subscriptions/
  discord/
  referrals/
  members/[id]/           # Phase 3 — composes members/sections/profile

src/components/admin/
  layout/                 # AdminSidebar, AdminHeader, AdminBackground
  ui/                     # Shared primitives (StatusBadge, DataTable, etc.)

src/components/members/
  sections/
    dashboard/            # Phase 1
    directory/            # Phase 2 — members list
    profile/              # Phase 3 — Control Center (reflection)
    subscriptions/        # Phase 4
    discord/              # Phase 5
    referrals/            # Phase 6

src/types/admin/          # Shell-only types
src/types/members/        # Domain types
src/lib/admin/            # Shell utilities (minimal)
src/lib/members/hooks/    # Domain hooks
```

**Do not** use `src/components/admin/modules/` or `src/components/admin/sections/` — domain code belongs in `members/sections/` so future admin product areas (Analysts, Content) do not duplicate paths under `admin/`.

Use **Background + Content decomposition** for admin page shells:

- `AdminBackground` (or layout-level grid) + page `Content` orchestrator
- Isolate interactive tables/modals in client leaf components
