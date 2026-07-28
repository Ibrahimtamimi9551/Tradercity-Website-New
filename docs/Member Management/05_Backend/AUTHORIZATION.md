# Member Management — Authorization

**Version:** 1.0  
**Status:** Planned  
**Authority:** `docs/Member Management/05_Backend/`  
**Last Updated:** July 28, 2026

---

## Roles (platform assumptions)

| Role | Member Management Admin UI |
|------|----------------------------|
| Guest | No |
| Free Member | No |
| VIP Member | No |
| Analyst | No (separate Analyst Admin) |
| Admin | Yes |

All routes under `/admin` Members section require Admin.

---

## Frontend today

Admin shell does not enforce NestJS JWT yet — mock-first UI. Production must gate:

- Page access  
- Mutations (approve, sync, redeem, notes)  
- Intelligence aggregates  

---

## Future

Fine-grained permissions (support vs super-admin) are **not** specified in the current frontend. Do not invent scopes until product defines them.
