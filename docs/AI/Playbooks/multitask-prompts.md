# TraderCity Multitask Prompt Templates

> **Living playbook** — update as Cursor multitask behavior, codebase layout, or phase scope changes. Copy-paste templates for parallel agent workstreams.

## Related docs

| Doc | Path |
|-----|------|
| Agent rules | `AGENTS.md` |
| Homepage blueprint | `docs/Frontend/Homepage_Design_Engineering_Blueprint.md` |
| Admin dashboard analysis | `docs/admin-dashboard-ui-analysis/` |
| Homepage pass | `docs/AI/Playbooks/homepage-pass.md` |
| Prompt library | `docs/AI/Playbooks/prompt-library.md` |
| Frontend constitution | `docs/Universal/TraderCity_Frontend_Constitution_V1.md` |
| Architecture rules | `docs/Universal/TraderCity_Architecture_Rules.md` |

Two parallel workstreams for homepage refinement and admin dashboard (payments & subscriptions), grounded in repo docs and current codebase layout.

---

## 1. How to Launch Both Agents

### Exact `/multitask` invocation

Open the **Agents Window** and send:

```
/multitask

Run TWO parallel workstreams in separate worktrees:

**Workstream A — Homepage Refinement**
Branch: refine/homepage-phase-1-2
Worktree: yes (isolated)
Scope: src/app/page.tsx, src/components/home/**, src/components/pricing/**, src/app/globals.css, src/app/layout.tsx

[Paste full Agent A prompt from Section 3 below]

---

**Workstream B — Admin Dashboard (Payments & Subscriptions)**
Branch: feat/admin-payments-subscriptions
Worktree: yes (isolated)
Scope: src/components/admin/**, src/app/admin/**, src/types/admin/**, src/lib/admin/** (NEW paths only — read pricing/payment-activation/dashboard for alignment, do not modify)

[Paste full Agent B prompt from Section 4 below]
```

### Worktree recommendation

| Workstream | Use worktree? | Why |
|------------|---------------|-----|
| **Agent A** | **Yes** | Touches `globals.css`, `layout.tsx`, and 30+ homepage files |
| **Agent B** | **Yes** | Creates new admin routes/components; avoids blocking homepage work |

**Setup per agent:**
1. In Agents Window → start new agent → set context to **Worktree**
2. Base branch: `main` (or your current integration branch)
3. Branch names: `refine/homepage-phase-1-2` and `feat/admin-payments-subscriptions`

If Cursor auto-decomposes `/multitask`, confirm each subagent gets its own worktree before approving.

### Agents Window tips

- **Pin both agents** in the sidebar so you can switch without losing context
- **Review plans separately** — approve Agent A's token/spacing plan before Agent B's admin shell plan
- **Test via "Move to foreground"** — bring one worktree into your main checkout to preview; don't merge both at once
- **Merge order:** Agent A first (foundation tokens), then Agent B (can consume shared tokens in Phase 5 later)
- **Do not use multi-root workspaces** for this split — both agents target the same repo but different directories

---

## 2. Shared Constraints (Both Agents)

Both agents must read and follow:

| Document | Path |
|----------|------|
| Agent rules | `AGENTS.md` |
| Product context | `PROJECT_CONTEXT.md` |
| Frontend constitution | `docs/Universal/TraderCity_Frontend_Constitution_V1.md` |
| Architecture rules | `docs/Universal/TraderCity_Architecture_Rules.md` |

### Mission (both)

Act as Senior Frontend Engineer + Product Designer. **Increase perceived premium quality without changing the product vision.**

### Design philosophy

Less is more. Premium over flashy. Reference: Apple, Stripe, Linear, Raycast, Vercel — not crypto-casino aesthetics.

### Tech stack (non-negotiable)

- Next.js 16, React 19, TypeScript 5 (strict), Tailwind CSS 4, Tabler Icons
- Path alias: `@/*` → `./src/*`

### Allowed (both)

- Refactor components, improve spacing/typography/hierarchy/responsiveness/accessibility
- Subtle animation improvements
- Create reusable components
- Modular architecture under `src/components/`

### Forbidden (both)

- **Change backend** (NestJS, Prisma, API modules)
- **Modify routing** beyond explicitly scoped new admin routes (Agent B only)
- **Install packages without approval**
- **Remove existing sections** (homepage) or **rewrite working architecture**
- Standalone HTML, jQuery, Bootstrap, random UI libraries, local-storage mock backends
- Invent alternative architectures or fake databases

### Workflow (both)

1. Analyze → 2. Explain plan → 3. Implement → 4. Verify desktop/mobile → 5. Review code quality

### Brand colors (Constitution)

- Deep Space Navy `#05081A`, Purple `#9B5DE5`, Indigo `#5E5CE6`, Cyan `#06D6F7`, Gold `#D4AF37`

