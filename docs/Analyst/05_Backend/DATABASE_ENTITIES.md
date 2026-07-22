# Analyst Database Entities

**Version:** 0.1  
**Status:** Planned — reserved entity list only (no schemas invented)  
**Authority:** `docs/Analyst/05_Backend/`  
**Last Updated:** July 23, 2026

Product-level entities: [`../02_Product_Architecture/ANALYST_DOMAIN_MODEL.md`](../02_Product_Architecture/ANALYST_DOMAIN_MODEL.md).

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
| CommissionLedger | Earnings |
| PayoutRequest | Payout workflow |
| AnalystPerformanceSnapshot | Metrics snapshots |
| AnalystTimelineEvent | Ops history |
| AnalystAlert | Future — deferred |

---

## Indexes / queries to anticipate (non-binding)

- Directory list: filter by lifecycle, tier, health, activityStatus; search identity fields  
- Applications queue: status + appliedAt  
- Stage evaluations by analystId + stage  
- Partnership actions by analystId + createdAt  

---

## Discord

Do not duplicate Discord infrastructure tables owned by the shared Discord/Membership stack.  
Store Analyst-specific linkage + role intent; sync state may be shared projection.
