# Phase 03 — Analyst Directory

**Status:** Complete (mock UI) · Documentation expanded July 23, 2026  
**Module:** Analyst Directory  
**Route:** `/admin/analysts/directory`  
**Canonical module doc:** [`../03_Frontend/DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md)  
**Sync rule:** [`DOCUMENTATION_SYNC_RULE.md`](./DOCUMENTATION_SYNC_RULE.md)

---

## What changed

Shipped the Analyst Directory as an operational workspace (not CRUD):

- Types: `DirectoryAnalyst`, filters, stats (`src/types/analysts/directory.ts`)  
- Mock roster `a-001`…`a-012` + stats  
- Hook `useAnalystsDirectory` — URL-synced `q`, `status`, `tier`, `health`, `page`, `pageSize`, selection via `analyst`  
- UI: widgets → filters → table → desktop Inspector (`AdminMasterDetail`)  
- Columns: Identity, Status, Tier, Reach (+ specialization), Partnered, Health, Actions (affordance only)  
- Thin route compositor at `src/app/admin/analysts/directory/page.tsx`

---

## Why (business)

Operators need a single roster to discover partners, monitor lifecycle/health, triage via Inspector, and (soon) open Control Center. Dashboard alone cannot answer “which analysts?” Directory closes that gap and mirrors Member Directory operational patterns so Admin stays consistent.

---

## Documentation updated

| Document | Update |
|----------|--------|
| [`DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md) | **Created** — full module SoT |
| [`OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md) | **Created** — Table → Inspector → Control Center |
| [`DOCUMENTATION_SYNC_RULE.md`](./DOCUMENTATION_SYNC_RULE.md) | **Created** — mandatory docs-with-code rule |
| [`PROJECT_STATUS.md`](../00_Overview/PROJECT_STATUS.md) | Maturity, docs status, next work |
| [`ANALYST_DOCUMENTATION_INDEX.md`](../00_Overview/ANALYST_DOCUMENTATION_INDEX.md) | Catalog entries |
| [`ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md) | Directory maturity + UX pattern pointer |
| [`COMPONENT_HIERARCHY.md`](../03_Frontend/COMPONENT_HIERARCHY.md) | Directory tree detail |
| [`DASHBOARD_ARCHITECTURE.md`](../03_Frontend/DASHBOARD_ARCHITECTURE.md) | Contrast with Directory |
| [`ANALYST_ADMIN_WORKFLOW.md`](../04_Admin/ANALYST_ADMIN_WORKFLOW.md) | Directory as ops roster |
| [`API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md) | Directory list/filter/inspector expectations |
| [`ANALYST_BACKEND_INTEGRATION.md`](../02_Product_Architecture/ANALYST_BACKEND_INTEGRATION.md) | Directory-first integration order |
| [`ANALYST_DOMAIN_MODEL.md`](../02_Product_Architecture/ANALYST_DOMAIN_MODEL.md) | Directory fields note |
| [`CHANGELOG.md`](./CHANGELOG.md) | This documentation expansion |
| This file (`PHASE_03.md`) | Expanded to implementation report form |

---

## Backend impact

| Area | Expectation |
|------|-------------|
| APIs | `GET` paginated directory; preserve URL filter contract; stats for widgets |
| Entities | Analyst with lifecycle status, tier, reach, specialization, partneredAt, health |
| Events | Future: status/health/suspension changes (not required for first list API) |
| Integrations | Health may later synthesize Discord/commission signals; first API can return stored health |

Do **not** invent schemas here — see API Expectations + Domain Model.

---

## Remaining work

| Status | Item |
|--------|------|
| **Completed** | Directory UI on mocks; Inspector; filters; widgets; URL sync |
| **Pending** | NestJS list API; Action menu behaviors; Activity Status column/filter |
| **Deferred** | Control Center; identity click → `/admin/analysts/[id]`; mobile profile push |

---

## Verify

```text
/admin/analysts/directory
/admin/analysts/directory?status=active
/admin/analysts/directory?health=action_required
```