### Backend assumptions (do NOT invent)

NestJS modular monolith, Prisma/PostgreSQL, JWT + RBAC, Stripe + USDT crypto, roles: Guest / Free / VIP / Analyst / Admin

---

## 3. Agent A — Homepage Refinement

### Copy-paste prompt

```
You are Agent A — Homepage Refinement for TraderCity.

## Mission
Refine the existing homepage to maximize perceived premium quality. This is a REFINEMENT pass, NOT a redesign. Every section must feel like one operating system — not isolated landing page blocks.

## Scope Boundaries
IN SCOPE:
- src/app/page.tsx
- src/app/globals.css
- src/app/layout.tsx (metadata only — no routing changes)
- src/components/home/** (all 8 mounted sections + ecosystem-lite)
- src/components/pricing/** (shared with homepage Pricing section)

OUT OF SCOPE:
- src/components/admin/**, src/app/admin/** (Agent B owns these)
- src/components/dashboard/** (member dashboards — do not touch)
- src/components/login/**, src/components/payment-activation/** (unless a Phase 1 bug blocks homepage images)
- Backend, API routes, Prisma, NestJS
- Do NOT mount EcosystemDetailed.tsx without explicit product approval (orphan component per blueprint)

## Required Reading (in order)
1. docs/AI/Agents/Homepage/00_Homepage_Refinement_Strategy.md — strategy (phases, passes, debt register)
2. docs/AI/Agents/Homepage/11_Code_Implementation_Guide.md — **sprint execution guide** (file-level tasks, acceptance criteria)
3. docs/AI/Agents/Homepage/10_Repository_Aware_Homepage_Engineering_Reference.md — live codebase map and P1–P3 priorities
4. docs/Frontend/Homepage_Design_Engineering_Blueprint.md — read "Before You Change Anything"
5. AGENTS.md
6. PROJECT_CONTEXT.md
7. docs/Universal/TraderCity_Frontend_Constitution_V1.md
8. docs/AI/Playbooks/homepage-pass.md
9. docs/AI/Playbooks/prompt-library.md (match Premium/Typography/Spacing pass style)

## Allowed Changes
- Typography, spacing, hierarchy, card polish, shadows, borders, consistency
- Responsive layout improvements
- Subtle Framer Motion refinements (already in stack)
- Extract design tokens to globals.css @theme or constants
- Reuse/extract components (e.g., SectionEyebrow)
- Fix code hygiene: CommunityIllustratiion typo, PricingBackground export name, commented blocks
- Accessibility: contrast, focus states, keyboard nav on Analyst carousel
- Restore public/images/ assets, migrate to next/image where applicable

## Forbidden Changes
- Add, remove, or reorder homepage sections
- Change copy/messaging or CTAs (/login?plan=free, /pricing destinations stay)
- Modify routing or install packages without approval
- Rewrite Background/Content section architecture pattern
- Change backend or create mock API layers for homepage data
- Mount EcosystemDetailed.tsx

## Narrative Spine (preserve)
Hero → Problem Awareness (03) → Trader Solution (04) → Analyst Team (05) → Community (06) → Membership (07) → Research Framework (08) → Pricing

Core positioning: "One Ecosystem. Multiple Experts."

## Suggested Phased Tasks

### Phase 1 — Foundation (do first)
Align to blueprint Section 12, Phase 1:
- [ ] Extract color/spacing tokens to @theme inline in globals.css
- [ ] Wire Geist Sans to body in globals.css
- [ ] Update layout.tsx metadata (title, description, OG) to TraderCity branding
- [ ] Restore public/images/ — fix broken Community/Knowledge Vault images
- [ ] Fix Community margin typo (sm:-mt-6 lg:-mt-8), PricingBackground export name
- [ ] Remove large commented iteration blocks
- [ ] Rename CommunityIllustratiion.tsx → CommunityIllustration.tsx (update imports)

### Phase 2 — Polish (after Phase 1)
Align to blueprint Section 12, Phase 2 + Section 10:
- [ ] Define and apply type scale (display-lg, display-md, body, caption)
- [ ] Normalize section vertical spacing rhythm (preserve Hero min-h-screen)
- [ ] Unify glass card recipe across Analyst, Membership, Pricing cards
- [ ] Standardize borders, shadows, backdrop blur
- [ ] Create reusable <SectionEyebrow /> (number + divider + label)
- [ ] Unify icon library (pick Tabler OR Lucide — not both arbitrarily)
- [ ] Review Trader Solution compressed py-2 lg:py-6 spacing

DO NOT start Phase 3+ (motion, depth, cohesion) unless Phase 1-2 are complete and verified.

## Verification Checklist
Desktop (1280px+, 1440px):
- [ ] All 8 sections render in correct order with no layout breaks
- [ ] Hero min-h-screen and fold transition to Problem Awareness intact
- [ ] Analyst carousel, Research Framework terminal, Pricing plan selector work
- [ ] Typography hierarchy reads consistently section-to-section
- [ ] No broken images; Geist Sans renders on body

Mobile (375px, 390px):
- [ ] Hero ecosystem nodes and scroll area usable
- [ ] Analyst carousel dot nav works
- [ ] Membership comparison grid stacks cleanly
- [ ] Research Framework terminal scrolls without overflow
- [ ] Pricing CTA tappable with visible focus states

Quality:
- [ ] TypeScript strict — no new errors
- [ ] No section additions/removals/reorders
- [ ] No new packages installed
- [ ] Background/Content decomposition preserved in every section

## Branch / Worktree
Branch: refine/homepage-phase-1-2
Work in isolated worktree. Do not edit src/components/admin/** or src/app/admin/**.

## Deliverables
1. Brief plan before implementing
2. Phase 1 complete with verification notes
3. Phase 2 improvements with before/after summary
4. List any items deferred to Phase 3+ with rationale
```

