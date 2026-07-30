# Analyst Data Flow

**Version:** 0.2  
**Status:** Draft  
**Authority:** `docs/Analyst/02_Product_Architecture/`  
**Last Updated:** July 23, 2026

---

## Current state (frontend mocks)

```text
Admin UI (analysts/sections)
  → hooks / section mocks (src/lib/analysts/mock)
  → typed view models (src/types/analysts)
```

No NestJS calls yet. Hooks carry `TODO(NestJS)`.

---

## Target flow (future)

```text
Public Apply → Application service → Admin Applications queue
Category evaluations → Overall score → Decision
Stage evaluations (Verification → Partnership → Agreement → Onboarding)
  → Analyst record → Active
Onboarding complete → Shared Discord → Assign Analyst Role
Publishing / referrals / conversions → Commission ledger
Activity signals → Activity Status (+ future Alerts)
Payout request → Admin approval → payment rail
Partnership actions (suspend/close/…) → Timeline + side effects
Performance jobs → snapshots → Intelligence / homepage merit
```

---

## Admin read paths (expected)

| UI | Reads |
|----|-------|
| Dashboard | Aggregates + queues (reflection of modules) |
| Directory | Paginated analysts + filters (+ Activity Status) |
| Control Center | Analyst projection + tabs + Administration |
| Applications | Queue + full application + evaluations |
| Discord | Analyst Discord links / sync / activity |
| Commissions | Ledger + payouts |

---

## Admin write paths (expected)

| UI | Writes |
|----|--------|
| Applications Viewer | Category evaluations · decisions |
| Stage workflows | Stage evaluations |
| Control Center Administration | Partnership actions · notes |
| Discord module | Sync triggers · role assign/remove (gated) |

---

## Related

- Domain model: [`ANALYST_DOMAIN_MODEL.md`](./ANALYST_DOMAIN_MODEL.md)  
- API expectations: [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)  
- Integration: [`ANALYST_BACKEND_INTEGRATION.md`](./ANALYST_BACKEND_INTEGRATION.md)
