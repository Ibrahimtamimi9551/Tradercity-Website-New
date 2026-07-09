# Homepage — Technical Debt Register

**Last Updated:** July 2026 (Phase 01 complete)  
**Owner:** Homepage Refinement (Agent A)  
**Phase Record:** [`Phase-01-Homepage-Foundation-Refinement.md`](Phase-01-Homepage-Foundation-Refinement.md)

This register tracks known technical debt for the TraderCity homepage. Items are prioritized by impact on premium perception, maintainability, conversion, and engineering velocity.

**Legend:** 🔴 Critical · 🟠 High · 🟡 Medium · 🟢 Low

---

## Resolved in Phase 02

| Item | Resolution | Date |
|------|------------|------|
| Eyebrow pattern duplication (6 sections) | `SectionEyebrow` primitive | 2026-07 |
| Legacy section numbers 03–08 in UI | Renumbered to 02–07 | 2026-07 |
| No shared primitives | `home/shared/` folder with 4 components | 2026-07 |
| Trader Solution compressed vertical spacing | `SectionContainer` standard band | 2026-07 |
| Tabler icons in mounted Problem Awareness | Lucide migration | 2026-07 |
| Glass card recipe inconsistency (partial) | `GlassCard` on Analyst, Membership, Pricing | 2026-07 |
| Inline gradient headline duplication (partial) | `GradientText` primitive | 2026-07 |

---

## Resolved in Phase 01

| Item | Resolution | Date |
|------|------------|------|
| Scaffold metadata (`Create Next App`) | TraderCity title/description/OpenGraph in `layout.tsx` | 2026-07 |
| Geist loaded but body used Arial | `--font-sans` wired to `body` in `globals.css` | 2026-07 |
| VIP CTAs routed to `/login?plan=free` | Anchored to `#plan-selector` | 2026-07 |
| `CommunityIllustratiion.tsx` filename typo | Renamed to `CommunityIllustration.tsx` | 2026-07 |
| Invalid Tailwind `sm:-mt+6 lg:-mt+8` | Fixed to `sm:-mt-6 lg:-mt-8` | 2026-07 |
| `LoginBackground` export in pricing module | Renamed to `PricingBackground` | 2026-07 |
| Legacy exports (`Section3Content`, `Section6Discord`) | Aligned to filename conventions | 2026-07 |
| ~1,150 lines dead commented iterations | Removed from 6 files | 2026-07 |
| `MembershipComparisonContent` stub at file top | Removed | 2026-07 |
| Missing `onError` on Community Discord image | Added hide-on-error handler | 2026-07 |

---

## Critical

### 🔴 Missing `public/images/` Asset Directory

| Attribute | Detail |
|-----------|--------|
| **Description** | The `public/images/` directory does not exist. At least 51 image paths are referenced across homepage components (Community Discord, Research Framework thumbnails, backgrounds, etc.). |
| **Impact** | Broken or hidden images degrade premium perception; Knowledge Vault and Community sections lack visual proof |
| **Affected Files** | `CommunityDiscord.tsx`, `ResearchFrameworkContent.tsx`, various `*Background.tsx` files |
| **Current Mitigation** | `onError` handlers hide broken images in Community and Research Framework |
| **Why It Remains** | Asset delivery is outside Phase 1 code scope; placeholders were explicitly forbidden |
| **Recommended Fix** | Deliver production assets under `public/images/` matching blueprint path inventory; visual QA at 1440px + 390px |
| **Target Phase** | External / parallel to Phase 2 |

---

## High

### 🟠 Inline Hex Values Not Migrated to Design Tokens

