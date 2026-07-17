# Phase 2 — Deployment & Mobile Investigation Report

**Date:** 2026-07-18  
**Scope:** Observe only — no fixes applied.

---

## Deployment

| Field | Value |
|-------|--------|
| Branch | `mobile-investigation` |
| Commit | `df54e8d` — *Experiment 1: Mobile investigation deployment* |
| Parent baseline | `2c913ef` |
| Deployment status | **Ready** (Preview) |
| Deployment ID | `dpl_8qeczM9TJ7GAykYcAtx68awtGZYc` |
| Deployment URL | https://tradercitycrypto-aiqof0n4t-ibrahimtamimi9551s-projects.vercel.app |
| Stable branch alias | https://tradercitycrypto-git-mobile-874f2f-ibrahimtamimi9551s-projects.vercel.app |
| Build identifier | `Build: MI-01` (Admin header) |
| Warnings / errors | None reported by Vercel CLI (`Ready` in 31s) |

**Note:** Preview URLs are behind **Vercel Deployment Protection (Login)**. Unauthenticated HTTP fetches return the Vercel login page, not the app. Automated confirmation of `Build: MI-01` on the live URL was **blocked**. Please open the alias URL while logged into Vercel and confirm `Build: MI-01` in the admin header before trusting device tests.

**Isolation:** Only `mobile-investigation` was pushed. No merge into `homepage-cursor-experiment`, `master`, or `prototype-redesign`. Stash `stash@{0}` remains preserved.

---

## Mobile Testing

### Desktop (`npm run dev`, 1440×900)

| Area | Result |
|------|--------|
| `Build: MI-01` visible | Working |
| Admin shell / sidebar (desktop) | Working |
| Navigate to Members | Working |
| Header hit-test (elementFromPoint) | Returns header / marker (Working) |
| Free Dashboard `/dashboard/free` | Loads |
| VIP Dashboard `/dashboard/vip` | Loads |

### Chrome DevTools / Playwright mobile (390×844, touch)

| Area | Result |
|------|--------|
| `Build: MI-01` visible | Working |
| Hamburger → open drawer | Working |
| Drawer Members link (when open) | Working |
| Bottom nav Members | Working |
| Bottom nav “More” sheet | Working |
| Closed sidebar still in DOM | Observed: `aside` at `z-index: 50`, `pointer-events: none`, box at `x: -256` (off-screen, still mounted) |
| First `a[href=/admin/members]` after closing drawer | Click fails (“outside of the viewport”) — off-screen sidebar link still matches first() |

### Real Mobile Device

| Area | Result |
|------|--------|
| All areas | **Not tested in this session** (requires your device + Vercel login to the preview URL) |

### Production (Vercel preview)

| Area | Result |
|------|--------|
| Deployment Ready | Confirmed via CLI |
| Correct branch alias (`git-mobile-…`) | Confirmed via CLI |
| `Build: MI-01` in browser | **Pending your confirmation** (SSO) |
| Touch / nav behaviour | **Pending your confirmation** |

---

## Comparison

| Behaviour | Local only | Production only | Both / common |
|-----------|------------|-----------------|---------------|
| App serves Admin with MI-01 | Observed locally | Pending SSO verify | — |
| Closed mobile `aside` remains mounted at z-50 | Observed in DOM probe | Unknown until tested | Likely **application code** if present in both |
| Playwright can open drawer / bottom nav | Yes | N/A | — |
| Vercel Login interstitial for unauthenticated fetch | No | Yes (protection) | Environment difference for automation only |

---

## Initial Conclusion

**Unable to determine** (between local-only vs production-only) until you confirm behaviour on the Vercel preview on a real phone.

**Evidence so far:**

1. **Deployment of this exact commit succeeded** — Preview Ready; branch alias present.
2. **Local desktop works** for core admin navigation and marker visibility.
3. **Local mobile emulation** shows most chrome interactions working under Playwright, but also confirms the **closed drawer remains mounted** (`z-50`, off-screen) — the same pattern flagged in the earlier root-cause investigation.
4. **Production app HTML could not be inspected without Vercel auth**, so a local-vs-production behavioural delta has **not** been proven yet.

**Most likely among the four options, based only on current evidence:**  
**Application code issue** remains the leading *candidate* (drawer stacking pattern is in the shipped commit), but **cannot be ranked above “Unable to determine”** for local-vs-Vercel until real-device production testing confirms whether the same taps fail after deployment.

---

## What you should do next (manual)

1. Open: https://tradercitycrypto-git-mobile-874f2f-ibrahimtamimi9551s-projects.vercel.app/admin  
2. Confirm header shows **`Build: MI-01`**.  
3. On a real phone (and Chrome device mode), test: hamburger, bottom nav, Members, Discord, Free/VIP dashboards, taps in the header.  
4. Compare the same flows on `http://localhost:3000/admin`.  
5. Report which environment fails — that decides the next debugging phase.
