# Analyst Commission Module Architecture

**Version:** 1.3  
**Status:** Active — Stage 1 Wave F (mock-first · operational UX)  
**Authority:** `docs/Analyst/03_Frontend/`  
**Route:** `/admin/analysts/commissions`  
**Nav placement:** First-class Analysts sidebar domain  
**Roadmap:** [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)  
**Report:** [`../06_Implementation/ANALYST_COMMISSION_IMPLEMENTATION.md`](../06_Implementation/ANALYST_COMMISSION_IMPLEMENTATION.md)  
**Admin ops summary:** [`../04_Admin/COMMISSION_MANAGEMENT.md`](../04_Admin/COMMISSION_MANAGEMENT.md)

---

## 1. Purpose

Commission is the **Financial Operations** domain of the Analyst Platform.

It is responsible for tracking, managing, and auditing analyst commissions generated through successful referral conversions — and for recording real-world **manual crypto payouts**.

This domain is **not** an “Earnings Dashboard.”  
It is the operational ledger and payout workspace that defines **trust** between TraderCity and its analysts.

---

## 2. Business philosophy

### Commission is not independent

Commission is the **financial outcome** of the Referral domain.

| Domain | Owns |
|--------|------|
| **Referrals** | Referral Identity · Performance · Conversions · Plan attribution counts |
| **Commission** | Earnings · Ready for Payment / Paid · Due Amount carry-forward · Payout lifecycle · Financial audit · Wallet · Blockchain settlement |

**Never duplicate referral logic inside Commission.**  
Commission **consumes** Referral performance (identity link, successful conversions, plan breakdown counts) and stores **financial amounts and payout state** that NestJS will own later.

```text
Referral → Successful Conversion → Commission Generated
  → Ready for Payment → Paid → History
```

Unpaid prior-cycle amounts carry forward as **Due Amount** (never deleted/reset).  
**Payment Approval** is an optional Super Admin acknowledgement — not a commission lifecycle state.

### Frontend never calculates commission

The Admin UI **renders backend results**. Mock data uses pre-baked financial values that represent NestJS output. Do not derive USD amounts from referral counts in UI code for production contracts.

---

## 3. Left navigation

```text
Commission
```

### Internal views

```text
Commission
├── Dashboard   ← operational center (full audit for one analyst)
├── Directory   ← roster + slim inspector
├── Payouts     ← search → one payout card
└── History
```

| View | Role |
|------|------|
| **Dashboard** | Program KPIs **or** full analyst workspace (when `?commission=` set) |
| **Directory** | Roster + concise identity / billing / payment summary inspector |
| **Payouts** | Search/filter → select one analyst → single payout execution card |
| **History** | Permanent payout ledger across analysts |

**Hierarchy rule:** Directory inspector answers “Who is this analyst?”  
Dashboard workspace answers “How do we audit and settle this analyst’s commissions?”

---

## 4. Commission lifecycle

Commission itself does **not** live in accounting states (Pending / Approved).  
Business flow:

```text
Monthly Billing Cycle
  → Business Generated
  → Commission Generated
  → Ready for Payment
  → Paid
```

| State | Operational meaning |
|-------|---------------------|
| **Ready for Payment** | Generated; payable after the billing cycle ends |
| **Paid** | Settled via manual crypto transfer; recorded with tx hash |
| **Overdue** (profile) | Prior-cycle unpaid amount carried as Due Amount |

**Payment Approval** = optional Super Admin acknowledgement that a payout request was reviewed. It must not dominate the UI.

### Due Amount carry-forward

If last month’s commission is unpaid when the next cycle begins, keep it as **Outstanding Due**. Current commission + due = **Total Payable**.

Optional future states (**do not implement now**): On Hold · Cancelled · Reversed.

---

## 5. Manual crypto payout workflow

Payouts are **not** processed automatically by TraderCity.

The Super Admin manually transfers funds from their crypto wallet.

| Field | Current support |
|-------|-----------------|
| Network | **BNB Smart Chain (BSC / BEP-20)** |
| Token | **USDT** |

### Operational flow

```text
Search Analyst → Select → Review Commission
  → Copy wallet → Send USDT
  → Paste transaction hash
  → (Optional) Upload payment evidence
  → Internal notes → Mark Paid
```

The platform manages the **operational record**.  
The blockchain performs the **payment**.  
Evidence (screenshot / receipt) is optional at payment time; architecture stores it for later Analyst Dashboard history.

---

## 6. Revenue split visibility

Every payout displays three values:

```text
Gross Commission
        ↓
TraderCity Share
        ↓
Analyst Share
```

Example: Gross $1,000 → TraderCity $400 → Analyst $600.

---

## 7. Referral credit model (gross commission)

Successful referrals generate **fixed credits** (TraderCity referral credit model):

| Membership plan | Credit per successful referral |
|-----------------|-------------------------------:|
| Monthly | **$10** |
| Quarterly | **$30** |
| Yearly | **$60** |

