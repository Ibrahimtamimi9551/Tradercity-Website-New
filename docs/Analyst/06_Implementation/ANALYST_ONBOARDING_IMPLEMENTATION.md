# Phase 05 / Wave D — Onboarding (System Provisioning) Implementation Report

**Version:** 1.0  
**Status:** Complete (mock-first frontend)  
**Date:** July 24, 2026  
**Authority:** `docs/Analyst/06_Implementation/`  
**Plan reference:** [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md) Stage 1 Wave D

---

## Governance framing

| Item | Value |
|------|-------|
| Roadmap item | Analyst Platform — Stage 1 Wave D Onboarding |
| Owning domain | `analyst` |
| Allowed paths | `src/components/analysts/sections/applications/**` · `src/lib/analysts/mock/onboarding.ts` · `src/types/analysts/onboarding.ts` · `src/lib/analysts/hooks/useAnalystApplications.ts` · thin Discord/CC copy only · `docs/Analyst/**` |

**Freeze note:** Explicit product-owner override (continuing Stage 1 after Waves A–C).

---

## Philosophy change

Wave D is **Admin System Provisioning**, not analyst education.

| This wave | Future Analyst Dashboard |
|-----------|--------------------------|
| Verify Identity · Directory · Control Center · Discord · Referral · Commission · Backend | Platform intro · standards · training · resources |

---

## What shipped

| Capability | Result |
|------------|--------|
| Applications sub-nav | Dashboard · Review Queue · **Onboarding** · Archive |
| Onboarding queue | Approved applications with partnership handoff |
| System Provisioning panel | Approval header · initialization checklist · overall status |
| Checklist mapping | Real domains only — no duplicate data entry |
| Overall status | Ready · Provisioning Required · Failed (no %) |
| Mobile | `/admin/analysts/applications/[id]?surface=onboarding` |
| Future item | Analyst Dashboard Profile marked Future |
| Retry affordance | Failed items expose Retry (re-read) + domain link |

---

## Information flow

```text
Approve (Wave B)
  → Partnership activation (Directory · Discord · referral reserved)
  → Discord ops (Wave C)
  → Applications → Onboarding verifies outputs (Wave D)
```

---

## Source ownership

```text
src/types/analysts/onboarding.ts
src/lib/analysts/mock/onboarding.ts
src/components/analysts/sections/applications/OnboardingQueueTable.tsx
src/components/analysts/sections/applications/SystemProvisioningPanel.tsx
(+ ApplicationsDomainPage · DomainNav · FiltersBar · DetailView · useAnalystApplications)
```

---

## URL contract

```text
/admin/analysts/applications?view=onboarding
/admin/analysts/applications?view=onboarding&application=app-005
/admin/analysts/applications/[id]?surface=onboarding
```

---

## Exit criteria

| Criterion | Result |
|-----------|--------|
| Onboarding as Applications sub-module | **Met** |
| Verifies provisioning (not teaching) | **Met** |
| Checklist ↔ real modules | **Met** |
| Consumes Applications + Discord outputs | **Met** |
| No duplicate data entry | **Met** |
| Simple operational UI | **Met** |
| Analyst Dashboard / orientation separated | **Met** |
| Docs synchronized | **Met** |

---

## Next recommended work

**Stage 1 Wave E — Referrals.**  
Stop for review before Wave E.
