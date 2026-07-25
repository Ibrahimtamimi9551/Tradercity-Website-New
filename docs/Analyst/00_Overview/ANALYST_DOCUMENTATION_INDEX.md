# Analyst Documentation Index

**Version:** 1.6  
**Status:** Active  
**Authority:** Analyst documentation subsystem (`docs/Analyst/`)  
**Last Updated:** July 26, 2026

This is the **single entry point** for all Analyst Platform documentation.

Agents and backend developers should load this index first, then only the Analyst folders required for the task.

**Platform vocabulary:** [`docs/00_Project_Governance/PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md)  
**Docs sync rule:** [`../06_Implementation/DOCUMENTATION_SYNC_RULE.md`](../06_Implementation/DOCUMENTATION_SYNC_RULE.md)  
**Canonical roadmap:** [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)  
**Project status:** [`PROJECT_STATUS.md`](./PROJECT_STATUS.md)  
**Implementation reports:** [`../06_Implementation/`](../06_Implementation/)

---

## Quick start

1. Read [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) — what exists vs planned  
2. Read [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md) — Stage 1 Program → Stage 2 Intelligence  
3. Read [`../01_Product_Vision/ANALYST_PRODUCT_VISION.md`](../01_Product_Vision/ANALYST_PRODUCT_VISION.md) — operational platform philosophy  
4. Read [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)  
5. Read [`../03_Frontend/OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md)  
6. Control Center (shipped): [`../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md)  
7. Applications (shipped): [`../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md)  
8. Onboarding / System Provisioning (shipped): [`../03_Frontend/ONBOARDING_MODULE_ARCHITECTURE.md`](../03_Frontend/ONBOARDING_MODULE_ARCHITECTURE.md)  
9. Referrals (shipped): [`../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md`](../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md)  
10. Commission Financial Ops (shipped): [`../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md)  
11. Partner Analyst Dashboard: [`../07_Partner_Dashboard/README.md`](../07_Partner_Dashboard/README.md) (docs bridge + foundation)  
12. For API work: [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)

---

## Catalog

### 00 — Overview

| Document | Status | Role |
|----------|--------|------|
| [README.md](./README.md) | Active | Folder orientation + isolation rules |
| [ANALYST_DOCUMENTATION_INDEX.md](./ANALYST_DOCUMENTATION_INDEX.md) | Active | This catalog |
| [PROJECT_STATUS.md](./PROJECT_STATUS.md) | Active | Implementation + docs progress |

### 01 — Product Vision

| Document | Status | Role |
|----------|--------|------|
| [ANALYST_PRODUCT_VISION.md](../01_Product_Vision/ANALYST_PRODUCT_VISION.md) | Active | Operational partnership platform vision |
| [ANALYST_BUSINESS_MODEL.md](../01_Product_Vision/ANALYST_BUSINESS_MODEL.md) | Active | Incentives, commissions, TraderCity infrastructure |
| [ANALYST_USER_LIFECYCLE.md](../01_Product_Vision/ANALYST_USER_LIFECYCLE.md) | Active | Lifecycle · evaluations · Discord trigger · Activity |

### 02 — Product Architecture

| Document | Status | Role |
|----------|--------|------|
| [ANALYST_ECOSYSTEM_ARCHITECTURE.md](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md) | Active | Canonical ecosystem + Admin IA + locked decisions |
| [ANALYST_DOMAIN_MODEL.md](../02_Product_Architecture/ANALYST_DOMAIN_MODEL.md) | Active | Core entities & relationships (product-level) |
| [ANALYST_DATA_FLOW.md](../02_Product_Architecture/ANALYST_DATA_FLOW.md) | Draft | High-level data movement |
| [ANALYST_BACKEND_INTEGRATION.md](../02_Product_Architecture/ANALYST_BACKEND_INTEGRATION.md) | Draft | Frontend→backend integration posture |

### 03 — Frontend

| Document | Status | Role |
|----------|--------|------|
| [OPERATIONAL_UX_PATTERN.md](../03_Frontend/OPERATIONAL_UX_PATTERN.md) | Active | Table → Inspector → Control Center (platform rule) |
| [DASHBOARD_ARCHITECTURE.md](../03_Frontend/DASHBOARD_ARCHITECTURE.md) | Active | Admin Analyst Dashboard (shipped mock) |
| [DIRECTORY_ARCHITECTURE.md](../03_Frontend/DIRECTORY_ARCHITECTURE.md) | Active | Directory roster · Inspector · Activity Status (Stage 2) |
| [CONTROL_CENTER_ARCHITECTURE.md](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md) | Active | Per-analyst ops hub — shipped (mock) |
| [APPLICATIONS_MODULE_ARCHITECTURE.md](../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md) | Active | Applications domain — Dashboard + Review Queue + Onboarding |
| [DISCORD_MODULE_ARCHITECTURE.md](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md) | Active | Discord domain — Dashboard · Directory · Operations |
| [ONBOARDING_MODULE_ARCHITECTURE.md](../03_Frontend/ONBOARDING_MODULE_ARCHITECTURE.md) | Active | System Provisioning under Applications |
| [REFERRALS_MODULE_ARCHITECTURE.md](../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md) | Active | Referrals domain — Dashboard · Directory · Performance · Archive |
| [COMMISSIONS_MODULE_ARCHITECTURE.md](../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md) | Active | Commission Financial Operations — Dashboard · Directory · Payouts · History |
| [COMPONENT_HIERARCHY.md](../03_Frontend/COMPONENT_HIERARCHY.md) | Active | Source tree & composition |
| [RESPONSIVE_STRATEGY.md](../03_Frontend/RESPONSIVE_STRATEGY.md) | Active | Desktop/mobile Admin patterns |
| [LANDING_PAGE_ARCHITECTURE.md](../03_Frontend/LANDING_PAGE_ARCHITECTURE.md) | Approved · Phase 1 shell | Public `/analysts` — required before apply (all entries) |
| [APPLICATION_FLOW.md](../03_Frontend/APPLICATION_FLOW.md) | Approved · Phase 1 shell | Public apply — never interrupt intent; member tracking after submit |

### 04 — Admin

| Document | Status | Role |
|----------|--------|------|
| [ANALYST_ADMIN_WORKFLOW.md](../04_Admin/ANALYST_ADMIN_WORKFLOW.md) | Active | Domain modules & ops philosophy |
| [PARTNERSHIP_ADMINISTRATION.md](../04_Admin/PARTNERSHIP_ADMINISTRATION.md) | Planned | Suspend / close / reactivate / Discord / commissions |
| [APPLICATION_REVIEW_PROCESS.md](../04_Admin/APPLICATION_REVIEW_PROCESS.md) | Draft | Category evaluations + score threshold |
| [APPROVAL_WORKFLOW.md](../04_Admin/APPROVAL_WORKFLOW.md) | Draft | Stage-based evaluations + pipeline |
| [AUTOMATED_ALERTS.md](../04_Admin/AUTOMATED_ALERTS.md) | Planned (deferred) | Future alerts — do not implement yet |
| [COMMISSION_MANAGEMENT.md](../04_Admin/COMMISSION_MANAGEMENT.md) | Active | Admin Financial Ops summary — see Commissions architecture |
| [PERFORMANCE_MONITORING.md](../04_Admin/PERFORMANCE_MONITORING.md) | Planned | Growth / quality / intelligence (Stage 2) |

### 05 — Backend

| Document | Status | Role |
|----------|--------|------|
| [API_EXPECTATIONS.md](../05_Backend/API_EXPECTATIONS.md) | Draft | Reserved endpoints — Directory, Control Center, evals, Discord, actions |
| [DATABASE_ENTITIES.md](../05_Backend/DATABASE_ENTITIES.md) | Planned | Reserved entity set |
| [AUTHORIZATION.md](../05_Backend/AUTHORIZATION.md) | Planned | Roles & permissions |
| [EVENTS_AND_WEBHOOKS.md](../05_Backend/EVENTS_AND_WEBHOOKS.md) | Planned | Domain events (incl. partnership + Discord) |
| [INTEGRATION_POINTS.md](../05_Backend/INTEGRATION_POINTS.md) | Draft | Discord shared infra, payments, membership |

### 06 — Implementation

| Document | Status | Role |
|----------|--------|------|
| [DOCUMENTATION_SYNC_RULE.md](../06_Implementation/DOCUMENTATION_SYNC_RULE.md) | Active | **Mandatory** docs update after every major implementation |
| [IMPLEMENTATION_ROADMAP.md](../06_Implementation/IMPLEMENTATION_ROADMAP.md) | Active | **Canonical** Stage 1 / Stage 2 sequence |
| [CHANGELOG.md](../06_Implementation/CHANGELOG.md) | Active | Chronological change log |
| [ANALYST_ADMIN_NAVIGATION_IMPLEMENTATION.md](../06_Implementation/ANALYST_ADMIN_NAVIGATION_IMPLEMENTATION.md) | Complete | Admin Navigation module report |
| [ANALYST_DASHBOARD_IMPLEMENTATION.md](../06_Implementation/ANALYST_DASHBOARD_IMPLEMENTATION.md) | Complete | Dashboard module report |
| [ANALYST_DIRECTORY_IMPLEMENTATION.md](../06_Implementation/ANALYST_DIRECTORY_IMPLEMENTATION.md) | Complete | Directory module report |
| [ANALYST_ARCHITECTURE_REFINEMENT_IMPLEMENTATION.md](../06_Implementation/ANALYST_ARCHITECTURE_REFINEMENT_IMPLEMENTATION.md) | Complete (docs) | Architecture refinement report |
| [ANALYST_CONTROL_CENTER_IMPLEMENTATION.md](../06_Implementation/ANALYST_CONTROL_CENTER_IMPLEMENTATION.md) | Complete | Control Center module report |
| [ANALYST_APPLICATIONS_IMPLEMENTATION.md](../06_Implementation/ANALYST_APPLICATIONS_IMPLEMENTATION.md) | Complete | Applications module report |
| [ANALYST_DISCORD_IMPLEMENTATION.md](../06_Implementation/ANALYST_DISCORD_IMPLEMENTATION.md) | Complete | Discord module report |
| [ANALYST_ONBOARDING_IMPLEMENTATION.md](../06_Implementation/ANALYST_ONBOARDING_IMPLEMENTATION.md) | Complete | Onboarding / System Provisioning module report |
| [ANALYST_REFERRALS_IMPLEMENTATION.md](../06_Implementation/ANALYST_REFERRALS_IMPLEMENTATION.md) | Complete | Referrals module report |
| [ANALYST_COMMISSION_IMPLEMENTATION.md](../06_Implementation/ANALYST_COMMISSION_IMPLEMENTATION.md) | Complete | Commission Financial Operations module report |
| [ANALYST_PARTNER_DASHBOARD_FOUNDATION_IMPLEMENTATION.md](../06_Implementation/ANALYST_PARTNER_DASHBOARD_FOUNDATION_IMPLEMENTATION.md) | Complete | Partner Analyst Dashboard foundation (PO freeze override) |
| [ANALYST_PARTNER_DASHBOARD_UI_REFINEMENT_IMPLEMENTATION.md](../06_Implementation/ANALYST_PARTNER_DASHBOARD_UI_REFINEMENT_IMPLEMENTATION.md) | Complete | Phase 2 UI polish + Phase 3 mock interactions |
| [ANALYST_PUBLIC_APPLICATION_JOURNEY_IMPLEMENTATION.md](../06_Implementation/ANALYST_PUBLIC_APPLICATION_JOURNEY_IMPLEMENTATION.md) | Complete | Phase 1 functional mock — landing · apply · success · member tracking · Admin queue inject |

### 07 — Partner Dashboard

| Document | Status | Role |
|----------|--------|------|
| [README.md](../07_Partner_Dashboard/README.md) | Active | Partner dashboard entry + freeze-override scope |
| [00_Dashboard_Philosophy.md](../07_Partner_Dashboard/00_Dashboard_Philosophy.md) | Active | Admin ops vs partner business center vs VIP learning |
| [01_Architecture.md](../07_Partner_Dashboard/01_Architecture.md) | Active | Projection layer · provider · purple VIP-language shell |
| [02_Project_Structure.md](../07_Partner_Dashboard/02_Project_Structure.md) | Active | `src/analyst/dashboard/**` tree |
| [03_Module_Specification.md](../07_Partner_Dashboard/03_Module_Specification.md) | Active | Module display fields |
| [04_Component_Map.md](../07_Partner_Dashboard/04_Component_Map.md) | Active | Registry · context · theme |
| [05_Synchronization_and_Data_Contracts.md](../07_Partner_Dashboard/05_Synchronization_and_Data_Contracts.md) | Active | Docs bridge · Contribution · APIs · multi-consumer |
| [06_Implementation_Status.md](../07_Partner_Dashboard/06_Implementation_Status.md) | Active | v1–v5 ladder + foundation checklist |
| [07_Future_Roadmap.md](../07_Partner_Dashboard/07_Future_Roadmap.md) | Draft | Delivery phases (finalize after design) |
| [08_Module_Ownership.md](../07_Partner_Dashboard/08_Module_Ownership.md) | Active | Module × owner × editable-by matrix |

### Assets

| Path | Role |
|------|------|
| [`../Assets/`](../Assets/) | Flowcharts, diagrams, images (placeholders ready) |

---

## Status legend

| Status | Meaning |
|--------|---------|
| **Active** | Authoritative for Analyst work |
| **Draft** | Direction set; deepen before backend build |
| **Planned** | Spec authored; implementation not started (or deferred) |
| **Complete** | Phase delivered (see Implementation) |

---

## Legacy locations (redirects only)

Analyst content previously lived under:

- `docs/04_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md` → **redirect**
- `docs/Development/Analyst/*` → **redirect**

Do not author new Analyst specs outside `docs/Analyst/`.
