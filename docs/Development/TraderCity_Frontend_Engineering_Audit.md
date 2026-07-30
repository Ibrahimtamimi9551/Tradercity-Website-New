# TraderCity Frontend Engineering Audit

**Version:** 1.0.0  
**Date:** 2026-07-22  
**Status:** Official Engineering Analysis (documentation only)  
**Authority:** Engineering Documentation / Product Architecture  
**Audience:** Backend engineers · Frontend engineers · AI coding agents · Product owners  
**Constraint:** No application code was modified for this audit.

---

## Document Role

This report answers one question:

> Is TraderCity’s current frontend documentation sufficient for backend integration, new AI agents, new frontend engineers, and six-month maintenance?

It inventories every related document, audits every implemented frontend module, assesses Admin and Member documentation completeness, scores backend/AI readiness, and defines an action plan.

**Related canonical architecture (do not replace):**

| Doc | Role |
|-----|------|
| [`CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md`](../04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md) | Field ownership / Membership domain |
| [`TRADERCITY_ADMIN_ECOSYSTEM_AND_USER_LIFECYCLE_ARCHITECTURE.md`](../04_Product_Architecture/TRADERCITY_ADMIN_ECOSYSTEM_AND_USER_LIFECYCLE_ARCHITECTURE.md) | Admin ecosystem + lifecycle |
| [`REFERRAL_SYSTEM_ARCHITECTURE.md`](../04_Product_Architecture/REFERRAL_SYSTEM_ARCHITECTURE.md) | Referral domain contract |
| [`MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md`](../04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md) | **Created by this audit** — Free/VIP + Auth API expectations |

---

## Executive Verdict

| Question | Answer |
|----------|--------|
| Can a backend engineer start designing APIs today? | **Partially yes** — strong for Referral, Membership ownership, Admin Members/Profile/Discord/Referrals shapes, Payment Quote philosophy (`08`). Weak for Auth/session and Free/VIP member APIs until the new integration doc is used. |
| Can a new AI agent continue safely? | **Yes for Admin UI rules and Homepage freeze**; must read governance + Cross-Module + this audit. Risk: stale Admin `PROJECT_STATUS` previously said Discord/Referrals not started while UI exists. |
| Can a new frontend engineer onboard? | **Yes for Admin + Homepage**; **thin for Free/VIP dashboards and Login**. |
| Ready for six-month maintenance? | **Not yet** without completing recommended docs and fixing status drift. |

**Overall Engineering Documentation Score: 72 / 100**

| Dimension | Score | Notes |
|-----------|------:|-------|
| Homepage documentation | 90 | Excellent agent handbook + phase records |
| Admin vision / UI contracts | 88 | Strong `00`–`08` + Product Architecture |
| Admin implementation records | 70 | Phases 0–3 solid; 4–6 status drift |
| Cross-module / Membership ownership | 92 | Cross-Module Sync + Ecosystem docs |
| Referral backend contract | 95 | Best-in-repo product architecture |
| Payment / pricing behavior | 80 | Admin `08` strong; no NestJS schema (intentional) |
| Member Free/VIP documentation | 45 | Was sparse → addressed by new integration doc |
| Auth / Login documentation | 35 | Was sparse → addressed by new integration doc |
| Live API contracts | 25 | Types + TODOs only; no OpenAPI |
| Doc–code consistency | 60 | Improved if PROJECT_STATUS updated with this audit |

---

## Table of Contents

