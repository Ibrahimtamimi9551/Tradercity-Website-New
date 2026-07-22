# TraderCity — Module Ownership

**Document Version:** 1.0  
**Status:** Official ownership map (Engineering Platform v2.0)  
**Principle:** Source ownership mirrors **Product Architecture**, not Git branches

---

## Purpose

Define which product domain owns which code — today and after Engineering Platform v2.0.

> Homepage is a product, not a branch.  
> Admin is a product, not a branch.  
> Git only records the change: `feature/<roadmap-item>`.

---

## Layer Relationship

| Layer | Question |
|-------|----------|
| Product | What domain is this? |
| Source (this doc) | Which folders may change? |
| Roadmap | Which feature are we delivering? |
| Git | Which temporary branch holds the change? |

---

## Product Domains (Layer 1 — permanent)

```text
marketing   — Marketing Website
member      — Member Experience
admin       — Admin Platform
analyst     — Analyst Platform
content     — Content Platform
shared      — Truly cross-domain primitives only
```

---

## Target Source Layout (Layer 3 — Engineering Platform v2.0)

Next.js keeps a thin routing layer under `src/app/**`.  
Domain code moves toward product-owned trees:

```text
src/
├── app/                 # Routes only (thin pages/layouts)
├── marketing/           # Homepage, pricing, login, payment-activation UI
├── member/              # Free/VIP dashboards, member profile UI
├── admin/               # Admin shell, ops modules, admin-only UI
├── analyst/             # Analyst platform (when activated)
├── content/             # Content platform (when activated)
├── shared/              # Cross-domain primitives (rare)
└── lib/                 # Shared non-UI utilities (carefully owned)
```

**Note:** Exact final nesting (e.g. `admin/components` vs flat `admin/`) is finalized during Platform v2.0 execution. Ownership boundaries matter more than perfect aesthetics.

---

## Current → Domain Ownership Map (Transitional)

Until Layer 3 physical moves complete, treat these paths as owned by the domain on the right.

### Marketing

| Current paths | Domain |
|---------------|--------|
| `src/app/page.tsx` | marketing |
| `src/app/pricing/**` | marketing |
| `src/app/login/**` | marketing |
| `src/app/payment-activation/**` | marketing |
| `src/components/home/**` | marketing |
| `src/components/pricing/**` | marketing |
| `src/components/login/**` | marketing |
| `src/components/payment-activation/**` | marketing |

### Member

| Current paths | Domain |
|---------------|--------|
| `src/app/dashboard/**` | member |
| `src/components/dashboard/**` | member |
| `src/lib/membership/**` | member (shared membership concepts — do not import into Admin UI) |

### Admin

| Current paths | Domain |
|---------------|--------|
| `src/app/admin/**` | admin |
| `src/components/admin/**` | admin |
| `src/components/members/**` | admin (Member Domain sections) |
| `src/lib/admin/**` | admin |
| `src/lib/members/**` | admin |
| `src/types/admin/**` | admin |
| `src/types/members/**` | admin |

### Analyst / Content

| Current paths | Domain |
|---------------|--------|
| Homepage analyst/research *marketing sections* | marketing (narrative only) |
| Future `src/analyst/**` | analyst |
| Future `src/content/**` | content |

### Shared / root

| Current paths | Rules |
|---------------|--------|
| `src/app/layout.tsx`, `src/app/globals.css` | Cross-cutting — change only with explicit approval |
| `src/shared/**` (future) | Only true cross-domain primitives |
| `public/**` | Asset ownership follows the calling domain |

---

## Isolation Rules (Non-Negotiable)

1. **Marketing UI ↛ Admin UI** — never import across these products  
2. **Admin UI ↛ Marketing UI** — never import across these products  
3. **Member UI** does not import Admin components  
4. **Admin** may read membership *data shapes* for ops — not marketing presentation components  
5. **Shared** is a privilege, not a convenience dump  
6. If a file has no clear owner, stop and assign ownership before coding

---

## Feature → Ownership Examples

| Roadmap item | Branch | May touch |
|--------------|--------|-----------|
| Admin Discord | `feature/admin-discord` | `admin` paths only |
| Homepage hero polish | `feature/homepage-hero` | `marketing` paths only |
| VIP dashboard upgrade | `feature/member-vip-dashboard` | `member` paths only |
| Analyst directory v1 | `feature/analyst-directory` | `analyst` (+ thin `app` routes) |
| Content learning v1 | `feature/content-learning` | `content` (+ thin `app` routes) |

---

## AI Rule

Before editing any file, state:

1. Roadmap item  
2. Owning domain  
3. Allowed path prefixes  

If the change needs two domains, split into two features or get explicit approval.

---

## Related References

| Document | Role |
|----------|------|
| `PROJECT_ARCHITECTURE.md` | Domain definitions |
| `PROJECT_ROADMAP.md` | What to build |
| `ENGINEERING_PLATFORM_V2.md` | Full five-layer migration |
| `docs/AI/Agents/Admin/06_Application_Isolation_and_Folder_Architecture.md` | Deep Admin isolation contract |

---

*TraderCity Project Governance — Module Ownership v1.0*
