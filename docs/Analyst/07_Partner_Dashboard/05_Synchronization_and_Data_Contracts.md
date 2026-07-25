# Synchronization & Data Contracts

**Version:** 1.0  
**Status:** Active (Docs Bridge)  
**Authority:** `docs/Analyst/07_Partner_Dashboard/`

This document is the architectural bridge between Analyst Management and the Partner Analyst Dashboard.

---

## 1. Canonical flow

```text
Admin
  → Analyst Management          (source of truth)
  → Dashboard Projection Layer  (Analyst Dashboard Service)
  → Partner Analyst Dashboard
  → Future: Mobile App · Telegram Bot · Analyst API
```

Every future product consumes the **same projection contracts** — not a forked store.

---

## 2. Product naming

| Product term | Internal meaning |
|--------------|------------------|
| **Dashboard Projection Layer** | Read-model projection for partner surfaces |
| **Analyst Dashboard Service** | Frontend (today mock) / NestJS (later) facade |

Avoid calling the product layer “Shared Analyst Read Model” in docs — it reads like a database artifact.

---

## 3. Ownership rule

| Concern | Owner |
|---------|-------|
| Profile, lifecycle, tier labels | Analyst Management |
| Referral identity & performance | Referral Engine (Management) |
| Commission %, earnings, due, milestones | Commission Engine (Management) |
| Payout ledger & eligibility | Payout Engine (Management) |
| Contribution metrics | Contribution Engine (Stage 2 — system) |
| Partner visualization | Analyst Dashboard |
| Limited partner actions | Dashboard → Management APIs |

The dashboard **asks for MY data**. It never recalculates commission, milestones, or eligibility.

---

## 4. Contribution Flow (partner language)

Partner-facing language uses **Contribution**, not mere “Activity.”

| Metric family (future) | Examples |
|------------------------|----------|
| Contribution Score | Aggregate partner contribution |
| Discord Sessions | Community presence |
| Reports Published | Research output |
| Community Support | Helping members |
| Educational Posts | Teaching content |

Admin Stage 2 may still name the internal workstream “Activity Tracking.” Partner product copy prefers **Contribution**.

Foundation: Contribution fields are **placeholders** until the Contribution Engine ships.

---

## 5. Working Status

Working / engagement status (Growing · Publishing · Needs Follow-up · Inactive · Action Required) is owned by Stage 2 system intelligence — not computed in the dashboard.

Partner dashboard may later **display** a Working Status badge projected from Management.

---

## 6. Shared projection DTO (foundation shape)

```ts
type AnalystDashboardProjection = {
  analystId: string;
  hero: HeroSlice;
  overview: OverviewSlice;
  performance: PerformanceSlice;
  referralGrowth: ReferralGrowthSlice;
  referralSummary: ReferralSummarySlice;
  commissionMilestones: CommissionMilestonesSlice;
  commissionOverview: CommissionOverviewSlice;
  payout: PayoutSlice;
  helpSupport: HelpSupportSlice;
};
```

Exact TypeScript lives in `src/analyst/dashboard/types/`. Values are **display-ready**.

---

## 7. Future API contracts (reserved — do not invent NestJS yet)

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/analyst/dashboard` | Full projection for authenticated analyst |
| `GET` | `/analyst/dashboard/overview` | Overview slice |
| `GET` | `/analyst/dashboard/payout` | Payout slice |
| `POST` | `/analyst/dashboard/payout/request` | Request payout (eligibility server-side) |
| `PATCH` | `/analyst/dashboard/wallet` | Update wallet address |

Admin continues to own write paths for approvals, tier calculation, and payout completion.

---

## 8. Backend synchronization strategy

| Phase | Behaviour |
|-------|-----------|
| Foundation (now) | Mock service adapts `src/lib/analysts/mock/**` into projection DTOs |
| UI mock overlays | Wallet save + payout request update **display** via `mergeDisplayProjection` — never dual-write Management stores |
| NestJS | Single projection endpoint; Management remains SoT; no duplicate partner DB |
| Multi-consumer | Mobile / Telegram / Analyst API reuse the same NestJS projection |

Admin changes (e.g. commission 40% → 50%) appear on next refresh — no dashboard-side sync jobs.

---

## 9. Forbidden in dashboard code

- Computing commission %  
- Deriving referral counts from raw events  
- Milestone math  
- Payout eligibility rules  
- Dual-writing partnership state  

---

## Related

- Module fields: [`03_Module_Specification.md`](./03_Module_Specification.md)  
- Ownership matrix: [`08_Module_Ownership.md`](./08_Module_Ownership.md)  
- Admin API reservations: [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)  
