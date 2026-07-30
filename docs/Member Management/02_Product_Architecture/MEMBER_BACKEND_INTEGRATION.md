# Member Backend Integration Posture

**Version:** 1.0  
**Status:** Draft  
**Authority:** `docs/Member Management/02_Product_Architecture/`  
**Last Updated:** July 28, 2026

---

## Current state

| Layer | Status |
|-------|--------|
| Admin UI (Phases 0–3, 5–6) | Shipped on typed mocks |
| Subscriptions UI (Phase 4) | Placeholder route only |
| NestJS Admin APIs | **Not started** |
| Hook integration | `TODO(NestJS)` comments |

Delivery mode: **mock-first frontend**. Backend developers should treat UI types + [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md) as the integration contract — not invent endpoints from screenshots alone.

---

## Frontend must / must not

| Do | Do not |
|----|--------|
| Display, validate input, navigate, trigger actions | Own verification algorithms or chain polling |
| Keep typed mocks until NestJS ready | Persist Admin state in `localStorage` |
| Stub hooks with TODO comments | Invent Prisma models / Nest controllers in this repo without task |
| Display System Health from API | Derive production health rules client-side |

---

## Hook replacement strategy

| Hook | Mock source | Replace with |
|------|-------------|--------------|
| `useMembersDirectory` | `mock/directory-members.ts` | `GET` members directory API |
| `useMemberProfile` | `mock/profile-members.ts` | `GET /admin/members/:id` aggregate |
| `useDiscordDirectory` | `mock/discord-members.ts` | Discord sync list/detail APIs |
| `useReferralsDirectory` | `mock/referral-members.ts` | Referrals list/detail APIs |
| Referral intelligence page | `mock/referral-intelligence.ts` | Intelligence endpoints |
| Dashboard widgets | Inline mock values in components | Dashboard aggregate API |
| Subscriptions (future) | — | Subscriptions queue APIs |

**Pattern:** Keep hook signatures stable; swap mock imports for `fetch` / client SDK. Preserve URL filter contracts already used by widgets.

---

## Assumed stack (documented expectations)

- NestJS modular monolith + DDD  
- Prisma + PostgreSQL  
- JWT + refresh + RBAC (Admin role for `/admin/**`)  
- Stripe + Crypto (USDT BEP20)  
- Discord Integration Service  
- Roles: Guest, Free, VIP, Analyst, Admin  

Do not treat this list as implemented.

---

## Integration TODOs (frontend-facing)

1. Wire Directory list + stats  
2. Wire Control Center aggregate + notes write  
3. Build + wire Subscriptions UI (Phase 4) then **Approve/Reject** mutations (Membership only on Approve)  
4. Honor `awaiting_admin_approval` Dashboard / filter contracts  
5. Wire Discord list, detail, sync actions  
6. Wire Referrals ops + redeem + intelligence  
7. Wire Dashboard aggregates to replace hardcoded widget numbers  
8. Ensure Membership writers update projections only after Admin Approve (or Referral redeem / manual grant)  

Canonical payment policy: [`SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](./SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md).  
Detailed paths: [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md).
