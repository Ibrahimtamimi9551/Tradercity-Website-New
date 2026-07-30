# Members Directory Architecture

**Version:** 1.0  
**Status:** Active — shipped (mock)  
**Authority:** `docs/Member Management/03_Frontend/`  
**Route:** `/admin/members`  
**Phase record:** [`../06_Implementation/MEMBER_DIRECTORY_IMPLEMENTATION.md`](../06_Implementation/MEMBER_DIRECTORY_IMPLEMENTATION.md)  
**Last Updated:** July 29, 2026

---

## 1. Purpose

Find, search, filter, assess **System Health**, and navigate to the Member Control Center.

Answers:

> Who are our members — and who needs attention?

---

## 2. Source ownership

```text
src/app/admin/members/page.tsx
src/components/members/sections/directory/
  MembersDirectoryPage.tsx
  DirectoryWidgets.tsx
  DirectoryFiltersBar.tsx
  MembersTable.tsx
  MemberDirectoryDetails.tsx
  index.ts
src/lib/members/hooks/useMembersDirectory.ts
src/lib/members/mock/directory-members.ts
src/lib/members/directory-keys.ts
src/types/members/directory.ts
```

---

## 3. Composition

```text
DirectoryWidgets (stats deep-links)
DirectoryFiltersBar (URL-synced filters)
AdminMasterDetail
  ├── MembersTable
  └── MemberDirectoryDetails (inspector)
```

---

## 4. URL filter contract

Shared by widgets and filter bar (`useMembersDirectory`):

| Param | Meaning |
|-------|---------|
| `q` | Search username / email |
| `membership` | `vip` \| `free` |
| `subscription` | `active` \| `pending_verification` \| `verification_required` \| `none` |
| `discord` | `connected` \| `disconnected` \| `action_required` \| `suspended` |
| `referral` | `in_progress` \| `eligible` \| `redeem_requests` \| `completed` |
| `health` | `healthy` \| `needs_attention` \| `action_required` |
| `page` / `pageSize` | Pagination (`10` \| `25` \| `50`) |

### Referral filter (aligned with Referrals module)

| Filter | Matches `referralStatus` |
|--------|--------------------------|
| In Progress | `in_progress` |
| Eligible | `eligible` (target met, redeem not requested) |
| Referral Redeem Requests | `waiting_admin_approval` |
| Completed | `completed` (redeem approved) |

**Rule:** Completed ≠ Eligible. Members who already redeemed (e.g. Fatima) appear only under **Completed**.

Legacy / ops aliases: `status` → subscription; `sync` → discord; `expiring=today` maps health to `needs_attention`.

---

## 5. Navigation to Control Center

| Entry | Behavior |
|-------|----------|
| Username / identity click | → `/admin/members/[id]` |
| Inspector action | Open Control Center |
| Row select | Inspector selection (desktop) |

---

## 6. System Health

Displayed via `SystemHealthBadge`. Production values are **backend-computed**. Mock seeds supply `systemHealth` on each `DirectoryMember`.

---

## 7. Hook notes

`useMembersDirectory`:

- Local state + `router.push` URL sync  
- Client-side filter of `MOCK_DIRECTORY_MEMBERS`  
- Optional mock `accountStatus` overrides  
- **TODO(NestJS):** replace mock list with authenticated members API  

---

## 8. Status

```text
UI ✅ · Responsive ✅ · Mock ✅ · Backend ⏳ · API ⏳
```
