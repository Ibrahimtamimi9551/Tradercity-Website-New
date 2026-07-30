# Automated Alerts (Deferred)

**Version:** 1.0  
**Status:** Planned — **do not implement now**  
**Authority:** `docs/Analyst/04_Admin/`  
**Last Updated:** July 23, 2026

---

## Decision

Automated Alerts are part of the long-term Analyst Platform operating system, but they are **explicitly deferred**.

Many operational modules are not yet complete. Alerts introduced too early would be speculative and noisy.

---

## Prerequisites (must exist first)

Implement alerts only after these modules are available:

- Discord  
- Reports  
- Publishing  
- Commission  
- Performance  
- Content  

Activity Status (Directory) is a planned **input**, not a substitute for the full alert system.

---

## Future alert examples

| Alert | Signal source (conceptual) |
|-------|----------------------------|
| No Discord Activity | Discord module + Activity Status |
| No Report Published | Reports / publishing |
| No Login | Auth / partner session |
| Missing Weekly Report | Reports schedule |
| No Community Interaction | Community / Discord |
| Commission Issue | Commissions module |
| Verification Expired | Verification module |

---

## Product placement (future)

- Dashboard widgets / queue rows for alert pressure  
- Optional filters on Directory  
- Deep-link into owning module or Control Center  

Dashboard must remain a reflection of real modules — do not fake alert widgets before this ships.

---

## Related

- Activity Status: [`../03_Frontend/DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md)  
- Dashboard evolution: [`../03_Frontend/DASHBOARD_ARCHITECTURE.md`](../03_Frontend/DASHBOARD_ARCHITECTURE.md)  
- Domain entity `AnalystAlert`: [`../02_Product_Architecture/ANALYST_DOMAIN_MODEL.md`](../02_Product_Architecture/ANALYST_DOMAIN_MODEL.md)
