# TraderCity Admin Dashboard -- Mobile Responsiveness Architecture Refactor

## Context

I have attached multiple architectural inspection documents that analyze
the current responsive implementation of the Admin Dashboard.

These documents are **analysis references**, not implementation
specifications.

Before making any code changes, carefully review all inspection
documents, compare them with the existing codebase, and validate whether
each observation is correct.

Do **not** blindly implement every recommendation.

Your responsibility is to determine the correct architectural solution
that aligns with the existing TraderCity architecture.

------------------------------------------------------------------------

# Primary Objective

The objective is **not simply to fix mobile UI issues.**

The objective is to eliminate the architectural problems that caused the
mobile regressions and establish a reusable responsive architecture that
every future Admin module can follow.

This architecture will become the foundation for:

-   Members
-   Discord
-   Subscriptions
-   Referrals
-   Payments
-   Future Admin modules

Therefore, every change must improve the overall architecture rather
than fixing isolated bugs.

------------------------------------------------------------------------

# Existing Design Principles (Must Not Change)

## 1. Single Source of State

There must be only one processing layer responsible for:

-   search
-   filters
-   pagination
-   sorting
-   selected member
-   processed datasets

Desktop and mobile must consume the same processed state.

Presentation may change.

Business logic must not.

## 2. Shared Business Logic

Desktop and mobile must never implement separate logic.

The following should exist only once:

-   filtering
-   searching
-   sorting
-   pagination
-   data transformation
-   action handlers
-   badge/status generation
-   formatting
-   selection logic

Presentation components should only render data.

## 3. Responsive Presentation Only

Desktop, tablet and mobile should only differ in presentation.

Desktop: - Table + Right Detail Panel

Tablet: - Responsive Table

Mobile: - Card List → Full Screen Detail

These are different layouts consuming the same data.

They must not become separate applications.

------------------------------------------------------------------------

# Validate the Inspection Documents

Review every inspection document and verify each conclusion against the
codebase.

Determine:

-   Which findings are correct.
-   Which findings are partially correct.
-   Which recommendations should be adjusted.
-   Whether there are additional architectural issues not mentioned.

If you discover better solutions than those suggested in the inspection
documents, prefer the better architecture.

------------------------------------------------------------------------

# Areas to Audit

## Routing

Investigate whether mobile navigation destroys shared state.

Determine whether route transitions recreate hooks unnecessarily.

Check whether selected entities can be maintained without duplicating
state.

## Shared State

Review all shared hooks, including:

-   useDiscordDirectory
-   useMembersDirectory

Verify that filtering, pagination, search, selection, and processed data
exist only once.

## Detail View Architecture

Review how detail pages are implemented.

Determine whether desktop detail panels and mobile detail views share
the same processing logic.

If duplicated logic exists, consolidate it.

## URL State

Ensure navigation preserves:

-   search
-   filters
-   pagination
-   sorting
-   selected member

Avoid resetting the page after returning from detail views.

## Deep Linking

Preserve deep-link capability wherever practical.

Do not remove useful routing capabilities unless absolutely necessary.

If deep links are preserved, integrate them into the shared state
architecture instead of creating separate logic.

## Scroll Restoration

Ensure users retain:

-   scroll position
-   current page
-   filters
-   selected item

when returning from detail views.

## Responsive Layout Audit

Review:

-   fixed widths
-   min-width usage
-   overflow issues
-   flex wrapping
-   grid responsiveness
-   sticky elements
-   table overflow
-   drawer behavior
-   viewport sizing
-   mobile spacing
-   breakpoint consistency

Do not assume routing is the only cause of mobile regressions.

------------------------------------------------------------------------

# Reusability

The final architecture should be reusable for future Admin modules.

Avoid module-specific solutions.

------------------------------------------------------------------------

# Important Constraints

Do NOT change:

-   backend architecture
-   business rules
-   membership logic
-   payment logic
-   Discord synchronization logic
-   API contracts

This task is strictly a frontend architecture refactor.

------------------------------------------------------------------------

# Desired End Result

After the refactor:

-   Desktop and mobile consume the same processed state.
-   No duplicated business logic exists.
-   Navigation preserves search, filters, pagination, selection, and
    browsing context.
-   Deep-linking remains supported where practical.
-   Responsive layouts behave consistently across breakpoints.
-   Shared hooks become the single source of truth.
-   The architecture becomes reusable across all Admin modules.

------------------------------------------------------------------------

# Deliverables

Provide a final report containing:

1.  Every architectural issue fixed.
2.  Every inspection finding confirmed.
3.  Every recommendation modified or rejected (with reasoning).
4.  Additional issues discovered.
5.  Files modified.
6.  Explanation of the new responsive architecture.
7.  Reusable patterns created.
8.  Remaining technical debt (if any).

Do not stop after making the code compile.

The objective is to leave the TraderCity Admin Dashboard with a robust,
scalable, maintainable, and reusable responsive architecture that
becomes the standard for all future Admin modules.
