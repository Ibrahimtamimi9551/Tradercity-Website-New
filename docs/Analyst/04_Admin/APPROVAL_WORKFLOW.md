# Approval Workflow

**Version:** 0.2  
**Status:** Draft  
**Authority:** `docs/Analyst/04_Admin/`  
**Last Updated:** July 23, 2026

---

## Pipeline

```text
Under Review (Application evaluation)
  → Eligible for Partnership / Approved for Verification
  → Verification (stage evaluation)
  → Partnership Discussion (stage evaluation)
  → Approved (Analyst record created; not active)
  → Partnership Agreement (stage evaluation / acceptance)
  → Onboarding (stage evaluation + education + wallet)
  → Active Analyst
  → Assign Analyst Discord Role
```

---

## Stage-based evaluation

Each lifecycle stage has **independent** approval / evaluation — not a single global Approve.

```text
Application     ★★★★☆
Verification    ★★★★★
Partnership     ★★★★☆
Agreement       Pending
Onboarding      ★★★☆☆
```

### Per-stage record

| Field | Meaning |
|-------|---------|
| Rating | Stage quality / readiness score |
| Notes | Reviewer narrative |
| Decision | Advance / Hold / Reject / Need Info |
| Reviewer | Admin identity |
| Date | Timestamp |

This produces complete operational history across the partnership pipeline.

Application **category** evaluations feed the Application stage; later stages may use stage-level scorecards (and optional category subsets when product requires).

---

## Verification goals

Confirm identity interest, availability, intentions, professional behaviour.  
Text channels; not KYC; no mandatory video.

## Partnership Discussion topics

Content style · publishing expectations · research schedule · community behaviour · communication · long-term goals · revenue expectations · TraderCity support

Rename mindset: this is **not** an employment interview.

---

## Discord after onboarding

```text
Onboarding Complete → Assign Analyst Role
```

Shared Discord infrastructure — see [`../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md`](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md).

---

## Suspension path

Owned by Control Center Administration:  
[`PARTNERSHIP_ADMINISTRATION.md`](./PARTNERSHIP_ADMINISTRATION.md) · [`../01_Product_Vision/ANALYST_USER_LIFECYCLE.md`](../01_Product_Vision/ANALYST_USER_LIFECYCLE.md).

---

## UI status

Application → Verification → Evaluation lives in **Applications Review Queue** (Stage 1 Wave B).  
Legacy Verification + Partnerships routes are transitional shells to fold.  
Application structured evaluation UI not started.

Canonical sequence: [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md).
