# Member Management Documentation Index

**Version:** 1.0  
**Status:** Active  
**Authority:** Member Management documentation subsystem (`docs/Member Management/`)  
**Last Updated:** July 28, 2026

This is the **single entry point** for all Member Management documentation.

Agents and backend developers should load this index first, then only the Member Management folders required for the task.

**Platform vocabulary:** [`docs/00_Project_Governance/PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md)  
**Docs sync rule:** [`../06_Implementation/DOCUMENTATION_SYNC_RULE.md`](../06_Implementation/DOCUMENTATION_SYNC_RULE.md)  
**Canonical roadmap:** [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)  
**Project status:** [`PROJECT_STATUS.md`](./PROJECT_STATUS.md)  
**Implementation reports:** [`../06_Implementation/`](../06_Implementation/)

---

## Quick start

1. Read [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) — what exists vs planned  
2. Read [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md) — Phases 0–6 sequence  
3. Read [`../01_Product_Vision/MEMBER_PRODUCT_VISION.md`](../01_Product_Vision/MEMBER_PRODUCT_VISION.md) — Operations Center philosophy  
4. Read [`../02_Product_Architecture/MEMBER_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/MEMBER_ECOSYSTEM_ARCHITECTURE.md)  
5. Read [`../03_Frontend/OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md)  
6. Control Center (shipped): [`../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md)  
7. Directory (shipped): [`../03_Frontend/DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md)  
8. Dashboard (shipped): [`../03_Frontend/DASHBOARD_ARCHITECTURE.md`](../03_Frontend/DASHBOARD_ARCHITECTURE.md)  
9. Discord (shipped mock): [`../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md`](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md)  
10. Referrals (shipped mock): [`../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md`](../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md)  
11. Subscriptions (placeholder — next UI): [`../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md)  
11b. **Payment approval lifecycle (canonical):** [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)  
11c. **Membership Activation Sources (canonical):** [`../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md`](../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md)  
12. For API work: [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)

---

## Catalog

### 00 — Overview

| Document | Status | Role |
|----------|--------|------|
| [README.md](./README.md) | Active | Folder orientation + isolation rules |
| [MEMBER_DOCUMENTATION_INDEX.md](./MEMBER_DOCUMENTATION_INDEX.md) | Active | This catalog |
| [PROJECT_STATUS.md](./PROJECT_STATUS.md) | Active | Implementation + docs progress |

### 01 — Product Vision

| Document | Status | Role |
|----------|--------|------|
| [MEMBER_PRODUCT_VISION.md](../01_Product_Vision/MEMBER_PRODUCT_VISION.md) | Active | Operations Center vision |
| [MEMBER_BUSINESS_MODEL.md](../01_Product_Vision/MEMBER_BUSINESS_MODEL.md) | Active | Membership, payments, referrals |
| [MEMBER_USER_LIFECYCLE.md](../01_Product_Vision/MEMBER_USER_LIFECYCLE.md) | Active | Register → VIP → renew / expire |

### 02 — Product Architecture

| Document | Status | Role |
|----------|--------|------|
| [MEMBER_ECOSYSTEM_ARCHITECTURE.md](../02_Product_Architecture/MEMBER_ECOSYSTEM_ARCHITECTURE.md) | Active | Canonical ecosystem + Admin IA |
| [MEMBER_DOMAIN_MODEL.md](../02_Product_Architecture/MEMBER_DOMAIN_MODEL.md) | Active | Core entities & ownership |
| [MEMBER_DATA_FLOW.md](../02_Product_Architecture/MEMBER_DATA_FLOW.md) | Active | Cross-module data movement |
| [SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md) | Active | **Canonical** Verification vs Approval · activation policy |
| [MEMBERSHIP_ACTIVATION_SOURCES.md](../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md) | Active | **Canonical** Crypto · Manual · Referral Redeem · Admin / Future grants |
| [MEMBER_BACKEND_INTEGRATION.md](../02_Product_Architecture/MEMBER_BACKEND_INTEGRATION.md) | Draft | Frontend→backend integration posture |

### 03 — Frontend

| Document | Status | Role |
|----------|--------|------|
| [OPERATIONAL_UX_PATTERN.md](../03_Frontend/OPERATIONAL_UX_PATTERN.md) | Active | Table → Inspector → Control Center |
| [DASHBOARD_ARCHITECTURE.md](../03_Frontend/DASHBOARD_ARCHITECTURE.md) | Active | Admin Members Dashboard (shipped mock) |
| [DIRECTORY_ARCHITECTURE.md](../03_Frontend/DIRECTORY_ARCHITECTURE.md) | Active | Members roster · System Health |
| [CONTROL_CENTER_ARCHITECTURE.md](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md) | Active | Member Control Center — shipped (mock) |
| [SUBSCRIPTIONS_MODULE_ARCHITECTURE.md](../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md) | Active | Subscriptions domain — placeholder UI |
| [DISCORD_MODULE_ARCHITECTURE.md](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md) | Active | Discord sync domain — shipped (mock) |
| [REFERRALS_MODULE_ARCHITECTURE.md](../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md) | Active | Referrals Ops + Intelligence — shipped (mock) |
| [COMPONENT_HIERARCHY.md](../03_Frontend/COMPONENT_HIERARCHY.md) | Active | Source tree & composition |
| [RESPONSIVE_STRATEGY.md](../03_Frontend/RESPONSIVE_STRATEGY.md) | Active | Desktop/mobile Admin patterns |

