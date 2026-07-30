# Phase 05 / Wave E — Referrals Implementation Report

**Version:** 1.0  
**Status:** Complete (mock-first frontend)  
**Date:** July 24, 2026  
**Authority:** `docs/Analyst/06_Implementation/`  
**Plan reference:** [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md) Stage 1 Wave E

---

## Governance framing

| Item | Value |
|------|-------|
| Roadmap item | Analyst Platform — Stage 1 Wave E Referrals |
| Owning domain | `analyst` |
| Allowed paths | `src/components/analysts/sections/referrals/**` · `src/lib/analysts/mock/referrals*.ts` · `src/lib/analysts/hooks/useAnalystReferrals.ts` · `src/lib/analysts/format-referrals.ts` · `src/types/analysts/referrals.ts` · thin nav/routes · Control Center / Directory enrichment · partnership-activation / onboarding hooks · `docs/Analyst/**` |

**Freeze note:** Explicit product-owner override (continuing Stage 1 after Waves A–D).

---

## Philosophy

Referrals is the **partnership growth** operational domain — not a link dump and not a BI suite.

* Status is **Enabled / Disabled** only  
* Commission math is **out of scope** (Wave F)  
* Activation follows **Operationally Ready** (Wave D)

---

## What shipped

| Capability | Result |
|------------|--------|
| Sidebar | Referrals first-class; Partnerships / Commissions removed from nav |
| Domain views | Dashboard · Directory · Performance · Archive |
| Referral Status | Enabled / Disabled + filters |
| Compact code/link | `REF-X7K82` + `tradercity.co/r/X7K82`; full URL via copy |
| Referral Profile | Identity · Performance · Plan breakdown · Referral Timeline · Actions |
| Performance workspace | Top referrers · recent success · recently activated · disabled · zero-referral |
| Archive | Disabled / archived / expired partnership identities |
| Partnership birth | Provisions referral identity (Disabled until Ready) |
| Onboarding Ready | Activates referral identity |
| Analyst Profile | Directory Inspector + Control Center Referrals tab / Overview card |
| Commissions | Placeholder / redirect — Wave F consumes referral performance |
| Mock scenarios | New · zero · multi-success · mixed plans · disabled · archived · provisioned-not-activated |

---

## Lifecycle

```text
Approve
  → Provision Referral Identity (Disabled)
  → System Provisioning (Wave D)
  → Operationally Ready
  → Referral Activated (Enabled)
  → Commission (Wave F)
```

---

## Source ownership

```text
src/types/analysts/referrals.ts
src/lib/analysts/mock/referrals.ts
src/lib/analysts/mock/referrals-mutations.ts
src/lib/analysts/hooks/useAnalystReferrals.ts
src/lib/analysts/format-referrals.ts
src/components/analysts/sections/referrals/**
src/app/admin/analysts/referrals/**
(+ nav-config · partnership-activation · onboarding · Directory Details · Control Center)
```

---

## URL contract

```text
/admin/analysts/referrals
/admin/analysts/referrals?view=directory&status=enabled
/admin/analysts/referrals?view=directory&referral=aref-a-002
/admin/analysts/referrals?view=performance
/admin/analysts/referrals?view=archive
/admin/analysts/referrals/aref-a-002
/admin/analysts/{id}?tab=referrals
```

---

## Exit criteria

| Criterion | Result |
|-----------|--------|
| Dedicated Referrals domain | **Met** |
| Operationally Ready → referral identity | **Met** |
| Dashboard · Directory · Performance · Archive | **Met** |
| Status Enabled / Disabled + filters | **Met** |
| Compact code + shortened link | **Met** |
| Profile performance + plan breakdown | **Met** |
| Analyst Profile referral summary | **Met** |
| No commission business logic | **Met** |
| Mock coverage of major states | **Met** |
| Docs synchronized | **Met** |

---

## Next recommended work

~~Wave F — Commission~~ → **Complete** ([`ANALYST_COMMISSION_IMPLEMENTATION.md`](./ANALYST_COMMISSION_IMPLEMENTATION.md)).
