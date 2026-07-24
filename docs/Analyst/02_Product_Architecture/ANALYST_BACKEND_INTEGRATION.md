# Analyst Backend Integration Posture

**Version:** 0.3  
**Status:** Draft  
**Authority:** `docs/Analyst/02_Product_Architecture/`  
**Last Updated:** July 23, 2026

---

## Principle

Frontend pages and hooks stay stable. Backend replaces **mock modules**, not page composition.

```text
AnalystDashboardPage / AnalystsDirectoryPage / ControlCenter  (stable)
        ↓
hooks + mocks → API client
        ↓
NestJS Analyst Admin APIs                       (future)
```

---

## Integration order (recommended)

1. **Directory list + filters + stats** (shipped URL contract — highest leverage)  
2. Dashboard aggregates  
3. **Control Center detail + partnership actions** (Wave A UI shipped on mocks — next NestJS priority after Directory)  
4. Applications domain + category evaluations + verification pipeline (Stage 1 Wave B)  
5. Discord Analyst role assign/sync (shared infra — Stage 1 Wave C)  
6. Onboarding completion gates (Stage 1 Wave D)  
7. Referrals / commissions commercial reflection (Stage 1 Wave E)  
8. Activity Status projection (Stage 2 Wave G — may ship UI before API)  
9. Automated Alerts — **last** (after prerequisite modules)

Directory module contract: [`../03_Frontend/DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md)  
API shapes: [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)

---

## Contracts to preserve

Directory URL params already used by widgets and filters:

`q` · `status` · `tier` · `health` · `page` · `pageSize` · `analyst` (UI selection only)

Reserve: `activityStatus`

Also documented in [`../06_Implementation/ANALYST_DIRECTORY_IMPLEMENTATION.md`](../06_Implementation/ANALYST_DIRECTORY_IMPLEMENTATION.md).

---

## AuthZ

Admin-only for `/admin/analysts/**`. Partner self-serve dashboard is a separate future surface with analyst-scoped auth.

---

## Freeze / override context

Phases 1–3 were mock-only under product-owner freeze override. Phase 4 architecture docs continue under the same product direction. Backend work should still respect Engineering Platform / governance gates unless similarly overridden.