---

## 4. Agent B — Admin Dashboard (Payments & Subscriptions)

### Member journey reference architecture (read before coding)

Agent B creates **new** admin paths but must align with the existing member journey. Study these flows first — they define what admin verifies and what dashboards display.

#### Shared architectural pattern (all member surfaces)

| Pattern | Implementation |
|---------|----------------|
| **Shell** | `*Background.tsx` (absolute grid overlay) + `*Content.tsx` (relative z-10) composed in parent `*.tsx` |
| **Page route** | Thin `src/app/**/page.tsx` — imports and renders the shell component only |
| **Client split** | Interactive surfaces use `"use client"` (`PricingContent.tsx`); dashboards and payment-activation Content are server-safe React with inline subcomponents |
| **Data** | Inline typed arrays/objects at top of Content files (`plans`, `mockMembership`, `membershipData`) — no shared lib yet |
| **Icons** | Lucide React throughout member flows |
| **Motion** | Framer Motion on pricing plan cards only; payment-activation uses CSS `animate-*` and subtle glows |
| **Card recipe** | Dark panels (`#0C0D12`, `#10141D`, `#0c0814`), `border border-*-900/30`, `rounded-2xl`/`rounded-3xl`, uppercase eyebrow labels |

#### Pricing (`/pricing`)

| File | Role |
|------|------|
| `src/app/pricing/page.tsx` | Route entry — renders `<Pricing />` |
| `src/components/pricing/Pricing.tsx` | `PricingBackground` + `PricingContent` shell |
| `src/components/pricing/PricingBackground.tsx` | Grid overlay background (note: export name typo `LoginBackground` — Agent A hygiene, do not fix unless approved) |
| `src/components/pricing/PricingContent.tsx` | Plan selector, features list, CTA |

**Inline `plans` array** (default selected: `quarterly`):

| id | name | price | period | duration | notes |
|----|------|-------|--------|----------|-------|
| `monthly` | MONTHLY | $50 | / month | 30 DAYS | `oldPrice: $60`, badge "FIRST MEMBERSHIP OFFER", gold accent |
| `quarterly` | QUARTERLY | $150 | / 3 months | 90 DAYS | `isPopular`, save $30, old $180 |
| `yearly` | YEARLY | $500 | / year | 365 DAYS | save $220, old $720 |

**Shared VIP features** (all plans): Full Discord Access, Daily Micro-structure and Orderflow Analysis, Weekly BTC Quant Reports, Complete (400+) Microstructure Report Archive, Complete (100+) Learning Framework, Access All Analysts Calls and Context.

**CTA:** `Become a VIP Member` → `/login?plan=free` (preserve existing routing — admin does not change this).

Also mounted on homepage via `src/app/page.tsx` — Agent A owns that mount; Agent B reads pricing data only.

#### Payment activation (`/payment-activation`)

| File | Role |
|------|------|
| `src/app/payment-activation/page.tsx` | Wraps `<PaymentActivation />` in `main` with `bg-[#0A0D14]` |
| `src/components/payment-activation/PaymentActivation.tsx` | Background + Content shell |
| `src/components/payment-activation/PaymentActivationContent.tsx` | Orchestrates Hero + Journey + 3 section components |
| `src/components/payment-activation/sections/PaymentSection.tsx` | QR, wallet, submission form |
| `src/components/payment-activation/sections/VerificationSection.tsx` | Member-side pending verification UI |
| `src/components/payment-activation/sections/ResultSection.tsx` | VIP access outcome states |

**3-step journey** (inline `JourneySection` in Content): (1) Payment Information → (2) Verification Status → (3) VIP Access.

**`membershipData` in PaymentSection** (what admin later verifies):