**Lifetime is not credited** in Commission. Ignore Lifetime referral counts for financial math.

### Commission Breakdown (display)

Explain **how** the total was reached — not only the total:

```text
Monthly Plan
12 Successful Referrals
12 × $10
Total Credit $120
```

Constants: `ANALYST_REFERRAL_CREDIT_USD` in `src/types/analysts/commissions.ts`.

---

## 8. Commission percentage (tier bands)

The analyst’s revenue share is a **function of monthly business** in the current billing cycle.  
Do **not** manually edit the percentage.

| Monthly Business Generated | Analyst Share |
|---------------------------:|--------------:|
| Less than $1,000 | **40%** |
| $1,000 – $2,999 | **50%** |
| $3,000 – $9,999 | **60%** |
| $10,000 or more | **70%** |

TraderCity share = `100% − analyst share`.

### UI display

```text
Monthly Business → Commission Tier → Analyst Share → TraderCity Share
```

**Next Tier** progress (`Need $X More`) belongs on the future **Analyst Dashboard** — not Admin.

---

## 9. Workspaces

### 9.1 Dashboard

Operational cards (no BI charts):

* Total Analysts  
* Analysts Ready for Payment  
* Total Commission Generated  
* Total Amount to Pay  
* Outstanding Due  
* Paid Commission  

### 9.2 Directory

Primary operational roster.

| Column | Notes |
|--------|-------|
| Analyst | Identity |
| Monthly Business | Current-cycle business |
| Current Tier | Auto % from business |
| Gross Commission | Current-cycle gross |
| Analyst Share | Amount payable (current) |
| Due Amount | Prior-cycle unpaid |
| Last Payment | Date or — |
| Status | Ready / Overdue / Paid / None |

Clicking an analyst opens the slim inspector; full audit is on Dashboard.

### 9.3 Dashboard workspace (selected analyst)

When `?commission={id}` is set, Dashboard becomes the full operational audit:

1. Identity Summary · Billing Cycle (merged share %) · Commission Summary  
2. Commission Breakdown (`N × $credit`)  
3. **Referral Commission Records** (table + filters · Open Member)  
4. Commission Timeline  
5. Payment Details (wallet · hash · evidence · notes) — **bottom**

### 9.4 Payouts

Monthly payment workspace:

```text
Search → Filter (Ready / Overdue / Paid / This Month)
  → Select one analyst → Single payout card
  → Copy wallet → Pay USDT → Paste hash
  → (Optional) Upload evidence → Notes → Mark Paid
```

Summary cards: Analysts Ready for Payment · Total Commission Generated · Total Amount to Pay.

### 9.5 History

Permanent financial ledger. Column order follows the financial story:

| Payout Date | Analyst | Gross Business | Referrals | Analyst Share | TraderCity Share | Status | Transaction Hash | Wallet |

Once recorded, payouts are **never deleted**. Corrections create **additional records**.

---

## 10. Directory inspector (slim)

Answers only: **Who is this analyst?** (concise operational summary).  
Visual family matches Referral / Discord profile panels (section rhythm · metric blocks · shared `Timeline`).

### Identity

* Analyst · Partnership Status · Referral Status · Commission Status  

### Billing Cycle

Financial summary blocks (not a flat label list):

* Billing Cycle · Monthly Business · Current Tier · Analyst Share % · TraderCity Share %  

(No progress bar / Need / Next Tier — those belong on Analyst Dashboard.)

### Payment Summary

* Current Billing Cycle · Gross Commission Generated · Analyst Amount Payable (hero) · Outstanding Due (if any) · Next Payout Date  

### Commission Timeline

Shared admin `Timeline` component (same as Discord audit). Operational events only — below Payment Summary.

CTA footer: **Open Commission Dashboard →** (full workspace).

---

## 10b. Dashboard workspace (full audit)

All detailed financial sections live here — not in the Directory inspector.

See §9.3. Referral Commission Records table is the primary audit trail for referral-generated commissions.

### Payment evidence

Supported on payout completion (optional):

* Exchange screenshot · Wallet confirmation · Payment receipt · Internal notes  

Stored on payout record for later Analyst Dashboard payout history.

### Dispute support (future)

Do **not** build disputes now. Structure payout + commission records so a future module can reference:

* Commission Record · Payout Record · Tx Hash · Evidence · Internal Notes  

---

## 11. Domain ownership

```text
Referrals domain
  └── successfulReferrals, planBreakdown (counts), identity, status

Commission domain
  └── amounts, Ready/Paid, Due Amount, payouts, wallet, tx hash, timeline, tier %
```

| Concern | Owner |
|---------|-------|
| Referral code / link / conversions | Referrals |
| Gross / payable / due / paid USD | Commission |
| Tier % from monthly business | Commission (NestJS calc later) |
| Wallet address / network | Commission (analyst-provided later via partner dashboard) |
| Blockchain tx hash · evidence | Commission |
| Partner dashboard reflection | Consumes Commission — no duplicate store |

---

