# Analyst Frontend — Component Hierarchy

**Version:** 1.7  
**Status:** Active  
**Authority:** `docs/Analyst/03_Frontend/`  
**Module docs:** [`DIRECTORY_ARCHITECTURE.md`](./DIRECTORY_ARCHITECTURE.md) · [`DASHBOARD_ARCHITECTURE.md`](./DASHBOARD_ARCHITECTURE.md) · [`CONTROL_CENTER_ARCHITECTURE.md`](./CONTROL_CENTER_ARCHITECTURE.md) · [`REFERRALS_MODULE_ARCHITECTURE.md`](./REFERRALS_MODULE_ARCHITECTURE.md) · [`COMMISSIONS_MODULE_ARCHITECTURE.md`](./COMMISSIONS_MODULE_ARCHITECTURE.md) · [`APPLICATION_FLOW.md`](./APPLICATION_FLOW.md) · [`../07_Partner_Dashboard/`](../07_Partner_Dashboard/)  
**Last Updated:** July 26, 2026

---

## Source tree (implemented)

```text
src/app/analysts/
  page.tsx                              # Public landing
  apply/page.tsx                        # Apply form (RequireAuth)
  apply/success/page.tsx                # Confirmation
src/app/dashboard/application/page.tsx  # Member tracking

src/components/analysts/public/
  AnalystLandingPage.tsx
  AnalystApplyForm.tsx
  AnalystApplySuccess.tsx
  MemberAnalystApplicationCard.tsx
  MemberApplicationTracking.tsx

src/components/home/become-analyst/
  BecomeAnalyst.tsx                     # Homepage CTA below Pricing

src/app/admin/analysts/
  page.tsx                          # Dashboard
  directory/page.tsx                # Directory
  [id]/page.tsx                    # Control Center (Wave A)
  applications/page.tsx             # Applications domain (Waves B + D)
  applications/[id]/page.tsx       # Application / Onboarding mobile detail
  discord/page.tsx                  # Discord domain (Wave C)
  discord/[id]/page.tsx            # Discord mobile detail
  referrals/page.tsx                # Referrals domain (Wave E)
  referrals/[id]/page.tsx          # Referral Profile mobile
  commissions/page.tsx              # Commission domain (Wave F)
  commissions/[id]/page.tsx        # Commission Profile mobile
  verification|partnerships/page.tsx

src/components/analysts/sections/
  dashboard/
  directory/
    … AnalystDirectoryDetails.tsx   # + Referral + Commission Summary
  control-center/
    … ControlCenterDiscordPanel.tsx
    … ControlCenterReferralsPanel.tsx
    … ControlCenterCommissionsPanel.tsx  # Wave F
  applications/
    … OnboardingQueueTable.tsx · SystemProvisioningPanel.tsx
  discord/
    DiscordDomainPage.tsx …
  referrals/
    ReferralsDomainPage.tsx …
  commissions/
    CommissionsDomainPage.tsx
    CommissionDashboardView.tsx
    CommissionDirectoryTable.tsx
    CommissionDetails.tsx
    CommissionPayoutsView.tsx
    CommissionHistoryView.tsx
    CommissionDetailView.tsx
    CommissionsDomainNav.tsx
    CommissionFiltersBar.tsx

src/lib/analysts/
  mock/dashboard.ts
  mock/directory-analysts.ts
  mock/control-center.ts
  mock/applications.ts                # + createMockApplication · store subscribe · public persist
  mock/application-mutations.ts
  mock/public-application-submit.ts
  mock/member-application.ts
  mock/discord.ts
  mock/discord-mutations.ts
  mock/partnership-activation.ts
  mock/onboarding.ts
  mock/referrals.ts
  mock/referrals-mutations.ts
  mock/commissions.ts                 # Wave F
  mock/commissions-mutations.ts
  hooks/useAnalystsDirectory.ts
  hooks/useAnalystControlCenter.ts
  hooks/useAnalystApplications.ts
  hooks/useMemberAnalystApplication.ts
  hooks/useAnalystDiscord.ts
  hooks/useAnalystReferrals.ts
  hooks/useAnalystCommissions.ts
  format-control-center.ts
  format-discord.ts
  format-referrals.ts
  format-commissions.ts

src/types/analysts/
  member-application.ts
  dashboard.ts
  directory.ts
  control-center.ts
  applications.ts
  discord.ts
  onboarding.ts
  referrals.ts
  commissions.ts                      # Wave F
```

---

## Partner Analyst Dashboard (foundation)

```text
src/app/analyst/dashboard/page.tsx

src/analyst/dashboard/
  AnalystDashboard.tsx
  AnalystDashboardBackground.tsx
  AnalystDashboardContent.tsx   # single-page business flow + modals
  modules/           # Hero…Help registry (+ request-status · recent-payouts)
  services/          # Analyst Dashboard Service (projection)
  state/             # UI-only expandables / wallet / payout flow
  context/           # AnalystDashboardProvider (+ display merge)
  theme/             # VIP language + purple accent + personalities
  ui/                # Badge · Button · CountUp · Empty · Skeleton · HeroIllustration · modals
  types/ · constants/ · utils/ · surfaces/ (ModulePanel · AreaChart)
```

Docs: [`../07_Partner_Dashboard/`](../07_Partner_Dashboard/)

## Planned source tree (later)

```text
Stage 2 Contribution / Intelligence surfaces
Partner dashboard v2+ modules (Publishing · Analytics · AI Insights)
```

---

## Directory composition

```text
AnalystsDirectoryPage
  → AdminMasterDetail
       list: … → AnalystsTable (+ AnalystRowActions)
       detail: AnalystDirectoryDetails (Inspector + Referral + Commission Summary)
```

Identity Link → `/admin/analysts/[id]`

---

## Control Center composition

```text
AnalystControlCenterView
  → AnalystControlCenterPageContent
       → Header · Tabs · Overview | Administration | Notes | placeholders
       → SuspendPartnershipModal
```

UX pattern: [`OPERATIONAL_UX_PATTERN.md`](./OPERATIONAL_UX_PATTERN.md)

---

## Shared Admin primitives (not Analyst-owned)

`AdminShell` · `AdminSidebar` · `AdminMobileNav` · `AdminMasterDetail` · `AdminDirectoryPanel` · `DataTable` · `WidgetCard` · `StatusBadge` · `SystemHealthBadge` · `Pagination` · `ModulePlaceholder` · `SelectField`

Nav config: `src/components/admin/layout/nav-config.ts` (`ADMIN_NAV_DOMAINS`)

---

## Composition rules

1. Thin `app/admin/analysts/**` routes  
2. Domain UI only under `components/analysts/sections/**`  
3. Never nest Analyst sections under `components/members/**` or `admin/modules/`
