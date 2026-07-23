# Analyst Discord Module Architecture

**Version:** 3.0  
**Status:** Active — Stage 1 Wave C shipped (mock)  
**Authority:** `docs/Analyst/03_Frontend/`  
**Route:** `/admin/analysts/discord`  
**Nav placement:** First-class Analysts sidebar domain (mirror Member Discord)  
**Roadmap:** [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)  
**Implementation report:** [`../06_Implementation/PHASE_05_WAVE_C_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_C_IMPLEMENTATION.md)

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
Analyst: Application Approved → Agreement / Onboarding Complete → Assign Analyst Role
```

No payment. No subscription validation. Same infrastructure.

---

## 2. Purpose

Operational center for **Analyst Discord management**.

> Is this partner correctly linked to Discord, holding the Analyst role, and healthy from a sync perspective?

---

## 3. Domain IA

### Left navigation

```text
Discord
```

### Internal views (shipped)

```text
Discord
├── Discord Dashboard ✅
├── Discord Directory ✅
├── Discord Operations ✅
└── Discord Intelligence (future — Stage 2)
```

---

## 4. Capability detail (shipped)

### Dashboard

- Connected Analysts  
- Pending Connections  
- Pending Invitations  
- Sync Errors  
- Disconnected Analysts  
- Role Assignment Issues  

### Directory columns

- Analyst · Discord Username · Connection Status · Assigned Role · Server Status · Last Sync  

### Statuses (keep simple)

`pending` · `invited` · `connected` · `verified` · `role_assigned` · `disconnected`

### Operations

- Generate Invite · Copy Invite · Connect Account · Reconnect  
- Synchronize Roles · Assign Role · Remove Role · Disconnect Account  
- View Audit History (panel)

**Assign Role gate (production):** Onboarding Complete → Assign Analyst Role. Mock allows ops override until Wave D.

---

## 5. Information flow (Wave B → C)

Approve runs **partnership activation**:

```text
Create Analyst Identity
→ Directory record
→ Control Center (lazy via Directory)
→ Discord record
→ Referral reserved (Wave E)
→ Ready for Onboarding
```

Discord never requires re-entering application data.

---

## 6. UX pattern

```text
Discord Directory / Dashboard queues
        ↓
Discord Inspector
        ↓
Discord Operations  ·or·  Control Center → Discord tab
```

Desktop: inspector. Mobile: `/admin/analysts/discord/[id]`.

---

## 7. Relationship to Control Center

- Discord **module** = operational domain across partners  
- Control Center **Discord tab** = reflection + deep-links (does not duplicate management)  
- Suspend may remove Analyst role via shared Discord record (mock)

---

## 8. Source ownership (shipped)

```text
src/app/admin/analysts/discord/page.tsx
src/app/admin/analysts/discord/[id]/page.tsx
src/components/analysts/sections/discord/
src/components/analysts/sections/control-center/ControlCenterDiscordPanel.tsx
src/lib/analysts/mock/discord.ts
src/lib/analysts/mock/discord-mutations.ts
src/lib/analysts/mock/partnership-activation.ts
src/lib/analysts/hooks/useAnalystDiscord.ts
src/lib/analysts/format-discord.ts
src/types/analysts/discord.ts
```

---

## 9. Future (documentation only — do not implement in Wave C)

| Item | Notes |
|------|-------|
| Publishing Channels | Later |
| Private Analyst Channels | Later |
| Education Channels | Later |
| Report / Moderator Permissions | Later |
| Advanced Synchronization | Later |
| Identity migration / merge | Final Analyst Management phase — see ecosystem Future Edge Cases |
| Discord Intelligence | Stage 2 |
| NestJS / bot contracts | Shared Discord stack |

---

## 10. Implementation status

| Capability | Status |
|------------|--------|
| Nav item + route | **Shipped** |
| Dashboard / Directory / Operations | **Shipped (mock)** |
| Control Center Discord tab | **Shipped (consumes domain)** |
| Partnership activation on Approve | **Shipped (mock)** |
| Shared sync reuse | Planned (no new Discord stack) |
| Discord Intelligence | Stage 2 |
| NestJS / bot contracts | Not started |

---

## Related

- Ecosystem: [`../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/ANALYST_ECOSYSTEM_ARCHITECTURE.md)  
- Control Center: [`CONTROL_CENTER_ARCHITECTURE.md`](./CONTROL_CENTER_ARCHITECTURE.md)  
- Lifecycle: [`../01_Product_Vision/ANALYST_USER_LIFECYCLE.md`](../01_Product_Vision/ANALYST_USER_LIFECYCLE.md)  
- Wave C report: [`../06_Implementation/PHASE_05_WAVE_C_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_C_IMPLEMENTATION.md)
