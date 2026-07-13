# Phase 3 — User Profile (Control Center)

**Status:** Complete  
**Date:** July 2026  
**Route:** `/admin/members/[id]`

## Design

User Profile **inherits** the Phase 1 Dashboard design language — no redesign.

- Reflection panels: `modulePanelSurface` (navy / purple / emerald / gold)
- Status chips: `StatusBadge`
- Role history: shared `Timeline`
- Activity list: Dashboard `RecentActivity` pattern
- Shared shell + `PageTitle` / admin layout unchanged

Authority: [`02_Frontend_Design_System_and_UX_Rules.md`](../../AI/Agents/Admin/02_Frontend_Design_System_and_UX_Rules.md)  
Layout source of truth: Control Center reference (hero → tabs → Overview card grid)

## Delivered

### Types + mock data
- `src/types/members/profile.ts`
- `src/lib/members/mock/profile-members.ts` — aggregates for all directory ids (`m-001`…`m-012`); `m-001` matches Control Center reference
- `src/lib/members/hooks/useMemberProfile.ts` — tab parsing + mock lookup (`TODO(NestJS)`)
- `src/lib/members/format-profile.ts` — datetime / days-remaining helpers

### Profile sections (`src/components/members/sections/profile/`)
- `MemberProfileView` / `MemberProfilePageContent` — compositor (+ Suspense for `?tab=`)
- `ProfileBreadcrumb` — Members › User Profile
- `ProfileHeader` — Discord-primary identity, 4 status widgets, Edit Profile (stub)
- `ProfileTabs` — Overview | Subscription | Discord | Referral | Notes | Activity (horizontal scroll on mobile)
- Reflection cards: `MembershipCard`, `SubscriptionCard`, `DiscordCard`, `ReferralCard`, `NotesCard`, `ActivityTimeline`
- Overview grid: 4 top cards + Notes / Recent Activity row
- Manage → links to `/admin/subscriptions|discord|referrals?member=…` (stubs OK)
- Footer aggregation note

### Routes
- `/admin/members/[id]` — Control Center (was Phase 3 placeholder)

## Exit criteria

- [x] Open a member — full cross-module state on Overview
- [x] All “Manage →” links route to owning modules (stubs OK)
- [x] Mobile: stacked cards, scrollable tabs, shell bottom nav
- [x] Identity rules: Discord-primary, no Full Name, no photo upload, one Joined Date
- [x] No approve / reject / sync / validate actions on this page
- [x] Visual language inherited from Dashboard (no redesign)

## Next Step

**Phase 4 — Subscriptions**  
`src/components/members/sections/subscriptions/` — first ticket processor; return destination remains this Control Center.
