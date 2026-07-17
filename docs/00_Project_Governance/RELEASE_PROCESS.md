# TraderCity — Release Process

**Document Version:** 1.0  
**Status:** Official Engineering Reference  
**Scope:** Promoting integrated work to production

---

## Purpose

Define how completed work moves from integration to production without chaos.

Releases are deliberate. Experiments are not releases.

---

## Release Flow

```text
Feature
  ↓
Develop
  ↓
Testing
  ↓
Preview Deployment
  ↓
Production Release
```

---

## Stage Definitions

### 1. Feature

Work lands on a `feature/*` (or promoted outcome of an experiment / hotfix path) and is completed according to `DEVELOPMENT_WORKFLOW.md`.

**Gate:** Feature is done, scoped, and locally verified.

---

### 2. Develop

Feature merges into `develop`.

**Purpose of `develop`:**
- Integrate multiple completed features
- Hold the next release candidate stream
- Remain separate from production until intentionally released

**Gate:** Merge checklist passed; branch deleted if temporary.

---

### 3. Testing

Release-candidate testing on the integrated `develop` state (or a release candidate cut from it).

**Must cover:**
- Desktop
- Tablet
- Real mobile device
- Critical member and admin paths affected by the release
- TypeScript / lint / production build
- No known blocker console errors

See `TESTING_CHECKLIST.md`.

---

### 4. Preview Deployment

Deploy the release candidate to Vercel Preview (or a designated pre-production alias).

**Purpose:**
- Production-like validation
- Stakeholder / operator review
- Real-device confirmation against a deployed URL

See `DEPLOYMENT_GUIDE.md`.

---

### 5. Production Release

Promote the validated candidate to production and update `master`.

**Outcomes:**
- Production deployment is live
- `master` matches production-ready code
- Release notes / changelog updated when meaningful
- Hotfix back-merges completed if applicable

---

## Release Rules

### Allowed into a production release

- Completed features merged through `develop`
- Approved hotfixes
- Documentation that supports the release
- Configuration required for the release (with care for secrets)

### Not allowed into a production release

- Open experiments
- Unfinished features
- Unrelated refactors bundled “while we are here”
- Known failing TypeScript / build / critical mobile blockers
- Direct pushes of feature work onto `master`

---

## Release Cadence Guidance

Governance v1.0 does not force a calendar cadence.

Use one of:

| Style | When |
|-------|------|
| **Continuous small releases** | Isolated features are stable and independently valuable |
| **Batched releases** | Multiple related features should ship together for product coherence |

Choose consciously. Do not accidentally treat `develop` as production.

---

## Hotfix Releases

```text
Production issue
  ↓
hotfix/<issue> from master
  ↓
Fix + test + preview if needed
  ↓
Release to production (master)
  ↓
Back-merge into develop
```

Hotfixes prioritize restoration of production correctness. They still require testing proportionate to risk.

---

## Versioning Note

Application `package.json` version may lag formal product releases during Foundation → Engineering transition.

When versioning is formalized later, update this document. Until then, identify releases by:

- Git SHA
- Deployment URL / Vercel deployment ID
- Date
- Short release summary

---

## Principles

1. **Features integrate on `develop` before production.**
2. **`master` is production-ready only.**
3. **Preview before production for UI releases.**
4. **Real mobile testing is part of release readiness.**
5. **Git manages the release path; it does not redefine product domains.**

---

## Related References

| Document | Role |
|----------|------|
| `DEVELOPMENT_WORKFLOW.md` | Full lifecycle |
| `GIT_BRANCHING_STRATEGY.md` | Branch roles |
| `DEPLOYMENT_GUIDE.md` | Vercel environments |
| `TESTING_CHECKLIST.md` | Release gates |

---

*TraderCity Project Governance v1.0*
