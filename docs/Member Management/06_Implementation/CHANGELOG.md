# Changelog — Member Management Documentation Package

**Authority:** `docs/Member Management/06_Implementation/`

---

## 2026-07-29

### Membership Activation Sources + Referral Redeem Requests

- Added canonical [`../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md`](../02_Product_Architecture/MEMBERSHIP_ACTIVATION_SOURCES.md) — Crypto · Manual · Referral Redeem · Admin / Future grants converge into one Membership lifecycle.
- Renamed **Referral Redemption Requests** → **Referral Redeem Requests** (Dashboard, queues, docs).
- Referral Progress filter: **Referral Redeem Requests** (`progress=redeem_requests`) → Waiting Admin Approval only.
- Row actions: **Approve Redeem** / **Reject Redeem** (mock stubs → Membership lifecycle).
- User Profile Subscription card: **Activation Source** with source-specific fields.
- Updated Data Flow, Domain Model, Ecosystem, Control Center, Referrals, Admin workflow, Lifecycle, Agent specs.

### Subscription payment approval lifecycle (product decision)

- **Locked policy:** Automatic verification must **not** activate Membership. Verified payments enter **Awaiting Admin Approval**; Admin Approve is the mandatory activation gateway (Phase 1).
- Added canonical doc: [`../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md`](../02_Product_Architecture/SUBSCRIPTION_PAYMENT_APPROVAL_LIFECYCLE.md)
- Updated Member Management Subscription / Dashboard / Data Flow / Domain / Lifecycle / Admin / API / Events docs
- Aligned Admin Agent `01`–`05`, `07`, `08`; Cross-Module SoT; Ecosystem lifecycle; Phase-Roadmap Phase 4
- Updated frontend verification capability comments/types mapping (`src/lib/membership/verification/`)

---

## 2026-07-28

### Documentation package created

- Created self-contained `docs/Member Management/` mirroring `docs/Analyst/` organization.
- Consolidated vision, architecture, frontend, admin workflows, backend expectations, and implementation status from codebase + legacy Admin docs.
- **No source code changes. No existing documentation modified or deleted** (at package creation time).

Sources consulted (read-only at creation):

- `src/components/members/**`, `src/lib/members/**`, `src/types/members/**`, `src/app/admin/**` (Members section)
- `docs/AI/Agents/Admin/**`
- `docs/Development/Admin/**`
- `docs/04_Product_Architecture/CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md`
- `docs/04_Product_Architecture/MEMBER_DASHBOARD_AND_AUTH_INTEGRATION_ARCHITECTURE.md`
- `docs/00_Project_Governance/*` (vocabulary, ownership, roadmap)
