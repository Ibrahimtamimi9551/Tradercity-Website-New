# Referrals Module Architecture (Members)

**Version:** 1.0  
**Status:** Active — shipped (mock)  
**Authority:** `docs/Member Management/03_Frontend/`  
**Routes:** `/admin/referrals`, `/admin/referrals/[id]`, `/admin/referrals/intelligence`  
**Phase record:** [`../06_Implementation/MEMBER_REFERRALS_IMPLEMENTATION.md`](../06_Implementation/MEMBER_REFERRALS_IMPLEMENTATION.md)  
**Last Updated:** July 29, 2026

---

## 1. Purpose

Referral Operations (+ Intelligence workspace).

Answers:

> Who has pending referrals, available credit, or Referral Redeem Requests waiting admin approval — and what is program performance?

**Owns:** referral code, progress, credits, Referral Redeem Requests, referral activity.  
**May write Membership** on Approve Redeem (triggers Membership lifecycle — backend orchestration).  
**Does not own:** payment verification, Discord sync, or a separate activation lifecycle.

---

## 2. Source ownership

```text
src/app/admin/referrals/layout.tsx
src/app/admin/referrals/(operations)/layout.tsx
src/app/admin/referrals/(operations)/page.tsx
src/app/admin/referrals/(operations)/[id]/page.tsx
src/app/admin/referrals/intelligence/page.tsx
src/components/members/sections/referrals/
  ReferralsPage.tsx
  ReferralsDirectoryProvider.tsx
  ReferralModuleNav.tsx
  ReferralWidgets.tsx
  ReferralFiltersBar.tsx
  ReferralTable.tsx
  ReferralDetails.tsx
  ReferralMemberDetailPage.tsx
  ReferralRowActions.tsx
  intelligence/…
src/lib/members/hooks/useReferralsDirectory.ts
src/lib/members/mock/referral-members.ts
src/lib/members/mock/referral-intelligence.ts
src/types/members/referral.ts
src/types/members/referral-intelligence.ts
```

---

## 3. Internal workspaces

```text
Operations   /admin/referrals
Intelligence /admin/referrals/intelligence
```

`ReferralModuleNav` switches workspaces. Intelligence is a module subroute ignored by the operations directory hook (`REFERRAL_MODULE_SUBROUTES`).

---

## 4. URL contract (Operations)

| Param | Meaning |
|-------|---------|
| `q` | Search |
| `plan` / `membership` | Plan filter |
| `progress` | `in_progress` \| `completed` \| **`redeem_requests`** |
| `credit` | `has_credit` \| `no_credit` |
| `status=pending` | Pending referral invites (distinct from redeem queue) |
| `sort` / `dir` | Sort key + direction |
| `member` / `memberId` | Selection |
| `page` / `pageSize` | Pagination |

Dashboard redeem queue: `/admin/referrals?progress=redeem_requests`.  
Control Center: `/admin/referrals?member=<id>`.

### Referral Progress filter

All · In Progress · Completed · **Referral Redeem Requests**

| Filter | Matches |
|--------|---------|
| In Progress | `progressStatus = in_progress` |
| Completed | `redeemRequestStatus = redeemed` (redeem requested + admin approved) |
| Referral Redeem Requests | `redeemRequestStatus = waiting_admin_approval` |

When **Referral Redeem Requests** is selected, show only members with status **Waiting Admin Approval**.  
**Completed** does not include Waiting Admin Approval rows.

### Row actions (⋮)

When Waiting Admin Approval: **Approve Redeem** · **Reject Redeem**  
Approve triggers Membership lifecycle (not Referral-owned activation). See [`../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md`](../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md).

---

## 5. Intelligence UI (shipped mock)

Sections under `intelligence/` include revenue overview, trends, leaderboard, journey, membership revenue, wallet journey, business insights — all fed by `referral-intelligence` mock.

---

## 6. Status

```text
UI ✅ · Responsive ✅ · Mock ✅ · Backend ⏳ · API ⏳
```
