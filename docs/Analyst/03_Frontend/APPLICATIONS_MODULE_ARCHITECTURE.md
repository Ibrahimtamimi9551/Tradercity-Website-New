# Analyst Applications Module Architecture

**Version:** 2.2  
**Status:** Active — Stage 1 Wave B **shipped (mock)** · refined 2026-07-24  
**Authority:** `docs/Analyst/03_Frontend/`  
**Route:** `/admin/analysts/applications`  
**Nav:** First-class domain — **Applications** (single sidebar item)  
**Review process:** [`../04_Admin/APPLICATION_REVIEW_PROCESS.md`](../04_Admin/APPLICATION_REVIEW_PROCESS.md)  
**Roadmap:** [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)  
**Implementation report:** [`../06_Implementation/PHASE_05_WAVE_B_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_B_IMPLEMENTATION.md)

---

## 1. Purpose

Complete operational domain for partnership **intake and verification** — not only an application list.

Answers:

> Which applications need attention, where are they in the review pipeline, and can I verify + evaluate + decide without leaving this workflow?

**Application** and **Verification** are the same business workflow. They must not be separate navigation sections.

```text
Application → Verification → Evaluation → Decision
        ↓ (Approve)
Create Analyst Identity
→ Directory · Control Center · Discord · Referral reserved
→ Ready for Onboarding
```

One operational pipeline for intake. After Approve, Applications only record how the partner entered — operational domains own the analyst.

**Applications = intake history. Control Center / Discord / Referrals = active partnership ops.** Do not merge these surfaces.

---

## 2. Domain IA

### Left navigation

```text
Applications
```

### Internal views

```text
Applications
├── Application Dashboard
├── Review Queue / Verification
├── Application Intelligence (future — Stage 2)
└── Archive
```

| View | Role |
|------|------|
| Application Dashboard | Queue health: New · Under Review · Pending Information · Approved · Rejected |
| Review Queue | Table + Application Viewer — verification, evaluation, notes, decisions |
| Application Intelligence | Future Stage 2 analytics inside this domain |
| Archive | Historical applications |

**Legacy:** `/admin/analysts/verification` and Partnership interview shells fold into **Review Queue** (do not keep as permanent sibling nav items).

---

## 3. Interaction model

Mirrors Directory pattern with a **wider** viewer; stays inside the Applications domain:

```text
Desktop
  Review Queue Table  |  Application Viewer (wider)

Mobile
  Review Queue
        ↓
  Dedicated Application page
```

| Layer | Surface |
|-------|---------|
| Layer 1 | Application Dashboard / Review Queue |
| Layer 2 | Application Viewer (complete application + verification + evaluation) |
| Layer 3 | Application Detail *(future, if needed beyond viewer)* · or Control Center after Approved |

See [`OPERATIONAL_UX_PATTERN.md`](./OPERATIONAL_UX_PATTERN.md).

---

## 4. Application Dashboard

Status boards / filters (mock-first):

- New Applications  
- Under Review  
- Pending Information  
- Approved  
- Rejected  

Dashboard deep-links into Review Queue with the matching status filter.

---

## 5. Review Queue

### Table (summary columns only)

Do **not** overload the table.

| Column | Meaning |
|--------|---------|
| Name | Analyst name + X handle |
| Applied Date | Submission timestamp |
| Primary Market | Form markets (Crypto / Forex / …) |
| Experience | Years of experience |
| Overall Score | Aggregate evaluation score |
| Status | Queue status |

### Application record (form-aligned)

Structured around the public Analyst Application Form:

| Section | Fields (product) |
|---------|------------------|
| 01 Analyst Profile | Name · Short bio · Years of experience · Primary market(s) · X handle · Discord (optional) · Email (ops) |
| 02 Trading Background | Trading duration · Primary style · Public track record · Website |
| 03 Audience & Community | Primary platform · Audience size · Social links (≥2) · Website |
| 04 Content & Application | Best analysis · Best education · Motivation |

### Application Viewer (pipeline workspace)

**Application tab** — complete form record (all four sections). Links open externally.

**Evaluation tab (Evaluation Workspace)**

| Zone | Content |
|------|---------|
| Top | Read-only summary: profile · trading · audience · content highlights |
| Bottom | Category ratings · notes · overall score |

Reviewers should not need to thrash between Application and Evaluation tabs to score.

| Capability | Notes |
|------------|-------|
| Verification | Identity/intent authenticity (not KYC) |
| Evaluation | 10 categories + overall /100 |
| Notes | Internal + interview notes |
| Approve | **Partnership activation** — Analyst identity · Directory · Discord · Referral reserved · Ready for Onboarding |
| Reject | Archive · store decision reason |
| Request Information | Pending Information · resume later |

**Handoff:** Approve does **not** turn the Application Viewer into a Control Center. It creates operational records (Directory · Discord · referral reserved). Applications remain the intake history. Wave C Discord domain continues the lifecycle.

Category evaluation detail: [`../04_Admin/APPLICATION_REVIEW_PROCESS.md`](../04_Admin/APPLICATION_REVIEW_PROCESS.md).  
Stage records: [`../04_Admin/APPROVAL_WORKFLOW.md`](../04_Admin/APPROVAL_WORKFLOW.md).

---

## 6. Layout notes

- Desktop: master-detail; give Viewer **more width** than Directory Inspector  
- Mobile: navigate to `/admin/analysts/applications/[id]`  
- Inherit Admin design freeze  
- Do not bounce operators to a separate Verification nav item  

---

## 7. Source ownership

```text
src/app/admin/analysts/applications/page.tsx
src/app/admin/analysts/applications/[id]/page.tsx   # mobile / deep detail
src/components/analysts/sections/applications/
src/lib/analysts/mock/applications.ts
src/lib/analysts/hooks/useAnalystApplications.ts
src/types/analysts/applications.ts
```

Internal view routing uses query params:

```text
?view=dashboard|queue|archive
?status=new|under_review|pending_information|approved|rejected
?application=<id>
?tab=application|verification|evaluation|notes|decision
```

---

## 8. Implementation status

| Capability | Status |
|------------|--------|
| Shell route | Replaced — domain shipped |
| Domain IA (Dashboard / Queue / Archive) | **Shipped (mock)** |
| Table + Viewer + verification pipeline | **Shipped (mock)** |
| Structured evaluation UI | **Shipped** — Evaluation Workspace (summary + scorecard) |
| Fold Verification nav | **Done** (removed + redirect) |
| Mobile dedicated page | **Shipped** |
| Partnership handoff on Approve | **Shipped (mock)** — Wave C activation (Directory · Discord · referral reserved) |
| Application Intelligence | Stage 2 — do not stub |

---

## Related

- Admin review process: [`../04_Admin/APPLICATION_REVIEW_PROCESS.md`](../04_Admin/APPLICATION_REVIEW_PROCESS.md)  
- Approval / stage evaluation: [`../04_Admin/APPROVAL_WORKFLOW.md`](../04_Admin/APPROVAL_WORKFLOW.md)  
- Roadmap Wave B: [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)
