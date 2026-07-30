# Analyst Onboarding Module Architecture

**Version:** 2.0  
**Status:** Implemented — Stage 1 Wave D (mock-first)  
**Authority:** `docs/Analyst/03_Frontend/`  
**Roadmap:** [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)  
**Report:** [`../06_Implementation/ANALYST_ONBOARDING_IMPLEMENTATION.md`](../06_Implementation/ANALYST_ONBOARDING_IMPLEMENTATION.md)

---

## 1. Philosophy (v2)

This module is **not** analyst education.

It answers one question:

> Has TraderCity successfully provisioned every required operational module for this newly approved analyst?

| Responsibility | Owner |
|----------------|--------|
| System Provisioning / Initialization Verification | **Admin Platform** (this module) |
| Platform introduction · standards · training · resources | **Future Analyst Dashboard** (partner-facing) |

Do **not** implement orientation content here.

---

## 2. Position in navigation

Onboarding is an **Applications sub-module** — not a top-level sidebar item.

```text
Applications
├── Dashboard
├── Review Queue
├── Onboarding
└── Archive
```

An analyst reaches Onboarding **only after Approve**.

---

## 3. Business flow

```text
Application → Verification → Evaluation → Decision → Approved
────────────────────────────────────────────────────────────
System Provisioning (this module)
→ Operational Analyst Ready
→ Analyst Dashboard / Orientation (future)
→ Begins contributing
```

---

## 4. UI structure

Simple verification surface — **not** a dashboard.

No analytics · KPIs · progress charts · percentages · Ready/In Progress/Blocked summary cards.

```text
Application Approved
  Name · Approved By · Approved Date
────────────────────────
System Initialization
  ✓ / ○ / ✗ checklist items (one per operational module)
────────────────────────
Operational Status
  ✓ Operationally Ready  |  ⚠ Provisioning Required  |  ✗ Provisioning Failed
```

Failed items may expose **Retry** (re-read / future backend retry) and a link into the owning domain (e.g. Discord Operations).

---

## 5. Checklist ↔ domains

| Item | Owning domain | Source |
|------|---------------|--------|
| Analyst Identity Created | Applications | Partnership handoff |
| Directory Record Created | Directory | Directory store / handoff flag |
| Control Center Created | Control Center | Lazy via Directory |
| Discord Record Created | Discord | Discord store / handoff |
| Discord Connected | Discord | Connection status |
| Discord Role Assigned | Discord | Assigned role |
| Referral Record Initialized | Referrals (Wave E) | Reserved at Approve |
| Commission Record Initialized | Commissions (Wave E) | Reserved at Approve |
| Analyst Dashboard Profile | Future Analyst Dashboard | Always **Future** |
| Backend Provisioning Ready | Backend | Mock-ready until NestJS |

Never duplicate data entry — only verify outputs from prior waves.

---

## 6. Surfaces

| Surface | Role |
|---------|------|
| Applications → Onboarding | Primary queue + verification panel |
| `/admin/analysts/applications/[id]?surface=onboarding` | Mobile / deep link |
| Control Center | Lifecycle status only — not an education workspace |

**Sidebar:** No new top-level nav item.

---

## 7. Source ownership

```text
src/types/analysts/onboarding.ts
src/lib/analysts/mock/onboarding.ts
src/components/analysts/sections/applications/OnboardingQueueTable.tsx
src/components/analysts/sections/applications/SystemProvisioningPanel.tsx
src/components/analysts/sections/applications/ApplicationsDomainNav.tsx  # + Onboarding tab
src/lib/analysts/hooks/useAnalystApplications.ts  # view=onboarding
```

---

## 8. Future NestJS

Backend creates records on Approve. This page verifies:

```text
✓ Created · ✓ Connected · ✓ Initialized · ✓ Ready
```

On failure:

```text
✗ Failed → Retry → open owning domain
```

Identity merge / existing member edge cases deferred to final Analyst Management completion.

---

## Related

- Onboarding report: [`../06_Implementation/ANALYST_ONBOARDING_IMPLEMENTATION.md`](../06_Implementation/ANALYST_ONBOARDING_IMPLEMENTATION.md)  
- Discord domain: [`DISCORD_MODULE_ARCHITECTURE.md`](./DISCORD_MODULE_ARCHITECTURE.md)  
- Approval pipeline: [`../04_Admin/APPROVAL_WORKFLOW.md`](../04_Admin/APPROVAL_WORKFLOW.md)
