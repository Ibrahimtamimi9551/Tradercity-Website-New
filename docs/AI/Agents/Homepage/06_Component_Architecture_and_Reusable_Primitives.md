# TraderCity Homepage Refinement Agent

## Chapter 06 --- Component Architecture, Reusable Primitives & Implementation Strategy

**Version:** 1.0\
**Status:** Living Specification

> This chapter defines how the TraderCity homepage should be engineered.
> It documents component responsibilities, composition patterns,
> reusable primitives, and implementation rules so every future
> refinement strengthens---not fragments---the architecture.

------------------------------------------------------------------------

# 1. Philosophy

Components are product building blocks.

A component should solve one problem well.

Avoid creating components that mix presentation, business logic and
multiple unrelated responsibilities.

Every component should be:

-   Reusable
-   Predictable
-   Testable
-   Maintainable
-   Composable

------------------------------------------------------------------------

# 2. Composition First

Prefer composition over inheritance.

Preferred hierarchy:

Homepage

↓

Section

↓

Content

↓

Reusable Components

↓

UI Primitives

↓

Tokens

Avoid deeply nested monolithic files.

------------------------------------------------------------------------

# 3. Homepage Component Hierarchy

Conceptually the homepage is composed of:

-   Hero
-   Ecosystem Overview
-   Problem Awareness
-   Trader Solution
-   Analyst Team
-   Community
-   Membership
-   Knowledge Vault
-   Pricing

Each section owns its local presentation while consuming shared design
primitives.

------------------------------------------------------------------------

# 4. Background + Content Pattern

Every major section should follow the existing architecture.

Section

├── SectionBackground

├── SectionContent

└── Section.tsx

Responsibilities

Background

-   decorative layers
-   gradients
-   grids
-   glow
-   depth

Content

-   layout
-   typography
-   interactions
-   accessibility
-   business messaging

Never mix decorative background logic into business content.

------------------------------------------------------------------------

# 5. Reusable Primitive Library

Preferred reusable primitives include:

-   SectionContainer
-   SectionEyebrow
-   SectionHeading
-   SectionDescription
-   GlassCard
-   PremiumButton
-   Divider
-   Badge
-   GradientText
-   FeatureCard
-   StatCard
-   CTAGroup

New primitives should only be created when a reusable pattern emerges.

------------------------------------------------------------------------

# 6. Component Responsibilities

Every component should clearly answer:

-   Why does this component exist?
-   Which section owns it?
-   Can another section reuse it?
-   Does it contain state?
-   Is it purely presentational?

If responsibilities are unclear, split the component.

------------------------------------------------------------------------

# 7. Data Flow Philosophy

Homepage data should flow downward.

Parent

↓

Section

↓

Component

↓

Primitive

Avoid unnecessary prop drilling.

If shared configuration is required, centralize constants rather than
duplicating values.

------------------------------------------------------------------------

# 8. State Management

Homepage should remain mostly stateless.

Local state is acceptable for:

-   tabs
-   accordions
-   sliders
-   hover interactions
-   pricing selectors

Avoid global state for visual behavior.

------------------------------------------------------------------------

# 9. Animation Ownership

Animation belongs to the component that owns the interaction.

Examples

Hero

-   headline reveal
-   ecosystem motion

Cards

-   hover

Carousel

-   navigation

Do not centralize unrelated animations.

------------------------------------------------------------------------

# 10. Accessibility Ownership

Every component owns its own accessibility.

Checklist

-   semantic HTML
-   keyboard support
-   focus visibility
-   ARIA where required
-   contrast
-   touch targets

Accessibility should not be postponed.

------------------------------------------------------------------------

# 11. Responsive Ownership

Every component must behave independently across breakpoints.

Desktop

Tablet

Mobile

Do not rely on parent containers to fix layout issues.

------------------------------------------------------------------------

# 12. Shared Constants

Centralize reusable values:

-   colors
-   spacing
-   radii
-   typography
-   durations
-   easing
-   section widths

Avoid magic numbers repeated across components.

------------------------------------------------------------------------

# 13. Naming Conventions

Component names should describe responsibility.

Good examples

HeroContent

SectionHeading

KnowledgeVaultCard

MembershipComparison

Avoid vague names such as:

ComponentOne

CardNew

SectionTest

------------------------------------------------------------------------

# 14. Folder Organization

Prefer grouping by feature.

Example

components/

home/

hero/

community/

membership/

knowledge-vault/

pricing/

Each feature contains only its own implementation.

------------------------------------------------------------------------

# 15. Refactoring Strategy

Before adding code:

Search existing implementation.

Ask:

Can it be reused?

Can it be extended?

Can duplication be removed?

Refactoring should reduce complexity.

------------------------------------------------------------------------

# 16. AI Decision Framework

Before creating a new component:

1.  Does a similar component already exist?
2.  Can an existing primitive solve this?
3.  Will another section reuse it?
4.  Does this improve maintainability?
5.  Does it simplify future iterations?

Only create new abstractions when justified.

------------------------------------------------------------------------

# 17. Component Review Checklist

Review every implementation for:

-   Single responsibility
-   Naming consistency
-   Accessibility
-   Responsiveness
-   Reusability
-   Performance
-   Visual consistency
-   Minimal props
-   No duplicated logic

------------------------------------------------------------------------

# 18. Future Evolution

Future homepage evolution should focus on:

-   richer reusable primitives
-   stronger design tokens
-   fewer one-off components
-   cleaner composition
-   improved documentation
-   reduced maintenance cost

Every release should make the architecture simpler than before.

------------------------------------------------------------------------

# 19. Chapter Summary

After completing this chapter the agent should understand:

-   component ownership
-   composition philosophy
-   reusable primitive strategy
-   data flow
-   implementation patterns
-   refactoring principles
-   engineering consistency

------------------------------------------------------------------------

# Next Chapter

Chapter 07 will define UX principles, conversion framework,
accessibility strategy, performance standards, QA workflow and
engineering verification for every homepage refinement.
