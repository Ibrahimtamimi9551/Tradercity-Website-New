# TraderCity Admin Dashboard

## Chapter 03 — Module Specifications

**Document Version:** 2.1  
**Status:** Living Specification

> Authoritative vision and scope: [`07_Vision_Before_Implementation.md`](07_Vision_Before_Implementation.md). Master report: [`05_Operations_Center_Vision_Report.md`](05_Operations_Center_Vision_Report.md). **Current build = Member Management Phases 0–6.**

**Design references:** [`assets/member-control-center-reference.png`](assets/member-control-center-reference.png), [`assets/subscription-management-reference.png`](assets/subscription-management-reference.png)

---

## Module Status Legend

| Status | Build Phase |
|--------|-------------|
| **Phase 1** | Dashboard — Operations Center |
| **Phase 2–4** | Members, User Profile, Subscriptions |
| **Phase 5–6** | Discord, Referrals |
| **Deferred** | Reports, Settings, Notifications (Phases 7–9 — not Member Management) |

---

## Deep-Link Query Contracts

| Parameter | Values | Module |
|-----------|--------|--------|
| `?status=` | `pending_verification`, `verification_required`, `successful` | Subscriptions |
| `?sync=` | `failed`, `pending`, `synced` | Discord |
| `?health=` | `healthy`, `needs_attention`, `action_required` | Members |
| `?referral=` | `pending_approval`, `eligible` | Referrals |
| `?memberId=` | UUID | Cross-module pre-selection |

---

## Module 0: Dashboard (Phase 1)

**Route:** `/admin`  
**Operational question:** *"What requires my attention right now?"*

### Responsibility

- Platform health monitoring
- **Operations Queue** (Needs Attention inbox)
- Workload widgets with Action Driven Navigation
- Recent Activity feed
- Quick Actions (Add Member, Manual Verification, Export — UI stubs OK)
- Platform Health status bar
- No detailed management — routing only

### Page section order

```text
Header → Operational Widgets → Operations Queue → Recent Activity → Quick Actions → Platform Health
```

Revenue Overview widget: **Super Admin only** (locked/hidden for other roles).

### Does Not Own

- Any business logic or member/subscription actions

### Widgets

| Widget | Deep-Link |
|--------|-----------|
| Total Members | `/admin/members` |
| VIP Members | `/admin/members?membership=vip` |
| Pending Verification | `/admin/subscriptions?status=pending_verification` |
| Discord Issues | `/admin/discord?sync=failed` |
| Referral Requests | `/admin/referrals?referral=pending_approval` |
| Membership Expiring Today | `/admin/members?expiry=today` |
| **Total Actions** | Operations Queue expanded |

### Operations Queue Example

```text
Needs Attention (7)
• 3 Pending Subscription Verifications  → /admin/subscriptions?status=pending_verification
• 1 Discord Sync Failure                → /admin/discord?sync=failed
• 2 Referral Redemption Requests        → /admin/referrals?referral=pending_approval
• 1 Membership Expired Today            → /admin/members?expiry=today
```

---

## Module 1: Members (Phase 2)

**Route:** `/admin/members`  
**Operational question:** *"Which users exist — and who needs attention?"*

Members is **directory and search** — not the primary work queue. Work starts at Dashboard widgets or domain modules.

### Responsibility

- Member directory with cross-module summary columns
- **System Health** for prioritization
- Search and filters
- Navigation to Member Control Center (username click)

### Does Not Own

- Payment verification (Subscriptions)
- Discord sync (Discord)
- Referral validation (Referrals)
- Ticket processing of any kind

### Page Layout

```text
Statistics Widgets
  ↓
Search + Filters
  ↓
Members Table
  ↓
Pagination
```

### Statistics Widgets

| Widget | Notes |
|--------|-------|
| Total Members | All registered |
| VIP Members | Active VIP count |
| Pending Verification | Links to Subscriptions module |
| Action Required | Filter: `?health=needs_attention` |
| New This Month | Joined in current month |

### Table Columns (Lightweight)

| Column | Notes |
|--------|-------|
| Discord Username | Avatar + username + email — links to Profile |
| Membership | Free / VIP badge |
| Subscription | Active / Pending Verification / Verification Required |
| Discord | Connected / Disconnected / Action Required |
| Referral Progress | e.g., 3/6 with progress bar; Eligible badge at 100% |
| Joined Date | Timestamp |
| **System Health** | Healthy / Needs Attention / Action Required |
| Actions | Row menu |

