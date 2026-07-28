# Documentation Sync Rule (Mandatory)

**Version:** 1.0  
**Status:** Active  
**Authority:** `docs/Member Management/06_Implementation/`

---

## Engineering rule

**Implementation is not complete until `docs/Member Management/` reflects the change.**

Documentation is part of the implementation — not an optional follow-up.

After every major implementation (new module, major refinement, architecture change, workflow update, or UX improvement), review and update **all affected** Member Management documents before considering the work done.

---

## Why

Backend engineers and AI agents must understand Member Management **without reverse-engineering the UI**.  
`docs/Member Management/` is the single source of truth for implemented state, planned work, and API expectations.

---

## Review checklist (adapt to the change)

Example — if Directory / Control Center / Subscriptions change, review:

- [ ] [`../00_Overview/PROJECT_STATUS.md`](../00_Overview/PROJECT_STATUS.md)  
- [ ] [`../00_Overview/MEMBER_DOCUMENTATION_INDEX.md`](../00_Overview/MEMBER_DOCUMENTATION_INDEX.md)  
- [ ] [`../02_Product_Architecture/MEMBER_ECOSYSTEM_ARCHITECTURE.md`](../02_Product_Architecture/MEMBER_ECOSYSTEM_ARCHITECTURE.md)  
- [ ] [`../03_Frontend/COMPONENT_HIERARCHY.md`](../03_Frontend/COMPONENT_HIERARCHY.md)  
- [ ] Module architecture doc (Directory / Control Center / Subscriptions / Discord / Referrals / …)  
- [ ] [`../03_Frontend/OPERATIONAL_UX_PATTERN.md`](../03_Frontend/OPERATIONAL_UX_PATTERN.md) *(if interaction model changes)*  
- [ ] [`../03_Frontend/DASHBOARD_ARCHITECTURE.md`](../03_Frontend/DASHBOARD_ARCHITECTURE.md) *(if impacted)*  
- [ ] [`../04_Admin/MEMBER_ADMIN_WORKFLOW.md`](../04_Admin/MEMBER_ADMIN_WORKFLOW.md)  
- [ ] [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md)  
- [ ] [`../02_Product_Architecture/MEMBER_BACKEND_INTEGRATION.md`](../02_Product_Architecture/MEMBER_BACKEND_INTEGRATION.md)  
- [ ] [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md)  
- [ ] [`CHANGELOG.md`](./CHANGELOG.md)

Update **only** documents affected by the implementation — but do not skip status + changelog.

---

## Every phase / major change should record

1. **What changed** — exact implementation  
2. **Why** — business reasoning  
3. **Documentation updated** — file list  
4. **Backend impact** — APIs, entities, events, integrations  
5. **Remaining work** — completed / pending / deferred  

---

## Documentation quality bar

Each module doc should answer:

- What problem does this solve?  
- Why was it designed this way?  
- How does it interact with other modules?  
- What is implemented vs planned?  
- What must a backend engineer know before integration?
