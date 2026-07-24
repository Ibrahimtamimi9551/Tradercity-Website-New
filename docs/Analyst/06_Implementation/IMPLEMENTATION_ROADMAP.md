# Analyst Platform — Implementation Roadmap

**Version:** 2.0  
**Status:** Active (canonical coding sequence)  
**Date:** July 24, 2026  
**Authority:** `docs/Analyst/06_Implementation/`  
**Supersedes:** Wave sequence in [`ANALYST_ARCHITECTURE_REFINEMENT_IMPLEMENTATION.md`](./ANALYST_ARCHITECTURE_REFINEMENT_IMPLEMENTATION.md) §3 (Waves B–F as of 2026-07-23)

---

## 0. Governance framing

| Item | Value |
|------|-------|
| Roadmap item | Analyst Platform — Stage 1 Program → Stage 2 Intelligence |
| Owning domain | `analyst` |
| Allowed paths (docs) | `docs/Analyst/**` |
| Next coding paths | `src/app/admin/analysts/**` · `src/components/analysts/**` · `src/lib/analysts/**` · `src/types/analysts/**` · thin nav in `src/components/admin/layout/nav-config.ts` |
| Not in scope yet | NestJS · public `/analysts` · Automated Alerts · Stage 2 intelligence coding |

---

## 1. Core philosophy

We are currently building the **Analyst Program**, not the **Analyst Intelligence System**.

| Stage | Focus | Priority |
|-------|-------|----------|
| **Stage 1 — Operational Foundation** | Everything required for **Applicant → Active Partner** | **Now** |
| **Stage 2 — Operational Intelligence** | Activity tracking, health, analytics, forecasting | **Only after Stage 1 is operational** |

First priority: partnership establishment and administration so an analyst can successfully join and become a fully operational member of the TraderCity ecosystem.

Only after the complete partnership lifecycle is operational should we implement operational intelligence, activity tracking, analytics, and performance monitoring.

---

## 2. Navigation philosophy

**Left navigation represents major operational domains**, not single screens.

Each domain owns multiple related workflows / internal workspaces — same pattern as Member Platform (`Referrals` → Referral Dashboard · Referral Intelligence).

### Target Analyst sidebar (Stage 1)

```text
Dashboard

Directory

Applications
 ├── Application Dashboard
 ├── Review Queue / Verification
 ├── Application Intelligence (future — Stage 2)
└── Archive

Discord
 ├── Discord Dashboard
 ├── Discord Directory
 ├── Discord Operations
└── Discord Intelligence (future — Stage 2)

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

(+ Control Center — per-analyst hub; opened from Directory, not a flat roster duplicate)
```

| Principle | Rule |
|-----------|------|
| Domain ≠ screen | One sidebar item per major business capability |
| Internal workspaces | Domains expose Dashboard / Queue / Directory / Operations / Intelligence as needed |
| No workflow splits | Application → Verification → Evaluation stay inside **Applications** |
| Mirror Members | Discord and Referrals are first-class domains, like Member Platform |
| Intelligence later | `* Intelligence` views ship in Stage 2 without restructuring nav |

### Transitional nav (current code)

Until Wave B+ ships, sidebar may still show legacy shells (`Verification`, `Partnerships`, `Commissions`). Those are **transitional**. Target IA above is authoritative for planning and future nav edits.

### Folded / relocated shells

| Legacy shell | Target home |
|--------------|-------------|
| `/admin/analysts/verification` | Applications → Review Queue |
| Partnership discussion / interview | Applications → Review Queue (notes + stage evaluation) |
| Commissions tracking (commercial) | **Commission domain (Wave F)** · Control Center summary |
| Activity Status (Directory column) | **Stage 2 — Wave G** (not Stage 1) |

### Onboarding (Wave D) ✅

Onboarding is **Admin System Provisioning** inside Applications — not analyst education.

```text
Applications
├── Dashboard
├── Review Queue
├── Onboarding   ← verify module initialization after Approve
└── Archive
```

Partner orientation belongs to the **future Analyst Dashboard**.

---

## 3. Stage 1 — Operational Foundation

**Goal:** Analyst moves from **Applicant → Active Partner** and becomes a fully operational member of the TraderCity ecosystem.

At the completion of **Wave F**, the Analyst Program’s **operational foundation** (Applicant → Active Partner → Referral → Financial settlement) is complete.

### Phase 01–05 ✅ Completed — Platform Foundation

| Phase | Deliverable | Status |
|-------|-------------|--------|
| Docs subsystem | `docs/Analyst/` | Complete |
| 01 | Documentation · section nav · shells | Complete |
| 02 | Product architecture · Analyst Dashboard | Complete |
| 03 | Directory · Inspector | Complete |
| 04 | Architecture refinement (docs) | Complete |
| 05 / Wave A | Control Center · Operational UX pattern · Backend planning · Mock-first frontend | Complete |