### System Health Rules

Backend-computed in production. Frontend displays.

| State | Meaning |
|-------|---------|
| **Healthy** | All module states green |
| **Needs Attention** | One or more modules require review (e.g., pending verification) |
| **Action Required** | Critical issue (e.g., sync failed + verification required) |

### Filters

- Search: Discord username, email
- Membership: All, Free, VIP
- Subscription status: All, Active, Pending Verification, Verification Required
- Discord status: All, Connected, Disconnected, Action Required
- Referral status: All, In Progress, Eligible
- System Health: All, Healthy, Needs Attention, Action Required
- Reset filters

### Toolbar (Secondary)

- Export CSV
- Refresh

Add/Edit/Delete member identity — Phase 2+ edge case only; not primary workflow.

---

## Module 2: User Profile / Control Center (Phase 3)

**Route:** `/admin/members/[id]`  
**Operational question:** What is the complete current state of this member?

**Reference:** [`assets/member-control-center-reference.png`](assets/member-control-center-reference.png)

### Responsibility

- Aggregate latest state from all modules
- Display identity header and status widgets
- Host internal notes and activity timeline
- Redirect management actions to owning modules

### Does Not Own

- Subscription verification logic
- Discord synchronization
- Referral calculations
- Suspend / delete / activation controls

### Tab Navigation

| Tab | Phase | Purpose |
|-----|-------|---------|
| Overview | Phase 3 | Aggregated cards (default) |
| Subscription | Phase 3 | Extended subscription view |
| Discord | Phase 5 | Extended Discord view |
| Referral | Phase 6 | Extended referral view |
| Notes | Phase 3 | Internal notes (also on Overview) |
| Activity | Phase 3 | Full activity timeline |

### Header

**Identity**

- Discord Avatar (from Discord — no upload)
- Discord Username (+ VIP badge when applicable)
- Registered Email
- Discord username with external link

**Not included:** Full Name, profile photo upload, duplicate joined dates.

**Status Widgets**

| Widget | Example |
|--------|---------|
| Membership Status | VIP Active |
| Discord Status | Connected |
| Discord Role | VIP |
| Joined Date | Formatted datetime |

**Quick Actions**

- Edit Profile

### Overview Tab — Membership Activity Card

Summarize member lifecycle.

| Field | Example |
|-------|---------|
| Current Plan | VIP Monthly |
| Membership Status | Active |
| Plan Started On | Date |
| Expiry Date | Date |
| Days Remaining | 30 days (color-coded) |
| Renewal Count | 1 |
| VIP Activated Via | Auto Verification |
| Total Membership Duration | 1 Month |

**Actions:** View Activity Log → | **Manage Subscription →** (redirects to Subscriptions module, filtered to member)

### Overview Tab — Subscription Card

Reflect latest subscription/payment state.

| Field | Example |
|-------|---------|
| Plan | VIP Monthly |
| Status | Successful |
| Payment Date | Date |
| Expiry Date | Date |
| Days Remaining | 30 |
| Renewal Count | 1 |
| VIP Activated Via | Auto Verification |
| Transaction Hash | With copy + blockchain explorer |
| Payment Method | Crypto USDT - TRC20 |
| Amount Paid | $60.00 |

**Action:** **Manage Subscription →** (redirects to Subscriptions module)

### Overview Tab — Discord Card (UI shell in Phase 1)

Reflect Discord synchronization state.

| Field | Example |
|-------|---------|
| Discord Role | VIP |
| Connection Status | Active |
| Community Access | Full Access |
| Recent Role History | Mini timeline (last 3 changes) |

**Action:** **Manage Discord →** (future Discord module)

### Overview Tab — Referral Card (UI shell in Phase 1)

Reflect referral progress.

| Field | Example |
|-------|---------|
| Total Required Referrals | 6 |
| Completed Referrals | 3 |
| Pending Referrals | 2 |
| Credits Earned | $30.00 |
| Credit Per Referral | $10 |
| Redemption Status | Eligible |

Include progress bar (e.g., 3/6 completed, 50%).

