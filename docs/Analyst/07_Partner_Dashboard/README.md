# Partner Analyst Dashboard

**Version:** 1.2  
**Status:** Active (v1 Complete — Foundation + UI polish + Phase 3 mock interactions)  
**Authority:** `docs/Analyst/07_Partner_Dashboard/`  
**Date:** July 26, 2026  

**Canonical rule:**

> **Analyst Management manages. Analyst Dashboard visualizes.**

---

## What this is

The Partner Analyst Dashboard is a **Partnership Performance Dashboard** — insight-driven, single-page, module-based. It is a **consumer** of Analyst Management — never a second source of truth.

| Surface | Role |
|---------|------|
| Admin Analyst Management | Create, approve, calculate, verify, pay, administer |
| Partner Analyst Dashboard | Reflect *my* data; limited actions (wallet / payout request) |

---

## Freeze override

Stage 1 Admin foundation is complete. This pack proceeds under an **explicit product-owner override** of Engineering Freeze for **Analyst Dashboard Foundation only**:

**In scope:** architecture · documentation · folder structure · route/UI scaffolding · module placeholders · mock projection · purple design shell · contracts/interfaces  

**Out of scope:** NestJS · database · real APIs · commission/referral/payout calculation engines · real sync pipelines  

---

## Start here

1. [`00_Dashboard_Philosophy.md`](./00_Dashboard_Philosophy.md)  
2. [`01_Architecture.md`](./01_Architecture.md)  
3. [`08_Module_Ownership.md`](./08_Module_Ownership.md)  
4. [`05_Synchronization_and_Data_Contracts.md`](./05_Synchronization_and_Data_Contracts.md)  
5. [`02_Project_Structure.md`](./02_Project_Structure.md)  

Implementation reports:

- Foundation: [`../06_Implementation/ANALYST_PARTNER_DASHBOARD_FOUNDATION_IMPLEMENTATION.md`](../06_Implementation/ANALYST_PARTNER_DASHBOARD_FOUNDATION_IMPLEMENTATION.md)  
- UI refinement: [`../06_Implementation/ANALYST_PARTNER_DASHBOARD_UI_REFINEMENT_IMPLEMENTATION.md`](../06_Implementation/ANALYST_PARTNER_DASHBOARD_UI_REFINEMENT_IMPLEMENTATION.md)

---

## Catalog

| Document | Role |
|----------|------|
| [00_Dashboard_Philosophy.md](./00_Dashboard_Philosophy.md) | Why this dashboard exists |
| [01_Architecture.md](./01_Architecture.md) | Product architecture + UI identity |
| [02_Project_Structure.md](./02_Project_Structure.md) | Source tree + isolation |
| [03_Module_Specification.md](./03_Module_Specification.md) | Module purpose + display fields |
| [04_Component_Map.md](./04_Component_Map.md) | Shell · theme · registry · provider |
| [05_Synchronization_and_Data_Contracts.md](./05_Synchronization_and_Data_Contracts.md) | Docs bridge · projection · APIs |
| [06_Implementation_Status.md](./06_Implementation_Status.md) | Status + dashboard versioning |
| [07_Future_Roadmap.md](./07_Future_Roadmap.md) | Multi-phase delivery |
| [08_Module_Ownership.md](./08_Module_Ownership.md) | Owner × editable-by matrix |

---

## Route

| Route | Purpose |
|-------|---------|
| `/analyst/dashboard` | Partner Analyst Dashboard (foundation) |

---

## Source ownership

```text
src/app/analyst/dashboard/**     # thin routes
src/analyst/dashboard/**         # partner dashboard domain
```

Do **not** import Admin UI (`src/components/admin/**`).  
Do **not** duplicate commission/referral/payout business logic.