## 12. Analyst Profile integration

### Control Center — Commissions tab

Concise summary: Total Earned · Amount Payable · Outstanding Due · Last Payment · Commission Status · link to Commission Dashboard.

### Control Center — Overview card

Commission module card reflects live summary (no “Wave F” placeholder).

### Directory Inspector

Optional concise Commission Summary beside Referral Summary.

Detailed financial ops remain in `/admin/analysts/commissions`.

---

## 13. Analyst Dashboard synchronization (future)

Everything the Super Admin records must later appear on the partner Analyst Dashboard:

* Commission Earned · Status · Payment Date · Amount Paid · Tx Hash  

No duplicate data — partner UI **reflects** Commission domain ownership.

---

## 14. Source ownership

```text
src/types/analysts/commissions.ts
src/lib/analysts/mock/commissions.ts
src/lib/analysts/mock/commissions-mutations.ts
src/lib/analysts/hooks/useAnalystCommissions.ts
src/lib/analysts/format-commissions.ts
src/components/analysts/sections/commissions/**
src/app/admin/analysts/commissions/**
(+ nav-config · Control Center · Directory Inspector · docs/Analyst/**)
```

---

## 15. URL contract

```text
/admin/analysts/commissions
/admin/analysts/commissions?commission=acom-a-002          ← Dashboard workspace
/admin/analysts/commissions?view=directory&status=pending
/admin/analysts/commissions?view=directory&commission=acom-a-002  ← slim inspector
/admin/analysts/commissions?view=payouts
/admin/analysts/commissions?view=history
/admin/analysts/commissions/acom-a-002                     ← mobile/deep workspace
/admin/analysts/{id}?tab=commissions
/admin/members/{memberId}                                 ← Open Member
```

---

## 16. Dashboard data contract

```ts
{
  totalAnalysts: number;
  pendingCommissionUsd: number;
  approvedCommissionUsd: number;
  paidCommissionUsd: number;
  totalCommissionGeneratedUsd: number;
  upcomingPayoutsCount: number;
}
```

Amounts are **backend-owned decimals** (mock uses USD numbers). Frontend formats for display only.

---

## 17. Backend philosophy (NestJS later)

NestJS owns:

* Commission calculation from conversions  
* Referral → commission line mapping  
* Monthly cumulative business → tier %  
* Revenue split (Gross / TC / Analyst)  
* Payout generation and status transitions  
* Transaction hash recording  
* Append-only ledger (no delete of financial history)  
* Events for partner dashboard sync  

Frontend:

* Renders results  
* Supports manual ops actions (copy wallet, paste tx hash, mark paid) as Admin mutations  

See [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md) § Commission.

---

## 18. Mock scenarios

| Scenario | Intent |
|----------|--------|
| No earnings | Commission identity exists; all zeros |
| Ready for Payment | Current-cycle unpaid · wallet on file |
| Overdue due | Prior-cycle unpaid carried as Due Amount |
| Paid commissions | Completed with tx hash |
| Multiple payout cycles | History depth |
| Mixed plan earnings | Monthly / Quarterly / Yearly (no Lifetime) |
| Large historical earnings | High-volume partner |
| Missing wallet | Cannot complete payout until address present |

---

## 19. Implementation status

| Capability | Status |
|------------|--------|
| First-class Commission nav | ✅ Wave F |
| Dashboard · Directory · Payouts · History | ✅ |
| Slim Directory inspector + full Dashboard workspace | ✅ |
| Ready/Paid lifecycle + Due Amount carry-forward | ✅ |
| Referral credit model ($10 / $30 / $60 · no Lifetime) | ✅ |
| Referral Commission Records + filters + Open Member | ✅ |
| Operational Directory columns + Payment Summary | ✅ |
| Search-first payouts + optional payment evidence | ✅ |
| Billing Cycle summary (Admin — no Next Tier progress) | ✅ |
| Copy actions (wallet · tx · referral code/link) | ✅ |
| Manual USDT BEP-20 payout workflow (mock) | ✅ |
| Control Center / Directory summary | ✅ |
| NestJS calculation / real chain | ❌ Deferred |
| Editable wallet forms | ❌ Deferred |
| Dispute module | ❌ Deferred |
| Partner Analyst Dashboard sync UI | ❌ After Stage 1 docs phase |

---

## Related

* Referrals (upstream): [`REFERRALS_MODULE_ARCHITECTURE.md`](./REFERRALS_MODULE_ARCHITECTURE.md)  
* Admin workflow: [`../04_Admin/COMMISSION_MANAGEMENT.md`](../04_Admin/COMMISSION_MANAGEMENT.md)  
* Commission report: [`../06_Implementation/ANALYST_COMMISSION_IMPLEMENTATION.md`](../06_Implementation/ANALYST_COMMISSION_IMPLEMENTATION.md)  
* Control Center: [`CONTROL_CENTER_ARCHITECTURE.md`](./CONTROL_CENTER_ARCHITECTURE.md)
