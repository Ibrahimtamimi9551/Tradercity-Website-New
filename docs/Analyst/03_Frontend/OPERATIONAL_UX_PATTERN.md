# Operational UX Pattern (Analyst Platform)

**Version:** 1.1  
**Status:** Active — platform-wide interaction principle for Analyst Admin modules  
**Authority:** `docs/Analyst/03_Frontend/`  
**Last Updated:** July 23, 2026

---

## Rule

```text
Layer 1 — Operational Table / Queue
        ↓
Layer 2 — Quick Inspector (same page)
        ↓
Layer 3 — Full Detail / Control Center
```

This is a **platform-wide design principle** for every Analyst operational module.

---

## Why this exists

Operators need three speeds of work:

1. **Scan** many records (table / queue)  
2. **Confirm** the right record (inspector) without losing list context  
3. **Decide / act** in depth (Control Center or owning module detail)

Collapsing all three into one page creates clutter. Skipping the Inspector forces expensive navigation for triage.

---

## Platform philosophy alignment

```text
Dashboard          → attention lists (may deep-link into Layer 1)
Directory          → Layer 1 roster + Layer 2 Inspector → Layer 3 Control Center
Operational modules → each owns Layer 1–3 for its workflow
```

---

## Mapping to Analyst surfaces

| Module | Layer 1 | Layer 2 | Layer 3 |
|--------|---------|---------|---------|
| Directory | Directory table | Directory Inspector | Analyst Control Center (**shipped**) |
| Applications | Applications table | Application Viewer (wider) | Application Detail *(future)* |
| Verification | Verification queue | Verification Viewer | Verification Detail |
| Discord | Discord table / sync queue | Discord Inspector | Discord deep context / Control Center Discord tab |
| Commissions | Commissions table | Commission Inspector | Commission Detail |
| Control Center | — | — | Per-analyst ops hub (tabs + Administration) |

Dashboard queues are the “attention list”; they should deep-link into the owning module’s Layer 1 with filters applied.

---

## Design constraints

- Inspector / Viewer stays **summary or workflow-specific review** — not a second Control Center  
- Identity click (Directory username) opens Control Center  
- Destructive / partnership-mutating actions belong in **Control Center Administration** (or owning workflow with audit trail)  
- Applications Viewer may be **wider** than Directory Inspector because forms carry more content  
- Mobile: prefer dedicated detail page when Inspector content is dense (Applications: required)  
- Inherit Admin design freeze (`WidgetCard`, master-detail, badges)

---

## Anti-patterns

- Putting Suspend / Close / Reactivate as irreversible one-clicks in the table  
- Turning the Directory Inspector into a full profile editor  
- Inventing a unique interaction model per module without documenting an exception  

---

## Related

- [`DIRECTORY_ARCHITECTURE.md`](./DIRECTORY_ARCHITECTURE.md)  
- [`CONTROL_CENTER_ARCHITECTURE.md`](./CONTROL_CENTER_ARCHITECTURE.md)  
- [`APPLICATIONS_MODULE_ARCHITECTURE.md`](./APPLICATIONS_MODULE_ARCHITECTURE.md)  
- [`../04_Admin/ANALYST_ADMIN_WORKFLOW.md`](../04_Admin/ANALYST_ADMIN_WORKFLOW.md)
