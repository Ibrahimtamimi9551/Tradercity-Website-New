# TraderCity — AI Development Guidelines

**Document Version:** 1.0  
**Status:** Official Engineering Reference — mandatory for all AI agents  
**Audience:** Cursor, ChatGPT, Claude, Grok, and any future coding agent

---

## Purpose

TraderCity has left the Foundation Phase and entered the Engineering Phase.

AI agents are powerful accelerators. They are also the fastest way to destroy consistency if they improvise architecture.

This document is non-negotiable.

---

## First Action on Every Task

Before implementing features or refactors, read:

1. `docs/00_Project_Governance/README.md`
2. `docs/00_Project_Governance/ENGINEERING_PLATFORM_V2.md` (until Platform v2.0 is marked complete)
3. `docs/00_Project_Governance/PROJECT_ROADMAP.md` — identify the roadmap item
4. `docs/00_Project_Governance/MODULE_OWNERSHIP.md` — identify owning domain + allowed paths
5. `docs/00_Project_Governance/PROJECT_ARCHITECTURE.md`
6. `docs/00_Project_Governance/DEVELOPMENT_WORKFLOW.md`
7. `docs/00_Project_Governance/GIT_BRANCHING_STRATEGY.md`
8. This file (`AI_DEVELOPMENT_GUIDELINES.md`)
9. Domain-specific docs under `docs/AI/Agents/<Domain>/` when the task touches that domain
10. Root `AGENTS.md` and `PROJECT_CONTEXT.md`

If the task involves release, deployment, or merge readiness, also read:

- `RELEASE_PROCESS.md`
- `DEPLOYMENT_GUIDE.md`
- `TESTING_CHECKLIST.md`

Do **not** bypass documented workflows.

**Until Engineering Platform v2.0 is complete:** do not start new product features; only platform-migration work (or explicit user overrides).

---

## Core Principles

Repeat these until they are instinct:

1. **Product Architecture ≠ Git Structure**
2. **Git manages changes. It does not represent the product structure.**
3. **Every implementation starts from `develop`.**
4. **Every new feature creates `feature/<feature-name>`.**
5. **Every investigation creates `experiment/<topic>`.**
6. **Every production issue creates `hotfix/<issue>`.**

Until repository reorganization creates `develop`, use the agreed integration baseline described in `PROJECT_HISTORY.md` — but still name *new* branches according to this standard.

---

## Hard Rules

### Scope discipline

- **Never modify unrelated modules.**
- **Never refactor without approval.**
- **Never rewrite working architecture** to match a personal preference.
- Touch only files required for the requested outcome.

### Contracts and backend

- **Never change backend contracts** unless the task explicitly requires it and the change is approved.
- **Do not invent APIs.**
- **Do not fake backend behavior** in ways that imply a real contract exists.
- Prefer typed mocks and backend-ready hooks already established in the repo.

### Design and structure

- **Reuse the existing design system.**
- **Follow the existing folder structure.**
- Preserve Marketing ↔ Admin isolation (no shared UI components across those products).
- Keep components modular.
- Prefer refinement over replacement.
- Respect Admin Dashboard design freeze and Homepage freeze rules when those domains apply.

### Quality and delivery

- **Mobile-first thinking** for UI work; always plan for real-device validation.
- Explain assumptions before or during implementation.
- Do not skip `TESTING_CHECKLIST.md` gates for UI merges.
- Do not treat Preview deployment as permission to merge into `master`.

### Git and process

- Do not invent alternate branching models.
- Do not rename, delete, or “clean up” long-lived branches unless explicitly tasked.
- Governance documentation tasks must not change application functionality.
- Repository reorganization is a separate task from defining standards.

---

## Allowed vs Forbidden

### Allowed

- Implement the requested feature within scope
- Small focused fixes required to complete the task
- Reuse and extend existing primitives
- Improve clarity when directly necessary for the change
- Add or update documentation when asked or when required to record findings
- Propose a plan and wait for direction when architecture is ambiguous

