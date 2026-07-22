# Analyst Documentation Index

**Version:** 1.1  
**Status:** Active  
**Authority:** Analyst documentation subsystem (`docs/Analyst/`)  
**Last Updated:** July 23, 2026

This is the **single entry point** for all Analyst Platform documentation.

Agents and backend developers should load this index first, then only the Analyst folders required for the task.

**Platform vocabulary:** [`docs/00_Project_Governance/PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md)  
**Docs sync rule:** [`../06_Implementation/DOCUMENTATION_SYNC_RULE.md`](../06_Implementation/DOCUMENTATION_SYNC_RULE.md)  
**Phase 04 plan:** [`../06_Implementation/PHASE_04.md`](../06_Implementation/PHASE_04.md)  
**Wave A report:** [`../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md)

---

## Quick start

1. Read [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) — what exists vs planned  
2. Read [`../01_Product_Vision/ANALYST_PRODUCT_VISION.md`](../01_Product_Vision/ANALYST_PRODUCT_VISION.md) — operational platform philosophy  
3. Read [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)  
4. Read [`../03_Frontend/OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md)  
5. Control Center (shipped): [`../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md)  
6. Next coding plan: [`../06_Implementation/PHASE_04.md`](../06_Implementation/PHASE_04.md) (Wave B+)  
7. For API work: [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)

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
| [DIRECTORY_ARCHITECTURE.md](../03_Frontend/DIRECTORY_ARCHITECTURE.md) | Active | Directory roster · Inspector · Activity Status plan |
| [CONTROL_CENTER_ARCHITECTURE.md](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md) | Active | Per-analyst ops hub — Wave A shipped (mock) |
| [APPLICATIONS_MODULE_ARCHITECTURE.md](../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md) | Planned | Applications table + Viewer |
| [DISCORD_MODULE_ARCHITECTURE.md](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md) | Planned | Shared Discord infra · Analyst role |
| [COMPONENT_HIERARCHY.md](../03_Frontend/COMPONENT_HIERARCHY.md) | Active | Source tree & composition |
| [RESPONSIVE_STRATEGY.md](../03_Frontend/RESPONSIVE_STRATEGY.md) | Active | Desktop/mobile Admin patterns |
| [LANDING_PAGE_ARCHITECTURE.md](../03_Frontend/LANDING_PAGE_ARCHITECTURE.md) | Planned | Public `/analysts` |
| [APPLICATION_FLOW.md](../03_Frontend/APPLICATION_FLOW.md) | Planned | Public `/analysts/apply` |

### 04 — Admin

| Document | Status | Role |
|----------|--------|------|
| [ANALYST_ADMIN_WORKFLOW.md](../04_Admin/ANALYST_ADMIN_WORKFLOW.md) | Active | Domain modules & ops philosophy |
| [PARTNERSHIP_ADMINISTRATION.md](../04_Admin/PARTNERSHIP_ADMINISTRATION.md) | Planned | Suspend / close / reactivate / Discord / commissions |
| [APPLICATION_REVIEW_PROCESS.md](../04_Admin/APPLICATION_REVIEW_PROCESS.md) | Draft | Category evaluations + score threshold |
| [APPROVAL_WORKFLOW.md](../04_Admin/APPROVAL_WORKFLOW.md) | Draft | Stage-based evaluations + pipeline |
| [AUTOMATED_ALERTS.md](../04_Admin/AUTOMATED_ALERTS.md) | Planned (deferred) | Future alerts — do not implement yet |
| [COMMISSION_MANAGEMENT.md](../04_Admin/COMMISSION_MANAGEMENT.md) | Planned | Earnings & payouts |
| [PERFORMANCE_MONITORING.md](../04_Admin/PERFORMANCE_MONITORING.md) | Planned | Growth / quality / intelligence |

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
| [PHASE_01.md](../06_Implementation/PHASE_01.md) | Complete | Section nav + shells |
| [PHASE_02.md](../06_Implementation/PHASE_02.md) | Complete | Analyst Dashboard |
| [PHASE_03.md](../06_Implementation/PHASE_03.md) | Complete | Analyst Directory |
| [PHASE_04.md](../06_Implementation/PHASE_04.md) | Complete (docs) | Architecture refinement + Waves A–F plan |
| [PHASE_05_WAVE_A_IMPLEMENTATION.md](../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md) | Complete | Control Center Wave A implementation report |
| [CHANGELOG.md](../06_Implementation/CHANGELOG.md) | Active | Chronological change log |

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