```ts
{ plan: "VIP Monthly", price: "$60", network: "BNB Smart Chain (BEP20)",
  currency: "USDT", walletAddress: "0xA43D...7aB8c9DaE7F8a9B0c3D5e6F7a889c" }
```

**Member submits:** Discord Username + Transaction Hash (TXID). **CTA:** `I've Completed Payment`.

**VerificationSection states:** `PENDING` | `PROCESSING` | `VERIFIED` | `FAILED`. Timeline steps: Transaction Submitted → Transaction Detected → Awaiting Verification. Displays truncated TX hash.

**ResultSection states:** `dormant` | `active` | `issue`. Active unlocks Membership, Discord Access, VIP Dashboard, Premium Content — CTA `Enter VIP Dashboard` → `/dashboard/vip`. Issue shows Recheck Transaction / Submit New Hash.

> **Price alignment note:** Member pricing page shows Monthly $50 (first-offer); PaymentSection hardcodes $60. Arena admin docs use $150/$400/$1,400/$2,000. Admin types should support backend enum prices (Arena contract) while displaying member-facing labels where relevant. Document mismatches as TODO — do not silently invent a fourth price set.

#### Free dashboard (`/dashboard/free`)

| File | Role |
|------|------|
| `src/app/dashboard/free/page.tsx` | Route entry |
| `src/components/dashboard/free/FreeDashboard.tsx` | Background + Content shell |
| `src/components/dashboard/free/FreeDashboardContent.tsx` | All sections + inline mock data |

**Theme:** Purple (`#050308` base, purple borders/accents).

**Mock data shapes:** `mockUser`, `mockHeroStatus` (memberSince, currentPlan: "Free Member", welcomeCredit $10, discordStatus), `mockComparison` (free vs vip feature lists), `mockReferral`.

**Sections:** `DashboardHeader` → `FreeHeroSection` → `AccessComparisonSection` (Free 15/400 reports, 15/200 lessons vs VIP full access) → `JourneySection` (Observe → Learn → Participate → Upgrade) → `ReferralCentre` → `UpgradeCTASection` ($50 today with $10 credit) → `PricingPlansSection` (Quarterly $150, Yearly $500).

**Free capabilities:** Free Discord Access, Community Discussions, Public Market Analysis, Limited Reports (15/400), Limited Lessons (15/200).

#### VIP dashboard (`/dashboard/vip`)

| File | Role |
|------|------|
| `src/app/dashboard/vip/page.tsx` | Route entry |
| `src/components/dashboard/vip/VipDashboard.tsx` | Background + Content shell |
| `src/components/dashboard/vip/VipDashboardContent.tsx` | All sections + inline mock data |

**Theme:** Gold/yellow (`#050505` base, yellow borders/accents).

**`mockMembership`:** joinedDate, status "VIP Active", daysRemaining (23), paymentMethod "Crypto (USDT)" / "via Binance Pay", nextBillingDate, currentPlan "VIP Monthly", accessType "Intelligence + Community".

**Sections:** `DashboardHeader` → `VipHeroSection` (membership status grid: Joined, Status, Days Remaining, Payment Method, Next Billing, Member Access) → `AccessGrid` (10 granted features) → `ReferralCentre` → `RenewalCentre` (days remaining urgency, Renew Membership CTA) → `DashboardFooter`.

**VIP capabilities (admin should reflect in subscription records):** Full Discord Community, Complete Report Archive (400+), Complete Learning Framework (100+), All Analyst Sections, Weekly Crypto/BTC Microstructure/Orderflow Reports, Market Context Intelligence, VIP Events & Workshops.

#### Admin ↔ member alignment map

| Member surface | Admin responsibility |
|----------------|---------------------|
| PaymentSection submission (Discord + TX hash + plan + USDT amount) | Payment Verification queue — approve/reject, copy hash, match plan/amount |
| VerificationSection timeline + PENDING badge | Admin action moves member from Awaiting Verification → SUCCESS |
| ResultSection `active` → VIP Dashboard | Members table status Active + plan assignment; days remaining populated |
| Free dashboard `currentPlan: "Free Member"` | Members filter/category Standard; limited access flags |
| VIP dashboard `daysRemaining`, `nextBillingDate`, `currentPlan` | Members table Days Left (color-coded), Expires, Renew count |
| Pricing plan ids (`monthly`/`quarterly`/`yearly`) | Members Plan column + payment auto-fill on Add/Edit modal |

---

### Copy-paste prompt

