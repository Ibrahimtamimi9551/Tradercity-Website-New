# Analyst Ecosystem Architecture

**Version:** 1.3.0  
**Status:** Active (canonical Analyst architecture)  
**Authority:** `docs/Analyst/02_Product_Architecture/`  
**Audience:** Product · Backend · Frontend · AI agents  
**Terminology:** [`docs/00_Project_Governance/PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md)  
**Last Updated:** July 23, 2026

**Index:** [`../00_Overview/ANALYST_DOCUMENTATION_INDEX.md`](../00_Overview/ANALYST_DOCUMENTATION_INDEX.md)

---

## Document Role

Defines the Analyst Ecosystem as the **mirrored counterpart** of Member Platform — a partnership **operational platform**, not employment, freelance marketplace, or CRUD module.

| This document owns | Cross-ref (do not duplicate) |
|--------------------|------------------------------|
| Analyst lifecycle, incentives, Admin IA | Vision: `docs/Analyst/01_Product_Vision/` |
| Folder/route ownership for Analyst | Admin isolation law: `docs/AI/Agents/Admin/06_…` |
| Phased delivery sequence | `docs/Analyst/06_Implementation/` |
| Conceptual Member ↔ Analyst mirror | Shared patterns only — Member SoT remains Member docs |

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
  ↓                                        ↓
Lifecycle                                Growth → Lifecycle
```

| Role | Responsibility |
|------|----------------|
| **Members** | Consume knowledge |
| **Analysts** | Create knowledge (independent partners) |
| **TraderCity** | Infrastructure |

Admin surfaces for the **Analyst Platform** support analyst success — they do not treat analysts as staff.

---

## 2. Operational platform model

The Analyst Platform is an **operational ecosystem** for long-term partnerships:

```text
Dashboard
        ↓
Shows WHAT requires attention.

Directory
        ↓
Shows WHO the analysts are.

Control Center
        ↓
Allows Admin to manage ONE analyst
(including business operations).

Operational Modules
        ↓
Manage specialized workflows
(Application, Verification, Discord, Commission, etc.)
```

| Surface | Answers | Depth |
|---------|---------|-------|
| Dashboard | What needs attention? | Aggregate |
| Directory | Who are our analyst partners? | Roster + quick inspect |
| Control Center | What can I do for this partner? | Per-analyst ops |
| Operational modules | How do I run this workflow? | Domain-specific |

**UX rule (platform-wide):** Table / Queue → Quick Inspector → Detail / Control Center — [`OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md).

---

## 3. Admin as Platform Operating System

UI section nouns (see [`PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md)):

```text
MEMBERS                          ← Member Platform / Member Domain
  Dashboard · Members · Subscriptions · Discord · Referrals

ANALYSTS                         ← Analyst Platform / Analyst Domain
  Dashboard · Directory · Discord · Applications · Verification
  Partnerships · Commissions

CONTENT                          ← Content Platform / Content Domain (coming soon)
  Homepage · Landing Pages · Learning · Research · Reports · Events

(Reserved future UI)
  Commerce · Community · Platform
```

### Analyst Domain modules (Admin)

| Module (UI) | Purpose | Maturity |
|-------------|---------|----------|
| Dashboard | Ops inbox / KPIs | Shipped (mock) — [`DASHBOARD_ARCHITECTURE.md`](../03_Frontend/DASHBOARD_ARCHITECTURE.md) |
| Directory | Operational roster + Inspector | Shipped (mock) — [`DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md) |
| Discord | Analyst Discord reflection / sync (shared infra) | Planned — [`DISCORD_MODULE_ARCHITECTURE.md`](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md) |
| Applications | Intake + structured evaluation | Shell → next major workflow |
| Verification | Authenticity queue | Shell |
| Partnerships | Discussion / agreement | Shell |
| Commissions | Earnings / payouts | Shell |
| Control Center | Per-analyst operational management | **Wave A shipped (mock)** — [`CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md) |
| Intelligence / Features | BI / homepage merit | Future |
| Automated Alerts | Cross-module attention | Deferred — [`AUTOMATED_ALERTS.md`](../04_Admin/AUTOMATED_ALERTS.md) |

Route `/admin/analysts/referrals` remains as a shell (not in sidebar); attribution may move toward Community Platform later.

Detail: [`../04_Admin/ANALYST_ADMIN_WORKFLOW.md`](../04_Admin/ANALYST_ADMIN_WORKFLOW.md)

---

## 4. Conceptual mirroring (Member → Analyst)

| Member concept | Analyst equivalent |
|----------------|-------------------|
| Member Timeline | Analyst Timeline |
| Referral Credits / Wallet | Commission Wallet / Earnings |
| Member Intelligence | Analyst Intelligence |
| Member Lifecycle | Analyst Lifecycle |
| Member Directory | Analyst Directory |
| Member Control Center / Profile | Analyst Control Center (**ops + actions**) |
| Discord reflection (VIP role) | Discord reflection (**Analyst role**) |

Reuse Admin primitives and interaction patterns; domain data, triggers, and incentives differ.

