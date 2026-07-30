# Member Admin Responsive Strategy

**Version:** 1.0  
**Status:** Active  
**Authority:** `docs/Member Management/03_Frontend/`  
**Last Updated:** July 28, 2026

---

## Goals

- Desktop: dense operations — table + side inspector  
- Mobile: focused workflows — list → full-page detail  
- Preserve URL filter contracts across viewports  

---

## Breakpoints

Admin desktop detection: `isAdminDesktop()` in `src/lib/admin/directory/breakpoints.ts` (typically `lg+`).

| Viewport | Directory / Discord / Referrals pattern |
|----------|-----------------------------------------|
| Desktop (`lg+`) | `AdminMasterDetail` — table + panel; selection via `?member=` |
| Mobile | Single column; `selectMember` navigates to `/…/[id]` keeping list query |

Control Center is always its own route; tabs stack; Overview cards go single-column then multi-column at `xl`.

---

## Navigation chrome

| Chrome | Behavior |
|--------|----------|
| Sidebar | Collapsible desktop |
| Mobile bottom nav | Primary: Dashboard, Members, Subscriptions (`mobilePrimary`) |
| More sheet | Discord, Referrals + Analysts + Content coming-soon |

Config: `src/components/admin/layout/nav-config.ts`.

---

## Control Center mobile notes

- Horizontal scroll tabs (`ProfileTabs`)  
- Stacked reflection cards  
- Manage links remain full-width footers  

---

## Design freeze

Responsive adaptations must reuse existing Admin primitives — do not introduce a second visual language for mobile.
