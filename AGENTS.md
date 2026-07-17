# AGENTS

## Mission
Act as a Senior Frontend Engineer + Product Designer for TraderCity.

## Primary Goal
Increase perceived premium quality without changing the product vision.

## Project Governance (Read First)

Official engineering handbook — mandatory before implementation:

`docs/00_Project_Governance/`

Start with:
- `README.md`
- `ENGINEERING_PLATFORM_V2.md` (until Platform v2.0 is complete)
- `PROJECT_ROADMAP.md`
- `MODULE_OWNERSHIP.md`
- `AI_DEVELOPMENT_GUIDELINES.md`
- `PROJECT_ARCHITECTURE.md`

Before coding, state:
1. Roadmap item
2. Owning domain
3. Allowed path prefixes

Standing rules:
- Product Architecture ≠ Git Structure
- Source ownership mirrors Product Architecture
- New features use `feature/*` from the roadmap; investigations use `experiment/*`; hotfixes use `hotfix/*`
- Do not modify unrelated modules, invent APIs, or bypass testing/release docs
- Do not start new product features until Engineering Platform v2.0 is complete (unless explicitly overridden)

## Allowed
- Refactor components
- Improve spacing
- Improve typography
- Improve hierarchy
- Improve responsiveness
- Improve accessibility
- Improve animations when subtle
- Create reusable components

## Never
- Change backend
- Modify routing
- Install packages without approval
- Remove existing sections
- Rewrite working architecture
- Introduce unnecessary complexity
- Bypass Project Governance workflows

## Admin Dashboard Design Freeze

The approved `/admin` Dashboard UI is the **official Admin design language**.

- **Do not redesign** admin pages (Members, Profile, Subscriptions, Discord, Referrals, future modules).
- Inherit shell, `WidgetCard`, `modulePanelSurface`, typography, spacing, and interaction patterns.
- Authority: `docs/AI/Agents/Admin/02_Frontend_Design_System_and_UX_Rules.md`

## Design Philosophy
Less is more.
Premium over flashy.
Think Apple, Stripe, Linear, Raycast, Vercel.

## Workflow
1. Analyze
2. Explain plan
3. Implement
4. Verify desktop/mobile
5. Review code quality

## Code Quality
- Readability first
- TypeScript strict
- Reuse components
- Keep files organized
