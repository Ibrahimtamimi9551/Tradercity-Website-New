# Discord Module Architecture (Members)

**Version:** 1.0  
**Status:** Active — shipped (mock)  
**Authority:** `docs/Member Management/03_Frontend/`  
**Routes:** `/admin/discord`, `/admin/discord/[id]`  
**Phase record:** [`../06_Implementation/MEMBER_DISCORD_IMPLEMENTATION.md`](../06_Implementation/MEMBER_DISCORD_IMPLEMENTATION.md)  
**Last Updated:** July 28, 2026

---

## 1. Purpose

Discord Synchronization Center — ensure Discord **mirrors** TraderCity Membership.

Answers:

> Whose Discord role / connection / sync needs attention?

**Owns:** Discord role, connection status, sync status, role history, invites, sync logs.  
**Does not own:** Membership access SoT.

---

## 2. Source ownership

```text
src/app/admin/discord/page.tsx
src/app/admin/discord/[id]/page.tsx
src/app/admin/discord/layout.tsx
src/components/members/sections/discord/
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
src/lib/members/hooks/useDiscordDirectory.ts
src/lib/members/mock/discord-members.ts
src/types/members/discord.ts
```

---

## 3. Composition

```text
DiscordDirectoryProvider (layout-scoped state)
  DiscordWidgets
  DiscordFiltersBar
  AdminMasterDetail
    ├── DiscordTable
    └── DiscordDetails
Mobile detail: DiscordMemberDetailPage at /admin/discord/[id]
```

---

## 4. URL contract

| Param | Meaning |
|-------|---------|
| `q` | Search username / Discord id |
| `role` | `vip` \| `public` \| `analyst` \| `moderator` |
| `connection` | `connected` \| `disconnected` \| `left_server` \| `suspended` |
| `sync` | `failed` \| `pending` \| `synced` (also accepts enum forms) |
| `membership` | `vip` \| `free` |
| `member` / `memberId` | Selection |
| `page` / `pageSize` | Pagination |

Dashboard deep-link example: `/admin/discord?sync=failed`.  
Control Center: `/admin/discord?member=<id>`.

---

## 5. Key types

`DiscordMember` separates:

- `connectionStatus` — relationship to Discord  
- `syncStatus` — whether Discord matches TraderCity  
- `linkedMembership` — read projection for context  

---

## 6. Cross-module links

- Username → Member Control Center (`memberId`)  
- Sync actions — mock refresh / UI actions today (`DiscordSyncActions`)  
- Provider keeps list state across list ↔ detail  

Hook **TODO(NestJS):** replace mock list with authenticated Discord sync API.

---

## 7. Status

```text
UI ✅ · Responsive ✅ · Mock ✅ · Backend ⏳ · API ⏳
```
