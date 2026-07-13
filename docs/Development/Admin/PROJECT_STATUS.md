# Admin Dashboard — Project Status

**Last Updated:** July 2026  
**Foundation Spec:** [`docs/AI/Agents/Admin/00_Admin_Dashboard_Foundation.md`](../../AI/Agents/Admin/00_Admin_Dashboard_Foundation.md)  
**Vision (authoritative):** [`docs/AI/Agents/Admin/07_Vision_Before_Implementation.md`](../../AI/Agents/Admin/07_Vision_Before_Implementation.md)  
**Phase Roadmap:** [`docs/Development/Admin/Phase-Roadmap.md`](Phase-Roadmap.md)  
**Phase 0 record:** [`Phase-00-Admin-Foundation.md`](Phase-00-Admin-Foundation.md)

## Current Phase

**Phase 3 — User Profile (Control Center) (complete)**  
**UI Design Language:** **Frozen / approved** — see [`02_Frontend_Design_System_and_UX_Rules.md`](../../AI/Agents/Admin/02_Frontend_Design_System_and_UX_Rules.md)  
**Phase record:** [`Phase-03-User-Profile.md`](Phase-03-User-Profile.md)  
**Next:** Phase 4 — Subscriptions — inherit Dashboard visual system (no redesign)

## Scope

**Member Management = Phases 0–6** (current build target)

Phases 7–9 deferred to future Website Content Management / Analysts areas.

## Design Freeze

**Dashboard UI Design Freeze is active.**

Do **not** redesign admin interfaces. Members, User Profile, Subscriptions, Discord, Referrals, and all future admin pages must reuse the approved language from `/admin` (`WidgetCard`, `modulePanelSurface`, shell, typography, spacing, interaction patterns).

**Homepage Freeze active** — no marketing file changes during admin implementation.

## Member Management Implementation Roadmap

| Phase | Scope | Status |
|-------|-------|--------|
| 0 | Admin Foundation (shell, sidebar, shared UI) | **Complete** |
| 1 | Dashboard — Operations Center | **Complete** |
| 2 | Members — directory + System Health | **Complete** |
| 3 | User Profile — Control Center | **Complete** |
| 4 | Subscriptions | Not started |
| 5 | Discord | Not started |
| 6 | Referrals | Not started |
| 7 | Reports, Community, Media | **Deferred** |
| 8 | Settings | **Deferred** |
| 9 | Notifications, Audit Logs | **Deferred** |

## Implemented routes

| Route | Status |
|-------|--------|
| `/admin` | Dashboard (Phase 1) |
| `/admin/members` | Directory (Phase 2) |
| `/admin/members/[id]` | Control Center (Phase 3) |
| `/admin/subscriptions` | Placeholder → Phase 4 |
| `/admin/discord` | Placeholder → Phase 5 |
| `/admin/referrals` | Placeholder → Phase 6 |

## Folder Structure

```text
src/components/admin/layout/ + ui/     — shared shell (Phase 0)
src/components/members/sections/       — domain sections from Phase 1
src/types/admin/ + src/types/members/
src/lib/admin/ + src/lib/members/
```

## Next Step

Begin **Phase 4: Subscriptions** — `src/components/members/sections/subscriptions/`

Run `npm run dev` and open `/admin/members` → any username → Control Center.

**Dashboard UI Design Freeze active** — inherit `/admin` visual system for Phases 4–6+.  
**Homepage Freeze active** — no marketing file changes during admin implementation.
