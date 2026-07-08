# Interface Features

A flat inventory of every interface feature and action across the Arena admin product, organized by category.

---

## Navigation Features

| Feature | Description | Location |
|---------|-------------|----------|
| Sidebar navigation | 5 primary links with icons and labels | Global sidebar |
| Sidebar collapse | Toggle between full and icon-only mode | Desktop sidebar |
| Mobile drawer | Hamburger opens overlay navigation | Mobile (< 768px) |
| Active section label | Current page name shown beneath logo | Sidebar header |
| Logo link to marketing site | Logo click navigates to public homepage | Sidebar top |
| Top navbar title | "Arena Admin Dashboard" branding | Top navbar |
| Theme toggle | Light/dark mode switch | Top navbar |
| Avatar dropdown | Shows email + Log out | Top navbar |
| Marketing site admin link | "Dashboard" link instead of "My Profile" | Public navbar |
| Login redirect | Successful login redirects to Dashboard | Login page |

---

## Dashboard Features

| Feature | Description |
|---------|-------------|
| Total Users metric | Count of all members |
| Active Users metric | Count of active subscriptions |
| Expiring Soon metric | Count of near-expiry subscriptions |
| Expired Users metric | Count of lapsed subscriptions |
| Total Revenue metric | All-time revenue total |
| Trend badges | Directional change indicators on metric cards |
| User Growth chart | 12-month area chart (Total vs Active) |
| Revenue chart | 12-month bar chart |
| User Distribution pie | Active / Expired / Expiring Soon breakdown |
| Recent Activity feed | Up to 5 latest member events |
| Performance Metrics bars | Active/Expired/Expiring percentages |
| User Satisfaction gauge | Static 92.3% display |
| Refresh action | Reload all dashboard data |
| Error retry | Re-attempt on load failure |

---

## Member Management Features

| Feature | Description |
|---------|-------------|
| Member table (10 columns) | Name, Username, Category, Plan, Joined, Expires, Status, Days Left, Renew, Amount |
| Username search | Debounced text filter |
| Status filter (8 options) | All, Active, Expired, Suspended, Left, VIP, Hidden, New Joiners |
| Date range filter | From/To date pickers |
| Clear filters | Reset all active filters |
| Pagination | 100 records per page with numbered navigation |
| Add User | Create new member via modal form |
| Edit User | Update member via pre-filled modal |
| Delete User | Remove member with confirmation |
| Hide Member | Toggle visibility without deletion |
| Unhide Member | Restore hidden member |
| Export CSV | Download member data as CSV |
| Refresh data | Reload member list |
| Revenue cards (3) | Total Revenue, This Month, Last 7 Days |
| Revenue privacy toggle | Mask/unmask dollar amounts |
| VIP tier management | Auto-configured Lifetime plan with overrides |
| Custom plan support | Admin-defined expiry date |
| Renewal count tracking | Numeric field in table and form |
| Manual payment entry | Payment amount field in Add/Edit modal |
| Plan-driven payment auto-fill | Amount auto-populates from selected plan |
| Status badges | Color-coded Active/Expired/Suspended/Hidden |
| Days Left color coding | Red (<7), Amber (<30), Green (30+) |
| Category badges | VIP violet badge vs Standard text |
| Row overflow menu | Edit, Hide/Unhide, Delete actions |
| Form validation | Required field checking with error banner |

---

## Payment Features

| Feature | Description |
|---------|-------------|
| Payment stat cards (4) | Total, Awaiting Approval, Completed, Failed |
| Transaction table (8 columns) | Date, Merchant, Plan, Amount, Transaction, Status, Action |
| Multi-field search | Telegram, transaction hash, wallet address |
| Status pill filters (5) | All, PENDING, VERIFIED, SUCCESS, FAILED |
| Approve payment | Mark payment as successful with confirmation |
| Copy transaction hash | Clipboard copy with toast |
| Refresh payment list | Reload transaction data |
| Approve confirmation modal | "Approve Payment?" with email notification note |
| Status badges (5 types) | Pending, Admin Verify Pending, Completed, Failed, Rejected |
| Network badge | MAINNET indicator on merchant column |
| On-chain verified label | Sublabel on amount column |
| Wallet address display | Truncated from → to addresses |
| Completed row label | Static "VERIFIED" text replaces action button |

---

## Security Features

| Feature | Description |
|---------|-------------|
| Telegram link display | Read-only URL field with description |
| Telegram link edit | Inline edit with Modify/Cancel/Update |
| Wallet address display | Read-only wallet field with description |
| Wallet address edit | Inline edit with Modify/Cancel/Update |
| Single-card edit constraint | Only one card editable at a time |
| Active edit highlight | Ring border on card being edited |

---

## Admin Profile Features

| Feature | Description |
|---------|-------------|
| Profile overview card | Avatar, name, role badge, contact info |
| Personal information card | Full name, email, phone, location, department, bio |
| Account statistics card | Total Users Managed, Actions This Month, System Uptime |
| Edit profile mode | Inline field editing |
| Avatar upload | Camera overlay on avatar during edit |
| Save/Cancel actions | Commit or revert profile changes |
| Last login display | Timestamp of most recent login |
| Join date display | Administrator account creation date |
| Department badge | Administrator department label |
| Error state | Go to Login / Retry options |