**Action:** **Manage Referral →** (future Referral module)

### Internal Notes

Private notes visible only to administrators.

- List existing notes with author, timestamp, actions menu
- "+ Add Note" action
- Examples: "VIP activated manually", "Waiting for payment proof", "Special extension approved"

### Activity Timeline

Major operational events only — not analytics.

| Event | Icon semantics |
|-------|----------------|
| Account Registered | Account |
| Joined Discord | Discord |
| Payment Submitted | Payment |
| Payment Verified | Check |
| VIP Activated | Crown |
| Membership Renewed | Refresh |
| Membership Expired | Alert |
| Referral Redeemed | Gift |

Include "View All" link to Activity tab.

---

## Module 3: Subscriptions (Phase 4)

**Route:** `/admin/subscriptions`  
**Operational question:** What is the payment state, and what needs verification?

**Reference:** [`assets/subscription-management-reference.png`](assets/subscription-management-reference.png)

### Responsibility

The Subscription Module **owns**:

- Payment verification
- Subscription status
- Membership plan assignment (via backend)
- Activation workflow
- Renewal tracking
- Manual verification when auto-verification fails

### Does Not Own

- Discord roles
- Member identity (beyond display fields)
- Referral information

### Page Layout

```text
Page Header
  ↓
Statistics Widgets (3)
  ↓
Search
  ↓
Filters
  ↓
Subscription Table
  ↓
Subscription Details Panel
  ↓
Pagination
```

### Statistics Widgets

| Widget | Filters Table To | Theme |
|--------|------------------|-------|
| Successful | Successful payments | Green |
| Pending Verification | Pending Verification | Amber |
| Verification Required | Verification Required | Red |
| Rejected | Admin rejected | Rose/Grey |

**No Expired state** — expiration belongs to Membership lifecycle, not Subscriptions.

Each widget includes count, optional trend, and "View all" action.

### Search

Supports:

- Discord Username
- Transaction Hash
- Wallet Address

Matches member payment submission fields (`PaymentSection`).

### Filters

| Filter | Options |
|--------|---------|
| Status | Successful, Pending Verification, Verification Required, Rejected |
| Plan | Monthly, Quarterly, Yearly, Lifetime, Custom |
| Payment Method | Crypto USDT, Stripe, etc. |
| Date Range | Start — End |

### Subscription Table Columns

| Column | Notes |
|--------|-------|
| Date & Time | Payment submission timestamp |
| Discord Username | Avatar + username — links to Member Control Center |
| Subscription Plan | Plan label + price |
| Amount Paid | USDT or fiat |
| Transaction Hash | Copy + external link icons |
| Status | Badge |
| Actions | Context-aware (View, Approve, Resolve Dispute) |

**Row click** opens Subscription Details panel.

### Subscription Status (Operational Only)

Only three operational states in this module:

| Status | Meaning |
|--------|---------|
| Successful | Payment verified and membership activated |
| Pending Verification | Submitted, awaiting automatic verification |
| Verification Required | Auto verification failed — admin action needed |

Do **not** include "Expired" here. Expiry belongs to membership lifecycle.

### Subscription Details Panel

**Identity Header**

- Discord avatar + username
- "View Member Profile" link → Member Control Center

**Subscription Information**

| Field | Notes |
|-------|-------|
| Subscription Plan | Badge + price |
| Amount Paid | Currency + network |
| Payment Date | Timestamp |
| Transaction Hash | Copy + link |
| Wallet Address | Copy + link |
| Payment Method | Crypto (USDT - TRC20) / Stripe |
| Verification Method | Auto Verification / Manual |
| Current Status | Badge |

**Timeline**

```text
Payment Submitted
  ↓
Auto Verification Started
  ↓
Verification Result
  ↓
VIP Activated
```

**Footer Actions**

- Open Member Profile
- View on Blockchain Explorer

### Payment Verification Workflow

**Happy path:**

```text
User submits payment
  ↓
Automatic Verification
  ↓
Successful
  ↓
Activate Membership
  ↓
Assign Discord VIP Role (backend)
  ↓
Update Member Profile
```

**Manual path:**

```text
Verification Required
  ↓
Admin Manual Verification
  ↓
Approve → VIP Activated
  OR
Reject → Request Additional Proof
```

Approve requires confirmation modal before irreversible action.

