# TraderCity — Testing Checklist

**Document Version:** 1.0  
**Status:** Official Engineering Reference  
**Scope:** Required gates before merge and release

---

## Purpose

Every feature, meaningful UI change, and production hotfix must pass this checklist before merging into `develop` or releasing to production.

Emulation helps. It does not replace real-device mobile testing.

---

## Required Gates

Every change must pass:

| # | Gate | Required |
|---|------|----------|
| 1 | Desktop | Yes |
| 2 | Tablet | Yes |
| 3 | Real Mobile Device | Yes |
| 4 | Responsive Layout | Yes |
| 5 | Console Errors | Yes |
| 6 | TypeScript | Yes |
| 7 | Production Build | Yes |
| 8 | Preview Deployment | Yes (UI / deploy-risk changes) |

For pure documentation-only changes, gates 1–5 and 8 may be marked N/A with explicit rationale. TypeScript/build still recommended if any code path was touched.

---

## Checklist

Copy into PR / task notes as needed.

### Desktop

- [ ] Primary happy path works
- [ ] Navigation / shell behavior correct
- [ ] No broken layout at standard desktop width (e.g. 1280–1440)
- [ ] Admin and Marketing surfaces (whichever are in scope) behave correctly

### Tablet

- [ ] Layout remains usable at tablet widths
- [ ] No overlapping critical controls
- [ ] Touch-adjacent targets remain reachable

### Real Mobile Device

- [ ] Tested on a physical phone (not only DevTools)
- [ ] Touch interactions work (tap, scroll, drawer, bottom nav if applicable)
- [ ] No invisible overlay blocking taps
- [ ] Preview URL (or local equivalent) matches expected build

### Responsive Layout

- [ ] No horizontal overflow on target pages
- [ ] Typography and spacing remain coherent
- [ ] Components adapt without clipping critical content

### Console Errors

- [ ] No new blocking console errors on primary flows
- [ ] Known pre-existing warnings documented if intentionally untouched

### TypeScript

- [ ] No new TypeScript errors in touched scope
- [ ] Types remain honest (no reckless `any` to silence errors)

### Production Build

```bash
npm run lint
npm run build
```

- [ ] Lint passes (or only pre-documented exceptions)
- [ ] `npm run build` succeeds locally

### Preview Deployment

- [ ] Branch deployed to Vercel Preview
- [ ] Correct deployment confirmed (URL / alias / build marker if used)
- [ ] Desktop + real-device checks repeated against Preview for UI work

---

## Scope-Specific Additions

### Marketing / Homepage

- [ ] Visual hierarchy intact
- [ ] Motion does not break mobile usability
- [ ] No accidental Admin imports

### Member Dashboards

- [ ] Free / VIP routes in scope still load
- [ ] Membership presentation matches intended tier

### Admin Platform

- [ ] Shell / sidebar / mobile drawer behavior verified
- [ ] Module in scope answers its operational question
- [ ] Design freeze respected (no drive-by redesign)
- [ ] Homepage / marketing files untouched unless explicitly in scope

---

## Evidence Expectations

When reporting test results, prefer:

| Field | Example |
|-------|---------|
| Environment | Local / Preview / Production |
| Branch + SHA | `feature/admin-discord` @ `abc1234` |
| Desktop | Pass / Fail + notes |
| Tablet | Pass / Fail + notes |
| Real mobile | Device model + Pass / Fail |
| Build | Pass / Fail |
| Preview URL | Branch alias if available |

Investigations that conclude “no code change needed” should still record what was tested — see `PROJECT_HISTORY.md` mobile investigation example.

---

## Merge Policy

| Result | Action |
|--------|--------|
| All required gates pass | Eligible to merge / release |
| Any required gate fails | Do not merge |
| Gate blocked (e.g. Preview login) | Document blocker; do not silently skip real-device confirmation |

---

## Principles

1. **No merge without the checklist.**
2. **Real mobile is mandatory for UI.**
3. **Preview catches what local misses.**
4. **Testing validates change quality; it does not redefine product architecture.**

---

## Related References

| Document | Role |
|----------|------|
| `DEVELOPMENT_WORKFLOW.md` | Where testing sits |
| `DEPLOYMENT_GUIDE.md` | Preview / production environments |
| `RELEASE_PROCESS.md` | Release candidate gates |
| `AI_DEVELOPMENT_GUIDELINES.md` | Agents must not skip gates |

---

*TraderCity Project Governance v1.0*
