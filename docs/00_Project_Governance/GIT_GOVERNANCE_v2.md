# TraderCity — Git Governance v2.0

**Document Version:** 2.3  
**Status:** Phase 2 Option 2 — Latest Stable Platform on `master`  
**Date:** 2026-07-31  
**Scope:** Branch organization, repository governance, long-term deployment & release strategy  
**Authority:** Supersedes Choice A freeze of `master` at Engineering Baseline; preserves Foundation history policy from `PROJECT_HISTORY.md` and `REPOSITORY_MIGRATION_PLAN.md`

---

## Phase Status

| Phase | Scope | Status |
|-------|--------|--------|
| **Phase 1** | Repository audit, migration plan | **COMPLETE** |
| **Phase 2 (revised)** | Promote latest stable `develop` → `master`; preserve all branches; Vercel Production = `master` | **IN PROGRESS / Option 2** |
| **Branch cleanup** | Delete obsolete feature branches | **DEFERRED** — explicit future approval required |

### Phase 2 Option 2 decisions (current)

| Decision | Resolution |
|----------|------------|
| Permanent branches | Exactly `master`, `develop`, `prototype-redesign` |
| `master` meaning | **Latest Stable Completed Platform** (not frozen Engineering Baseline) |
| `develop` meaning | Active integration branch |
| Promote `develop` → `master` | **YES** — fast-forward / merge current stable tip; no cherry-picks |
| Knowledge Vault | Remains on its own branch; not required on `master` until complete |
| Branch deletion | **NONE** during this phase — all historical branches retained |
| Hotfix workflow | **APPROVED** (unchanged) |
| Safety gates | Pre-check → Execution → Verification → Rollback (unchanged) |
| Force push / history rewrite | **Forbidden** |

---

## 1. Purpose

Organize the TraderCity repository for long-term engineering without rewriting history.

```text
Preserve history
  → Align permanent branches
  → Integrate completed work into develop
  → Promote stable milestones develop → master
  → Production deploys only from master
  → Retain historical branches until explicit future cleanup approval
```

> **Product Architecture ≠ Git Structure**  
> Domains (Homepage, Admin, Analyst, Knowledge Vault) are permanent products in source ownership.  
> Git has exactly three permanent branches. Everything else is either historical/milestone or temporary.

---

## 2. Branch Classification

All branches fall into **one** of these categories. Do not confuse them.

### A. Historical / Milestone Branches

**Purpose:** Preserve important stages of project evolution.

These are **not** active development branches.

| Branch | Classification | Meaning |
|--------|----------------|---------|
| `prototype-redesign` | Historical Foundation (**permanent**) | Original TraderCity redesign before Git governance |
| `homepage-cursor-experiment` | Historical milestone (**kept, read-only**) | **Homepage Foundation + Member Management Foundation** — first major implementation milestone |

**Rules:**

- Remain as historical / milestone references  
- Do **not** continue development inside them  
- Do **not** merge into them  
- Do **not** rewrite their history  
- Do **not** merge from them for new product delivery  
- After migration: both are **read-only**

`mobile-investigation` was a temporary investigation branch (not a permanent milestone). It may be deleted in Phase 2 only after findings are confirmed already incorporated into project documentation.

### B. Feature Branches

**Purpose:** Temporary implementation branches for product-domain delivery.

**Lifecycle:**

```text
Create from develop
  ↓
Develop
  ↓
Test (+ Preview)
  ↓
Merge into develop
  ↓
Delete
```

**Examples (domain-oriented names):**

```text
feature/analyst-member-platform
feature/knowledge-vault
feature/homepage-refinement
feature/admin-control-centre
```

These are **temporary**. They are deleted after successful merge into `develop` (except while still actively incomplete — see Knowledge Vault).

### C. Other temporary patterns

| Pattern | Role |
|---------|------|
| `experiment/*` | Temporary investigations — delete after findings |
| `hotfix/*` | Temporary production fixes — delete after `master` + `develop` |

---

## 3. Permanent Branches

Keep **exactly** these three permanent branches.

### `master`

| Field | Policy |
|-------|--------|
| Purpose | **Production releases** |
| Content | Only stable production releases |
| Development | **Never** perform active feature development directly |
| Deploy | **Only** production source for `https://tradercitycrypto.vercel.app` |
| Receives | Stable milestones from `develop`, and `hotfix/*` |
| Option 2 tip | Promoted to match current stable `develop` tip (may equal `develop` until next feature lands) |

### `develop`

| Field | Policy |
|-------|--------|
| Purpose | **Active integration branch** — daily development |
| Receives | Every **completed** feature branch |
| Role | Integration of completed work before a stable milestone promotes to `master` |
| Promotion | `develop` → `master` when a stable milestone is reached |
| Base | Default start point for new `feature/*` / most `experiment/*` |

```text
feature/* (completed)
  ↓
develop
  ↓
Integration testing
  ↓
master          ← only when deliberately releasing
  ↓
Production
```

### `prototype-redesign`

| Field | Policy |
|-------|--------|
| Purpose | **Historical snapshot** — original redesign before Git governance |
| Mode | Completely **read-only** |
| Rules | Never merge into it. Never merge from it. Never develop on it again. |
| Retention | Keep forever as project history |
| Tip freeze | `ef7e67e` — Hero section Illustration Refinement |

---

## 4. Repository Audit (as of 2026-07-30)

### 4.1 Remote

| Field | Value |
|-------|--------|
| Remote | `origin` → `https://github.com/ibrahimtamimi9551/Tradercity-Website-New.git` |
| **GitHub default branch (`origin/HEAD`)** | **`prototype-redesign`** |
| Local workspace HEAD | `feature/admin-analyst-management-phase-1` @ `337f24b` |
| Linked Vercel project (local `.vercel`) | `tradercitycrypto` (`prj_10uvy2Pht4ayMGf4ZsdQw3ygfx6Q`) |
| Public production URL (target) | `https://tradercitycrypto.vercel.app` |

