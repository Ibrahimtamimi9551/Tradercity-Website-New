# Member Management — Integration Points

**Version:** 1.0  
**Status:** Draft  
**Authority:** `docs/Member Management/05_Backend/`  
**Last Updated:** July 28, 2026

---

## Shared infrastructure

| System | Member Management use |
|--------|----------------------|
| Auth / JWT / RBAC | Admin access |
| Membership domain service | Access SoT writes |
| Payments (Stripe + Crypto USDT BEP20) | Subscription tickets |
| Pricing / Quote engine | Verification expected amount |
| Discord Integration Service | Role mirror / invites |
| Referral engine | Credits / redeem |
| Member product dashboards | Read projections (`/dashboard/*`) — separate from Admin UI |

---

## Explicit non-integrations (Admin UI)

| Path | Rule |
|------|------|
| `src/lib/membership/**` | Do not import into Admin components |
| `src/components/home/**` | Homepage freeze — never import |
| `src/components/dashboard/**` | Member product UI — reference data shapes only |

---

## Analyst Platform

Shared Discord infrastructure may exist, but **Member Discord** and **Analyst Discord** are separate Admin domains with different business triggers. See `docs/Analyst/`.

---

## Related shared docs

- `docs/04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md`  
- `docs/04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md`  
- `docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md`
