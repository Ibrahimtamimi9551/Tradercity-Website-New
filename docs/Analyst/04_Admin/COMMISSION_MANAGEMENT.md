# Commission Management (Admin Financial Operations)

**Version:** 1.2  
**Status:** Active — Stage 1 Wave F (mock-first · operational UX)  
**Authority:** `docs/Analyst/04_Admin/`  
**Canonical architecture:** [`../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md)  
**Report:** [`../06_Implementation/ANALYST_COMMISSION_IMPLEMENTATION.md`](../06_Implementation/ANALYST_COMMISSION_IMPLEMENTATION.md)

---

## Product summary

Admin Super Operators run **Financial Operations** for analyst commissions:

* Track earnings generated from successful referral conversions  
* Operate on **Ready for Payment → Paid** (not Pending / Approved accounting states)  
* Carry unpaid prior-cycle amounts forward as **Due Amount**  
* Execute **manual USDT (BEP-20)** payouts outside the platform  
* Record blockchain transaction hashes (+ optional payment evidence)  
* Audit commission timelines per analyst  

Route: `/admin/analysts/commissions`

Partner-facing payout requests (1–2× / month) remain a **future Analyst Dashboard** concern. Wave F builds the Admin ledger and payout recording surface first.

---

## Domain relationship

```text
Referrals (identity · conversions · plan counts)
        ↓
Commission (amounts · Ready/Paid · Due · wallet · tx hash · audit)
```

Do not re-implement referral attribution in this module.

---

## Admin capabilities (Wave F)

| Capability | Notes |
|------------|-------|
| Commission Dashboard | Program KPIs **or** full analyst workspace (billing · summary · breakdown · records · timeline · payment) |
| Commission Directory | Roster columns: Business · Tier · Gross · Analyst Share · Due · Last Payment · Status |
| Directory inspector | Identity · Billing Cycle (merged share %) · Payment Summary |
| Payouts workspace | Search → review → copy wallet → send USDT → paste hash → optional evidence → Mark Paid |
| History | Permanent ledger ordered as business → referrals → split → payment |
| Referral credits | Monthly $10 · Quarterly $30 · Yearly $60 · no Lifetime |
| Tier % | Auto from monthly business bands — not manually editable |
| Open Member | Referral Commission Records → `/admin/members/{id}` |
| Control Center summary | Concise card + Commissions tab |

---

## Directory columns

| Analyst | Monthly Business | Current Tier | Gross Commission | Analyst Share | Due Amount | Last Payment | Status |

---

## Payment Summary (inspector / dashboard)

| Field | Meaning |
|-------|---------|
| Current Billing Cycle | Active month |
| Commission Generated | Current-cycle gross |
| Amount Payable | Analyst share of current cycle |
| Outstanding Due | Prior-cycle unpaid (analyst share) |
| Next Payout | Next eligible settlement date |

---

## Manual payout SOP

1. Open **Commission → Payouts**  
2. Search and select one analyst  
3. Review Commission Generated · Amount Payable · Outstanding Due · Total Amount to Pay  
4. Copy analyst wallet (USDT · BNB Smart Chain BEP-20)  
5. Send Total Amount to Pay from ops wallet  
6. Paste transaction hash  
7. Optionally upload payment evidence (screenshot / receipt)  
8. Add internal notes if needed  
9. Mark payout **Paid**  

Platform = operational record. Blockchain = payment rail.

Payout summary cards:

* Analysts Ready for Payment  
* Total Commission Generated  
* Total Amount to Pay  

---

## Permanent ledger rule

Financial records are never deleted. Corrections append new records. Future dispute module references existing commission + payout + tx hash + evidence.

---

## Backend

Business context: [`../01_Product_Vision/ANALYST_BUSINESS_MODEL.md`](../01_Product_Vision/ANALYST_BUSINESS_MODEL.md)  
API contracts: [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)  
Entities: [`../05_Backend/DATABASE_ENTITIES.md`](../05_Backend/DATABASE_ENTITIES.md) (reserved)