### Forbidden

- Drive-by refactors across modules
- Renaming folders “for cleanliness” without approval
- Installing packages without approval
- Changing routing/information architecture unless requested
- Importing Marketing components into Admin (or the reverse)
- Expanding scope into adjacent nice-to-haves
- Claiming tests were done on a real device when they were only emulated
- Silent deviations from governance docs

---

## Required Working Pattern

```text
1. Read governance + roadmap + ownership + domain docs
2. State roadmap item + owning domain + allowed paths
3. Restate goal and constraints
4. Explain plan and assumptions
5. Implement minimal change inside ownership boundaries
6. Verify locally (lint/build + UI checks)
7. Prepare Preview validation for UI work
8. Report what changed, what was tested, what remains
9. Update PROJECT_ROADMAP.md when a roadmap item completes
```

## Five Layers (Know Without Asking)

| Layer | Meaning |
|-------|---------|
| Product | Domains + roadmap |
| Repository | `master` / `develop` / `feature/*` / `experiment/*` / `hotfix/*` |
| Source | Ownership mirrors product (`MODULE_OWNERSHIP.md`) |
| Documentation | Governance + module specs + development logs |
| AI | These rules + Cursor rules + `AGENTS.md` |

---

## Domain Isolation Quick Map

| Domain | Typical paths | Do not casually touch |
|--------|---------------|------------------------|
| Marketing / Homepage | `src/app/page.tsx`, `src/components/home/**`, pricing/login/payment-activation | Admin |
| Member Experience | `src/app/dashboard/**`, `src/components/dashboard/**` | Admin internals |
| Admin Platform | `src/app/admin/**`, `src/components/admin/**`, `src/components/members/**`, `src/lib/members/**` | Homepage / marketing UI |
| Shared libs (careful) | `src/lib/membership/**`, types | Anything outside task scope |

When working in Admin, Homepage is frozen unless the user explicitly requests marketing changes.  
When working on Homepage, do not “improve” Admin while you are there.

---

## Documentation Hierarchy

| Layer | Location | Role |
|-------|----------|------|
| Governance (this system) | `docs/00_Project_Governance/` | Official engineering law |
| Universal product rules | `docs/Universal/` | Constitution / PRD / architecture rules |
| Domain agent specs | `docs/AI/Agents/*` | Deep domain instructions |
| Phase / status logs | `docs/Development/*` | Execution history and debt |
| Cursor rules | `.cursor/rules/*` | Always-on agent constraints |
| Root agent entry | `AGENTS.md` | Short mission + hard never-dos |

If documents conflict, prefer:

1. Explicit user instruction for the current task  
2. Governance v1.0 for workflow/Git/process  
3. Domain Agent specs for that domain’s architecture  
4. Older playbooks / notes

Then flag the conflict to the human instead of silently choosing convenience.

---

## Assumptions Protocol

When information is missing:

1. State the assumption clearly
2. Choose the option that preserves architecture
3. Prefer no change over speculative invention
4. Ask when the decision is irreversible (routes, contracts, data model, design system breaks)

---

## Success Criteria for AI Work

An AI-assisted change is successful when:

- The requested outcome is delivered
- Unrelated modules are untouched
- Architecture and design system are preserved
- Tests/checklist expectations are met or blockers are explicit
- The human can review a small, coherent diff

Speed without consistency is failure.

---

## Related References

| Document | Role |
|----------|------|
| `PROJECT_ARCHITECTURE.md` | Product domains |
| `DEVELOPMENT_WORKFLOW.md` | Lifecycle |
| `GIT_BRANCHING_STRATEGY.md` | Branch policy |
| `TESTING_CHECKLIST.md` | Merge gates |
| `PROJECT_HISTORY.md` | Legacy context |
| `AGENTS.md` | Root agent mission |

---

*TraderCity Project Governance v1.0*