```
You are Agent B — Admin Dashboard for TraderCity (Payments, Subscriptions, User Management).

## Mission
Design and implement premium admin frontend UI for crypto payment verification, subscription management, and member CRUD. Frontend-only — integrate with existing NestJS backend architecture. Mirror and extend the existing member journey (pricing → payment-activation → dashboards) — do NOT invent backend modules or APIs.

## Scope Boundaries
IN SCOPE (create NEW paths only):
- src/components/admin/** — admin UI components
- src/app/admin/** — admin routes (payment verification, members)
- src/types/admin/** — TypeScript interfaces matching backend contracts
- src/lib/admin/** — hooks, formatters, API client stubs designed for NestJS integration

REFERENCE ONLY — READ patterns, do NOT modify (unless fixing a shared type conflict with explicit approval):
- src/components/pricing/** — plan prices, features, CTA destinations (Agent A owns edits)
- src/components/payment-activation/** — member checkout + verification flow
- src/components/dashboard/free/** — free member capabilities + mock data shapes
- src/components/dashboard/vip/** — VIP member capabilities + subscription display fields
- src/app/pricing/page.tsx, src/app/payment-activation/page.tsx, src/app/dashboard/free/page.tsx, src/app/dashboard/vip/page.tsx

OUT OF SCOPE:
- src/components/home/**, src/app/page.tsx, src/app/globals.css (Agent A owns homepage tokens)
- src/components/pricing/** edits (Agent A)
- Backend/NestJS/Prisma schema changes
- src/app/layout.tsx routing restructure
- Net-new admin modules: referrals, education CMS, audit logs, notifications, support, role management (document as future work only)

## Required Reading (in order)

### Docs
1. docs/Universal/TraderCity_Architecture_Rules.md
2. docs/Universal/TraderCity_Frontend_Constitution_V1.md
3. AGENTS.md + PROJECT_CONTEXT.md
4. docs/admin-dashboard-ui-analysis/README.md
5. docs/admin-dashboard-ui-analysis/03_Subscription_Interface.md
6. docs/admin-dashboard-ui-analysis/04_Payment_Interface.md
7. docs/admin-dashboard-ui-analysis/05_User_Management_Interface.md
8. docs/admin-dashboard-ui-analysis/06_Management_Workflows.md
9. docs/admin-dashboard-ui-analysis/07_UI_Patterns.md
10. docs/admin-dashboard-ui-analysis/10_TraderCity_Interface_Ideas.md

### Member flow code (study architecture + data before admin UI)
11. src/components/pricing/Pricing.tsx + PricingContent.tsx — plan ids, prices, features, Framer Motion card pattern
12. src/components/payment-activation/PaymentActivationContent.tsx + sections/PaymentSection.tsx — submission fields admin verifies
13. src/components/payment-activation/sections/VerificationSection.tsx — member PENDING timeline (admin is the "Awaiting Verification" actor)
14. src/components/payment-activation/sections/ResultSection.tsx — post-approval member states (active → /dashboard/vip)
15. src/components/dashboard/free/FreeDashboardContent.tsx — free vs VIP comparison, upgrade CTAs
16. src/components/dashboard/vip/VipDashboardContent.tsx — membership status grid, days remaining, renewal, access items

## Reuse member architecture in admin UI
- **Background + Content decomposition** — admin pages: AdminBackground (or layout-level grid) + page Content orchestrator
- **Inline typed data** — seed admin tables/modals with shapes matching member mock data until NestJS hooks land
- **Card/status badge vocabulary** — reuse member color semantics: purple=free/pending, gold/yellow=VIP, emerald=active/success, amber=warning/expiry, blue=verification queue
- **Lucide icons** — match member dashboards (Crown, Shield, Calendar, Bitcoin, etc.)
- **Framer Motion** — optional, subtle only (pricing uses whileHover scale 1.01); prefer CSS transitions for admin tables/modals
- **Client/server** — keep admin layout server-friendly; isolate interactive tables/modals in `"use client"` leaf components

## Data alignment (member UI vs Arena backend contract)

### Member-facing plan prices (src/components/pricing/PricingContent.tsx)
| Plan id | Display | Duration |
|---------|---------|----------|
| monthly | $50 (first offer, was $60) | 30 DAYS |
| quarterly | $150 (most popular) | 90 DAYS |
| yearly | $500 | 365 DAYS |

PaymentSection hardcodes VIP Monthly at $60 — treat as legacy mock; align admin payment rows to submitted amount + plan label.

### Arena/backend plan prices (docs/admin-dashboard-ui-analysis/03 — NestJS contract)
Monthly $150 | 3 Months $400 | 1 Year $1,400 | Lifetime $2,000 | Custom
Categories: Standard (plan-driven) | VIP (auto Lifetime, ∞ days, $0, forced Active)

### Payment flow alignment (member → admin)
| Step | Member file | Admin mirror |
|------|-------------|--------------|
| Submit payment | PaymentSection: Discord Username, TXID, USDT wallet/QR | Payment Verification table: Merchant, hash (copy), plan, amount |
| Await verification | VerificationSection: PENDING + timeline | Awaiting Approval stat card + VERIFIED_ON_CHAIN filter |
| Approve | — | Approve modal → SUCCESS |
| Access granted | ResultSection: active → Enter VIP Dashboard | Members: Active status, plan, days remaining |
| Issue | ResultSection: issue → Recheck / Submit New Hash | REJECTED badge + reject reason UI (TraderCity improvement) |

### Dashboard fields admin must manage
From VipDashboardContent `mockMembership`: joinedDate, status, daysRemaining, paymentMethod, nextBillingDate, currentPlan, accessType.
From FreeDashboardContent `mockHeroStatus`: currentPlan "Free Member", welcomeCredit, discordStatus.

## Backend Integration Assumptions (DO NOT INVENT)
Assume these already exist in NestJS — design frontend to consume them:
- Auth: JWT access + refresh token rotation, RBAC (Admin role required)
- Payments: Stripe + Crypto (USDT BEP20 on-chain verification)
- ORM: Prisma + PostgreSQL
- User roles: Guest, Free Member, VIP Member, Analyst, Admin

Payment statuses (map to backend enums + member VerificationSection):
- PENDING — member submitted, not yet on-chain verified
- VERIFIED_ON_CHAIN — on-chain verified, admin sign-off pending (primary work queue)
- SUCCESS — approved; member ResultSection → active
- FAILED — on-chain or processing failure
- REJECTED — admin rejected (design reject UI; stub if endpoint TODO)

DO NOT:
- Create mock localStorage databases
- Invent Prisma models or NestJS controllers
- Build fake API endpoints in Next.js route handlers unless explicitly approved
- Assume backend modules that aren't documented — use typed hooks with TODO comments for NestJS service integration

## Target Admin Modules (Phase 1 UI)

### Module 1: Payment Verification
Route: /admin/payment-verification
Based on: docs/admin-dashboard-ui-analysis/04_Payment_Interface.md + PaymentSection/VerificationSection
- Hero banner + 4 stat cards (Total, Awaiting Approval, Completed, Failed)
- Transaction table: Date, Merchant (Discord @username — matches PaymentSection field), Plan (monthly/quarterly/yearly labels), Amount (USDT), Transaction hash (copy), Status badge, Approve action
- Status pill filters: All, PENDING, VERIFIED, SUCCESS, FAILED
- Search: Discord username, tx hash, wallet address (matches member submission fields)
- Approve confirmation modal before irreversible action
- TraderCity improvement: Reject with reason field (UI shell + TODO if backend not ready)

### Module 2: Members (User + Subscription Management)
Route: /admin/members
Based on: 03, 05, 06 + Free/Vip dashboard mock data
- Member table: Name, Username, Category (VIP badge), Plan, Joined, Expires, Status, Days Left (color-coded like RenewalCentre), Renew count, Amount (privacy toggle)
- Filters: search, status dropdown (Active/Expired/Suspended/Left/VIP/Hidden/New Joiners), date range, clear
- Toolbar: Add User, Export CSV, Refresh, revenue visibility toggle
- Add/Edit modal: identity + subscription fields, plan-driven payment auto-fill (Arena prices), VIP overrides ($0, Lifetime, ∞)
- Delete confirmation modal
- Member Detail drawer: Profile / Subscription / Payments tabs — Subscription tab mirrors VipDashboard membership grid; Payments tab links to verification records

### Admin Shell (minimal)
Based on: 02_Interface_Modules.md, 07_UI_Patterns.md
- Collapsible sidebar (Dashboard, Members, Payment Verification)
- Top navbar with theme toggle, admin avatar dropdown
- Toast feedback pattern (copy hash, approve success)
- TraderCity brand: Deep Space Navy #05081A, institutional tone — NOT Arena copy-paste
- Grid background optional in admin layout — echo member Background pattern without coupling to member files

## Allowed Changes
- Create new admin component architecture under src/components/admin/
- Create admin routes under src/app/admin/
- TypeScript interfaces for admin data shapes (align with member mock shapes + Arena enums)
- API hooks with clear NestJS integration points
- Reuse member UI patterns (card recipe, status badges, stat grids) — implement in src/components/admin/ui/ locally
- Responsive admin layout (desktop-first, mobile drawer sidebar)

## Forbidden Changes
- Modify homepage files (src/components/home/**, src/app/page.tsx)
- Modify pricing, payment-activation, or dashboard member files
- Change globals.css design tokens (coordinate with Agent A — use admin-scoped Tailwind or admin layout CSS variables)
- Backend/NestJS/Prisma changes
- Install packages without approval
- Implement referrals CMS, audit logs, notifications, support, role management (scope creep)
- Copy Arena branding ("Arena Admin Dashboard") — use TraderCity

## Suggested Task Breakdown
1. **Study member flows** — read 6 reference file groups above; note plan ids, submission fields, dashboard status fields
2. **Scaffold admin shell** — src/app/admin/layout.tsx, sidebar, navbar, optional grid background
3. **Shared admin primitives** — StatusBadge, StatCard, FilterCard, DataTable, ConfirmModal, RevenuePrivacyToggle (mirror member badge colors)
4. **Types + hooks** — src/types/admin/*.ts (PaymentRecord, MemberRecord aligned to PaymentSection + mockMembership), src/lib/admin/hooks/*.ts with NestJS TODOs
5. **Payment Verification page** — stat cards, table columns matching PaymentSection output, filters, approve/reject modals, copy hash
6. **Members page** — table mirroring dashboard subscription fields, filters, add/edit/delete modals with VIP override
7. **Member Detail drawer** — Profile / Subscription / Payments tabs (typed seed data from member mocks)
8. **Cross-module links** (UI only, mark TODO): payment row → member profile; member row → payment history; approved payment → reflects in VIP days remaining

## Verification Checklist

### Member journey alignment
- [ ] Payment table columns match PaymentSection submission (Discord username, TX hash, plan, USDT amount, BEP20 network)
- [ ] Approve flow conceptually unlocks ResultSection active state → VIP dashboard fields (Active status, plan, days remaining)
- [ ] Members table Days Left uses same urgency colors as VipDashboard RenewalCentre (red <7, amber <30, green otherwise; VIP ∞)
- [ ] Plan labels consistent with pricing ids (monthly/quarterly/yearly) plus Arena backend enums documented in types
- [ ] Free vs VIP category behavior matches dashboard comparison (Standard vs VIP Lifetime override)

### Admin UI (desktop 1280px+)
- [ ] Admin shell renders with sidebar nav and collapsible behavior
- [ ] Payment Verification: stat cards, table, filters, approve modal flow
- [ ] Members: table with all columns, add/edit modal with VIP override behavior
- [ ] Status badges match color system (Active=emerald, Expired=rose, Suspended=amber, PENDING=amber, VERIFIED_ON_CHAIN=blue)

### Mobile (375px)
- [ ] Sidebar becomes drawer overlay
- [ ] Tables scroll horizontally or stack gracefully
- [ ] Modals usable on small screens

### Integration readiness
- [ ] No localStorage mock persistence
- [ ] Types align with Architecture Rules (Stripe + USDT BEP20, RBAC)
- [ ] Hooks have clear TODO comments for NestJS endpoints
- [ ] No homepage, pricing, payment-activation, or dashboard member files modified
- [ ] Price alignment mismatches documented in types/comments (member $50/$150/$500 vs Arena $150/$400/$1,400/$2,000 vs PaymentSection $60)

### Quality
- [ ] TypeScript strict
- [ ] No new packages without approval
- [ ] TraderCity brand tone — institutional, not crypto-casino
- [ ] Background + Content pattern used for admin page shells

## Branch / Worktree
Branch: feat/admin-payments-subscriptions
Work in isolated worktree. Do not edit src/components/home/**, src/app/page.tsx, src/components/pricing/**, src/components/payment-activation/**, or src/components/dashboard/**.

## Deliverables
1. Architecture plan referencing member flow file paths and admin↔member alignment map
2. Admin shell + Payment Verification page
3. Members page with CRUD modals
4. Member Detail drawer (shell)
5. Types and hook stubs for NestJS integration (with price alignment notes)
6. List of backend endpoints needed (documentation only — do not implement backend)
```

