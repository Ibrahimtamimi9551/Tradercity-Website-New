# TraderCity Project Governance

**Version:** 1.1  
**Status:** Official engineering handbook  
**Phase:** Governance complete → Engineering Platform v2.0 planned (not yet executed)

---

## Purpose

This folder is the first place every contributor and AI agent should read before changing TraderCity.

---

## Story Timeline

```text
Foundation Phase
        │
        ▼
Governance v1.0
        │
        ▼
Engineering Platform v2.0   ← next execution
        │
        ▼
Engineering Phase
```

---

## Five Layers (Engineering Platform)

| Layer | What | Authority |
|-------|------|-----------|
| 1 Product | Business domains + roadmap | `PROJECT_ARCHITECTURE.md`, `PROJECT_ROADMAP.md` |
| 2 Repository | Git workflow | `GIT_BRANCHING_STRATEGY.md`, `REPOSITORY_MIGRATION_PLAN.md` |
| 3 Source | Folder / module ownership | `MODULE_OWNERSHIP.md` |
| 4 Documentation | Engineering knowledge system | this folder + `docs/` map in Platform v2.0 |
| 5 AI | Agent rules without asking | `AI_DEVELOPMENT_GUIDELINES.md`, `.cursor/rules/*` |

Full platform migration: **[`ENGINEERING_PLATFORM_V2.md`](./ENGINEERING_PLATFORM_V2.md)**

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

Foundation branches are history. They are not renamed. After Platform v2.0 they are frozen museum pieces.

---

## Documents

| File | Contents |
|------|----------|
| [ENGINEERING_PLATFORM_V2.md](./ENGINEERING_PLATFORM_V2.md) | **Master v2.0 plan — all five layers** |
| [PROJECT_ARCHITECTURE.md](./PROJECT_ARCHITECTURE.md) | Business domains and responsibilities |
| [PROJECT_ROADMAP.md](./PROJECT_ROADMAP.md) | Master delivery roadmap (`feature/*` source) |
| [MODULE_OWNERSHIP.md](./MODULE_OWNERSHIP.md) | Source ownership mirrors product domains |
| [DEVELOPMENT_WORKFLOW.md](./DEVELOPMENT_WORKFLOW.md) | Idea → production lifecycle |
| [GIT_BRANCHING_STRATEGY.md](./GIT_BRANCHING_STRATEGY.md) | `master` / `develop` / `feature/*` / `experiment/*` / `hotfix/*` |
| [RELEASE_PROCESS.md](./RELEASE_PROCESS.md) | Feature → develop → test → preview → production |
| [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) | Local → Preview → Production (Vercel) |
| [TESTING_CHECKLIST.md](./TESTING_CHECKLIST.md) | Required merge/release gates |
| [AI_DEVELOPMENT_GUIDELINES.md](./AI_DEVELOPMENT_GUIDELINES.md) | Mandatory rules for AI agents |
| [PROJECT_HISTORY.md](./PROJECT_HISTORY.md) | Historical branch documentation |
| [REPOSITORY_MIGRATION_PLAN.md](./REPOSITORY_MIGRATION_PLAN.md) | Layer 2 Git checklist |

---

## Standing Principles

1. **Product Architecture ≠ Git Structure**
2. **Git manages changes. It does not represent the product structure.**
3. **Source ownership mirrors Product Architecture.**
4. **Every implementation starts from `develop`.**
5. **Every new feature creates `feature/<feature-name>` from the roadmap.**
6. **Every investigation creates `experiment/<topic>`.**
7. **Every production issue creates `hotfix/<issue>`.**

---

## Policy Until Platform v2.0 Completes

**Do not start the next product feature until Engineering Platform v2.0 is complete.**

See `ENGINEERING_PLATFORM_V2.md`.