Reject includes reason field (UI shell + TODO if backend not ready).

---

## Module 4: Discord (Phase 5)

**Route:** `/admin/discord`  
**Operational question:** *"Is Discord synchronized with TraderCity?"*

### Principle

Backend decides. Discord executes. TraderCity Database is source of truth.

```text
Payment Successful → Backend updates DB → Discord Bot → VIP Role → Dashboard reflects
```

### Responsibility

- Discord synchronization monitoring and resolution
- Sync ticket processing (Sync Now, Send Invite)
- Role and connection state display

### Does Not Own

- Subscription logic
- Member identity (beyond display)

### Widgets

| Widget | Deep-Link |
|--------|-----------|
| Connected Members | Table filter: connected |
| VIP Members | Table filter: role=vip |
| Sync Issues | `?sync=failed` |
| Pending Invites | `?sync=pending` |

### Table Columns

| Column | Notes |
|--------|-------|
| Discord Username | Avatar + ID |
| Discord Role | VIP / Public / etc. |
| Connection Status | Connected / Left Server / Suspended |
| Sync Status | Synced / Sync Failed / Not Synced |
| Joined Discord | Date |
| Last Sync | Date |
| Actions | View, Sync Now, More |

### Details Panel

- Current Role, Connection State, Role History
- Synchronization status (last sync, auto sync enabled)
- Linked Membership (plan, status, expiry) + Open in Membership →
- Actions: View Member Profile, Sync Now, Send Invite
- Footer note: *"Discord is the communication platform. TraderCity is the source of truth."*

---

## Module 5: Referrals (Phase 6)

**Route:** `/admin/referrals`  
**Operational question:** *"What referral progress exists — and what needs validation?"*

### Business Rules

- $10 credit per successful referral
- 6 successful referrals required for redemption
- Member requests redemption → administrator validates → membership extended on approval

### Responsibility

- Referral validation and redemption approval
- Referral history and settings
- Ticket processing for redemption requests

### Does Not Own

- Referral marketing (website concern)
- Profile display (reflection only in member-profile module)

### Profile Reflects

- Progress (e.g., 3/6)
- Eligibility status
- Credits earned

---

## Deferred Modules (Phases 7–9)

**Not in scope for Member Management.** Do not build routes, sidebar links, or components during Phases 0–6.

### Phase 7 — Reports, Community, Media Library

**Future home:** Website Content Management  
Educational content, community management, media library.

### Phase 8 — Settings

**Future home:** Configuration area (TBD)  
Platform configuration: payment wallet, blockchain, membership plans, pricing, discounts, referral config, Discord config, email templates.

### Phase 9 — Notifications, Audit Logs

**Future home:** Analysts or system-wide ops (TBD)  
System notifications and audit trail.

---

## Cross-Module Navigation Map

| From | Action | To |
|------|--------|-----|
| Subscriptions table | Click Discord username | Member Control Center |
| Subscriptions details | Open Member Profile | Member Control Center |
| Subscriptions details | View on Blockchain Explorer | External |
| Member Control Center | Manage Subscription | Subscriptions (filtered) |
| Member Control Center | Manage Discord | Discord module |
| Member Control Center | Manage Referral | Referral module |
| Members table | Click row / username | Member Control Center |

All cross-module links are UI navigation in Phase 1 — mark backend sync TODOs where state must refresh.

---

## Member Journey Alignment

Admin fields must mirror member-facing flows:

| Member Step | Member File | Admin Mirror |
|-------------|-------------|--------------|
| Submit payment | `PaymentSection` | Subscriptions table columns |
| Await verification | `VerificationSection` | Pending Verification widget |
| Approve | — | Approve modal → Successful |
| Access granted | `ResultSection` → VIP dashboard | Member Control Center: Active, plan, days remaining |
| Issue | `ResultSection` issue state | Verification Required + reject UI |

Study before building:

- `src/components/payment-activation/sections/PaymentSection.tsx`
- `src/components/payment-activation/sections/VerificationSection.tsx`
- `src/components/payment-activation/sections/ResultSection.tsx`
- `src/components/dashboard/vip/VipDashboardContent.tsx`
- `src/components/dashboard/free/FreeDashboardContent.tsx`
- `src/components/pricing/PricingContent.tsx`
