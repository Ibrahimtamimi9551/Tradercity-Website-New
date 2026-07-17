# TraderCity — Project History

**Document Version:** 1.0  
**Status:** Historical documentation only  
**Scope:** Repository evolution during the Foundation Phase

---

## Purpose

Document how the repository evolved.

Do **not** rewrite history.  
Do **not** treat historical branch names as the ongoing branching model.

The official forward-looking model is defined in `GIT_BRANCHING_STRATEGY.md`.

> **Product Architecture ≠ Git Structure**  
> These branches recorded change over time. They are not permanent product modules.

---

## Two Eras (Preserved on Purpose)

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

Do not hide Foundation Phase history. Archive it. Freeze it. Build the Engineering workflow beside it.

Full cutover steps: `REPOSITORY_MIGRATION_PLAN.md`.

---

## Phase Context

### Foundation Phase (historical)

TraderCity was discovered while it was being built:

- Homepage prototype and refinement
- Marketing pages (pricing, login, payment activation)
- Member dashboards (Free / VIP)
- Admin Operations Center foundation (Phases 0–3+)
- Mobile deployment investigation

Branches were often long-lived and exploratory. That was appropriate for discovery. It is **not** the Engineering Phase standard.

### Engineering Phase (current standard)

From Governance v1.0 onward (documentation):

- Standards are official
- Git alignment is Migration v2.0 (separate task)

After Migration v2.0 executes:

- `develop` is the integration branch
- `feature/*`, `experiment/*`, and `hotfix/*` are the temporary change vehicles
- `master` is production-ready only
- Foundation branches remain as archived history (not renamed)

---

## Historical Branches

Documented as of Governance v1.0. SHAs and tips may advance later; the meaning below remains the historical role.

**Policy:** Do not rename these branches. Archive them operationally.

### `master`

| Field | Value |
|-------|--------|
| Status | Early Foundation baseline (production meaning pending Migration v2.0) |
| Purpose | Initial repository + early Hero / Ecosystem V1 |

Representative early commits:

- `4db8e46` — Initial commit from Create Next App
- `0186fe2` — Hero V1 and Ecosystem V1

---

### `prototype-redesign`

| Field | Value |
|-------|--------|
| Status | **Archived** — Foundation Phase |
| Purpose | Homepage initial brainstorming and early website prototype |

Continued into homepage architecture cleanup and illustration refinement.

**Forward mapping:** Historical only. New prototype-style research uses `experiment/*`.

Tip at Governance v1.0 documentation time: `ef7e67e` — Hero section Illustration Refinement.

**Freeze:** No more commits after Foundation Phase freeze (Migration v2.0 Step A).

---

### `homepage-cursor-experiment`

| Field | Value |
|-------|--------|
| Status | **Archived** after cutover — Foundation Phase |
| Purpose | Cursor-assisted homepage refinement; expanded into first Admin Dashboard implementation |

Contained Admin foundation, operations dashboard, Members directory, and User Profile Control Center.

**Forward mapping:** Closest historical analogue to an integration branch. After Migration v2.0, its stable tip informs `develop`; the branch name itself becomes history.

Tip at Governance v1.0 documentation time: `2c913ef` — Add Members directory and User Profile Control Center (Phases 2–3).

**Freeze:** No more commits after its tip is captured into `develop` / migration complete.

---

### `mobile-investigation`

| Field | Value |
|-------|--------|
| Status | Temporary investigation (Foundation Phase) |
| Purpose | Compare local development and Vercel preview/production mobile behavior |

Created from the `homepage-cursor-experiment` baseline for deployment-only investigation.

**Findings (documented in `docs/Mobile responsive issue/PHASE2_DEPLOYMENT_INVESTIGATION.md`):**

- Preview deployment path functions
- Local and Preview behavior were investigated with a build marker (`Build: MI-01`)
- Investigation concluded that production/preview deployments function correctly for the evaluated paths
- Real-device confirmation may still be required by operators when Deployment Protection blocks unauthenticated access

**Forward mapping:** Future investigations use `experiment/*` (for example `experiment/mobile-touch`). Remove after findings are preserved (Migration v2.0 Step F).

Tip at Governance v1.0 documentation time: `5ba11ff` — docs: Phase 2 mobile investigation deployment findings.

---

## Approximate Evolution Timeline

```text
Create Next App
  → master early Hero/Ecosystem V1
  → prototype-redesign homepage prototyping + architecture cleanup
  → homepage-cursor-experiment homepage refinement + Admin Phases 0–3
  → mobile-investigation deployment/mobile comparison (temporary)
  → Governance v1.0 documentation (this folder)
  → (next task) repository reorganization to master/develop/feature/experiment/hotfix
```

---

## What This History Means Going Forward

| Historical pattern | Engineering Phase replacement |
|--------------------|-------------------------------|
| Long-lived experiment branch as main line | `develop` + short-lived `feature/*` |
| Investigation on ad-hoc named branch | `experiment/<topic>` then delete |
| Unclear production baseline | `master` = production-ready only |
| Mixing discovery and delivery on one branch | Separate planning, feature branches, and release process |

---

## Explicit Non-Goals of This Document

This file does **not**:

- Rename branches
- Delete branches
- Merge branches
- Declare a new production tip by itself
- Change application functionality

Those actions belong to a separate, explicit repository reorganization task after Governance v1.0 is accepted.

---

## Related References

| Document | Role |
|----------|------|
| `GIT_BRANCHING_STRATEGY.md` | Official future policy |
| `DEVELOPMENT_WORKFLOW.md` | Official lifecycle |
| `docs/Mobile responsive issue/*` | Mobile investigation detail |
| `docs/Development/*` | Phase status and changelogs |

---

*TraderCity Project Governance v1.0 — document history first; reorganize second.*
