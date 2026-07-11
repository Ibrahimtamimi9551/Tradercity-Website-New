# TraderCity Admin Dashboard — Foundation

**Version:** 1.0  
**Status:** Living specification — primary execution guide for Admin Dashboard work  
**Scope:** Admin frontend architecture, UI ecosystem, and module specifications (`src/app/admin/**`, `src/components/admin/**`, `src/types/admin/**`, `src/lib/admin/**`)

> Read this document **first** before any Admin Dashboard work. Chapters 01–04 in this folder define **how to think**; this document sequences **what to build, in what order, and what never to break**.

---

## Manifesto

The TraderCity Admin Dashboard is not a collection of pages.

It is the **operational platform** that powers the TraderCity ecosystem.

Every screen exists to help administrators make faster and better decisions.

Every module owns one responsibility.

Every piece of information has one source of truth.

The Member Control Center unifies information without duplicating business logic.

The system is designed to evolve through **modular expansion** rather than architectural redesign.

Simplicity, consistency, scalability, and operational efficiency take priority over visual complexity.

---

## Related Documentation

| Document | Role |
|----------|------|
| **This file** | Foundation index, manifesto, reading order |
| [`01_Product_Vision_and_Architecture.md`](01_Product_Vision_and_Architecture.md) | What the platform is and why it exists |
| [`02_Frontend_Design_System_and_UX_Rules.md`](02_Frontend_Design_System_and_UX_Rules.md) | Reusable components, layout patterns, design language |
| [`03_Module_Specifications.md`](03_Module_Specifications.md) | Members, Subscriptions, Discord, Referrals, and future modules |
| [`04_Development_Rules.md`](04_Development_Rules.md) | Coding standards, boundaries, implementation principles |
| [`docs/Universal/TraderCity_Architecture_Rules.md`](../../Universal/TraderCity_Architecture_Rules.md) | Backend assumptions — do not invent |
| [`docs/Universal/TraderCity_Frontend_Constitution_V1.md`](../../Universal/TraderCity_Frontend_Constitution_V1.md) | Global frontend constraints |
| [`docs/AI/Playbooks/multitask-prompts.md`](../../Playbooks/multitask-prompts.md) | Agent B copy-paste prompt for parallel work |
| [`AGENTS.md`](../../../AGENTS.md) | Global agent constraints |

---

## Handbook Index (Chapters 01–04)

| # | Chapter | Read when you need… |
|---|---------|---------------------|
| 01 | [Product Vision and Architecture](01_Product_Vision_and_Architecture.md) | Platform purpose, module ownership, navigation model |
| 02 | [Frontend Design System and UX Rules](02_Frontend_Design_System_and_UX_Rules.md) | Reusable primitives, visual hierarchy, responsive behavior |
| 03 | [Module Specifications](03_Module_Specifications.md) | Member Control Center, Subscriptions, and future module contracts |
| 04 | [Development Rules](04_Development_Rules.md) | File structure, backend boundaries, member journey alignment |

**Agent reading order:** 00 (this file) → 01 → 02 → 04 (before coding) → 03 (module-specific) → member flow reference code.

---

## Project Overview

The TraderCity Admin Dashboard is the internal operating platform used by administrators to manage the TraderCity ecosystem.

This dashboard is **not a traditional CRUD admin panel**.

Instead, it is designed as a **modular management system**, where every business domain owns its own responsibility while remaining connected through a unified **Member Control Center** (User Profile).

The objective is to build a dashboard that can scale from hundreds to thousands of members without requiring architectural redesign.

The frontend should be built in a modular way so that future modules can be added without affecting existing implementation.

---

## Current Development Scope

This documentation focuses only on **frontend architecture and interface design**.

Backend APIs, database schema, authentication, and business logic will be integrated later.

At this stage, the objective is to build the complete frontend ecosystem and interaction flow.

### Design References (Phase 1)

| Reference | Asset | Purpose |
|-----------|-------|---------|
| Member Control Center | [`assets/member-control-center-reference.png`](assets/member-control-center-reference.png) | Operational hub for a single member |
| Subscription Management | [`assets/subscription-management-reference.png`](assets/subscription-management-reference.png) | Payment verification and subscription lifecycle |

Future modules will follow the exact same design philosophy.

---

## Core Design Philosophy

The Admin Dashboard is designed around **business modules**, not around pages.

Every module owns one responsibility.

No module should duplicate another module's responsibility.

The User Profile aggregates information from every module but **never owns business logic**.

### Single Source of Truth

The backend database is always the source of truth.

The frontend never creates business logic.

Discord is not the source of truth.

Payments are not the source of truth.

Referral calculations are not the source of truth.

Every module reflects the current backend state.

---

## Dashboard Structure

```text
Dashboard

Management
├── Members
├── Subscriptions
├── Discord
├── Referrals

Content
├── Reports
├── Learning
├── Community
├── Media Library

System
├── Notifications
├── Audit Logs
├── Settings
```

Every module is independent.

Every module owns one business domain.

Phase 1 implementation focuses on **Members**, **Member Control Center**, and **Subscriptions**. All other modules are documented as future work — do not implement without explicit approval.

---

## Standard Module Pattern

Every management module follows the same structure:

```text
Management Module

↓

Widgets / Statistics

↓

Search + Filters

↓

Data Table

↓

Module Details Panel

↓

(Optional) Open Member Control Center
```

This layout must remain consistent across the entire dashboard.

Build pages around **administrator workflows**, not database tables.

---

## Module Connection Philosophy

Every module owns one business responsibility.

The Member Control Center reflects the latest state from every module.

```text
Subscription Module → Updates Database → User Profile Subscription Card updates
Discord Module      → Updates Database → User Profile Discord Card updates
Referral Module     → Updates Database → User Profile Referral Card updates
```

This avoids duplicated logic.

---

## Cursor Implementation Guidelines

When implementing this dashboard:

1. Follow the modular architecture described in Chapters 01–04.
2. Build reusable components (widgets, tables, filters, detail panels, cards).
3. Keep all data mocked for now; backend integration will happen later.
4. Do not invent additional fields or workflows beyond those defined.
5. Ensure every module follows the same interaction pattern.
6. The Member Control Center is the hub that aggregates information; all modules should navigate to it, and it should link back to the appropriate module for management actions.
7. Study member journey code before building admin UI — admin mirrors member submission and dashboard fields.
8. Do not modify homepage, pricing, payment-activation, or member dashboard files.

---

## Phase 1 Deliverables

1. Admin shell (sidebar, navbar, layout)
2. Shared admin UI primitives
3. Members list module
4. Member Control Center (User Profile)
5. Subscriptions module (widgets, table, details panel)
6. TypeScript types and hook stubs for NestJS integration
7. Backend endpoint requirements list (documentation only)

---

## Success Criteria

After Phase 1, an administrator should:

- Immediately understand any module page because every page follows the same interaction pattern
- Open a member profile and see aggregated state from all connected modules
- Navigate from any module to the Member Control Center and back to the owning module
- Verify subscription payments without leaving the standard module layout
- Use the same components (badges, tables, panels) across every screen

If a change introduces a one-off interaction model or duplicates business logic in the frontend, do not implement it.
