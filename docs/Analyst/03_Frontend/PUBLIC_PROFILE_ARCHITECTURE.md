# Public Profile Architecture (Homepage Presentation Manager)

**Version:** 1.0  
**Status:** Active — Stage 1 mock shipped  
**Authority:** `docs/Analyst/03_Frontend/`  
**Route:** `/admin/analysts/applications?view=public_profile`  
**Implementation:** [`../06_Implementation/ANALYST_PUBLIC_PROFILE_IMPLEMENTATION.md`](../06_Implementation/ANALYST_PUBLIC_PROFILE_IMPLEMENTATION.md)

---

## Purpose

Public Profile Management is the **Homepage Presentation Manager** for approved analysts.

- **Application** = evaluation data  
- **Public Profile** = curated marketing presentation (single source of truth for Meet the Analysts)  
- **Homepage** = pure consumer of **Published** profiles only  

The homepage must never read applications directly.

---

## Pipeline

```text
Analyst Application
        │
        ▼
Application Review
        │
        ▼
Approved Analyst
        │
        ▼
Generate Public Profile Draft   ← automatic, idempotent
        │
        ▼
Admin Curation
        │
        ▼
Preview
        │
        ▼
Published (soft)                ← homepage-eligible
        │
        ▼
Meet the Analysts Homepage      ← consumer (`#analysts`)
```

---

## Soft publish (1C)

| Status | Meaning |
|--------|---------|
| `draft` | Curating — not homepage-eligible |
| `preview` | Admin review checkpoint |
| `published` | Soft publish — eligible for homepage consumption |

**Published** means: eligible to appear on the homepage. It does **not** require Operationally Ready (Discord / System Provisioning). Ops readiness and marketing introduction stay independent.

Unpublish returns the profile to `draft`.

---

## Homepage contract

```text
listPublishedPublicProfiles()

WHERE
  status === "published"
  AND publicVisibility === true
  AND verified === true
  AND active === true          // Directory active | growing
ORDER BY
  featured DESC
  displayOrder ASC
```

Implementation: `src/lib/analysts/mock/public-profiles.ts` → `listPublishedPublicProfiles()`.

Meet the Analysts must:

1. Call that helper (or NestJS equivalent) via `usePublishedPublicProfiles`  
2. Render a three-card equal-size spotlight with `PublicAnalystCard` (focus via opacity/blur — not scale)  
3. Add no extra filtering or application joins  

---

## Domain IA

```text
Applications
├── Dashboard
├── Review Queue
├── Onboarding (System Provisioning)
├── Public Profile          ← this module
├── Archive
└── Intelligence (Soon)
```

URL: `?view=public_profile&application=app-005`  
Mobile: `/admin/analysts/applications/[id]?surface=public_profile`

---

## Data model (presentation)

Owned type: `PublicAnalystProfile` in `src/types/analysts/public-profile.ts`.

| Section | Fields |
|---------|--------|
| Identity | profileImageUrl, displayName, analystTitle, featured; verified + active read-only |
| Introduction | shortIntroduction (≤220), publicStatement |
| Statistics | optional enabled presentation stats |
| Research Focus | max 4 |
| Trading Philosophy | title + description |
| Markets | max 4 |
| Links | website, X, YouTube, Telegram, Discord |
| Card settings | publicVisibility, featured, displayOrder |

`active` syncs from Directory (`active` | `growing`). Admin cannot edit it in this phase.

---

## Presentation layer

```text
Public Profile Editor
        │
        ▼
Live Preview
        │
        ▼
PublicAnalystCard
        │
        ▼
Homepage Meet the Analysts → PublicAnalystCard
```

Component: `src/components/analysts/public-profile/PublicAnalystCard.tsx`  
Homepage: `src/components/home/analyst-team/AnalystTeamContent.tsx`

- Driven only by Public Profile props (`toPublicAnalystCardProps`)  
- Adaptive — omit Statistics / Focus / Philosophy / Markets / Connect when empty  
- Never show placeholders for missing sections  
- Homepage carousel: three equal-size full cards; side peeks use focus (opacity / blur / elevation), not scale  
- Optional `compact` variant retained for non-carousel surfaces only  
- Homepage section: `src/components/home/analyst-team/` — marketing consumer only  

---

## Auto-fill on Approve

On successful Approve, `ensurePublicProfileDraftFromApplication` creates a draft if none exists (never overwrites curated content).

| Application | Public Profile |
|-------------|----------------|
| Full Name | Display Name |
| (no photo) | Initials + avatarTone |
| Bio | Short Introduction |
| Experience | Experience statistic (enabled) |
| Primary Markets / Style | Research Focus + Markets |
| Motivation / Style | Trading Philosophy |
| Social / websites | Public Links |
| Approval | Verified badge |

---

## Future enhancements (documentation only — do not implement in this phase)

These should extend the same Public Profile model without architectural redesign:

- Individual analyst public profile pages  
- Analyst report libraries  
- Published analysis history  
- Educational content and lessons  
- Performance history  
- Analyst research archives  
- Community activity timeline  

---

## Related

- Applications domain: [`APPLICATIONS_MODULE_ARCHITECTURE.md`](./APPLICATIONS_MODULE_ARCHITECTURE.md)  
- Approval: [`../04_Admin/APPROVAL_WORKFLOW.md`](../04_Admin/APPROVAL_WORKFLOW.md)  
- Ecosystem homepage note: [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)