| Attribute | Detail |
|-----------|--------|
| **Description** | Phase 1 declared `tc-*` tokens in `globals.css` but all section files still use inline hex (`#D4AF37`, `#3B82F6`, `#8F9BB3`, etc.) |
| **Impact** | Dual styling system; token changes won't propagate; dashboard/homepage visual drift risk |
| **Affected Files** | All `*Content.tsx` under `home/` and `pricing/PricingContent.tsx` |
| **Why It Remains** | Intentionally deferred to Phase 2 to avoid visual regression in foundation sprint |
| **Recommended Fix** | Incremental migration during typography pass; start with gold, muted, section background |
| **Target Phase** | Phase 02+ incremental migration |

### 🟠 Shared Primitives — Partial Adoption

| Attribute | Detail |
|-----------|--------|
| **Status** | **Partially resolved** — `SectionEyebrow`, `SectionContainer`, `GradientText`, `GlassCard` created in `home/shared/` |
| **Remaining** | Not all sections use `SectionContainer`; inline hex still dominant outside Problem/Trader muted text |
| **Target Phase** | Incremental adoption in Phase 03+ |

### 🟠 Research Framework Monolith (~1,500 Lines)

| Attribute | Detail |
|-----------|--------|
| **Description** | `ResearchFrameworkContent.tsx` contains orchestration, mode panels, topic lists, content viewer, nav, and ribbon cards in a single client file |
| **Impact** | Difficult to test, review, and modify; high merge conflict risk; bundle weight |
| **Affected Files** | `src/components/home/research-framework/ResearchFrameworkContent.tsx` |
| **Why It Remains** | Split requires preserving all state logic without behavior change — Phase 4 scope |
| **Recommended Fix** | Split into `FrameworkModePanel`, `ReportModePanel`, `TopicListPanel`, `ContentViewerPanel`, `FrameworkNav`, `RibbonCards` |
| **Target Phase** | Phase 04 |

### 🟠 Scroll Reveal Motion Disabled

| Attribute | Detail |
|-----------|--------|
| **Description** | `whileInView` animations are commented out in Analyst Team, Community, and Membership sections |
| **Impact** | Homepage feels static compared to Research Framework reference; reduced institutional polish |
| **Affected Files** | `AnalystTeamContent.tsx`, `CommunityDiscord.tsx`, `CommunityIllustration.tsx`, `MembershipComparisonContent.tsx` |
| **Why It Remains** | Intentionally preserved as commented code for Phase 3 re-enablement with shared motion config |
| **Recommended Fix** | Create `home/shared/motion.ts`; re-enable with `viewport: { once: true }` and `useReducedMotion()` |
| **Target Phase** | Phase 03 |

### 🟠 Price Display Inconsistencies (Cross-Module)

| Attribute | Detail |
|-----------|--------|
| **Description** | Homepage/pricing UI shows plan prices ($50/$150/$500) that may not match `PaymentSection` ($60) or Arena backend pricing |
| **Impact** | Conversion trust risk if user sees different prices at checkout |
| **Affected Files** | `PricingContent.tsx`, payment/dashboard modules (out of Agent A scope) |
| **Why It Remains** | Requires product/backend alignment — Agent B scope per multitask prompts |
| **Recommended Fix** | Audit pricing across homepage, `/pricing`, payment-activation, and dashboard; single source of truth |
| **Target Phase** | Agent B / product decision |

---

## Medium

### 🟡 Section Vertical Rhythm Inconsistency

| Attribute | Detail |
|-----------|--------|
| **Status** | **Mostly resolved** — sections 02–07 normalized to `py-12 lg:py-16`; verify visually at 390px/1440px |
| **Target Phase** | Ongoing visual QA |

### 🟡 Glass Card Recipe Duplication

| Attribute | Detail |
|-----------|--------|
| **Status** | **Partially resolved** — Analyst selectors, Membership cards, Pricing container unified; Analyst center featured card retains gold accent recipe |
| **Target Phase** | Phase 03 if further unification needed |

### 🟡 Dual Icon Libraries (Tabler + Lucide)

