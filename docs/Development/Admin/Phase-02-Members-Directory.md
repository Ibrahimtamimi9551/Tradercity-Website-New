# Phase 2 — Members (Directory)

**Status:** Complete  
**Date:** July 2026  
**Route:** `/admin/members`

## Design

Members directory **inherits** the Phase 1 Dashboard design language — no redesign.

- Widgets: `WidgetCard` accents + priority
- Filter / table panels: `modulePanelSurface`
- Shared primitives: `DataTable`, `SearchInput`, `FilterBar`, `Pagination`, `StatusBadge`, `SystemHealthBadge`, `PageTitle`

Authority: [`02_Frontend_Design_System_and_UX_Rules.md`](../../AI/Agents/Admin/02_Frontend_Design_System_and_UX_Rules.md)  
Layout source of truth: Members desktop mock (statistics → filters → table → pagination)

## Delivered

### Types + mock data
- `src/types/members/directory.ts`
- `src/lib/members/mock/directory-members.ts`
- `src/lib/members/hooks/useMembersDirectory.ts` — URL-synced filters (`q`, `membership`, `subscription`, `discord`, `referral`, `health`, `page`, `pageSize`)

### Directory sections (`src/components/members/sections/directory/`)
- `MembersDirectoryPage` — compositor (+ Suspense for search params)
- `DirectoryWidgets` — Total, VIP, Pending Verification, Action Required, New This Month
- `DirectoryFiltersBar` — search, membership / subscription / Discord / referral filters, advanced System Health, Reset
- `MembersTable` — lightweight columns including **System Health**; username → `/admin/members/[id]`

### Routes
- `/admin/members` — directory
- `/admin/members/[id]` — Phase 3 placeholder (navigation target)

### Shared UI updates
- `Pagination` — page numbers, rows-per-page
- `PageTitle` — optional icon (Members header)

## Exit criteria

- [x] Search member by Discord username or email
- [x] System Health column visible on every row
- [x] Username click opens `/admin/members/[id]`
- [x] Dashboard deep-links honor `?health=`, `?membership=`, etc.
- [x] Visual language inherited from Dashboard (no redesign)
- [x] Mobile: widgets 2-up; filters wrap; table scrolls horizontally

## Next Step

**Phase 3 — User Profile (Control Center)**  
`src/components/members/sections/profile/` — reflection hub; actions remain in domain modules.
