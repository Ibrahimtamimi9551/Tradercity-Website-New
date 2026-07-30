# Analyst Platform — Project Status

**Last Updated:** July 26, 2026  

**Documentation root:** [`docs/Analyst/`](../)  

**Index:** [`ANALYST_DOCUMENTATION_INDEX.md`](./ANALYST_DOCUMENTATION_INDEX.md)  

**Vocabulary:** [`PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md)  

**Docs sync rule:** [`../06_Implementation/DOCUMENTATION_SYNC_RULE.md`](../06_Implementation/DOCUMENTATION_SYNC_RULE.md)  

**Canonical roadmap:** [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)

---

## Current Project

```text
Analyst Platform
Stage 1
Operational Foundation
```

| Field | Value |
|-------|-------|
| Platform | Analyst Platform |
| Stage | Stage 1 — Operational Foundation |
| Delivery mode | Mock-first Admin frontend |
| Backend | Not started (`TODO(NestJS)` on hooks) |

---

## Completed Modules

```text
✓ Control Center
✓ Applications
✓ Discord
✓ Onboarding
✓ Referrals
✓ Commission
```

| Module | Architecture | Implementation report | Status |
|--------|--------------|----------------------|--------|
| Control Center | [`CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md) | [`ANALYST_CONTROL_CENTER_IMPLEMENTATION.md`](../06_Implementation/ANALYST_CONTROL_CENTER_IMPLEMENTATION.md) | Complete (mock) |
| Applications | [`APPLICATIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md) | [`ANALYST_APPLICATIONS_IMPLEMENTATION.md`](../06_Implementation/ANALYST_APPLICATIONS_IMPLEMENTATION.md) | Complete (mock) |
| Discord | [`DISCORD_MODULE_ARCHITECTURE.md`](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md) | [`ANALYST_DISCORD_IMPLEMENTATION.md`](../06_Implementation/ANALYST_DISCORD_IMPLEMENTATION.md) | Complete (mock) |
| Onboarding | [`ONBOARDING_MODULE_ARCHITECTURE.md`](../03_Frontend/ONBOARDING_MODULE_ARCHITECTURE.md) | [`ANALYST_ONBOARDING_IMPLEMENTATION.md`](../06_Implementation/ANALYST_ONBOARDING_IMPLEMENTATION.md) | Complete (mock) |
| Referrals | [`REFERRALS_MODULE_ARCHITECTURE.md`](../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md) | [`ANALYST_REFERRALS_IMPLEMENTATION.md`](../06_Implementation/ANALYST_REFERRALS_IMPLEMENTATION.md) | Complete (mock) |
| Commission | [`COMMISSIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md) | [`ANALYST_COMMISSION_IMPLEMENTATION.md`](../06_Implementation/ANALYST_COMMISSION_IMPLEMENTATION.md) | Complete (mock) |

Supporting Admin surfaces (also shipped, mock):

| Surface | Architecture / record | Status |
|---------|----------------------|--------|
| Admin Analyst Dashboard | [`DASHBOARD_ARCHITECTURE.md`](../03_Frontend/DASHBOARD_ARCHITECTURE.md) · [`ANALYST_DASHBOARD_IMPLEMENTATION.md`](../06_Implementation/ANALYST_DASHBOARD_IMPLEMENTATION.md) | Complete (mock) |
| Analyst Directory | [`DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md) · [`ANALYST_DIRECTORY_IMPLEMENTATION.md`](../06_Implementation/ANALYST_DIRECTORY_IMPLEMENTATION.md) | Complete (mock) |
| Section nav + shells | [`ANALYST_ADMIN_NAVIGATION_IMPLEMENTATION.md`](../06_Implementation/ANALYST_ADMIN_NAVIGATION_IMPLEMENTATION.md) | Complete |
| Architecture refinement (docs) | [`ANALYST_ARCHITECTURE_REFINEMENT_IMPLEMENTATION.md`](../06_Implementation/ANALYST_ARCHITECTURE_REFINEMENT_IMPLEMENTATION.md) | Complete (docs) |

---

## Current Progress

```text
Stage 1
100%
Completed
```

Stage 1 Operational Foundation (Control Center → Applications → Discord → Onboarding → Referrals → Commission) is **complete** at mock-first frontend maturity.

---

## Remaining Work

Do not treat these as historical delivery labels — they are the next **business modules** and integration tracks:

```text
Activity Tracking
Working Status
Analyst Dashboard
Backend Integration
API Contracts
Production Data
Disputes
```

| Workstream | Notes |
|------------|-------|
| Contribution / Activity Tracking | Stage 2 Intelligence — contracts in Partner Dashboard docs bridge; engines deferred |
| Working Status | Stage 2 Intelligence — contracts documented; engines deferred |
| Analyst Dashboard (partner-facing) | **v1 complete** (foundation + UI polish + Phase 3 mocks) — [`../07_Partner_Dashboard/`](../07_Partner_Dashboard/) · `/analyst/dashboard` |
| Backend Integration | NestJS — not started |
| API Contracts | Reserved in [`API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md) |
| Production Data | Replace mock stores |
| Disputes | Future financial / partnership edge cases |
| Automated Alerts | Deferred |
| Public landing + apply | **Phase 1 functional mock shell shipped** — [`APPLICATION_FLOW.md`](../03_Frontend/APPLICATION_FLOW.md) · [`ANALYST_PUBLIC_APPLICATION_JOURNEY_IMPLEMENTATION.md`](../06_Implementation/ANALYST_PUBLIC_APPLICATION_JOURNEY_IMPLEMENTATION.md) |
| Identity migration / merge | Future edge case |