**Report:** [`ANALYST_CONTROL_CENTER_IMPLEMENTATION.md`](./ANALYST_CONTROL_CENTER_IMPLEMENTATION.md)

---

### Wave B — Applications ✅ **Complete**

**Report:** [`ANALYST_APPLICATIONS_IMPLEMENTATION.md`](./ANALYST_APPLICATIONS_IMPLEMENTATION.md)

Applications is a **complete operational domain**, not only an application list.

**Reasoning:** Application and Verification are the same business workflow. They must not be separate navigation sections. Application → Verification → Evaluation is one operational pipeline.

#### Left navigation

```text
Applications
```

#### Internal views

```text
Applications
├── Application Dashboard ✅
├── Review Queue / Verification ✅
├── Onboarding (System Provisioning) ✅ Wave D
├── Application Intelligence (future — Stage 2)
└── Archive ✅
```

| Step | Work | Status |
|------|------|--------|
| B1 | Domain shell + Application Dashboard (status queues) | Done |
| B2 | Review Queue table + wider Application Viewer | Done |
| B3 | Summary columns only on queue; full application in Viewer | Done |
| B4 | Verification + evaluation + notes inside Review Queue | Done |
| B5 | Decision actions: Approve · Reject · Request Information | Done |
| B6 | Fold Verification shell into Applications IA | Done (nav remove + redirect) |
| B7 | Mobile dedicated `/admin/analysts/applications/[id]` | Done |
| B8 | Archive view (minimal mock) | Done |
| B9 | Docs sync | Done |

**Exit criteria met:** Operator can run Application → Verification → Evaluation → decision as a single mock pipeline without leaving Applications.

**Refinement (2026-07-24):** Form-aligned data model · Evaluation Workspace · Approve partnership handoff for Wave C.

---

### Wave C — Discord ✅ **Complete**

**Report:** [`ANALYST_DISCORD_IMPLEMENTATION.md`](./ANALYST_DISCORD_IMPLEMENTATION.md)

Discord is a **first-class operational domain**, mirroring Member Management architecture with Analyst-specific business logic.

#### Left navigation

```text
Discord
```

#### Internal views

```text
Discord
├── Discord Dashboard ✅
├── Discord Directory ✅
├── Discord Operations ✅
└── Discord Intelligence (future — Stage 2)
```

#### Scope (shipped)

**Discord Dashboard** — Connected Analysts · Pending Connections · Pending Invitations · Sync Errors · Disconnected · Role Assignment Issues  

**Discord Directory** — Analyst · Discord Username · Connection Status · Assigned Role · Server Status · Last Sync  

**Discord Operations** — Generate/Copy Invite · Connect · Reconnect · Synchronize Roles · Assign / Remove Role · Disconnect · Audit History  

| Step | Work | Status |
|------|------|--------|
| C1 | Nav + `/admin/analysts/discord` domain shell (Dashboard default) | Done |
| C2 | Mirror Member Discord patterns (account, role, sync, logs) | Done |
| C3 | Directory + Operations workspaces | Done |
| C4 | Control Center Discord tab reflection | Done |
| C5 | Document assign-role gate (post-onboarding); mock only | Done |
| C6 | Reuse shared sync patterns — **no new Discord stack** | Done (UI) |
| C7 | Partnership activation on Approve (Directory · Discord · referral reserved) | Done |
| C8 | Docs sync + architectural principles (identity migration · Applicant→Partner · dashboard deferred) | Done |

**Exit criteria met:** Operators manage Analyst Discord link/role/sync health from one domain; Control Center reflects the same partner; Wave B Approve feeds Discord records.

**Architecture:** [`../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md`](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md)

---

### Wave D — Onboarding ✅ **Complete**

**Report:** [`ANALYST_ONBOARDING_IMPLEMENTATION.md`](./ANALYST_ONBOARDING_IMPLEMENTATION.md)

**Purpose:** Verify TraderCity provisioned every required operational module after Approve.

#### Scope (shipped)

- Applications → Onboarding sub-view  
- System Initialization checklist (Identity · Directory · Control Center · Discord · Referral · Commission · Backend)  
- Overall status: Operationally Ready · Provisioning Required · Failed  
- No analytics / KPIs / progress %  
- Analyst Dashboard Profile marked Future  
- Orientation / education deferred to partner Analyst Dashboard  

| Step | Work | Status |
|------|------|--------|
| D1 | Architecture: provisioning philosophy + Applications placement | Done |
| D2 | Onboarding queue + System Provisioning panel | Done |
| D3 | Consume Applications + Discord (+ Directory / CC) outputs | Done |
| D4 | Overall readiness + failed Retry affordance | Done |
| D5 | Docs sync | Done |

