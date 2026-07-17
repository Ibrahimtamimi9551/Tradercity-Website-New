# TraderCity — Development Workflow

**Document Version:** 1.0  
**Status:** Official Engineering Reference  
**Scope:** End-to-end development lifecycle

---

## Purpose

This document defines how every feature, fix, and investigation moves from idea to production.

Consistency matters more than speed once TraderCity is in the Engineering Phase.

> **Every implementation starts from `develop`.**  
> (Until `develop` exists in the repository, treat the agreed integration baseline as the functional equivalent — see `PROJECT_HISTORY.md` and the future reorganization task.)

---

## Lifecycle

```text
Idea
  ↓
Planning
  ↓
Create Feature Branch
  ↓
Implementation
  ↓
Local Testing
  ↓
Vercel Preview Deployment
  ↓
Desktop Testing
  ↓
Real Mobile Testing
  ↓
Code Review
  ↓
Merge into Develop
  ↓
Release
  ↓
Merge into Master
```

---

## Stage Definitions

### 1. Idea

A problem, opportunity, or product need is identified.

**Output:** Clear problem statement. Not a branch yet.

**Rules:**
- Prefer one idea → one outcome.
- Distinguish feature work from investigation (`experiment/*`).

---

### 2. Planning

Define scope before code.

**Include:**
- Domain affected (see `PROJECT_ARCHITECTURE.md`)
- In-scope / out-of-scope
- Files or modules likely touched
- Risks (routing, contracts, design freeze, mobile)
- Success criteria and testing expectations

**AI agents:** Read governance docs and domain-specific Agent docs before proposing a plan. Explain assumptions.

**Output:** Agreed plan. No unrelated refactors.

---

### 3. Create Feature Branch

Create a temporary branch for the change.

```text
feature/<feature-name>
```

For research only:

```text
experiment/<topic>
```

For production emergencies:

```text
hotfix/<issue>
```

**Rules:**
- Branch from `develop` (or the current integration baseline until `develop` is created).
- One branch → one concern.
- Never build features directly on `master`.

See `GIT_BRANCHING_STRATEGY.md`.

---

### 4. Implementation

Write the smallest change that delivers the planned outcome.

**Rules:**
- Stay inside the target domain.
- Reuse existing design system and folder structure.
- Do not invent APIs or bypass workflows.
- Do not modify unrelated modules.
- Do not refactor without explicit approval.
- Preserve Marketing ↔ Admin isolation.

---

### 5. Local Testing

Validate on the local Next.js app before any deployment.

```bash
npm run dev
npm run lint
npm run build
```

**Minimum:**
- Happy path for the feature
- No new TypeScript / ESLint failures
- Production build succeeds
- Obvious console errors addressed

See `TESTING_CHECKLIST.md`.

---

### 6. Vercel Preview Deployment

Push the feature branch and use a Vercel Preview deployment as the shared review environment.

**Purpose:**
- Validate production-like build
- Share a URL for desktop and real-device testing
- Catch environment-only issues early

See `DEPLOYMENT_GUIDE.md`.

---

### 7. Desktop Testing

Test the Preview (or local production build) on desktop viewports.

**Cover:**
- Primary flows
- Layout integrity
- Navigation / shell behavior
- Console cleanliness

---

### 8. Real Mobile Testing

Test on a **real mobile device**, not only browser device emulation.

**Cover:**
- Touch targets and gestures
- Drawer / bottom nav / overlays
- Viewport and safe areas
- Performance feel on device

Emulation can catch layout issues. It does not replace real-device confirmation for touch and mobile chrome behavior.

---

### 9. Code Review

Human and/or structured review against governance and domain rules.

**Ask:**
- Does this match the plan?
- Did anything unrelated change?
- Are contracts and isolation preserved?
- Does the testing checklist pass?

---

### 10. Merge into Develop

Merge the completed feature into `develop`.

**Rules:**
- Checklist passed
- Preview validated
- Branch deleted after merge when temporary

`develop` is the integration branch — not production.

---

### 11. Release

Promote a known-good `develop` state through release process toward production.

See `RELEASE_PROCESS.md`.

---

### 12. Merge into Master

`master` receives only production-ready releases.

**Rules:**
- No experiments on `master`
- No partial features on `master`
- Hotfixes follow the hotfix path and still end in a production-ready `master`

---

## Workflow Variants

| Work type | Branch | Path |
|-----------|--------|------|
| Feature / enhancement | `feature/*` | Full lifecycle above |
| Investigation / spike | `experiment/*` | Plan → implement → document findings → delete branch; merge only if promoting a real fix |
| Production emergency | `hotfix/*` | Branch from production baseline → fix → test → release to `master` → back-merge to `develop` |

---

## Non-Negotiable Principles

1. **Product Architecture ≠ Git Structure**
2. **Git manages changes; it does not represent the product**
3. **Every implementation starts from `develop`**
4. **Every new feature creates `feature/<feature-name>`**
5. **Every investigation creates `experiment/<topic>`**
6. **Every production issue creates `hotfix/<issue>`**
7. **No merge without the testing checklist**
8. **Documentation and governance come before repository reshaping**

---

## Related References

| Document | Role |
|----------|------|
| `GIT_BRANCHING_STRATEGY.md` | Branch naming and lifecycle |
| `RELEASE_PROCESS.md` | Promote develop → production |
| `DEPLOYMENT_GUIDE.md` | Local / Preview / Production |
| `TESTING_CHECKLIST.md` | Required gates |
| `AI_DEVELOPMENT_GUIDELINES.md` | Agent behavior |

---

*TraderCity Project Governance v1.0*
