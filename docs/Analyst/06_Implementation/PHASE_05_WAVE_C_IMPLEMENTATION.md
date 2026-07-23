# Phase 05 / Wave C — Discord Domain Implementation Report

**Version:** 1.0  
**Status:** Complete (mock-first frontend)  
**Date:** July 24, 2026  
**Authority:** `docs/Analyst/06_Implementation/`  
**Plan reference:** [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md) Stage 1 Wave C

---

## Governance framing

| Item | Value |
|------|-------|
| Roadmap item | Analyst Platform — Stage 1 Wave C Discord |
| Owning domain | `analyst` |
| Allowed paths | `src/app/admin/analysts/discord/**` · `src/components/analysts/sections/discord/**` · `src/lib/analysts/**` · `src/types/analysts/discord.ts` · Control Center Discord panel · thin nav in `src/components/admin/layout/nav-config.ts` · `docs/Analyst/**` |

---

## Objectives

Ship Discord as a **first-class operational domain** and make Approve the birth of a TraderCity Analyst (Applicant → Partner), with Discord continuing the lifecycle.

---

## Architectural principles captured (docs + code)

### 1. Approval = partnership activation

```text
Application → Approved
────────────────────────
Create Analyst Identity
→ Create Directory Record
→ Create Control Center (via Directory)
→ Create Discord Record
→ Reserve Referral Record
→ Ready For Onboarding
```

Applications record how the analyst entered. They no longer own the partner after Approve.

### 2. Identity migration — Future Edge Case (not implemented)

An applicant may already exist as Discord member / Free / VIP / referral participant.  
Reuse vs merge of identities, Discord IDs, and permissions is deferred to the **final Analyst Management completion phase** when all operational domains exist.

### 3. Analyst Dashboard (partner-facing) — deferred

Do **not** design the partner Analyst Dashboard during Analyst Management.  
Complete Applications · Discord · Onboarding · Referrals · Control Center first; then surface domain outputs on the dashboard.

---

## What shipped

| Capability | Result |
|------------|--------|
| Domain shell | `/admin/analysts/discord` — Dashboard / Directory / Operations |
| Sidebar | Discord first-class under Analysts nav |
| Discord Dashboard | Connected · Pending Connections · Pending Invitations · Sync Errors · Disconnected · Role Assignment Issues |
| Discord Directory | Table + inspector (AdminMasterDetail) |
| Discord Operations | Partner list + operational actions |
| Statuses | Pending · Invited · Connected · Verified · Role Assigned · Disconnected |
| Operations | Generate/Copy Invite · Connect · Reconnect · Sync Roles · Assign/Remove Role · Disconnect · Audit History |
| Mobile | `/admin/analysts/discord/[id]` |
| Wave B → C flow | Approve → `activatePartnershipFromApplication` seeds Directory + Discord + referral reserved |
| Control Center | Discord tab consumes Discord domain (not a duplicate manager) |
| Future reserves | Publishing / private / education / mod channels — documented only |

---

## Source ownership

```text
src/types/analysts/discord.ts
src/lib/analysts/mock/discord.ts
src/lib/analysts/mock/discord-mutations.ts
src/lib/analysts/mock/partnership-activation.ts
src/lib/analysts/hooks/useAnalystDiscord.ts
src/lib/analysts/format-discord.ts
src/components/analysts/sections/discord/
src/components/analysts/sections/control-center/ControlCenterDiscordPanel.tsx
src/app/admin/analysts/discord/page.tsx
src/app/admin/analysts/discord/[id]/page.tsx
```

---

## URL contract

```text
/admin/analysts/discord
/admin/analysts/discord?view=directory&status=pending
/admin/analysts/discord?view=directory&sync=error
/admin/analysts/discord?view=directory&focus=role_issues
/admin/analysts/discord?view=operations&discord=adisc-a-001
/admin/analysts/discord/[id]
/admin/analysts/[id]?tab=discord
```

---

## Exit criteria

| Criterion | Result |
|-----------|--------|
| Discord first-class domain + sidebar | **Met** |
| Dashboard · Directory · Operations | **Met** |
| Control Center consumes Discord | **Met** |
| Wave B outputs flow into Wave C | **Met** |
| Mirrors Member Discord patterns | **Met** (Analyst role / lifecycle) |
| Mock-first · backend-ready | **Met** |
| Docs synchronized | **Met** |

---

## Next recommended work

**Stage 1 Wave D — Onboarding** (checklist · Discord assign-role gate).  
Stop for review before Wave D.
