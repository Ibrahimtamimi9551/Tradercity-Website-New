# TraderCity Homepage Refinement Agent

## Chapter 04 --- Homepage Architecture, Folder Structure & Engineering Patterns

**Version:** 1.0\
**Status:** Living Specification

> This chapter defines the technical architecture of the TraderCity
> homepage. It explains how the homepage is organized today, which
> engineering patterns must be preserved, and how future refinements
> should be implemented.

------------------------------------------------------------------------

# 1. Engineering Philosophy

The homepage is a product, not a collection of pages.

Every engineering decision should optimize:

-   Maintainability
-   Reusability
-   Scalability
-   Readability
-   Performance
-   Consistency

Prefer evolving the current architecture over replacing it.

------------------------------------------------------------------------

# 2. Existing Technology Stack

Frontend

-   Next.js (App Router)
-   React
-   TypeScript (Strict)
-   Tailwind CSS
-   Framer Motion
-   Lucide / Tabler Icons (follow the established project convention)

Backend (reference only)

-   NestJS Modular Monolith
-   Prisma
-   PostgreSQL
-   JWT Authentication
-   RBAC

The homepage agent must never modify backend architecture.

------------------------------------------------------------------------

# 3. High-Level Homepage Architecture

The homepage follows a compositional architecture.

Homepage Route

↓

Section Component

↓

Background Component

-   

Content Component

↓

Reusable UI Components

↓

Shared Design Primitives

Each section should be self-contained while following a common design
language.

------------------------------------------------------------------------

# 4. Current Folder Organization

Representative structure:

``` text
src/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── home/
│   ├── pricing/
│   ├── ui/
│   └── shared/
```

The exact folders may evolve, but responsibilities should remain clear.

------------------------------------------------------------------------

# 5. Section Ownership

Agent A owns:

-   src/app/page.tsx
-   src/app/layout.tsx (metadata only)
-   src/app/globals.css
-   src/components/home/\*\*
-   src/components/pricing/\*\*

Read-only references:

-   payment-activation
-   free dashboard
-   vip dashboard

Never modify admin modules.

------------------------------------------------------------------------

# 6. Component Composition

Every homepage section should follow this pattern:

-   Background
-   Content
-   Local helper components
-   Shared primitives

Avoid monolithic components exceeding practical maintenance limits.

Extract reusable elements when duplication appears.

------------------------------------------------------------------------

# 7. Design Primitive Strategy

Shared primitives should include:

-   SectionContainer
-   SectionEyebrow
-   SectionHeading
-   SectionDescription
-   GlassCard
-   PremiumButton
-   GradientText
-   Badge
-   Divider

Never recreate identical components under different names.

------------------------------------------------------------------------

# 8. Styling Philosophy

Tailwind should remain the primary styling solution.

Goals:

-   predictable utility usage
-   consistent spacing
-   minimal custom CSS
-   reusable tokens
-   centralized theme values

Avoid one-off utility combinations when a reusable pattern exists.

------------------------------------------------------------------------

# 9. Typography Architecture

Typography should communicate hierarchy.

Recommended levels:

-   Display
-   Heading
-   Subheading
-   Body
-   Caption
-   Label

Typography must remain consistent across all homepage sections.

------------------------------------------------------------------------

# 10. Spacing System

Spacing should follow a repeatable rhythm.

Objectives:

-   generous whitespace
-   consistent section spacing
-   aligned content widths
-   predictable padding
-   balanced visual density

Whitespace is part of the design---not empty space.

------------------------------------------------------------------------

# 11. Motion Architecture

Motion exists to improve comprehension.

Use motion for:

-   section reveal
-   hover feedback
-   micro-interactions
-   continuity

Avoid motion that distracts from information.

Respect reduced-motion preferences.

------------------------------------------------------------------------

# 12. Asset Strategy

Images should:

-   reinforce the message
-   support storytelling
-   remain optimized
-   use Next/Image where practical
-   avoid decorative overload

Broken or inconsistent assets should be treated as engineering issues.

------------------------------------------------------------------------

# 13. Performance Principles

Every refinement should protect:

-   Largest Contentful Paint
-   Cumulative Layout Shift
-   Interaction responsiveness

Guidelines:

-   lazy-load when appropriate
-   avoid unnecessary client components
-   reduce layout shifts
-   prefer CSS over JavaScript animation
-   avoid excessive DOM depth

------------------------------------------------------------------------

# 14. Accessibility Standards

Every section should support:

-   keyboard navigation
-   visible focus states
-   semantic HTML
-   sufficient contrast
-   screen reader compatibility

Accessibility is a product requirement, not an enhancement.

------------------------------------------------------------------------

# 15. Refactoring Rules

Before creating a new component:

1.  Search for an existing reusable solution.
2.  Extend instead of duplicate.
3.  Keep APIs simple.
4.  Preserve backward compatibility where possible.

Refactoring should reduce complexity, never increase it.

------------------------------------------------------------------------

# 16. Engineering Workflow

For every refinement:

1.  Read documentation.
2.  Audit affected files.
3.  Identify reusable opportunities.
4.  Present implementation plan.
5.  Wait for approval.
6.  Implement incrementally.
7.  Verify desktop, tablet, and mobile.
8.  Perform code review.

------------------------------------------------------------------------

# 17. Quality Gates

Before completing work:

-   No duplicated components
-   No unnecessary dependencies
-   No architecture regressions
-   No broken responsiveness
-   No accessibility regressions
-   No visual inconsistencies

------------------------------------------------------------------------

# 18. Chapter Summary

After completing this chapter, the agent should understand:

-   How the homepage is organized.
-   Which directories belong to Agent A.
-   Which engineering patterns must be preserved.
-   How reusable components should evolve.
-   How to implement improvements without disrupting the existing
    architecture.

------------------------------------------------------------------------

# Next Chapter

Chapter 05 will define the complete TraderCity Design System, including
typography, spacing, color language, visual hierarchy, reusable UI
primitives, component recipes, and premium interaction patterns.
