# TraderCity — Deployment Guide

**Document Version:** 1.0  
**Status:** Official Engineering Reference  
**Scope:** Local, Preview, and Production deployment

---

## Purpose

Document how TraderCity moves between environments.

```text
Local Development
  ↓
Preview Deployment
  ↓
Production Deployment
```

---

## Stack Snapshot

| Item | Value |
|------|-------|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Motion | Framer Motion |
| Hosting | Vercel |
| Vercel project | `tradercitycrypto` |

Secrets stay in environment configuration (for example `.env.local` locally and Vercel project env vars remotely). Never commit secrets.

---

## 1. Local Development

### Install

```bash
npm install
```

### Run

```bash
npm run dev
```

Typical local URL: `http://localhost:3000`

### Quality commands

```bash
npm run lint
npm run build
npm run start
```

Use `build` before relying on Preview: if local production build fails, Preview will fail.

### Local rules

- Develop on `feature/*`, `experiment/*`, or `hotfix/*` — not on `master`
- Keep Marketing and Admin isolation intact
- Prefer verifying desktop + responsive behavior locally before push

---

## 2. Preview Deployment (Vercel)

Preview deployments validate a branch in a production-like environment.

### When to use Preview

- Feature review before merge into `develop`
- Real mobile device testing against a public URL
- Release-candidate validation before production
- Experiments that need deployment-only comparison (document findings)

### Typical workflow

1. Commit work on the feature / experiment / hotfix branch
2. Push branch to GitHub (`origin`)
3. Vercel creates a Preview deployment for the branch
4. Open the Preview URL (account login may be required if Deployment Protection is enabled)
5. Run desktop + real-device testing against Preview
6. Merge only after checklist gates pass

### Notes specific to this project

- Preview URLs may be behind **Vercel Deployment Protection (Login)**. Unauthenticated fetches can show the Vercel login page instead of the app.
- Prefer the stable **branch alias** URL when sharing for device testing.
- For investigation builds, a visible build marker in the UI (when used) helps confirm the correct deployment is open.

### Isolation

Pushing a Preview branch must not silently merge into `master` or other long-lived branches. Preview is evaluation, not release.

---

## 3. Production Deployment

Production receives only release-ready code.

### Target

- Production deployment on Vercel
- Git `master` aligned to production-ready state (once reorganization is complete)

### Path

Follow `RELEASE_PROCESS.md`:

```text
develop (tested) → preview validation → production release → master
```

Hotfixes may ship directly through `hotfix/*` → production → back-merge `develop`.

### Production rules

- No experiments
- No unfinished features
- Build must succeed
- Critical paths tested on desktop and real mobile
- Do not deploy from ad-hoc local-only state that was never pushed/reviewed

---

## Environment Responsibilities

| Environment | Branch intent | Audience |
|-------------|---------------|----------|
| Local | Active working branch | Developer |
| Preview | Feature / experiment / release candidate | Developer + reviewers + device testing |
| Production | Release from `master` (or approved hotfix) | Members / operators (live) |

---

## Rollback Guidance

If production misbehaves:

1. Identify last known good deployment / commit
2. Prefer a `hotfix/*` forward-fix when safe and fast
3. If rollback is required, use an explicit production rollback path in Vercel and document it
4. Back-merge corrective outcome into `develop`

Do not “fix forward” with unrelated refactors during an incident.

---

## AI / Automation Constraints

Agents may:

- Prepare branches and local verification
- Document Preview URLs and findings
- Follow deployment checklists

Agents must not:

- Change production environment variables without approval
- Bypass Preview when UI risk is material
- Treat Preview as permission to merge into `master`
- Invent alternate hosting workflows

---

## Principles

1. **Local → Preview → Production** is the default path for UI work.
2. **Preview is mandatory for meaningful UI releases.**
3. **Production tracks release-ready Git state.**
4. **Deployment does not redefine product architecture.**

---

## Related References

| Document | Role |
|----------|------|
| `DEVELOPMENT_WORKFLOW.md` | Where deployment sits in the lifecycle |
| `RELEASE_PROCESS.md` | Promotion rules |
| `TESTING_CHECKLIST.md` | Pre-merge / pre-release gates |
| `PROJECT_HISTORY.md` | Example investigation Preview usage |

---

*TraderCity Project Governance v1.0*
