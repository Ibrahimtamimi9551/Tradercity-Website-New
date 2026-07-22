# Analyst Frontend — Component Hierarchy

**Version:** 1.3  
**Status:** Active  
**Authority:** `docs/Analyst/03_Frontend/`  
**Module docs:** [`DIRECTORY_ARCHITECTURE.md`](./DIRECTORY_ARCHITECTURE.md) · [`DASHBOARD_ARCHITECTURE.md`](./DASHBOARD_ARCHITECTURE.md) · [`CONTROL_CENTER_ARCHITECTURE.md`](./CONTROL_CENTER_ARCHITECTURE.md)  
**Last Updated:** July 23, 2026

---

## Source tree (implemented)

```text
src/app/admin/analysts/
  page.tsx                          # Dashboard
  directory/page.tsx                # Directory
  [id]/page.tsx                    # Control Center (Wave A)
  applications|verification|partnerships|referrals|commissions/page.tsx  # shells

src/components/analysts/sections/
  dashboard/
    AnalystDashboardPage.tsx
    AnalystOperationalWidgets.tsx
    AnalystOperationsQueueSection.tsx
    AnalystRecentActivity.tsx
  directory/
    AnalystsDirectoryPage.tsx
    AnalystDirectoryWidgets.tsx
    AnalystDirectoryFiltersBar.tsx
    AnalystsTable.tsx
    AnalystDirectoryDetails.tsx     # Quick Inspector
    AnalystRowActions.tsx           # ⋮ menu (Wave A)
  control-center/
    AnalystControlCenterView.tsx
    AnalystControlCenterPage.tsx
    ControlCenterHeader.tsx
    ControlCenterTabs.tsx
    ControlCenterOverview.tsx
    ControlCenterAdministration.tsx
    ControlCenterNotes.tsx
    ControlCenterPlaceholders.tsx
    SuspendPartnershipModal.tsx

src/lib/analysts/
  mock/dashboard.ts
  mock/directory-analysts.ts
  mock/control-center.ts
  hooks/useAnalystsDirectory.ts
  hooks/useAnalystControlCenter.ts
  format-control-center.ts

src/types/analysts/
  dashboard.ts
  directory.ts
  control-center.ts
```

---

## Planned source tree (later waves)

```text
src/app/admin/analysts/
  discord/page.tsx
  applications/[id]/page.tsx

src/components/analysts/sections/
  applications/
  discord/
```

---

## Directory composition

```text
AnalystsDirectoryPage
  → AdminMasterDetail
       list: … → AnalystsTable (+ AnalystRowActions)
       detail: AnalystDirectoryDetails (Inspector)
```

Identity Link → `/admin/analysts/[id]`

---

## Control Center composition

```text
AnalystControlCenterView
  → AnalystControlCenterPageContent
       → Header · Tabs · Overview | Administration | Notes | placeholders
       → SuspendPartnershipModal
```

UX pattern: [`OPERATIONAL_UX_PATTERN.md`](./OPERATIONAL_UX_PATTERN.md)

---

## Shared Admin primitives (not Analyst-owned)

`AdminShell` · `AdminSidebar` · `AdminMobileNav` · `AdminMasterDetail` · `AdminDirectoryPanel` · `DataTable` · `WidgetCard` · `StatusBadge` · `SystemHealthBadge` · `Pagination` · `ModulePlaceholder` · `SelectField`

Nav config: `src/components/admin/layout/nav-config.ts` (`ADMIN_NAV_DOMAINS`)

---

## Composition rules

1. Thin `app/admin/analysts/**` routes  
2. Domain UI only under `components/analysts/sections/**`  
3. Never nest Analyst sections under `components/members/**` or `admin/modules/`
