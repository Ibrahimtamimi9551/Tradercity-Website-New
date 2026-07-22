# TraderCity Analyst Documentation

**Purpose:** Self-contained documentation subsystem for the Analyst platform.  
**Audience:** Product · Frontend · Backend · AI agents working on Analyst only  
**Entry point:** [`ANALYST_DOCUMENTATION_INDEX.md`](./ANALYST_DOCUMENTATION_INDEX.md)

---

## How to use this folder

If you are building or integrating the **Analyst Platform**, start here. You should be able to understand ~90–95% of the feature by reading only `docs/Analyst/`.

Shared platform concepts (governance, Auth, Membership SoT, Admin design freeze) are **cross-referenced**, not copied.

| Need | Open |
|------|------|
| Status & progress | [`PROJECT_STATUS.md`](./PROJECT_STATUS.md) |
| Full catalog | [`ANALYST_DOCUMENTATION_INDEX.md`](./ANALYST_DOCUMENTATION_INDEX.md) |
| Next implementation plan | [`../06_Implementation/PHASE_04.md`](../06_Implementation/PHASE_04.md) |
| Operational UX rule | [`../03_Frontend/OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md) |
| Directory (shipped ops module) | [`../03_Frontend/DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md) |
| Control Center (next coding) | [`../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md) |
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
Dashboard        → What needs attention?
Directory        → Who are our analyst partners?
Control Center   → What can I do for this partner?
Operational modules → Specialized workflows
```

---

## Isolation rule

- **Analyst Platform truth** lives under `docs/Analyst/` only.
- Do **not** embed Analyst specs inside Homepage, Member, Referral, or Admin Agent packs.
- Cross-link shared platform docs when needed; never fork them.
- Use [`PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md): Product = Platform · Engineering = Domain · UI = Analysts.

## Shared platform references (intentional)

| Topic | Shared doc (outside this folder) |
|-------|----------------------------------|
| Engineering governance / freeze | `docs/00_Project_Governance/` |
| Module ownership (`analyst` domain) | `docs/00_Project_Governance/MODULE_OWNERSHIP.md` |
| Admin shell design freeze | `docs/AI/Agents/Admin/02_Frontend_Design_System_and_UX_Rules.md` |
| Admin folder isolation law | `docs/AI/Agents/Admin/06_Application_Isolation_and_Folder_Architecture.md` |
| Membership / cross-module SoT | `docs/04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md` |
| Auth / member dashboards | `docs/04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md` |
