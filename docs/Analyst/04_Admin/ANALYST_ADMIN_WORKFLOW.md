# Analyst Admin Workflow

**Version:** 1.4  
**Status:** Active  
**Authority:** `docs/Analyst/04_Admin/`  
**Terminology:** Product = Analyst Platform · Engineering = Analyst Domain · UI = Analysts  
**Last Updated:** July 24, 2026

---

## Philosophy

Admin surfaces for the **Analyst Platform** support **partner success**. This is not employee HR software and not a CRUD console.

We are building the **Analyst Program** first (Applicant → Active Partner). Operational intelligence comes only after Stage 1 is complete.

```text
Dashboard        → What needs attention?
Directory        → Who are our analyst partners?
Control Center   → What can I do for this partner?
Operational domains → Major capabilities with internal workspaces
```

Interaction pattern for every ops module:

```text
Table / Queue → Quick Inspector → Detail / Control Center
```

[`../03_Frontend/OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md)

**Nav rule:** Left navigation = major operational domains (mirror Member Platform), not one item per workflow screen.

---

## Domain modules (target nav IA)

| Module | Route | Status |
|--------|-------|--------|
| Dashboard | `/admin/analysts` | Shipped (mock) |
| Directory | `/admin/analysts/directory` | Shipped (mock) |
| Applications | `/admin/analysts/applications` | **Shipped (mock)** — Waves B + D |
| Discord | `/admin/analysts/discord` | **Shipped (mock)** — Wave C |
| Referrals | `/admin/analysts/referrals` | Shell → Wave E (sidebar) |
| Onboarding | Applications → Onboarding | **Shipped (mock)** — Wave D System Provisioning |

Control Center `/admin/analysts/[id]` — **Wave A shipped (mock)** (opened from Directory identity / ⋮ menu).

### Internal domain workspaces

```text
Applications → Dashboard · Review Queue · Onboarding · Archive · Intelligence (Stage 2)
Discord      → Dashboard · Directory · Operations · Intelligence (Stage 2)
Referrals    → Dashboard · Directory · Intelligence
```

### Folded transitional shells

| Shell | Target |
|-------|--------|
| Verification | Applications → Review Queue |
| Partnerships | Applications → Review Queue (interview notes) |
| Commissions | Referrals (Wave E) + Control Center |

Canonical sequence: [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)

---

## Directory as operational workspace

Discover · monitor · inspect · navigate · launch Control Center.  
Full specification: [`../03_Frontend/DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md)

Activity Status column = **Stage 2** (not next coding).

---

## Control Center as operational management

Per-analyst hub with tabs + **Administration** for partnership actions.  
**Shipped (mock):** Overview · Administration (Suspend flow) · Notes · placeholder tabs.  
[`../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md) · [`PARTNERSHIP_ADMINISTRATION.md`](./PARTNERSHIP_ADMINISTRATION.md) · Control Center report: [`../06_Implementation/ANALYST_CONTROL_CENTER_IMPLEMENTATION.md`](../06_Implementation/ANALYST_CONTROL_CENTER_IMPLEMENTATION.md)

---

## Evaluation & approval

- Application categories + overall score: [`APPLICATION_REVIEW_PROCESS.md`](./APPLICATION_REVIEW_PROCESS.md)  
- Stage-based evaluations: [`APPROVAL_WORKFLOW.md`](./APPROVAL_WORKFLOW.md)  
- Application → Verification → Evaluation runs inside **Applications Review Queue**  

Not simple Approve/Reject.

---

## Daily operator loop (target — Stage 1)

1. Dashboard queues (applications, Discord sync, referrals/payouts)  
2. Directory filters + Inspector triage → Control Center  
3. Applications domain — Dashboard then Review Queue pipeline  
4. Discord domain — link / role / sync health  
5. Onboarding progress to production-ready  
6. Referrals / commission posture  
7. Control Center Administration for partnership actions (Suspend mock available)  

---

## Deferred: Automated Alerts & Stage 2 Intelligence

Do not implement Activity Status, Attention Queues, or BI until Stage 1 Wave E completes.  
[`AUTOMATED_ALERTS.md`](./AUTOMATED_ALERTS.md) · [`IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)

---

## Intelligence questions (future BI — Stage 2)

Which analysts generate revenue · retain members · produce quality research · grow fastest · stay active · deserve homepage promotion · need support · which categories are strongest

---

## Design inheritance

Admin design freeze applies. Cross-ref: `docs/AI/Agents/Admin/02_Frontend_Design_System_and_UX_Rules.md`.

---

## Related

- Ecosystem IA: [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)  
- Roadmap: [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)