**Exit criteria met:** Admin can verify post-approval provisioning without teaching the analyst or duplicating domain data.

**Architecture:** [`../03_Frontend/ONBOARDING_MODULE_ARCHITECTURE.md`](../03_Frontend/ONBOARDING_MODULE_ARCHITECTURE.md)

---

### Wave E — Referral System ✅ **Complete**

**Report:** [`ANALYST_REFERRALS_IMPLEMENTATION.md`](./ANALYST_REFERRALS_IMPLEMENTATION.md)

Referrals is a **first-class operational domain** for partnership growth.

#### Left navigation

```text
Referrals
```

#### Internal views

```text
Referrals
├── Dashboard ✅
├── Directory ✅
├── Performance ✅
└── Archive ✅
```

#### Scope (shipped)

- Referral Identity · Code · Link (compact display + copy full URL)  
- Referral Status: **Enabled / Disabled** only (+ filters)  
- Performance counts + membership plan breakdown (Monthly · Quarterly · Yearly · Lifetime)  
- Analyst Profile / Control Center referral summary  
- Commission **prep only** — no payout math  

| Step | Work | Status |
|------|------|--------|
| E1 | Add Referrals to Analyst sidebar; domain shell | Done |
| E2 | Referral Dashboard + Directory + Performance + Archive | Done |
| E3 | Referral code / link / tracking surfaces + Profile | Done |
| E4 | Commission prep exposure (no NestJS / no math) | Done |
| E5 | Control Center Referrals tab + Directory Inspector summary | Done |
| E6 | Docs sync | Done |

**Exit criteria met:** Operator manages partner referral posture in-domain; Program considered **operational**. Commission deferred to Wave F.

**Architecture:** [`../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md`](../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md)

---

### Wave F — Commission ✅ **Complete**

**Report:** [`ANALYST_COMMISSION_IMPLEMENTATION.md`](./ANALYST_COMMISSION_IMPLEMENTATION.md)

Commission is a **first-class Financial Operations domain** — the financial outcome of Referrals, plus manual USDT BEP-20 payout recording.

#### Left navigation

```text
Commission
```

#### Internal views

```text
Commission
├── Dashboard ✅  (program KPIs · full analyst workspace)
├── Directory ✅  (roster · slim inspector)
├── Payouts ✅    (search → one card)
└── History ✅
```

#### Scope (shipped)

- Commission Identity · Pending / Approved / Paid lifecycle  
- Referral credit model: Monthly $10 · Quarterly $30 · Yearly $60 (no Lifetime)  
- **Slim Directory inspector** vs **Dashboard operational workspace**  
- Breakdown `N × $credit` · Referral Commission Records · timeline · payment details (on Dashboard)  
- Billing cycle · Monthly Business · Next Tier progress bar (auto %)  
- Search-first Payouts (one analyst at a time · copy wallet · tx hash)  
- Copy actions for wallet · tx · referral code/link  
- Permanent payout ledger · payment evidence / dispute placeholders  
- Control Center + Directory Inspector commission summary  

| Step | Work | Status |
|------|------|--------|
| F1 | Add Commission to Analyst sidebar; domain shell | Done |
| F2 | Dashboard · Directory · Payouts · History | Done |
| F3 | Slim inspector + Dashboard workspace | Done |
| F4 | Manual crypto payout workflow (mock) | Done |
| F5 | Control Center + Directory summary; consume Referrals | Done |
| F6 | Docs sync (architecture · API · status · changelog) | Done |
| F7 | Credit model · Referral Commission Records · Next Tier · copy | Done |
| F8 | Hierarchy refinement (slim profile · search-first payouts) | Done |

**Exit criteria met:** Stage 1 operational foundation complete (mock-first). NestJS calculation / real chain deferred.

