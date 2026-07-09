# TraderCity Homepage Refinement Agent

## Chapter 09 --- Appendix A: Current Homepage Architecture, Component Inventory & AI Implementation Reference

**Version:** 1.0\
**Status:** Living Specification

> This appendix bridges the gap between product philosophy and
> implementation. It documents how Agent A should understand, audit and
> evolve the existing homepage codebase without introducing
> architectural drift.

------------------------------------------------------------------------

# 1. Purpose

Unlike previous chapters that explain *why* the homepage exists, this
chapter explains *how* the implementation should be understood.

Agent A must begin every task by building a mental model of the current
homepage before making changes.

------------------------------------------------------------------------

# 2. Homepage Responsibilities

The homepage has four responsibilities:

1.  Explain the product.
2.  Build trust.
3.  Demonstrate ecosystem depth.
4.  Convert qualified visitors into members.

Every component should support at least one responsibility.

------------------------------------------------------------------------

# 3. Expected Route Structure

Representative structure:

``` text
src/app/
├── page.tsx
├── layout.tsx
└── globals.css
```

`page.tsx` should remain a composition layer that assembles homepage
sections.

Avoid placing business logic directly inside the route.

------------------------------------------------------------------------

# 4. Homepage Composition

Conceptual rendering order:

``` text
<HomePage>

 Hero

 Ecosystem Overview

 Problem Awareness

 Trader Solution

 Analyst Team

 Community

 Membership

 Knowledge Vault

 Pricing
```

The sequence forms one continuous story.

------------------------------------------------------------------------

# 5. Component Responsibilities

Each section should expose a small public API.

Responsibilities should remain separated into:

-   Layout
-   Content
-   Presentation
-   Interaction
-   Animation

Never combine unrelated responsibilities.

------------------------------------------------------------------------

# 6. Background / Content Pattern

Preferred implementation:

``` text
Hero/

 Hero.tsx

 HeroBackground.tsx

 HeroContent.tsx
```

Background components own:

-   grids
-   gradients
-   decorative layers
-   ambient effects

Content components own:

-   typography
-   layout
-   interactions
-   business messaging

------------------------------------------------------------------------

# 7. Expected Shared Primitive Library

As the homepage matures, the following primitives should become
standard:

-   SectionContainer
-   SectionEyebrow
-   SectionHeading
-   SectionDescription
-   PremiumButton
-   GlassCard
-   StatCard
-   CTAGroup
-   GradientText
-   Badge
-   Divider
-   Surface
-   ContentWrapper

Prefer extending these primitives over creating new one-off components.

------------------------------------------------------------------------

# 8. Design Token Expectations

Centralize:

Typography

Spacing

Radius

Borders

Shadow

Animation

Color

Container widths

Transitions

No repeated "magic values".

------------------------------------------------------------------------

# 9. Component Audit Checklist

Before modifying any section ask:

-   Is the component reusable?
-   Is it named correctly?
-   Is there duplicated logic?
-   Does it own only one responsibility?
-   Does it follow the design system?
-   Is accessibility complete?

------------------------------------------------------------------------

# 10. Technical Debt Register

Track---not hide---technical debt.

Examples:

-   duplicated UI
-   inconsistent spacing
-   legacy naming
-   outdated comments
-   obsolete experiments
-   unused components

Every release should reduce this list.

------------------------------------------------------------------------

# 11. AI Review Questions

Before submitting implementation:

-   Why was this change made?
-   What business goal improved?
-   What UX improved?
-   Which files changed?
-   Which reusable components were introduced?
-   What technical debt remains?

------------------------------------------------------------------------

# 12. Documentation Rules

Whenever architecture changes:

Update

-   component inventory
-   design system
-   engineering handbook
-   changelog
-   implementation notes

Documentation should evolve with the codebase.

------------------------------------------------------------------------

# 13. Future Appendices

This handbook should eventually include:

Appendix B Current file-by-file homepage map.

Appendix C Design Token Catalogue.

Appendix D Complete component inventory.

Appendix E Animation catalogue.

Appendix F Homepage QA checklist.

Appendix G Cursor prompt library.

Appendix H Architectural Decision Records (ADR).

------------------------------------------------------------------------

# 14. Long-Term Objective

The ultimate goal is for any AI engineer to understand the TraderCity
homepage by reading this handbook alone.

The handbook should become the authoritative reference for:

-   design decisions
-   engineering patterns
-   reusable components
-   product narrative
-   future evolution

If the code and handbook disagree, update whichever is incorrect so they
remain aligned.

------------------------------------------------------------------------

# Chapter Summary

This appendix completes Version 1 of the Homepage Refinement Handbook by
connecting the product vision with the implementation architecture.

Future revisions should replace representative examples with the exact
component tree from the live codebase so the handbook remains an
accurate engineering reference.
