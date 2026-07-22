# Analyst Frontend — Admin Dashboard Architecture

**Version:** 1.2  
**Status:** Active (Admin Analyst Dashboard shipped on mocks)  
**Authority:** `docs/Analyst/03_Frontend/`  
**Last Updated:** July 23, 2026

---

## Scope

Admin surface: `/admin/analysts`  
Partner-facing dashboard: **not in scope** (future doc).

---

## Purpose

Help operators run the **Analyst Platform** — KPIs, queues, recent activity.

```text
Dashboard → “What needs attention across the platform?”
```

Mirror Member Ops Dashboard design language. **No redesign required** for the current foundation.

**Different from Directory / Control Center:**

| Surface | Question |
|---------|----------|
| Dashboard | What needs attention? |
| Directory | Who are our analyst partners? |
| Control Center | What can I do for this partner? |

See [`DIRECTORY_ARCHITECTURE.md`](./DIRECTORY_ARCHITECTURE.md) · [`CONTROL_CENTER_ARCHITECTURE.md`](./CONTROL_CENTER_ARCHITECTURE.md).

---

## Composition

```text
src/app/admin/analysts/page.tsx
  → AnalystDashboardPage
       → PageTitle
       → AnalystOperationalWidgets
       → AnalystOperationsQueueSection
       → AnalystRecentActivity
```

Mock source: `src/lib/analysts/mock/dashboard.ts`  
Types: `src/types/analysts/dashboard.ts`

---

## Widgets (current)

Active Analysts · Applications Pending · Verification Queue · Commissions Pending  

Queue deep-links to Analyst shell routes (applications, verification, partnerships, commissions).  
“View directory” from activity links to `/admin/analysts/directory`.

---

## Evolution rule

The Dashboard is a **reflection of operational modules**.

Do **not** artificially expand widgets before owning modules exist.

### Future widgets (when modules mature)

| Widget | Depends on |
|--------|------------|
| Analyst Health | Directory / health synthesizer |
| Discord Activity | Analyst Discord module |
| Publishing Status | Content / publishing |
| Performance | Performance monitoring |
| Reports Pending | Reports / content ops |
| Content Queue | Content platform |
| Alerts | Automated Alerts (deferred) |

---

## Design inheritance

Reuse Admin `WidgetCard`, `OperationsQueue`, `modulePanelSurface`, `PageTitle`.  
Design freeze: `docs/AI/Agents/Admin/02_Frontend_Design_System_and_UX_Rules.md` (cross-ref).

---

## Related

- Directory: [`DIRECTORY_ARCHITECTURE.md`](./DIRECTORY_ARCHITECTURE.md)  
- UX pattern: [`OPERATIONAL_UX_PATTERN.md`](./OPERATIONAL_UX_PATTERN.md)  
- Alerts (deferred): [`../04_Admin/AUTOMATED_ALERTS.md`](../04_Admin/AUTOMATED_ALERTS.md)  
- Component tree: [`COMPONENT_HIERARCHY.md`](./COMPONENT_HIERARCHY.md)  
- Phase record: [`../06_Implementation/PHASE_02.md`](../06_Implementation/PHASE_02.md)
