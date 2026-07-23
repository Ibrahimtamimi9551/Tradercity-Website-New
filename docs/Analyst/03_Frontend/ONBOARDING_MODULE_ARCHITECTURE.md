# Analyst Onboarding Module Architecture

**Version:** 1.0  
**Status:** Planned — Stage 1 Wave D  
**Authority:** `docs/Analyst/03_Frontend/`  
**Roadmap:** [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)  
**Lifecycle:** [`../01_Product_Vision/ANALYST_USER_LIFECYCLE.md`](../01_Product_Vision/ANALYST_USER_LIFECYCLE.md)

---

## 1. Purpose

Guide newly approved analysts into becoming **productive partners**.

Answers:

> What must this partner complete before they are production-ready, and how far along are they?

Onboarding is Stage 1 partnership establishment — not intelligence or performance monitoring.

---

## 2. Scope (Wave D)

| Capability | Notes |
|------------|-------|
| Welcome Checklist | Ordered required tasks |
| Profile Completion | Identity / public profile readiness |
| Resource Access | Docs, tools, channels |
| Documentation | Partner standards / publishing rules |
| First Report Guidance | Path to first publish |
| Required Tasks | Explicit completion gates |
| Onboarding Progress | % / stage completeness |
| Completion Tracking | Mark complete → unlock Discord Analyst role gate |

Discord assign gate remains:

```text
Onboarding Complete → Assign Analyst Role
```

---

## 3. Surfaces

| Surface | Role |
|---------|------|
| Control Center → Onboarding | Primary per-partner workspace |
| Optional `/admin/analysts/onboarding` | Cross-analyst queue / board (if operators need it) |

**Sidebar:** Placement locks during Wave D acceptance — do not add a permanent nav item before this doc is implemented.

---

## 4. UX pattern

Follow [`OPERATIONAL_UX_PATTERN.md`](./OPERATIONAL_UX_PATTERN.md) if a queue ships:

```text
Onboarding Queue (optional)
        ↓
Inspector / checklist summary
        ↓
Control Center → Onboarding
```

---

## 5. Source ownership (planned)

```text
src/app/admin/analysts/onboarding/page.tsx   # optional queue
src/components/analysts/sections/onboarding/
src/components/analysts/sections/control-center/  # Onboarding tab enrichment
src/lib/analysts/mock/onboarding.ts
src/types/analysts/onboarding.ts
```

---

## 6. Implementation status

| Capability | Status |
|------------|--------|
| Architecture | Planned (this doc) |
| Control Center Onboarding tab | Placeholder (Wave A) |
| Checklist / progress mock | Not started |
| Discord unlock gate (mock) | Not started |

---

## Related

- Roadmap Wave D: [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)  
- Discord role trigger: [`DISCORD_MODULE_ARCHITECTURE.md`](./DISCORD_MODULE_ARCHITECTURE.md)  
- Approval pipeline: [`../04_Admin/APPROVAL_WORKFLOW.md`](../04_Admin/APPROVAL_WORKFLOW.md)
