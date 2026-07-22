# Analyst Domain Model (Product-Level)

**Version:** 1.1  
**Status:** Active  
**Authority:** `docs/Analyst/02_Product_Architecture/`  
**Last Updated:** July 23, 2026

This is a **product-level** entity map for frontend mocks and future backend design. Persistence details: [`../05_Backend/DATABASE_ENTITIES.md`](../05_Backend/DATABASE_ENTITIES.md) (planned).

---

## Core entities

| Entity | Purpose |
|--------|---------|
| **Analyst** | Partner identity record (post-approval) |
| **AnalystApplication** | Intake + evaluation state before official partner record |
| **CategoryEvaluation** | Per-category rating + notes on an application (or stage) |
| **StageEvaluation** | Independent evaluation at a lifecycle stage |
| **AnalystScorecard** | Aggregate of category evaluations → overall score |
| **AnalystAgreement** | Partnership terms (commission, ethics, termination) |
| **AnalystOnboarding** | Education checklist + wallet destination |
| **AnalystActivityStatus** | Communication / engagement freshness (independent of lifecycle) |
| **AnalystDiscordLink** | Reflection of shared Discord sync for Analyst role |
| **PartnershipAction** | Auditable ops action (suspend, close, reactivate, pause publishing, …) |
| **CommissionLedger** | Pending / approved / paid earnings |
| **PayoutRequest** | Analyst-initiated, Admin-approved |
| **AnalystPerformanceSnapshot** | Quality, consistency, referrals, engagement metrics |
| **AnalystTimelineEvent** | Lifecycle / ops history |
| **AnalystAlert** *(future)* | Automated attention signal derived from modules |

---

## Relationships (conceptual)

```text
Visitor
  → AnalystApplication (+ CategoryEvaluations → Scorecard)
  → StageEvaluation (Verification / Partnership / Agreement / Onboarding)
  → Analyst (Approved)
  → Agreement → Onboarding → Active
  → AnalystDiscordLink (Analyst role assigned)
  → CommissionLedger ← PayoutRequest
  → PerformanceSnapshot / ActivityStatus / TimelineEvent
  → PartnershipAction (suspend / close / reactivate / …)
```

---

## Status dimensions (orthogonal)

| Dimension | Example values | Notes |
|-----------|----------------|-------|
| Lifecycle | `active`, `suspended`, `closed`, … | Partnership pipeline |
| Tier | `partner`, `growing`, `top_partner` | Commercial maturity |
| System Health | `healthy`, `needs_attention`, `action_required` | Ops attention |
| Activity Status | `active_today`, `active`, `quiet`, `inactive`, `critical` | Engagement freshness |

Lifecycle Status ≠ Activity Status.

### Activity Status bands (product example)

| Band | Example label |
|------|---------------|
| Active Today | 🟢 Active Today |
| Active | 🟢 Active (3 Days) |
| Quiet | 🟡 Quiet (5 Days) |
| Inactive | 🟠 Inactive (9 Days) |
| Critical | 🔴 Critical (15 Days) |

Exact day thresholds are product-configurable; reserve the enum/contract before UI ships.

---

## Evaluation model

### CategoryEvaluation

Fields (conceptual): `category` · `rating` · `notes` · `reviewerId` · `reviewedAt`

Categories: Identity · Trading Knowledge · Research Quality · Education Ability · Communication · Professionalism · Social Presence · Community · Brand Compatibility · Long-term Potential

### StageEvaluation

Fields (conceptual): `stage` · `rating` · `notes` · `decision` · `reviewerId` · `reviewedAt`

Stages: Application · Verification · Partnership · Agreement · Onboarding · (future operational reviews)

### Scorecard

Overall score computed from category ratings (example display: `91 / 100`).  
Threshold example: `80+` eligible for partnership progression.

---

## Frontend types already seeded (Admin)

| Type module | Key types |
|-------------|-----------|
| `src/types/analysts/directory.ts` | `DirectoryAnalyst`, status/tier unions, filters, stats |
| `src/types/analysts/dashboard.ts` | Dashboard stats, queue, activity |

### DirectoryAnalyst fields (ops roster)

| Field | Meaning |
|-------|---------|
| `displayName`, `handle`, `email` | Identity |
| `status` | Lifecycle stage |
| `tier` | Business maturity |
| `specialization` | Topic focus |
| `reachFollowers` | Estimated audience |
| `partneredAt` | Partnership timestamp |
| `systemHealth` | Operational health |

Lifecycle statuses:  
`under_review | verification | partnership_discussion | onboarding | active | growing | suspended | closed`

Tiers: `none | partner | growing | top_partner`

**Planned (not in types yet):**

- `activityStatus` (+ optional `lastActivityAt`)  
- Control Center projection types  
- Application / CategoryEvaluation / StageEvaluation types  
- Discord reflection types for Analyst module  

IDs in mocks: `a-001`… (UI seeds only; production should use stable UUIDs).

Directory UI SoT: [`../03_Frontend/DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md).

---

## Identity notes

- Analysts are partners, not Members — may also be members of the community, but Analyst record is separate.  
- Discord role enum already includes `analyst` in Member Discord types (shared platform fact; do not redefine Membership SoT here).  
- Cross-module membership ownership remains outside Analyst docs — see shared Cross-Module Sync architecture.
