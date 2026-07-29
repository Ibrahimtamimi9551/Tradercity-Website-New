# Member Subscriptions — Implementation Report

**Phase:** 4  
**Status:** UI complete on mocks (Crypto + Manual Payment sources)  
**Last Updated:** July 29, 2026  
**Canonical lifecycle:** [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)  
**Backend contracts:** [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)

---

## Freeze override

Delivered under an **explicit Product Owner override** to Engineering Freeze — scoped to Subscriptions frontend + related documentation only. Unrelated features remain frozen.

---

## What shipped

### Types + mocks
- `src/types/members/subscription.ts` — Crypto tickets, filters, stats, verification/approval, **`PaymentResolution`**
- `src/types/members/manual-payment.ts` — Manual Payment records, methods, reasons, filters, create input
- `src/lib/members/mock/subscriptions.ts` — Crypto cohort only (no Manual members)
- `src/lib/members/mock/manual-payments.ts` — Manual cohort only (no Crypto members)
- `src/lib/members/mock/activation-source.ts` — **SSOT** resolver: member → one Activation Source → payment record
- `src/lib/members/ist-datetime.ts` — IST (`Asia/Kolkata`) helpers for Manual Payment timestamps
- Hooks: `useSubscriptionsDirectory` · `useManualPaymentsDirectory` (URL-synced + mock mutations)

### Section UI (`src/components/members/sections/subscriptions/`)
- **Source tabs** via `SubscriptionsSourceNav` — Crypto Payments · Manual Payments
- Crypto: Widgets, Filters, Table, Details, PaymentResolutionCard, RowActions, Provider
- Manual (`manual/`): Widgets, Filters, Table, Details, Form (create + review), RowActions, Provider, Panel
- Shared admin picker: `src/components/admin/ui/DateTimePicker.tsx` (calendar + time popup)
- Gold `modulePanelSurface` / `AdminDirectoryPanel` tone

### Routes
- `/admin/subscriptions` — Crypto list + desktop side panel
- `/admin/subscriptions?source=manual` — Manual Payments
- `/admin/subscriptions/[id]` — mobile detail (`SubscriptionDetailRouter` → Crypto or Manual by `mp-*` / `source=`)
- Layout mounts both directory providers (Discord pattern)

### Dashboard / Profile
- Crypto deep-links unchanged (`?status=…`)
- Profile subscription fields built from owning payment record (not a random cycle)
- `SubscriptionCard` adapts by `activationSource`
- Manage Subscription for Manual → `?source=manual&q=<username>`

---

## Manual Payment (independent activation source)

Not a fallback for Crypto. Administrator confirms receipt — **no blockchain verification**.

```text
Create Manual Payment
        ↓
Enter Payment Information
        ↓
Review
        ↓
Activate Membership
        ↓
Discord Sync
        ↓
Timeline Updated
```

| Status | Meaning |
|--------|---------|
| Pending | Recorded — ready to activate |
| Activated | Membership + Discord sync reflected |
| Cancelled | Closed — Membership unchanged |

### Create form contracts (backend-relevant)

| Field | Frontend behaviour | Backend expectation |
|-------|--------------------|---------------------|
| Discord Username | Free-text input (type/paste). Not a member dropdown. | Persist `username`; `memberId` may be `null` until resolved |
| Membership Plan | `monthly` / `quarterly` / `yearly` | Same enums |
| Amount / Currency | Editable | Decimal string + currency enum |
| Payment Method | Extensible dropdown | Preserve enum keys |
| Payment Date | **DateTimePicker** — calendar + independent time; default current **IST** | Store `receivedAt` with `+05:30`; do not treat as create-time |
| Reference Number | Optional | Nullable |
| Received By / Reason / Notes | Admin ops fields | Persist for audit |

Payment methods: Bank Transfer · UPI · Cash · PayPal · Wise · Exchange Transfer · Other  
Reasons: New Membership · Renewal · Upgrade · Extension · Manual Correction · Special Approval · Other

### Member partition (mock SSOT)

| Source | Members |
|--------|---------|
| Crypto | `m-001`, `m-002`, `m-003`, `m-004`, `m-007`, `m-009`, `m-011` |
| Manual | `m-005`, `m-006`, `m-008`, `m-010`, `m-012` |

One membership → one activation source. Profile / Control Center must stay synchronized with the owning payment record.

---

## Payment Resolution (Crypto — Verification Required)

Frontend-only structured dispute workflow for Crypto tickets only. Manual Payments do not use Payment Resolution.

---

## Product policy (docs locked)

- Crypto: Automatic verification → **Approval Pending**; Membership activates **only after Admin Approve**
- Manual: Administrator is confirmation source; Membership activates **only after Activate Membership**
- Creating a Manual Payment (`pending`) does **not** activate Membership
- Both converge into Membership domain (source of truth)
- `activationSource` remains extensible for Referral Redeem / Admin Grant

---

## What is not shipped

- NestJS APIs / Prisma / blockchain verification engine
- Username → Member ID resolution service
- Evidence upload / Discord messaging integration
- Referral Redeem / Admin Grant ticket UIs
- Standalone `/admin/payments` module (intentionally deferred)

---

## Backend impact

Full contracts in [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md).  
Entities: [`../05_Backend/DATABASE_ENTITIES.md`](../05_Backend/DATABASE_ENTITIES.md).

| Surface | Stub / reserved path |
|---------|----------------------|
| Crypto Approve / Reject | `POST /admin/subscriptions/:id/approve\|reject` |
| Manual list / detail | `GET /admin/subscriptions/manual-payments[/:id]` |
| Manual create | `POST /admin/subscriptions/manual-payments` |
| Manual activate / cancel | `POST …/manual-payments/:id/activate\|cancel` |

---

## Related

Architecture: [`../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/SUBSCRIPTIONS_MODULE_ARCHITECTURE.md)  
Admin ops: [`../04_Admin/SUBSCRIPTION_ADMINISTRATION.md`](../04_Admin/SUBSCRIPTION_ADMINISTRATION.md)  
Phase record: [`../../Development/Admin/Phase-04-Subscriptions.md`](../../Development/Admin/Phase-04-Subscriptions.md)
