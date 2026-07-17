# TraderCity UI Stabilization Sprint Report

**Date:** 2026-07-18  
**Branch:** `homepage-cursor-experiment`  
**Baseline commits (governance):** `f979e8d`, `e623bbb`  
**Scope:** Pre-migration UI stability only — **no Repository Migration**  
**Script:** `scripts/ui-stability-check.mjs`

---

## Timeline Position

```text
Foundation Phase
        ↓
Governance v1.0
        ↓
Engineering Platform v2.0 (documented)
        ↓
UI Stabilization Sprint      ← THIS REPORT
        ↓
Engineering Freeze
        ↓
Preview + Device Validation  ⏳
        ↓
TraderCity Engineering Baseline v1.0
        ↓
Repository Migration v2.0
        ↓
Engineering Phase
```

**Freeze:** See `docs/00_Project_Governance/ENGINEERING_FREEZE.md`.  
No new features, design polish, or refactors until Migration v2.0 completes — release-blocking bugs only.

---

## Production Readiness Assessment

```text
NOT READY
```

### Why not READY yet

Code stabilization, push, and **Vercel Preview** of the freeze tip are done. Formal **Engineering Baseline v1.0** still requires:

1. ~~Vercel Preview deployment of this stabilized tip~~ ✅  
2. **Real mobile device** confirmation (Chrome Android + Safari iPhone if available) against that Preview ⏳  

### Preview evidence (this tip)

| Field | Value |
|-------|--------|
| Freeze commits | `8562056` (UI stabilization) → `a77b8bf` (Engineering Freeze) |
| Branch | `homepage-cursor-experiment` |
| Deployment ID | `dpl_6qGuzASHf9Z8S2sZBBhVRPeznfo3` |
| Preview URL | https://tradercitycrypto-appr38von-ibrahimtamimi9551s-projects.vercel.app |
| Inspect | https://vercel.com/ibrahimtamimi9551s-projects/tradercitycrypto/6qGuzASHf9Z8S2sZBBhVRPeznfo3 |
| Build | Ready (Next.js 16.2.6) |
| Note | May require Vercel login if Deployment Protection is enabled |

### What would flip the verdict to READY

- [x] Push / deploy this tip to Vercel Preview  
- [ ] Confirm Admin drawer + bottom nav + Members on a real phone  
- [ ] Spot-check Homepage, Login, Free/VIP dashboards on the same device  
- [ ] Record device model(s) + pass/fail in this report  

After that, the next and only next step is **Repository Migration v2.0 / Engineering Platform v2.0 execution**.

---

## 1. Overall Stability Score

```text
Marketing Website
★★★★☆

Member Experience
★★★★☆

Admin Platform
★★★★☆

Shared / Shell Components
★★★★☆
```

Scores reflect post-fix state. One star withheld across domains pending Preview + real-device confirmation and known placeholder Admin modules.

---

## 2. Issues Found

### Critical

None remaining after fixes.

### High — Fixed

| ID | Description | Pages | Root cause | Fix |
|----|-------------|-------|------------|-----|
| H1 | Closed Admin mobile drawer remained in DOM (translate-offscreen), risking residual hit-test / focus issues | `/admin/**` | `pointer-events-none` + `-translate-x-full` without unmounting | Closed drawer uses `hidden lg:flex` so mobile closed state is out of the layout tree |
| H2 | Drawer backdrop lost to bottom nav (same z-index; nav rendered later) | `/admin/**` | `z-40` backdrop vs `z-40` bottom nav | Backdrop `z-[45]`; bottom nav `z-30`; `pointer-events-none` on bottom nav while drawer open |
| H3 | Free Dashboard journey row forced horizontal overflow on narrow phones | `/dashboard/free` | Four fixed `w-24` columns in one row | 2×2 grid on small screens → 4 columns from `sm` |
| H4 | Pricing eyebrow hairlines + label overflowed narrow widths | `/`, `/pricing` | Fixed `w-24` lines always shown | Hide lines below `sm`; tighten type |
| H5 | Login trust labels used `whitespace-nowrap` in tight card | `/login` | nowrap + large padding | Allow wrap; reduce mobile padding (`p-6 sm:p-12`) |

### Medium — Fixed

