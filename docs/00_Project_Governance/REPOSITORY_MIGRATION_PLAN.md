# TraderCity — Repository Migration Plan (Layer 2)

**Document Version:** 1.1 (plan)  
**Parent plan:** [`ENGINEERING_PLATFORM_V2.md`](./ENGINEERING_PLATFORM_V2.md)  
**Status:** Planned — execute as **Layer 2** of Engineering Platform v2.0  
**Scope:** Align Git with Engineering Governance without erasing Foundation Phase history

---

## Purpose

Governance v1.0 defined the standard.  
**Engineering Platform v2.0** makes the full ecosystem conform (Product, Git, Source, Docs, AI).

This document is the **Layer 2 (Repository / Git)** checklist only.

Do not treat “fixing Git” as the whole migration. Complete all five layers in `ENGINEERING_PLATFORM_V2.md`.

> **Never define a process and change the platform in the same step.**  
> Governance documentation lands first. Platform migration follows.

---

## Two Eras (Do Not Hide Either)

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

Anyone reading the repository should understand:

> Everything above this line is how TraderCity was born.  
> Everything below follows the engineering standards.

---

## Foundation Phase

**What it was:**

- Initial prototype
- Exploratory development
- Rapid iteration
- Branch names reflect history and discovery

**Historical branches (do not rename):**

| Branch | Status | Purpose |
|--------|--------|---------|
| `master` | Historical / early baseline | Initial repo + early Hero/Ecosystem V1 |
| `prototype-redesign` | **Archived** (Foundation Phase) | Homepage prototyping and early website direction |
| `homepage-cursor-experiment` | **Archived** after migration (Foundation Phase) | Cursor-assisted homepage refinement; expanded into first Admin implementation |
| `mobile-investigation` | **Temporary investigation** | Local vs Vercel mobile/deployment comparison |

**Archive means:**

- Mentally and operationally frozen
- No more feature work
- Names retained as history
- Not rewritten to pretend they never existed

See `PROJECT_HISTORY.md` for narrative detail.

---

## Engineering Phase

**What it is:**

- Governance introduced (v1.0)
- Standardized workflow adopted
- Feature branches for delivery
- `develop` for next release integration
- `master` for production-ready code only

**Target shape after Migration v2.0:**

```text
master
│  Production
│
develop
│  Next Release
│
├── feature/*
├── experiment/*
└── hotfix/*
```

**Product domains are not branches.**

Homepage, Admin, and Content are products/modules. Changes use temporary branches:

```text
feature/homepage-v3
feature/admin-members
feature/admin-subscriptions
feature/content-learning
```

Merge → delete → done.

---

## Official Transition Point

Before any branch reorganization:

1. Commit **only** Governance v1.0 documentation (and agent entry wiring)
2. Use commit message:

```text
docs(governance): establish TraderCity Engineering Governance v1.0
```

That commit is the official transition marker:

- Before it → Foundation Phase history
- From it onward → documented Engineering standards apply
- After Migration v2.0 executes → Git structure matches the docs

---

## Migration Steps (v2.0 Execution Checklist)

Execute in order. Check boxes only when the step is actually done.

### A. Freeze Foundation Phase

- [ ] Freeze Foundation branches — **no more commits, ever**, on:
  - [ ] `prototype-redesign`
  - [ ] `homepage-cursor-experiment` (after its tip is captured into `develop` / migration complete)
- [ ] Document freeze in `PROJECT_HISTORY.md` if any tip SHAs need updating
- [ ] Communicate: new work uses `feature/*` / `experiment/*` / `hotfix/*` only

### B. Establish `develop`

- [ ] Choose the current stable engineering baseline (latest stable product line — historically `homepage-cursor-experiment` tip, not investigation noise)
- [ ] Create `develop` from that snapshot
- [ ] Move / verify stable code is on `develop`
- [ ] Smoke-test `develop` (lint, production build, critical routes)
- [ ] Optionally Preview-deploy `develop` before promoting to `master`

### C. Align `master` with production meaning

`master` must answer one question only:

> If I clone this repository today, what code should I deploy to production?

- [ ] Once `develop` is tested, align `master` to that production-ready snapshot
- [ ] Confirm `master` is deployable
- [ ] Confirm Vercel production mapping matches the intended production branch (update only with explicit approval)

### D. Archive historical branches (operationally)

Do **not** rename Foundation branches.

- [ ] Mark `prototype-redesign` as Archived / Foundation Phase (docs + team practice)
- [ ] Mark `homepage-cursor-experiment` as Archived / Foundation Phase after cutover
- [ ] Stop using them as integration lines
- [ ] Optional later: add branch description / protection / archive notes on the remote host if available

### E. Adopt Engineering Workflow branches

- [ ] Adopt `feature/*` workflow for all new features
- [ ] Adopt `experiment/*` workflow for investigations
- [ ] Adopt `hotfix/*` workflow for production emergencies
- [ ] Update any local habits / Cursor prompts that still assume long-lived experiment branches

### F. Retire temporary investigation branches

- [ ] Confirm `mobile-investigation` findings are documented
- [ ] Merge nothing from it unless a real fix is being promoted via `feature/*` or `hotfix/*`
- [ ] Remove / delete temporary investigation branches after archival of findings
- [ ] Future mobile research uses `experiment/<topic>` (example: `experiment/mobile-touch`)

### G. Close the migration

- [ ] Update this checklist to reflect completion dates / SHAs
- [ ] Update `PROJECT_HISTORY.md` with Migration v2.0 completion note
- [ ] Bump governance README status: standards **and** Git structure aligned
- [ ] Announce: all future development follows `develop → feature/* → develop → master`

---

## Timeline (Canonical Sequence)

| Stage | Name | Meaning |
|-------|------|---------|
| 0 | **Foundation Phase (Historical)** | How TraderCity was conceived and built |
| 1 | **Governance v1.0** | Documented engineering standards and workflows |
| 2 | **Repository Migration v2.0** | Git structure aligned with governance |
| 3 | **Future Development** | Every feature follows `develop → feature/* → develop → master` |

---

## Explicit Non-Goals During Migration

- Do not rename Foundation Phase branches to fake a clean history
- Do not change application functionality “while migrating”
- Do not bundle feature work into migration commits
- Do not delete history without documenting findings first
- Do not treat Homepage / Admin / Content as permanent branch names

---

## Baseline Selection Guidance

When choosing the snapshot for `develop`:

| Prefer | Avoid |
|--------|-------|
| Latest stable product integration line | Pure investigation-only commits with no product value |
| Builds cleanly (`npm run build`) | Broken tips |
| Contains Marketing + Admin baseline you intend to keep shipping | Half-finished experiment UI markers meant only for isolation tests |

At Governance v1.0 time, the practical stable baseline is the tip of `homepage-cursor-experiment` (Admin Phases 0–3 + homepage work).  
`mobile-investigation` is an investigation line on top of that baseline — capture findings, do not casually make it `master` unless those commits are intentionally part of the production snapshot.

---

## Related References

| Document | Role |
|----------|------|
| `GIT_BRANCHING_STRATEGY.md` | Target branch policy |
| `PROJECT_HISTORY.md` | Foundation Phase narrative |
| `DEVELOPMENT_WORKFLOW.md` | Post-migration daily workflow |
| `RELEASE_PROCESS.md` | How `develop` becomes production |
| `AI_DEVELOPMENT_GUIDELINES.md` | Agents must not invent alternate migration paths |

---

*TraderCity Project Governance — Migration Plan for Repository Standardization v2.0*
