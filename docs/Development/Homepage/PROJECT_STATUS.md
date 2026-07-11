# Homepage — Project Status

**Last Updated:** July 2026 (Membership + Pricing merge)  
**Owner:** Homepage Refinement (Agent A)  
**Handbook:** [`docs/AI/Agents/Homepage/00_Homepage_Refinement_Strategy.md`](../../AI/Agents/Homepage/00_Homepage_Refinement_Strategy.md)

---

## Current Phase

| Field | Value |
|-------|-------|
| **Active Phase** | Phase 03 — Cohesion / Motion (not started) |
| **Last Completed** | Phase 02 — Premium Polish + Membership/Pricing conversion merge |
| **Implementation Sprint** | Sprint 3 (per Ch 11 guide) |
| **Gate Status** | Conversion merge complete — cleared to begin Sprint 3 |

---

## Completed Phases

| Phase | Name | Date | Record |
|-------|------|------|--------|
| 01 | Foundation Refinement | July 2026 | [`Phase-01-Homepage-Foundation-Refinement.md`](Phase-01-Homepage-Foundation-Refinement.md) |
| 02 | Premium Polish | July 2026 | [`Phase-02-Homepage-Premium-Polish.md`](Phase-02-Homepage-Premium-Polish.md) |
| — | Membership + Pricing Merge | July 2026 | See [`CHANGELOG.md`](CHANGELOG.md) |

### Latest: Section order — Research 06, Pricing 07 at bottom

Homepage flow:

```
Community → Research (06) → Membership + CTAs → Pricing (07)
```

- Research Framework is section **06** (after Community)
- Pricing Plans is section **07** at the bottom of the page
- Membership comparison sits above Pricing as the conversion bridge (unnumbered label)

---

## Overall Progress

| Milestone | Status | Progress |
|-----------|--------|----------|
| Phase 01 — Foundation | Complete | 100% |
| Phase 02 — Premium Polish | Complete | 100% |
| Membership + Pricing Merge | Complete | 100% |
| Phase 03 — Cohesion (Motion) | Not started | 0% |
| Phase 04 — Depth (A11y + Perf) | Pending Phase 03 | 0% |
| Phase 05 — Maturity | Pending Phase 04 | 0% |
| **Overall Homepage Refinement** | **In Progress** | **~45%** |

---

## Current Technical Debt

Full register: [`TECHNICAL_DEBT.md`](TECHNICAL_DEBT.md)

| Priority | Open Items | Top Item |
|----------|------------|----------|
| Critical | 1 | Missing `public/images/` (51 paths) |
| High | 4 | Token migration incomplete; Research Framework monolith; motion disabled |
| Medium | 6 | EcosystemLite Tabler icons; Discord invite API (Free CTA still uses login) |
| Low | 6 | `next/image`; heading audit; reduced-motion |

---

## Homepage Architecture Snapshot

### Live Section Order

```
Hero → Problem → Trader Solution → Analysts → Community
  → ResearchFramework (06)
  → MembershipComparison + conversion CTAs
  → Pricing (07) — bottom of page
```

### Conversion CTAs

| CTA | Destination |
|-----|-------------|
| Join Free Community | `/login?plan=free` |
| Pricing CTA | Submit and Pay (plan selection) |

### Shared Primitives (Phase 02)

```
src/components/home/shared/
├── SectionEyebrow.tsx
├── SectionContainer.tsx
├── GradientText.tsx
└── GlassCard.tsx
```

---

## Next Recommended Phase

### Phase 03 — Cohesion (Motion)

| Attribute | Detail |
|-----------|--------|
| **Objective** | Institutional scroll reveals, reduced-motion support, CTA micro-interactions |
| **Estimated Complexity** | Medium — 5 client files + `motion.ts` |
| **Estimated Impact** | Medium-High — homepage feels more alive without crypto-hype motion |
| **Guide** | [`11_Code_Implementation_Guide.md`](../../AI/Agents/Homepage/11_Code_Implementation_Guide.md) — Sprint 3 |

---

## Verification Status (Membership + Pricing Merge)

| Check | Status |
|-------|--------|
| Code implemented | Complete |
| `npm run build` | Passed |
| Membership above Pricing | Verified |
| Free CTA → login | Verified |
| VIP scroll + highlight | Implemented |
| Pricing design unchanged | Verified |
| Documentation | Complete |

---

*Updated after Membership + Pricing conversion merge.*
