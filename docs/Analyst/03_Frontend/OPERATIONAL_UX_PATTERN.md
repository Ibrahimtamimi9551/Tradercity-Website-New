# Operational UX Pattern (Analyst Platform)

**Version:** 1.2  
**Status:** Active — platform-wide interaction principle for Analyst Admin modules  
**Authority:** `docs/Analyst/03_Frontend/`  
**Last Updated:** July 24, 2026

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
Operational domains → each owns Layer 1–3 for its capability
                     (and may expose multiple internal workspaces)
```

**Nav alignment:** Sidebar items are domains; internal views (Dashboard / Queue / Directory / Operations / Intelligence) stay inside the domain.

---

## Mapping to Analyst surfaces

| Module | Layer 1 | Layer 2 | Layer 3 |
|--------|---------|---------|---------|
| Directory | Directory table | Directory Inspector | Analyst Control Center (**shipped**) |
| Applications | Application Dashboard / Review Queue | Application Viewer (wider: verify + evaluate + notes) | Application Detail *(future)* · Control Center after Approved |
| Discord | Discord Directory / Dashboard queues | Discord Inspector | Discord Operations · Control Center Discord tab |
| Referrals | Referral Directory / Dashboard | Referral Inspector | Control Center Referrals / Commissions |
| Onboarding | Optional onboarding queue | Checklist summary | Control Center Onboarding |
| Control Center | — | — | Per-analyst ops hub (tabs + Administration) |

Dashboard queues are the “attention list”; they should deep-link into the owning domain’s Layer 1 with filters applied.

**Note:** Verification is **not** a separate module row — it is part of Applications Review Queue.

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
