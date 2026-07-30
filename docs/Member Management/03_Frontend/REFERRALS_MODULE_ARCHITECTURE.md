# Referrals Module Architecture (Members)

**Version:** 1.1  
**Status:** Active — shipped (mock)  
**Authority:** `docs/Member Management/03_Frontend/`  
**Routes:** `/admin/referrals`, `/admin/referrals/[id]`, `/admin/referrals/intelligence`  
**Phase record:** [`../06_Implementation/MEMBER_REFERRALS_IMPLEMENTATION.md`](../06_Implementation/MEMBER_REFERRALS_IMPLEMENTATION.md)  
**Last Updated:** July 29, 2026

---

## 1. Purpose

Referral Operations (+ Intelligence workspace).

Answers:

> How is the referral program performing — wallets, progress, analytics, intelligence?

```text
Referral owns
├── Wallet
├── Progress
├── Analytics
├── Intelligence
└── Member Referral Profile
```

> **Referral should NEVER activate memberships.**  
> Activation belongs to Subscriptions (Membership Activation Center).  
> Redeem request **approval** lives at `/admin/subscriptions?source=referral_redeem`.

**Owns:** referral code, progress, credits/wallet, referral activity, intelligence dashboards.  
**Does not own:** membership activation, payment verification, Discord sync, or redeem-request approval UI.

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

Redeem approval UI: `src/components/members/sections/subscriptions/referral-redeem/`

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
| `progress` | `in_progress` \| `completed` |
| `credit` | `has_credit` \| `no_credit` |
| `status=pending` | Pending referral invites |
| `sort` / `dir` | Sort key + direction |
| `member` / `memberId` | Selection |
| `page` / `pageSize` | Pagination |

Legacy redeem queue `/admin/referrals?progress=redeem_requests` **redirects** to  
`/admin/subscriptions?source=referral_redeem`.

Control Center: `/admin/referrals?member=<id>` (wallet / progress context only).

### Referral Progress filter

All · In Progress · Completed

| Filter | Matches |
|--------|---------|
| In Progress | `progressStatus = in_progress` |
| Completed | `redeemRequestStatus = approved` |

Redeem request statuses (owned by Activation Center for approval):  
Waiting Admin Approval · Approved · Rejected · Expired · Cancelled

---

## 5. Separation from Activation Center

| Question | Module |
|----------|--------|
| How is the referral program performing? | Referrals |
| How did this membership become active? | Subscriptions |

See [`../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md`](../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md).
