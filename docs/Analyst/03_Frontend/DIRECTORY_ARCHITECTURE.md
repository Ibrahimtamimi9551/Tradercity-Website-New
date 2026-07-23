# Analyst Directory Architecture

**Version:** 1.1  
**Status:** Active — documents shipped Admin Directory (mock) + planned extensions  
**Authority:** `docs/Analyst/03_Frontend/`  
**Route:** `/admin/analysts/directory`  
**Phase record:** [`../06_Implementation/PHASE_03.md`](../06_Implementation/PHASE_03.md)  
**Terminology:** UI = **Directory** · Product = Analyst Platform · Engineering = Analyst Domain  
**Last Updated:** July 23, 2026

---

## 1. Purpose — what problem this solves

The Analyst Directory exists so operators can **run the Analyst Platform day-to-day** without opening a separate tool for each concern.

It answers:

- Who are our partners and applicants-in-progress?
- What lifecycle stage is each analyst in?
- What is their Activity Status (engagement freshness)?
- Who needs attention (health)?
- How large is their reach / what do they specialize in?
- Where do I go next — Control Center, Applications, Discord, Referrals?

Without the Directory, Admin would only have a KPI dashboard and disconnected shells. The Directory is the **operational roster**.

---

## 2. Dashboard vs Directory vs Control Center

| Surface | Route | Job | Depth |
|---------|-------|-----|-------|
| **Dashboard** | `/admin/analysts` | Ops inbox — queues, KPIs, recent activity | Aggregate |
| **Directory** | `/admin/analysts/directory` | Discover, filter, inspect, navigate | Roster + quick inspect |
| **Control Center** | `/admin/analysts/[id]` | Operational management for one partner | Per-analyst deep ops — **Wave A shipped (mock)** |

```text
Dashboard      →  “What needs attention across the platform?”
Directory      →  “Who are our analyst partners?”
Control Center →  “What operational actions can I perform for this partner?”
```

They are complementary, not duplicates.

---

## 3. Operational philosophy — not a CRUD table

The Directory is **not** a spreadsheet for inventing records.

It is an **operational workspace** used to:

1. **Discover** analysts (search / filters / widgets)  
2. **Monitor** partnership, health, and activity  
3. **Inspect** a partner quickly (right-side Inspector)  
4. **Navigate** into owning domains (Applications, Discord, Referrals)  
5. **Launch** the Analyst Control Center (username → `/admin/analysts/[id]`) — **shipped**

Row creation for new partners comes from the **Applications → Approval** pipeline, not from “Add row” on this table.

**Partnership mutations** (suspend, close, reactivate) belong in Control Center Administration — not as one-clicks in the table.

---

## 4. Directory architecture (shipped)

```text
PageTitle
  ↓
Stat widgets (deep-link filters / module shells)
  ↓
Filters bar (search · status · tier · advanced health)
  ↓
AdminMasterDetail
  ├── List: AdminDirectoryPanel → DataTable + Pagination
  └── Detail: AnalystDirectoryDetails (Inspector)
```

**Source composition**

| Layer | Path |
|-------|------|
| Route | `src/app/admin/analysts/directory/page.tsx` |
| Page | `src/components/analysts/sections/directory/AnalystsDirectoryPage.tsx` |
| Hook | `src/lib/analysts/hooks/useAnalystsDirectory.ts` |
| Mock | `src/lib/analysts/mock/directory-analysts.ts` |
| Types | `src/types/analysts/directory.ts` |

Shared primitives: `AdminMasterDetail`, `AdminDirectoryPanel`, `DataTable`, `Pagination`, `StatusBadge`, `SystemHealthBadge`.

---

## 5. Column definitions

| Column | UI header | Business meaning | Frontend field | Backend ownership (expected) |
|--------|-----------|------------------|----------------|------------------------------|
| Identity | Analyst | Human name + public handle | `displayName`, `handle`, avatar tone | Analyst identity aggregate |
| Status | Status | Lifecycle stage in partnership pipeline | `status` (`AnalystLifecycleStatus`) | Analyst lifecycle / state machine |
| Tier | Tier | Business maturity / partnership tier | `tier` (`AnalystTier`) | Partnership / commercial tier service |
| Reach | Reach | Estimated audience size (+ specialization subtitle) | `reachFollowers`, `specialization` | Reach / profile enrichment |
| Partnered | Partnered | Date partnership record became relevant | `partneredAt` | Analyst record timestamps |
| Health | Health | Operational health (attention signal) | `systemHealth` | Health synthesizer |
| Actions | Actions | Overflow menu for ops navigation | UI menu | Triggers navigation / workflows |

### Status values (lifecycle)

`under_review` · `verification` · `partnership_discussion` · `onboarding` · `active` · `growing` · `suspended` · `closed`

### Tier values

`none` · `partner` · `growing` · `top_partner`

### Health values

`healthy` · `needs_attention` · `action_required`  
(Reuse Admin `SystemHealthState` — same language as Member Directory.)

### Planned column — Activity Status *(Stage 2 — not Stage 1)*

Independent of Lifecycle Status. Ships in **Stage 2 Wave G** per [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md). Do not implement as the next coding wave.

| Band | Example label |
|------|---------------|
| Active Today | 🟢 Active Today |
| Active | 🟢 Active (3 Days) |
| Quiet | 🟡 Quiet (5 Days) |
| Inactive | 🟠 Inactive (9 Days) |
| Critical | 🔴 Critical (15 Days) |

