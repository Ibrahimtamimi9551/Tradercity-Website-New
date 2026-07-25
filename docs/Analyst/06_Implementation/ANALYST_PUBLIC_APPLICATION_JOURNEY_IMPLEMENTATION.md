# Analyst Public Application Journey — Functional Mock Shell

**Version:** 1.0  
**Status:** Complete (mock / functional navigation)  
**Date:** July 26, 2026  
**Authority:** `docs/Analyst/06_Implementation/`  
**Architecture:** [`../03_Frontend/APPLICATION_FLOW.md`](../03_Frontend/APPLICATION_FLOW.md)

---

## Governance

| Field | Value |
|-------|--------|
| Roadmap item | Public Analyst Application Journey — Phase 1 Functional Navigation |
| Owning domain | Analyst (+ Homepage teaser · Member dashboard projections) |
| Freeze | Scoped under Analyst Foundation override + explicit PO Phase 1 task |
| Allowed paths | `src/app/analysts/**` · `src/app/dashboard/application/**` · `src/components/analysts/public/**` · `src/components/home/become-analyst/**` · `src/components/dashboard/{free,vip}/**` (card insert) · `src/lib/analysts/mock/**` · `src/lib/analysts/hooks/useMemberAnalystApplication.ts` · `src/types/analysts/member-application.ts` · `docs/Analyst/**` |

---

## What shipped

End-to-end **mock** journey — no NestJS, no real OAuth, no file uploads.

```text
Homepage (#become-analyst)
  → /analysts (landing shell)
  → /analysts/apply (RequireAuth + returnUrl)
  → form submit → createMockApplication
  → /analysts/apply/success
  → /dashboard/free|vip (card state flip)
  → /dashboard/application (tracking)
  → /admin/analysts/applications (queue shows new row)
```

---

## Routes

| Route | Guard | Role |
|-------|-------|------|
| `/analysts` | Public | Landing shell |
| `/analysts/apply` | `RequireAuth` | Application form |
| `/analysts/apply/success` | `RequireAuth` | Confirmation |
| `/dashboard/application` | `RequireAuth` | Member tracking |
| Homepage `#become-analyst` | Public | CTA below Pricing |

---

## Mock wiring

- `createMockApplication` prepends `status: "new"` into Admin store  
- Public apps persisted in `localStorage` (`tc.dev.publicAnalystApplications`)  
- Member ↔ application binding (`tc.dev.memberAnalystApplicationByUser`)  
- `subscribeApplicationStore` refreshes Admin Applications hook + member card  
- Progress stages projected from Admin record (no duplicate SoT)

---

## Intentionally deferred

Final landing illustrations · marketing animations · NestJS APIs · real auth · file uploads · notifications · email · interview scheduling · evaluation engine

---

## Verify locally

```text
npm run dev

/
/analysts
/analysts/apply          → login if needed → form
/analysts/apply/success
/dashboard/free          → Application Status card
/dashboard/application
/admin/analysts/applications?view=queue&status=new
```
