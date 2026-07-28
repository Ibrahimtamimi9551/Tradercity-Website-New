# Member Frontend — Component Hierarchy

**Version:** 1.0  
**Status:** Active  
**Authority:** `docs/Member Management/03_Frontend/`  
**Last Updated:** July 28, 2026

---

## Source tree (implemented)

```text
src/app/admin/
  layout.tsx                         # AdminShell
  page.tsx                           # Members Dashboard
  members/page.tsx                   # Directory
  members/[id]/page.tsx             # Control Center
  subscriptions/page.tsx             # Placeholder
  discord/layout.tsx
  discord/page.tsx
  discord/[id]/page.tsx
  referrals/layout.tsx
  referrals/(operations)/layout.tsx
  referrals/(operations)/page.tsx
  referrals/(operations)/[id]/page.tsx
  referrals/intelligence/page.tsx

src/components/members/sections/
  dashboard/
    DashboardPage.tsx
    OperationalWidgets.tsx
    OperationsQueueSection.tsx
    RecentActivity.tsx
    QuickActions.tsx
    RevenueOverview.tsx
    PlatformHealth.tsx
  directory/
    MembersDirectoryPage.tsx
    DirectoryWidgets.tsx
    DirectoryFiltersBar.tsx
    MembersTable.tsx
    MemberDirectoryDetails.tsx
    index.ts
  profile/
    MemberProfileView.tsx
    ProfilePage.tsx
    ProfileHeader.tsx
    ProfileTabs.tsx
    MembershipCard.tsx
    SubscriptionCard.tsx
    DiscordCard.tsx
    ReferralCard.tsx
    NotesCard.tsx
    ActivityTimeline.tsx
    ModuleTimelineSection.tsx
    ReflectionCard.tsx
    index.ts
  discord/
    DiscordPage.tsx
    DiscordDirectoryProvider.tsx
    DiscordWidgets.tsx
    DiscordFiltersBar.tsx
    DiscordTable.tsx
    DiscordDetails.tsx
    DiscordMemberDetailPage.tsx
    DiscordRowActions.tsx
    DiscordSyncActions.tsx
    discord-actions.ts
    index.ts
  referrals/
    ReferralsPage.tsx
    ReferralsDirectoryProvider.tsx
    ReferralModuleNav.tsx
    ReferralWidgets.tsx
    ReferralFiltersBar.tsx
    ReferralTable.tsx
    ReferralDetails.tsx
    ReferralMemberDetailPage.tsx
    ReferralRowActions.tsx
    index.ts
    intelligence/
      ReferralIntelligencePage.tsx
      … section components …

src/lib/members/
  hooks/
    useMembersDirectory.ts
    useMemberProfile.ts
    useDiscordDirectory.ts
    useReferralsDirectory.ts
  mock/
    directory-members.ts
    profile-members.ts
    discord-members.ts
    referral-members.ts
    referral-intelligence.ts
  format-profile.ts
  directory-keys.ts

src/types/members/
  directory.ts
  profile.ts
  discord.ts
  referral.ts
  referral-intelligence.ts

src/components/admin/          # Shared shell + UI (not Members-only)
  layout/   AdminShell, AdminSidebar, AdminHeader, AdminMobileNav, nav-config, ModulePlaceholder
  ui/       WidgetCard, DataTable, FilterBar, StatusBadge, Timeline, …
  directory/ AdminMasterDetail, AdminDirectoryPanel, AdminStatGrid
```

---

## Layout hierarchy

```text
AdminShell
  ├── AdminBackground
  ├── AdminSidebar (Members · Analysts · Content)
  ├── AdminHeader
  ├── AdminMobileNav
  └── {children}  ← route page → members/sections/*
```

---

## State flow (typical directory module)

```text
URL search params
  ↔ hook (useXDirectory)
  → filtered mock rows
  → Table + Details panel
  → selectMember
       desktop: ?member=
       mobile:  /[id] detail route
```

Control Center:

```text
/admin/members/[id]?tab=
  → useMemberProfile(id)
  → MemberProfile cards
```

---

## Mock data usage

| Mock file | Consumers |
|-----------|-----------|
| `directory-members.ts` | Directory hook |
| `profile-members.ts` | Profile hook |
| `discord-members.ts` | Discord hook |
| `referral-members.ts` | Referrals hook |
| `referral-intelligence.ts` | Intelligence page |
| Dashboard inline values | Dashboard widgets / queues |

No `localStorage` persistence for Admin Member state.

---

## Related module docs

[`DASHBOARD_ARCHITECTURE.md`](./DASHBOARD_ARCHITECTURE.md) · [`DIRECTORY_ARCHITECTURE.md`](./DIRECTORY_ARCHITECTURE.md) · [`CONTROL_CENTER_ARCHITECTURE.md`](./CONTROL_CENTER_ARCHITECTURE.md) · [`DISCORD_MODULE_ARCHITECTURE.md`](./DISCORD_MODULE_ARCHITECTURE.md) · [`REFERRALS_MODULE_ARCHITECTURE.md`](./REFERRALS_MODULE_ARCHITECTURE.md) · [`SUBSCRIPTIONS_MODULE_ARCHITECTURE.md`](./SUBSCRIPTIONS_MODULE_ARCHITECTURE.md)
