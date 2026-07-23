# Analyst Platform — Project Status

**Last Updated:** July 24, 2026  
**Documentation root:** [`docs/Analyst/`](../)  
**Index:** [`ANALYST_DOCUMENTATION_INDEX.md`](./ANALYST_DOCUMENTATION_INDEX.md)  
**Branch (Phases 1–3):** `feature/admin-analyst-management-phase-1`  
**Vocabulary:** [`PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md)  
**Docs sync rule:** [`../06_Implementation/DOCUMENTATION_SYNC_RULE.md`](../06_Implementation/DOCUMENTATION_SYNC_RULE.md)  
**Canonical roadmap:** [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)  
**Wave A report:** [`../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md)  
**Wave B report:** [`../06_Implementation/PHASE_05_WAVE_B_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_B_IMPLEMENTATION.md)  
**Wave C report:** [`../06_Implementation/PHASE_05_WAVE_C_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_C_IMPLEMENTATION.md)

---

## Current maturity

| Layer | Status |
|-------|--------|
| Product vision / lifecycle | Documented — **Analyst Program** first (Stage 1), Intelligence later (Stage 2) |
| Ecosystem architecture | Documented — domain nav · Control Center · Discord · Referrals · partnership activation |
| Admin navigation (Members · Analysts · Content) | **Shipped** (mock) — Discord first-class; Partnerships/Commissions transitional |
| Analyst Admin Dashboard | **Shipped** (mock) — Phase 02 |
| Analyst Admin Directory | **Shipped** (mock) — Phase 03 |
| Directory Inspector | **Shipped** (summary panel) |
| Phase 04 architecture refinement | **Complete (docs)** |
| Implementation Roadmap v2.0 | **Active** |
| Analyst Control Center | **Shipped** (mock) — Wave A · Discord tab consumes domain (Wave C) |
| Applications domain (Dashboard + Review Queue) | **Shipped** (mock) — Wave B · Approve → partnership activation |
| Analyst Discord domain | **Shipped** (mock) — Wave C |
| Onboarding | Planned — Stage 1 Wave D **(next)** |
| Referrals domain | Planned — Stage 1 Wave E |
| Activity Status / Intelligence | Deferred — **Stage 2** |
| Partner-facing Analyst Dashboard | Deferred — after Stage 1 operational foundation |
| Identity migration / merge | Future edge case — final Analyst Management phase |
| Automated Alerts | Deferred |
| Public landing + apply | Not started |
| Backend / NestJS | Not started (`TODO(NestJS)` on hooks) |

---

## Implementation phases

| Phase | Scope | Status | Record |
|-------|-------|--------|--------|
| 01 | Admin section nav + Analyst/Content IA + shell routes | **Complete** | [`PHASE_01.md`](../06_Implementation/PHASE_01.md) |
| 02 | Analyst Dashboard (mock) | **Complete** | [`PHASE_02.md`](../06_Implementation/PHASE_02.md) |
| 03 | Analyst Directory (mock) | **Complete** | [`PHASE_03.md`](../06_Implementation/PHASE_03.md) |
| 04 | Architecture refinement (docs) | **Complete (docs)** | [`PHASE_04.md`](../06_Implementation/PHASE_04.md) |
| 05 / Wave A | Analyst Control Center (mock) | **Complete** | [`PHASE_05_WAVE_A_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md) |
| 05 / Wave B | Applications domain (mock) | **Complete** | [`PHASE_05_WAVE_B_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_B_IMPLEMENTATION.md) |
| 05 / Wave C | Discord domain (mock) | **Complete** | [`PHASE_05_WAVE_C_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_C_IMPLEMENTATION.md) |
| Roadmap v2.0 | Stage 1 Program → Stage 2 Intelligence | **Active** | [`IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md) |
| Next | Stage 1 Wave D — Onboarding | Pending | [`IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md) |

---

## Shipped routes (Admin)

| Route | Status |
|-------|--------|
| `/admin/analysts` | Dashboard — complete UI, mock |
| `/admin/analysts/directory` | Directory — complete UI, mock |
| `/admin/analysts/[id]` | Control Center — Wave A · Discord tab Wave C |
| `/admin/analysts/applications` | Applications domain — Wave B complete UI, mock |
| `/admin/analysts/applications/[id]` | Application Viewer (mobile / deep) — Wave B |
| `/admin/analysts/verification` | **Redirect** → Applications Review Queue |
| `/admin/analysts/discord` | Discord domain — Wave C complete UI, mock |
| `/admin/analysts/discord/[id]` | Discord details (mobile) — Wave C |
| `/admin/analysts/partnerships` | Placeholder — interview notes live in Applications |
| `/admin/analysts/referrals` | Placeholder (add to sidebar in Wave E) |
| `/admin/analysts/commissions` | Placeholder — commercial tracking under Referrals (Wave E) |
| `/admin/analysts/onboarding` | Planned optional queue — Wave D |

---

## Target sidebar domains (Stage 1)

```text
Dashboard · Directory · Applications · Discord · Referrals
(+ Control Center via Directory)
```

Current code: Dashboard · Directory · Applications · Discord · Partnerships · Commissions (last two transitional).

---

## Source ownership (implemented)

```text
src/app/admin/analysts/**
src/components/analysts/sections/{dashboard,directory,control-center,applications,discord}/
src/lib/analysts/{mock,hooks}/
src/types/analysts/
```

Shared Admin shell (not Analyst-owned): `src/components/admin/**`

---

## Next recommended work

1. **Stage 1 Wave D** — Onboarding (after Wave C review)  
2. **Stage 1 Wave E** — Referrals → Program operational  
3. **Stage 2** — Activity / Intelligence (only after Wave E)  
4. Partner-facing Analyst Dashboard — only after Stage 1 foundation  

---

## Freeze note

Phases 1–5 Waves A–C and the roadmap restructure proceeded under **explicit product-owner override** of Engineering Freeze as mock-first / architecture preparation.

---

## Verify locally

```text
npm run dev
/admin/analysts/discord
/admin/analysts/discord?view=directory
/admin/analysts/discord?view=operations
/admin/analysts/a-001?tab=discord
/admin/analysts/applications?view=queue&status=approved
```
