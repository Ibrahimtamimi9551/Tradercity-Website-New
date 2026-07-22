# Analyst Applications Module Architecture

**Version:** 1.0  
**Status:** Planned — next major workflow after Directory / alongside Control Center sequence  
**Authority:** `docs/Analyst/03_Frontend/`  
**Route:** `/admin/analysts/applications`  
**Review process:** [`../04_Admin/APPLICATION_REVIEW_PROCESS.md`](../04_Admin/APPLICATION_REVIEW_PROCESS.md)

---

## 1. Purpose

Operational intake for partnership applications.

Answers:

> Which applications need review, what is their evaluation state, and what does the full application contain?

Not a binary Approve/Reject screen — structured evaluation drives progression.

---

## 2. Interaction model

Mirrors Directory pattern with a **wider** viewer:

```text
Desktop
  Applications Table  |  Application Viewer (wider)

Mobile
  Applications Table
        ↓
  Dedicated Application page
```

| Layer | Surface |
|-------|---------|
| Layer 1 | Applications table (summary only) |
| Layer 2 | Application Viewer (complete application + evaluation) |
| Layer 3 | Application Detail *(future, if needed beyond viewer)* |

See [`OPERATIONAL_UX_PATTERN.md`](./OPERATIONAL_UX_PATTERN.md).

---

## 3. Applications table (summary columns)

Do **not** overload the table.

| Column | Meaning |
|--------|---------|
| Name | Applicant identity |
| Applied Date | Submission timestamp |
| Specialization | Focus area |
| Experience | Experience summary signal |
| Overall Score | Aggregate evaluation score |
| Status | Queue status (Pending, Need More Info, …) |

---

## 4. Application Viewer

Renders the **complete** application, including:

- Identity  
- Experience  
- Education  
- Specialization  
- Research  
- Trading Style  
- Community Size  
- Portfolio  
- Images  
- Uploaded Files  
- Website · TradingView · Telegram · Twitter · Discord · YouTube  

**Links:** clickable · open externally in a new browser tab (`target="_blank"` + `rel="noopener noreferrer"`).

Viewer also hosts the **structured evaluation UI** (category ratings + notes + overall score).  
Detail: [`../04_Admin/APPLICATION_REVIEW_PROCESS.md`](../04_Admin/APPLICATION_REVIEW_PROCESS.md).

---

## 5. Layout notes

- Desktop: master-detail; give Viewer **more width** than Directory Inspector  
- Mobile: navigate to a dedicated application route (e.g. `/admin/analysts/applications/[id]`)  
- Inherit Admin design freeze  

---

## 6. Source ownership (planned)

```text
src/app/admin/analysts/applications/page.tsx
src/app/admin/analysts/applications/[id]/page.tsx   # mobile / deep detail
src/components/analysts/sections/applications/
src/lib/analysts/mock/applications.ts
src/lib/analysts/hooks/useAnalystApplications.ts
src/types/analysts/applications.ts
```

---

## 7. Implementation status

| Capability | Status |
|------------|--------|
| Shell route | Exists (`ModulePlaceholder`) |
| Table + Viewer | Not started |
| Structured evaluation UI | Not started |
| Mobile dedicated page | Not started |

---

## Related

- Admin review process: [`../04_Admin/APPLICATION_REVIEW_PROCESS.md`](../04_Admin/APPLICATION_REVIEW_PROCESS.md)  
- Approval / stage evaluation: [`../04_Admin/APPROVAL_WORKFLOW.md`](../04_Admin/APPROVAL_WORKFLOW.md)  
- Phase plan: [`../06_Implementation/PHASE_04.md`](../06_Implementation/PHASE_04.md)