---

## 5. Coordination Rules

### Directory ownership (no shared edits)

| Path | Owner | Other agent |
|------|-------|-------------|
| `src/components/home/**` | Agent A | **Do not touch** |
| `src/components/pricing/**` | Agent A | Agent B **read-only** (plan data reference) |
| `src/components/payment-activation/**` | Neither (frozen) | Agent B **read-only** (payment flow reference) |
| `src/app/payment-activation/page.tsx` | Neither (frozen) | Agent B **read-only** |
| `src/app/pricing/page.tsx` | Agent A | Agent B **read-only** |
| `src/app/page.tsx` | Agent A | **Do not touch** |
| `src/app/globals.css` | Agent A | Agent B uses admin-scoped styles only |
| `src/app/layout.tsx` | Agent A (metadata) | Agent B creates `src/app/admin/layout.tsx` instead |
| `src/components/admin/**` | Agent B | **Do not touch** |
| `src/app/admin/**` | Agent B | **Do not touch** |
| `src/types/admin/**`, `src/lib/admin/**` | Agent B | **Do not touch** |
| `src/components/dashboard/**` | Neither (frozen) | Agent B **read-only** (free/vip subscription display reference) |
| `src/app/dashboard/free/page.tsx`, `src/app/dashboard/vip/page.tsx` | Neither (frozen) | Agent B **read-only** |
| `package.json` | Neither without approval | Coordinate before any dependency |

