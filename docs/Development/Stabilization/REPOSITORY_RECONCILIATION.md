# TraderCity Engineering Baseline v1.0 — Repository Reconciliation

**Date:** 2026-07-18  
**Candidate:** `homepage-cursor-experiment` @ pre-recovery tip  
**Sources:** A = HCE · B = `mobile-investigation` · C = `stash@{0}` (+ `stash^3`)  
**Method:** Implementation comparison, not timestamps. Selective recovery only.

---

## Guiding principle

Recover **intentional product work** that belongs in Baseline v1.0.  
Exclude experimental, temporary, superseded, or instability-linked changes.

B and C largely overlap for Category A product files. **Prefer B (`mobile-investigation`) as recovery source** (committed). Keep C archived until recovery commits land.

---

## 1. Engineering Baseline Coverage (pre-recovery)

| Domain | Coverage | Notes |
|--------|----------|-------|
| Marketing — Homepage | **100%** | A includes stabilization; B has no product homepage delta |
| Marketing — Pricing | **85%** | Product refinements on B/C; A has overflow fix |
| Marketing — Login / Auth | **100%** | A stabilized UI is the intended surface |
| Marketing — Payment Activation | **90%** | Product refinements on B/C; A has layout stability fixes |
| Member — Free Dashboard | **70%** | Intended UI on B/C; A is older + stabilization patches |
| Member — VIP Dashboard | **70%** | Same as Free |
| Member — User Profile (admin CC) | **95%** | Present on A; pricing display upgrades need membership libs |
| Admin — Overview / Members | **100%** | A stabilized shell is authoritative |
| Admin — Subscriptions UI | **10%** | Placeholder everywhere; libs/docs on B |
| Admin — Discord | **0%** | Full module only on B/C |
| Admin — Referrals | **10%** | Placeholder everywhere (expected) |
| Admin — Payments module UI | **0%** | No dedicated module anywhere |
| Membership libraries | **0%** | Only on B/C |
| Governance docs | **100%** | A is source of truth |

---

## 2. Recovery Matrix

| Feature | Category | Status | Source | Action | Risk |
|---------|----------|--------|--------|--------|------|
| Homepage | 1 | Already Integrated | A | None | — |
| Login / Auth | 1 | Already Integrated | A (stabilized) | None | — |
| Admin Overview / Shell | 1 | Already Integrated | A | **Do not take B shell/theme** | — |
| Admin Members / Profile CC | 1 | Already Integrated | A | None (except mock pricing via libs) | — |
| Referrals UI | 1 | Placeholder intended | A/B/C | None | — |
| Subscriptions UI page | 1 | Placeholder intended | A/B/C | None (module not built) | — |
| Pricing content | 2 | Partially Integrated | B + keep A eyebrow fix | Recover content; re-apply overflow fix | Low |
| Payment Activation | 2 | Partially Integrated | B + keep A overflow/touch | Recover sections; keep A page/main fixes | Low |
| Free Dashboard | 2→3 | Missing latest UI | B | Recover; re-apply journey grid fix | Med |
| VIP Dashboard | 2→3 | Missing latest UI | B | Recover; re-check touch targets | Med |
| Discord module | 3 | Missing | B | Selective file recovery | Med |
| Admin directory kit (for Discord) | 3 | Missing | B | Recover with Discord | Low |
| DataTable selectedKey/stopRowClick | 3 | Missing | B (partial) | Patch only those APIs | Low |
| Membership libs | 3 | Missing | B | Recover full `src/lib/membership/**` | Low |
| Directory types/mocks/hooks (accountStatus, URL filters) | 3 | Missing | B | Recover with libs | Low |
| Sub architecture doc `08_…` | 3 | Missing | B | Recover docs | Low |
| AdminTheme / theme toggle / shell from B | 4 | Do NOT Recover | B | Leave out (rollback: instability) | High |
| `main` padding revert from B | 4 | Do NOT Recover | B | Keep A `home-shell` | High |
| MembersMobileList / MemberRowActions | 4 | Do NOT Recover | B | Not wired on stable Members page; defer | Med |
| Mobile investigation reports | 4 | Archive only | B | Optional later archive; not baseline product | — |
| Blind merge B / restore stash | 4 | Forbidden | — | Never | High |

---

## 3. File Recovery List (exact)

