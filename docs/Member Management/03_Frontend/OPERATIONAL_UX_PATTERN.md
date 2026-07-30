# Member Operational UX Pattern

**Version:** 1.0  
**Status:** Active  
**Authority:** `docs/Member Management/03_Frontend/`  
**Last Updated:** July 28, 2026

---

## Platform rule

```text
Table / Queue → Quick Inspector / Details Panel → Control Center (or domain detail)
```

This is the interaction pattern for Member Management Admin surfaces.

---

## Surface mapping

| Pattern step | Members | Discord | Referrals | Subscriptions (planned) |
|--------------|---------|---------|-----------|-------------------------|
| Table / Queue | Members table | Discord table | Referral table | Tickets table |
| Inspector / Panel | Directory details panel | Discord details panel | Referral details panel | Ticket details |
| Full depth | Control Center `/admin/members/[id]` | Mobile `/admin/discord/[id]` | Mobile `/admin/referrals/[id]` | Mobile detail route |

---

## Rules

1. **Do not grow the Directory inspector into Control Center.** Keep a “Open profile / Control Center” exit.  
2. **Control Center does not approve payments or sync Discord.** It links to owning modules.  
3. **Dashboard widgets deep-link** into filtered queues — Action Driven Navigation.  
4. **URL is the filter contract** — same params for widgets and filter bars.  
5. **Mobile:** master-detail often becomes list → full-page detail route; desktop keeps side panel.

---

## Shared building blocks

| Primitive | Path |
|-----------|------|
| `AdminMasterDetail` | `src/components/admin/directory/AdminMasterDetail.tsx` |
| `AdminDirectoryPanel` | `src/components/admin/directory/AdminDirectoryPanel.tsx` |
| `WidgetCard` | `src/components/admin/ui/WidgetCard.tsx` |
| `DataTable` / `FilterBar` / `Pagination` | `src/components/admin/ui/` |
| Breakpoints | `src/lib/admin/directory/breakpoints.ts` (`isAdminDesktop`) |

---

## Related

- Directory: [`DIRECTORY_ARCHITECTURE.md`](./DIRECTORY_ARCHITECTURE.md)  
- Control Center: [`CONTROL_CENTER_ARCHITECTURE.md`](./CONTROL_CENTER_ARCHITECTURE.md)  
- Responsive: [`RESPONSIVE_STRATEGY.md`](./RESPONSIVE_STRATEGY.md)
