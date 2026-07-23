# Application Review Process

**Version:** 0.3  
**Status:** Draft (product defined; Admin UI Wave B shipped mock)  
**Authority:** `docs/Analyst/04_Admin/`  
**Frontend layout:** [`../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/APPLICATIONS_MODULE_ARCHITECTURE.md)  
**Last Updated:** July 24, 2026

---

## Purpose

Evaluate partnership potential with **structured evaluation** — not follower count alone, and not a simple Approve / Reject click.

---

## Queue statuses

| Status | Meaning |
|--------|---------|
| Pending | Awaiting evaluation |
| Need More Information | Below threshold or incomplete evidence |
| Rejected | Not eligible |
| Eligible for Partnership / Approved for Verification | Meets score threshold → next stage |

---

## Evaluation categories

Every category receives:

- Rating  
- Notes  
- Reviewer  
- Timestamp  

| Category | Focus |
|----------|-------|
| Identity | Who they are |
| Trading Knowledge | Market skill credibility |
| Research Quality | Research output quality |
| Education Ability | Teaching clarity |
| Communication | Professional behaviour |
| Professionalism | Standards / ethics / reliability |
| Social Presence | Public footprint |
| Community | Audience / community contribution |
| Brand Compatibility | TraderCity fit (**critical**) |
| Long-term Potential | Partnership durability |

### Overall score

Calculated from all categories. Example display: `91 / 100`.

### Threshold (example)

```text
80+
        ↓
Eligible for Partnership

Below threshold
        ↓
Need More Information
        ↓
Rejected
```

Exact threshold is product-configurable; reserve in backend contracts.

Scorecard / ratings are **Admin-only** — never public.

---

## Application Viewer contents

Full application render (links open in new tab):

Identity · Experience · Education · Specialization · Research · Trading Style · Community Size · Portfolio · Images · Uploaded Files · Website · TradingView · Telegram · Twitter · Discord · YouTube

Viewer also hosts the full **Review Queue** pipeline. Evaluation uses an **Evaluation Workspace** (read-only application summary above the scorecard).

Approve creates a mock partnership handoff (analyst identity + Discord prep) for Wave C — not a Control Center session for candidates.

---

## UI status

Route `/admin/analysts/applications` — **Wave B shipped (mock)**: Dashboard · Review Queue · Archive.  
Verification is inside Review Queue (legacy `/admin/analysts/verification` redirects).  
Report: [`../06_Implementation/PHASE_05_WAVE_B_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_B_IMPLEMENTATION.md)

---

## Related

- Lifecycle: [`../01_Product_Vision/ANALYST_USER_LIFECYCLE.md`](../01_Product_Vision/ANALYST_USER_LIFECYCLE.md)  
- Stage evaluations: [`APPROVAL_WORKFLOW.md`](./APPROVAL_WORKFLOW.md)  
- API expectations: [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)
