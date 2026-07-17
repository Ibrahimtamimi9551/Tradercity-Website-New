# TraderCity Project Governance

**Version:** 1.0  
**Status:** Official engineering handbook  
**Phase:** Engineering Phase (standards defined; repository reorganization is a separate task)

---

## Purpose

This folder is the first place every contributor and AI agent should read before changing TraderCity.

It defines:

- Product architecture (business domains)
- Development lifecycle
- Git branching policy
- Release and deployment standards
- Testing gates
- AI development rules
- Repository history (Foundation Phase)
- Repository migration plan (Git alignment as v2.0)

---

## Two Eras

```text
FOUNDATION PHASE
────────────────────────────
master
prototype-redesign
homepage-cursor-experiment
mobile-investigation
────────────────────────────
Engineering Workflow v1.0
────────────────────────────
master
develop
feature/*
experiment/*
hotfix/*
```

Foundation branches are history. They are not renamed. They are archived and frozen after migration.

---

## Documents

| File | Contents |
|------|----------|
| [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md) | Business domains and responsibilities |
| [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md) | Idea → production lifecycle |
| [GIT_BRANCHING_STRATEGY.md](./GIT_BRANCHING_STRATEGY.md) | `master` / `develop` / `feature/*` / `experiment/*` / `hotfix/*` |
| [RELEASE_PROCESS.md](./RELEASE_PROCESS.md) | Feature → develop → test → preview → production |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Local → Preview → Production (Vercel) |
| [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) | Required merge/release gates |
| [AI_DEVELOPMENT_GUIDELINES.md](./AI_DEVELOPMENT_GUIDELINES.md) | Mandatory rules for AI agents |
| [PROJECT_HISTORY.md](./PROJECT_HISTORY.md) | Historical branch documentation |
| [REPOSITORY_MIGRATION_PLAN.md](./REPOSITORY_MIGRATION_PLAN.md) | Checkboxed plan to align Git (Migration v2.0) |

---

## Standing Principles

1. **Product Architecture ≠ Git Structure**
2. **Git manages changes. It does not represent the product structure.**
3. **Every implementation starts from `develop`.**
4. **Every new feature creates `feature/<feature-name>`.**
5. **Every investigation creates `experiment/<topic>`.**
6. **Every production issue creates `hotfix/<issue>`.**

---

## Canonical Sequence

| Stage | Meaning |
|-------|---------|
| Foundation Phase | How TraderCity was conceived and built |
| **Governance v1.0** (this folder) | Documented engineering standards |
| **Repository Migration v2.0** | Git structure aligned with governance |
| Future Development | `develop → feature/* → develop → master` |

---

## What Governance v1.0 Does *Not* Do

- Change application functionality
- Rename or delete Git branches
- Create `develop` or realign `master`

Those belong to **Repository Migration v2.0** — see `REPOSITORY_MIGRATION_PLAN.md`.

---

## Suggested Next Task

Execute [REPOSITORY_MIGRATION_PLAN.md](./REPOSITORY_MIGRATION_PLAN.md) as **Repository Migration v2.0** after the Governance v1.0 commit is on the agreed baseline.