### Merge order

1. **Merge Agent A first** (`refine/homepage-phase-1-2`) — establishes design tokens in `globals.css`
2. **Rebase Agent B** onto updated main — adopt shared tokens if Agent A extracted them
3. **Resolve conflicts only in shared files** — ideally zero if rules were followed

### Communication between agents

- If Agent B needs a shared `<StatusBadge />` in `src/components/ui/`, **wait until Agent A finishes Phase 2** or duplicate locally in `src/components/admin/ui/` temporarily
- Agent B must **not** edit `globals.css` — use Tailwind arbitrary values or admin layout CSS variables
- Agent B must **not** edit member journey files (`pricing/`, `payment-activation/`, `dashboard/`) — copy patterns into `src/components/admin/` instead
- When admin types need plan prices, import constants from a future shared module only after both agents merge; until then duplicate with TODO comments noting member vs Arena price sets
- Document deferred cross-surface token sharing (Blueprint Phase 5) for a future single-agent pass

### Conflict signals (stop and coordinate)

- Both agents editing the same file
- Both creating `src/components/ui/`
- Either agent modifying routing outside their scope
- Either agent installing packages

---

## 6. Example `/multitask` One-Liners

### 1. Homepage + Admin (default scenario)

```
/multitask Agent A: Phase 1-2 homepage refinement per docs/Frontend/Homepage_Design_Engineering_Blueprint.md (tokens, typography, spacing, glass cards). Agent B: Admin payment verification + members CRUD per docs/admin-dashboard-ui-analysis/ — separate worktrees, no shared file edits.
```