### Discord (shared infrastructure)

| | Member | Analyst |
|-|--------|---------|
| Trigger | Membership verified → Assign VIP Role | Approved → Agreement → Onboarding complete → Assign Analyst Role |
| Payment / subscription | Required path | None |
| Infrastructure | Shared Discord platform | Same |
| Role | VIP | Analyst |

Do **not** invent a parallel Discord stack. Business logic changes; infrastructure does not.

---

## 5. Independent status dimensions

| Dimension | Meaning | Owner surface |
|-----------|---------|---------------|
| Lifecycle Status | Pipeline stage (`active`, `suspended`, …) | Directory · Control Center |
| Tier | Commercial maturity | Directory · Control Center |
| System Health | Operational attention signal | Directory · Dashboard |
| Activity Status | Communication / engagement freshness | Directory (planned) · Alerts (future) |

Lifecycle Status ≠ Activity Status. Both are first-class.

---

## 6. Route & folder ownership

### Admin routes

| Route | Role | Maturity |
|-------|------|----------|
| `/admin/analysts` | Dashboard | Phase 02 |
| `/admin/analysts/directory` | Directory (ops roster + Inspector) | Phase 03 |
| `/admin/analysts/discord` | Analyst Discord module | Planned |
| `/admin/analysts/applications` | Applications | Placeholder |
| `/admin/analysts/verification` | Verification | Placeholder |
| `/admin/analysts/partnerships` | Partnerships | Placeholder |
| `/admin/analysts/referrals` | Analyst referrals | Placeholder (not in nav) |
| `/admin/analysts/commissions` | Commissions | Placeholder |
| `/admin/analysts/[id]` | Control Center | Wave A (mock) |

### Source ownership

```text
src/app/admin/analysts/**              # thin routes
src/components/admin/**                # shared shell (not Analyst-owned)
src/components/analysts/sections/**    # Analyst domain UI
src/lib/analysts/mock/** + hooks/**
src/types/analysts/**
```

**Do not** nest Analyst UI under `admin/modules/` or inside `members/`.

### Public surfaces (deferred)

| Route | Role |
|-------|------|
| `/analysts` | Landing |
| `/analysts/apply` | Application |
| Partner dashboard | Self-serve (future) |

Build public surfaces after the Analyst Platform Admin foundation is stable.

---

## 7. Homepage integration (future)

Merit-based only: Featured Analyst · Top Research · Trending · Fastest Growing · Community Favourite · Educational Leader.  

Marketing Homepage “Analyst Team” remains presentation-only until wired here.

---

## 8. Phased delivery

| Phase | Deliverable | Status |
|-------|-------------|--------|
| Docs subsystem | `docs/Analyst/` | Active |
| 01 | Domain nav + shells | Complete |
| 02 | Analyst Dashboard | Complete |
| 03 | Analyst Directory | Complete |
| 04 | Architecture refinement + implementation plan | Complete (docs) |
| 05 / Wave A | Analyst Control Center | **Complete (mock)** — [`PHASE_05_WAVE_A_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md) |
| Next coding | Wave B Activity → C Applications → D Discord → … | See [`PHASE_04.md`](../06_Implementation/PHASE_04.md) |
| Public | Landing · Apply · Partner dashboard | Pending |
| Backend | Replace mocks | Pending |

---

## 9. Architecture decisions (locked)

| Decision | Rule |
|----------|------|
| Discord infrastructure | Shared with Members |
| Analyst Discord role | Analyst role — not VIP |
| Directory | Remains lightweight operational roster |
| Right panel | Inspection only — never a second Control Center |
| Username click | Opens Analyst Control Center |
| Three-dot menu | Operational entry points (navigate / workflows) |
| Suspension / close / reactivate | Belong in Control Center Administration |
| Applications | Table + wider inline Application Viewer |
| Applications mobile | Dedicated detail page |
| Lifecycle stages | Structured evaluation per stage |
| Evaluation categories | Rating + notes (+ reviewer + timestamp) |
| Automated alerts | Deferred until Discord, Reports, Publishing, Commission, Performance, Content mature |
| Dashboard | Evolve naturally as modules ship — no artificial expansion |

---

## 10. Engineering workflow (Analyst)

```text
Business Idea → Product Discussion → Architecture
  → Plan under docs/Analyst/06_Implementation/
  → Frontend (mock) → Implementation report / phase record
  → Backend reads docs/Analyst/05_Backend/ → API integration
```

Docs sync is mandatory: [`DOCUMENTATION_SYNC_RULE.md`](../06_Implementation/DOCUMENTATION_SYNC_RULE.md).

---

## 11. Authority stack (Analyst work)

1. `docs/Analyst/` (this subsystem) — Analyst product & execution truth  
2. Shared Admin design freeze / isolation (`docs/AI/Agents/Admin/02`, `06`) — shell only  
3. Shared governance (`docs/00_Project_Governance/`) — process / ownership  
4. Membership / Auth SoT docs — only where Analyst touches member identity  

When UI and architecture disagree: implementation maturity wins for “what exists”; this architecture wins for “what the product is.”
