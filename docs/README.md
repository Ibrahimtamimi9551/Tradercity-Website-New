# TraderCity AI Documentation

This documentation provides permanent context for AI coding assistants.

## Start Here — Project Governance

Official engineering handbook (product, roadmap, ownership, Git, release, testing, AI):

**[`00_Project_Governance/`](./00_Project_Governance/)**

Especially:
- [`ENGINEERING_PLATFORM_V2.md`](./00_Project_Governance/ENGINEERING_PLATFORM_V2.md) — five-layer platform migration
- [`PLATFORM_TERMINOLOGY.md`](./00_Project_Governance/PLATFORM_TERMINOLOGY.md) — **Platform / Domain / UI noun vocabulary**
- [`PROJECT_ROADMAP.md`](./00_Project_Governance/PROJECT_ROADMAP.md) — master delivery map
- [`MODULE_OWNERSHIP.md`](./00_Project_Governance/MODULE_OWNERSHIP.md) — source ownership

Every AI agent should read this folder before making changes.  
**Do not start new product features until Engineering Platform v2.0 is complete.**

## Purpose
- Preserve TraderCity architecture
- Maintain consistent UI/UX
- Improve premium quality
- Prevent unnecessary redesigns
- Enforce Engineering Phase development standards

## Documentation
- `00_Project_Governance/*` — **official process & AI law**
- `04_Product_Architecture/REFERRAL_SYSTEM_ARCHITECTURE.md` — **official Referral System product + backend + frontend + business logic spec**
- `04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md` — **official Admin cross-module data ownership + Membership domain + sync matrix**
- `04_Product_Architecture/TRADERCITY_ADMIN_ECOSYSTEM_AND_USER_LIFECYCLE_ARCHITECTURE.md` — **highest-level Admin ecosystem + user lifecycle architecture discovery**
- `04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md` — **Free/VIP dashboards + Auth/session frontend→backend integration expectations**
- **`Analyst/`** — **isolated Analyst platform documentation** (start at [`Analyst/00_Overview/ANALYST_DOCUMENTATION_INDEX.md`](./Analyst/00_Overview/ANALYST_DOCUMENTATION_INDEX.md))
- `Development/TraderCity_Frontend_Engineering_Audit.md` — **frontend documentation & backend-readiness audit (inventory, gaps, scores, action plan)**
- AGENTS.md
- PROJECT_CONTEXT.md
- CURRENT_OBJECTIVE.md
- .cursor/rules/*
- AI/Playbooks/* (see `multitask-prompts.md` for parallel agent templates)
- AI/Agents/Homepage/* (see `00_Homepage_Refinement_Strategy.md` for executable refinement plan; Chapters 01–10 for depth)
- AI/Agents/Admin/* (see `00_Admin_Dashboard_Foundation.md`; **read `07` + `05` + `06` before admin code**; authoritative roadmap: `Development/Admin/Phase-Roadmap.md`)

Always prefer refinement over replacement.