### 2. Homepage polish only (split by section)

```
/multitask Agent A: Polish Hero + Problem Awareness + Trader Solution (typography, spacing, SectionEyebrow extraction). Agent B: Polish Analyst Team + Community + Membership (glass cards, carousel a11y, responsive fixes). Both follow homepage-pass.md, worktrees required.
```

### 3. Admin payments deep-dive + homepage Phase 1 foundation

```
/multitask Agent A: Homepage Phase 1 foundation only (globals.css tokens, layout metadata, fix broken images, code hygiene). Agent B: Full Payment Verification page + approve/reject workflow UI at /admin/payment-verification with NestJS-ready hooks.
```

### 4. Admin members + homepage spacing pass

```
/multitask Agent A: Homepage spacing + type scale pass (Phase 2) across all 8 sections. Agent B: Members table + add/edit modal + Member Detail drawer shell at /admin/members per admin-dashboard-ui-analysis docs.
```

### 5. Verification QA parallel pass

```
/multitask Agent A: Desktop/mobile QA pass on homepage — fix regressions only, no new features. Agent B: Desktop/mobile QA pass on admin payments + members — fix layout/a11y issues only, no backend work.
```

---

## Quick Reference: Current Codebase vs. Target

| Area | Route | Current state | Key files | Agent |
|------|-------|---------------|-----------|-------|
| Homepage | `/` | 8 sections + Pricing mount | `src/components/home/**`, `src/app/page.tsx` | A |
| Pricing | `/pricing` | Live — 3 plans ($50/$150/$500), plan selector, VIP features | `src/components/pricing/Pricing.tsx`, `PricingContent.tsx` | A (owns); B reads |
| Payment activation | `/payment-activation` | Live — 3-step flow: PaymentSection → VerificationSection → ResultSection | `src/components/payment-activation/**` (6 files) | B reads only |
| Free dashboard | `/dashboard/free` | Live — purple theme, free vs VIP comparison, upgrade CTA, referral | `src/components/dashboard/free/**` | B reads only |
| VIP dashboard | `/dashboard/vip` | Live — gold theme, membership grid, 10 access items, renewal centre | `src/components/dashboard/vip/**` | B reads only |
| Admin dashboard | `/admin/*` | **Not yet in `src/`** — docs only (`docs/admin-dashboard-ui-analysis/`) | Agent B creates `src/components/admin/**`, `src/app/admin/**` | B (creates new) |

### Member journey (end-to-end)

```
/pricing (select plan) → /login?plan=free → /payment-activation (submit Discord + TX hash)
  → VerificationSection PENDING → [admin approves at /admin/payment-verification]
  → ResultSection active → /dashboard/vip (or /dashboard/free for free members)
```

### Plan price sets (document all three — do not conflate)

| Source | Monthly | Quarterly / 3 Mo | Yearly / 1 Yr | Lifetime |
|--------|---------|------------------|---------------|----------|
| Member UI (`PricingContent.tsx`) | $50 | $150 | $500 | — |
| PaymentSection mock | $60 | — | — | — |
| Arena/backend contract (`03_Subscription_Interface.md`) | $150 | $400 | $1,400 | $2,000 |

Adjust branch names or phase scope in the one-liners to match what you want each agent to tackle first.
