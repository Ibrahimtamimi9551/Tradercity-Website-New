# TraderCity — Project Architecture

**Document Version:** 1.0  
**Status:** Official Engineering Reference  
**Scope:** Business / product architecture only — not Git

---

## Purpose

This document describes **what TraderCity is** as a product.

It defines permanent business domains, their responsibilities, and how they scale.

It does **not** describe Git branches, deployment pipelines, or temporary experiments.

> **Product Architecture ≠ Git Structure**  
> Business modules are permanent. Git branches are temporary.

---

## Product Summary

TraderCity is a premium **Trading Intelligence Platform**.

It combines education, research, community, analyst insights, and membership operations into one ecosystem.

It is **not** a typical crypto education landing site.

**Ubiquitous language:** [`PLATFORM_TERMINOLOGY.md`](./PLATFORM_TERMINOLOGY.md) — Product = Platform · Engineering = Domain · Admin UI = short nouns (Members, Analysts, Content).

| Layer | Role |
|-------|------|
| **Marketing Website** | Attracts and converts members |
| **Member Platform** | Registration, membership, member experience |
| **Analyst Platform** | Partner analysts, research publishing, commissions |
| **Content Platform** | Learning, research libraries, reports, events, CMS |
| **Commerce Platform** | *(future)* Pricing, payments, payouts |
| **Community Platform** | *(future)* Discord ops, campaigns, social |
| **Platform Administration** | *(future)* Roles, settings, audit, feature flags |
| **Admin (shell)** | Internal operating UI across platforms |

```text
TraderCity Platform
├── Member Platform
├── Analyst Platform
├── Content Platform
├── Commerce Platform          (future)
├── Community Platform         (future)
└── Platform Administration    (future)
```

Marketing site and Admin shell are **two UI products**, not one surface:

```text
TraderCity Website  →  Public Experience
TraderCity Admin    →  Internal Operations Platform
```

They may share auth, backend APIs, and database.  
They must **never** share frontend components, layouts, or design systems.

---

## Domain Map

```text
TraderCity

🌐 Marketing Website
  - Homepage
  - Pricing
  - Authentication
  - Payment Activation

👤 Member Experience
  - Free Dashboard
  - VIP Dashboard
  - User Profile

🛠 Admin Platform
  - Overview
  - Members
  - Subscriptions
  - Discord
  - Referrals
  - Payments

📈 Analyst Platform
  - Analyst Directory
  - Analyst Profiles
  - Report Management
  - Content Publishing

📚 Content Platform
  - Learning Frameworks
  - Market Reports
  - News & Updates
  - Media Library
```

---

## 🌐 Marketing Website

**Purpose:** Sell TraderCity. Communicate the operating system. Convert visitors into members.

### Homepage

Public narrative surface. Hero, ecosystem story, problem/solution framing, research and community positioning, membership comparison, analyst team, navigation.

**Responsibility:** Premium first impression and product story — not operations.

### Pricing

Plan presentation and conversion entry. Plan identities and pricing shapes are reference data for Admin and membership flows, but the UI belongs to Marketing.

### Authentication

Login and session entry for members. Shared auth concern with the rest of the platform; marketing-owned presentation.

### Payment Activation

Member-facing payment submission / activation flow that feeds the Admin verification queue.

**Scalability:** New marketing pages must stay in marketing routes and components. Never import Admin UI into Marketing.

**Current route anchors:** `/`, `/pricing`, `/login`, `/payment-activation`

---

## 👤 Member Experience

**Purpose:** Deliver day-to-day product value after signup.

### Free Dashboard

Post-login experience for Free members. Surfaces Free-tier value and upgrade pathways.

### VIP Dashboard

Post-login experience for VIP members. Surfaces premium membership value.

### User Profile

Member-facing identity and account reflection. Distinct from the Admin **Member Control Center**, which is an internal operational reflection layer.

**Responsibility:** Member product surfaces only. Business logic and membership state remain backend-owned.

**Scalability:** Free/VIP and future tier experiences stay under member dashboard namespaces. Do not fold Admin workflows into member UI.

**Current route anchors:** `/dashboard/free`, `/dashboard/vip`

---

## 🛠 Admin Platform

**Purpose:** Operate TraderCity. Faster decisions at scale.

Admin is an **Operations Center**, not a CRUD table browser and not an extension of the marketing site.

### Overview (Dashboard)

Operations inbox. Answers: *What needs attention today?*  
Workload widgets deep-link into modules with filters pre-applied.

### Members

Directory and search. Answers: *Which users exist — and who needs attention?*  
Member Control Center (`/admin/members/[id]`) reflects cross-module state; it does not own every management action.

**Membership** is a **backend domain** (not an Admin page): single source of truth for VIP / access lifecycle. Subscriptions, Referral, Manual Activation, and future grants write Membership; Profile, Members, Dashboard, and Discord consume it. Canonical contract: [`docs/04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md`](../04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md).

