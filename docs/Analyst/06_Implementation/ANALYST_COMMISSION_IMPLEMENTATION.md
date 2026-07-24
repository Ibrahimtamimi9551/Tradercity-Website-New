# Phase 05 / Wave F — Commission & Financial Operations Implementation Report

**Version:** 1.3  
**Status:** Complete (mock-first frontend · operational UX refinement)  
**Date:** July 25, 2026  
**Authority:** `docs/Analyst/06_Implementation/`  
**Plan reference:** [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md) Stage 1 Wave F  
**Architecture:** [`../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md)

---

## Governance framing

| Item | Value |
|------|-------|
| Roadmap item | Analyst Platform — Stage 1 Wave F Commission & Financial Operations |
| Owning domain | `analyst` |
| Allowed paths | `src/components/analysts/sections/commissions/**` · `src/lib/analysts/mock/commissions*.ts` · `src/lib/analysts/hooks/useAnalystCommissions.ts` · `src/lib/analysts/format-commissions.ts` · `src/types/analysts/commissions.ts` · thin nav/routes · Control Center / Directory enrichment · Referrals cross-links · `docs/Analyst/**` |

**Freeze note:** Explicit product-owner override (continuing Stage 1 after Waves A–E). Completes Stage 1 operational foundation.

---

## Philosophy

Commission is a **Financial Operations** domain — not an earnings vanity dashboard.

* Consumes Referral performance (identity · conversions · plan counts)  
* Owns earnings amounts · Ready/Paid lifecycle · Due Amount carry-forward · payouts · wallet · tx hash · audit timeline  
* Manual USDT BEP-20 settlement (platform records; blockchain pays)  
* Frontend never calculates production commission math (mock values are NestJS stand-ins)  
* Admin UX mirrors real TraderCity ops — minimize accounting complexity  

---

## What shipped

| Capability | Result |
|------------|--------|
| Sidebar | Commission first-class after Referrals |
| Domain views | Dashboard · Directory · Payouts · History (**no Lines tab**) |
| Lifecycle | Ready for Payment → Paid (approval is acknowledgement only) |
| Due Amount | Unpaid prior-cycle amounts carry forward |
| Credit model | Monthly $10 · Quarterly $30 · Yearly $60 · **no Lifetime** |
| Directory table | Business · Tier · Gross · Analyst Share · Due · Last Payment · Status |
| Directory inspector | Slim — Identity · Billing Cycle · Payment Summary (no tier progress) |
| Dashboard workspace | Full audit — billing · summary · breakdown · Referral Commission Records · timeline · payment |
| Payouts | Search → one analyst · operational labels · optional evidence upload · Mark Paid |
| History | Payout Date → Analyst → Gross → Referrals → Share split → Status → Tx → Wallet |
| Wallet | USDT · BNB Smart Chain (BEP-20) · copy |
| Analyst Profile | Control Center Commissions tab + Overview card + Directory Inspector summary |
| Mock scenarios | No earnings · ready · overdue due · paid · multi-cycle · mixed plans · large history · suspended |
| Referrals | Ready-for-payment card links into Commission domain |

---

## Lifecycle

```text
Monthly Billing Cycle
  → Business Generated
  → Commission Generated
  → Ready for Payment
  → Manual USDT transfer (ops wallet)
  → Tx hash (+ optional evidence) → Paid
  → History (append-only)

Unpaid prior cycle → Due Amount (carried forward)
```

---

## Source ownership

```text
src/types/analysts/commissions.ts
src/lib/analysts/mock/commissions.ts
src/lib/analysts/mock/commissions-mutations.ts
src/lib/analysts/hooks/useAnalystCommissions.ts
src/lib/analysts/format-commissions.ts
src/components/analysts/sections/commissions/**
src/app/admin/analysts/commissions/**
(+ nav-config · Control Center · Directory · Referrals cross-links)
```

---

## URL contract

```text
/admin/analysts/commissions
/admin/analysts/commissions?commission=acom-a-002
/admin/analysts/commissions?view=directory&status=ready
/admin/analysts/commissions?view=directory&status=overdue
/admin/analysts/commissions?view=directory&commission=acom-a-002
/admin/analysts/commissions?view=payouts
/admin/analysts/commissions?view=history
/admin/analysts/commissions/acom-a-002
/admin/analysts/{id}?tab=commissions
```

Legacy `status=pending|approved` query values map to `ready`.

---

## Exit criteria

| Criterion | Result |
|-----------|--------|
| Dedicated Financial Operations domain | **Met** |
| Dashboard · Directory · Payouts · History | **Met** |
| Consumes Referrals (no duplicated referral logic) | **Met** |
| Operational Ready/Paid + Due Amount model | **Met** |
| Slim Directory inspector + Dashboard workspace | **Met** |
| Analyst Profile commission summary | **Met** |
| Manual crypto payout workflow (mock) | **Met** |
| Optional payment evidence on payout | **Met** |
| Revenue split + tier % + wallet + tx hash | **Met** |
| Mock coverage of major states | **Met** |
| Docs synchronized | **Met** |

---

## Documentation updated

* [`../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md)  
* [`../04_Admin/COMMISSION_MANAGEMENT.md`](../04_Admin/COMMISSION_MANAGEMENT.md)  
* [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md)  
* [`CHANGELOG.md`](./CHANGELOG.md)  
* [`../00_Overview/PROJECT_STATUS.md`](../00_Overview/PROJECT_STATUS.md)  
* [`../00_Overview/ANALYST_DOCUMENTATION_INDEX.md`](../00_Overview/ANALYST_DOCUMENTATION_INDEX.md)  
* [`../03_Frontend/COMPONENT_HIERARCHY.md`](../03_Frontend/COMPONENT_HIERARCHY.md)  
* [`../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md)  
* [`../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md`](../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md)  
* [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)  

---

## Backend impact (reserved)

NestJS later owns calculation, tier assignment, payout generation, due-amount carry-forward, tx recording, evidence storage, append-only ledger, partner dashboard sync.  
See API Expectations § Commission.

---

## Next recommended work

**Stage 1 complete.**

Do **not** move directly into the partner Analyst Dashboard.

Recommended next phase (docs / architecture):

* Analyst Activity Tracking  
* Working Status Model  
* Feature Documentation  
* Dashboard Data Contracts  
* Backend Synchronization Strategy  

Only after those are finalized should development begin on the Analyst Dashboard as a real-time aggregation layer over completed operational domains.
