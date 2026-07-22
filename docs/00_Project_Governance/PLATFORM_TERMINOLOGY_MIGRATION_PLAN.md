# Platform Terminology Migration Plan

**Version:** 1.0  
**Date:** July 23, 2026  
**Type:** Architecture / documentation / UI vocabulary refactor (not a feature)  
**Canonical vocabulary:** [`PLATFORM_TERMINOLOGY.md`](./PLATFORM_TERMINOLOGY.md)

---

## 1. Why

Legacy labels (`Member Management`, `Analyst Management`, `Website Management`) imply a single ops app. TraderCity is a multi-platform product. “Management” does not describe business capability ownership. We standardize **Platform / Domain / UI noun** before more domains ship.

---

## 2. What will change

| Surface | Change |
|---------|--------|
| Admin sidebar domain headings | `Members` · `Analysts` · `Content` |
| Analyst directory nav item label | `Analysts` → `Directory` (href unchanged) |
| Content IA items | Align to Content Platform (Learning, Research, Reports, Events; drop Content “Dashboard” from IA) |
| `docs/Analyst/**` | Product → Platform; architecture → Domain; UI → short nouns |
| Governance / status notes describing IA | Point at new vocabulary |
| Nav config IDs / export names | Prefer `members` / `analysts` / `content` (keep deprecated aliases if needed) |
| Comments in nav/types | Update Website → Content |

### Analyst nav item set (UI)

```text
Analysts
  Dashboard
  Directory
  Applications
  Verification
  Partnerships
  Commissions
```

`/admin/analysts/referrals` **route remains** (shell) but is **removed from sidebar** — Analyst referral attribution moves conceptually toward Community / later IA; noted as intentional exception.

### Content nav item set (UI, coming soon)

```text
Content
  Homepage
  Landing Pages
  Learning
  Research
  Reports
  Events
```

---

## 3. What will remain

| Remain | Reason |
|--------|--------|
| All existing routes / hrefs | No breaking URL changes |
| Folder paths (`members/`, `analysts/`, `admin/`) | Avoid cosmetic import churn |
| Member primary mobile bar | Still Members domain primaries |
| Business logic / mocks / APIs | Terminology only |
| Historical Admin Agent phase wording | Gradual; map mentally to Member Platform |

---

## 4. Why this approach

- Establishes ubiquitous language before Commerce / Community / Platform Admin expand  
- Keeps UI short and business-oriented  
- Separates product vs engineering vs UI contexts  
- Avoids repository destabilization  

---

## 5. Deliverables

1. This plan + [`PLATFORM_TERMINOLOGY.md`](./PLATFORM_TERMINOLOGY.md)  
2. Updated Admin navigation architecture (code)  
3. Documentation terminology refactor (`docs/Analyst/` + related status/architecture pointers)  
4. Frontend label refactor (sidebar / More sheet)  
5. [`PLATFORM_TERMINOLOGY_MIGRATION_REPORT.md`](./PLATFORM_TERMINOLOGY_MIGRATION_REPORT.md)

---

## 6. Out of scope

- Renaming `src/components/members` → something else  
- Moving Subscriptions under Commerce in the UI (future)  
- Moving Discord under Community in the UI (future)  
- Backend API path renames  
- Rewriting entire Admin Agent history (00–08) in one pass