Purpose: track communication / engagement health — **not** lifecycle.  
Later input to Automated Alerts (deferred).

| Field (planned) | Meaning |
|-----------------|---------|
| `activityStatus` | Band enum |
| `lastActivityAt` | Optional freshness timestamp |

---

## 6. Filtering system

Filters sync to the URL so widgets, bookmarks, and shareable ops links work.

### Current (shipped)

| Filter | Param | Business purpose |
|--------|-------|------------------|
| Search | `q` | Find by display name, handle, email, specialization |
| Status | `status` | Isolate a lifecycle stage |
| Tier | `tier` | Isolate commercial maturity |
| Health | `health` | Advanced — isolate analysts needing ops attention |
| Page | `page` | Pagination |
| Page size | `pageSize` | `10` \| `25` \| `50` |
| Selection | `analyst` | Selected row for Inspector (desktop) |

### Future filters (planned)

| Filter | Business purpose |
|--------|------------------|
| Activity Status | Communication / engagement freshness |
| Specialization | Topic/category ops views |
| Performance | Quality / growth buckets |
| Operational queues | Richer Dashboard deep-links |

---

## 7. Inspector panel (Quick Inspector)

**Component:** `AnalystDirectoryDetails`  
**Layout:** Right pane via `AdminMasterDetail` on desktop.

### Purpose

Answer “is this the right analyst / what’s going on?” **without** leaving the Directory.

### Information shown (shipped)

- Display name, handle, email, status badge  
- Tier, specialization, reach, partnered date, health  

### Planned Inspector additions

- Activity Status  
- Shortcut actions that **navigate** (Open Control Center, Open Discord) — not mutate  

### Difference from Control Center

| Inspector | Control Center |
|-----------|----------------|
| Summary / triage only | Full operational management |
| No partnership mutations | Administration tab executes actions |
| Lives on Directory page | Own route `/admin/analysts/[id]` |

Inspector **must not** become a second Control Center.

---

## 8. Control Center integration

```text
Click Analyst identity (username / display name)
        ↓
Open Analyst Control Center
  /admin/analysts/[id]
```

| Behavior | Status |
|----------|--------|
| Row click → select + Inspector + `?analyst=` | **Shipped** |
| Identity cell as Link to Control Center | **Shipped** (Wave A) |
| Inspector → Open Control Center | **Shipped** (Wave A) |
| Mobile uses same Control Center route | **Shipped** (Wave A) |

Architecture: [`CONTROL_CENTER_ARCHITECTURE.md`](./CONTROL_CENTER_ARCHITECTURE.md).

---

## 9. Action menu (⋮)

Operational menu — Wave A.

| Action | Status |
|--------|--------|
| Open Analyst Control Center | **Shipped** |
| Open Discord | Placeholder (disabled) |
| View Timeline | Placeholder (disabled) |
| Internal Notes | Placeholder (disabled) |
| Suspend Partnership | Placeholder (disabled) — execute in Control Center Administration |
| Close Partnership | Placeholder (disabled) |
| Archive Analyst | Placeholder (disabled) |

Do not fake functionality. Partnership mutations stay in Control Center Administration.

---

## 10. Stat widgets (operational entry points)

| Widget | Purpose | Typical deep-link |
|--------|---------|-------------------|
| Total Analysts | Roster size | `/admin/analysts/directory` |
| Active Partners | Healthy publishing partners | `?status=active` |
| Applications Pending | Intake pressure | `/admin/analysts/applications` |
| Action Required | Health triage | `?health=action_required` |
| New This Month | Growth of roster | Directory root |

---

## 11. Backend expectations

See [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md).

- Preserve query contract: `q`, `status`, `tier`, `health`, `page`, `pageSize`  
- Reserve future: `activityStatus`  
- List rows rich enough for Inspector  
- Control Center: `GET /admin/analysts/:id`

---

## 12. UX pattern (platform-wide)

[`OPERATIONAL_UX_PATTERN.md`](./OPERATIONAL_UX_PATTERN.md):

```text
Operational Table / Queue → Quick Inspector → Full Detail / Control Center
```

---

## 13. Implementation status summary

| Capability | Status |
|------------|--------|
| Table + columns (excl. Activity) | Complete (mock) |
| Search / status / tier / health filters | Complete (mock) |
| Pagination + URL sync | Complete |
| Inspector panel | Complete (summary) |
| Widgets | Complete (mock) |
| Activity Status column/filter | Planned (**Stage 2 Wave G**) |
| Action menu → Control Center | **Shipped** (other items placeholders) |
| Identity → Control Center | **Shipped** |
| NestJS API | Not started |

---

## Related docs

- Control Center: [`CONTROL_CENTER_ARCHITECTURE.md`](./CONTROL_CENTER_ARCHITECTURE.md)  
- Dashboard: [`DASHBOARD_ARCHITECTURE.md`](./DASHBOARD_ARCHITECTURE.md)  
- Discord: [`DISCORD_MODULE_ARCHITECTURE.md`](./DISCORD_MODULE_ARCHITECTURE.md)  
- Admin workflow: [`../04_Admin/ANALYST_ADMIN_WORKFLOW.md`](../04_Admin/ANALYST_ADMIN_WORKFLOW.md)  
- Lifecycle: [`../01_Product_Vision/ANALYST_USER_LIFECYCLE.md`](../01_Product_Vision/ANALYST_USER_LIFECYCLE.md)
