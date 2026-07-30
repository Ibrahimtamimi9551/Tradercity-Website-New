# Partner Analyst Dashboard — Architecture

**Version:** 1.1  
**Status:** Active  
**Authority:** `docs/Analyst/07_Partner_Dashboard/`

---

## 1. Product position

**Partnership Performance Dashboard** — single page, insight-driven.

```text
Admin Analyst Management     →  operational source of truth
        ↓
Dashboard Projection Layer   →  Analyst Dashboard Service
        ↓
Partner Analyst Dashboard    →  visualization + limited actions
        ↓
Future consumers             →  Mobile · Telegram · Analyst API
```

---

## 2. Single-page module flow

```text
Hero
→ Overview
→ Performance Snapshot
→ Referral Growth
→ Referral Summary
→ Commission Milestones
→ Commission Overview (+ Monthly Earnings Trend + expandable Breakdown)
→ Payout Center
→ Request Status (+ expandable Invoice)
→ Recent Payouts
→ Help & Support
```

No left sidebar. No multi-route navigation for Phase 1.

---

## 3. Orchestration

```text
Thin route
  → AnalystDashboard (shell)
       → Background
       → AnalystDashboardProvider   (one projection load)
            → AnalystDashboardContent
                 → modules/index.ts registry
```

| Layer | Responsibility |
|-------|----------------|
| Route | Thin page only |
| Shell | Atmosphere + layout chrome |
| Provider | Load projection once; expose context |
| Content | Compose modules from registry in business order |
| Modules | One business question each; no engine math |
| Service | Project Management data → display DTOs |
| UI state | Expandable panels, modals, selected period |

---

## 4. Visual identity

VIP **structure** (shell, spacing, card geometry, responsive behaviour) + **purple as primary accent** (not monochrome purple).

| Layer | Role |
|-------|------|
| Canvas / panels | Charcoal · navy · glass elevation (`analystTheme.panelBg`) |
| Accent | Premium purple (`accent` / `accentMuted`) |
| Semantic | Success green · warning amber · info cyan · error red |
| Module personalities | analytics · growth · referral · achievement · finance · payout · support |

UI kit: `Badge` · `Button` · `EmptyState` · `Skeleton` · `CountUp` · `HeroIllustration` · modals.  
Theme: `src/analyst/dashboard/theme/analyst-theme.ts`.

---

## 5. Intentionally removed (Phase 1)

- Left sidebar navigation  
- Duplicate referral funnel card  
- Referral source / social tracking  
- Member names in referral tables  
- Top performing months card  
- Minimum payout threshold UI  
- Large payout history table  
- Announcement module  
- Decorative rocket / clutter graphics  
- Duplicate commission metrics across modules  

---

## Related

- Philosophy: [`00_Dashboard_Philosophy.md`](./00_Dashboard_Philosophy.md)  
- Module questions: [`03_Module_Specification.md`](./03_Module_Specification.md)  
- Ownership: [`08_Module_Ownership.md`](./08_Module_Ownership.md)  
