# TraderCity — Member Dashboard & Auth Integration Architecture

**Document Version:** 1.0  
**Status:** Official Frontend → Backend Integration Contract (expectations only)  
**Authority:** Product Architecture Layer (`docs/04_Product_Architecture/`)  
**Audience:** Backend engineers · Frontend engineers · AI agents  
**Related audit:** [`docs/Development/TraderCity_Frontend_Engineering_Audit.md`](../Development/TraderCity_Frontend_Engineering_Audit.md)

---

## Document Role

This document fills the largest documentation gap identified in the Frontend Engineering Audit:

- Login / Auth / Session
- Free Member Dashboard
- VIP Member Dashboard
- Member-facing upgrade journey (into Payment Activation)

It does **not** implement backend code. It does **not** invent competing ownership rules.

| This document owns | Defers to |
|--------------------|-----------|
| Member UI purpose, flows, expected APIs | Cross-Module Sync (Membership / Subscription / Discord / Referral ownership) |
| Auth/session expectations for FE routes | Admin Ecosystem lifecycle (full user journey) |
| Free vs VIP dashboard projections | Admin `08` (Payment Quote / verification) |
| Redirect / gate rules | Referral System Architecture (ledger / rewards) |

**Rule:** Frontend may ship on mocks. Backend must implement behavioral contracts before production member sessions go live. Suggested endpoint paths are **recommendations** — NestJS may refine naming while preserving shapes and ownership.

---

## 1. Purpose

Member surfaces answer:

> What can **this logged-in user** see and do right now?

Admin surfaces answer:

> What does an **operator** need to fix across many users?

This document covers the **member** side only (plus Auth, which gates both member and future Admin RBAC).

---

## 2. Implemented Routes (current)

| Route | Component root | Maturity |
|-------|----------------|----------|
| `/login` | `src/components/login/` | Partial — fake Google redirect; Discord CTA inert |
| `/dashboard/free` | `src/components/dashboard/free/` | Complete UI on inline mocks |
| `/dashboard/vip` | `src/components/dashboard/vip/` | Complete UI on inline mocks |
| `/payment-activation` | `src/components/payment-activation/` | Partial — hardcoded payment/verify UX |
| `/pricing` | `src/components/pricing/` | Complete UI; quote handoff incomplete |

**Auth reality today:** No auth library, no middleware, no session cookies. Dashboards are publicly reachable.

---

## 3. Auth & Session Architecture (expected)

### 3.1 Goals

1. Register / login via Google and Discord (product intent).
2. Establish a secure member session.
3. Route users by **intent** and **Membership state**.
4. Later: Admin auth + RBAC (separate guard on `/admin/**`).

### 3.2 Expected APIs

| Capability | Suggested contract | Notes |
|------------|-------------------|--------|
| Start OAuth | `GET /auth/{provider}/start` | `provider`: `google` \| `discord` |
| OAuth callback | `GET /auth/{provider}/callback` | Creates/links User + Identity |
| Current user | `GET /me` | Identity + Membership summary + flags |
| Logout | `POST /auth/logout` | Invalidate session |
| Refresh | `POST /auth/refresh` | If using refresh tokens |

### 3.3 Entities

| Entity | Responsibility |
|--------|----------------|
| `User` | Canonical account id |
| `IdentityLink` | Provider subject ↔ User |
| `Session` | Server session or JWT pair |
| `Membership` | Access SoT (Cross-Module) — **not** owned by Auth |

### 3.4 Post-login redirect rules

| Condition | Redirect |
|-----------|----------|
| Intent `plan=free` or no VIP Membership | `/dashboard/free` |
| Active VIP Membership | `/dashboard/vip` |
| Intent VIP / unpaid quote / pending payment | `/payment-activation` (or pricing → quote → activation) |
| Admin staff (future) | `/admin` after Admin auth |

**Today’s bug/debt:** Login Google always goes to `/dashboard/free` regardless of VIP intent.

### 3.5 Permissions

| Surface | Required auth |
|---------|---------------|
| `/`, `/pricing` | Public |
| `/login` | Public |
| `/dashboard/free`, `/dashboard/vip` | Member session |
| `/payment-activation` | Member session |
| `/admin/**` | Admin session (future; currently ungated) |

### 3.6 Loading / error states

| State | UX |
|-------|-----|
| OAuth in progress | Provider redirect spinner |
| OAuth cancelled | Return to `/login` with message |
| Account link conflict | Support / choose account |
| Session expired | Re-auth; preserve return URL |
| Provider outage | Error banner; retry |

### 3.7 Events

- `UserRegistered`
- `UserLoggedIn`
- `DiscordIdentityLinked`
- `SessionRevoked`

---

## 4. Membership Gates (member app)

Membership is the **backend domain** SoT (not an Admin page). Member dashboards **read** it.

| Membership state | Free Dashboard | VIP Dashboard | Payment Activation |
|------------------|----------------|---------------|--------------------|
| None / Free | Primary home | Redirect away | Allowed (upgrade) |
| Pending payment (ticket open) | Show pending CTA | Usually redirect | Primary |
| Active VIP | Redirect to VIP | Primary home | Renewal flows later |
| Expired | Home + renew CTA | Redirect to Free or renew | Reactivation |

Exact redirect policy should be centralized in backend `GET /me` (`recommendedHome` field) so frontend does not invent gates.

---

## 5. Free Dashboard `/dashboard/free`

### 5.1 Purpose

Home for Free members: show status, Discord/referral teasers, and upgrade path.

### 5.2 Business goal

Retain Free users and convert them to VIP without overwhelming them.

### 5.3 User flow

1. Land after login (Free).
2. See membership status (Free).
3. Optionally connect Discord / view referral teaser.
4. CTA → Pricing / Payment Activation for VIP.

