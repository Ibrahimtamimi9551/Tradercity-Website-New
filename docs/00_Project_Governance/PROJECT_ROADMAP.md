# TraderCity — Project Roadmap

**Document Version:** 1.0  
**Status:** Official master roadmap  
**Rule:** Every `feature/*` branch should map to an item on this roadmap

---

## Purpose

This is the product delivery map for TraderCity.

- **Product Architecture** defines permanent domains  
- **This roadmap** defines what we build, in what order, and what is done  
- **Git** only tracks the change (`feature/<roadmap-item>`)

```text
Roadmap item
  ↓
feature/<name>
  ↓
merge into develop
  ↓
update this roadmap
```

---

## How to Use

1. Pick the next unchecked (or in-progress) roadmap item
2. Create `feature/<kebab-case-name>` from `develop`
3. Implement within the owning product domain
4. Pass `TESTING_CHECKLIST.md`
5. Merge into `develop`
6. Mark the item complete here
7. Delete the feature branch

Do not invent large features that are not on this roadmap without updating the roadmap first.

---

## Master Roadmap

```text
TraderCity

Phase 1 — Marketing Website
✔ Homepage
✔ Pricing
✔ Authentication (Login)
✔ Payment Activation
--------------------

Phase 2 — Member Experience
✔ Free Dashboard
✔ VIP Dashboard
○ Member-facing User Profile (future depth)
--------------------

Phase 3 — Admin Platform (Member Management)
✔ Admin Foundation + Operations Dashboard
✔ Members Directory
✔ User Profile Control Center (Admin)
○ Subscriptions
○ Discord
○ Referrals
○ Payments (verification depth — aligned with subscriptions architecture)
--------------------

Phase 4 — Analyst Platform
○ Analyst Directory
○ Analyst Profiles
○ Report Management
○ Content Publishing
--------------------

Phase 5 — Content Platform
○ Learning Frameworks (platform)
○ Market Reports (platform)
○ News & Updates
○ Media Library
--------------------

Phase 6 — Platform Automation & Intelligence
○ Notifications
○ Analytics / Reporting ops
○ Deeper Automation
○ AI-assisted operations (future)
--------------------
```

**Legend:** `✔` complete · `○` not started / future · `◐` in progress (use when active)

---

## Phase Detail

### Phase 1 — Marketing Website

| Item | Status | Notes |
|------|--------|-------|
| Homepage | ✔ | Premium marketing narrative live |
| Pricing | ✔ | `/pricing` |
| Authentication | ✔ | `/login` |
| Payment Activation | ✔ | `/payment-activation` |

**Owning domain:** Marketing Website  
**Typical branches:** `feature/homepage-*`, `feature/pricing-*`, `feature/login-*`, `feature/payment-*`

---

### Phase 2 — Member Experience

| Item | Status | Notes |
|------|--------|-------|
| Free Dashboard | ✔ | `/dashboard/free` |
| VIP Dashboard | ✔ | `/dashboard/vip` |
| Member-facing User Profile | ○ | Distinct from Admin Control Center; deepen when prioritized |

**Owning domain:** Member Experience  
**Typical branches:** `feature/member-free-dashboard`, `feature/member-vip-dashboard`, `feature/member-profile`

---

### Phase 3 — Admin Platform (Member Management)

| Item | Status | Notes |
|------|--------|-------|
| Admin Foundation + Operations Dashboard | ✔ | `/admin` |
| Members Directory | ✔ | `/admin/members` |
| User Profile Control Center | ✔ | `/admin/members/[id]` |
| Subscriptions | ○ | Next Admin build target; placeholder route exists |
| Discord | ○ | Placeholder route exists |
| Referrals | ○ | Placeholder route exists |
| Payments verification depth | ○ | Architecture documented; implement with subscriptions stack |

**Owning domain:** Admin Platform  
**Authoritative Admin sequence:** `docs/Development/Admin/Phase-Roadmap.md`  
**Typical branches:**

```text
feature/admin-subscriptions
feature/admin-discord
feature/admin-referrals
feature/admin-payments
```

**Design freeze:** Approved `/admin` UI language — inherit, do not redesign.

---

### Phase 4 — Analyst Platform

| Item | Status | Notes |
|------|--------|-------|
| Analyst Directory | ○ | Product domain defined; implementation not started |
| Analyst Profiles | ○ | Homepage “Analyst Team” is marketing narrative only |
| Report Management | ○ | |
| Content Publishing | ○ | |

**Owning domain:** Analyst Platform  
**Typical branches:** `feature/analyst-directory`, `feature/analyst-profiles`, `feature/analyst-reports`

---

### Phase 5 — Content Platform

| Item | Status | Notes |
|------|--------|-------|
| Learning Frameworks (platform) | ○ | Homepage education sections ≠ full Content Platform |
| Market Reports (platform) | ○ | |
| News & Updates | ○ | |
| Media Library | ○ | |

**Owning domain:** Content Platform  
**Typical branches:** `feature/content-learning`, `feature/content-reports`, `feature/content-news`, `feature/content-media`

---

### Phase 6 — Platform Automation & Intelligence

| Item | Status | Notes |
|------|--------|-------|
| Notifications | ○ | Deferred in Admin Phases 7–9 notes |
| Analytics / Reporting ops | ○ | |
| Deeper Automation | ○ | |
| AI-assisted operations | ○ | Future |

**Owning domains:** Cross-cutting; introduce under Admin/shared with explicit ownership  
**Typical branches:** `feature/notifications`, `feature/analytics`, `feature/automation-*`

---

## Suggested Near-Term Order (Post Engineering Platform v2.0)

Do **not** start these until Engineering Platform v2.0 migration is complete:

1. `feature/admin-subscriptions` (Phase 3)
2. `feature/admin-discord` (Phase 3)
3. `feature/admin-referrals` (Phase 3)
4. Then either Admin payments depth, Member profile depth, or Analyst/Content kickoff — update this section when choosing

---

## Roadmap vs Other Documents

| Document | Role |
|----------|------|
| `PROJECT_ARCHITECTURE.md` | Permanent domains |
| **This file** | What to build and what is done |
| `docs/Development/Admin/Phase-Roadmap.md` | Deep Admin Member Management sequence |
| `docs/Development/*/PROJECT_STATUS.md` | Execution status logs |
| `ENGINEERING_PLATFORM_V2.md` | Five-layer platform migration |

If Admin detail conflicts with this summary, prefer the Admin Phase Roadmap for Admin internals, then update this master roadmap to stay aligned.

---

## Update Protocol

After each merged feature:

- [ ] Roadmap item marked complete (or split if partially delivered)
- [ ] Status tables updated
- [ ] Near-term order adjusted if priorities changed
- [ ] No silent scope expansion without a roadmap edit

---

*TraderCity Project Governance — Master Roadmap v1.0*
