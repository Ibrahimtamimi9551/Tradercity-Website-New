# Members Dashboard Architecture

**Version:** 1.0  
**Status:** Active — shipped (mock) · **UI Design Frozen**  
**Authority:** `docs/Member Management/03_Frontend/`  
**Route:** `/admin`  
**Phase record:** [`../06_Implementation/MEMBER_DASHBOARD_IMPLEMENTATION.md`](../06_Implementation/MEMBER_DASHBOARD_IMPLEMENTATION.md)  
**Last Updated:** July 28, 2026

---

## 1. Purpose

The Members Dashboard is the **Operations Center inbox**.

It answers:

> What requires my attention right now?

It owns **no** domain data. Widgets deep-link into owning modules with filter query params.

---

## 2. Source ownership

```text
src/app/admin/page.tsx
src/components/members/sections/dashboard/
  DashboardPage.tsx
  OperationalWidgets.tsx
  OperationsQueueSection.tsx
  RecentActivity.tsx
  QuickActions.tsx
  RevenueOverview.tsx
  PlatformHealth.tsx
```

Shell: `src/components/admin/layout/AdminShell.tsx` via `src/app/admin/layout.tsx`.

---

## 3. Layout (shipped)

```text
PageTitle (date range + Export Report — mock UI)
OperationalWidgets (stat grid — Action Driven Navigation)
OperationsQueueSection | RecentActivity
QuickActions | RevenueOverview
PlatformHealth
```

---

## 4. Action Driven Navigation (examples)

| Widget | Deep-link |
|--------|-----------|
| Total Members | `/admin/members` |
| Pending Verification | `/admin/subscriptions?status=pending_verification` |
| Awaiting Admin Approval | `/admin/subscriptions?status=awaiting_admin_approval` |
| Verification Required | `/admin/subscriptions?status=verification_required` |
| Discord Issues | `/admin/discord?sync=failed` |
| Referral Redeem Requests | `/admin/referrals?progress=redeem_requests` |

Primary Subscription ops queue after auto-verify: **Awaiting Admin Approval**.

Additional membership / Discord / mail widgets appear in `OperationalWidgets.tsx` — all use `WidgetCard` + `href`.

Canonical payment policy: [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md).  
Activation sources: [`../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md`](../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md).

---

## 5. Design freeze

Dashboard visual language is the **official Admin design language**.

Subsequent modules must inherit:

- `WidgetCard`  
- `modulePanelSurface` / tones  
- Shell, typography, spacing, interaction patterns  

Do **not** redesign. Authority: `docs/AI/Agents/Admin/02_Frontend_Design_System_and_UX_Rules.md`.

---

## 6. Backend expectations

| Method | Path | Replaces |
|--------|------|----------|
| `GET` | `/admin/dashboard` *(or `/admin/members/dashboard`)* | Inline widget mock numbers + queue lists |

Preserve deep-link contracts when wiring real counts.

---

## 7. Status

```text
UI ✅ · Responsive ✅ · Mock ✅ · Backend ⏳ · API ⏳
```
