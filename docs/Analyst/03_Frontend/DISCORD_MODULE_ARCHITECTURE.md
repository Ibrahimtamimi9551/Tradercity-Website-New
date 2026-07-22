# Analyst Discord Module Architecture

**Version:** 1.0  
**Status:** Planned  
**Authority:** `docs/Analyst/03_Frontend/`  
**Suggested route:** `/admin/analysts/discord`  
**Nav placement:** Below Directory in Analysts section

---

## 1. Decision — reuse, do not fork

Do **not** create an entirely separate Discord architecture.

| Shared | Different |
|--------|-----------|
| Discord infrastructure | Business trigger |
| Sync / role assignment machinery | Role assigned (`analyst` vs VIP) |
| Reflection UI patterns (Member Discord) | Lifecycle gates before assign |

```text
Member:  Membership Verified → Assign VIP Role
Analyst: Application Approved → Agreement Accepted → Onboarding Complete → Assign Analyst Role
```

No payment. No subscription validation. Same infrastructure.

---

## 2. Purpose

Provide Admin operators a dedicated Analyst Discord surface that answers:

> Is this partner correctly linked to Discord, holding the Analyst role, and healthy from a sync / activity perspective?

Mirrors Member Discord module capabilities where applicable.

---

## 3. Suggested capabilities

| Capability | Notes |
|------------|-------|
| Discord Account | Linked account identity |
| Discord Username | Display + external profile link |
| Joined Server | Membership in TraderCity server |
| Analyst Role | Assigned / missing / pending |
| Role Sync | Sync affordances (reuse sync patterns) |
| Role History | Role grant/revoke history |
| Sync Logs | Operational logs |
| Sync Status | synced / pending / failed |
| Channel Permissions | Analyst channel access reflection |
| Discord Activity | Engagement signals |
| Last Seen | Presence freshness |
| Last Message | Text channel activity |
| Last Voice Activity | Voice freshness |

Reuse existing Discord synchronization architecture wherever possible.  
Cross-ref Member Discord specs under `docs/AI/Agents/Admin/` (shared shell patterns only — do not fork SoT).

---

## 4. UX pattern

Follow [`OPERATIONAL_UX_PATTERN.md`](./OPERATIONAL_UX_PATTERN.md):

```text
Discord Table / Sync Queue
        ↓
Discord Inspector
        ↓
Control Center → Discord tab  (or deep Discord detail)
```

---

## 5. Relationship to Control Center

- Analyst Discord **module** = operational queue across partners  
- Control Center **Discord tab** = reflection + actions for one partner  
- Role remove during Suspend is owned by Partnership Administration (may call shared Discord sync)

---

## 6. Source ownership (planned)

```text
src/app/admin/analysts/discord/page.tsx
src/components/analysts/sections/discord/
src/lib/analysts/mock/discord.ts
src/types/analysts/discord.ts
```

Shared Discord primitives may live under Admin/shared sync clients when backend exists — Analyst UI still owns presentation under `components/analysts/`.

---

## 7. Backend expectations (planning only)

Reserve contracts for:

- Analyst Discord link projection  
- Analyst role assignment / removal  
- Sync status + logs  
- Activity timestamps (last seen / message / voice)

See [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md) · [`../05_Backend/INTEGRATION_POINTS.md`](../05_Backend/INTEGRATION_POINTS.md).

---

## 8. Implementation status

| Capability | Status |
|------------|--------|
| Nav item + route | Not started |
| Module UI | Planned |
| Shared sync reuse | Planned (no new Discord stack) |
| NestJS / bot contracts | Not started |

---

## Related

- Ecosystem: [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)  
- Control Center Discord tab: [`CONTROL_CENTER_ARCHITECTURE.md`](./CONTROL_CENTER_ARCHITECTURE.md)  
- Lifecycle trigger: [`../01_Product_Vision/ANALYST_USER_LIFECYCLE.md`](../01_Product_Vision/ANALYST_USER_LIFECYCLE.md)
