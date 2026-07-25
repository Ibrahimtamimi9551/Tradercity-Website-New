# TraderCity — Engineering Freeze

**Document Version:** 1.0  
**Status:** Active after UI Stabilization commit; remains until Repository Migration v2.0 completes  
**Purpose:** Create a hard freeze point before Engineering Baseline v1.0

---

## Freeze Sequence

```text
Feature Development
        ↓
Stabilization Sprint
        ↓
Engineering Freeze          ← THIS POLICY
        ↓
Preview Validation
        ↓
Device Validation
        ↓
Engineering Baseline v1.0
        ↓
Repository Migration v2.0
        ↓
Engineering Phase
```

---

## What Engineering Freeze Means

Until Repository Migration v2.0 is complete and the Engineering Phase officially begins:

| Allowed | Forbidden |
|---------|-----------|
| Preview deployment of the freeze tip | New features |
| Real-device validation | Design improvements |
| Updating the stabilization report with validation evidence | Refactoring for cleanliness |
| Release-blocking bug fixes only | Scope expansion / “one more tweak” |
| Governance docs that record freeze / READY evidence | Folder reorganization / source moves |
| Explicit Migration v2.0 execution (when READY) | Starting `feature/*` product work |

> Engineering baselines need a **freeze point**.  
> Do not move the goalpost.

---

## Release-Blocking Bugs Only

A change is allowed during freeze only if it:

1. Blocks Preview or real-device validation, **or**
2. Breaks production build / TypeScript, **or**
3. Creates an interaction blocker (cannot tap / navigate / close overlay)

Cosmetic polish, performance niceties, and “while we are here” cleanups are **out of scope**.

---

## Freeze Tip

The UI Stabilization Sprint commit on `homepage-cursor-experiment` is the intended freeze tip for Preview and device validation.

Do not stack unrelated commits on top before validation unless they are release-blocking.

---

## Exit Criteria

Engineering Freeze ends only when **all** are true:

1. Stabilization report verdict is **READY** (Preview + real-device evidence recorded)
2. Repository Migration / Engineering Platform v2.0 execution is complete (or explicitly underway as the sole active workstream)
3. `develop` / `master` Engineering workflow is live

Then normal roadmap work resumes via `feature/*` from `develop`.

---

## AI Rule

Agents must not propose or implement feature work, redesigns, or non-blocking refactors while this freeze is active.

If unsure whether a bug is release-blocking, **ask** — default to no change.

---

## Related

| Document | Role |
|----------|------|
| `docs/Development/Stabilization/UI_STABILIZATION_SPRINT_REPORT.md` | Validation evidence + READY/NOT READY |
| `ENGINEERING_PLATFORM_V2.md` | Migration after baseline |
| `PROJECT_ROADMAP.md` | Features resume after freeze ends |
| [`ENGINEERING_FREEZE_OVERRIDE_ANALYST_FOUNDATION.md`](./ENGINEERING_FREEZE_OVERRIDE_ANALYST_FOUNDATION.md) | Temporary PO override — Analyst foundation UX (scoped) |

---

*TraderCity Project Governance — Engineering Freeze v1.0*
