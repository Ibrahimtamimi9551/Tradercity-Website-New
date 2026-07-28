# Member Management API Expectations

**Version:** 1.0  
**Status:** Draft — planning contracts from Admin frontend  
**Authority:** `docs/Member Management/05_Backend/`  
**Last Updated:** July 28, 2026

Backend developers: use this + [`../00_Overview/PROJECT_STATUS.md`](../00_Overview/PROJECT_STATUS.md). Do not reverse-engineer the UI alone.

**Do not invent NestJS implementation here** — this document reserves contracts the frontend expects.

---

## Auth

All `/admin/**` Member Management APIs: **Admin** role required.

---

## Dashboard

| Method | Path | Replaces |
|--------|------|----------|
| `GET` | `/admin/dashboard` | Inline mock widget values + queues in `dashboard/` |

Return KPI cards, operations queue items, recent activity compatible with Dashboard sections.

---

## Members Directory

| Method | Path | Replaces |
|--------|------|----------|
| `GET` | `/admin/members` | `MOCK_DIRECTORY_MEMBERS` + `MOCK_DIRECTORY_STATS` |

### Query params (preserve)

| Param | Required | Meaning |
|-------|----------|---------|
| `q` | no | Search username / email |
| `membership` | no | `vip` \| `free` |
| `subscription` | no | Directory subscription enum |
| `discord` | no | Directory discord enum |
| `referral` | no | `in_progress` \| `eligible` |
| `health` | no | System Health enum |
| `page` | no | 1-based |
| `pageSize` | no | `10` \| `25` \| `50` |

### Expected response (conceptual)

```text
{
  items: DirectoryMember[],
  total: number,
  stats?: DirectoryStats
}
```

Align to `src/types/members/directory.ts`.

---

## Member Control Center

Frontend: `useMemberProfile` → `getMemberProfile`. Align to `MemberProfile` in `src/types/members/profile.ts`.

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/members/:id` | Full Control Center projection |
| `GET` | `/admin/members/:id/activity` | Timeline |
| `GET` | `/admin/members/:id/notes` | List notes |
| `POST` | `/admin/members/:id/notes` | Create note |

Optional later: `PATCH` account status if product confirms Admin may suspend from Directory.

---

## Subscriptions (Phase 4 — UI pending)

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/subscriptions` | Ticket list + stats |
| `GET` | `/admin/subscriptions/:id` | Ticket detail (verification fields + explorer URL) |
| `POST` | `/admin/subscriptions/:id/approve` | **Mandatory** Phase 1 gateway → Membership activate → Discord |
| `POST` | `/admin/subscriptions/:id/reject` | Reject with reason — Membership unchanged |

### Query params to preserve (already / to be linked from UI)

| Param | Source |
|-------|--------|
| `status=blockchain_verifying` | Dashboard — still verifying |
| `status=approval_pending` | Dashboard — **primary Approve queue** after Verified |
| `status=verification_required` | Dashboard — verification failed |
| `member` | Control Center Manage link |

**Contract:** `verified` / auto-verify success must **not** activate Membership. Only `approve` does.

Canonical: [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md).

---

## Discord

Frontend: `useDiscordDirectory` → `MOCK_DISCORD_MEMBERS`.

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/discord/members` *(or `/admin/discord`)* | List + stats |
| `GET` | `/admin/discord/members/:id` | Detail projection |
| `POST` | `/admin/discord/members/:id/sync` | Trigger sync |
| `POST` | `/admin/discord/refresh` | Bulk refresh status |

Preserve query: `q`, `role`, `connection`, `sync`, `membership`, `member`, pagination.

Align to `src/types/members/discord.ts`.

---

## Referrals

Frontend: `useReferralsDirectory` + intelligence mock.

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/referrals` | Ops list + stats |
| `GET` | `/admin/referrals/:id` | Member referral detail |
| `POST` | `/admin/referrals/:id/redeem` | Approve redeem *(product-confirm)* |
| `GET` | `/admin/referrals/intelligence` | BI aggregate |

Preserve ops query: `q`, `plan`, `progress`, `credit`, `status`, `sort`, `dir`, `member`, pagination.

Align to `src/types/members/referral.ts` + `referral-intelligence.ts`.

---

## Hook replacement checklist

| Hook / surface | Status |
|----------------|--------|
| Dashboard data | Mock inline |
| `useMembersDirectory` | Mock + TODO(NestJS) |
| `useMemberProfile` | Mock + TODO NestJS GET |
| Subscriptions hook | **Not created** |
| `useDiscordDirectory` | Mock + TODO(NestJS) |
| `useReferralsDirectory` | Mock + TODO(NestJS) |
| Intelligence fetch | Mock file direct |

---

## Related

[`INTEGRATION_POINTS.md`](./INTEGRATION_POINTS.md) · [`../02_Product_Architecture/MEMBER_BACKEND_INTEGRATION.md`](../02_Product_Architecture/MEMBER_BACKEND_INTEGRATION.md)
