# Phase 04 — Architecture Refinement & Next Implementation Plan

**Version:** 1.1  
**Status:** Complete (documentation / architecture)  
**Date:** July 23, 2026 · **Roadmap supersession:** July 24, 2026  
**Branch context:** Continues Analyst Admin work under product-owner freeze override (mock-first), same spirit as Phases 1–3  
**Authority:** `docs/Analyst/06_Implementation/`

> **Canonical coding sequence:** [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md) (v2.0 — Stage 1 Program → Stage 2 Intelligence).  
> Section §3 below is **historical** (2026-07-23 wave labels). Do not implement Activity Status before Stage 1 Wave E completes.

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
- Applications = domain (Dashboard + Review Queue); Verification folds into Applications  
- Structured category + stage evaluations  
- Activity Status independent of Lifecycle (**Stage 2** — not next coding)  
- Left nav = major operational domains (not one item per screen)  
- Alerts deferred until prerequisite modules exist  
- Dashboard evolves naturally — no artificial expansion  

### Documentation created / updated

See changelog entries for 2026-07-23 Phase 04 and 2026-07-24 roadmap restructure.

---

## 2. Current foundation (already shipped)

| Surface | Status |
|---------|--------|
| Analyst Dashboard | Shipped (mock) — excellent ops foundation |
| Analyst Directory + Inspector | Shipped (mock) |
| Analyst Control Center | Shipped (mock) — Wave A |
| Shell routes (Applications, Verification, …) | Placeholders (Verification → fold into Applications) |
| Discord / Onboarding / Referrals domains | Not started |
| Activity Status column | Deferred to Stage 2 Wave G |

---

## 3. Coding sequence — superseded labels (historical)

**Use [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md) for all new work.**

### Mapping (old Phase 04 labels → Roadmap v2.0)

| Old (2026-07-23) | New (2026-07-24) |
|------------------|------------------|
| Wave A — Control Center | ✅ Complete (unchanged) |
| Wave B — Activity Status | **Stage 2 Wave G** (deferred) |
| Wave C — Applications | **Stage 1 Wave B — Applications** (domain + Review Queue) |
| Wave D — Discord | **Stage 1 Wave C — Discord** (domain) |
| Wave E — Stage evaluation shells | Folded into **Wave B Review Queue** + **Wave D Onboarding** |
| — | **Stage 1 Wave D — Onboarding** (new) |
| — | **Stage 1 Wave E — Referrals** (new; Program operational) |
| Wave F — Deferred | Stage 2 Waves F–I + alerts / public / NestJS |

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
| Discord | Stub or light reflection | Stage 1 Wave C |
| Commissions | Stub | Stage 1 Wave E (Referrals) |
| Referrals | Stub | Stage 1 Wave E |
| Content | Stub | After Content |
| Activity | Stub / light | Stage 2 Wave G |

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

## 5. Detailed plan — Applications (now Stage 1 Wave B)

See canonical scope in [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md) and [`../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md).

Summary:

- Applications is a **domain** (Dashboard · Review Queue · Archive · future Intelligence)  
- Verification + evaluation + interview notes live in Review Queue — not separate nav  
- Desktop: `AdminMasterDetail` with Viewer wider than Directory Inspector  
- Mobile: dedicated application page  
- Out of scope: public apply form · real file storage · NestJS · alerts · Stage 2 intelligence  

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
2. Follow [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md): begin **Stage 1 Wave B — Applications**  
3. Do **not** start Activity Status / Stage 2 until Wave E completes (unless explicitly overridden)  
4. Keep Documentation Sync Rule mandatory after each wave  

---

## Related

- **Canonical roadmap:** [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md)  
- Ecosystem: [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)  
- Control Center: [`../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md)  
- Applications: [`../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md)  
- Status: [`../00_Overview/PROJECT_STATUS.md`](../00_Overview/PROJECT_STATUS.md)
