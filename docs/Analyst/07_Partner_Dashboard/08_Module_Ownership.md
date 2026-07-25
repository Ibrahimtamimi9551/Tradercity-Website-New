# Module Ownership

**Version:** 1.1  
**Status:** Active  
**Authority:** `docs/Analyst/07_Partner_Dashboard/`

> Analyst Management manages. Analyst Dashboard visualizes.

---

## Ownership matrix

| Module | Data owner | Editable by |
|--------|------------|-------------|
| Hero | Analyst Management | Admin |
| Overview | Analyst Management | Admin / System engines |
| Performance Snapshot | Contribution Engine + Referral Engine | System |
| Referral Growth | Referral Engine | System |
| Referral Summary | Referral Engine | System |
| Commission Milestones | Commission Engine | System |
| Commission Overview (+ trend + breakdown) | Commission Engine | System |
| Payout Center | Payout Engine | Admin + limited Analyst action |
| Request Status (+ invoice) | Payout Engine | System (+ Analyst submit) |
| Recent Payouts | Payout Engine | System |
| Help & Support | Configuration | Admin |

---

## Analyst-editable actions (limited)

| Action | Module | Constraint |
|--------|--------|------------|
| Request payout | Payout Center | Only when projected window open + eligible |
| Update wallet | Payout Center | Validated by Management / NestJS |
| Expand breakdown / invoice / history | Overview / Request / Recent | UI state only |

---

## Milestone naming (partner-facing)

| Partner label | Share % | Management band |
|---------------|--------:|-----------------|
| Bronze Analyst | 40% | &lt; $1,000 cumulative |
| Silver Analyst | 50% | $1,000 – $3,000 |
| Gold Analyst | 60% | $3,000 – $10,000 |
| Diamond Analyst | 70% | ≥ $10,000 |

Thresholds are owned by Management (`ANALYST_COMMISSION_TIER_BANDS`). Labels are presentation only.
