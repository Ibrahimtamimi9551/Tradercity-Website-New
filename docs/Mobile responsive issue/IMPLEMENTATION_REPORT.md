# Admin Mobile Responsiveness Architecture — Implementation Report

**Date:** 2026-07-17  
**Source of truth:** live codebase + `TraderCity_Mobile_Responsiveness_Architecture_Refactor.md` brief  
**Note:** Original inspection PDFs were not in the repo; findings were validated against code.

---

## 1. Architectural issues fixed

1. **Discord list state died on mobile detail navigation** — `useDiscordDirectory` now lives in a layout-mounted `DiscordDirectoryProvider`, so filters/pagination/selection survive `/admin/discord` ↔ `/admin/discord/[id]`.
2. **Discord BackLink stripped query params** — Back links use `getListHref()` from live provider state (never bare `/admin/discord` when filters exist).
3. **Discord double `router.push`** — Replaced with single `selectMember()` path: desktop updates list URL selection; below `lg` one push to detail **with list query preserved**.
4. **Discord breakpoint soup for panel vs route** — Panel visibility and navigation both use canonical `lg` (1024) via `isAdminDesktop()` / `AdminMasterDetail`.
5. **Duplicated Discord sync/invite handlers** — Consolidated in `discord-actions.ts`, consumed by list + detail.
6. **Discord KPI grid forced into Members’ 3-column CSS** — Removed `.admin-members-stat-grid` override; modules use `AdminStatGrid` with explicit column counts.
7. **Members: table-only on phone** — Added `MembersMobileList` (same `rows` / handlers as table).
8. **Members: breadcrumb / empty state reset directory** — Return href + scrollY remembered in `sessionStorage`; Profile breadcrumb/empty state restore them.
9. **No scroll restoration** — `useScrollRestore` restores list scroll after Control Center return.
10. **Broken `?expiring=today` deep link** — Mapped to `health=needs_attention` until Subscriptions owns expiry.
11. **Global `main` bottom padding fought AdminShell** — Marketing padding scoped to `main:not([data-admin-main])`.
12. **Sticky Discord panel under-offset** — Master–detail shell uses `top-20` (clears `h-16` header).
13. **Admin horizontal overflow risk** — `min-w-0 overflow-x-clip` on admin main.

---

## 2. Inspection / brief findings confirmed

| Finding | Status |
|---------|--------|
| Discord hook is SSOT while mounted | Confirmed |
| Mobile Discord detail remounted list page (lost hook) | Confirmed — fixed via layout provider |
| Discord BackLink dropped filters | Confirmed — fixed |
| Discord double navigation | Confirmed — fixed |
| Breakpoint inconsistency (`md` / `lg` / 1023) | Confirmed — panel/route unified to `lg` |
| `admin-members-stat-grid` broke Discord widgets | Confirmed — fixed |
| Members list hook already SSOT (no desktop/mobile logic split) | Confirmed |
| Members lacked mobile card list | Confirmed — fixed |
| Members Control Center is intentionally a full route | Confirmed — preserved |
| Members breadcrumb stripped query | Confirmed — fixed |
| No scroll restoration utilities | Confirmed — added |
| Global `main` padding coupled to Admin | Confirmed — fixed |

---

## 3. Recommendations modified or rejected

| Recommendation | Decision | Reasoning |
|----------------|----------|-----------|
| Members desktop right detail panel | **Rejected** | Phase 3 Control Center is the detail surface; a Discord-style panel would duplicate product UX and fight the design freeze. |
| Lift `useMembersDirectory` into a layout wrapping `[id]` | **Rejected** | Control Center uses `useMemberProfile` (different domain). Remount is correct; browsing context is preserved via return href + scroll. |
| Card vs table must use `lg` | **Modified** | Kept `md` for card↔table density; reserved `lg` for panel↔full-page detail (matches design: tablet can show table without panel). |
| Reproduce external audit docs exactly | **N/A** | Docs absent; codebase validation preferred per user instruction. |

---

## 4. Additional issues discovered during implementation

1. **Hydration risk for return href** — Profile return link is applied in `useEffect` so SSR/client hrefs don’t mismatch.
2. **Detail URL query carry** — Discord (and Members) detail navigations now append list query so refresh on detail keeps filters even if React state were lost.
3. **Deep-link `?member=` on mobile Discord** — List page now `replace`s once into `/admin/discord/[id]?…` below `lg`.
4. **Widget compact CSS was global** — Scoped under `.admin-shell` to match isolation rules.

---

## 5. Files modified / added

