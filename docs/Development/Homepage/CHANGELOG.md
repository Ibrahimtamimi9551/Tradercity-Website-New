# Homepage — CHANGELOG

All notable homepage implementation changes are documented in this file.

Format based on [Keep a Changelog](https://keepachangelog.com/).  
Phase records: `docs/Development/Homepage/Phase-*.md`

---

## [Phase 01 — Foundation Refinement] — 2026-07-10

**Status:** Complete  
**Sprint:** 1 (per Implementation Guide Ch 11)  
**Build:** `npm run build` — passed

### Architecture

- Added in-page CTA anchor architecture: `id="pricing"` on `Pricing.tsx`, `id="plan-selector"` on plan grid in `PricingContent.tsx`
- Re-aligned VIP conversion paths to scroll/focus plan selector instead of `/login?plan=free`
- Preserved Free membership CTAs at `/login?plan=free` — no change to free-intent funnel
- Preserved 8-section flat composition in `src/app/page.tsx` — no routing, reorder, or shell changes
- Renamed `PricingBackground` export (was `LoginBackground`) — disambiguated from login module
- Renamed `CommunityIllustratiion.tsx` → `CommunityIllustration.tsx` with import update in `Community.tsx`
- Normalized exports: `ProblemAwarenessContent`, `CommunityDiscord`, `TraderSolutionIllustration`

### Design

- Replaced scaffold metadata (`Create Next App`) with TraderCity title, description, and OpenGraph tags
- Wired Geist Sans to `body` via `--font-sans: var(--font-geist-sans)` — replaces Arial fallback
- Declared six brand color tokens in `@theme inline`: `tc-navy`, `tc-purple`, `tc-gold`, `tc-cyan`, `tc-muted`, `tc-section`
- Fixed invalid Tailwind margin classes on Community illustration (`sm:-mt-6 lg:-mt-8`)

### Refactoring

- Removed ~1,150 lines of dead commented iteration blocks from:
  - `AnalystTeamContent.tsx` (778 → 284 lines)
  - `TraderSolutionIllustration.tsx` (573 → 213 lines)
  - `CommunityDiscord.tsx` (254 → 97 lines)
  - `CommunityIllustration.tsx` (rewritten clean, 57 lines)
  - `TraderSolutionBackground.tsx`
  - `MembershipComparisonContent.tsx` (stub block removed)
- Rewrote `PricingBackground.tsx` as minimal pricing-specific grid background
- Removed unused `Link` import from `PricingContent.tsx`

### Performance

- Dead comment removal reduces source file size and engineering parse overhead
- No bundle-size optimizations in this phase (no dynamic imports, no `next/image` migration)
- Build verified: 9 static routes, homepage prerendered successfully

### Accessibility

- Added `onError` handler on Community Discord screenshot — hides broken image when asset missing
- Verified existing `onError` handlers on Research Framework Knowledge Vault thumbnails (unchanged)
- Preserved `alt="TraderCity Discord Community"` on Discord image
- No heading hierarchy audit, keyboard navigation, or focus ring improvements in this phase

### Technical Debt

- **Resolved:** scaffold metadata, font disconnect, VIP CTA misrouting, filename typo, invalid Tailwind classes, export/name drift, iteration comment bloat
- **Discovered / Confirmed:** missing `public/images/` directory, inline hex not migrated to tokens, motion system dormant, Research Framework monolith

### Documentation

- Created `docs/Development/Homepage/Phase-01-Homepage-Foundation-Refinement.md`
- Created `docs/Development/Homepage/CHANGELOG.md`
- Created `docs/Development/Homepage/TECHNICAL_DEBT.md`
- Created `docs/Development/Homepage/PROJECT_STATUS.md`

---

## [Phase 02 — Premium Polish] — 2026-07-10

**Status:** Complete  
**Sprint:** 2 (per Implementation Guide Ch 11)  
**Build:** `npm run build` — passed

### Architecture

- Created `src/components/home/shared/` with four primitives: `SectionEyebrow`, `SectionContainer`, `GradientText`, `GlassCard`
- Corrected section eyebrow numbering from legacy 03–08 to 02–07 (Hero and Pricing remain unnumbered)
- Exported `GLASS_CARD_CLASSES` for motion-wrapped cards that cannot use `GlassCard` directly

### Design

- Normalized section H2s to display-lg scale (`text-3xl sm:text-4xl lg:text-5xl`)
- Applied `text-tc-muted` and `text-base leading-relaxed` in Problem Awareness and Trader Solution
- Unified glass card recipe across Analyst selector cards, Membership Free/VIP cards, and Pricing plan container
- Normalized vertical rhythm to `py-12 lg:py-16` across sections 02–07
- Fixed Trader Solution compressed spacing (`py-2 lg:py-6` → standard band)

### Refactoring

- Replaced inline eyebrow markup in 6 sections with `SectionEyebrow`
- Replaced inline gradient spans with `GradientText` where applied
- `ProblemAwarenessContent` and `TraderSolutionContent` wrapped in `SectionContainer` (`medium` band)

### Icons

- Migrated `ProblemAwarenessContent` from `@tabler/icons-react` to `lucide-react` (BookOpen, Users, Lock, RefreshCw, Wallet, DollarSign)

### Documentation

- Created `docs/Development/Homepage/Phase-02-Homepage-Premium-Polish.md`
- Updated `CHANGELOG.md`, `TECHNICAL_DEBT.md`, `PROJECT_STATUS.md`

---

## [Membership + Pricing Conversion Merge] — 2026-07-11

**Status:** Complete  
**Build:** `npm run build` — passed

### Architecture

- Reordered homepage conversion block; later adjusted to: Community → Research (06) → Membership → Pricing (07 at bottom)
- VIP CTA dispatches `tc:focus-pricing` custom event; Pricing listens and selects quarterly plan
- Free Discord CTA remains `/login?plan=free` (Discord invite API not yet available)

### Design

- Replaced Membership text-link CTA panel with dual conversion cards:
  - Purple Free Discord card (glow, pulse icon, avatar cluster, full-width button)
  - Gold Become VIP card (glow, crown, full-width button)
- Tightened vertical seam between Membership and Pricing (`pb` / `pt` reduced)
- Pricing card layout, copy, and plan design unchanged — temporary gold highlight/pulse only on focus

### Conversion Flow

```
Community → Membership Comparison → CTA Block → Pricing → Research
```

---

## [Unreleased] — Phase 03 Preview

Planned per Implementation Guide Sprint 3:

- Shared `motion.ts` with `fadeUp` config
- Re-enable scroll reveals in Analyst, Community, Membership
- `prefers-reduced-motion` fallbacks
- CTA micro-interactions on Pricing links

---

*Entries are added at phase completion. Do not log work-in-progress here.*
