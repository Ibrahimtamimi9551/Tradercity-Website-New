# TraderCity — Engineering Platform v2.0

**Document Version:** 1.0 (plan)  
**Status:** Planned — execute only after Governance v1.0 transition commit  
**Supersedes narrow framing of:** “Git-only repository migration”  
**Goal:** Establish the TraderCity Engineering Platform across **all five layers**

---

## Purpose

Do not say: “Let’s fix Git.”

Say:

> **Let’s establish TraderCity Engineering Platform v2.0.**

That includes:

- Git
- Repository
- Documentation
- AI workflow
- Release process
- Folder ownership
- Module ownership
- Testing
- Deployment

Everything.

> **Never define a process and change the platform in the same step.**  
> Governance v1.0 defined the law. Platform v2.0 makes the ecosystem conform.

---

## Story Timeline

```text
Foundation Phase
        │
        ▼
Governance v1.0          ← standards documented (commit f979e8d+)
        │
        ▼
Engineering Platform v2.0  ← this plan (Git + docs + AI + ownership + release)
        │
        ▼
Engineering Phase        ← daily life: develop → feature/* → develop → master
```

---

## Five Layers

### Layer 1 — Product (already defined)

Permanent business domains. Rarely restructured.

```text
TraderCity
├── Marketing
├── Member Experience
├── Admin Platform
├── Analyst Platform
└── Content Platform
```

**Authority:** `PROJECT_ARCHITECTURE.md`  
**Delivery map:** `PROJECT_ROADMAP.md`

---

### Layer 2 — Repository (Git)

```text
master          Production
develop         Next release
feature/*       Delivery
experiment/*    Research
hotfix/*        Production emergencies
```

Foundation branches become **museum pieces** — frozen history, never renamed for vanity.

**Authority:** `GIT_BRANCHING_STRATEGY.md`  
**Detailed steps:** `REPOSITORY_MIGRATION_PLAN.md` (Layer 2 checklist)

---

### Layer 3 — Source Code (ownership)

Source mirrors Product — not Git.

**Target direction:**

```text
src/
├── app/          # thin Next.js routes
├── marketing/
├── member/
├── admin/
├── analyst/
├── content/
├── shared/
└── lib/
```

**Authority:** `MODULE_OWNERSHIP.md`  
Physical moves happen in Platform v2.0 execution (or a clearly sequenced sub-step). Until then, the ownership map still governs which current paths an agent may touch.

---

### Layer 4 — Documentation

Documentation explains business + engineering.

**Target documentation map:**

```text
docs/
├── 00_Project_Governance/   # law, roadmap, ownership, platform plans
├── Architecture/            # (evolve from Universal + architecture refs)
├── Development/             # phase logs, status, debt
├── Business Logic/          # (evolve / add as needed)
├── Module Specs/            # (AI Agents domain specs → clearer home over time)
└── Release Notes/           # (introduce with first Engineering releases)
```

Governance v1.0 already created `00_Project_Governance/`.  
Platform v2.0 aligns the rest without deleting Foundation-era knowledge — reorganize with redirects/links, not amnesia.

---

### Layer 5 — AI

Every AI agent should know, without asking:

- Project rules
- Folder / module ownership
- Coding style
- Architecture
- Governance
- Roadmap discipline

**Authority:** `AI_DEVELOPMENT_GUIDELINES.md`, `.cursor/rules/*`, `AGENTS.md`  
Platform v2.0 updates these so they point at the five-layer model and ownership map.

---

## Alignment Vision (1-year target)

```text
TraderCity
│
├── docs/
│   ├── Governance
│   ├── Architecture
│   ├── Business Logic
│   ├── Roadmap
│   ├── Release Notes
│   └── Module Specifications
│
├── src/
│   ├── marketing
│   ├── member
│   ├── admin
│   ├── analyst
│   ├── content
│   ├── shared
│   └── lib
│
└── Git
    ├── master
    ├── develop
    ├── feature/*
    ├── experiment/*
    └── hotfix/*
```

Notice the alignment:

- **Business** defines the product  
- **Source** mirrors the business  
- **Documentation** explains business and engineering  
- **Git** manages change — not structure  
- **AI** enforces the above automatically  

---

## Foundation Freeze (Museum Pieces)

After Platform v2.0 cutover:

| Branch | Forever status |
|--------|----------------|
| `prototype-redesign` | Frozen museum piece — **no more commits, ever** |
| `homepage-cursor-experiment` | Frozen museum piece — **no more commits, ever** (after tip captured) |
| `mobile-investigation` | Archived investigation — finished history |

They tell the story. They are not development lines.

Daily life becomes:

