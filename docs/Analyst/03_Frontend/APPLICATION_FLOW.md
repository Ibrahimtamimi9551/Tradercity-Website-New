# Analyst Application Flow (Public)

**Version:** 1.1  
**Status:** Approved · Phase 1 functional mock shell shipped  
**Authority:** `docs/Analyst/03_Frontend/`  
**Last Updated:** July 26, 2026  
**Principle:** Never interrupt the user's intent.  
**Implementation:** [`../06_Implementation/ANALYST_PUBLIC_APPLICATION_JOURNEY_IMPLEMENTATION.md`](../06_Implementation/ANALYST_PUBLIC_APPLICATION_JOURNEY_IMPLEMENTATION.md)

---

## Intent

If someone came to TraderCity specifically to become an analyst, they must continue on that path after authentication — not land on the Free or VIP Member Dashboard and rediscover the application.

```text
Intent  = "I want to become an analyst."
State   = membership, application status, role (managed after submit)
```

Discovery and apply stay on the analyst path. Tracking and account management live in the Member Dashboard (every analyst is first a TraderCity member).

---

## Lifecycle (product)

```text
1. Discovery      Homepage → Analyst Landing Page
2. Authentication Login / Register only when needed (preserve return intent)
3. Application    Complete `/analysts/apply`
4. Tracking       Member Dashboard (application card + progress)
5. Activation     Analyst role granted (Admin pipeline)
6. Operations     Partner Analyst Dashboard unlocked
```

---

## Routes

| Route | Role |
|-------|------|
| `/analysts` | Analyst Landing Page (required for every apply entry) |
| `/analysts/apply` | Application form (auth required) |
| `/analysts/apply/success` (or equivalent) | Confirmation after submit |
| `/login?returnUrl=/analysts/apply` | Auth with intent preserved |
| `/dashboard/free` · `/dashboard/vip` | Post-submit tracking home (not post-auth for this journey) |

Form purpose: evaluation framework (not a trivial lead form). Collect identity, social presence, experience, specialization, research/education examples, public footprint, community size, platform links, reason for joining.

**Do not** collect payout wallet here — onboarding only.

---

## Flow 1 — Visitor from Homepage (most common)

```text
Homepage
    │
    ▼
Become a TraderCity Analyst
(Homepage Teaser)
    │
    ▼
Analyst Landing Page  (/analysts)
    │
    ▼
Apply as Analyst
    │
    ▼
Is user logged in?
```

### If NOT logged in

```text
Apply
    ↓
Login / Register  (returnUrl = /analysts/apply)
    ↓
Authentication Successful
    ↓
Redirect DIRECTLY to Analyst Application Form
    ↓
Submit
    ↓
Success / Confirmation Page
    ↓
Application tracking available inside Member Dashboard
```

**Do not** redirect to Free or VIP Dashboard immediately after login when the user entered via Apply. Preserve `returnUrl` / post-auth intent (same contract as `src/lib/auth/redirects.ts`).

### If already logged in

```text
Analyst Landing Page
    ↓
Apply
    ↓
Application Form
    ↓
Submit
```

No extra steps.

---

## Flow 2 — Existing Member (Free or VIP)

Both dashboards share the same entry:

```text
Member Dashboard (Free or VIP)
    │
    ▼
Become a TraderCity Analyst Card
    │
    ▼
Analyst Landing Page  (/analysts)   ← still required
    │
    ▼
Apply
    │
    ▼
Application Form
```

### Why keep the Landing Page for members?

Every applicant must see the same information before applying:

- What TraderCity offers  
- Expectations  
- Benefits  
- Revenue opportunities  
- Brand building  
- Requirements  

Dashboard → Apply without the landing page is **not** allowed.

---

## After submission

```text
Application Submitted
    ↓
Success / Confirmation Page
```

Example copy:

```text
Application Submitted

Thank you for applying.

Your application has been received.

You can now track the progress
of your application from your
Member Dashboard.
```

Primary CTA: **Return to Dashboard** → Free or VIP home based on membership.

Admin side: application enters Applications queue (`Under Review` / equivalent). See Admin Applications module.

---

## Member Dashboard — application card

Once the user returns, the dashboard card changes automatically.

| Before submit | After submit |
|---------------|--------------|
| Become an Analyst | Analyst Application |
| CTA → Landing | Status: Submitted · View Progress |

---

## Application tracking (Member Dashboard)

Member-facing progress (projection of Admin pipeline — not a second ops UI):

```text
Analyst Application
Submitted

──────────────
✓ Submitted
○ Verification
○ Evaluation
○ Interview
○ Decision
○ Onboarding
```

This surface owns future progress updates for the applicant. Detailed evaluation scores remain Admin-only.

---

## Complete navigation

```text
                        Guest
                          │
                          ▼
                     Homepage
                          │
                          ▼
          Become a TraderCity Analyst
                          │
                          ▼
              Analyst Landing Page
                          │
                          ▼
                  Apply as Analyst
                          │
             ┌────────────┴────────────┐
             │                         │
             ▼                         ▼
      Not Logged In             Already Logged In
             │                         │
             ▼                         ▼
      Login / Register          Application Form
             │                         │
             ▼                         │
Authentication Successful              │
  (returnUrl → /analysts/apply)        │
             │                         │
             └────────────┬────────────┘
                          ▼
                 Application Form
                          │
                          ▼
                Submit Application
                          │
                          ▼
                 Confirmation Page
                          │
                          ▼
            Return to Member Dashboard
                          │
                          ▼
             Analyst Application Card
                          │
                          ▼
               Application Tracking
                          │
                          ▼
     Verification → Evaluation → Decision
                          │
                          ▼
                  Analyst Role Granted
                          │
                          ▼
            Analyst Dashboard Unlocked
```

---

## Auth contract (locked)

| Rule | Behavior |
|------|----------|
| Apply requires session | Soft-gate `/analysts/apply` with `RequireAuth` (or equivalent) |
| Unauthenticated Apply | `/login?returnUrl=/analysts/apply` (register mode allowed) |
| Post-auth priority | Safe `returnUrl` **wins** over default Free/VIP dashboard |
| Default dashboard | Only when there is **no** analyst (or other) return intent |
| Landing is public | `/analysts` does not require login |

Aligns with Member/Auth integration: intent-preserving redirects already exist in `resolvePostAuthRedirect`.

---

## Why this architecture

| Concern | Owner |
|---------|--------|
| Intent (“become an analyst”) | Public landing + apply path — uninterrupted |
| System state (application, membership, role) | Member Dashboard + Admin Applications |
| Activation / ops | Admin pipeline → Partner Analyst Dashboard |

Clean separation: minimize friction for applicants; keep account management, tracking, and role-based access centralized.

---

## Out of scope (this doc)

- Final marketing copy and wireframes  
- NestJS application create API (see `API_EXPECTATIONS.md`)  
- Admin evaluation UI (shipped mock — Applications domain)  
- Partner Analyst Dashboard internals  

---

## Related

- Landing: [`LANDING_PAGE_ARCHITECTURE.md`](./LANDING_PAGE_ARCHITECTURE.md)  
- Lifecycle: [`../01_Product_Vision/ANALYST_USER_LIFECYCLE.md`](../01_Product_Vision/ANALYST_USER_LIFECYCLE.md)  
- Admin review: [`../04_Admin/APPLICATION_REVIEW_PROCESS.md`](../04_Admin/APPLICATION_REVIEW_PROCESS.md)  
- Auth redirects: [`../../04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md`](../../04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md)  
- Ecosystem: [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)
