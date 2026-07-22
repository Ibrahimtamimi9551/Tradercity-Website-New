# Phase 04 — Architecture Refinement & Next Implementation Plan

**Version:** 1.0  
**Status:** Complete (documentation / architecture) · Coding not started  
**Date:** July 23, 2026  
**Branch context:** Continues Analyst Admin work under product-owner freeze override (mock-first), same spirit as Phases 1–3  
**Authority:** `docs/Analyst/06_Implementation/`

---

## 0. Governance framing

| Item | Value |
|------|-------|
| Roadmap item | Analyst Platform — operational ecosystem refinement (post Directory) |
| Owning domain | `analyst` |
| Allowed paths (this phase) | `docs/Analyst/**` (docs only) |
| Next coding paths | `src/app/admin/analysts/**` · `src/components/analysts/**` · `src/lib/analysts/**` · `src/types/analysts/**` · thin nav in `src/components/admin/layout/nav-config.ts` |
| Not in scope yet | NestJS · public `/analysts` · Automated Alerts implementation |

---

## 1. What this phase delivered

Architecture review after Dashboard + Directory shipping. Goal: evolve the Analyst Platform into a true **operational partnership system** while staying consistent with Member Platform patterns.

### Locked decisions (see Ecosystem §9)

- Shared Discord infrastructure; Analyst role (not VIP); different trigger  
- Directory stays lightweight; Inspector = inspection only  
- Username → Control Center; ⋮ menu becomes operational navigation  
- Suspension / close / reactivate live in Control Center Administration  
- Applications = table + wider viewer; mobile = dedicated page  
- Structured category + stage evaluations  
- Activity Status independent of Lifecycle  
- Alerts deferred until prerequisite modules exist  
- Dashboard evolves naturally — no artificial expansion  

### Documentation created / updated

See changelog entry for 2026-07-23 Phase 04.

---

## 2. Current foundation (already shipped)

| Surface | Status |
|---------|--------|
| Analyst Dashboard | Shipped (mock) — excellent ops foundation |
| Analyst Directory + Inspector | Shipped (mock) |
| Shell routes (Applications, Verification, …) | Placeholders |
| Control Center / Discord module / Activity column | Not started |

---

## 3. Recommended coding sequence (next phases)

Do **not** start coding until this Phase 04 plan is accepted. Then proceed in order:

### Wave A — Control Center foundation ✅ **Complete**

**Report:** [`PHASE_05_WAVE_A_IMPLEMENTATION.md`](./PHASE_05_WAVE_A_IMPLEMENTATION.md)

| Step | Work | Status |
|------|------|--------|
| A1 | Route `/admin/analysts/[id]` + thin page → `control-center` section | Done |
| A2 | Types + mock projection | Done |
| A3 | Tabs: Overview · Administration · Notes implemented; others placeholders | Done |
| A4 | Directory identity click → Control Center | Done |
| A5 | ⋮ menu: Open Control Center live; other items disabled placeholders | Done |
| A6 | Administration guided Suspend flow (mock) | Done |
| A7 | Same Control Center route on mobile | Done |
| A8 | Docs sync | Done |

**Exit criteria met:** Operator can open any Directory analyst into Control Center and run a mock Suspend flow.

### Wave B — Activity Status (Directory)

| Step | Work |
|------|------|
| B1 | Add `activityStatus` (+ optional `lastActivityAt`) to types/mock |
| B2 | Directory column + badge labels (Active Today / Quiet / …) |
| B3 | Filter + URL param `activityStatus` |
| B4 | Reflect on Inspector + Control Center Overview/Activity |
| B5 | Docs + API expectations confirm |

Can overlap late Wave A if capacity allows; do not block Control Center on Activity.

### Wave C — Applications module *(next major workflow after Directory)*

| Step | Work |
|------|------|
| C1 | Replace Applications placeholder with table + wider Application Viewer |
| C2 | Summary columns only (Name, Applied, Specialization, Experience, Overall Score, Status) |
| C3 | Full application render; external links in new tab |
| C4 | Category evaluation UI (10 categories) + overall score |
| C5 | Decision actions: Eligible / Need More Info / Reject (threshold example 80+) |
| C6 | Mobile dedicated `/admin/analysts/applications/[id]` |
| C7 | Docs sync |

**Exit criteria:** Operator can review a full mock application with structured scores and a decision.

### Wave D — Analyst Discord module

| Step | Work |
|------|------|
| D1 | Nav item below Directory → `/admin/analysts/discord` shell → module UI |
| D2 | Mirror Member Discord capabilities (account, role, sync, logs, activity fields) |
| D3 | Control Center Discord tab reflection |
| D4 | Document assign-role gate (post-onboarding); mock only |
| D5 | Reuse shared sync patterns — **no new Discord stack** |

