# Analyst Product Vision

**Version:** 1.1  
**Status:** Active  
**Authority:** `docs/Analyst/01_Product_Vision/`  
**Last Updated:** July 23, 2026

---

## One-line vision

TraderCity evolves from a premium crypto community into a platform where **independent analysts build their own business** while TraderCity provides the infrastructure — operated through a complete **Analyst Platform**, not a CRUD module.

---

## What this is / is not

| This is | This is not |
|---------|-------------|
| Long-term **partnership** operational platform | Employee management |
| Aligned incentives (members · analysts · TraderCity) | Freelancer marketplace |
| Second half of the TraderCity platform | Isolated CRUD feature |
| Ops system for partnership health & workflows | Spreadsheet of analyst rows |

---

## Operational platform philosophy

Admin surfaces for the Analyst Platform answer four distinct questions:

```text
Dashboard
        ↓
Shows WHAT requires attention.

Directory
        ↓
Shows WHO the analysts are.

Control Center
        ↓
Allows Admin to manage ONE analyst.

Operational Modules
        ↓
Manage specialized workflows
(Application, Verification, Discord, Commission, etc.)
```

Every module follows the same interaction pattern:

```text
Table / Queue → Quick Inspector → Detail / Control Center
```

See [`../03_Frontend/OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md).

---

## Two ecosystems

```text
Members consume knowledge.
Analysts create knowledge.
TraderCity provides infrastructure.
```

Conceptual mirror of Member Platform — different responsibilities, incentives, permissions, and lifecycle. See [`ANALYST_USER_LIFECYCLE.md`](./ANALYST_USER_LIFECYCLE.md).

Shared infrastructure (e.g. Discord) is reused; **business triggers and roles differ**.

---

## Product goals

1. Attract high-quality independent analysts who prefer TraderCity over going alone  
2. Deliver full Admin UI for the **Analyst Platform** as an operational ecosystem  
3. Enable structured evaluation at every lifecycle stage (not binary Approve/Reject)  
4. Enable publishing, commissions, Discord access, growth, and merit-based homepage featuring  
5. Keep public acquisition surfaces (landing / apply) behind a stable Admin foundation  

**Vocabulary:** Product = Analyst Platform · Engineering = Analyst Domain · UI = Analysts — see [`PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md).

---

## Success signals (product)

- Analysts publish consistently and retain members  
- Commission + referral attribution are trusted and transparent to partners  
- Admin can answer: who generates revenue, quality, growth, activity health, and who needs support  
- Partnership actions (suspend, close, reactivate) are auditable and owned by Control Center  
- Homepage features analysts by **earned merit**, never randomly  

---

## Related Analyst docs

- Business model: [`ANALYST_BUSINESS_MODEL.md`](./ANALYST_BUSINESS_MODEL.md)  
- Lifecycle: [`ANALYST_USER_LIFECYCLE.md`](./ANALYST_USER_LIFECYCLE.md)  
- Architecture: [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)  
- Implementation plan: [`../06_Implementation/PHASE_04.md`](../06_Implementation/PHASE_04.md)

## Shared platform (cross-ref only)

- Roadmap Phase 4: `docs/00_Project_Governance/PROJECT_ROADMAP.md`  
- Domain ownership: `docs/00_Project_Governance/MODULE_OWNERSHIP.md` (`analyst`)