### Added
- `src/lib/admin/directory/breakpoints.ts`
- `src/lib/admin/directory/context-storage.ts`
- `src/lib/admin/directory/useDirectoryNavigation.ts`
- `src/lib/admin/directory/useScrollRestore.ts`
- `src/lib/admin/directory/index.ts`
- `src/components/admin/directory/AdminMasterDetail.tsx`
- `src/components/admin/directory/AdminDirectoryPanel.tsx`
- `src/components/admin/directory/AdminStatGrid.tsx`
- `src/components/admin/directory/index.ts`
- `src/app/admin/discord/layout.tsx`
- `src/components/members/sections/discord/DiscordDirectoryProvider.tsx`
- `src/components/members/sections/discord/discord-actions.ts`
- `src/components/members/sections/directory/MembersMobileList.tsx`
- `src/lib/members/directory-keys.ts`
- `docs/Mobile responsive issue/IMPLEMENTATION_REPORT.md`

### Modified
- `src/lib/members/hooks/useDiscordDirectory.ts`
- `src/lib/members/hooks/useMembersDirectory.ts`
- `src/components/members/sections/discord/DiscordPage.tsx`
- `src/components/members/sections/discord/DiscordMemberDetailPage.tsx`
- `src/components/members/sections/discord/DiscordWidgets.tsx`
- `src/components/members/sections/discord/index.ts`
- `src/components/members/sections/directory/MembersDirectoryPage.tsx`
- `src/components/members/sections/directory/MembersTable.tsx`
- `src/components/members/sections/directory/MemberRowActions.tsx`
- `src/components/members/sections/directory/DirectoryWidgets.tsx`
- `src/components/members/sections/directory/index.ts`
- `src/components/members/sections/profile/ProfilePage.tsx`
- `src/components/members/sections/profile/ProfileHeader.tsx`
- `src/components/admin/layout/AdminShell.tsx`
- `src/components/admin/ui/WidgetCard.tsx`
- `src/app/globals.css`

---

## 6. New responsive architecture

### Two detail kinds

```text
Master–detail (Discord, future Subscriptions/Referrals)
  layout Provider → use*Directory (SSOT)
    ├─ list: table (md+) / cards (<md)
    ├─ lg+: side panel (same selection)
    └─ <lg: /[id] full page (same provider + query)

Control Center (Members profile)
  directory hook on list only
  → remember href + scroll
  → /members/[id] with useMemberProfile
  → breadcrumb restores directory context
```

### Canonical breakpoints

| Token | Width | Use |
|-------|-------|-----|
| `md` | 768 | Density: cards vs table |
| `lg` | 1024 | Structure: side panel vs full-page detail; shell sidebar |

### Single source of state

- Filtering, search, pagination, selection (Discord), processed rows: **hooks only**
- Presentation components render data and call handlers
- Desktop and mobile share the same processed `rows`

---

## 7. Reusable patterns for future modules

| Primitive | Path | Use when |
|-----------|------|----------|
| `AdminMasterDetail` | `components/admin/directory` | List + optional `lg` side panel |
| `AdminDirectoryPanel` | same | Edge-bleed list surface + `min-w-0` |
| `AdminStatGrid` | same | KPI grids with per-module columns |
| `isAdminDesktop` / `ADMIN_LG` | `lib/admin/directory` | Panel vs route navigation |
| `rememberDirectoryContext` / `getDirectoryReturnHref` | same | Control Center-style routes that remount |
| `useScrollRestore` | same | Restore list scroll after return |
| `buildDetailHrefWithQuery` / `pushDirectoryDetail` | same | Detail navigation with query carry |
| Layout provider pattern | see Discord | Shared hook across list + `[id]` |

**Recipe for Subscriptions / Referrals:** copy Discord — module layout provider + master–detail + mobile list + shared actions helper.

**Recipe for another Control Center:** copy Members — remember context on navigate + return href on breadcrumb + mobile card list on directory.

---

## 8. Remaining technical debt

1. **Ephemeral `accountOverrides` (Members)** — still lost across Control Center round-trips (mock-only; accept until NestJS).
2. **`detailTab` not URL-backed (Discord)** — resets on navigation; only needed if shareable tabs become a product requirement.
3. **`showAdvanced` filters UI** — not in URL (acceptable presentation state).
4. **Tablet 768–1023** — table without side panel (routes to detail); intentional but should be documented in Admin UX rules when next edited.
5. **Header search appears at `md` while sidebar stays mobile until `lg`** — pre-existing shell quirk; not changed in this refactor.
6. **Subscriptions / Referrals / Payments** — still placeholders; kit is ready but modules not built.
7. **`?expiring=today` → `needs_attention`** — temporary alias until Subscriptions owns expiry filtering.
8. **Docs drift** — some Phase docs still say Discord “not started” / Action Required `needs_attention` vs widget `action_required`; not bulk-updated here.

---

## Verification performed

- `npx tsc --noEmit` — pass
- Architecture review against Discord layout persistence, Members return path, shell CSS scoping, and shared kit exports
- Manual browser QA of all breakpoints recommended before merge (desktop panel, mobile Discord round-trip, Members cards → profile → back)