**Critical finding:** GitHub’s default branch is still `prototype-redesign` (tip `ef7e67e`, 2026-07-08). That tip is **behind** the Engineering Baseline on `master` (`1798fe9`, 2026-07-18) and far behind current feature work. If Vercel Production is mapped to the GitHub default or explicitly to `prototype-redesign`, production is not serving the intended baseline.

### 4.2 Current Branches

#### Local + remote

| Branch | Tip SHA | Classification | Role today |
|--------|---------|----------------|------------|
| `prototype-redesign` | `ef7e67e` | Historical / **permanent** | Foundation snapshot; also **GitHub default** |
| `master` | `1798fe9` | **Permanent** (production) | Engineering Baseline v1.0; identical tip to `homepage-cursor-experiment` |
| `develop` | `41bf813` | **Permanent** (integration) | Includes Referral Ops; **5 commits ahead of `master`** |
| `homepage-cursor-experiment` | `1798fe9` | Historical **milestone** | Homepage Foundation + Member Management Foundation |
| `mobile-investigation` | `5ba11ff` | Temporary investigation | Diverged; delete only after findings confirmed |
| `feature/admin-referrals-operations` | `d581f0a` | Feature (obsolete) | **Fully merged into `develop`** |
| `feature/admin-analyst-management-phase-1` | `337f24b` | Feature (phase-named; to retire) | Active tip — Analyst + homepage refinement + Admin Guide / Subscriptions (**11 ahead of `develop`**) |
| `feature/knowledge-vault` | `3c71470` | Feature (**active — incomplete**) | Architecture docs only; **do not merge in Phase 2** |

#### Local only (not on `origin`)

| Branch | Tip SHA | Notes |
|--------|---------|--------|
| `feature/homepage-refinement` | `cbc7388` | Not pushed. Tip is an ancestor of `feature/admin-analyst-management-phase-1`. |

#### Domain feature names not present as separate tips

| Name | Exists? |
|------|---------|
| `feature/analyst-member-platform` | **No** (work lives on shared line / admin-analyst tip) |
| `feature/admin-control-centre` | **No** (future domain work) |

### 4.3 Ancestry (containment — do not rewrite)

```text
prototype-redesign (ef7e67e)     … Historical Foundation (permanent, read-only)
        │
        ▼
… Members / Admin foundation …
        │
        ▼
master / homepage-cursor-experiment (1798fe9)
        │  Engineering Baseline = Homepage + Member Management Foundation milestone
        │
        ├── mobile-investigation (5ba11ff)      ← temporary investigation
        │
        ▼
feature/admin-referrals-operations (d581f0a)
        │
        ▼
develop (41bf813)                               ← referrals integrated
        │
        ▼
Analyst + homepage line (… → cbc7388)
        │
        ├── feature/homepage-refinement (cbc7388)     [local]
        ├── feature/knowledge-vault (+ docs 3c71470)  [ACTIVE — do not merge Phase 2]
        └── feature/admin-analyst-management-phase-1 (+ admin …337f24b)
```

**Implications:**

1. `feature/admin-analyst-management-phase-1` contains Analyst platform commits and the `feature/homepage-refinement` tip.  
2. `feature/knowledge-vault` adds one unique docs commit (`3c71470`) and remains **active / incomplete**.  
3. Do **not** rewrite history to invent parallel domain histories.  
4. Future work uses **product-domain** feature names — not phase/wave/iteration names.

### 4.4 Tags

| Tag | Points near | Meaning |
|-----|-------------|---------|
| `v1.0.0-engineering-baseline` | `1798fe9` (`master`) | Engineering Baseline |
| `v1.1.0-admin-referrals` | `41bf813` (`develop`) | Referral Dashboard & Revenue Intelligence |
| `v1.1.0-analyst-wave-a` | `8e7011d` | Analyst Platform foundation |
| `v1.2.0-analyst-wave-c` | `473d650` | Analyst Applications & Discord waves |

### 4.5 Worktrees / side checkouts

| Path | Branch / HEAD |
|------|----------------|
| `D:/Tradercity Project/Tradercity Website Cursor` | `feature/admin-analyst-management-phase-1` |
| Stable worktree (linked to `prototype-redesign`) | `prototype-redesign` @ `ef7e67e` |
| Codex worktree | detached |

### 4.6 Vercel — current state (Phase 1 inspection limits)

| Item | Finding |
|------|---------|
| Project name | `tradercitycrypto` |
| Project ID | `prj_10uvy2Pht4ayMGf4ZsdQw3ygfx6Q` |
| Org/team ID | `team_B5BpGGx724jeFhqyEKbgyLzj` |
| `vercel.json` in repo | **Not present** |
| Vercel CLI / authenticated dashboard API | **Not available in this audit environment** |
| **Production Git branch (dashboard)** | **UNCONFIRMED in Phase 1** — verify before Phase 2 |

### 4.7 GitHub protections

`gh` CLI was **not available** during Phase 1. Branch protection rules are **UNCONFIRMED**. Phase 2 must verify via GitHub UI or install/auth `gh`.

### 4.8 Phase 2 action matrix (post-review)