Member Free/VIP dashboards + Auth/session integration expectations: [`docs/04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md`](../04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md).

Frontend documentation audit: [`docs/Development/TraderCity_Frontend_Engineering_Audit.md`](../Development/TraderCity_Frontend_Engineering_Audit.md).

### Subscriptions

Payment / subscription ticket resolution.

### Discord

Discord sync and related operational tickets.

### Referrals

Referral reward validation and related operations.

### Payments

Payment verification and financial operational flows (aligned with subscription/payment architecture). May expand as dedicated surfaces mature.

**Responsibility:** Domain modules own actions. Profile reflects state. Frontend displays; backend computes truth.

**Scalability:** One business domain → one module. New domains get isolated folders, types, hooks, and routes under Admin — never by reusing homepage components.

**Current route anchors:** `/admin`, `/admin/members`, `/admin/subscriptions`, `/admin/discord`, `/admin/referrals`

Authoritative Admin specs live under `docs/AI/Agents/Admin/`.

Highest-level Admin ecosystem + user lifecycle reference: [`docs/04_Product_Architecture/TRADERCITY_ADMIN_ECOSYSTEM_AND_USER_LIFECYCLE_ARCHITECTURE.md`](../04_Product_Architecture/TRADERCITY_ADMIN_ECOSYSTEM_AND_USER_LIFECYCLE_ARCHITECTURE.md).

---

## 📈 Analyst Platform

**Purpose:** Represent analysts and publish their research into the TraderCity ecosystem.

### Analyst Directory

Discoverable list of analysts.

### Analyst Profiles

Individual analyst identity, positioning, and credibility.

### Report Management

Operational / publishing control for analyst reports.

### Content Publishing

Pipeline for releasing analyst content into member and marketing surfaces as appropriate.

**Responsibility:** Analyst identity and research publishing. Distinct from Admin member-ops and from generic content media storage.

**Scalability:** Treat as its own product domain. Homepage “Analyst Team” marketing sections are presentation; Analyst Platform is the durable system for analyst operations and publishing.

**Maturity note (v1.0):** Domain is defined for product architecture. Implementation depth may lag Admin/Marketing — build under dedicated analyst namespaces when activated.

Canonical Analyst Ecosystem documentation (isolated subsystem): [`docs/Analyst/00_Overview/ANALYST_DOCUMENTATION_INDEX.md`](../Analyst/00_Overview/ANALYST_DOCUMENTATION_INDEX.md). Architecture: [`docs/Analyst/02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../Analyst/02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md).

---

## 📚 Content Platform

**Purpose:** Structure TraderCity’s knowledge layer.

### Learning Frameworks

Educational architecture and structured learning paths.

### Market Reports

Research report surfaces for members and publishing flows.

### News & Updates

Platform and market update streams.

### Media Library

Reusable media assets for content and publishing.

**Responsibility:** Content organization and delivery — not membership billing, not Discord sync, not Admin ticket queues.

**Scalability:** Content types should grow as modules with shared media primitives, not as one-off homepage sections.

**Maturity note (v1.0):** Homepage research/education sections express content narrative; Content Platform is the long-term home for durable content systems.

---

## Cross-Domain Principles

1. **Domains are permanent.** Folders and routes should map to domains, not to temporary Git branches.
2. **Git manages changes.** It does not represent the product structure.
3. **Isolation over convenience.** Marketing and Admin never share UI components.
4. **Backend is source of truth.** Frontend reflects state; it does not invent business rules.
5. **One module, one job.** Do not merge unrelated operational concerns into a single page for speed.
6. **Refine before replace.** Prefer improving existing domain surfaces over redesigning the product map.

---

## Future Scalability

| Direction | Guidance |
|-----------|----------|
| New member features | Extend Member Experience; keep Admin as operations |
| New ops workflows | Add Admin domain modules; wire Overview inbox |
| Analyst / content depth | Activate Analyst and Content platforms under their own namespaces |
| Backend integration | Preserve frontend contracts; replace mocks via hooks/services |
| Multi-agent development | Agents must read this map before changing any domain |

---

## Related References

| Document | Role |
|----------|------|
| `DEVELOPMENT_WORKFLOW.md` | How work moves from idea to production |
| `GIT_BRANCHING_STRATEGY.md` | How Git tracks change (temporary) |
| `AI_DEVELOPMENT_GUIDELINES.md` | Rules for AI agents |
| `docs/AI/Agents/Admin/*` | Deep Admin architecture |
| `docs/AI/Agents/Homepage/*` | Deep Homepage architecture |
| `docs/Universal/*` | Constitution, PRD, architecture rules |
| `PROJECT_CONTEXT.md` | Product and brand snapshot |

---

*TraderCity Project Governance v1.0 — define the standard before reorganizing the repository.*
