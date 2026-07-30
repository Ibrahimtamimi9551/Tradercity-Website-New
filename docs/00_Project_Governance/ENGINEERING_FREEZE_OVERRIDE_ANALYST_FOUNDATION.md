# Engineering Freeze Override – Analyst Foundation

**Document Version:** 1.0  
**Status:** Active (temporary Product Owner override)  
**Authority:** Product Owner  
**Parent policy:** [`ENGINEERING_FREEZE.md`](./ENGINEERING_FREEZE.md)

---

## Purpose

Approved by Product Owner for the purpose of validating the complete Analyst onboarding UX.

This is **not** a general lift of Engineering Freeze. It is a scoped development override so frontend journeys can be exercised end-to-end before backend authentication exists.

---

## Scope (allowed)

- Authentication UI improvements (`/login` Login / Create Account modes)
- Mock authentication session layer (development-only)
- Navigation and redirect preservation (`returnUrl` / `plan`)
- Routing needed for Analyst foundation journeys
- Analyst onboarding page shells (when separately tasked)
- Placeholder / locked states for foundation pages
- Responsive refinements on authentication and foundation shells

---

## Explicitly excluded

- Backend integration / NestJS APIs
- Database changes
- Production authentication (JWT, refresh tokens, real OAuth)
- Security implementation and credential validation
- Business logic engines (permissions, notifications, commissions)
- Permission enforcement beyond soft client guards for UX validation
- Admin workflow implementation beyond existing mock surfaces

---

## Auth mock location

Development mock auth lives under:

```text
src/lib/auth/
```

All mock files are marked **DEV MOCK ONLY** and must be replaceable with NestJS JWT/session without rewriting login UI or redirect helpers.

---

## Return to freeze

Once this foundation is complete and the Analyst onboarding UX has been validated, the project returns to the normal Engineering Freeze process until the next approved implementation phase.

Agents must not expand beyond the scoped list above without a new explicit Product Owner override.

---

## Related

| Document | Role |
|----------|------|
| [`ENGINEERING_FREEZE.md`](./ENGINEERING_FREEZE.md) | Standing freeze policy |
| [`PROJECT_ROADMAP.md`](./PROJECT_ROADMAP.md) | Delivery map |
| [`docs/04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md`](../04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md) | Auth / member redirect contracts |

---

*TraderCity Project Governance — temporary Analyst Foundation override*
