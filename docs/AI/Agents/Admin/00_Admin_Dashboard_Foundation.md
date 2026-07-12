# TraderCity Admin Dashboard — Foundation

**Version:** 2.1  
**Status:** Living specification — primary execution guide for Admin Dashboard work  
**Scope:** Member Management admin frontend (Phases 0–6)

```text
src/app/admin/**                    — routes
src/components/admin/layout/**      — shared shell
src/components/admin/ui/**          — shared primitives
src/components/members/**           — domain sections
src/types/admin/** + src/types/members/**
src/lib/admin/** + src/lib/members/**
```

> Read this document **first**, then [`07_Vision_Before_Implementation.md`](07_Vision_Before_Implementation.md), [`05_Operations_Center_Vision_Report.md`](05_Operations_Center_Vision_Report.md), and [`06_Application_Isolation_and_Folder_Architecture.md`](06_Application_Isolation_and_Folder_Architecture.md) before any Admin Dashboard work.

---

## Manifesto

The TraderCity Admin Dashboard is not a collection of pages.

It is an **Operations Center** — the internal platform that operates the TraderCity ecosystem.

The homepage **sells** TraderCity.

The admin dashboard **operates** TraderCity.

Those are two entirely different products.

Every screen exists to help administrators resolve operational issues — not browse data.

Every module owns one responsibility.

Every piece of information has one source of truth: the **database**.

The Member Control Center unifies information without duplicating business logic.

The system is designed to evolve through **modular expansion** rather than architectural redesign.

---

## Related Documentation

| Document | Role |
|----------|------|
| **This file** | Foundation index, manifesto, reading order |
| [`05_Operations_Center_Vision_Report.md`](05_Operations_Center_Vision_Report.md) | **Master report** — workflows, Operations Queue, System Health, module summaries |
| [`07_Vision_Before_Implementation.md`](07_Vision_Before_Implementation.md) | **Authoritative** — philosophy, scope (Phases 0–6), sidebar authority |
| [`06_Application_Isolation_and_Folder_Architecture.md`](06_Application_Isolation_and_Folder_Architecture.md) | **Non-negotiable** — Admin vs Marketing isolation, folder structure |
| [`01_Product_Vision_and_Architecture.md`](01_Product_Vision_and_Architecture.md) | Platform purpose, module ownership |
| [`02_Frontend_Design_System_and_UX_Rules.md`](02_Frontend_Design_System_and_UX_Rules.md) | Admin-only component library, responsive behavior |
| [`03_Module_Specifications.md`](03_Module_Specifications.md) | Per-module UI contracts |
| [`04_Development_Rules.md`](04_Development_Rules.md) | Coding boundaries, Homepage Freeze, integration |
| [`docs/Universal/TraderCity_Architecture_Rules.md`](../../Universal/TraderCity_Architecture_Rules.md) | Backend assumptions |
| [`AGENTS.md`](../../../AGENTS.md) | Global agent constraints |

---

## Handbook Index (Chapters 01–07)

| # | Chapter | Read when you need… |
|---|---------|---------------------|
| 07 | [Vision Before Implementation](07_Vision_Before_Implementation.md) | **Before anything** — philosophy, scope, sidebar authority |
| 05 | [Operations Center Vision Report](05_Operations_Center_Vision_Report.md) | Workflows, inbox model, cross-module narratives |
| 06 | [Application Isolation and Folder Architecture](06_Application_Isolation_and_Folder_Architecture.md) | **Before coding** — isolation rules, folders |
| 01 | [Product Vision and Architecture](01_Product_Vision_and_Architecture.md) | Management vs Reflection, source of truth |
| 02 | [Frontend Design System and UX Rules](02_Frontend_Design_System_and_UX_Rules.md) | Admin primitives, mobile operations |
| 04 | [Development Rules](04_Development_Rules.md) | Forbidden paths, data alignment |
| 03 | [Module Specifications](03_Module_Specifications.md) | Per-module UI contracts (Phases 0–6) |

**Agent reading order:** 00 → **07** → **05** → **06** → 01 → 02 → 04 → 03 → [`Phase-Roadmap.md`](../../Development/Admin/Phase-Roadmap.md) → member flow reference code (data shapes only).

---

## Homepage Freeze (Permanent Rule)

While building Admin, do **not** modify unless explicitly requested:

- `src/components/home/**`, `src/app/page.tsx`
- `src/components/pricing/**`, `src/components/payment-activation/**`
- `src/components/dashboard/**` (public member dashboards)
- `src/app/globals.css` (coordinate separately)

Full list: [`06_Application_Isolation_and_Folder_Architecture.md`](06_Application_Isolation_and_Folder_Architecture.md)

---

## Core Design Philosophy

### Operations Center, Not CRUD

Built around **workflows** and **tickets**, not database tables.

### Management vs Reflection

- **Management modules** perform actions (Subscriptions, Discord, Referrals)
- **Member Control Center** reflects state only — cards link to owning modules

### Action Driven Navigation

Dashboard widgets deep-link to pre-filtered module views. Admin resolves work — never hunts for it.

### Single Source of Truth

Database only. Frontend displays. Backend decides.

---

## Sidebar (Member Management — Phases 0–6)

Canonical nav from architecture flowchart. UI mockup sidebars are layout reference only.

```text
Dashboard        — Phase 1: Operations inbox
Members          — Phase 2: Directory / search
Subscriptions    — Phase 4: Payment tickets
Discord          — Phase 5: Sync tickets
Referrals        — Phase 6: Validation tickets
```

User Profile (`/admin/members/[id]`) is a **route**, not a sidebar item.

**Deferred (not built now):** Reports, Community, Media, Settings, Notifications, Audit Logs → future Website Content Management / Analysts areas.

---

## Standard Module Pattern

```text
Widgets → Search + Filters → Table → Details Panel → (Open Member Profile)
```

Build pages around **administrator workflows**, not database tables.

---

## Member Management Implementation Roadmap (Phases 0–6)

Full rationale, exit criteria, and dependency map: [`Phase-Roadmap.md`](../../Development/Admin/Phase-Roadmap.md)

Phases 7–9 are deferred — see chapter 07 scope boundary.

---

## Cursor Implementation Guidelines

1. Read chapters 07, 05, and 06 before any code.
2. Admin and Marketing are **completely isolated** — no cross-imports.
3. Build routes under `src/app/admin/**`; shell under `src/components/admin/`; domain sections under `src/components/members/sections/`.
4. User Profile is reflection only — management stays in domain modules.
5. Dashboard widgets must deep-link with pre-applied filters.
6. System Health is backend-computed — frontend displays.
7. Mobile operations are first-class (bottom nav, full-screen details).
8. Mock data only until NestJS hooks land — no localStorage persistence.
9. Reference member code for **data shapes only**, never UI components.
10. Do not modify marketing/homepage files during admin work.

---

## Success Criteria

After Phase 6 (Referrals complete), an administrator should:

- Open Dashboard and immediately see workload requiring attention
- Click a widget and land in the correct filtered module
- Search Members and see System Health at a glance
- Open a member profile and understand complete operational state without visiting four modules
- Resolve a payment from Subscriptions and see Profile + Members + Dashboard update conceptually
- Never need marketing UI components in the admin experience

If a change introduces cross-imports, duplicated business logic, or marketing file edits, do not implement it.
