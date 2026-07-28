# Member Management — Events and Webhooks

**Version:** 1.1  
**Status:** Planned  
**Authority:** `docs/Member Management/05_Backend/`  
**Last Updated:** July 29, 2026

---

## Purpose

Domain events that keep Directory health, Control Center projections, Dashboard queues, and Discord sync consistent.

---

## Reserved event families

| Event | Typical consumers |
|-------|-------------------|
| `member.registered` | Directory · Activity |
| `payment.submitted` | Subscriptions queue · Activity |
| `payment.verifying` | Subscriptions · member Verification UI |
| `payment.verified` | Ticket → **Awaiting Admin Approval** · Activity (**not** Membership writer) |
| `payment.verification_failed` | Verification Required queue · Activity |
| `payment.approved` / `payment.rejected` | Membership writer (on approve) · Dashboard · Activity · Audit |
| `membership.activated` / `membership.renewed` / `membership.expired` | Directory · Profile · Discord sync request |
| `discord.sync_requested` / `discord.sync_failed` / `discord.synced` | Discord module · Profile |
| `referral.progress_updated` | Referrals · Profile |
| `referral.redeemed` | Membership extend · Activity |
| `admin.note_created` | Profile notes / Activity |

---

## Webhooks (external)

| Source | Use |
|--------|-----|
| Payment provider / chain watcher | Verification pipeline (backend) |
| Discord API | Connection / member-left signals |

Frontend does not consume raw webhooks — Admin reads materialized ticket / sync state.