| ID | Description | Pages | Fix |
|----|-------------|-------|-----|
| M1 | Global `main` bottom padding assumed homepage bottom nav on every page | login, payment, dashboards, admin | Scope to `main.home-shell` only |
| M2 | Admin drawer did not close on route change | `/admin/**` | `useEffect` on `pathname` |
| M3 | Desktop collapse state could render icon-only mobile drawer | `/admin/**` | Mobile open forces full labels |
| M4 | Payment page `overflow-hidden` + network string crowding | `/payment-activation` | `overflow-x-hidden`; stack network rows; larger Copy hit target |
| M5 | VIP access grid / invoice actions cramped on narrow widths | `/dashboard/vip` | 1-col mobile grid; stack invoice buttons |
| M6 | Small touch targets (Copy / referral / menu) | dashboards, admin | `min-h-11` / `min-w-11` where touched |
| M7 | Dead Quick Action / queue links → missing routes | `/admin` | Point to existing `/admin` or `/admin/members` |
| M8 | PageTitle actions could overflow | Admin dashboard | `flex-wrap` |
| M9 | Research Framework tabs short for touch | Homepage | `min-h-11` |
| M10 | Missing body scroll lock / Escape on Admin overlays | `/admin/**` | Added for drawer + More sheet |

### Low — Accepted / Deferred

| ID | Description | Status |
|----|-------------|--------|
| L1 | Members table intentional horizontal scroll on mobile | Accepted (data density) |
| L2 | `/pricing` has no shared marketing chrome | Deferred (not a blocker; no redesign this sprint) |
| L3 | No dedicated `/register` route (Register/Login is one page) | Expected for current product stage |
| L4 | Admin Subscriptions / Discord / Referrals are placeholders | Expected (roadmap Phases 4–6) |
| L5 | Full focus-trap a11y for drawers | Partial (Escape + scroll lock; full trap deferred) |
| L6 | Homepage asset 404 noise in console (missing resource) | Track separately; not introduced by governance |

---

## 3. Remaining Risks (before Engineering Baseline v1.0)

1. **Preview not re-validated** on this stabilized tip  
2. **Real-device not re-validated** in this sprint (Chrome touch emulation only)  
3. **Safari iPhone / Firefox** not covered by automation here  
4. **Placeholder Admin modules** still present (by design)  
5. **Members table** sideways scroll on small phones (acceptable)  
6. **Standalone `/pricing`** lacks homepage nav chrome  

---

## 4. Technical Validation

| Gate | Result |
|------|--------|
| `npm run build` | **Pass** (TypeScript + static generation) |
| Routes generated | `/`, `/pricing`, `/login`, `/payment-activation`, `/dashboard/free`, `/dashboard/vip`, `/admin`, `/admin/members`, `/admin/members/[id]`, placeholders |
| Automated overflow matrix | **55/55 OK**, `overflowX = 0` across desktop / tablet / mobile / 320px / landscape |
| Browser used for automation | Chrome (system channel) via Playwright |
| Vercel Preview (this tip) | **Ready** — see Preview evidence above |
| Real device (this tip) | **Not run** — operator gate |
| Git migration | **Not started** (as required) |
| Engineering Freeze | **Active** — `ENGINEERING_FREEZE.md` |

---

## 5. Files Changed (stability only)

- `src/components/admin/layout/AdminShell.tsx`
- `src/components/admin/layout/AdminSidebar.tsx`
- `src/components/admin/layout/AdminMobileNav.tsx`
- `src/components/admin/layout/AdminHeader.tsx`
- `src/components/admin/ui/PageTitle.tsx`
- `src/components/members/sections/dashboard/OperationsQueueSection.tsx`
- `src/components/members/sections/dashboard/QuickActions.tsx`
- `src/components/dashboard/free/FreeDashboardContent.tsx`
- `src/components/dashboard/vip/VipDashboardContent.tsx`
- `src/components/login/LoginContent.tsx`
- `src/components/pricing/PricingContent.tsx`
- `src/components/payment-activation/sections/PaymentSection.tsx`
- `src/app/payment-activation/page.tsx`
- `src/app/page.tsx`
- `src/app/globals.css`
- `src/components/home/research-framework/ResearchFrameworkContent.tsx`
- `scripts/ui-stability-check.mjs` (smoke harness)

No folder renames. No backend contracts. No feature work. No Git branch operations.

---

## 6. Regression vs Governance Docs

Governance/documentation commits did not alter UI. This sprint’s UI deltas are intentional stability fixes only. Automated route matrix shows no domain-wide overflow regressions after fixes.

---

## 7. Recommended Next Actions

1. Commit this stabilization work on `homepage-cursor-experiment` (when approved)  
2. Deploy Preview → real-device checklist  
3. Update this report’s verdict to **READY**  
4. Execute **Engineering Platform v2.0** (freeze Foundation → create `develop` → align `master`)  

Until verdict is **READY**, do **not** begin Repository Migration.