---

## Sidebar Widget Features

| Feature | Description |
|---------|-------------|
| Last 7 Days revenue | Dollar amount display |
| Last 30 Days revenue | Dollar amount display |
| All Time revenue | Dollar amount display (emphasized) |
| Revenue show/hide toggle | Eye icon masks amounts |
| Export Report | Downloads revenue export file |
| Collapsed mode icons | Icon-only toggle and export when sidebar collapsed |

---

## Global UI Features

| Feature | Description |
|---------|-------------|
| Toast notifications | Success/error feedback after actions |
| Dark/light theme | Full theme support |
| Responsive layout | Desktop sidebar + mobile drawer |
| Loading spinners | Shown during data fetch and form submission |
| Glass/blur card styling | Semi-transparent card backgrounds |
| Gradient hero banners | Page header visual treatment |

---

## Features NOT Implemented

| Feature | Expected In | Arena Status |
|---------|------------|--------------|
| Reject/decline payment | Payment Verification | Badge exists, no action |
| Bulk approve payments | Payment Verification | Not available |
| Bulk member actions | Members | Not available |
| User detail page/drawer | Members | Modal only |
| Per-user payment history | Members | Amount column only |
| Payment detail view | Payment Verification | Not available |
| Member ↔ payment linking | Cross-module | Not available |
| Referral management | Admin | Not available |
| Discord management | Admin | Not available |
| Notification center | Admin | Toast only |
| Dedicated reports page | Admin | Export buttons only |
| Education CMS | Admin | Static member content |
| Audit log | Admin | Activity feed only |
| Support/ticket system | Admin | Not available |
| General settings hub | Admin | 2 fields on Security page |
| Dedicated analytics page | Admin | Embedded in Dashboard |
| Email column in admin | Members | Not in table |
| Empty state for zero results | Tables | Not shown |
| Configurable page size | Members | Fixed at 100 |
| Date filter on payments | Payment Verification | Not available |
| Role/permission management | Admin | Not available |
| KPI card drill-down | Dashboard | Cards not clickable |

---

## Arena vs TraderCity PRD Coverage Matrix

| TraderCity PRD Module | Arena Coverage | Gap |
|----------------------|---------------|-----|
| **Subscription management dashboard** | Partial — Members page covers CRUD | No dedicated subscription view, no renewal queue |
| **User management** | Yes — Members page | No detail view, no email, no referral info |
| **Payment management** | Partial — Payment Verification | No reject, no detail view, no member link |
| **Platform health KPIs** | Partial — Dashboard metrics | No churn, LTV, NPS, system health |
| **Abuse/fraud alerts** | Not implemented | Net-new for TraderCity |
| **System logs/filters** | Not implemented | Net-new for TraderCity |
| **User management quick actions** | Partial — row menu actions | No bulk actions, no quick-action bar |
| **Audit logs** | Not implemented | Activity feed is minimal substitute |
| **Segment analytics** | Not implemented | Net-new for TraderCity |
| **Referral/commission admin** | Not implemented | Net-new for TraderCity |
| **Education CMS** | Not implemented | Net-new for TraderCity |
| **Notification management** | Not implemented | Net-new for TraderCity |
| **Support/tickets** | Not implemented | Net-new for TraderCity |
| **Role/permission config** | Not implemented | Net-new for TraderCity |
| **Analyst management** | Not implemented | Net-new for TraderCity |
| **Content moderation** | Not implemented | Net-new for TraderCity |
| **Revenue export** | Yes — sidebar widget | Covered |
| **CSV member export** | Yes — Members page | Covered |
| **Platform settings** | Partial — 2 fields | Needs expansion |
| **Admin profile** | Yes — Admin Profile page | Covered |

**Summary:** Arena covers approximately **40%** of TraderCity PRD admin requirements. The strongest coverage is in member CRUD, payment approval, and basic analytics. The largest gaps are audit logs, referrals, education CMS, notifications, support, roles, and analyst management.

---

## TraderCity Knowledge Transfer

### Ideas to Definitely Reuse
- Complete feature set of Members page (CRUD, filters, export, hide, VIP)
- Payment Verification queue (approve, search, status filters, stat cards)
- Dashboard KPI grid with charts
- Security inline-edit pattern for configuration
- Sidebar revenue widget with export
- CSV export capability

### Ideas to Simplify
- Remove static/demo features (satisfaction gauge, admin profile stats)
- Reduce revenue display redundancy (3 locations → 1)
- Flatten 8 status filters into grouped categories

### Ideas to Merge
- Export features (CSV + revenue) into a unified Reports module
- Security settings into a broader Settings hub
- Dashboard analytics + sidebar widget into one analytics experience

### Ideas to Redesign (for TraderCity)
- Build all "Not Implemented" features from the gap list above
- Add bulk actions across Members and Payments
- Add user detail view with tabbed sections
- Add clickable KPI cards with drill-down navigation

### Most Useful Interface Patterns
- Feature-rich data table with comprehensive filters (Members page)
- Approval queue with stat cards and status pills (Payment Verification)
- Export capabilities (CSV + revenue report)
