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
  applications/page.tsx             # Applications domain (Wave B)
  applications/[id]/page.tsx       # Application mobile detail
  discord/page.tsx                  # Discord domain (Wave C)
  discord/[id]/page.tsx            # Discord mobile detail
  verification|partnerships|referrals|commissions/page.tsx  # shells / redirects

src/components/analysts/sections/
  dashboard/
  directory/
  control-center/
    … ControlCenterDiscordPanel.tsx   # Wave C — consumes Discord domain
  applications/
  discord/
    DiscordDomainPage.tsx
    DiscordDashboardView.tsx
    DiscordDirectoryTable.tsx
    DiscordDetails.tsx
    DiscordOperationsView.tsx
    DiscordDetailView.tsx
    DiscordDomainNav.tsx
    DiscordFiltersBar.tsx

src/lib/analysts/
  mock/dashboard.ts
  mock/directory-analysts.ts
  mock/control-center.ts
  mock/applications.ts
  mock/application-mutations.ts
  mock/discord.ts
  mock/discord-mutations.ts
  mock/partnership-activation.ts
  hooks/useAnalystsDirectory.ts
  hooks/useAnalystControlCenter.ts
  hooks/useAnalystApplications.ts
  hooks/useAnalystDiscord.ts
  format-control-center.ts
  format-discord.ts

src/types/analysts/
  dashboard.ts
  directory.ts
  control-center.ts
  applications.ts
  discord.ts
```

---

## Planned source tree (later waves)

```text
src/app/admin/analysts/
  onboarding/   # Wave D (optional queue)
  referrals/    # Wave E domain (replace placeholder)
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
