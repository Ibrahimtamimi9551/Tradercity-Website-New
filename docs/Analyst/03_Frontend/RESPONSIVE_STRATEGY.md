# Analyst Frontend — Responsive Strategy

**Version:** 1.2  
**Status:** Active  
**Authority:** `docs/Analyst/03_Frontend/`  
**Terminology:** [`PLATFORM_TERMINOLOGY.md`](../../00_Project_Governance/PLATFORM_TERMINOLOGY.md)  
**Last Updated:** July 23, 2026

---

## Admin shell (shared)

- Desktop: fixed sidebar with platform sections; collapse hides section labels, keeps icons  
- Mobile: hamburger drawer (full section nav) + bottom bar  

## Mobile bottom bar (unchanged primary)

`Dashboard | Members | Subscriptions | More`

**Analysts** appears in the **More** sheet (section-grouped), not the 4-slot primary bar.

**Content** items show as **Soon** (non-navigable).

---

## Analyst Directory

Mirrors Member directory:

- Desktop: `AdminMasterDetail` list + inspection panel (`?analyst=`)  
- Mobile: when Control Center ships, identity / row should push to `/admin/analysts/[id]`  
- Filters: debounced search; URL-synced status/tier/health (+ future activity)

---

## Analyst Applications (planned)

- Desktop: table + **wider** Application Viewer  
- Mobile: **dedicated application page** (required — denser than Directory Inspector)

---

## Analyst Control Center (planned)

- Full-page tabbed layout on all breakpoints  
- Administration flows as guided modals / multi-step panels suitable for mobile  

---

## Analyst Dashboard

Single-column → two-column grid at `lg` for queue + activity (same rhythm as Member Ops Dashboard).

---

## Cross-ref

Admin responsive/layout authority remains Admin Agent docs (`02` design system). This file only records Analyst Domain–specific choices.