**Architecture:** [`../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md)

---

## 4. Stage 2 — Operational Intelligence (Future)

Only after Stage 1 (through Wave F Commission) is complete.

**Before coding the partner Analyst Dashboard:** document Activity Tracking, Working Status, Dashboard Data Contracts, and Backend Sync Strategy.

This stage optimizes **active** partnerships rather than creating them.

### Future Wave G — Activity Tracking

- Reports Published  
- Lessons Created  
- Community Growth  
- Referral Activity  
- Publishing Frequency  
- Engagement Metrics  

### Future Wave H — Activity Status

Operational engagement states independent of partnership lifecycle, e.g.:

- Growing  
- Publishing  
- Needs Follow-up  
- Inactive  
- Action Required  

*(Supersedes prior Phase 04 “Wave B — Activity Status on Directory” as a Stage 1 item. Directory Activity Status ships here.)*

### Future Wave I — Operational Intelligence

- Attention Queue  
- Health Score  
- Priority Actions  
- Operational Dashboard enrichment  
- Smart Filters  
- Domain `* Intelligence` views (Applications / Discord / …)

### Future Wave J — Business Intelligence

- Performance Trends  
- Revenue Analytics  
- Growth Analytics  
- Forecasting  
- Automation  
- Partner Success Metrics  

### Explicitly deferred (unchanged)

| Item | When |
|------|------|
| Automated Alerts | After Discord, Reports, Publishing, Commission, Performance, Content mature |
| Public landing / apply | After Admin Stage 1 ops stabilize |
| NestJS integration | Per [`ANALYST_BACKEND_INTEGRATION.md`](../02_Product_Architecture/ANALYST_BACKEND_INTEGRATION.md) |
| Artificial Dashboard expansion | Never before owning modules exist |

---

## 5. Sequence summary

```text
Stage 1 — Analyst Program
  Phases 01–05 / Wave A     ✅ Foundation (Dashboard · Directory · Control Center)
  Wave B  Applications      ✅ Complete
  Wave C  Discord           ✅ Complete
  Wave D  Onboarding        ✅ Complete (System Provisioning)
  Wave E  Referrals         ✅ Complete
  Wave F  Commission        ✅ Complete → Stage 1 foundation complete

Stage 1 → Docs bridge (recommended before partner dashboard)
  Activity Tracking · Working Status · Data Contracts · Backend Sync

Stage 2 — Analyst Intelligence
  Wave G  Activity Tracking
  Wave H  Activity Status
  Wave I  Operational Intelligence
  Wave J  Business Intelligence
```

---

## 6. What to do next

1. ~~Accept this roadmap~~  
2. ~~Begin **Wave B — Applications**~~ → **Complete** ([`ANALYST_APPLICATIONS_IMPLEMENTATION.md`](./ANALYST_APPLICATIONS_IMPLEMENTATION.md))  
3. ~~Begin **Stage 1 Wave C — Discord**~~ → **Complete** ([`ANALYST_DISCORD_IMPLEMENTATION.md`](./ANALYST_DISCORD_IMPLEMENTATION.md))  
4. ~~Begin **Stage 1 Wave D — Onboarding**~~ → **Complete** ([`ANALYST_ONBOARDING_IMPLEMENTATION.md`](./ANALYST_ONBOARDING_IMPLEMENTATION.md))  
5. ~~Begin **Stage 1 Wave E — Referrals**~~ → **Complete** ([`ANALYST_REFERRALS_IMPLEMENTATION.md`](./ANALYST_REFERRALS_IMPLEMENTATION.md))  
6. ~~Begin **Stage 1 Wave F — Commission**~~ → **Complete** ([`ANALYST_COMMISSION_IMPLEMENTATION.md`](./ANALYST_COMMISSION_IMPLEMENTATION.md))  
7. Keep [`DOCUMENTATION_SYNC_RULE.md`](./DOCUMENTATION_SYNC_RULE.md) mandatory after each wave  
8. **Docs bridge** — Activity Tracking · Working Status · Dashboard Data Contracts · Backend Sync (before partner Analyst Dashboard coding)  
9. Do **not** start Stage 2 Intelligence coding until the docs bridge is accepted unless product-owner explicitly overrides.  
10. Partner Analyst Dashboard aggregates completed domains — it must not own commission/referral business logic.

---

## Related

- Prior architecture phase: [`ANALYST_ARCHITECTURE_REFINEMENT_IMPLEMENTATION.md`](./ANALYST_ARCHITECTURE_REFINEMENT_IMPLEMENTATION.md)  
- Control Center report: [`ANALYST_CONTROL_CENTER_IMPLEMENTATION.md`](./ANALYST_CONTROL_CENTER_IMPLEMENTATION.md)  
- Applications report: [`ANALYST_APPLICATIONS_IMPLEMENTATION.md`](./ANALYST_APPLICATIONS_IMPLEMENTATION.md)  
- Discord report: [`ANALYST_DISCORD_IMPLEMENTATION.md`](./ANALYST_DISCORD_IMPLEMENTATION.md)  
- Onboarding report: [`ANALYST_ONBOARDING_IMPLEMENTATION.md`](./ANALYST_ONBOARDING_IMPLEMENTATION.md)  
- Referrals report: [`ANALYST_REFERRALS_IMPLEMENTATION.md`](./ANALYST_REFERRALS_IMPLEMENTATION.md)  
- Commission report: [`ANALYST_COMMISSION_IMPLEMENTATION.md`](./ANALYST_COMMISSION_IMPLEMENTATION.md)  
- Ecosystem IA: [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)  
- Status: [`../00_Overview/PROJECT_STATUS.md`](../00_Overview/PROJECT_STATUS.md)
