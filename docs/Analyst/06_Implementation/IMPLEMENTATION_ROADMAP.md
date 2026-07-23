# Analyst Platform — Implementation Roadmap

**Version:** 2.0  
**Status:** Active (canonical coding sequence)  
**Date:** July 24, 2026  
**Authority:** `docs/Analyst/06_Implementation/`  
**Supersedes:** Wave sequence in [`PHASE_04.md`](./PHASE_04.md) §3 (Waves B–F as of 2026-07-23)

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
└── Referral Intelligence

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
| Commissions tracking (commercial) | Referrals (Wave E) + Control Center Commissions tab |
| Activity Status (Directory column) | **Stage 2 — Wave G** (not Stage 1) |

### Onboarding (Wave D)

Onboarding is a Stage 1 **lifecycle capability**. Primary surfaces:

- Control Center → Onboarding workspace (per partner)
- Optional domain queue (`/admin/analysts/onboarding`) if operators need a cross-analyst checklist board

Sidebar placement locks during Wave D architecture — do not invent a permanent nav item before that wave’s module doc is accepted.

---

## 3. Stage 1 — Operational Foundation

**Goal:** Analyst moves from **Applicant → Active Partner** and becomes a fully operational member of the TraderCity ecosystem.

At the completion of **Wave E**, the Analyst Program should be considered **operational**.

### Phase 01–05 ✅ Completed — Platform Foundation

| Phase | Deliverable | Status |
|-------|-------------|--------|
| Docs subsystem | `docs/Analyst/` | Complete |
| 01 | Documentation · section nav · shells | Complete |
| 02 | Product architecture · Analyst Dashboard | Complete |
| 03 | Directory · Inspector | Complete |
| 04 | Architecture refinement (docs) | Complete |
| 05 / Wave A | Control Center · Operational UX pattern · Backend planning · Mock-first frontend | Complete |

**Report:** [`PHASE_05_WAVE_A_IMPLEMENTATION.md`](./PHASE_05_WAVE_A_IMPLEMENTATION.md)

---

### Wave B — Applications ✅ **Complete**

**Report:** [`PHASE_05_WAVE_B_IMPLEMENTATION.md`](./PHASE_05_WAVE_B_IMPLEMENTATION.md)

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

**Report:** [`PHASE_05_WAVE_C_IMPLEMENTATION.md`](./PHASE_05_WAVE_C_IMPLEMENTATION.md)

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

### Wave D — Onboarding

**Purpose:** Guide newly approved analysts into becoming productive partners.

#### Scope

- Welcome Checklist  
- Profile Completion  
- Resource Access  
- Documentation  
- First Report Guidance  
- Required Tasks  
- Onboarding Progress  
- Completion Tracking  

**Goal:** Analyst becomes fully onboarded and production-ready (Discord Analyst role gate remains: Onboarding Complete → Assign Role).

| Step | Work |
|------|------|
| D1 | Onboarding architecture doc accepted (surfaces + nav placement) |
| D2 | Control Center Onboarding workspace (checklist + progress) |
| D3 | Optional cross-analyst Onboarding queue if needed |
| D4 | Completion tracking + mock “mark complete” → unlock Discord assign gate |
| D5 | Docs sync |

**Exit criteria:** Approved analyst can be tracked from agreement/onboarding start to production-ready complete in mock.

**Architecture:** [`../03_Frontend/ONBOARDING_MODULE_ARCHITECTURE.md`](../03_Frontend/ONBOARDING_MODULE_ARCHITECTURE.md)

---

### Wave E — Referral System

Mirror Member Platform referral architecture. Reuse existing referral business logic wherever possible.

#### Left navigation

```text
Referrals
```

#### Internal views

```text
Referrals
├── Referral Dashboard
├── Referral Directory
└── Referral Intelligence
```

#### Scope

- Referral Code  
- Invite Link  
- Referral Tracking  
- Referral Performance  
- Commission Tracking  
- Credit System  
- Future Payout Preparation  

**Goal:** Analyst partnership becomes commercially operational.

| Step | Work |
|------|------|
| E1 | Add Referrals to Analyst sidebar; domain shell |
| E2 | Referral Dashboard + Directory (mock) |
| E3 | Referral code / invite link / tracking surfaces |
| E4 | Commission / credit reflection (prep for payouts; no NestJS) |
| E5 | Control Center Referrals / Commissions tabs enriched |
| E6 | Docs sync |

**Exit criteria:** Operator can see partner referral + commission posture in-domain; Program considered **operational**.

**Architecture:** [`../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md`](../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md)

---

## 4. Stage 2 — Operational Intelligence (Future)

Only after Stage 1 (through Wave E) is complete.

This stage optimizes **active** partnerships rather than creating them.

### Future Wave F — Activity Tracking

- Reports Published  
- Lessons Created  
- Community Growth  
- Referral Activity  
- Publishing Frequency  
- Engagement Metrics  

### Future Wave G — Activity Status

Operational engagement states independent of partnership lifecycle, e.g.:

- Growing  
- Publishing  
- Needs Follow-up  
- Inactive  
- Action Required  

*(Supersedes prior Phase 04 “Wave B — Activity Status on Directory” as a Stage 1 item. Directory Activity Status ships here.)*

### Future Wave H — Operational Intelligence

- Attention Queue  
- Health Score  
- Priority Actions  
- Operational Dashboard enrichment  
- Smart Filters  
- Domain `* Intelligence` views (Applications / Discord / …)

### Future Wave I — Business Intelligence

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
  Wave D  Onboarding        ← NEXT
  Wave E  Referrals           → Program operational

Stage 2 — Analyst Intelligence
  Wave F  Activity Tracking
  Wave G  Activity Status
  Wave H  Operational Intelligence
  Wave I  Business Intelligence
```

---

## 6. What to do next

1. ~~Accept this roadmap~~  
2. ~~Begin **Wave B — Applications**~~ → **Complete** ([`PHASE_05_WAVE_B_IMPLEMENTATION.md`](./PHASE_05_WAVE_B_IMPLEMENTATION.md))  
3. ~~Begin **Stage 1 Wave C — Discord**~~ → **Complete** ([`PHASE_05_WAVE_C_IMPLEMENTATION.md`](./PHASE_05_WAVE_C_IMPLEMENTATION.md))  
4. Begin **Stage 1 Wave D — Onboarding** after review  
5. Keep [`DOCUMENTATION_SYNC_RULE.md`](./DOCUMENTATION_SYNC_RULE.md) mandatory after each wave  
6. Do **not** start Stage 2 (Activity Status, Intelligence) before Wave E completes unless product-owner explicitly overrides.  
7. Do **not** design partner Analyst Dashboard until Stage 1 operational foundation is complete.

---

## Related

- Prior architecture phase: [`PHASE_04.md`](./PHASE_04.md)  
- Wave A report: [`PHASE_05_WAVE_A_IMPLEMENTATION.md`](./PHASE_05_WAVE_A_IMPLEMENTATION.md)  
- Wave B report: [`PHASE_05_WAVE_B_IMPLEMENTATION.md`](./PHASE_05_WAVE_B_IMPLEMENTATION.md)  
- Wave C report: [`PHASE_05_WAVE_C_IMPLEMENTATION.md`](./PHASE_05_WAVE_C_IMPLEMENTATION.md)  
- Ecosystem IA: [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)  
- Status: [`../00_Overview/PROJECT_STATUS.md`](../00_Overview/PROJECT_STATUS.md)
