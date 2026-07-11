# TraderCity Admin Dashboard

## Chapter 03 — Module Specifications

**Document Version:** 1.0  
**Status:** Living Specification

> This chapter defines each module's responsibility, layout, fields, and interaction contracts. Future modules must extend this pattern — not introduce new interaction models.

**Design references:** [`assets/member-control-center-reference.png`](assets/member-control-center-reference.png), [`assets/subscription-management-reference.png`](assets/subscription-management-reference.png)

---

## Module Status Legend

| Status | Meaning |
|--------|---------|
| **Phase 1** | Build now — frontend UI with mock data |
| **Future** | Document only — do not implement without approval |

---

## Module 1: Members (Phase 1)

**Route:** `/admin/members`  
**Operational question:** Who are our members, and what is their high-level status?

### Responsibility

- Member list and search
- High-level membership overview columns
- Navigation entry point to Member Control Center
- Add/Edit member identity (UI shell — backend later)

### Does Not Own

- Payment verification workflow (Subscriptions)
- Discord role management (Discord)
- Referral calculations (Referrals)

### Page Layout

```text
Page Header
  ↓
Search + Filters
  ↓
Member Table
  ↓
Pagination
```

No details panel on the list page — row click or username opens **Member Control Center**.

### Table Columns

| Column | Notes |
|--------|-------|
| Name | Display name |
| Username | Discord username — links to Member Control Center |
| Category | Standard / VIP badge |
| Plan | Current plan label |
| Joined | Registration date |
| Expires | Membership expiry |
| Status | Active / Expired / Suspended / etc. |
| Days Left | Color-coded urgency (see below) |
| Renew Count | Number of renewals |
| Amount | Privacy-toggle masked revenue column |

### Days Left Color Rules

Align with VIP dashboard RenewalCentre:

| Condition | Color |
|-----------|-------|
| VIP (∞) | Gold / neutral |
| < 7 days | Red |
| < 30 days | Amber |
| Otherwise | Green |

### Filters

- Search (name, username, email)
- Status dropdown: Active, Expired, Suspended, Left, VIP, Hidden, New Joiners
- Date range
- Clear filters

### Toolbar Actions

- Add User
- Export CSV
- Refresh
- Revenue visibility toggle

### Modals

- **Add/Edit Member** — identity + subscription fields; VIP override ($0, Lifetime, ∞ days)
- **Delete Confirmation** — destructive guard

---

## Module 2: Member Control Center (Phase 1)

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
| Overview | Phase 1 | Aggregated cards (default) |
| Subscription | Phase 1 | Extended subscription view |
| Discord | Future | Extended Discord view |
| Referral | Future | Extended referral view |
| Notes | Phase 1 | Internal notes (also on Overview) |
| Activity | Phase 1 | Full activity timeline |

### Header

**Identity**

- Discord Avatar
- Discord Username (+ VIP badge when applicable)
- Registered Email
- Discord username with external link

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

## Module 3: Subscriptions (Phase 1)

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
| Status | Successful, Pending Verification, Verification Required |
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

## Future Modules (Document Only)

Do not implement without explicit approval.

### Discord

```text
Discord Table → Discord Details → Open Member Profile
```

Owns: role sync, connection status, community access, role history.

### Referrals

```text
Referral Table → Referral Details → Open Member Profile
```

Owns: referral progress, credits, redemption workflow.

### Reports / Learning / Community / Media Library

Content modules follow table → details pattern without Member Profile as primary hub (unless member-linked).

### Notifications / Audit Logs / Settings

System modules follow same UI consistency rules but may omit statistics widgets where not applicable.

---

## Cross-Module Navigation Map

| From | Action | To |
|------|--------|-----|
| Subscriptions table | Click Discord username | Member Control Center |
| Subscriptions details | Open Member Profile | Member Control Center |
| Subscriptions details | View on Blockchain Explorer | External |
| Member Control Center | Manage Subscription | Subscriptions (filtered) |
| Member Control Center | Manage Discord | Discord module (future) |
| Member Control Center | Manage Referral | Referral module (future) |
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
