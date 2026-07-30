# Member Management API Expectations

**Version:** 1.1  
**Status:** Draft — planning contracts from Admin frontend  
**Authority:** `docs/Member Management/05_Backend/`  
**Last Updated:** July 29, 2026

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

## Subscriptions (Phase 4 — UI complete on mocks)

Subscriptions hosts **two independent Membership Activation Sources** under one Admin route (`/admin/subscriptions`). They share visual language and Membership write semantics, but **not** the same verification lifecycle.

Frontend authority:
- Types: `src/types/members/subscription.ts` · `src/types/members/manual-payment.ts`
- Architecture: [`../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md)
- Implementation: [`../06_Implementation/MEMBER_SUBSCRIPTIONS_IMPLEMENTATION.md`](../06_Implementation/MEMBER_SUBSCRIPTIONS_IMPLEMENTATION.md)

### Crypto Payments

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/subscriptions` | Ticket list + stats (default tab) |
| `GET` | `/admin/subscriptions/:id` | Ticket detail (verification fields + explorer URL) |
| `POST` | `/admin/subscriptions/:id/approve` | **Mandatory** Phase 1 gateway → Membership activate → Discord |
| `POST` | `/admin/subscriptions/:id/reject` | Reject with reason — Membership unchanged |

#### Crypto query params (preserve)

| Param | Source |
|-------|--------|
| `status=blockchain_verifying` | Dashboard — still verifying |
| `status=approval_pending` | Dashboard — **primary Approve queue** after Verified |
| `status=verification_required` | Dashboard — verification failed |
| `member` | Control Center Manage link |
| `q` / `plan` / `network` / `verification` / `page` / `pageSize` | Directory filters |

**Contract:** `verified` / auto-verify success must **not** activate Membership. Only `approve` does.

Canonical: [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md).

### Manual Payments (independent activation source)

Not a Crypto fallback. No blockchain / explorer / verification engine. Administrator confirms receipt.

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/subscriptions/manual-payments` | List + stats |
| `GET` | `/admin/subscriptions/manual-payments/:id` | Detail + timeline |
| `POST` | `/admin/subscriptions/manual-payments` | Create → status `pending` |
| `POST` | `/admin/subscriptions/manual-payments/:id/activate` | Membership activate → Discord → Audit |
| `POST` | `/admin/subscriptions/manual-payments/:id/cancel` | Cancel — Membership unchanged |

Frontend URL tab: `/admin/subscriptions?source=manual`  
Align response shapes to `ManualPayment` / `ManualPaymentStats` / `ManualPaymentFilters` in `src/types/members/manual-payment.ts`.

#### Manual query params (preserve)

| Param | Meaning |
|-------|---------|
| `q` | Search username / email / reference |
| `mpStatus` | `pending` \| `activated` \| `cancelled` |
| `mpPlan` | `monthly` \| `quarterly` \| `yearly` |
| `mpMethod` | Payment method enum |
| `mpFrom` / `mpTo` | Received-date range (`yyyy-mm-dd`, IST calendar days) |
| `payment` | Selected Manual Payment id |
| `page` / `pageSize` | Pagination |

#### Create payload (`POST /admin/subscriptions/manual-payments`)

Frontend `ManualPaymentCreateInput`:

```text
{
  username: string,          // free-text Discord username (may not exist yet)
  planKey: "monthly" | "quarterly" | "yearly",
  amount: string,            // decimal string, e.g. "60.00"
  currency: "USD" | "USDT" | "EUR" | "GBP" | "INR",
  paymentMethod: ManualPaymentMethod,
  receivedAt: string,        // ISO-8601 with explicit offset, IST (+05:30)
  referenceNumber: string,   // optional; empty string allowed
  receivedBy: string,        // admin display name
  reason: ManualPaymentReason,
  notes: string              // optional internal notes
}
```

**Username rules (backend must support):**
- Admin may type/paste any Discord username (`@` optional).
- Member account may **not** exist yet (paid before registration / Discord / WhatsApp / support-assisted).
- Persist `username` always.
- `memberId` may be `null` until resolved.
- Later: resolve username → Member ID (Discord lookup / registration link) and backfill.

**`receivedAt` rules:**
- Represents **actual payment receipt time**, not record-creation time.
- Frontend defaults to current **IST (`Asia/Kolkata`)** via Date & Time picker; admin may change date and time independently.
- Store with explicit offset (frontend sends `…+05:30`). Display Admin timestamps in IST.
- Do not overwrite `receivedAt` on activate — activation gets its own `activatedAt`.

#### Manual statuses

| Status | Meaning |
|--------|---------|
| `pending` | Recorded — ready to activate |
| `activated` | Membership written · Discord sync reflected |
| `cancelled` | Closed — Membership unchanged |

#### Activate / Cancel contracts

| Action | Effect |
|--------|--------|
| Activate | Only from `pending` → write Membership (`activationSource=manual_payment`) → Discord sync → set `activated` + `membershipResult` |
| Cancel | Only from `pending` → `cancelled` · no Membership mutation |

**Same Membership gateway principle as Crypto Approve:** recording a Manual Payment does **not** activate Membership. Only explicit Activate does.

#### Enums to preserve (extensible)

| Field | Values |
|-------|--------|
| `paymentMethod` | `bank_transfer` · `upi` · `cash` · `paypal` · `wise` · `exchange_transfer` · `other` |
| `reason` | `new_membership` · `renewal` · `upgrade` · `membership_extension` · `manual_correction` · `special_approval` · `other` |

#### Control Center / Profile projection

`GET /admin/members/:id` subscription reflection must derive from the owning payment source:
- Crypto members → crypto ticket fields (hash, network, explorer, verification, approval)
- Manual members → method, amount, receivedAt, reference, receivedBy, reason, notes, activatedBy
- One active membership → **one** `activationSource` (never both)

Frontend mock SSOT: `src/lib/members/mock/activation-source.ts`.

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
| `useSubscriptionsDirectory` | Mock + TODO(NestJS) Crypto tickets |
| `useManualPaymentsDirectory` | Mock + TODO(NestJS) Manual payments |
| `useDiscordDirectory` | Mock + TODO(NestJS) |
| `useReferralsDirectory` | Mock + TODO(NestJS) |
| Intelligence fetch | Mock file direct |

---

## Related

[`INTEGRATION_POINTS.md`](./INTEGRATION_POINTS.md) · [`../02_Product_Architecture/MEMBER_BACKEND_INTEGRATION.md`](../02_Product_Architecture/MEMBER_BACKEND_INTEGRATION.md)
