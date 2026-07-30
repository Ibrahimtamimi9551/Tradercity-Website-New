# TraderCity Member Management Documentation

**Purpose:** Self-contained documentation subsystem for Member Management (Member Platform Admin).  
**Audience:** Product · Frontend · Backend · AI agents working on Members only  
**Entry point:** [`MEMBER_DOCUMENTATION_INDEX.md`](./MEMBER_DOCUMENTATION_INDEX.md)

---

## How to use this folder

If you are building or integrating **Member Management**, start here. You should be able to understand ~90–95% of the feature by reading only `docs/Member Management/`.

Shared platform concepts (governance, Auth, Membership SoT, Admin design freeze) are **cross-referenced**, not copied.

| Need | Open |
|------|------|
| Status & progress | [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) |
| Full catalog | [`MEMBER_DOCUMENTATION_INDEX.md`](./MEMBER_DOCUMENTATION_INDEX.md) |
| Canonical roadmap | [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md) |
| Operational UX rule | [`../03_Frontend/OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md) |
| Members Directory (shipped) | [`../03_Frontend/DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md) |
| Member Control Center (shipped) | [`../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md) |
| Subscriptions (placeholder) | [`../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md) |
| Discord (shipped mock) | [`../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md`](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md) |
| Referrals (shipped mock) | [`../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md`](../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md) |
| Product “what / why” | [`../01_Product_Vision/`](../01_Product_Vision/) |
| System design | [`../02_Product_Architecture/`](../02_Product_Architecture/) |
| UI surfaces | [`../03_Frontend/`](../03_Frontend/) |
| Admin ops | [`../04_Admin/`](../04_Admin/) |
| API / data contracts | [`../05_Backend/`](../05_Backend/) |
| What shipped | [`../06_Implementation/`](../06_Implementation/) |
| Docs-with-code rule | [`../06_Implementation/DOCUMENTATION_SYNC_RULE.md`](../06_Implementation/DOCUMENTATION_SYNC_RULE.md) |

---

## Platform philosophy (quick)

```text
Dashboard              → What needs attention?
Members Directory      → Who are our members?
Member Control Center  → What is the complete state of this member? (reflect only)
Operational Domains    → How do I manage Subscriptions / Discord / Referrals?
```

Phases 0–6 = Member Platform Admin operational foundation. Phases 7–9 are deferred.

---

## Isolation rule

- **Member Management truth** lives under `docs/Member Management/` only.
- Do **not** embed Member specs inside Homepage, Analyst, Referral product, or Admin Agent packs as the primary SoT.
- Cross-link shared platform docs when needed; never fork them.
- Use [`PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md): Product = Member Platform · Engineering = Member Domain · UI = Members.

## Shared platform references (intentional)

| Topic | Shared doc (outside this folder) |
|-------|----------------------------------|
| Engineering governance / freeze | `docs/00_Project_Governance/` |
| Module ownership (`admin` / `member` domains) | `docs/00_Project_Governance/MODULE_OWNERSHIP.md` |
| Admin shell design freeze | `docs/AI/Agents/Admin/02_Frontend_Design_System_and_UX_Rules.md` |
| Admin folder isolation law | `docs/AI/Agents/Admin/06_Application_Isolation_and_Folder_Architecture.md` |
| Membership / cross-module SoT | `docs/04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md` |
| Auth / member dashboards | `docs/04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md` |
| Pricing / payment verification | `docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md` |
| Historical Agent pack (legacy) | `docs/AI/Agents/Admin/` |
| Historical phase logs (legacy) | `docs/Development/Admin/` |
