# Discord Administration (Members)

**Version:** 1.0  
**Status:** Active — UI mock shipped  
**Authority:** `docs/Member Management/04_Admin/`  
**Last Updated:** July 28, 2026

---

## Intent

Keep Discord roles aligned with TraderCity Membership. Process sync failures, pending invites, and connection problems.

---

## Admin workflow (UI available)

1. Open `/admin/discord` or Dashboard deep-link `?sync=failed` / `?sync=pending`  
2. Filter by role, connection, sync, membership  
3. Inspect details panel (desktop) or `/admin/discord/[id]` (mobile)  
4. Use sync actions (mock today)  
5. Open Member Control Center via `memberId` when full context needed  

---

## Principles

- TraderCity Membership is SoT for access  
- Discord mirrors; it does not redefine VIP  
- Control Center Discord card is reflection-only  

---

## Backend pending

- Real sync jobs / webhooks  
- Persist role history and sync logs  
- Replace `useDiscordDirectory` mock  

See [`../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md`](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md).
