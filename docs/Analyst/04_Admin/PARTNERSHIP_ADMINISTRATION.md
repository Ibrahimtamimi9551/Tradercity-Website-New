# Partnership Administration

**Version:** 1.0  
**Status:** Active (Suspend mock shipped in Wave A; other ops placeholders)  
**Authority:** `docs/Analyst/04_Admin/`  
**Surface:** Analyst Control Center → **Administration** tab  
**Route:** `/admin/analysts/[id]`

---

## Principle

Business operations that change partnership state belong in the **Control Center**, not in the Directory table.

Directory Actions may **navigate** into these flows. They must not execute irreversible one-click mutations.

---

## Operations catalog

| Operation | Intent |
|-----------|--------|
| Suspend Partnership | Temporary pause with recovery path |
| Reactivate Partnership | Restore from suspended |
| Close Partnership | Terminal close of partnership |
| Archive Analyst | Long-term archival of record |
| Pause Publishing | Stop content publishing obligations / surfaces |
| Pause Commission | Halt commission accrual / payouts as configured |
| Remove Discord Access | Revoke Analyst Discord role / channel access |

---

## Suspend Partnership (guided)

```text
Suspend Partnership
        ↓
Reason
        ↓
Notes
        ↓
Duration
        ↓
Notify Analyst?
        ↓
Remove Discord Role?
        ↓
Pause Commissions?
        ↓
Confirm
```

### Rules

- Require reason (structured + free text notes)  
- Duration may be definite or open-ended (product choice at implementation)  
- Discord role removal and commission pause are **explicit confirmations**, not silent side effects  
- Emit timeline / audit events  
- Suspension is recovery-oriented (see lifecycle)  

```text
Warning → Performance Review → Suspended → Reactivated
                                 └→ Partnership Closed
```

---

## Close Partnership

On close (conceptual):

- Freeze partner dashboard access  
- Stop commissions (complete pending payouts per policy)  
- Remove / confirm Discord access removal  
- Archive history · retain records for audit  

---

## Reactivate

- Clear suspension state  
- Optionally restore Discord role and commission accrual (guided confirmations)  
- Record reviewer + timestamp  

---

## Where UI lives

| Place | Allowed |
|-------|---------|
| Control Center → Administration | Execute guided flows |
| Directory ⋮ menu | Navigate into Administration / specific action |
| Directory Inspector | Navigate only |
| Directory table cell | **Forbidden** for mutation |

---

## Backend (planning)

Reserve action endpoints under Control Center contracts:  
[`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)

Entity: `PartnershipAction` — [`../02_Product_Architecture/ANALYST_DOMAIN_MODEL.md`](../02_Product_Architecture/ANALYST_DOMAIN_MODEL.md)

---

## Related

- Control Center: [`../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md`](../03_Frontend/CONTROL_CENTER_ARCHITECTURE.md)  
- Lifecycle: [`../01_Product_Vision/ANALYST_USER_LIFECYCLE.md`](../01_Product_Vision/ANALYST_USER_LIFECYCLE.md)  
- Discord: [`../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md`](../03_Frontend/DISCORD_MODULE_ARCHITECTURE.md)