| Action | Phase 2? | Decision |
|--------|----------|----------|
| Rename Historical / Milestone branches | **No** | Keep names forever |
| Merge `feature/admin-analyst-management-phase-1` → `develop` | **Yes** | Primary integration |
| Merge `feature/knowledge-vault` → `develop` | **No** | Incomplete — remains active |
| Promote `develop` → `master` | **No** | **Release Choice A only** |
| Change GitHub default → `master` | **Yes** | Leave `prototype-redesign` as historical permanent |
| Change Vercel Production → `master` | **Yes** | Align with Choice A baseline |
| Delete `feature/admin-referrals-operations` | **Yes** | After verification already on `develop` |
| Delete `feature/admin-analyst-management-phase-1` | **Yes** | After successful merge verification |
| Delete `mobile-investigation` | **Conditional** | Only after findings confirmed incorporated |
| Keep `prototype-redesign` | **Yes** | Permanent historical |
| Keep `homepage-cursor-experiment` | **Yes** | Historical milestone (read-only) |
| Keep `feature/knowledge-vault` | **Yes** | Active incomplete work |

---

## 5. Target Branch Structure

```text
PERMANENT (exactly three)
─────────────────────────
master                 Production releases only
develop                Integration / next release candidate
prototype-redesign     Historical Foundation (READ ONLY, forever)

HISTORICAL / MILESTONE (kept, read-only — not permanent governance lines)
─────────────────────────
homepage-cursor-experiment
  = Homepage Foundation + Member Management Foundation
  = First major implementation milestone
  → Read-only after migration

TEMPORARY
─────────────────────────
feature/*              Product-domain delivery (delete after merge into develop)
experiment/*           Investigations (delete after findings)
hotfix/*               Production emergencies (delete after master + develop)

SPECIAL (Phase 2)
─────────────────────────
feature/knowledge-vault   Active / incomplete — do NOT merge or delete in Phase 2
mobile-investigation      Delete only after findings confirmation
```

---

## 6. Historical Milestone: `homepage-cursor-experiment`

This branch is the **first major implementation milestone** of TraderCity.

| Field | Value |
|-------|--------|
| Tip | `1798fe9` (identical to current `master` / Engineering Baseline) |
| Meaning | **Homepage Foundation** + **Member Management Foundation** |
| Classification | Historical / Milestone (Category A) |
| Post-migration | **Read-only** |
| Retention | **Keep** — do not delete |

**Rules after migration:**

- No further commits  
- No merges into it  
- No merges from it for new delivery  
- New Homepage or Member work uses `feature/*` from `develop`  

---

## 7. Knowledge Vault Policy

### Status

`feature/knowledge-vault` is **not complete**.

It currently contains architecture documentation only (`3c71470`).

### Intended future scope (on this branch)

- Research  
- Education  
- Reports  
- Learning Framework  
- Knowledge Base  
- Frontend  
- Backend  
- Search  
- Categories  
- Analyst Publications  
- AI Context Engine  

### Phase 2 rules

| Rule | Detail |
|------|--------|
| Merge into `develop` | **DO NOT** |
| Delete branch | **DO NOT** |
| Status | Remains **active** |
| Integration | Only when Knowledge Vault is intentionally completed and approved |

---

## 8. Merge Strategy

### Default

| Flow | Strategy |
|------|----------|
| `feature/*` → `develop` | Prefer **squash merge** unless a merge commit is needed to preserve a tagged multi-commit milestone |
| `develop` → `master` | Prefer **merge commit** (explicit release boundary) — **not in Phase 2** |
| `hotfix/*` → `master` | Merge commit or squash — auditable; then **back-merge** into `develop` |
| Historical / Milestone → anything | **Forbidden** for new product delivery |
| `feature/knowledge-vault` → `develop` | **Forbidden in Phase 2** |

### Required before merge into `develop`

1. Feature is **complete** for its intended scope (or explicitly scoped complete)  
2. `TESTING_CHECKLIST.md` passed  
3. Preview deployment validated when UI is involved  
4. No unrelated module changes  
5. Domain ownership respected (`MODULE_OWNERSHIP.md`)  
6. No inventing backend contracts  

### Forbidden

- Force-push to `master` / `develop` without explicit human approval  
- Merging Historical / Milestone branches into active lines for “cleanup”  
- Direct feature → `master` (except documented hotfixes)  
- Rewriting history to invent parallel domain histories  
- Merging incomplete domains (e.g. Knowledge Vault) “just because the branch exists”  

---

## 9. Hotfix Strategy

**APPROVED — no changes.**

```text
master
  ↓
hotfix/<issue>
  ↓
Test + Preview
  ↓
Merge → master        → Production deploy
  ↓
Merge → develop       → Keep integration current
  ↓
Delete hotfix/<issue>
```

**Rules:**

- Never fix production-only bugs directly on `develop` as the sole path  
- Production receives only the fix  
- `develop` receives the same fix so features do not reintroduce the bug  
- No unfinished features ride along on the hotfix  

---

## 10. Release Strategy

### Repository Evolution (Option 2 — 2026-07-31)

Originally, during repository recovery, `master` was intentionally frozen at the **Engineering Baseline** (`1798fe9` / `v1.0.0-engineering-baseline`) so production stayed on a known-good snapshot while integration continued on `develop` (**Choice A**).

After repository stabilization and successful migration of completed Analyst / Admin work into `develop`, that freeze was **revised**.

The project is still under active development and is **not publicly launched**. Therefore the latest completed implementation should be the stable production baseline.

**Adopted standard release workflow:**

```text
feature/*
      │
      ▼
develop          ← active integration
      │
      ▼
master           ← Latest Stable Completed Platform
      │
      ▼
Vercel Production (tradercitycrypto.vercel.app)
```

Each stable milestone is promoted from `develop` into `master`. It is acceptable for `master` and `develop` to point at the **same commit** until new development begins on `develop`.

### Long-term release flow

