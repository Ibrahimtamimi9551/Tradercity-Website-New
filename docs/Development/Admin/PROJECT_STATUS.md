# Admin Dashboard — Project Status

**Last Updated:** July 2026  
**Foundation Spec:** [`docs/AI/Agents/Admin/00_Admin_Dashboard_Foundation.md`](../../AI/Agents/Admin/00_Admin_Dashboard_Foundation.md)  
**Vision (authoritative):** [`docs/AI/Agents/Admin/07_Vision_Before_Implementation.md`](../../AI/Agents/Admin/07_Vision_Before_Implementation.md)  
**Phase Roadmap:** [`docs/Development/Admin/Phase-Roadmap.md`](Phase-Roadmap.md)  
**Phase 0 record:** [`Phase-00-Admin-Foundation.md`](Phase-00-Admin-Foundation.md)

## Current Phase

**Phase 1 — Dashboard (Operations Center) (complete)**  
**Next:** Phase 2 — Members (Directory)

## Scope

**Member Management = Phases 0–6** (current build target)

Phases 7–9 deferred to future Website Content Management / Analysts areas.

## Member Management Implementation Roadmap

| Phase | Scope | Status |
|-------|-------|--------|
| 0 | Admin Foundation (shell, sidebar, shared UI) | **Complete** |
| 1 | Dashboard — Operations Center | **Complete** |
| 2 | Members — directory + System Health | Not started |
| 3 | User Profile — Control Center | Not started |
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
| `/admin/members` | Placeholder → Phase 2 |
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

Begin **Phase 2: Members Directory** — `src/components/members/sections/directory/`

Run `npm run dev` and open `/admin`.

**Homepage Freeze active** — no marketing file changes during admin implementation.