### 04 — Admin

| Document | Status | Role |
|----------|--------|------|
| [MEMBER_ADMIN_WORKFLOW.md](../04_Admin/MEMBER_ADMIN_WORKFLOW.md) | Active | Domain modules & ops philosophy |
| [SUBSCRIPTION_ADMINISTRATION.md](../04_Admin/SUBSCRIPTION_ADMINISTRATION.md) | Draft | Payment tickets · approve / reject |
| [DISCORD_ADMINISTRATION.md](../04_Admin/DISCORD_ADMINISTRATION.md) | Active | Sync tickets · role mirroring |
| [REFERRAL_ADMINISTRATION.md](../04_Admin/REFERRAL_ADMINISTRATION.md) | Active | Credits · redeem · intelligence |

### 05 — Backend

| Document | Status | Role |
|----------|--------|------|
| [API_EXPECTATIONS.md](../05_Backend/API_EXPECTATIONS.md) | Draft | Reserved endpoints from frontend hooks |
| [DATABASE_ENTITIES.md](../05_Backend/DATABASE_ENTITIES.md) | Planned | Reserved entity set |
| [AUTHORIZATION.md](../05_Backend/AUTHORIZATION.md) | Planned | Roles & permissions |
| [EVENTS_AND_WEBHOOKS.md](../05_Backend/EVENTS_AND_WEBHOOKS.md) | Planned | Domain events |
| [INTEGRATION_POINTS.md](../05_Backend/INTEGRATION_POINTS.md) | Draft | Discord, payments, membership |

### 06 — Implementation

| Document | Status | Role |
|----------|--------|------|
| [DOCUMENTATION_SYNC_RULE.md](../06_Implementation/DOCUMENTATION_SYNC_RULE.md) | Active | **Mandatory** docs update after major work |
| [IMPLEMENTATION_ROADMAP.md](../06_Implementation/IMPLEMENTATION_ROADMAP.md) | Active | **Canonical** Phases 0–6 sequence |
| [CHANGELOG.md](../06_Implementation/CHANGELOG.md) | Active | Chronological change log |
| [MEMBER_ADMIN_FOUNDATION_IMPLEMENTATION.md](../06_Implementation/MEMBER_ADMIN_FOUNDATION_IMPLEMENTATION.md) | Complete | Phase 0 foundation report |
| [MEMBER_DASHBOARD_IMPLEMENTATION.md](../06_Implementation/MEMBER_DASHBOARD_IMPLEMENTATION.md) | Complete | Phase 1 Dashboard report |
| [MEMBER_DIRECTORY_IMPLEMENTATION.md](../06_Implementation/MEMBER_DIRECTORY_IMPLEMENTATION.md) | Complete | Phase 2 Directory report |
| [MEMBER_CONTROL_CENTER_IMPLEMENTATION.md](../06_Implementation/MEMBER_CONTROL_CENTER_IMPLEMENTATION.md) | Complete | Phase 3 Control Center report |
| [MEMBER_SUBSCRIPTIONS_IMPLEMENTATION.md](../06_Implementation/MEMBER_SUBSCRIPTIONS_IMPLEMENTATION.md) | Shell | Phase 4 placeholder status |
| [MEMBER_DISCORD_IMPLEMENTATION.md](../06_Implementation/MEMBER_DISCORD_IMPLEMENTATION.md) | Complete | Phase 5 Discord UI report |
| [MEMBER_REFERRALS_IMPLEMENTATION.md](../06_Implementation/MEMBER_REFERRALS_IMPLEMENTATION.md) | Complete | Phase 6 Referrals UI report |

### Assets

| Path | Role |
|------|------|
| [`../Assets/`](../Assets/) | Flowcharts, diagrams, images (placeholders ready) |

---

## Status legend

| Status | Meaning |
|--------|---------|
| **Active** | Authoritative for Member Management work |
| **Draft** | Direction set; deepen before backend build |
| **Planned** | Spec authored; implementation not started (or deferred) |
| **Complete** | Phase delivered (see Implementation) |
| **Shell** | Route exists; full UI not built |

---

## Legacy locations (read-only sources)

Member content previously lived under:

- `docs/AI/Agents/Admin/*` — Agent pack (vision, specs, design freeze)
- `docs/Development/Admin/*` — Phase delivery logs
- `docs/04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md` — ownership SoT (shared)

This package **consolidates** Member Management knowledge. Do not delete legacy files. Prefer this folder for new Member Management documentation.
