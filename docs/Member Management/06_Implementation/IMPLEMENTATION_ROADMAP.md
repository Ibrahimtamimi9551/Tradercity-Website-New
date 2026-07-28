# Member Management — Implementation Roadmap

**Version:** 1.0  
**Status:** Active · **Canonical** sequence  
**Authority:** `docs/Member Management/06_Implementation/`  
**Last Updated:** July 28, 2026

---

## Delivery model

```text
Foundation → Inbox → Directory → Hub → Domain Modules
   (0)        (1)       (2)       (3)     (4–6)
```

Mock-first Admin frontend. NestJS integration is a **separate track** after UI contracts stabilize.

---

## Phases 0–6

| Phase | Scope | Frontend status |
|-------|--------|-----------------|
| 0 | Admin Foundation (shell, sidebar, shared UI) | **Complete** (mock) |
| 1 | Dashboard — Operations Center | **Complete** (mock) · Design Frozen |
| 2 | Members Directory + System Health | **Complete** (mock) |
| 3 | Member Control Center | **Complete** (mock) |
| 4 | Subscriptions | **Shell** — next UI target |
| 5 | Discord | **UI Complete** (mock) |
| 6 | Referrals (Ops + Intelligence) | **UI Complete** (mock) |

---

## Deferred (not Member Management Phases 0–6)

| Phase | Modules | Future home |
|-------|---------|-------------|
| 7 | Reports, Community, Media | Content Platform |
| 8 | Settings | Platform Administration |
| 9 | Notifications, Audit Logs | System / future |

---

## Next steps (ordered)

1. **Phase 4 Subscriptions UI** — `src/components/members/sections/subscriptions/` inheriting Dashboard language  
2. Honor existing deep-links (`status`, `member`)  
3. Write NestJS contracts against [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)  
4. Replace hooks module-by-module  
5. Optional: formal historical Phase-05/06 records in `docs/Development/Admin/` for archival parity  

---

## Future enhancements (planned direction — do not redesign)

Documented deferred / future items:

- Discord production sync jobs (UI exists)  
- Referral redeem mutations + Intelligence live data (UI exists)  
- Payment verification engine depth with Subscriptions  
- Notifications  
- Audit logs  
- Additional Control Center cards for future product modules (Copy Trading, Vault, Education, …) — plug-in reflection pattern only  

Do not expand scope during Engineering Freeze unless explicitly overridden.
