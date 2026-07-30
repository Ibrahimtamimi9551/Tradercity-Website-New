# Analyst User Lifecycle

**Version:** 1.3  
**Status:** Active  
**Authority:** `docs/Analyst/01_Product_Vision/`  
**Last Updated:** July 26, 2026

Every backend entity, Admin queue, and UI should map to these stages.

**Public apply principle:** Never interrupt the user's intent. Auth during apply returns directly to `/analysts/apply` — not the Member Dashboard. Canonical journey: [`../03_Frontend/APPLICATION_FLOW.md`](../03_Frontend/APPLICATION_FLOW.md).

---

## Stage map

| Stage | Meaning | Typical surface |
|-------|---------|-----------------|
| Visitor | No analyst record | Marketing / community |
| Interested | Considering partnership | Public `/analysts` landing (required before apply) |
| Authenticating for apply | Login/register with `returnUrl=/analysts/apply` | `/login` — then **back to form** |
| Application in progress | Filling evaluation form | Public `/analysts/apply` |
| Application Submitted | Evaluation intake | Confirmation page → Member Dashboard tracking card |
| Under Review | Admin structured evaluation | Admin Applications · member progress projection |
| Verification | Confirm genuine identity/intent (not KYC; text channels) | Admin Applications → Review Queue |
| Partnership Discussion | Mutual fit (not employment interview) | Admin Applications → Review Queue (interview notes) |
| Approved | Partnership activation — Analyst identity · Directory · Discord · Referral reserved | Admin Applications + Discord · Directory · Control Center |
| Partnership Agreement | Commission, standards, ethics, termination | Admin / future e-sign |
| Onboarding | Education + wallet collection | Admin Onboarding / Control Center |
| Active Analyst | Publishing + commissions live · Discord Analyst role assigned | Partner Analyst Dashboard · Discord · Referrals |
| Growing Analyst | Continuous performance; merit featuring | Admin + Homepage (**Stage 2**) |
| Top Partner | Strategic future tier | Future |
| Suspension | Warning → Review → Suspended → Reactivate **or** Closed | Control Center Administration |

---

## Under Review statuses

- Pending  
- Need More Information  
- Rejected  
- Eligible for Partnership / Approved for Verification  

Progression is driven by **structured evaluation**, not a single Approve button.  
See [`../04_Admin/APPLICATION_REVIEW_PROCESS.md`](../04_Admin/APPLICATION_REVIEW_PROCESS.md).

---

## Evaluation dimensions (application categories)

Each category stores **Rating · Notes · Reviewer · Timestamp**.

| Category | Question |
|----------|----------|
| Identity | Can we verify who they are? |
| Trading Knowledge | Do they demonstrate credible market skill? |
| Research Quality | Can they produce valuable research? |
| Education Ability | Can they teach clearly? |
| Communication | Professional behaviour? |
| Professionalism | Standards, ethics, reliability? |
| Social Presence | Credible public footprint? |
| Community | Audience / community contribution potential? |
| Brand Compatibility | Fit with TraderCity philosophy? (**critical**) |
| Long-term Potential | Partnership durability? |

Overall score example: `91 / 100` (Admin-only; never public).

**Threshold example:** `80+` → Eligible for Partnership · Below → Need More Information or Rejected.

---

## Stage-based evaluation

Each lifecycle stage has an **independent** evaluation record:

```text
Application     ★★★★☆
Verification    ★★★★★
Partnership     ★★★★☆
Agreement       Pending
Onboarding      ★★★☆☆
```

Each stage stores: Rating · Notes · Decision · Reviewer · Date.

This builds complete operational history across the partnership pipeline.  
Detail: [`../04_Admin/APPROVAL_WORKFLOW.md`](../04_Admin/APPROVAL_WORKFLOW.md).

---

## Discord access trigger (Analyst)

Discord infrastructure is **shared** with Members. Business trigger differs:

```text
Application Approved
        ↓
Partnership activation (identity · Directory · Discord record · referral reserved)
        ↓
Agreement Accepted (when applicable)
        ↓
Onboarding Complete
        ↓
Assign Analyst Role
```

- No payment  
- No subscription validation  
- Role = **Analyst** (not VIP)  
- Discord **record** is created at Approve; **role assignment** waits for onboarding gate  

**Future edge case:** identity migration when applicant already has Discord / VIP / referral identity — design in final Analyst Management phase only.

See [`../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md`](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md).

---

## Activity Status vs Lifecycle Status

| Concept | Meaning |
|---------|---------|
| **Lifecycle Status** | Where the partner sits in the partnership pipeline |
| **Activity Status** | Communication / engagement health (e.g. Active Today, Quiet, Critical) |

These are independent. Activity Status is **Stage 2** work (roadmap Wave G) and later feeds automated alerts — do not implement during Stage 1 Program waves.

---

## Suspension philosophy

Suspension is recovery-oriented, not instant termination.  
**Business operations live in Control Center Administration** — not in the Directory table.

```text
Warning → Performance Review → Suspended → Reactivated
                                 └→ Partnership Closed
```

Suspend flow (conceptual): Reason → Notes → Duration → Notify Analyst → Remove Discord Role? → Pause Commissions? → Confirm.

On partnership close: freeze dashboard · stop commissions · complete pending payouts · archive history · retain records · remove Discord access as configured.

Full ops: [`../04_Admin/PARTNERSHIP_ADMINISTRATION.md`](../04_Admin/PARTNERSHIP_ADMINISTRATION.md).

---

## Application intake (product fields — future form)

Identity · Experience · Education · Specialization · Research · Trading Style · Community Size · Portfolio · Images · Uploaded Files · Website · TradingView · Telegram · Twitter · Discord · YouTube · Reason for joining  

Wallet info is **not** required at application — collect at onboarding.

### Member-facing progress (after submit)

Projected on Free/VIP Member Dashboard (not Admin scores):

```text
Submitted → Verification → Evaluation → Interview → Decision → Onboarding
```

Card states: **Become an Analyst** (no application) → **Analyst Application · Status · View Progress** (submitted+).

---

## Related

- Vision: [`ANALYST_PRODUCT_VISION.md`](./ANALYST_PRODUCT_VISION.md)  
- Public apply flow: [`../03_Frontend/APPLICATION_FLOW.md`](../03_Frontend/APPLICATION_FLOW.md)  
- Admin approval path: [`../04_Admin/APPROVAL_WORKFLOW.md`](../04_Admin/APPROVAL_WORKFLOW.md)  
- Ecosystem architecture: [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)