### R1 — Membership libraries + architecture doc

```text
src/lib/membership/plans.ts
src/lib/membership/pricing/adjustments.ts
src/lib/membership/pricing/breakdown.ts
src/lib/membership/pricing/index.ts
src/lib/membership/pricing/quote.ts
src/lib/membership/verification/index.ts
src/lib/membership/verification/types.ts
src/types/admin/membership.ts
docs/AI/Agents/Admin/08_Subscription_Pricing_and_Payment_Verification_Architecture.md
```

### R2 — Discord module (+ required kit)

```text
src/types/members/discord.ts
src/lib/members/hooks/useDiscordDirectory.ts
src/lib/members/mock/discord-members.ts
src/lib/admin/directory/breakpoints.ts
src/lib/admin/directory/context-storage.ts
src/lib/admin/directory/index.ts
src/lib/admin/directory/useDirectoryNavigation.ts
src/lib/admin/directory/useScrollRestore.ts
src/components/admin/directory/AdminDirectoryPanel.tsx
src/components/admin/directory/AdminMasterDetail.tsx
src/components/admin/directory/AdminStatGrid.tsx
src/components/admin/directory/index.ts
src/components/members/sections/discord/** (all)
src/app/admin/discord/page.tsx
src/app/admin/discord/layout.tsx
src/app/admin/discord/[id]/page.tsx
```

Plus **patch** (not wholesale replace):

```text
src/components/admin/ui/DataTable.tsx   → selectedKey + stopRowClick only
src/app/globals.css                    → add Discord token fallbacks; KEEP home-shell
```

### R3 — Directory / profile data alignment (supports Discord + pricing truth)

```text
src/types/members/directory.ts
src/lib/members/mock/directory-members.ts
src/lib/members/mock/profile-members.ts
src/lib/members/hooks/useMembersDirectory.ts
src/lib/members/directory-keys.ts
```

### R4 — Free Dashboard

```text
src/components/dashboard/free/FreeDashboard.tsx
src/components/dashboard/free/FreeDashboardBackground.tsx
src/components/dashboard/free/FreeDashboardContent.tsx
src/components/dashboard/free/free-dashboard.css
src/components/dashboard/free/free-surfaces.ts
```

Then re-apply A journey `grid-cols-2` / overflow fix if still needed.

### R5 — VIP Dashboard

```text
src/components/dashboard/vip/VipDashboard.tsx
src/components/dashboard/vip/VipDashboardBackground.tsx
src/components/dashboard/vip/VipDashboardContent.tsx
```

Re-check touch targets after restore.

### R6 — Pricing

```text
src/components/pricing/PricingContent.tsx
```

Re-apply A eyebrow overflow fix.

### R7 — Payment Activation

```text
src/components/payment-activation/sections/PaymentSection.tsx
src/components/payment-activation/sections/VerificationSection.tsx
```

Keep A `src/app/payment-activation/page.tsx` (`overflow-x-hidden`).

### Explicitly excluded

```text
src/components/admin/layout/AdminThemeProvider.tsx
src/components/admin/layout/AdminThemeToggle.tsx
src/components/admin/admin-theme.css
src/lib/admin/theme.ts
B versions of AdminShell / AdminSidebar / AdminMobileNav / AdminHeader
MembersMobileList.tsx / MemberRowActions.tsx
docs/Mobile responsive issue/** (investigation archive — optional later)
```

---

## 4. Safe Integration Order

1. **R1 Membership libs + doc** — no UI shell risk  
2. **R2 Discord + kit + DataTable/globals patch** — primary missing product  
3. **R3 Directory/profile data alignment** — depends on R1  
4. **R4 Free Dashboard** — member UI; re-stabilize journey  
5. **R5 VIP Dashboard** — member UI  
6. **R6 Pricing** — re-apply eyebrow fix  
7. **R7 Payment sections** — keep A page wrapper  

After each: `npm run build` → commit dedicated message → continue.

Preview + real-device re-validation after Discord + dashboards (highest UI risk).

---

## 5. Final Verdict (pre-execution)

```text
Engineering Baseline Requires Controlled Recovery
```

After controlled recovery completes and validation passes:

```text
Engineering Baseline Complete
```

---

*Audit only until recovery commits begin. No Repository Migration until Complete.*
