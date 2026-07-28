# Member Domain Model

**Version:** 1.0  
**Status:** Active  
**Authority:** `docs/Member Management/02_Product_Architecture/`  
**Last Updated:** July 28, 2026

Canonical field ownership also lives in shared  
`docs/04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md`.  
This document restates the model for Member Management onboarding.

---

## Ownership matrix

| Domain | Owns | Writable from | Reflects in |
|--------|------|---------------|-------------|
| **Identity** | Email, Discord username (linked), directory UX identity | Registration / identity edits | Profile header, Members table |
| **Membership** *(backend, not Admin page)* | Plan, VIP/access, activation/expiry, days remaining, renewals, **activation source** | Subscriptions (Crypto / Manual Approve), Referral Redeem Approve, Admin Grant, future grants | Profile Membership card, Members, Dashboard, Discord sync inputs |
| **Subscription** | Payments, hash, wallet, verification, **Admin Approval**, timeline, disputes | Subscriptions module (**Approve** triggers Membership write) | Profile Subscription card (fields adapt by activation source) |
| **Discord** | Role, connection, sync, role history, invites | Discord module / sync service | Profile Discord card |
| **Referral** | Code, progress, credits, **Referral Redeem Requests** | Referrals module (Approve Redeem → Membership lifecycle) | Profile Referral card |
| **User Profile / Control Center** | Internal notes (+ activity presentation) | Profile notes | Itself |
| **Dashboard** | Nothing | — | Queues / widgets only |

---

## Frontend type anchors

| Concept | Type location |
|---------|---------------|
| Directory row | `src/types/members/directory.ts` → `DirectoryMember` |
| Control Center aggregate | `src/types/members/profile.ts` → `MemberProfile` |
| Discord ops row | `src/types/members/discord.ts` → `DiscordMember` |
| Referral ops row | `src/types/members/referral.ts` → `ReferralMember` |
| Referral intelligence | `src/types/members/referral-intelligence.ts` |

These types describe **frontend contracts**. Backend entities may rename tables while preserving one owner per field.

---

## DirectoryMember (roster projection)

Key fields (see type file for full set):

- Identity: `id`, `username`, `email`, `avatarTone`, `joinedAt`  
- Membership tier: `membership` (`vip` \| `free`)  
- Subscription ticket status: `subscription`  
- Discord status: `discord`  
- Account status: `accountStatus` (`active` \| `suspended`)  
- Referral progress: `referralCurrent`, `referralTarget`, `referralStatus` (`in_progress` \| `eligible` \| `waiting_admin_approval` \| `completed`)  
- System Health: `systemHealth` (`healthy` \| `needs_attention` \| `action_required`)

**Rule:** System Health is **backend-computed** in production. Frontend displays only.

---

## MemberProfile (Control Center projection)

Aggregate sections:

- `header` — membership + Discord badges  
- `membership` — access reflection  
- `subscription` — payment reflection  
- `discord` — sync reflection + module timeline  
- `referral` — progress reflection + module timeline  
- `notes` — owned by Control Center  
- `activity` — aggregated operational timeline  

---

## Single source of truth rule

```text
Backend decides.
Modules execute.
Control Center reflects.
Dashboard / Directory read.
```

Never duplicate VIP / payment / Discord / referral business logic inside the Control Center.

---

## Membership Activation Sources

Membership may be written by multiple operational modules. All converge into one lifecycle.

Canonical: [`MEMBERSHIP_ACTIVATION_SOURCES.md`](./MEMBERSHIP_ACTIVATION_SOURCES.md)

| Source | Writer |
|--------|--------|
| Crypto Payment | Subscriptions (Admin Approve) |
| Manual Payment | Subscriptions / Ops |
| Referral Redeem | Referrals (Approve Redeem) |
| Admin Grant | Explicit grant action |
| Future Grant | Campaigns, partners, coupons, … |

**Rule:** Sources validate and request. Membership owns final access. Profile / Discord / Dashboard reflect.