1. [Documentation Inventory](#1-documentation-inventory)
2. [Implemented Module Inventory](#2-implemented-module-inventory)
3. [Per-Module Frontend → Backend Integration](#3-per-module-frontend--backend-integration)
4. [Admin Dashboard Documentation Review](#4-admin-dashboard-documentation-review)
5. [Member Dashboard Documentation Review](#5-member-dashboard-documentation-review)
6. [Frontend Architecture Review](#6-frontend-architecture-review)
7. [Backend Developer Readiness](#7-backend-developer-readiness)
8. [AI Agent Readiness](#8-ai-agent-readiness)
9. [Missing Documentation](#9-missing-documentation)
10. [Recommended New Documents](#10-recommended-new-documents)
11. [Action Plan](#11-action-plan)
12. [Appendix — Doc Catalog by Topic](#12-appendix--doc-catalog-by-topic)

---

## 1. Documentation Inventory

### 1.1 Corpus size

| Location | Approx. count | Role |
|----------|--------------:|------|
| `docs/00_Project_Governance/` | 14 | Engineering law |
| `docs/04_Product_Architecture/` | 3 (+1 from this audit) | Canonical product/backend contracts |
| `docs/AI/Agents/Admin/` | 9 | Admin handbook |
| `docs/AI/Agents/Homepage/` | 13 | Homepage handbook |
| `docs/Development/` | 13+ | Phase logs / status / this audit |
| `docs/Universal/` | 3 | PRD + constitutions |
| `docs/Frontend/` | 1 | Homepage blueprint |
| `docs/AI/Playbooks/` | 4 | Agent prompts |
| Root (`AGENTS.md`, etc.) | 4 | Agent bootstrap |
| `.cursor/rules/` | 5 | Always-on rules |

### 1.2 Topic coverage (before this audit’s new doc)

| Topic | Docs exist? | Depth | Backend readiness of docs |
|-------|-------------|-------|---------------------------|
| Homepage | Yes | Strong | N/A (marketing) |
| Admin Dashboard | Yes | Strong | Partial–Strong |
| Members / User Profile | Yes | Strong | Partial |
| Referral System | Yes | Strong | **Strong** |
| Discord Integration | Yes (in Admin + Cross-Module) | Partial | Partial |
| Subscription System | Yes (specs + `08`) | Strong vision / Shell UI | Partial |
| Membership System | Yes (Cross-Module) | Strong ownership | Strong |
| Payment Verification | Yes (`08` + types) | Strong behavior | Partial |
| Pricing | Yes | Strong | Partial |
| Payment Activation | Yes (`08` + UI) | Partial | Partial |
| Login / Auth | Weak mentions only | Weak | Weak |
| Free Dashboard | Mentions only | Weak | Weak |
| VIP Dashboard | Mentions only | Weak | Weak |
| Folder / Repo Architecture | Yes | Strong | N/A–Partial |
| Engineering Rules | Yes | Strong | N/A |
| Product Requirements | Yes (PRD) | Partial | Partial |

---

## 2. Implemented Module Inventory

**Backend readiness score (0–10):** documentation + UI shapes clarity for NestJS design — **not** “backend is implemented.”

| Module | Route(s) | Docs exist? | Impl status | Backend readiness | Missing information |
|--------|----------|-------------|-------------|-------------------:|---------------------|
| Homepage | `/` | Yes | Complete (UI) | 3 | CMS vs hardcode; Discord invite source |
| Pricing | `/pricing` | Yes | Complete (UI) | 6 | Checkout → Payment Quote → `/payment-activation` handoff |
| Login | `/login` | Weak → **new doc** | Partial (fake OAuth) | 4 | Full auth provider + session + redirects |
| Payment Activation | `/payment-activation` | Yes (`08`) | Partial | 7 | Persist quote; chain verify; activation events |
| Free Dashboard | `/dashboard/free` | Weak → **new doc** | Complete (UI mock) | 5 | Member session DTO; entitlements |
| VIP Dashboard | `/dashboard/vip` | Weak → **new doc** | Complete (UI mock) | 5 | Membership + credits + referral member APIs |
| Admin Dashboard | `/admin` | Yes | Complete (mock) | 7 | Aggregate APIs; export; queue entity |
| Admin Members | `/admin/members` | Yes | Complete (mock) | 8 | Filter API; health derivation server-side |
| Admin User Profile | `/admin/members/[id]` | Yes | Complete (mock) | 8 | Aggregate DTO; notes CRUD; activity feed |
| Admin Subscriptions | `/admin/subscriptions` | Specs yes | **Shell** | 6 | UI not built; ticket APIs still designable from `03`/`08` |
| Admin Discord | `/admin/discord`, `[id]` | Specs + Cross-Module | Complete (mock) | 7 | Bot/webhook contract; Phase record |
| Admin Referrals Ops | `/admin/referrals`, `[id]` | **Strong** Referral arch | Complete (mock) | 9 | Map UI fields 1:1 to Referral arch entities |
| Admin Referral Intelligence | `/admin/referrals/intelligence` | Referral arch | Complete (mock) | 8 | Read-only analytics API periods |
| Auth middleware / RBAC | — | Weak → **new doc** | **Missing** | 2 | Entire auth stack |
| Admin Payments page | — | Deferred by design | Missing (OK) | N/A | Owned by Subscriptions |
| Reports / Notifications / Audit / Settings | — | Deferred Phases 7–9 | Missing | N/A | Future |

**Global facts:**

- **15** `page.tsx` routes under `src/app`.
- **No** NestJS clients, **no** auth library, **no** `middleware.ts` route guards.
- Admin data: `src/lib/members/mock/*` + hooks with `TODO(NestJS)`.
- Member dashboards: inline mocks inside components.

---

## 3. Per-Module Frontend → Backend Integration

Do **not** implement backend from this section. It documents **expected** integration.

### 3.1 Homepage `/`

| | |
|--|--|
| **Purpose** | Convert visitors into Free members or VIP purchase interest. |
| **Business goal** | Top-of-funnel acquisition and brand trust. |
| **User flow** | Scroll narrative → Pricing CTAs → Login (`?plan=free`) or pricing/payment paths. |
| **APIs** | Optional CMS for sections; Discord invite URL config; analytics events. |
| **Entities** | Content blocks (optional); SiteConfig. |
| **Auth** | None required to view. |
| **Permissions** | Public. |
| **Events / WS** | Marketing analytics only. |
| **Loading / error** | Image/font fallbacks; no data fetch today. |

### 3.2 Pricing `/pricing`

| | |
|--|--|
| **Purpose** | Present membership plans and price decisions. |
| **Business goal** | Drive VIP conversion with clear plan economics. |
| **User flow** | Select plan → CTA (today scrolls to selector; should hand off to Payment Quote / activation). |
| **APIs** | `GET /membership/plans` (or static catalog); `POST /payments/quotes` (issue Payment Quote). |
| **Entities** | MembershipPlan; PaymentQuote; PriceBreakdown; WelcomeCredit rules. |
| **Auth** | Quote issuance should require authenticated member (or create account first). |
| **Permissions** | Member. |
| **Events** | `PaymentQuoteIssued`. |
| **Loading / error** | Plan load failure; quote rejected; eligibility errors. |

### 3.3 Login `/login`

| | |
|--|--|
| **Purpose** | Authenticate / register members (Google / Discord intended). |
| **Business goal** | Account creation and session establishment. |
| **User flow** | Choose provider → OAuth → redirect by intent (`plan=free` → Free Dashboard; VIP path → Payment Activation). **Today:** Google hard-navigates to `/dashboard/free`; Discord CTA non-functional. |
| **APIs** | OAuth start/callback; `GET /me`; session refresh/logout. |
| **Entities** | User; IdentityProviderLink; Session. |
| **Auth** | Core of the system. |
| **Permissions** | Public entry → authenticated. |
| **Events** | `UserRegistered`; `UserLoggedIn`; `DiscordLinked`. |
| **Loading / error** | OAuth cancel; account conflict; provider down. |

See [`MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md`](../04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md).

### 3.4 Payment Activation `/payment-activation`

| | |
|--|--|
| **Purpose** | Collect payment proof and complete VIP activation journey. |
| **Business goal** | Convert payment into Membership. |
| **User flow** | Payment instructions → submit proof → verification states → result. |
| **APIs** | Get active quote; submit proof/tx hash; poll verification; get activation result. |
| **Entities** | PaymentQuote; PaymentTicket; VerificationOutcome; Membership (writer target). |
| **Auth** | Authenticated member required. |
| **Permissions** | Member owning the quote. |
| **Events / WS** | Prefer poll or WS for `verifying` → terminal outcome; `MembershipActivated`; Discord sync requested. |
| **Loading / error** | Pending / verifying / underpaid / overpaid / expired / failed / cancelled / refund_required (see `src/lib/membership/verification`). |

Authority: Admin `08` + Cross-Module Membership writers.

### 3.5 Free Dashboard `/dashboard/free`

| | |
|--|--|
| **Purpose** | Home for Free members — status, upgrade path, referral teaser. |
| **Business goal** | Retention + upgrade conversion. |
| **User flow** | View status → connect Discord / start referral / upgrade CTA. |
| **APIs** | `GET /me/dashboard` (free projection); referral summary; Discord link status. |
| **Entities** | User; Membership (free/none); ReferralCode; DiscordConnection. |
| **Auth** | Member session; gate Free vs VIP route. |
| **Permissions** | Member (free tier). |
| **Events** | Display only; consume Membership/Referral/Discord projections. |
| **Loading / error** | Unauthorized → login; wrong tier → redirect VIP. |

### 3.6 VIP Dashboard `/dashboard/vip`

| | |
|--|--|
| **Purpose** | Home for VIP members — membership, access, referral, credits. |
| **Business goal** | Deliver paid value perception + referral growth loop. |
| **User flow** | View membership dates/credits → referral progress → Discord VIP reflection. |
| **APIs** | `GET /me/dashboard` (vip projection); credit ledger summary; referral progress. |
| **Entities** | Membership; Referral ledger projection; Discord role reflection. |
| **Auth** | Member session; require Active Membership. |
| **Permissions** | VIP member. |
| **Events** | Consume `Membership*`, `Referral*`, Discord sync projections. |
| **Loading / error** | Expired Membership → Free experience / renew CTA; unauthorized. |

### 3.7 Admin Dashboard `/admin`

| | |
|--|--|
| **Purpose** | Operations inbox — what needs attention today. |
| **Business goal** | Faster operational decisions at scale. |
| **User flow** | Widgets / Operations Queue → deep-link into modules with filters. |
| **APIs** | `GET /admin/ops/summary`; `GET /admin/ops/queue`; platform health. |
| **Entities** | QueueItem; WidgetCounts; PlatformComponentStatus. |
| **Auth** | Admin session. |
| **Permissions** | Admin roles (future RBAC). |
| **Events / WS** | Optional live queue updates. |
| **Loading / error** | Empty queue; partial service outage on Platform Health. |

### 3.8 Admin Members `/admin/members`

| | |
|--|--|
| **Purpose** | Find members; see health; open Profile. |
| **Business goal** | Directory + triage. |
| **User flow** | Search/filter/paginate → open member → Profile. |
| **APIs** | `GET /admin/members` with filters: search, membership, subscription, discord, referral, health, page. |
| **Entities** | DirectoryMember (`src/types/members/directory.ts`); SystemHealth (server-computed). |
| **Auth / permissions** | Admin. |
| **Events** | None required for list (projections). |
| **Loading / error** | Empty results; invalid filters; export failure. |

### 3.9 Admin User Profile `/admin/members/[id]`

| | |
|--|--|
| **Purpose** | Control Center — reflect all domains; own Internal Notes. |
| **Business goal** | Single-pane understanding before acting in owning modules. |
| **User flow** | Read cards → Manage → module; add notes; view activity. |
| **APIs** | `GET /admin/members/:id`; `GET/POST /admin/members/:id/notes`; `GET …/activity`. |
| **Entities** | MemberProfile aggregate; Notes; Activity events. |
| **Auth / permissions** | Admin. |
| **Events** | Notes create; activity is event feed consumer. |
| **Loading / error** | 404 member; note validation errors. |
| **Critical rule** | No approve payment / sync Discord / redeem referral on this page. |

### 3.10 Admin Subscriptions `/admin/subscriptions` (Shell)

| | |
|--|--|
| **Purpose** | Payment ticket verification (architecture complete; UI placeholder). |
| **Business goal** | Resolve payment disputes and activate Membership via payment writer. |
| **User flow (intended)** | Queue → ticket detail → approve/reject → Membership update. |
| **APIs** | List/filter tickets; get ticket; approve; reject; attach proof review. |
| **Entities** | PaymentTicket; PaymentQuote; VerificationOutcome. |
| **Auth / permissions** | Admin (finance/ops). |
| **Events** | `PaymentVerified` / `PaymentRejected` → Membership writer. |
| **Loading / error** | Concurrent verify; chain RPC failure; under/overpay paths. |

### 3.11 Admin Discord `/admin/discord`

| | |
|--|--|
| **Purpose** | Own Discord synchronization operations. |
| **Business goal** | Keep Discord roles aligned with TraderCity Membership truth. |
| **User flow** | Filter sync/role issues → detail → Sync Now / Send Invite. |
| **APIs** | List; `POST /admin/discord/:id/sync`; invite; export; sync logs. |
| **Entities** | DiscordMember; RoleHistory; SyncLog; ConnectionStatus ≠ SyncStatus. |
| **Auth / permissions** | Admin. |
| **Events / WS** | Bot webhooks: join/leave/role; sync job completion. |
| **Loading / error** | Bot unavailable; rate limits; sync failed ticket. |

### 3.12 Admin Referrals `/admin/referrals` (+ Intelligence)

| | |
|--|--|
| **Purpose** | Ops: validate rewards/redeems; Intelligence: BI read-only. |
| **Business goal** | Growth program integrity + insight. |
| **User flow** | Ops queue → approve redeem / investigate fraud; Intelligence period filters. |
| **APIs** | As specified in `REFERRAL_SYSTEM_ARCHITECTURE.md` (ledger SoT). |
| **Entities** | ReferralCode; Attribution; ReferralCreditLedger; RedeemRequest. |
| **Auth / permissions** | Admin; Intelligence may be read-only role. |
| **Events** | Consumes MembershipActivated; emits reward/redeem; clawbacks. |
| **Loading / error** | Ledger reconcile mismatch; fraud flags. |

---

## 4. Admin Dashboard Documentation Review

| Concern | Documented? | Verdict |
|---------|-------------|---------|
| Dashboard overview | Yes (`05`, Phase-01, `03`) | Complete |
| Member management | Yes (Phase-02, `03`) | Complete |
| User profile | Yes (Phase-03, `03`, Cross-Module) | Complete |
| Referral management | Yes (Referral arch + `03`) | Complete for backend design |
| Discord management | Yes (`03`, Cross-Module); no Phase-05 record | Partial records |
| Subscription verification | Yes (`03`, `08`); UI shell | Spec complete; impl gap |
| Payment verification | Yes (`08`) | Behavior complete; NestJS schema deferred intentionally |
| Analytics | Referral Intelligence only; general Admin analytics deferred | Partial |
| Platform health | UI + Phase-01; `/admin/health` missing | Partial |
| Admin operations / lifecycle | Ecosystem + `05`/`07` | Complete |

**Created/updated by this audit:** status correction guidance in Action Plan; Member/Auth integration doc for adjacent surfaces. Admin ecosystem doc already exists.

---

## 5. Member Dashboard Documentation Review

| Concern | Before audit | After audit |
|---------|--------------|-------------|
| Free member lifecycle | Weak / scattered | Covered in Ecosystem + **new Member/Auth doc** |
| VIP member lifecycle | Weak / scattered | Same |
| Membership states | Strong in Cross-Module | Unchanged (canonical) |
| Dashboard navigation | Weak | **New doc** |
| Referral (member-facing) | Strong Admin/Referral arch; weak member UI contract | **New doc** maps member APIs |
| Discord status | Cross-Module | **New doc** |
| Subscription status | `08` + Cross-Module | **New doc** |
| Learning access / Research archive | PRD mentions; no dedicated FE module docs | Still future / gap noted |
| Upgrade journey | Payment Activation + `08` | Linked in **new doc** |

---

## 6. Frontend Architecture Review

| Topic | Documented? | Where |
|-------|-------------|-------|
| Folder structure (current + target) | Yes | `MODULE_OWNERSHIP.md`, Admin `06`, Platform v2 |
| Component hierarchy (Homepage) | Yes | Homepage Ch.04/06/09/10 |
| Component hierarchy (Admin) | Yes | Admin `06`, phase records |
| Routing | Partial | Homepage Ch.10; this audit §2; Ecosystem |
| Shared components | Yes | Admin `02` + `ui/`; Homepage shared primitives |
| Naming conventions | Partial | Governance + Admin isolation (`members` = Admin domain naming trap) |
| Design system | Yes | Admin `02`; Homepage Ch.05; `globals.css` |
| Reusable patterns | Yes | Reflection cards; directory master-detail; WidgetCard |
| Animation strategy | Partial | Homepage chapters; Admin prefers subtle |

**Reality vs target:** Code still uses `src/components/{home,dashboard,admin,members,pricing,login,payment-activation}` — not yet `src/{marketing,member,admin,shared}`.

---

## 7. Backend Developer Readiness

### Would they understand…?

| Question | Ready? |
|----------|--------|
| Every page purpose | **Yes** (this audit §3) |
| Business logic ownership | **Yes** (Cross-Module + Referral + `08`) |
| User lifecycle | **Yes** (Ecosystem architecture) |
| Required APIs | **Mostly** — shapes inferred from types/UI; no OpenAPI |
| Expected responses | **Partial** — TypeScript types; not formal response schemas |
| Integration points | **Yes** — Membership writers, Discord sync, Referral events |

### Blockers for production backend

1. Auth / session / Admin RBAC undefined in code (now documented as expectations).
2. Subscriptions Admin UI missing (APIs still designable).
3. No shared event bus implementation.
4. System Health still mock-precomputed.
5. Engineering Freeze / Platform v2 policy may gate delivery sequencing.
6. Pricing/network/referral-credit contradictions across docs (must pick authorities: `08` + Referral arch).

---

## 8. AI Agent Readiness

| Requirement | Status |
|-------------|--------|
| Governance always-on | Strong (`.cursor/rules`, AGENTS.md) |
| Admin design freeze | Strong |
| Homepage freeze during Admin | Strong |
| Ownership / sync rules | Strong (Cross-Module) |
| Accurate module maturity | **Was weak** (PROJECT_STATUS stale) — fix required |
| Member dashboard guidance | Improved by new Product Architecture doc |
| “Do not invent APIs” | Strong — still bind agents to types + architecture docs |

**Agent reading order (recommended):**

1. `docs/00_Project_Governance/README.md` + Freeze / Platform v2  
2. This audit  
3. Cross-Module Sync + Admin Ecosystem lifecycle  
4. Domain doc (Admin `07`/`05`/`03` or Referral arch or Member/Auth integration)  
5. Code types under `src/types/members` + `src/lib/membership`

---

## 9. Missing Documentation

| Gap | Severity | Disposition |
|-----|----------|-------------|
| Free/VIP Member Dashboard integration contract | High | **Created** — Member/Auth integration architecture |
| Auth / Login / Session architecture | High | **Created** — same doc |
| OpenAPI / NestJS endpoint catalog | High | Recommended (not invented blindly) |
| Phase-04 Subscriptions delivery record | Medium | Recommended when UI ships |
| Phase-05 Discord delivery record | Medium | Recommended (UI already exists) |
| Phase-06 Referrals delivery record | Medium | Recommended (UI already exists) |
| Stale Admin PROJECT_STATUS | High | **Update in this audit’s action** |
| Dedicated Discord bot architecture | Medium | Can live as Product Architecture later |
| Learning / Research archive FE docs | Low | Deferred with product |
| Formal animation strategy Admin | Low | Optional |

---

## 10. Recommended New Documents

| Priority | Document | Status |
|----------|----------|--------|
| P0 | `TraderCity_Frontend_Engineering_Audit.md` (this file) | **Done** |
| P0 | `MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md` | **Done** |
| P1 | Update `docs/Development/Admin/PROJECT_STATUS.md` | **Done with this audit** |
| P1 | Phase-05 / Phase-06 delivery records matching code | Recommended next |
| P1 | `ADMIN_API_CONTRACT.md` or OpenAPI generated from NestJS | After backend scaffold |
| P2 | `DISCORD_SYNC_SERVICE_ARCHITECTURE.md` | When bot work starts |
| P2 | Phase-04 Subscriptions record | When UI built |
| P3 | Member Learning / Research module docs | When product prioritizes |

---

## 11. Action Plan

### Immediate (documentation)

1. Publish this audit + Member/Auth integration architecture.  
2. Correct Admin `PROJECT_STATUS` / route table for Discord & Referrals UI-complete (mock).  
3. Index both docs from `docs/README.md`.  
4. Point AI agents to authority stack in Ecosystem + Cross-Module + this audit.

### Near-term (still docs / contracts)

5. Write Phase-05 and Phase-06 delivery records (UI complete on mocks).  
6. Resolve documented pricing/network/referral-credit contradictions under `08` + Referral arch.  
7. Draft Admin + Member OpenAPI **after** NestJS modules exist (do not invent conflicting schemas in frontend docs).

### Implementation sequencing (when Freeze allows)

8. Auth + session + route guards.  
9. Membership domain API + writers.  
10. Payment Quote + verification engine.  
11. Admin Subscriptions UI (Phase 4).  
12. Discord bot/sync service.  
13. Wire mocks → NestJS; server-compute System Health; event/outbox.

---

## 12. Appendix — Doc Catalog by Topic

### Strongest backend-facing set

1. `docs/04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md`  
2. `docs/04_Product_Architecture/REFERRAL_SYSTEM_ARCHITECTURE.md`  
3. `docs/04_Product_Architecture/TRADERCITY_ADMIN_ECOSYSTEM_AND_USER_LIFECYCLE_ARCHITECTURE.md`  
4. `docs/04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md`  
5. `docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md`  
6. `docs/AI/Agents/Admin/03_Module_Specifications.md`

### Admin handbook

`docs/AI/Agents/Admin/00`–`08`

### Homepage handbook

`docs/AI/Agents/Homepage/00`–`11` + `docs/Frontend/Homepage_Design_Engineering_Blueprint.md`

### Governance

`docs/00_Project_Governance/*`

### Universal

PRD · Architecture Rules · Frontend Constitution

---

## Final Statement

TraderCity’s frontend is **documentation-rich for Admin vision and Referral/Membership ownership**, and **implementation-rich for UI mocks**, but **not yet API-complete**.

With this audit and the Member/Auth integration architecture, a backend engineer and an AI agent can understand **what each page is for, who owns the data, and what integration is expected** — without reverse-engineering the entire repository.

They still must **not** treat TypeScript mocks as production schemas, and must implement NestJS contracts under the Product Architecture authority stack before claiming multi-module production consistency.
