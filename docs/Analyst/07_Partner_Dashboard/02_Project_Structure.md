# Project Structure

**Version:** 1.0  
**Status:** Active  
**Authority:** `docs/Analyst/07_Partner_Dashboard/`

---

## Approved tree

```text
src/app/analyst/dashboard/
  page.tsx

src/analyst/dashboard/
  AnalystDashboard.tsx
  AnalystDashboardBackground.tsx
  AnalystDashboardContent.tsx
  analyst-dashboard.css
  modules/
    hero/
    overview/
    performance-snapshot/
    referral-growth/
    referral-summary/
    commission-milestones/
    commission-overview/
    payout/
    request-status/
    recent-payouts/
    help-support/
    index.ts                 # module registry
  services/
    analyst-dashboard.service.ts
  state/
    dashboard-ui-state.ts
  context/
    AnalystDashboardProvider.tsx
    useAnalystDashboardContext.ts
  theme/
    analyst-theme.ts
  ui/                              # Badge · Button · CountUp · Empty · Skeleton · modals · HeroIllustration
  types/
  constants/
  utils/                           # incl. display-projection merge
  surfaces/                        # ModulePanel · AreaChart · surface helpers
```

---

## Concern separation

| Folder | Owns |
|--------|------|
| `services/` | Business projection (display-ready data from Management) |
| `state/` | UI-only state (modals, selected period, expanded panels) |
| `context/` | One load; modules consume |
| `theme/` | Purple design tokens |
| `surfaces/` | Opaque card helpers |
| `modules/` | Presentational modules + registry |
| `types/` | Partner projection DTOs |

---

## Isolation

| Rule | Detail |
|------|--------|
| No Admin UI | Do not import `src/components/admin/**` |
| No Member ownership bleed | Do not place partner code under `src/components/dashboard/**` |
| Consume Management | May adapt `src/lib/analysts/mock/**` + types for foundation projection |
| No calc engines | Commission %, milestones, eligibility stay in Management / NestJS |

---

## Ownership domain

| Paths | Domain |
|-------|--------|
| `src/app/analyst/**` | `analyst` |
| `src/analyst/**` | `analyst` |
| `docs/Analyst/07_Partner_Dashboard/**` | `analyst` |