```text
feature/* (completed)
  ↓
develop
  ↓
Integration testing (desktop + real device + build)
  ↓
Preview validation of release candidate
  ↓
Merge / fast-forward develop → master
  ↓
Production deployment (Vercel from master)
  ↓
Tag release (e.g. vX.Y.Z) when intentional
```

| Environment | Git source | Vercel |
|-------------|------------|--------|
| Production | `master` only | Production Deployment |
| Integration | `develop` | Preview / designated non-prod alias |
| Feature review | `feature/*` | Preview Deployment (always) |

---

## 11. Future Release Branch Strategy (Scalability — Informational Only)

**This section is informational.**  
**Release branches are NOT required today.**  
**Release branches are NOT part of Phase 2.**

### Permanent branches remain unchanged

```text
master
develop
prototype-redesign
```

No fourth permanent branch is introduced by this section.

### When release branches become relevant

Introduce `release/*` only when engineering scale requires separating QA freeze from ongoing integration:

- Multiple releases happen simultaneously  
- Multiple developers work in parallel  
- A dedicated QA process exists  
- Production release cycles become frequent  

Until then, the long-term flow in §10 (`feature/*` → `develop` → `master`) is sufficient.

### Future workflow (when adopted)

```text
feature/*
  ↓
develop
  ↓
release/v1.x          ← freeze production candidate
  ↓
QA / Final Testing
  ↓
master                ← production release
```

### Purpose of `release/vX.Y` (future)

| Benefit | Detail |
|---------|--------|
| Freeze a production candidate | Stabilize what will ship |
| Continue feature work on `develop` | Parallel delivery without contaminating the freeze |
| Separate QA from active development | QA runs on `release/*`, not on moving `develop` |
| Prevent unfinished features entering production | Only the frozen candidate promotes to `master` |

### Future rules (when adopted)

| Rule | Detail |
|------|--------|
| Create from | `develop` at intentional cut |
| Naming | `release/v<MAJOR>.<MINOR>` (example: `release/v1.2`) |
| Allowed commits | Bug fixes, release docs, version bumps — **not** new features |
| Merge into | `master` after QA; back-merge fixes into `develop` |
| Delete after | Successful production release (temporary, like features) |
| Hotfixes | Still use `hotfix/*` from `master` for production emergencies |

### Explicit Phase 2 exclusion

Do **not** create, merge, or delete any `release/*` branch during Phase 2.

---

## 12. Semantic Versioning

TraderCity follows **Semantic Versioning** as the official release numbering strategy.

### Format

```text
MAJOR.MINOR.PATCH
```

Git tags and public release labels use a `v` prefix:

```text
vMAJOR.MINOR.PATCH
```

### Examples

| Version | Meaning |
|---------|---------|
| `v1.0.0` | First Production Release |
| `v1.1.0` | Knowledge Vault |
| `v1.2.0` | Admin Control Centre |
| `v1.2.1` | Payment Bug Fix |
| `v1.2.2` | Discord Synchronization Fix |

### What each number means

| Component | Increment when |
|-----------|----------------|
| **MAJOR** | Incompatible / breaking product or platform change |
| **MINOR** | Backward-compatible product domain or feature release (e.g. Knowledge Vault, Admin Control Centre) |
| **PATCH** | Backward-compatible bug fix / hotfix |

### How versions relate to repository artifacts

| Artifact | Role |
|----------|------|
| **Git Tags** | Every production release on `master` is tagged `vMAJOR.MINOR.PATCH` |
| **GitHub Releases** | Published from the matching Git tag; include notes summarizing the release |
| **Production Deployments** | Vercel Production from `master` must match the tagged commit for that release |
| **Documentation** | Governance / product docs reference the version when describing shipped milestones |
| **Changelog** | Maintain a changelog entry per released version (what shipped) |
| **Future Release Notes** | Customer/operator-facing notes derived from the changelog for each GitHub Release |

### Current baseline note

Existing tags such as `v1.0.0-engineering-baseline`, `v1.1.0-admin-referrals`, and Analyst wave tags document **pre-governance / milestone** work. Going forward, **production releases from `master`** use clean SemVer tags (`v1.0.0`, `v1.1.0`, …) per this section. Milestone-style suffixes are not required for new production tags.

### Phase 2 note

Phase 2 does **not** create a new production SemVer release (Choice A — `master` stays at Engineering Baseline). SemVer applies to the next intentional production promotion of `develop` → `master`.

---

## 13. Branch Naming Convention

### Future feature branches = long-term product domains

Name branches after **product domains**, not temporary implementation phases.

**Do:**

```text
feature/admin-control-centre
feature/knowledge-vault
feature/homepage-refinement
feature/analyst-member-platform
```

**Do not:**

```text
feature/admin-analyst-management-phase-1
feature/wave-a
feature/iteration-3
feature/phase-2-homepage
```

