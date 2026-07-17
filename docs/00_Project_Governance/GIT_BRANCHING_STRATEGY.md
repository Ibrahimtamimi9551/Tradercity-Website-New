# TraderCity — Git Branching Strategy

**Document Version:** 1.0  
**Status:** Official Engineering Reference  
**Scope:** Branch policy, naming, lifecycle, merge strategy

---

## Purpose

This is the official Git branching policy for TraderCity.

Git tracks **changes**. It does **not** represent product architecture.

> **Product Architecture ≠ Git Structure**  
> Business modules are permanent. Git branches are temporary.

---

## Target Branch Model (v1.0 Standard)

The following model is the **official standard** from Governance v1.0 onward.

Repository reorganization to fully adopt this model (create `develop`, align `master`, archive legacy branches) is a **separate task**. Until that task is complete, follow the naming and intent below for all *new* work, and consult `PROJECT_HISTORY.md` for legacy branch meaning.

```text
master          Production-ready code only
develop         Main integration branch
feature/*       One branch per feature (temporary)
experiment/*    Temporary research
hotfix/*        Emergency production fixes
```

---

## Branch Definitions

### `master`

**Purpose:** Production-ready code only.

**Rules:**
- Never experimental
- Never used for day-to-day feature building
- Receives releases and production hotfixes only
- Must always be deployable

---

### `develop`

**Purpose:** Main integration branch.

**Rules:**
- Every completed feature merges here first
- May be ahead of production
- Not a dumping ground for unfinished experiments
- Default base for new `feature/*` and most `experiment/*` work

---

### `feature/*`

**Purpose:** One branch per feature.

**Examples:**

```text
feature/admin-discord
feature/referral-engine
feature/homepage-hero
feature/payment-verification
```

**Rules:**
- Temporary
- Branch from `develop`
- Merge back into `develop` when complete
- Delete after merge

---

### `experiment/*`

**Purpose:** Temporary research and investigation.

**Examples:**

```text
experiment/mobile-touch
experiment/react-upgrade
experiment/performance
experiment/new-sidebar
```

**Rules:**
- Temporary
- May diverge; outcomes are findings, not automatic merges
- Document conclusions (especially if no code is promoted)
- Delete after investigation
- If an experiment produces a real fix, promote via a clean `feature/*` or `hotfix/*` path — do not leave long-lived experiment branches as product baselines

---

### `hotfix/*`

**Purpose:** Emergency production fixes.

**Examples:**

```text
hotfix/login-redirect
hotfix/admin-sidebar-touch
```

**Rules:**
- Branch from the production baseline (`master` once aligned)
- Test before release
- Merge to `master` for production
- Back-merge into `develop` so the fix is not lost
- Delete after merge

---

## Naming Conventions

| Pattern | Format | Notes |
|---------|--------|-------|
| Feature | `feature/<kebab-case-name>` | Noun/verb phrase describing the outcome |
| Experiment | `experiment/<kebab-case-topic>` | Topic of investigation |
| Hotfix | `hotfix/<kebab-case-issue>` | Issue being fixed |

**Do:**
- Use lowercase kebab-case
- Keep names short and searchable
- Reflect the product domain when helpful (`admin-`, `homepage-`, `payment-`)

**Do not:**
- Use personal names as branch purpose (`ibrahim-wip`)
- Use vague names (`fix`, `updates`, `test`)
- Encode product architecture into permanent branch names

---

## Branch Lifecycle

```text
create from develop (or master for hotfix)
  → implement
  → test (local + preview + checklist)
  → review
  → merge into target
  → delete branch
```

| Branch type | Create from | Merge into | Delete after |
|-------------|-------------|------------|--------------|
| `feature/*` | `develop` | `develop` | Yes |
| `experiment/*` | `develop` (usually) | Only if promoting real change via proper path | Yes |
| `hotfix/*` | `master` | `master`, then `develop` | Yes |

---

## Merge Strategy

### Default

- Prefer **merge commits** or **squash merges** consistently per team preference once reorganization lands.
- Until stated otherwise in a later governance revision: **squash merge** feature branches into `develop` for a clean integration history; keep hotfix history clear and auditable.

### Required before merge

1. Testing checklist passed (`TESTING_CHECKLIST.md`)
2. Preview deployment validated when UI is involved
3. No unrelated module changes
4. Governance and domain rules respected

### Forbidden

- Force-pushing shared integration branches (`develop`, `master`) without explicit human approval
- Merging experiments directly into `master`
- Long-lived feature branches that become unofficial baselines
- Using Git branches as permanent product modules

---

## Principles (Repeated by Design)

1. **Product Architecture ≠ Git Structure**
2. **Git manages changes. It does not represent the product structure.**
3. **Every implementation starts from `develop`.**
4. **Every new feature creates `feature/<feature-name>`.**
5. **Every investigation creates `experiment/<topic>`.**
6. **Every production issue creates `hotfix/<issue>`.**

---

## Legacy Note (Read-Only Context)

Historical branches such as `prototype-redesign`, `homepage-cursor-experiment`, and `mobile-investigation` document the Foundation Phase. They are **not** the ongoing model.

See `PROJECT_HISTORY.md`.

Do **not** rename or delete those branches as part of Governance v1.0 documentation. Repository reorganization is a separate, explicit task.

---

## Related References

| Document | Role |
|----------|------|
| `DEVELOPMENT_WORKFLOW.md` | Full lifecycle |
| `RELEASE_PROCESS.md` | Develop → production |
| `PROJECT_HISTORY.md` | Legacy branch documentation |
| `AI_DEVELOPMENT_GUIDELINES.md` | Agents must not invent alternate Git workflows |

---

*TraderCity Project Governance v1.0*
