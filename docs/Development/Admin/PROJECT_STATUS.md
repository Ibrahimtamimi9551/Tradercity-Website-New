# Admin Dashboard — Project Status

**Last Updated:** July 29, 2026  
**Foundation Spec:** [`docs/AI/Agents/Admin/00_Admin_Dashboard_Foundation.md`](../../AI/Agents/Admin/00_Admin_Dashboard_Foundation.md)  
**Vision (authoritative):** [`docs/AI/Agents/Admin/07_Vision_Before_Implementation.md`](../../AI/Agents/Admin/07_Vision_Before_Implementation.md)  
**Phase Roadmap:** [`Phase-Roadmap.md`](Phase-Roadmap.md)  
**Phase 0 record:** [`Phase-00-Admin-Foundation.md`](Phase-00-Admin-Foundation.md)  
**Phase 4 record:** [`Phase-04-Subscriptions.md`](Phase-04-Subscriptions.md)  
**Frontend audit:** [`TraderCity_Frontend_Engineering_Audit.md`](../TraderCity_Frontend_Engineering_Audit.md)  
**Platform vocabulary:** [`PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md)

## Current Phase

**Phases 0–4 complete (UI on mocks).**  
**Discord + Referrals Admin UI:** complete on mocks (ahead of formal Phase-05/06 delivery records).  
**Subscriptions:** **UI complete on mocks** (Phase 4 — crypto payment ticket queue).  
**UI Design Language:** **Frozen / approved** — see [`02_Frontend_Design_System_and_UX_Rules.md`](../../AI/Agents/Admin/02_Frontend_Design_System_and_UX_Rules.md)  
**Analyst stream (freeze override, mock-only):** Section nav (Members · Analysts · Content) + Analyst Dashboard + Directory — see [`../Analyst/00_Overview/PROJECT_STATUS.md`](../Analyst/00_Overview/PROJECT_STATUS.md).  
**Backend:** not wired (NestJS TODOs on hooks).

**Note:** Phase 4 shipped under an explicit PO Engineering Freeze override (Subscriptions FE + docs only).

## Scope

**Member Platform Admin delivery = Phases 0–6** (current Member Domain build target; historical docs may still say “Member Management”).

Admin sidebar sections: **Members · Analysts · Content**. Member routes/hrefs are unchanged.

Phases 7–9 deferred to Content Platform / Community / Platform Administration / deeper Analyst modules.

## Design Freeze

**Dashboard UI Design Freeze is active.**

Do **not** redesign admin interfaces. Members, User Profile, Subscriptions, Discord, Referrals, and all future admin pages must reuse the approved language from `/admin` (`WidgetCard`, `modulePanelSurface`, shell, typography, spacing, interaction patterns).

**Homepage Freeze active** — no marketing file changes during admin implementation.

## Member Platform Admin Implementation Roadmap

| Phase | Scope | Status |
|-------|-------|--------|
| 0 | Admin Foundation (shell, sidebar, shared UI) | **Complete** (mock) |
| 1 | Dashboard — Operations Center | **Complete** (mock) |
| 2 | Members — directory + System Health | **Complete** (mock) |
| 3 | User Profile — Control Center | **Complete** (mock) |
| 4 | Subscriptions | **Complete** (mock) — crypto payment tickets |
| 5 | Discord | **UI complete** (mock); NestJS + Phase record pending |
| 6 | Referrals (Ops + Intelligence) | **UI complete** (mock); NestJS + Phase record pending |
| 7 | Reports, Community, Media | **Deferred** |
| 8 | Settings | **Deferred** |
| 9 | Notifications, Audit Logs | **Deferred** |

## Implemented routes

| Route | Status |
|-------|--------|
| `/admin` | Dashboard (Phase 1) — complete UI, mock data |
| `/admin/members` | Directory (Phase 2) — complete UI, mock data |
| `/admin/members/[id]` | Control Center (Phase 3) — complete UI, mock data |
| `/admin/subscriptions` | Subscriptions queue (Phase 4) — complete UI, mock data |
| `/admin/subscriptions/[id]` | Subscription ticket detail (mobile) — complete UI, mock data |
| `/admin/discord` | Discord ops — complete UI, mock data |
| `/admin/discord/[id]` | Discord detail — complete UI, mock data |
| `/admin/referrals` | Referral ops — complete UI, mock data |
| `/admin/referrals/[id]` | Referral detail — complete UI, mock data |
| `/admin/referrals/intelligence` | Referral BI — complete UI, mock data |
| `/admin/analysts` | Analyst Dashboard — complete UI, mock data |
| `/admin/analysts/directory` | Analyst Directory — complete UI, mock data |
| `/admin/analysts/applications` | Placeholder shell |
| `/admin/analysts/verification` | Placeholder shell |
| `/admin/analysts/partnerships` | Placeholder shell |
| `/admin/analysts/referrals` | Placeholder shell |
| `/admin/analysts/commissions` | Placeholder shell |

## Folder Structure

```text
src/components/admin/layout/ + ui/     — shared shell (Phase 0)
src/components/members/sections/       — Member Domain (Admin UI)
  dashboard/ directory/ profile/ subscriptions/ discord/ referrals/
src/components/analysts/sections/      — Analyst Domain (Admin UI)
  dashboard/ directory/
src/types/admin/ + src/types/members/ + src/types/analysts/
src/lib/admin/ + src/lib/members/ + src/lib/analysts/   — mock data (TODO NestJS)
```

**Note:** `src/components/members/**` is **Admin Member Domain UI**, not the member product dashboards (`src/components/dashboard/{free,vip}`).

## Next Step

Write Phase-05 / Phase-06 delivery records to match Discord/Referrals UI reality, or begin NestJS wiring for Subscriptions approve/reject.

Analyst follow-ups: Control Center, Applications queue, Verification — see [`../Analyst/00_Overview/PROJECT_STATUS.md`](../Analyst/00_Overview/PROJECT_STATUS.md).

Run `npm run dev` and open `/admin/subscriptions`.

**Dashboard UI Design Freeze active** — inherit `/admin` visual system for Phases 5–6+.  
**Homepage Freeze active** — no marketing file changes during admin implementation.