### Wave E — Stage evaluation surfaces

| Step | Work |
|------|------|
| E1 | Verification / Partnership shells → queue + viewer pattern |
| E2 | StageEvaluation records (rating, notes, decision, reviewer, date) |
| E3 | Surface stage history on Control Center Timeline / Overview |

### Wave F — Deferred (explicitly later)

| Item | When |
|------|------|
| Automated Alerts | After Discord, Reports, Publishing, Commission, Performance, Content |
| Public landing / apply | After Admin ops modules stabilize |
| NestJS integration | Per [`ANALYST_BACKEND_INTEGRATION.md`](../02_Product_Architecture/ANALYST_BACKEND_INTEGRATION.md) |
| Artificial Dashboard expansion | Never before owning modules exist |

---

## 4. Detailed plan — Wave A (Control Center)

### 4.1 Product behavior

```text
Directory username click
        ↓
/admin/analysts/[id]
        ↓
Tabs (Overview … Administration)
        ↓
Administration executes partnership ops
```

Inspector remains on Directory for triage.

### 4.2 Suggested tabs (MVP vs later)

| Tab | Wave A MVP | Later |
|-----|------------|-------|
| Overview | Yes | Enrich with Activity / Discord / Performance |
| Timeline | Yes (mock events) | Wire real events |
| Notes | Yes | — |
| Administration | Yes (Suspend / Close / Reactivate) | Pause Publishing / Commission / Archive |
| Performance | Stub | After Performance module |
| Discord | Stub or light reflection | Wave D |
| Commissions | Stub | After Commissions UI |
| Referrals | Stub | Optional |
| Content | Stub | After Content |
| Activity | Stub / light | After Wave B |

### 4.3 Administration MVP fields (Suspend)

Reason · Notes · Duration · Notify Analyst · Remove Discord Role? · Pause Commissions? · Confirm  

Mock: update local status + append timeline event.

### 4.4 Design constraints

- Admin design freeze — inherit shell / WidgetCard / modulePanelSurface  
- Do not redesign Member Control Center patterns unnecessarily  
- Analyst difference: **execute** partnership actions  

### 4.5 Testing checklist (when coding)

- Desktop: Directory → Control Center → back preserves filters  
- Mobile: dedicated Control Center page  
- Suspend mock updates Directory status when returning  
- No partnership mutation from table one-click  
- Accessibility: tabs keyboardable; confirm dialogs clear  

---

## 5. Detailed plan — Wave C (Applications)

### 5.1 Layout

Desktop: `AdminMasterDetail` with Viewer wider than Directory Inspector.  
Mobile: dedicated application page.

### 5.2 Evaluation UX

- Per category: rating control + notes  
- Show reviewer + timestamp (mock admin)  
- Live overall score  
- Threshold hint (e.g. 80+)  

### 5.3 Out of scope for Wave C

- Public apply form  
- Real file storage  
- NestJS  
- Alerts  

---

## 6. Backend planning (no implementation)

Contracts reserved in:

- [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)  
- [`../05_Backend/DATABASE_ENTITIES.md`](../05_Backend/DATABASE_ENTITIES.md)  
- [`../05_Backend/EVENTS_AND_WEBHOOKS.md`](../05_Backend/EVENTS_AND_WEBHOOKS.md)  
- [`../05_Backend/INTEGRATION_POINTS.md`](../05_Backend/INTEGRATION_POINTS.md)  

---

## 7. Definition of done for Phase 04 (docs)

- [x] Product vision reflects operational partnership platform  
- [x] Ecosystem architecture includes Control Center, Discord, Activity, UX pattern, locked decisions  
- [x] Frontend docs for Directory, Control Center, Applications, Discord, Dashboard, Operational UX  
- [x] Admin docs for Partnership Administration, Evaluation, Stage workflow, Alerts deferred  
- [x] Backend contracts reserved  
- [x] This implementation plan authored  
- [x] Status / Index / Changelog synced  

---

## 8. What to do next

1. ~~Begin Wave A — Control Center~~ → **Complete** ([`PHASE_05_WAVE_A_IMPLEMENTATION.md`](./PHASE_05_WAVE_A_IMPLEMENTATION.md))  
2. Begin **Wave B — Activity Status** on Directory  
3. Keep Documentation Sync Rule mandatory after each wave  

---

## Related

- Ecosystem: [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)  
- Control Center: [`../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md)  
- Applications: [`../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md)  
- Status: [`../00_Overview/PROJECT_STATUS.md`](../00_Overview/PROJECT_STATUS.md)
