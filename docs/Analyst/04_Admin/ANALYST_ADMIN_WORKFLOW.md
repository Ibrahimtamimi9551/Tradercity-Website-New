# Analyst Admin Workflow

**Version:** 1.3  
**Status:** Active  
**Authority:** `docs/Analyst/04_Admin/`  
**Terminology:** Product = Analyst Platform · Engineering = Analyst Domain · UI = Analysts  
**Last Updated:** July 23, 2026

---

## Philosophy

Admin surfaces for the **Analyst Platform** support **partner success**. This is not employee HR software and not a CRUD console.

```text
Dashboard        → What needs attention?
Directory        → Who are our analyst partners?
Control Center   → What can I do for this partner?
Operational modules → Specialized workflows
```

Interaction pattern for every ops module:

```text
Table / Queue → Quick Inspector → Detail / Control Center
```

[`../03_Frontend/OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md)

---

## Domain modules (nav IA)

| Module | Route | Status |
|--------|-------|--------|
| Dashboard | `/admin/analysts` | Shipped (mock) |
| Directory | `/admin/analysts/directory` | Shipped (mock) |
| Discord | `/admin/analysts/discord` | Planned |
| Applications | `/admin/analysts/applications` | Shell |
| Verification | `/admin/analysts/verification` | Shell |
| Partnerships | `/admin/analysts/partnerships` | Shell |
| Commissions | `/admin/analysts/commissions` | Shell |

Control Center `/admin/analysts/[id]` — **Wave A shipped (mock)** (opened from Directory identity / ⋮ menu).  
`/admin/analysts/referrals` — shell route retained; not shown in sidebar.

---

## Directory as operational workspace

Discover · monitor · inspect · navigate · launch Control Center.  
Full specification: [`../03_Frontend/DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md)

---

## Control Center as operational management

Per-analyst hub with tabs + **Administration** for partnership actions.  
**Shipped (mock):** Overview · Administration (Suspend flow) · Notes · placeholder tabs.  
[`../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md) · [`PARTNERSHIP_ADMINISTRATION.md`](./PARTNERSHIP_ADMINISTRATION.md) · Wave A report: [`../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md)

---

## Evaluation & approval

- Application categories + overall score: [`APPLICATION_REVIEW_PROCESS.md`](./APPLICATION_REVIEW_PROCESS.md)  
- Stage-based evaluations: [`APPROVAL_WORKFLOW.md`](./APPROVAL_WORKFLOW.md)  

Not simple Approve/Reject.

---

## Daily operator loop (target)

1. Dashboard queues (applications, verification, payouts, future alerts)  
2. Directory health / activity / status filters + Inspector triage  
3. Application structured evaluation  
4. Verification / partnership stage evaluations  
5. Discord sync health (when module ships)  
6. Commission approvals  
7. Control Center Administration for partnership actions (Suspend mock available)  

---

## Deferred: Automated Alerts

Do not implement until Discord, Reports, Publishing, Commission, Performance, and Content modules are available.  
[`AUTOMATED_ALERTS.md`](./AUTOMATED_ALERTS.md)

---

## Intelligence questions (future BI)

Which analysts generate revenue · retain members · produce quality research · grow fastest · stay active · deserve homepage promotion · need support · which categories are strongest

---

## Design inheritance

Admin design freeze applies. Cross-ref: `docs/AI/Agents/Admin/02_Frontend_Design_System_and_UX_Rules.md`.

---

## Related

- Ecosystem IA: [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)  
- Phase plan: [`../06_Implementation/PHASE_04.md`](../06_Implementation/PHASE_04.md)
