# TraderCity Admin Dashboard

## Chapter 02 — Frontend Design System and UX Rules

**Document Version:** 1.0  
**Status:** Living Specification

> This chapter defines reusable components, visual hierarchy, responsive behavior, and design language. Every admin screen must compose from these primitives — not one-off implementations.

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

### Mobile (375px)

```text
Table
  ↓
Tap Row
  ↓
Open Details Page (full screen)
```

Avoid squeezing desktop layouts into mobile screens.

Design mobile interactions independently.

- Sidebar becomes drawer overlay
- Tables scroll horizontally or stack gracefully
- Modals and details pages usable on small screens

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

- Collapsible sidebar with module groups (Management, Content, System)
- Top navbar: search (global, future), notifications (future), admin avatar dropdown
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

Mirror member journey architecture:

```text
src/app/admin/
  layout.tsx              # Admin shell
  members/
  subscriptions/
  members/[id]/           # Member Control Center

src/components/admin/
  layout/                 # Sidebar, Navbar, AdminBackground
  ui/                     # Shared primitives (StatusBadge, DataTable, etc.)
  members/                # Members module components
  subscriptions/          # Subscriptions module components
  member-profile/         # Member Control Center components

src/types/admin/          # Typed contracts aligned to backend
src/lib/admin/            # Hooks, formatters, API client stubs
```

Use **Background + Content decomposition** for admin page shells:

- `AdminBackground` (or layout-level grid) + page `Content` orchestrator
- Isolate interactive tables/modals in client leaf components
