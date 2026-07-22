# Analyst Integration Points

**Version:** 0.2  
**Status:** Draft  
**Authority:** `docs/Analyst/05_Backend/`  
**Last Updated:** July 23, 2026

---

## Touchpoints (Analyst-owned concern vs shared)

| System | Analyst concern | Shared SoT |
|--------|-----------------|------------|
| Discord | Analyst role assignment trigger + Admin Discord module UI | Shared Discord sync / bot / role enums |
| Payments / USDT rails | Commission payouts | Payment / subscription architecture |
| Membership | Attribution / conversions | Cross-Module Sync / Membership domain |
| Homepage | Merit featuring | Marketing presentation until wired |
| Referrals | Analyst referral attribution | Distinct from Member referral credits |
| Content / Publishing | Reports, research, education queues | Content Platform (future) |

---

## Discord — shared infrastructure rule

```text
Infrastructure: SHARED
Business logic: ANALYST-SPECIFIC
```

| Flow | Trigger | Role |
|------|---------|------|
| Member | Membership Verified | VIP |
| Analyst | Approved → Agreement → Onboarding Complete | Analyst |

No payment. No subscription validation for Analyst role assignment.

UI module: [`../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md`](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md)

---

## Rule

Integrate via explicit contracts. Do not store Membership SoT fields inside Analyst tables without consulting Cross-Module Sync architecture.

---

## Related

- API expectations: [`API_EXPECTATIONS.md`](./API_EXPECTATIONS.md)  
- Ecosystem: [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)