| Attribute | Detail |
|-----------|--------|
| **Status** | **Partially resolved** — Problem Awareness migrated to Lucide |
| **Remaining** | `EcosystemLiteContent.tsx`, `EcosystemDetailed.tsx` still use Tabler (Hero-mounted EcosystemLite) |
| **Target Phase** | Phase 03 — migrate EcosystemLite Tabler icons |

### 🟡 Container Max-Width Inconsistency

| Attribute | Detail |
|-----------|--------|
| **Description** | Sections use varying max-widths: Hero 1200px, S03–04 1300px, S05–08 1440px, Pricing 1080px per blueprint |
| **Impact** | Subtle horizontal alignment breaks in continuous scroll narrative |
| **Target Phase** | Phase 02 |

### 🟡 `EcosystemDetailed.tsx` Orphan Component

| Attribute | Detail |
|-----------|--------|
| **Description** | `src/components/home/EcosystemDetailed.tsx` exists but is not mounted in `page.tsx` |
| **Impact** | Dead code in bundle path if accidentally imported; unclear product intent |
| **Target Phase** | Phase 05 (product decision required) |

### 🟡 Commented Alternate Layouts in Unmodified Files

| Attribute | Detail |
|-----------|--------|
| **Description** | `ProblemAwarenessBackground.tsx` and `PricingContent.tsx` still contain commented iteration blocks not cleaned in Phase 1 |
| **Impact** | Reduced but not eliminated comment debt |
| **Target Phase** | Phase 02 housekeeping |

---

## Low

### 🟢 `<img>` Instead of `next/image`

| Attribute | Detail |
|-----------|--------|
| **Description** | Community Discord and Research Framework use native `<img>` tags |
| **Impact** | No automatic optimization, lazy loading, or responsive srcset |
| **Target Phase** | Phase 04 |

### 🟢 Heading Hierarchy Unverified

| Attribute | Detail |
|-----------|--------|
| **Description** | H1→H2→H3 structure across 8 sections not audited; multiple sections may use heading levels inconsistently |
| **Impact** | Screen reader navigation and SEO structure suboptimal |
| **Target Phase** | Phase 04 |

### 🟢 Analyst Carousel Keyboard Navigation

| Attribute | Detail |
|-----------|--------|
| **Description** | Carousel dots lack `role="tablist"`, arrow key support, and `aria-selected` |
| **Impact** | Keyboard and screen reader users cannot operate analyst selector |
| **Target Phase** | Phase 04 |

### 🟢 `prefers-reduced-motion` Not Implemented

| Attribute | Detail |
|-----------|--------|
| **Description** | No reduced-motion fallbacks in client components with Framer Motion |
| **Impact** | Accessibility gap for vestibular-sensitive users once motion is re-enabled |
| **Target Phase** | Phase 03 |

### 🟢 Cross-Surface Token Sharing

| Attribute | Detail |
|-----------|--------|
| **Description** | Dashboard purple/gold themes not linked to homepage `@theme` tokens |
| **Impact** | Brand drift between marketing and product surfaces over time |
| **Target Phase** | Phase 05 |

### 🟢 Visual QA Baseline Not Documented

| Attribute | Detail |
|-----------|--------|
| **Description** | No screenshot baseline at 390px / 1440px for regression comparison |
| **Impact** | Phase 2+ polish changes harder to verify objectively |
| **Target Phase** | Phase 05 (`12_Visual_QA_Baseline.md`) |

---

## Debt Metrics

| Priority | Open Items | Resolved (Phase 01–02) |
|----------|------------|---------------------|
| Critical | 1 | — |
| High | 4 | 8 |
| Medium | 6 | 4 |
| Low | 6 | 1 |
| **Total Open** | **17** | **13 resolved** |

---

## Review Cadence

- Update this file at the end of every homepage phase
- Remove items only when verified in repository
- Add newly discovered items with priority justification
- Reprioritize when product decisions change (e.g., pricing alignment)

---

*Honest debt documentation accelerates Phase 2 planning. Do not hide known gaps.*
