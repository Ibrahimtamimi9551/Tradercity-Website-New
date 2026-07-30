# Member Business Model

**Version:** 1.0  
**Status:** Active  
**Authority:** `docs/Member Management/01_Product_Vision/`  
**Last Updated:** July 28, 2026

---

## Purpose

Explain how Member Management relates to TraderCity’s commercial model — membership access, payments, Discord community roles, and referral credits — without inventing pricing or backend algorithms beyond what the frontend and shared architecture docs already assume.

---

## Value chain

```text
Visitor
  → Register (Identity)
  → Free Member
  → Payment Quote + Crypto / Stripe submission
  → Subscription verification (Admin ticket when needed)
  → Membership activation (VIP / access SoT)
  → Discord role sync
  → Learning + community
  → Referral credits → redeem → Membership extension
```

TraderCity provides infrastructure. Members consume knowledge. Analysts (separate platform) create knowledge.

---

## Membership vs Subscription

| Concept | Owns | Admin surface |
|---------|------|---------------|
| **Membership** | Access: plan, VIP status, activation/expiry, days remaining, renewals | **Not** a sidebar page — reflected on Control Center + Directory |
| **Subscription** | Payments: hash, wallet, verification ticket, amount, dispute | `/admin/subscriptions` (Phase 4 — currently placeholder) |

> Subscriptions own **payments**, not Membership state.  
> Approving a payment **writes** Membership via backend orchestration.

---

## Catalog pricing (frontend reference)

Member-facing catalog lives outside Admin UI (do not import marketing components into Admin). Documented Admin expectations:

| Plan | Typical display (marketing) | Duration |
|------|----------------------------|----------|
| Monthly | First-offer / list price variants exist in marketing mocks | ~30 days |
| Quarterly | List price in marketing | ~90 days |
| Yearly | List price in marketing | ~365 days |

Backend NestJS contracts may differ from marketing display prices. Document mismatches; do not silently reconcile in Admin UI. See historical notes in `docs/AI/Agents/Admin/04_Development_Rules.md` and pricing architecture in `docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md`.

---

## Payment verification (product rules)

1. Member receives a **Payment Quote** (frozen expected amount).  
2. Verification Engine compares received amount to **quote**, never live re-price.  
3. **Verification** (system) and **Approval** (Admin) are separate stages.  
4. Successful automatic verification → **Approval Pending** — Membership is **not** activated yet.  
5. Admin reviews TX (explorer) → **Approve / Reject**.  
6. **Only after Approve:** Membership activates → Discord sync → Audit.  
7. Admin display states: Blockchain Verifying · Approval Pending · Verification Required · Rejected · Approved.

Canonical: [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md).

Verification algorithms are **backend-owned**. Frontend displays ticket state.

---

## Referral economics (product rules)

Documented product intent used by Admin Referrals UI mocks:

- Credit per successful referral (e.g. $10 display in mocks)  
- Progress target toward redeem (e.g. 6 successful referrals)  
- Redeem approval can **extend Membership** (writer → Membership domain)

Exact business numbers are product-owned; Admin UI must display backend-provided amounts.

---

## Discord role model

TraderCity Membership is the source of truth for **access**. Discord **mirrors** roles (VIP / public / etc.). Sync failures create Discord module tickets — they do not redefine Membership.

---

## Related

- Lifecycle: [`MEMBER_USER_LIFECYCLE.md`](./MEMBER_USER_LIFECYCLE.md)  
- Ownership: [`../02_Product_Architecture/MEMBER_DOMAIN_MODEL.md`](../02_Product_Architecture/MEMBER_DOMAIN_MODEL.md)  
- Shared SoT: `docs/04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md`
