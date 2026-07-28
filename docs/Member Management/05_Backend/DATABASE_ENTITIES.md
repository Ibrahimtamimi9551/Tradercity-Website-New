# Member Management — Database Entities (Reserved)

**Version:** 1.0  
**Status:** Planned  
**Authority:** `docs/Member Management/05_Backend/`  
**Last Updated:** July 28, 2026

---

## Purpose

Reserve the conceptual entity set implied by the Admin frontend and cross-module ownership contract. **Not** a Prisma schema. Backend may refine naming.

---

## Reserved entities

| Entity | Notes |
|--------|-------|
| `User` / `Member` | Identity — email, linked Discord username |
| `Membership` | Access SoT — plan, status, dates, renewals |
| `SubscriptionPayment` / `PaymentTicket` | Payment attempts, hash, verification outcome |
| `PaymentQuote` | Frozen expected amount for verification |
| `DiscordLink` | Connection + Discord snowflake |
| `DiscordRoleAssignment` | Role history |
| `DiscordSyncJob` | Sync attempts / failures |
| `ReferralProfile` | Code, progress, credits |
| `ReferralEvent` | Successful / pending referrals |
| `ReferralRedemption` | Redeem requests |
| `AdminNote` | Control Center notes |
| `MemberActivityEvent` | Ops timeline |

---

## Ownership reminder

One owner per field. Membership is not duplicated inside Subscription or Discord tables as conflicting SoT — those store their own domains and **project** Membership.

Authority: `docs/04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md`.