```text
master
  │
develop
  │
feature/*
```

Forever.

---

## Master Execution Checklist

Execute in order. Prefer completing documentation/AI/ownership wiring before large source moves if risk is high — but **do not call Platform v2.0 complete until all five layers are addressed.**

### 0. Preconditions

- [x] Governance v1.0 committed (`docs(governance): establish TraderCity Engineering Governance v1.0`)
- [ ] No unrelated feature work started on Foundation branches
- [ ] This Engineering Platform v2.0 plan accepted

### 1. Layer 1 — Product

- [ ] Confirm `PROJECT_ARCHITECTURE.md` still accurate
- [ ] Confirm `PROJECT_ROADMAP.md` is the master delivery map
- [ ] Confirm near-term order: no new features until Platform v2.0 complete

### 2. Layer 2 — Repository (Git)

Execute `REPOSITORY_MIGRATION_PLAN.md`:

- [ ] Freeze Foundation branches
- [ ] Create `develop` from stable baseline
- [ ] Align `master` to production meaning
- [ ] Archive historical branches operationally
- [ ] Adopt `feature/*`, `experiment/*`, `hotfix/*`
- [ ] Remove temporary investigation branches after findings preserved

### 3. Layer 3 — Source / Module Ownership

- [ ] Publish ownership rules in `MODULE_OWNERSHIP.md` (done at plan time; keep updated)
- [ ] Decide execution mode for physical moves:
  - [ ] **A. Ownership-first:** enforce map on current paths, defer big moves
  - [ ] **B. Restructure:** move toward `src/marketing|member|admin|...` in a dedicated migration PR
- [ ] If B: update imports, verify `npm run build`, update Admin/Homepage isolation docs paths
- [ ] Ensure Marketing ↔ Admin isolation still holds after any move

### 4. Layer 4 — Documentation

- [ ] Governance folder complete (v1.0 + roadmap + ownership + this plan)
- [ ] Index `docs/README.md` around five layers
- [ ] Add/seed `docs` homes for Architecture / Business Logic / Release Notes (links OK at first)
- [ ] Ensure Module Specs (`docs/AI/Agents/*`) remain discoverable
- [ ] Update Foundation history docs with Platform v2.0 completion note when done

### 5. Layer 5 — AI Workflow

- [ ] `AI_DEVELOPMENT_GUIDELINES.md` references five layers + roadmap + ownership
- [ ] `.cursor/rules/project-governance.mdc` points at Platform v2.0 + roadmap
- [ ] `AGENTS.md` requires roadmap item + owning domain before implementation
- [ ] Agents forbidden from using Foundation branches for new work

### 6. Release, Testing, Deployment (cross-layer)

- [ ] `RELEASE_PROCESS.md` active against `develop`/`master`
- [ ] `TESTING_CHECKLIST.md` required for every `feature/*`
- [ ] `DEPLOYMENT_GUIDE.md` Local → Preview → Production confirmed with new branch model
- [ ] Vercel production branch mapping reviewed (change only with explicit approval)

### 7. Close Platform v2.0

- [ ] All checklist sections above complete or explicitly deferred with date/owner
- [ ] Foundation branches frozen in practice
- [ ] First post-migration branch is a `feature/*` from `develop` mapped to `PROJECT_ROADMAP.md`
- [ ] Announce: Engineering Phase daily workflow is live

---

## Explicit Non-Goals During Platform v2.0

- Do not build Admin Subscriptions / Discord / etc. inside the migration
- Do not rename Foundation branches to erase history
- Do not mix feature delivery into ownership/git migration commits
- Do not invent APIs or redesign frozen Admin UI “while migrating”

---

## Recommended Policy Until Complete

**Do not start the next product feature until Engineering Platform v2.0 is complete.**

Once `develop` and `feature/*` exist — and ownership/AI/docs enforce them — every future Homepage, Admin, Analyst, and Content change benefits forever. This transition should happen **once**.

---

## Related References

| Document | Layer |
|----------|-------|
| `PROJECT_ARCHITECTURE.md` | 1 Product |
| `PROJECT_ROADMAP.md` | 1 Delivery |
| `REPOSITORY_MIGRATION_PLAN.md` | 2 Git detail |
| `MODULE_OWNERSHIP.md` | 3 Source ownership |
| `AI_DEVELOPMENT_GUIDELINES.md` | 5 AI |
| `RELEASE_PROCESS.md` / `DEPLOYMENT_GUIDE.md` / `TESTING_CHECKLIST.md` | Cross-layer ops |
| `PROJECT_HISTORY.md` | Foundation story |

---

*TraderCity Engineering Platform v2.0 — establish the platform, then build features on it.*
