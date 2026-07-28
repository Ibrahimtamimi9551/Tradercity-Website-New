# Member Control Center Architecture

**Version:** 1.0  
**Status:** Active — shipped (mock)  
**Authority:** `docs/Member Management/03_Frontend/`  
**Route:** `/admin/members/[id]`  
**Phase record:** [`../06_Implementation/MEMBER_CONTROL_CENTER_IMPLEMENTATION.md`](../06_Implementation/MEMBER_CONTROL_CENTER_IMPLEMENTATION.md)  
**Terminology:** UI = Member Control Center / User Profile · Product = Member Platform  
**Last Updated:** July 28, 2026

---

## 1. Purpose

The Member Control Center is the **reflection hub for one member**.

It answers:

> What is the complete current operational state of this member?

Unlike the Analyst Control Center (which also executes partnership actions), the Member Control Center **does not** own payment approval, Discord sync, or referral redeem. Those live in domain modules.

| Does | Does not |
|------|----------|
| Aggregate cross-module state | Own payment / Discord / referral / Membership writes |
| Identity header | Full CRM redesign / photo upload workflows |
| Read-only cards + **Manage →** links | Approve / reject / sync / redeem |
| Own Internal Notes | Suspend Membership as a domain write (account suspend may exist as directory mock only) |
| Activity timeline (ops events) | Product analytics (lesson views, etc.) |

---

## 2. Relationship to Directory Inspector

| Directory Inspector | Control Center |
|---------------------|----------------|
| Quick inspection | Full reflection hub |
| Same page as Directory | Own route `/admin/members/[id]` |
| Summary | Header + tabs + cards |
| Does not own notes aggregate UI | Notes + Activity owned here |

**Rule:** Keep the Directory panel. Do not grow it into Control Center.

---

## 3. Navigation entry points (shipped)

| Entry | Behavior |
|-------|----------|
| Directory identity | → Control Center |
| Discord / Referrals “View Member Profile” | → Control Center via `memberId` |
| Direct URL | `/admin/members/[id]?tab=` |

Not a sidebar item.

---

## 4. Tabs

```text
Overview · Subscription · Discord · Referral · Notes · Activity
```

| Tab | Maturity |
|-----|----------|
| Overview | **Implemented** — Membership · Subscription · Discord · Referral cards + Notes + Activity preview |
| Subscription | **Implemented** — `SubscriptionCard` only |
| Discord | **Implemented** — reflection; extended management in Discord module |
| Referral | **Implemented** — reflection; extended management in Referrals module |
| Notes | **Implemented** — list (mock); add UX present |
| Activity | **Implemented** — timeline |

URL: `?tab=<id>` (default Overview omits param). Parser: `parseProfileTab` in `useMemberProfile.ts`.

---

## 5. Cards (Overview)

| Card | Reflects | Manage link |
|------|----------|-------------|
| Membership Activity (`MembershipCard`) | Membership access + **Activation Source** | → Subscriptions (or domain of last activation) |
| Subscription (`SubscriptionCard`) | Payment / activation fields **by Activation Source** | → Subscriptions · or Referrals when source = Referral Redeem |
| Discord (`DiscordCard`) | Role / connection | → `/admin/discord?member=<id>` |
| Referral (`ReferralCard`) | Progress / credits | → `/admin/referrals?member=<id>` |
| Notes (`NotesCard`) | Internal notes | — (owns notes) |
| Activity (`ActivityTimeline`) | Ops events | Expand via Activity tab |

### Subscription card — Activation Source

| Source | Fields shown |
|--------|----------------|
| Crypto Payment | Existing payment ticket fields (plan, status, hash, method, amount, dates) |
| Manual Payment | Plan · Amount · Payment Method · Notes · Approved By · Activation Date |
| Referral Redeem | Plan · Credits Redeemed · Approved By · Activation Date |
| Admin Grant / Future Grant | Plan · Notes · Approved By · Activation Date |

Canonical: [`../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md`](../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md)

Shared chrome: `ReflectionCard`, `FieldRow`, `ManageLink` in `ReflectionCard.tsx`.

---

## 6. Header (shipped)

Discord-style avatar · Username · Email · Membership badge · Discord badge · Joined · Online indicator · Breadcrumb back to Members.

Source: `ProfileHeader.tsx`.

---

## 7. Source ownership (shipped)

```text
src/app/admin/members/[id]/page.tsx
src/components/members/sections/profile/
  MemberProfileView.tsx
  ProfilePage.tsx          # MemberProfilePageContent
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
src/lib/members/hooks/useMemberProfile.ts
src/lib/members/mock/profile-members.ts
src/lib/members/format-profile.ts
src/types/members/profile.ts
```

---

## 8. Component contracts (major)

| Component | Purpose | Inputs | Outputs / deps |
|-----------|---------|--------|----------------|
| `MemberProfileView` | Suspense compositor | `memberId` | Renders `MemberProfilePageContent` |
| `MemberProfilePageContent` | Page state + tabs | `memberId` | `useMemberProfile`, tab URL sync |
| `ProfileHeader` | Identity chrome | `profile` | Link to directory |
| `ProfileTabs` | Tab list | `active`, `onChange` | A11y tablist |
| `MembershipCard` | Membership reflection | `profile` | Manage → Subscriptions |
| `SubscriptionCard` | Payment reflection | `profile` | Hash copy · Manage → Subscriptions |
| `DiscordCard` | Discord reflection | `profile` | Manage → Discord |
| `ReferralCard` | Referral reflection | `profile` | Manage → Referrals |
| `NotesCard` | Notes | `profile`, `expanded?` | Mock list / add |
| `ActivityTimeline` | Activity | `profile`, `expanded?` | Kind-based timeline |
| `ReflectionCard` | Shared card shell | tone, title, icon, footer | `modulePanelSurface` |

---

## 9. Backend expectations (planning only)

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/members/:id` | Full Control Center projection (`MemberProfile`) |
| `GET` | `/admin/members/:id/activity` | Timeline (Submitted → Verified → Awaiting Approval → Activated → Discord) |
| `GET` / `POST` | `/admin/members/:id/notes` | Internal notes |

See [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md).

Hook today: `useMemberProfile` → `getMemberProfile(memberId)` mock. **TODO:** NestJS `GET /admin/members/:id`.

---

## 10. Future backend integration

- Replace mock aggregate with API projection that joins Membership, Subscription, Discord, Referral summaries  
- Notes mutations persist server-side  
- Activity stream from domain events (must include Awaiting Admin Approval — never skip)  
- Keep Manage links pointing at owning modules — do not add approve/sync buttons here  
- Canonical payment policy: [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)

---

## 11. Status

```text
UI ✅ · Responsive ✅ · Mock ✅ · Backend ⏳ · API ⏳
```
