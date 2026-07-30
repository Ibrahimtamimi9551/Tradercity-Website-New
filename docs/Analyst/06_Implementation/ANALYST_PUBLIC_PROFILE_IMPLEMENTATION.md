# Analyst Public Profile — Implementation Report

**Version:** 1.1  
**Status:** Shipped (mock) + homepage consumer wired  
**Date:** July 26, 2026  
**Branch:** `feature/admin-analyst-management-phase-1`  
**Architecture:** [`../03_Frontend/PUBLIC_PROFILE_ARCHITECTURE.md`](../03_Frontend/PUBLIC_PROFILE_ARCHITECTURE.md)

---

## Governance

| Item | Value |
|------|-------|
| Roadmap item | Phase 4 — Analyst Profiles (presentation SoT + homepage consumer) |
| Owning domain | Analyst Platform (SoT) · Marketing (homepage section) |
| Allowed paths | `src/types/analysts/**` · `src/lib/analysts/**` · `src/components/analysts/**` · `src/components/home/analyst-team/**` · `docs/Analyst/**` |
| Out of scope | NestJS · individual public analyst pages · Performance Snapshot · View Full Profile |

---

## File map

### Types

| File | Role |
|------|------|
| `src/types/analysts/public-profile.ts` | Model, card props, homepage eligibility, labels |

### Mock / hooks

| File | Role |
|------|------|
| `src/lib/analysts/mock/public-profile-from-application.ts` | Auto-fill draft builder |
| `src/lib/analysts/mock/public-profiles.ts` | In-memory store + `listPublishedPublicProfiles` + homepage showcase seeds |
| `src/lib/analysts/mock/public-profile-mutations.ts` | Patch + soft publish / unpublish |
| `src/lib/analysts/mock/application-mutations.ts` | Approve → `ensurePublicProfileDraftFromApplication` |
| `src/lib/analysts/hooks/useAnalystPublicProfiles.ts` | Editor working copy + actions |
| `src/lib/analysts/hooks/usePublishedPublicProfiles.ts` | Homepage consumer hook |

### Presentation

| File | Role |
|------|------|
| `src/components/analysts/public-profile/PublicAnalystCard.tsx` | Adaptive public card (shared SoT) |
| `src/components/analysts/sections/applications/public-profile/*` | Queue, editor, live preview, workspace |
| `src/components/home/analyst-team/*` | Meet the Analysts equal-size spotlight carousel |

### Applications wiring

| File | Change |
|------|--------|
| `src/types/analysts/applications.ts` | `ApplicationDomainView` += `public_profile` |
| `ApplicationsDomainNav.tsx` | Public Profile tab |
| `ApplicationsDomainPage.tsx` | Presentation Manager view |
| `ApplicationDetailView.tsx` | `?surface=public_profile` mobile |

---

## Seeds

| Source | Profile status | Homepage eligible |
|--------|----------------|-------------------|
| Showcase `a-001` Luna Markets | `published` + featured | Yes (Directory active) |
| Showcase `a-002` Alpha Flow | `published` | Yes (Directory growing) |
| Showcase `a-006` Horizon Desk | `published` | Yes (Directory active) |
| Showcase `a-008` Signal Forge | `published` | Yes (Directory growing) |
| `app-005` Sofia | `draft` | No |
| `app-007` Priya | `published` | No until Directory active/growing |

---

## Homepage contract

```text
usePublishedPublicProfiles()
  → listPublishedPublicProfiles()
  → PublicAnalystCard (featured full + side compact)
```

Section CTA: **Become an Analyst** → `/analysts` (existing Analyst Application Journey).

Not included: View Full Profile · Performance Snapshot.

---

## Verification checklist

- [ ] Approve application → Public Profile draft appears under Public Profile  
- [ ] Edit fields → live `PublicAnalystCard` updates; empty sections hide  
- [ ] Draft → Preview → Published → Unpublish  
- [ ] `listPublishedPublicProfiles()` only returns published + visible + verified + active  
- [ ] Desktop Public Profile view + mobile `?surface=public_profile`  
- [ ] Homepage `#analysts` spotlight carousel consumes published profiles only  
- [ ] Carousel: prev/next · swipe/drag · infinite loop · side peeks on desktop  

---

## TODO(NestJS)

Replace mock store with authenticated public-profiles API; keep `PublicAnalystCard` and homepage contract unchanged.
