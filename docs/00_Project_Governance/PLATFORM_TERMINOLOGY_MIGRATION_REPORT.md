# Platform Terminology Migration Report

**Version:** 1.0  
**Date:** July 23, 2026  
**Type:** Terminology & information-architecture standardization (not a feature)  
**Plan:** [`PLATFORM_TERMINOLOGY_MIGRATION_PLAN.md`](./PLATFORM_TERMINOLOGY_MIGRATION_PLAN.md)  
**Canonical vocabulary:** [`PLATFORM_TERMINOLOGY.md`](./PLATFORM_TERMINOLOGY.md)

---

## 1. Summary

Established a permanent three-level vocabulary for TraderCity:

| Level | Term | Example |
|-------|------|---------|
| Product | Platform | Analyst Platform |
| Engineering | Domain | Analyst Domain |
| Admin UI | Short noun | Analysts |

Deprecated “X Management” as a product/UI domain label. Renamed Website → **Content** at the platform/domain/UI levels.

---

## 2. Files modified

### Governance / architecture

| File | Change |
|------|--------|
| `docs/00_Project_Governance/PLATFORM_TERMINOLOGY.md` | **Created** — canonical vocabulary |
| `docs/00_Project_Governance/PLATFORM_TERMINOLOGY_MIGRATION_PLAN.md` | **Created** |
| `docs/00_Project_Governance/PLATFORM_TERMINOLOGY_MIGRATION_REPORT.md` | **Created** (this file) |
| `docs/00_Project_Governance/PROJECT_ARCHITECTURE.md` | Platform structure + terminology link |
| `docs/00_Project_Governance/MODULE_OWNERSHIP.md` | Member Domain wording |
| `docs/README.md` | Index PLATFORM_TERMINOLOGY |

### Frontend (labels only)

| File | Change |
|------|--------|
| `src/types/admin/navigation.ts` | Comments → Content / Members |
| `src/components/admin/layout/nav-config.ts` | Section labels Members/Analysts/Content; Directory item; Content IA; deprecated aliases |
| `src/lib/analysts/mock/dashboard.ts` | Comment wording |

**Routes unchanged.** Sidebar consumers (`AdminSidebar`, `AdminMobileNav`) already render `ADMIN_NAV_DOMAINS` — no structural rewrite required.

### Analyst documentation subsystem

Updated throughout `docs/Analyst/**` (vision, architecture, frontend, admin, backend, implementation, overview, changelog).

### Related Admin status docs

| File | Change |
|------|--------|
| `docs/Development/Admin/PROJECT_STATUS.md` | Section nouns + Member Platform Admin wording |
| `docs/Development/Admin/Phase-Roadmap.md` | Terminology update note |

---

## 3. Terminology replaced

| From (legacy) | To |
|---------------|-----|
| Member Management | Member Platform (product) / Member Domain (eng) / Members (UI) |
| Analyst Management | Analyst Platform / Analyst Domain / Analysts |
| Website Management | Content Platform / Content Domain / Content |
| Sidebar “Analysts” list item | **Directory** (href still `/admin/analysts/directory`) |
| Learning Library / Research Library | Learning / Research |
| Announcements (Content IA) | Reports (Content IA) |
| Content “Dashboard” nav item | Removed from IA |

---

## 4. Updated navigation architecture

```text
MEMBERS
  Dashboard → /admin
  Members → /admin/members
  Subscriptions → /admin/subscriptions
  Discord → /admin/discord
  Referrals → /admin/referrals

ANALYSTS
  Dashboard → /admin/analysts
  Directory → /admin/analysts/directory
  Applications → /admin/analysts/applications
  Verification → /admin/analysts/verification
  Partnerships → /admin/analysts/partnerships
  Commissions → /admin/analysts/commissions

CONTENT (coming soon — no routes)
  Homepage · Landing Pages · Learning · Research · Reports · Events
```

Nav config exports: `MEMBERS_NAV`, `ANALYSTS_NAV`, `CONTENT_NAV` (legacy aliases retained).

---

## 5. Intentional exceptions

| Exception | Reason |
|-----------|--------|
| No folder renames (`members/`, `analysts/`) | Avoid cosmetic import churn |
| No route changes | Preserve bookmarks & deep-links |
| `/admin/analysts/referrals` shell kept, **not in sidebar** | Future Community / attribution IA; avoid nav churn now |
| Subscriptions / Discord remain under **Members** UI | Commerce / Community platforms are future migrations |
| Historical Admin Agent docs (`docs/AI/Agents/Admin/*`) still say “Member Management Phases 0–6” | Historical delivery program; interpret as Member Platform Admin; gradual rewrite later |
| Branch name `feature/admin-analyst-management-phase-1` | Git history; do not rename mid-stream |

---

## 6. Future reserved domains (UI not shown yet)

- **Commerce** — pricing, payments, payouts (Subscriptions migrate here)  
- **Community** — Discord ops, campaigns, referral campaigns  
- **Platform** — roles, settings, audit, feature flags  

---

## 7. Recommendations for further standardization

1. When editing Admin Agent chapters 00–08, replace “Member Management” with Member Platform / Member Domain per context.  
2. Add Commerce / Community / Platform sections to `ADMIN_NAV_DOMAINS` only when those domains start (comingSoon first).  
3. Backend OpenAPI tags should use Domain names (`Analyst`, `Member`, `Content`).  
4. Keep `docs/Analyst/` as the Analyst Platform SoT; do not reintroduce Analyst specs into mixed Admin packs.  
5. AI agents: load [`PLATFORM_TERMINOLOGY.md`](./PLATFORM_TERMINOLOGY.md) before naming new modules.

---

## 8. Verification

- [x] Sidebar domain headings are short nouns  
- [x] Analyst directory nav label is “Directory”  
- [x] Content IA matches Content Platform  
- [x] Member hrefs unchanged  
- [x] `docs/Analyst/` uses Platform / Domain language  
- [x] Migration plan + canonical vocabulary published under governance
