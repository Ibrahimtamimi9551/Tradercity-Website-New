# Member Ecosystem Architecture

**Version:** 1.0  
**Status:** Active (canonical Member Management architecture)  
**Authority:** `docs/Member Management/02_Product_Architecture/`  
**Audience:** Product · Backend · Frontend · AI agents  
**Terminology:** [`PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md)  
**Last Updated:** July 28, 2026

**Index:** [`../00_Overview/MEMBER_DOCUMENTATION_INDEX.md`](../00_Overview/MEMBER_DOCUMENTATION_INDEX.md)

---

## Document Role

Defines Member Management as the **Admin Operations Center** for the Member Platform — mirrored conceptually by the Analyst Platform, with different responsibilities.

| This document owns | Cross-ref (do not duplicate) |
|--------------------|------------------------------|
| Member Admin IA, module map, Control Center role | Vision: `01_Product_Vision/` |
| Folder/route ownership for Members Admin | `docs/AI/Agents/Admin/06_…` |
| Phased delivery sequence | `06_Implementation/` |
| Field-level ownership matrix | Shared: `CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md` |

**Constraint:** Extend existing Admin shell/design language. Do not invent a parallel Admin UI system.

---

## 1. Core Philosophy

```text
Member Ecosystem                         Analyst Ecosystem
───────────────                          ─────────────────
Member                                   Analyst
  ↓                                        ↓
Registration                             Application
  ↓                                        ↓
Membership                               Evaluation
  ↓                                        ↓
Subscription                             Verification
  ↓                                        ↓
Learning                                 Partnership
  ↓                                        ↓
Community                                Publishing
  ↓                                        ↓
Referral Credits                         Commission
```

| Role | Responsibility |
|------|----------------|
| **Members** | Consume knowledge |
| **Analysts** | Create knowledge (independent partners) |
| **TraderCity** | Infrastructure |

---

## 2. Operational platform model

```text
Dashboard
        ↓
Shows WHAT requires attention.

Members Directory
        ↓
Shows WHO the members are.

Member Control Center
        ↓
Shows complete state of ONE member
(reflection + navigation — no domain writes).

Operational Domains
        ↓
Subscriptions · Discord · Referrals
```

| Surface | Answers | Depth |
|---------|---------|-------|
| Dashboard | What needs attention? | Aggregate queues |
| Directory | Who are our members? | Roster + System Health |
| Control Center | What is this member’s full state? | Per-member reflection |
| Operational domains | How do I run this capability? | Domain workspaces |

**UX rule:** Table / Queue → Inspector / Details → Control Center — [`../03_Frontend/OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md).

---

## 3. Module responsibilities

| Module | Responsibility | Owns writes? |
|--------|----------------|--------------|
| Dashboard | Attention inbox | No |
| Members Directory | Find, filter, health, navigate | Account status override (mock only today) |
| Member Control Center | Aggregate reflection + notes | Notes only |
| Subscriptions | Payment verification tickets + **Admin Approval gateway** | Yes (payments; Membership write **only after Approve**) |
| Discord | Role / connection / sync | Yes (Discord domain) |
| Referrals | Codes, credits, **Referral Redeem Requests** | Yes (Approve Redeem → Membership lifecycle) |
| Membership (backend) | Access SoT · activation source | Written by activation sources, not a page |

---

## 4. Locked decisions

1. Control Center is **not** a sidebar item.  
2. Membership is a **backend domain**, not an Admin page.  
3. Subscriptions own payments; Membership owns access.  
4. Design language frozen to approved `/admin`.  
5. Domain UI lives under `src/components/members/sections/` — never `admin/modules/`.  
6. `src/components/members/**` is **Admin** Member Domain UI — not member product dashboards (`src/components/dashboard/**`).  
7. Activation sources converge into Membership — [`MEMBERSHIP_ACTIVATION_SOURCES.md`](./MEMBERSHIP_ACTIVATION_SOURCES.md)  
8. Do not build Phases 7–9 (Reports / Settings / Notifications) during Phases 0–6.

---

## 5. Admin IA (Members section)

```text
Members
├── Dashboard          /admin
├── Members            /admin/members
├── Subscriptions      /admin/subscriptions
├── Discord            /admin/discord
└── Referrals          /admin/referrals
    └── Intelligence   /admin/referrals/intelligence

Control Center         /admin/members/[id]   (via Directory)
```

Shell also hosts Analysts + Content sections — separate documentation (`docs/Analyst/`).

---

## 6. Source ownership (code)

| Path | Role |
|------|------|
| `src/app/admin/**` | Routes |
| `src/components/admin/**` | Shared shell + UI primitives |
| `src/components/members/sections/**` | Member Management domain UI |
| `src/lib/members/**` | Hooks, mocks, formatters |
| `src/types/members/**` | Domain types |
| `src/lib/membership/**` | Member product pricing/verification libs — **do not import into Admin UI** |

Governance: `docs/00_Project_Governance/MODULE_OWNERSHIP.md`.

---

## Related

- Domain model: [`MEMBER_DOMAIN_MODEL.md`](./MEMBER_DOMAIN_MODEL.md)  
- Data flow: [`MEMBER_DATA_FLOW.md`](./MEMBER_DATA_FLOW.md)  
- Backend posture: [`MEMBER_BACKEND_INTEGRATION.md`](./MEMBER_BACKEND_INTEGRATION.md)
