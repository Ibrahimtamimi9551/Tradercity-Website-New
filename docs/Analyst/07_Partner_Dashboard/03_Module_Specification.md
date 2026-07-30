# Module Specification

**Version:** 1.1  
**Status:** Active  
**Authority:** `docs/Analyst/07_Partner_Dashboard/`

Each module answers **one business question**. Values are projected from Analyst Management — never recalculated in the UI. See [`08_Module_Ownership.md`](./08_Module_Ownership.md).

---

## Hero — Who am I as a TraderCity Analyst?

Inspire confidence (not stats dump).

| Field | Notes |
|-------|--------|
| Welcome message | Partnership-forward copy |
| Analyst name | Management profile |
| Partnership illustration | Visual placeholder / brand art |
| Partner status | Lifecycle from Management |
| Joined date | Partnered date |

---

## Overview — How is my partnership performing?

Summary metrics only.

- Total Referrals  
- Paid Referrals  
- Active Subscribers  
- Current Commission %  
- Current Month Earnings  

---

## Performance Snapshot — How are my referrals converting?

Funnel + monthly comparison per metric:

- Clicks · Registrations · Active Members · Paid Members · Conversion Rate  

Clicks may be placeholder until Contribution Engine.

---

## Referral Growth — How is referral volume trending?

Large soft translucent **area chart** of referral growth over time. No duplicate funnel.

---

## Referral Summary — Which plans are converting?

Privacy-safe plan totals (no member names):

- Monthly / Quarterly / Yearly memberships  
- Total Paid Members  

---

## Commission Milestones — How close am I to the next tier?

Based on **cumulative referral earnings** (Management tier bands):

| Milestone | Cumulative earnings | Commission |
|-----------|--------------------:|-----------:|
| Bronze Analyst | &lt; $1,000 | 40% |
| Silver Analyst | $1,000 – $3,000 | 50% |
| Gold Analyst | $3,000 – $10,000 | 60% |
| Diamond Analyst | &gt; $10,000 | 70% |

Per row: milestone · required earnings · current cumulative · current % · current month earnings · progress to next.  
Helper message explains next unlock.

Band thresholds must match Management `ANALYST_COMMISSION_TIER_BANDS` (not invent new numbers).

---

## Commission Overview — How much have I earned?

Cards: This Month · Previous Month · Lifetime  

Below: **Monthly Commission Growth** area chart.  

**Expandable Commission Breakdown** (same module): plan counts × USDT totals · grand total. No member names.

---

## Payout Center — How do I receive my earnings?

- Available for payout  
- Status (Ready for Request / Already Requested)  
- Payment method fixed: USDT · BNB Smart Chain (BEP-20)  
- Wallet card + Edit Wallet  
- Request button: disabled outside last week of month; active in payout window  

Eligibility / window flags are **projected** — UI does not invent payout engines.

---

## Request Status — Where is my payout request?

Timeline: Submitted → Under Review (amount · 1–3 business days) → Paid  

**Expandable Invoice:** plan earnings · total · wallet · request date · tx hash (after paid).

---

## Recent Payouts — What were my recent payouts?

Latest **2** payouts. Expandable “View Full History” (not a large table).

---

## Help & Support — Where do I get assistance?

- Commission Policy  
- Payout FAQ  
- Discord Support (Message Admin)  
- Email Support (`analyst@tradercity.com`)  
