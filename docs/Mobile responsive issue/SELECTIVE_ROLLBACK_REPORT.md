# Selective Layout Rollback Report

## 1. Stable baseline commit

**`2c913ef`** — *Add Members directory and User Profile Control Center (Phases 2–3).*

- Matches `origin/homepage-cursor-experiment` (last pushed tip).
- Treated as last stable Vercel deployment (no `gh`/Vercel API available; remote tip used as proxy).
- All responsive regressions lived in **uncommitted** working-tree changes after this commit.

---

## 2. Layout/UI files changed since baseline

Shell / chrome: `AdminShell`, `AdminHeader`, `AdminSidebar`, `AdminMobileNav`, `AdminBackground`, `ModulePlaceholder`, `src/app/admin/layout.tsx`, `src/app/layout.tsx`, `globals.css`, `module-surfaces.ts`

Admin UI: `DataTable`, `WidgetCard`, `Pagination`, `PageTitle`, `SearchInput`, `SelectField`, `States`, `StatusBadge`, `SystemHealthBadge`, `InfoCard`, `OperationsQueue`

Members presentation: dashboard widgets, `DirectoryFiltersBar`, `DirectoryWidgets`, `MembersDirectoryPage`, `MembersTable`, profile header/page/tabs

Post-baseline additions (not in `2c913ef`): Discord module, admin theme system, directory kit, `MembersMobileList`, `MemberRowActions`

---

## 3. Fully reverted (restored from `2c913ef`)

| File | Why |
|------|-----|
| `AdminShell.tsx` | Padding/offset/`admin-shell`/theme wrapper regressions |
| `AdminHeader.tsx` | Mobile nav/header API + layout drift |
| `AdminSidebar.tsx` | Drawer/z-index/width changes |
| `AdminMobileNav.tsx` | Bottom-nav layout drift |
| `AdminBackground.tsx` | Surface coupling |
| `ModulePlaceholder.tsx` | Surface class drift |
| `admin/layout.tsx` | Theme boot script removed |
| `app/layout.tsx` | `suppressHydrationWarning` theme FOUC removed |
| `globals.css` | Compact-widget / admin-main overrides removed (then minimal Discord tokens re-added) |
| `module-surfaces.ts` | Opaque theme surfaces → stable gradients |
| All listed Admin UI except `DataTable` (see partial) | Density/token/layout churn |
| Members dashboard + directory + profile presentation files | Post-deploy compact/bleed/theme layout |

---

## 4. Partially reverted

| File | Kept | Rolled back |
|------|------|-------------|
| `DataTable.tsx` | Stable overflow/typography from `2c913ef` | Re-added only `selectedKey` + `stopRowClick` for Discord selection |
| `globals.css` | Stable structure | Added **minimal** `.admin-*` token fallbacks so Discord UI still paints without theme provider |

---

## 5. Intentionally kept (Category A)

| Area | Status |
|------|--------|
| Discord module (`sections/discord`, hooks, mocks, routes, layout provider) | Kept |
| Free / VIP dashboard changes | Kept (untouched) |
| Pricing / membership / payment-activation | Kept (untouched) |
| `useMembersDirectory` / mock / type business edits | Kept |
| Admin directory kit + theme files (untracked) | Kept on disk but **theme unwired** from shell |
| `MembersMobileList` / `MemberRowActions` | Orphaned untracked; not wired after Members page restore |

---

## 6. Decision rationale (summary)

- Regressions were post-`2c913ef` shell/theme/density work, not Discord state architecture.
- Restoring shell + shared UI from the deploy tip restores known-good mobile chrome.
- Discord needs table selection APIs → surgical `DataTable` keep.
- Theme provider changed shell geometry (`lg:pl-[calc…]`, overflow, `admin-shell`) → full shell restore; theme left unwired.

---

## 7. Regressions not safely re-applied

- Admin light/dark theme toggle (would reintroduce shell coupling).
- Members mobile card list + scroll/return helpers (wired into rolled-back Members page).
- Post-deploy “compact widget” CSS in globals (was a regression source).

---

## 8. Business functionality check

| Feature | Result |
|---------|--------|
| TypeScript (`tsc --noEmit`) | Pass |
| Admin shell (stable) | Restored |
| Members directory / profile | Restored to deploy presentation |
| Discord module | Present; compiles; uses stable shell + token fallbacks |
| Free / VIP / pricing / membership | Untouched |

**Manual QA recommended:** phone Admin Dashboard, Members table scroll, Discord list→detail, Free/VIP dashboards.
