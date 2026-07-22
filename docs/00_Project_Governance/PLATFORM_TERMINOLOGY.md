# TraderCity Platform Terminology

**Version:** 1.0  
**Status:** Canonical ubiquitous language  
**Authority:** Product Architecture / Project Governance  
**Audience:** Product · Engineering · Docs · AI agents  

**Related:** [`PLATFORM_TERMINOLOGY_MIGRATION_PLAN.md`](./PLATFORM_TERMINOLOGY_MIGRATION_PLAN.md) · [`PLATFORM_TERMINOLOGY_MIGRATION_REPORT.md`](./PLATFORM_TERMINOLOGY_MIGRATION_REPORT.md)

---

## Purpose

TraderCity is a **multi-domain platform**, not a single “Member Management” app. All contributors use the same three-level vocabulary below.

---

## Three naming levels

| Level | Term | Used in | Example |
|-------|------|---------|---------|
| **Product** | Platform | Vision, business docs, planning | Analyst Platform |
| **Engineering** | Domain | Architecture, backend, repo planning | Analyst Domain |
| **Frontend UI** | Short noun | Sidebar, headings, breadcrumbs | Analysts |

Do **not** use “Management” as a domain/product label in new writing or UI.

---

## Canonical platform structure

```text
TraderCity Platform
├── Member Platform
├── Analyst Platform
├── Content Platform
├── Commerce Platform          (future)
├── Community Platform         (future)
└── Platform Administration    (future)
```

---

## Domain responsibilities (product)

### Member Platform

Registration · Authentication · Membership · User lifecycle · Subscription access · Discord membership · Referral credits · Member dashboard

### Analyst Platform

Applications · Verification · Partnership · Onboarding · Analyst dashboard · Performance · Commission · Growth · Analyst lifecycle

### Content Platform

Homepage · Landing pages · Learning · Research · Reports · Events · Announcements · FAQ · future CMS  
*(formerly “Website Management” — capability is Content, not “website”)*

### Commerce Platform (future)

Pricing · Plans · Payments · Wallet · Revenue · Discounts · Coupons · Payouts · Financial reports  
*(Subscriptions migrate here over time)*

### Community Platform (future)

Discord ops · Events · Leaderboards · Challenges · Notifications · Referral campaigns · Social integrations

### Platform Administration (future)

Roles · Permissions · Settings · Audit logs · Feature flags · System health · Integrations · Configuration

---

## Admin UI section labels

| UI section | Product name | Engineering name |
|------------|--------------|------------------|
| **Members** | Member Platform | Member Domain |
| **Analysts** | Analyst Platform | Analyst Domain |
| **Content** | Content Platform | Content Domain |
| *(reserved)* Commerce | Commerce Platform | Commerce Domain |
| *(reserved)* Community | Community Platform | Community Domain |
| *(reserved)* Platform | Platform Administration | Platform Domain |

---

## Preferred ↔ deprecated

| Prefer | Avoid (legacy) |
|--------|----------------|
| Member Platform / Member Domain / Members | Member Management |
| Analyst Platform / Analyst Domain / Analysts | Analyst Management |
| Content Platform / Content Domain / Content | Website Management |
| Platform Administration | System Management (when meaning platform ops) |

---

## What does **not** change

- Route paths (`/admin/members`, `/admin/analysts`, …)  
- Source folder ownership (`src/components/members`, `src/components/analysts`, …)  
- Historical Admin phase program names in older Agent docs may still say “Member Management Phases 0–6”; interpret as **Member Platform** Admin delivery. New docs use the terms above.

---

## AI / Cursor rule

When generating docs, nav labels, or architecture text for TraderCity:

1. Product prose → **Platform**  
2. Architecture / backend → **Domain**  
3. Admin UI chrome → short nouns (**Members**, **Analysts**, **Content**)