### 5.4 Expected API — `GET /me/dashboard` (free projection)

Suggested response fields (align with current mock concepts):

| Field group | Examples |
|-------------|----------|
| Identity | display name, email, avatar |
| Membership | tier=`free`, status |
| Discord | connected?, role reflection |
| Referral | code?, progress teaser, eligible? |
| Credits | welcome credit if any |
| CTAs | upgrade URL, connect Discord URL |

### 5.5 Auth / permissions

Member session; reject or redirect if Active VIP (prefer VIP dashboard).

### 5.6 Events / websocket

None required for v1 — poll or refetch on focus. Optional: Discord link completion event.

### 5.7 Loading / error

| State | UX |
|-------|-----|
| Loading | Skeleton matching Free layout |
| 401 | `/login?return=/dashboard/free` |
| 403 wrong tier | Follow `recommendedHome` |
| Partial Discord failure | Show disconnected + retry |

---

## 6. VIP Dashboard `/dashboard/vip`

### 6.1 Purpose

Home for VIP members: membership window, access summary, referral progress, credits.

### 6.2 Business goal

Deliver paid value clarity and drive referral growth.

### 6.3 User flow

1. Land after login (Active Membership).
2. View plan, expiry, days remaining (Membership projection).
3. View Discord VIP reflection (not editable here).
4. View referral progress / credits (Referral projection).
5. Renew / manage billing CTA → Payment / Subscription flows.

### 6.4 Expected API — `GET /me/dashboard` (vip projection)

| Field group | Source domain |
|-------------|---------------|
| Plan, status, activation, expiry, days remaining | **Membership** |
| Latest payment summary (optional) | **Subscription** (read) |
| Discord role / connection | **Discord** (read) |
| Referral progress, credits, redeem eligibility | **Referral** (read) |
| Credit ledger snapshot | **Referral** ledger projection |

### 6.5 Auth / permissions

Member session + Active Membership (or grace policy defined by backend).

### 6.6 Events / websocket

Prefer refetch on: Membership renewed/expired, credit granted, Discord sync completed. Optional WS channel `user:{id}`.

### 6.7 Loading / error

| State | UX |
|-------|-----|
| Loading | VIP skeleton |
| Membership expired mid-session | Banner + redirect Free / renew |
| Credit ledger lag | Stale indicator; retry |

---

## 7. Upgrade Journey (member)

```text
Free Dashboard / Pricing
        ↓
Authenticated
        ↓
POST /payments/quotes  (Payment Quote frozen)
        ↓
/payment-activation
        ↓
Submit proof / tx
        ↓
Verification engine (Admin 08 outcomes)
        ↓
Membership Activated (Membership domain writer)
        ↓
Discord VIP Sync requested
        ↓
/dashboard/vip
```

**Do not** re-price at verification time against list prices — verify against the **Payment Quote** (Admin `08`).

---

## 8. Member-Facing Referral & Discord (embedded)

Member dashboards embed **projections**, not Admin management UIs.

| Concern | Member can | Member cannot |
|---------|------------|---------------|
| Referral | View code/link, progress, credits | Approve redeems / override ledger |
| Discord | Start connect / see status | Force Admin Sync Now |
| Subscription | See pending/active summary | Approve payments |

Canonical Referral economics: [`REFERRAL_SYSTEM_ARCHITECTURE.md`](./REFERRAL_SYSTEM_ARCHITECTURE.md).  
Canonical ownership: [`CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md`](./CROSS_MODULE_DATA_SYNCHRONIZATION_ARCHITECTURE.md).

---

## 9. Learning Access & Research Archive

**Status:** Product PRD mentions exist; **no dedicated member routes/modules** documented as implemented in the current `src/app` tree.

When built, they must:

1. Gate on Membership entitlements (not a second VIP flag).
2. Document APIs in a future Product Architecture module doc.
3. Appear as read projections on VIP Dashboard only if product requires summaries.

---

## 10. Database Entities (expected minimum)

| Entity | Used by member app |
|--------|--------------------|
| User / IdentityLink / Session | Auth |
| Membership | Free/VIP gates + VIP dashboard |
| PaymentQuote / PaymentTicket | Upgrade / activation |
| DiscordConnection / DiscordRoleState | Status cards |
| ReferralCode / ReferralCreditLedger | Referral widgets |
| (Future) Entitlement / ContentAccess | Learning / Research |

---

## 11. Websockets / Jobs (expected)

| Mechanism | Use |
|-----------|-----|
| Verification poll or WS | Payment Activation terminal states |
| BullMQ (assumed platform) | Membership activation side effects; Discord sync; Referral qualify |
| Optional user channel | Dashboard live refresh |

Frontend must tolerate **eventual consistency** between Membership write and Discord role update.

---

## 12. Backend Readiness Checklist

| Item | Ready to design? |
|------|------------------|
| `GET /me` + redirects | Yes |
| OAuth Google/Discord | Yes (expectations); provider secrets ops TBD |
| Free/VIP dashboard DTOs | Yes (from UI mocks + this doc) |
| Payment Quote + verify | Yes (`08`) |
| Membership writer on success | Yes (Cross-Module) |
| Admin RBAC | Spec needed when Admin auth ships |
| OpenAPI published | Not yet |

---

## 13. Non-Goals

- Implementing NestJS modules in this document
- Redesigning Free/VIP UI
- Creating member-facing Admin pages
- Replacing Referral or Cross-Module ownership rules
- Defining Learning/Research in depth before those modules exist

---

## 14. Authority Reminder

If this document conflicts with Cross-Module Sync or Referral Architecture on **who owns a field**, those documents win.

This document wins on **member route purpose, gates, and expected member API projections**.