---

## Documentation Health

| Area | Status | Notes |
|------|--------|-------|
| Architecture (`02_Product_Architecture/` · `03_Frontend/` modules) | Healthy | Module architecture docs aligned to shipped domains |
| Admin (`04_Admin/`) | Partial | Workflow + commission summary Active; partnership / alerts Planned or Draft |
| Backend (`05_Backend/`) | Draft / Planned | Contracts reserved; NestJS not started |
| Implementation Reports (`06_Implementation/`) | Healthy | Project milestones + one report per business module |

**Permanent implementation history:** [`docs/Analyst/06_Implementation/`](../06_Implementation/) only.  
`docs/Development/Analyst/` holds redirect stubs — do not author new Analyst implementation reports there.

---

## Shipped routes (Admin)

| Route | Module / surface |
|-------|------------------|
| `/admin/analysts` | Dashboard |
| `/admin/analysts/directory` | Directory |
| `/admin/analysts/[id]` | Control Center |
| `/admin/analysts/applications` | Applications (+ Onboarding view) |
| `/admin/analysts/applications/[id]` | Application / Provisioning viewer |
| `/admin/analysts/verification` | Redirect → Applications Review Queue |
| `/admin/analysts/discord` | Discord |
| `/admin/analysts/discord/[id]` | Discord details (mobile) |
| `/admin/analysts/partnerships` | Placeholder |
| `/admin/analysts/referrals` | Referrals |
| `/admin/analysts/referrals/[id]` | Referral Profile (mobile) |
| `/admin/analysts/commissions` | Commission |
| `/admin/analysts/commissions/[id]` | Commission Profile (mobile) |

---

## Target sidebar domains (Stage 1)

```text
Dashboard · Directory · Applications · Discord · Referrals · Commission
(+ Control Center via Directory)
```

Current code matches target.

---

## Source ownership (implemented)

```text
src/app/admin/analysts/**
src/components/analysts/sections/{dashboard,directory,control-center,applications,discord,referrals,commissions}/
src/lib/analysts/{mock,hooks}/
src/types/analysts/

# Public apply journey (Phase 1 mock)
src/app/analysts/**
src/app/dashboard/application/**
src/components/analysts/public/**
src/components/home/become-analyst/**

# Partner Analyst Dashboard (foundation)
src/app/analyst/dashboard/**
src/analyst/dashboard/**
```

Shared Admin shell (not Analyst-owned): `src/components/admin/**`  
Partner dashboard must not import Admin UI — consumes Management via Dashboard Projection Layer.

---

## Project evolution (milestones)

Historical phase records (project evolution — not module navigation):

| Milestone | Record |
|-----------|--------|
| Admin Navigation | [`ANALYST_ADMIN_NAVIGATION_IMPLEMENTATION.md`](../06_Implementation/ANALYST_ADMIN_NAVIGATION_IMPLEMENTATION.md) |
| Dashboard | [`ANALYST_DASHBOARD_IMPLEMENTATION.md`](../06_Implementation/ANALYST_DASHBOARD_IMPLEMENTATION.md) |
| Directory | [`ANALYST_DIRECTORY_IMPLEMENTATION.md`](../06_Implementation/ANALYST_DIRECTORY_IMPLEMENTATION.md) |
| Architecture Refinement | [`ANALYST_ARCHITECTURE_REFINEMENT_IMPLEMENTATION.md`](../06_Implementation/ANALYST_ARCHITECTURE_REFINEMENT_IMPLEMENTATION.md) |

---

## Freeze note

Stage 1 module delivery and the roadmap restructure proceeded under **explicit product-owner override** of Engineering Freeze as mock-first / architecture preparation.

Partner Analyst Dashboard Foundation proceeds under a **second, scoped PO override** (architecture · docs · scaffold · purple UI · mock projection only — no NestJS / calculation engines).

---

## Verify locally

```text
npm run dev

/
/analysts
/analysts/apply
/dashboard/free
/dashboard/application
/admin/analysts/applications?view=queue&status=new

/analyst/dashboard
/admin/analysts/commissions
```
