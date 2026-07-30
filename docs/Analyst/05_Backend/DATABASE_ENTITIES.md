# Analyst Database Entities

**Version:** 0.2  
**Status:** Planned — reserved entity list only (no schemas invented)  
**Authority:** `docs/Analyst/05_Backend/`  
**Last Updated:** July 25, 2026

Product-level entities: [`../02_Product_Architecture/ANALYST_DOMAIN_MODEL.md`](../02_Product_Architecture/ANALYST_DOMAIN_MODEL.md).  
Frontend mock shapes (Wave F): `src/types/analysts/commissions.ts` · [`../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md)

This file reserves persistence concerns for backend design. **Do not invent column-level schemas here yet.**

---

## Reserved entity set

| Entity | Persistence notes (planning) |
|--------|------------------------------|
| Analyst | Core partner record; lifecycle, tier, health |
| AnalystApplication | Intake payload + queue status |
| CategoryEvaluation | FK application/stage; rating + notes + reviewer + timestamp |
| StageEvaluation | Per-lifecycle-stage decision record |
| AnalystScorecard | Aggregate / cached overall score (or computed view) |
| AnalystAgreement | Terms acceptance |
| AnalystOnboarding | Checklist + wallet destination |
| AnalystActivityStatus | Band + last activity timestamps (or derived projection) |
| AnalystDiscordLink | Link to shared Discord identity / sync state |
| PartnershipAction | Auditable suspend/close/reactivate/… |
| AnalystReferralIdentity | Code/link/status/performance (Referrals domain) |
| AnalystReferralTimelineEvent | Append-only referral audit |
| AnalystCommissionProfile | Per-analyst financial identity + tier + wallet |
| AnalystCommissionLine | Pending/Approved/Paid line linked to referral conversion |
| AnalystPayoutRecord | Permanent ledger entry · Gross/TC/Analyst · tx hash · network · token |
| AnalystCommissionTimelineEvent | Append-only financial audit |
| AnalystPerformanceSnapshot | Metrics snapshots |
| AnalystTimelineEvent | Ops history (Control Center; distinct from referral/commission timelines) |
| AnalystAlert | Future — deferred |
| AnalystDispute (future) | References commission + payout + evidence — do not implement Wave F |

**Ledger rule:** Payout and commission financial rows are append-only. Corrections create new records; never delete settlement history.

---

## Indexes / queries to anticipate (non-binding)

- Directory list: filter by lifecycle, tier, health, activityStatus; search identity fields  
- Applications queue: status + appliedAt  
- Stage evaluations by analystId + stage  
- Partnership actions by analystId + createdAt  
- Commission directory: commissionStatus · pending/approved/paid aggregates  
- Payout queue: approved unpaid lines + wallet present  
- Payout history: paymentDate desc · transactionHash lookup  
- Commission lines by referralRecordId / conversion member  

---

## Discord

Do not duplicate Discord infrastructure tables owned by the shared Discord/Membership stack.  
Store Analyst-specific linkage + role intent; sync state may be shared projection.

---

## Commission ↔ Referrals

Do not duplicate referral attribution inside Commission tables.  
Commission lines **reference** referral conversion identity; amounts and payout state live only in Commission entities.
