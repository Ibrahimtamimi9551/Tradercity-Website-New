# Member Management — Database Entities (Reserved)

**Version:** 1.1  
**Status:** Planned  
**Authority:** `docs/Member Management/05_Backend/`  
**Last Updated:** July 29, 2026

---

## Purpose

Reserve the conceptual entity set implied by the Admin frontend and cross-module ownership contract. **Not** a Prisma schema. Backend may refine naming.

---

## Reserved entities

| Entity | Notes |
|--------|-------|
| `User` / `Member` | Identity — email, linked Discord username |
| `Membership` | Access SoT — plan, status, dates, renewals, **`activationSource`** |
| `SubscriptionPayment` / `PaymentTicket` | Crypto payment attempts, hash, verification outcome |
| `ManualPayment` | Offline / assisted receipt records — may exist **before** Member ID is linked |
| `PaymentQuote` | Frozen expected amount for crypto verification |
| `DiscordLink` | Connection + Discord snowflake |
| `DiscordRoleAssignment` | Role history |
| `DiscordSyncJob` | Sync attempts / failures |
| `ReferralProfile` | Code, progress, credits |
| `ReferralEvent` | Successful / pending referrals |
| `ReferralRedemption` | Redeem requests |
| `AdminNote` | Control Center notes |
| `MemberActivityEvent` | Ops timeline |

### ManualPayment (reserved fields)

Align to frontend `ManualPayment` / `ManualPaymentCreateInput`:

| Field | Notes |
|-------|-------|
| `id` | Stable Manual Payment id |
| `memberId` | Nullable until username resolved |
| `username` | Required free-text Discord username |
| `email` | Nullable until member linked |
| `planKey` / amounts / `currency` | Membership plan + receipt amount |
| `paymentMethod` / `reason` | Extensible enums |
| `receivedAt` | Actual receipt timestamp (**IST / +05:30**) |
| `referenceNumber` | Optional bank/UPI/transfer ref |
| `receivedBy` / `notes` | Admin operational fields |
| `status` | `pending` \| `activated` \| `cancelled` |
| `activatedBy` / `activatedAt` | Set on Activate only |
| `timeline` | Created → Recorded → Activated → Discord Sync |

**Rule:** one Membership period references **one** activation source record (Crypto ticket **or** Manual Payment — not both).

---

## Ownership reminder

One owner per field. Membership is not duplicated inside Subscription or Discord tables as conflicting SoT — those store their own domains and **project** Membership.

Authority: `docs/04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md`.