Phases, waves, and iterations belong in **documentation and milestones** — not branch names.

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/<product-domain-kebab>` | `feature/admin-control-centre` |
| Experiment | `experiment/<kebab-topic>` | `experiment/mobile-touch` |
| Hotfix | `hotfix/<kebab-issue>` | `hotfix/payment-verification` |
| Release (future only) | `release/v<MAJOR>.<MINOR>` | `release/v1.2` — **not Phase 2** |

**Also avoid:** personal names; vague names (`fix`, `updates`).

---

## 14. Branch Preservation Policy (Option 2)

**DO NOT DELETE ANY BRANCHES during this phase.**

Historical and feature branches are intentionally retained as development milestones and repository history. Branch cleanup is **deferred** until the owner fully understands the repository structure and explicitly approves a future cleanup phase.

### Preserved historical milestones

| Branch | Role |
|--------|------|
| `prototype-redesign` | Original redesign foundation (permanent, read-only) |
| `homepage-cursor-experiment` | Engineering Baseline milestone — Homepage Foundation + Member Management Foundation |
| `feature/admin-referrals-operations` | Referral & Operations milestone |
| `feature/admin-analyst-management-phase-1` | Analyst Platform milestone |
| `feature/homepage-refinement` | Homepage refinement milestone (local tip may also exist on shared line) |
| `feature/knowledge-vault` | Future Knowledge domain (active / incomplete) |
| `mobile-investigation` | Mobile investigation record |

### Also retained (permanent)

| Branch | Reason |
|--------|--------|
| `master` | Stable Release / Latest Completed Platform |
| `develop` | Active integration |

---

## 15. Developer Workflow

```text
1. Start from up-to-date develop
2. Create feature/<product-domain> (not phase/wave names)
3. Implement in allowed module paths only
4. Local: lint + build + desktop/mobile sanity
5. Push → Vercel Preview
6. Pass TESTING_CHECKLIST.md
7. Merge into develop only when the feature scope is complete
8. Delete feature branch (local + remote) — unless still incomplete (e.g. knowledge-vault)
9. When domains are ready and release approved: develop → master → production
```

Agents and humans must follow `AI_DEVELOPMENT_GUIDELINES.md` and `DEVELOPMENT_WORKFLOW.md`.

---

## 16. Backend Workflow

| Rule | Detail |
|------|--------|
| Branching | Same as frontend: `feature/<product-domain>` from `develop` |
| Contracts | Do not invent or change NestJS / API contracts unless tasked |
| Mocks | Admin/Analyst UI mocks are not production schemas |
| Hotfix | Production API breakage uses `hotfix/*` from `master` |
| Isolation | Backend contract changes stay scoped; no drive-by Marketing edits |

Until a dedicated backend repo/workflow is declared, backend-facing frontend work still uses this Git model.

---

## 17. Frontend Workflow

| Rule | Detail |
|------|--------|
| Base | Always branch from `develop` |
| Domains | Homepage / Admin / Analyst / Content ownership per `MODULE_OWNERSHIP.md` |
| Admin UI | Design freeze — inherit Dashboard language; no redesign |
| Preview | Required for UI merges |
| Production | Never deploy feature branches to production |

---

## 18. Vercel Workflow — Final Deployment Model

### Permanent model (APPROVED)

```text
Production     master          →  https://tradercitycrypto.vercel.app
Integration    develop         →  Preview / designated non-prod alias
Preview        feature/*       →  Every feature branch generates a Preview Deployment
```

| Rule | Detail |
|------|--------|
| Production | **Only** from `master` |
| Feature Preview | **Must remain enabled** for every `feature/*` |
| No feature → production | No `feature/*` ever deploys directly to production |

### Current → Target → Migration (document only until Phase 2)

| Topic | Current | Target | Phase 2 step |
|-------|---------|--------|--------------|
| Production branch | **Unconfirmed** (risk: `prototype-redesign`) | `master` | Settings → Git → Production Branch = `master` |
| Preview | Assumed enabled | Remain enabled for all `feature/*` | Confirm filters do not block feature branches |
| GitHub default | `prototype-redesign` | `master` | Change default branch |
| Live content after switch | Depends on current Production Branch | Engineering Baseline (`master` tip) under Choice A | Verify SHA == `1798fe9` (or current `master` tip) |

**Phase 1 does not modify Vercel.**

---

## 19. Phase 2 Safety Gates

Before **every** Phase 2 migration step, require explicit verification.

### Standard gate pattern

```text
Step
  ↓
Verification
  ↓
Continue only if verification passes
```

If verification fails:

```text
STOP
  ↓
Do not continue automatically
  ↓
Do not execute remaining steps
  ↓
Enter Rollback Procedure (§20)
```

### Rules

| Rule | Detail |
|------|--------|
| Never auto-continue | Failed verification always stops the migration |
| One step at a time | Do not batch unverified Git / GitHub / Vercel changes |
| Human confirmation | Operator confirms verification before the next step |
| Record evidence | Note tip SHAs, URLs, and dashboard values at each gate |

### Per-step methodology (mandatory)

Every Phase 2 step must follow:

```text
Pre-check
  ↓
Execution
  ↓
Verification
  ↓
Rollback (only if verification fails)
```

| Stage | Purpose |
|-------|---------|
| **Pre-check** | Confirm prerequisites, record current state, ensure prior step passed |
| **Execution** | Perform exactly one planned action |
| **Verification** | Prove the action achieved the intended state |
| **Rollback** | Restore prior known-good state if verification fails (§20) |

---

## 20. Phase 2 Rollback Strategy

**Most important operational addition.**  
Before Phase 2 executes any Git, GitHub, or Vercel operation, this rollback strategy is mandatory.

### Purpose

If any migration step produces an unexpected result:

1. Stop the migration immediately  
2. Do not continue  
3. Do not execute remaining steps  
4. Restore repository / platform health  
5. Produce a Rollback Report  

### Rollback philosophy

| Principle | Detail |
|-----------|--------|
| Fail closed | Unexpected result → stop |
| Prefer restore over forward-fix | Return to last known-good state |
| No improvisation | Do not invent new migration steps mid-failure |
| Document everything | Rollback Report is required |

### Immediate stop checklist (any failure)

When **any** step fails:

1. Immediately stop the migration  
2. Do not continue  
3. Do not execute remaining steps  
4. Verify repository state  
5. Verify Git history  
6. Verify branch tips  
7. Verify current working tree  
8. Verify remote branch state  
9. Verify GitHub default branch  
10. Verify Vercel Production Branch  

### Rollback actions by failure type

#### GitHub default branch change fails

```text
If GitHub default branch change fails
  ↓
Restore previous default branch (prototype-redesign, unless a prior successful change was verified)
  ↓
Re-verify origin/HEAD
  ↓
STOP — do not proceed to Vercel or deletions
```

#### Vercel Production Branch change causes unexpected deployment

```text
If Vercel Production Branch change causes unexpected deployment
  ↓
Restore previous Production Branch
  ↓
Redeploy previous production build
  ↓
Verify https://tradercitycrypto.vercel.app matches prior known-good SHA
  ↓
STOP — do not proceed to branch deletions
```

#### Merge verification fails

```text
If merge verification fails
  ↓
Abort merge if still in progress (git merge --abort) when possible
  ↓
Otherwise restore previous branch state (develop tip before merge)
  ↓
Do not push a broken develop tip
  ↓
If a bad tip was already pushed: restore develop to pre-merge SHA (only with explicit approval; prefer revert over force-push unless approved)
  ↓
STOP
```

#### Branch deletion verification fails

```text
If branch deletion verification fails
  ↓
Stop immediately
  ↓
Do not delete remaining branches
  ↓
If a branch was deleted incorrectly and is still recoverable from remote reflog / known SHA: recreate the branch pointer at the recorded tip
  ↓
STOP
```

#### Preview Deployments fail

```text
If Preview Deployments fail after a migration-related change
  ↓
Do not continue to Production configuration (if not yet changed)
  ↓
If Production was already changed: treat as Vercel rollback case above
  ↓
Investigate Preview settings / build logs
  ↓
STOP remaining migration steps
```

#### Pre-check fails

```text
If Pre-check fails
  ↓
Do not execute the step
  ↓
No rollback of prior successful steps required unless prior step is now suspect
  ↓
STOP and resolve pre-check blockers
```

### Pre-migration snapshot (required before Step 0 completes)

Before any mutating Phase 2 action, record:

| Item | Example fields |
|------|----------------|
| Branch tips | `master`, `develop`, `prototype-redesign`, feature tips |
| GitHub default branch | Current value |
| Vercel Production Branch | Current value |
| Last Production Deployment SHA / URL | From Vercel dashboard |
| Working tree status | Clean / stash list |
| Keep list confirmation | knowledge-vault, homepage-cursor-experiment, prototype-redesign |

This snapshot is the rollback baseline.

### Rollback Report (required after any rollback)

At the end of any rollback, generate a report containing:

| Field | Content |
|-------|---------|
| **Completed Steps** | Which Phase 2 steps succeeded before failure |
| **Failed Step** | Exact step name and what failed verification |
| **Rollback Actions Executed** | What was restored (Git / GitHub / Vercel) |
| **Current Repository State** | Tips, default branch, working tree, remote sync |
| **Remaining Pending Tasks** | What is still outstanding from the Phase 2 plan |
| **Recommendations** | Whether to retry, pause, or re-plan |

Do not resume Phase 2 until the Rollback Report is reviewed and a new explicit go-ahead is given.

---

## 21. Migration Plan (Phase 2 — execute only after approval)

### Guiding principles

1. No history rewrite  
2. No Historical / Milestone renames  
3. Integrate **completed** work into `develop` only  
4. **Do not** merge Knowledge Vault  
5. **Do not** promote `develop` → `master` (Choice A)  
6. Protect production before deleting anything  
7. Future branches use product-domain names  
8. **Every step:** Pre-check → Execution → Verification → (Rollback if fail) — see §19–§20  
9. **Do not** create `release/*` branches in Phase 2  
10. On any failure: stop immediately and produce a Rollback Report  

### Recommended order of operations

Each step below is gated. Verification must pass before the next step begins.

#### Step 0 — Preflight (read-only) + snapshot

**Pre-check:** Working tree understood; operator ready.  
**Execution:**

1. Confirm clean working trees (or stash intentionally).  
2. Record tip SHAs (§4.2) into the **pre-migration snapshot** (§20).  
3. Vercel dashboard: note current Production Branch and last Production Deployment SHA.  
4. GitHub: note default branch + protections.  
5. Confirm `feature/knowledge-vault` will **not** be merged.  
6. Confirm no `release/*` work is in scope.  

**Verification:** Snapshot complete and stored; no mutations yet.  
**Rollback:** N/A (read-only). If incomplete → STOP, do not mutate.

#### Step 1 — Freeze Historical / Milestone branches

**Pre-check:** Step 0 passed; snapshot recorded.  
**Execution:**

1. No further commits on `prototype-redesign` or `homepage-cursor-experiment`.  
2. Enable protection / lock where available.  
3. Change GitHub **default branch** → `master`.  

**Verification:** `origin/HEAD` → `master`; milestone tips unchanged.  
**Rollback:** Restore previous GitHub default branch (§20). STOP.

#### Step 2 — Integrate completed work into `develop`

**Pre-check:** Step 1 verified; `develop` tip recorded.  
**Execution:**

1. Confirm `feature/admin-referrals-operations` already in `develop`.  
2. Merge `feature/admin-analyst-management-phase-1` → `develop`.  
3. **Skip** `feature/knowledge-vault`.  
4. Smoke-test `develop`: `npm run lint`, `npm run build`, critical routes.  
5. Preview-deploy `develop`.  

**Verification:** Ancestry of admin-analyst on `develop`; build green; Preview OK; knowledge-vault tip **not** required on `develop`.  
**Rollback:** Abort/restore `develop` to pre-merge SHA (§20). STOP. Do not delete branches.

#### Step 3 — Production tip (Choice A)

**Pre-check:** Step 2 verified.  
**Execution:**

- Leave `master` at Engineering Baseline.  
- Do **not** merge `develop` into `master`.  

**Verification:** `master` tip still equals pre-migration `master` SHA.  
**Rollback:** N/A if no mutation; if accidentally promoted, restore `master` tip only with explicit approval. STOP.

#### Step 4 — Vercel alignment

**Pre-check:** Step 3 verified; prior Production Branch recorded in snapshot.  
**Execution:**

1. Set Production Branch = `master`.  
2. Confirm Preview for `feature/*` (including active `feature/knowledge-vault`).  
3. Redeploy Production; verify SHA matches `master` tip.  
4. Confirm `https://tradercitycrypto.vercel.app`.  

**Verification:** Production SHA == `master`; site loads expected baseline; Preview still works.  
**Rollback:** Restore previous Production Branch; redeploy previous production build (§20). STOP. Do not delete branches.

#### Step 5 — Branch deletions (after verification)

**Pre-check:** Steps 2 and 4 verified; ancestry checks pass; keep-list confirmed.  
**Execution:**

1. Delete `feature/admin-referrals-operations` (local + remote).  
2. Delete `feature/admin-analyst-management-phase-1` (local + remote) after merge verification.  
3. Delete `mobile-investigation` only after findings confirmation.  
4. **Keep** `prototype-redesign`, `homepage-cursor-experiment`, `feature/knowledge-vault`.  

**Verification:** Deleted tips gone; keep-list branches still present at expected SHAs.  
**Rollback:** If deletion verification fails → STOP immediately; do not delete remaining branches; recreate deleted branch at recorded tip if needed (§20).

#### Step 6 — Protections & CI

**Pre-check:** Step 5 verified (or deletions deferred with documented reason).  
**Execution:**

1. Protect `master`, `develop`, `prototype-redesign`.  
2. Optionally protect `homepage-cursor-experiment` as read-only.  
3. Verify CI triggers.  

**Verification:** Protection rules visible; CI green or accounted for.  
**Rollback:** Revert protection changes if they block recovery; STOP if CI unexpectedly broken by migration.

#### Step 7 — Final Git health report

**Pre-check:** All prior accepted steps verified.  
**Execution:** Document tip SHAs, default branch, Vercel Production Branch, Preview sample, deletions, kept active branches.  
**Verification:** Health report complete and matches live state.  
**Rollback:** N/A (documentation). If mismatch found → treat as failed verification of earlier step; STOP and open Rollback Report.

---

## 22. Risk Assessment

| Risk | Severity | Mitigation |
|------|----------|------------|
| Production still on `prototype-redesign` | **Critical** | Verify Vercel; switch Production to `master` (Choice A baseline); rollback prior Production Branch if unexpected |
| Switching Vercel Production changes live site | **High** | Choice A keeps known baseline; verify URL + SHA; §20 redeploy previous build |
| Accidentally merging Knowledge Vault | **High** | Explicit Phase 2 exclusion; checklist gate |
| Accidentally promoting `develop` → `master` | **High** | Choice A only — no promote commands in Phase 2 |
| Continuing after a failed step | **Critical** | Safety gates (§19) — STOP; Rollback Report required |
| Deleting branches before merge verification | **High** | Ancestry checks first; stop remaining deletions on failure |
| Deleting `feature/knowledge-vault` or milestone branches | **High** | Keep list is mandatory |
| Merging `mobile-investigation` into develop | **Medium** | Do not merge; delete only after findings check |
| Creating `release/*` in Phase 2 | **Medium** | Explicitly out of scope (§11) |
| Phase/wave branch names recurring | **Medium** | Naming policy: product domains only |
| Stash / WIP on knowledge-vault | **Medium** | Inspect stash before Phase 2; leave vault branch intact |

---

## 23. Verification Checklist (Phase 2 exit criteria)

### Git

- [ ] `origin/HEAD` → `master`  
- [ ] `prototype-redesign` tip unchanged (`ef7e67e`) and read-only  
- [ ] `homepage-cursor-experiment` retained and read-only (Homepage + Member Management Foundation milestone)  
- [ ] `develop` contains merge of `feature/admin-analyst-management-phase-1`  
- [ ] `feature/knowledge-vault` **not** merged; branch still exists and is active  
- [ ] `master` still at Engineering Baseline (Choice A) — **not** equal to post-integration `develop`  
- [ ] No rewritten shared history; tags still resolve  
- [ ] `feature/admin-referrals-operations` deleted after verification  
- [ ] `feature/admin-analyst-management-phase-1` deleted after merge verification  
- [ ] `mobile-investigation` deleted only if findings confirmed; otherwise retained with note  

### Build / app

- [ ] `npm run lint` on `develop`  
- [ ] `npm run build` on `develop`  
- [ ] Critical Marketing + Admin smoke paths  

### Vercel

- [ ] Production Branch = `master`  
- [ ] Production deployment SHA matches `master` (Engineering Baseline)  
- [ ] `https://tradercitycrypto.vercel.app` loads expected baseline  
- [ ] Preview succeeds for a sample `feature/*` (e.g. knowledge-vault still previews)  
- [ ] Preview remains enabled globally for feature branches  

### GitHub

- [ ] Default branch = `master`  
- [ ] Branch protection on `master`, `develop`, `prototype-redesign`  
- [ ] Remote branch list matches keep/delete policy  

### Governance

- [ ] This document marked Phase 2 complete with dates/SHAs  
- [ ] Pre-migration snapshot retained  
- [ ] Every executed step has recorded Pre-check / Verification evidence  
- [ ] If any rollback occurred: Rollback Report attached and reviewed  

---

## 24. Commands Planned for Phase 2 (not executed)

> Run only after explicit approval. Knowledge Vault merge and `develop` → `master` promote are **intentionally omitted**.  
> Obey §19 Safety Gates and §20 Rollback Strategy. On any failure: STOP.

### 24.1 Preflight (read-only)

```bash
git fetch origin --tags
git status -sb
git branch -a -vv
git remote show origin
git log --oneline --decorate --graph --all -40
git rev-parse master develop prototype-redesign homepage-cursor-experiment feature/admin-analyst-management-phase-1 feature/knowledge-vault
git merge-base --is-ancestor feature/admin-referrals-operations develop && echo referrals-ok
git stash list
```

### 24.2 Integrate admin-analyst into develop (Knowledge Vault excluded)

```bash
git checkout develop
git pull origin develop
git merge --no-ff feature/admin-analyst-management-phase-1 -m "merge(admin): integrate analyst platform and admin analyst management into develop"
git push origin develop
```

*Do not run any merge of `feature/knowledge-vault`.*

### 24.3 Verify develop

```bash
npm run lint
npm run build
git log --oneline master..develop
git merge-base --is-ancestor feature/admin-analyst-management-phase-1 develop && echo admin-analyst-merged
git merge-base --is-ancestor 3c71470 develop; echo "knowledge-vault tip on develop? (expect non-zero / not ancestor until vault completes)"
```

### 24.4 GitHub default branch

```bash
gh repo edit ibrahimtamimi9551/Tradercity-Website-New --default-branch master
```

### 24.5 Vercel (dashboard)

```text
Vercel → tradercitycrypto → Settings → Git → Production Branch → master
Redeploy Production from master
Confirm deployment commit SHA == master tip (Engineering Baseline)
Confirm feature/* Preview deployments still enabled
```

### 24.6 Delete obsolete branches (after ancestry checks)

```bash
git checkout develop
git merge-base --is-ancestor feature/admin-referrals-operations develop
git merge-base --is-ancestor feature/admin-analyst-management-phase-1 develop

git push origin --delete feature/admin-referrals-operations
git push origin --delete feature/admin-analyst-management-phase-1

git branch -d feature/admin-referrals-operations
git branch -d feature/admin-analyst-management-phase-1

# KEEP — do not delete:
#   prototype-redesign
#   homepage-cursor-experiment
#   feature/knowledge-vault
#   master
#   develop

# mobile-investigation — only with explicit findings confirmation:
# git push origin --delete mobile-investigation
# git branch -d mobile-investigation
```

### 24.7 Branch protection (prefer GitHub UI / Rulesets)

Protect `master`, `develop`, `prototype-redesign`; optionally lock `homepage-cursor-experiment`.

### 24.8 Final health report

```bash
git fetch origin --prune --tags
git remote show origin
git branch -a -vv
git log --oneline --decorate --graph --all -30
git rev-parse origin/master origin/develop origin/prototype-redesign origin/feature/knowledge-vault
```

### Explicitly NOT in Phase 2 command set

```text
# DO NOT RUN in Phase 2:
git merge feature/knowledge-vault
git checkout master && git merge develop
git checkout -b release/v1.x
```

---

## 25. Relationship to Existing Governance Docs

| Document | Relationship |
|----------|----------------|
| `GIT_BRANCHING_STRATEGY.md` | v1 policy; this v2 doc adds classification, audit, deployment permanence, Phase 2 plan |
| `REPOSITORY_MIGRATION_PLAN.md` | Layer 2 checklist; Phase 2 of this effort executes that layer under Choice A |
| `PROJECT_HISTORY.md` | Foundation narrative; milestone meaning of `homepage-cursor-experiment` expanded here |
| `DEPLOYMENT_GUIDE.md` | Local → Preview → Production; Production = `master` only |
| `RELEASE_PROCESS.md` | develop → master only for intentional releases (not Phase 2); SemVer tags per §12 |
| `ENGINEERING_PLATFORM_V2.md` | Parent platform plan |

---

## 26. Explicit Non-Goals

- Do not rewrite Historical / Milestone history  
- Do not rename `prototype-redesign` / `homepage-cursor-experiment`  
- Do not modify application product code as part of Git migration (governance docs excepted)  
- Do not merge incomplete `feature/knowledge-vault` solely for cleanup optics  
- Do not force-push `master` / `develop`  
- Do not delete any branches in Option 2  
- Do not delete tags  
- Do not create `release/*` branches unless scale requires them (§11)  
- Do not point Production at `feature/*`  
- Do not name new branches after phases / waves / iterations  
- Do not continue after a failed verification without rollback + new approval  

---

## 27. Approval Gate / Option 2 Record

**Option 2 adopted 2026-07-31.**

| Item | Decision |
|------|----------|
| `master` | Latest Stable Completed Platform (promote from `develop`) |
| `develop` | Active integration |
| Branch deletion | **Deferred** — none in this phase |
| Choice A baseline freeze | **Superseded** for production tip meaning; Engineering Baseline tag retained as history |
| Vercel Production | Remains `master`; redeploy after tip update |
| Safety | §19 / §20 still mandatory |

**Future branch cleanup requires explicit separate approval.**

---

## 28. Development Log — New Development Streams

### New Development Stream (2026-07-31)

**Feature Branch:**

```text
feature/super-admin-control-centre
```

**Purpose:**

Development of the TraderCity **Super Admin Control Centre**, which will centralize executive-level management, platform finance, operational analytics, and cross-module administrative controls.

**Status:**

* Created from `develop`
* Independent development stream
* Will merge into `develop` after completion and verification
* No impact on `master` until a future stable release

This entry records stream creation only. It does **not** change repository strategy, permanent-branch policy, or the governance model.

---

*TraderCity Git Governance v2.3 — Phase 2 Option 2 (Latest Stable Platform on master)*  
*Updated 2026-07-31 — branch preservation; no deletions; Super Admin Control Centre stream opened*
