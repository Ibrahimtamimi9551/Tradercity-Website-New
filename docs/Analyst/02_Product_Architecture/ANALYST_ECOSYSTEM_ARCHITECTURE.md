# Analyst Ecosystem Architecture

**Version:** 1.4.0  
**Status:** Active (canonical Analyst architecture)  
**Authority:** `docs/Analyst/02_Product_Architecture/`  
**Audience:** Product · Backend · Frontend · AI agents  
**Terminology:** [`docs/00_Project_Governance/PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md)  
**Last Updated:** July 24, 2026

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

Operational Domains
        ↓
Major business capabilities with internal workspaces
(Applications, Discord, Referrals, …)
```

| Surface | Answers | Depth |
|---------|---------|-------|
| Dashboard | What needs attention? | Aggregate |
| Directory | Who are our analyst partners? | Roster + quick inspect |
| Control Center | What can I do for this partner? | Per-analyst ops |
| Operational domains | How do I run this capability? | Domain workspaces |

**UX rule (platform-wide):** Table / Queue → Quick Inspector → Detail / Control Center — [`OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md).

**Nav rule:** Left navigation = **major operational domains**, not one item per screen. Domains may contain Dashboard · Queue · Directory · Operations · Intelligence workspaces (mirror Member `Referrals`).

**Program vs Intelligence:** Stage 1 builds the **Analyst Program** (Applicant → Active Partner). Stage 2 builds operational intelligence. See [`IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md).

---

## 3. Admin as Platform Operating System

UI section nouns (see [`PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md)):

```text
MEMBERS                          ← Member Platform / Member Domain
  Dashboard · Members · Subscriptions · Discord · Referrals

ANALYSTS                         ← Analyst Platform / Analyst Domain
  Dashboard · Directory · Applications · Discord · Referrals · Commission
  (+ Control Center via Directory)

CONTENT                          ← Content Platform / Content Domain (coming soon)
  Homepage · Landing Pages · Learning · Research · Reports · Events

(Reserved future UI)
  Commerce · Community · Platform
```

### Target Analyst sidebar domains

```text
Dashboard
Directory
Applications
  ├── Application Dashboard
  ├── Review Queue / Verification
  ├── Application Intelligence (Stage 2)
  └── Archive
Discord
  ├── Discord Dashboard
  ├── Discord Directory
  ├── Discord Operations
  └── Discord Intelligence (Stage 2)
Referrals
  ├── Referral Dashboard
  ├── Referral Directory
  ├── Referral Performance
  └── Archive
Commission
  ├── Commission Dashboard
  ├── Commission Directory
  ├── Payouts
  └── History
```

### Analyst Domain modules (Admin)

| Module (UI) | Purpose | Maturity |
|-------------|---------|----------|
| Dashboard | Ops inbox / KPIs | Shipped (mock) — [`DASHBOARD_ARCHITECTURE.md`](../03_Frontend/DASHBOARD_ARCHITECTURE.md) |
| Directory | Operational roster + Inspector | Shipped (mock) — [`DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md) |
| Applications | Intake + verification + evaluation pipeline | **Wave B shipped (mock)** — [`APPLICATIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md) |
| Discord | Analyst Discord ops (shared infra) | **Wave C shipped (mock)** — [`DISCORD_MODULE_ARCHITECTURE.md`](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md) |
| Onboarding | System Provisioning (under Applications) | **Wave D shipped (mock)** — [`ONBOARDING_MODULE_ARCHITECTURE.md`](../03_Frontend/ONBOARDING_MODULE_ARCHITECTURE.md) |
| Referrals | Partnership growth · identity · conversions | **Wave E shipped (mock)** — [`REFERRALS_MODULE_ARCHITECTURE.md`](../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md) |
| Commission | Financial Operations · payouts · ledger | **Wave F shipped (mock)** — [`COMMISSIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md) |
| Control Center | Per-analyst operational management | **Wave A shipped (mock)** — [`CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md) |
| Intelligence | Activity / health / BI | Stage 2 — roadmap Waves G–J |
| Automated Alerts | Cross-module attention | Deferred — [`AUTOMATED_ALERTS.md`](../04_Admin/AUTOMATED_ALERTS.md) |

**Folded shells:** Verification → Applications Review Queue · Partnership interview notes → Applications.

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
| Activity Status | Communication / engagement freshness | Directory (**Stage 2 Wave G**) · Alerts (future) |

Lifecycle Status ≠ Activity Status. Both are first-class. Activity Status is **not** Stage 1 work.

---

## 6. Route & folder ownership

### Admin routes

| Route | Role | Maturity |
|-------|------|----------|
| `/admin/analysts` | Dashboard | Phase 02 |
| `/admin/analysts/directory` | Directory (ops roster + Inspector) | Phase 03 |
| `/admin/analysts/applications` | Applications domain | **Wave B (mock)** |
| `/admin/analysts/applications/[id]` | Application Viewer (mobile) | **Wave B (mock)** |
| `/admin/analysts/discord` | Discord domain | **Wave C shipped (mock)** |
| `/admin/analysts/referrals` | Referrals domain | **Wave E shipped (mock)** |
| `/admin/analysts/onboarding` | Onboarding queue (optional) | Planned Wave D |
| `/admin/analysts/verification` | Redirect → Applications Review Queue | Folded (Wave B) |
| `/admin/analysts/partnerships` | Fold into Applications | Transitional shell |
| `/admin/analysts/commissions` | Commission Financial Ops | **Wave F shipped (mock)** |
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
| 05 / Wave A | Analyst Control Center | **Complete (mock)** — [`ANALYST_CONTROL_CENTER_IMPLEMENTATION.md`](../06_Implementation/ANALYST_CONTROL_CENTER_IMPLEMENTATION.md) |
| Stage 1 Waves B–F | Applications → Discord → Onboarding → Referrals → Commission | **Complete (mock)** — see [`IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md) |
| Stage 2 Waves F–I | Activity · Status · Ops Intelligence · BI | After Stage 1 operational |
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
| Left navigation | Major operational domains (not one screen per item) |
| Applications | Domain: form-aligned record + Dashboard + Review Queue + Evaluation Workspace + Archive |
| Approve handoff | **Partnership activation** — Analyst identity · Directory · Control Center · Discord · Referral reserved → Ready for Onboarding; Applications record entry only |
| Applications mobile | Dedicated detail page |
| Verification | Inside Applications Review Queue — not a sibling nav item |
| Discord / Referrals | First-class domains (mirror Member Platform) |
| Lifecycle stages | Structured evaluation per stage |
| Evaluation categories | Rating + notes (+ reviewer + timestamp) |
| Activity Status | Stage 2 — independent of Lifecycle; not Stage 1 |
| Stage 1 vs Stage 2 | Program (Applicant → Active) before Intelligence |
| Identity migration | **Future edge case** — merge existing Discord / VIP / referral identities only in final Analyst Management phase |
| Partner Analyst Dashboard | Design **after** Stage 1 foundation + docs bridge (Activity · Working Status · Data Contracts · Backend Sync) |
| Automated alerts | Deferred until Discord, Reports, Publishing, Commission, Performance, Content mature |
| Admin Dashboard | Evolve naturally as modules ship — no artificial expansion |

---

## 9b. Partnership activation (Applicant → Partner)

Once an application is approved, the system creates a **TraderCity Analyst** — not an extended Application:

```text
Application → Approved
────────────────────────
Create Analyst Identity
→ Create Directory Record
→ Create Control Center
→ Create Discord Record
→ Reserve Referral Record
→ Ready For Onboarding
```

Applications no longer own the analyst after this point.

### Future Edge Case — Identity migration (do not implement now)

An applicant may already exist in the TraderCity ecosystem (Discord member, Free/VIP member, referral participant).  
Reuse vs merge of identities, Discord IDs, and permissions must be designed holistically when Applications, Discord, Referrals, and Control Center all exist — not guessed during Wave C.

### Future Partner Dashboard sequencing

```text
Complete Analyst Management (Applications → Discord → Onboarding → Referrals)
→ THEN design Analyst Dashboard as a reflection of domain outputs
```

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
