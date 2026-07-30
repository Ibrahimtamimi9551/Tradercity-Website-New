# Component Map

**Version:** 1.2  
**Status:** Active  
**Authority:** `docs/Analyst/07_Partner_Dashboard/`

---

## Shell

| Component | Path | Role |
|-----------|------|------|
| Route page | `src/app/analyst/dashboard/page.tsx` | Thin entry |
| `AnalystDashboard` | `src/analyst/dashboard/AnalystDashboard.tsx` | Shell root |
| `AnalystDashboardBackground` | `…/AnalystDashboardBackground.tsx` | Purple atmosphere |
| `AnalystDashboardContent` | `…/AnalystDashboardContent.tsx` | Registry composition (business order) |

---

## Data & UI plumbing

| Component | Path | Role |
|-----------|------|------|
| `AnalystDashboardProvider` | `context/AnalystDashboardProvider.tsx` | One projection load |
| `useAnalystDashboardContext` | `context/useAnalystDashboardContext.ts` | Module consumption |
| `analystDashboardService` | `services/analyst-dashboard.service.ts` | Projection facade |
| `dashboard-ui-state` | `state/dashboard-ui-state.ts` | Expandables / modals |
| `analystTheme` | `theme/analyst-theme.ts` | Purple tokens |
| `AreaChart` | `surfaces/AreaChart.tsx` | Smooth curves · tooltip · draw animation |
| `CountUp` | `ui/CountUp.tsx` | Metric count-up |
| `HeroIllustration` | `ui/HeroIllustration.tsx` | Partnership / growth SVG |
| `WalletModal` | `ui/WalletModal.tsx` | Edit → validate → confirm → save |
| `PayoutFlowModal` | `ui/PayoutFlowModal.tsx` | Confirm → loading → success |
| `mergeDisplayProjection` | `utils/display-projection.ts` | UI mock overlays on Management projection |
| Surface helpers | `surfaces/*` | Glass / opaque card helpers |

---

## Module registry (`modules/index.ts`)

| Export | Business question |
|--------|-------------------|
| `HeroModule` | Handshake / growth illustration — workspace welcome |
| `OverviewModule` | `BarChart3` — clean metrics |
| `PerformanceSnapshotModule` | `ActivitySquare` — analytics funnel |
| `ReferralGrowthModule` | `Network` — growth chart |
| `ReferralSummaryModule` | `Share2` — plan membership cards |
| `CommissionMilestonesModule` | `Trophy` — Bronze→Diamond tiers |
| `CommissionOverviewModule` | `Coins` — financial + breakdown accordion |
| `PayoutModule` | `Wallet` — balance + request CTA |
| `RequestStatusModule` | `ClipboardList` — timeline + invoice |
| `RecentPayoutsModule` | `History` — recent + expandable history |
| `HelpSupportModule` | `HeadphonesIcon` — policy / FAQ / contact |

---

## Isolation

Partner components must not import Admin UI primitives. Loading/empty states are local.
