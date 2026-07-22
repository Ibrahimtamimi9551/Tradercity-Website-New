# Analyst Platform — Project Status

**Last Updated:** July 23, 2026  
**Documentation root:** [`docs/Analyst/`](../)  
**Index:** [`ANALYST_DOCUMENTATION_INDEX.md`](./ANALYST_DOCUMENTATION_INDEX.md)  
**Branch (Phases 1–3):** `feature/admin-analyst-management-phase-1`  
**Vocabulary:** [`PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md)  
**Docs sync rule:** [`../06_Implementation/DOCUMENTATION_SYNC_RULE.md`](../06_Implementation/DOCUMENTATION_SYNC_RULE.md)  
**Wave A report:** [`../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md)

---

## Current maturity

| Layer | Status |
|-------|--------|
| Product vision / lifecycle | Documented — operational partnership platform |
| Ecosystem architecture | Documented — Control Center · Discord · Activity · UX pattern |
| Admin navigation (Members · Analysts · Content) | **Shipped** (mock) — Phase 01 |
| Analyst Admin Dashboard | **Shipped** (mock) — Phase 02 |
| Analyst Admin Directory | **Shipped** (mock) — Phase 03 |
| Directory Inspector | **Shipped** (summary panel) |
| Phase 04 architecture refinement | **Complete (docs)** |
| Analyst Control Center | **Shipped** (mock) — Wave A |
| Directory → Control Center navigation | **Shipped** (username + ⋮ + Inspector link) |
| Activity Status column | Planned (Wave B) |
| Applications table + Viewer + evaluation | Planned (Wave C) |
| Analyst Discord module | Planned (Wave D) |
| Stage evaluation UIs | Planned (Wave E) |
| Automated Alerts | Deferred |
| Public landing + apply | Not started |
| Partner-facing dashboard | Not started |
| Backend / NestJS | Not started (`TODO(NestJS)` on hooks) |

---

## Implementation phases

| Phase | Scope | Status | Record |
|-------|-------|--------|--------|
| 01 | Admin section nav + Analyst/Content IA + shell routes | **Complete** | [`PHASE_01.md`](../06_Implementation/PHASE_01.md) |
| 02 | Analyst Dashboard (mock) | **Complete** | [`PHASE_02.md`](../06_Implementation/PHASE_02.md) |
| 03 | Analyst Directory (mock) | **Complete** | [`PHASE_03.md`](../06_Implementation/PHASE_03.md) |
| 04 | Architecture refinement + Waves A–F plan | **Complete (docs)** | [`PHASE_04.md`](../06_Implementation/PHASE_04.md) |
| 05 / Wave A | Analyst Control Center (mock) | **Complete** | [`PHASE_05_WAVE_A_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md) |
| Next | Wave B Activity → C Applications → D Discord → E Stages | Pending | [`PHASE_04.md`](../06_Implementation/PHASE_04.md) |

---

## Shipped routes (Admin)

| Route | Status |
|-------|--------|
| `/admin/analysts` | Dashboard — complete UI, mock |
| `/admin/analysts/directory` | Directory — complete UI, mock |
| `/admin/analysts/[id]` | Control Center — Wave A complete UI, mock |
| `/admin/analysts/applications` | Placeholder |
| `/admin/analysts/verification` | Placeholder |
| `/admin/analysts/partnerships` | Placeholder |
| `/admin/analysts/referrals` | Placeholder (not in sidebar) |
| `/admin/analysts/commissions` | Placeholder |
| `/admin/analysts/discord` | Planned |

---

## Source ownership (implemented)

```text
src/app/admin/analysts/**
src/components/analysts/sections/{dashboard,directory,control-center}/
src/lib/analysts/{mock,hooks}/
src/types/analysts/
```

Shared Admin shell (not Analyst-owned): `src/components/admin/**`

---

## Documentation status

| Area | Status |
|------|--------|
| Overview + Index + this status | Active |
| Product Vision / Architecture | Active |
| Frontend — Dashboard / Directory / Control Center | Active (Control Center shipped) |
| Frontend — Applications / Discord | Planned (authored) |
| Admin — Partnership Admin / Evaluation / Alerts | Active + Draft + Deferred |
| Backend contracts | Draft — Control Center consumer reserved |
| Implementation phases + changelog + sync rule | Active |

---

## Next recommended work

1. **Wave B** — Activity Status column/filter on Directory  
2. **Wave C** — Applications table + Viewer + structured evaluation  
3. **Wave D** — Analyst Discord module (shared infra)  
4. NestJS Directory → Control Center APIs when backend opens  

---

## Freeze note

Phases 1–5 Wave A proceeded under **explicit product-owner override** of Engineering Freeze as mock-first / architecture preparation.

---

## Verify locally

```text
npm run dev
/admin/analysts
/admin/analysts/directory
/admin/analysts/a-001
```
