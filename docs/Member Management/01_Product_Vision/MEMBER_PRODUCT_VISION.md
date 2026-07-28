# Member Product Vision

**Version:** 1.0  
**Status:** Active  
**Authority:** `docs/Member Management/01_Product_Vision/`  
**Last Updated:** July 28, 2026

---

## One-line vision

TraderCity Admin for Members is an **Operations Center** — not a CRUD panel — where administrators process tickets, assess member health, and navigate into domain modules that own business logic, while the **Member Control Center** reflects complete state without duplicating management.

---

## What this is / is not

| This is | This is not |
|---------|-------------|
| Internal **Operations Center** for membership ops | Marketing / homepage extension |
| Workflow + ticket driven | Spreadsheet of user rows |
| Hub-and-spoke: Control Center reflects; domains manage | Profile page that edits VIP / Discord / payments |
| Frontend mock-first, NestJS-ready | Production data store in the browser |
| Sibling platform to Analyst Admin | Analyst partnership management |

---

## Operational platform philosophy

Admin surfaces for Member Management answer four distinct questions:

```text
Dashboard
        ↓
Shows WHAT requires attention.

Members Directory
        ↓
Shows WHO the members are (and System Health).

Member Control Center
        ↓
Shows the COMPLETE STATE of ONE member (reflection only).

Operational Domains
        ↓
Major capabilities with workspaces
(Subscriptions, Discord, Referrals)
```

**Nav rule:** Left navigation represents major operational domains — not one sidebar item per screen, and **not** the Control Center (reached from Directory).

Every module follows the same interaction pattern:

```text
Table / Queue → Quick Inspector / Details Panel → Control Center (or domain detail)
```

See [`../03_Frontend/OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md) · [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md).

---

## Core manifesto

> The homepage **sells** TraderCity. The admin dashboard **operates** TraderCity. Those are two entirely different products.

| Principle | Meaning |
|-----------|---------|
| Operations Center, not pages | Workflows + tickets |
| Management vs Reflection | Domain modules act; Control Center only reflects |
| Single source of truth | PostgreSQL via backend; frontend displays |
| Action Driven Navigation | Widgets deep-link with filters |
| One owner per field | No duplicated VIP / payment / Discord state |
| Isolation | Admin ↛ Marketing; `src/components/members/**` = Admin Member Domain UI |

---

## Product goals

1. Give Admin a single inbox for payment, Discord, and referral attention  
2. Provide a searchable Members Directory with System Health  
3. Provide a Member Control Center that aggregates state without owning writes  
4. Deliver domain modules (Subscriptions, Discord, Referrals) that own management actions  
5. Keep frontend NestJS-ready via typed mocks and hook TODOs  

**Vocabulary:** Product = Member Platform · Engineering = Member Domain · UI = Members — see [`PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md).

---

## Success signals (product)

- Admin can answer: who needs payment review, Discord sync, or referral attention **right now**  
- Membership access state has one backend owner; UI never invents conflicting VIP truth  
- Control Center cards always deep-link to the owning module for “Manage …”  
- Dashboard widgets and Directory filters share the same URL contracts  
- Design language stays frozen to approved `/admin` patterns  

---

## Related Member docs

- Business model: [`MEMBER_BUSINESS_MODEL.md`](./MEMBER_BUSINESS_MODEL.md)  
- Lifecycle: [`MEMBER_USER_LIFECYCLE.md`](./MEMBER_USER_LIFECYCLE.md)  
- Ecosystem: [`../02_Product_Architecture/MEMBER_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/MEMBER_ECOSYSTEM_ARCHITECTURE.md)
