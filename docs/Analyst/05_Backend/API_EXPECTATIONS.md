# Analyst API Expectations

**Version:** 0.3  
**Status:** Draft — planning contracts from Admin frontend + Phase 4 architecture  
**Authority:** `docs/Analyst/05_Backend/`  
**Companion:** [`../03_Frontend/DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md)  
**Last Updated:** July 23, 2026

Backend developers: use this + [`../00_Overview/PROJECT_STATUS.md`](../00_Overview/PROJECT_STATUS.md). Do not reverse-engineer the UI alone.

**Do not implement NestJS yet** unless tasked — this document reserves contracts.

---

## Auth

All `/admin/analysts/**` APIs: Admin role required.

---

## Dashboard

| Method | Path | Replaces |
|--------|------|----------|
| `GET` | `/admin/analysts/dashboard` | `MOCK_ANALYST_DASHBOARD` |

Return KPI cards, queue items, and recent activity compatible with `src/types/analysts/dashboard.ts`.

---

## Directory list (priority integration)

| Method | Path | Replaces |
|--------|------|----------|
| `GET` | `/admin/analysts` *(or `/admin/analysts/directory`)* | `MOCK_DIRECTORY_ANALYSTS` + stats |

### Query params (preserve)

| Param | Required | Meaning |
|-------|----------|---------|
| `q` | no | Search: display name, handle, email, specialization |
| `status` | no | Lifecycle enum |
| `tier` | no | Tier enum |
| `health` | no | `healthy` \| `needs_attention` \| `action_required` |
| `activityStatus` | no | **Reserved** — Activity Status band |
| `page` | no | 1-based page (default 1) |
| `pageSize` | no | `10` \| `25` \| `50` (default 10) |

### Expected response (conceptual)

```text
{
  items: DirectoryAnalyst[],
  total: number,
  stats?: AnalystDirectoryStats
}
```

Align fields to `DirectoryAnalyst` / `AnalystDirectoryStats` in `src/types/analysts/directory.ts`.  
Reserve `activityStatus` (+ optional `lastActivityAt`) on list items.

Use production UUIDs; mock `a-00x` are UI seeds only.

### Inspector

List rows should be rich enough to populate the Quick Inspector without a second fetch. Optional later: `GET /admin/analysts/:id/summary`.

### Selection

Frontend stores selection in `?analyst=<id>`. API does not need this param.

---

## Control Center (Wave A UI shipped — mock)

Frontend consumer: `useAnalystControlCenter` → `src/lib/analysts/mock/control-center.ts`.  
Align NestJS payloads to `AnalystControlCenter` in `src/types/analysts/control-center.ts`.

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/analysts/:id` | Full Control Center projection |
| `GET` | `/admin/analysts/:id/timeline` | Timeline events |
| `POST` | `/admin/analysts/:id/notes` | Internal notes |

Directory identity click is the primary consumer of `GET :id`.

---

## Partnership actions (reserved)

| Method | Path | Notes |
|--------|------|-------|
| `POST` | `/admin/analysts/:id/actions/suspend` | Reason, notes, duration, notify, removeDiscordRole, pauseCommissions |
| `POST` | `/admin/analysts/:id/actions/reactivate` | Notes + restore options |
| `POST` | `/admin/analysts/:id/actions/close` | Reason + notes + side-effect flags |
| `POST` | `/admin/analysts/:id/actions/archive` | Archive |
| `POST` | `/admin/analysts/:id/actions/pause-publishing` | Pause publishing |
| `POST` | `/admin/analysts/:id/actions/pause-commission` | Pause commission |
| `POST` | `/admin/analysts/:id/actions/remove-discord-access` | Remove Analyst role |

All actions should emit auditable timeline events.

---

## Activity Status (reserved)

| Method | Path | Notes |
|--------|------|-------|
| *(field on Directory / Control Center)* | — | `activityStatus`, `lastActivityAt` |
| `GET` | `/admin/analysts/:id/activity` | Optional detail later |

Bands (product example): `active_today` · `active` · `quiet` · `inactive` · `critical`

---

## Applications & evaluations (reserved)

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/analysts/applications` | Paginated queue |
| `GET` | `/admin/analysts/applications/:id` | Full application + evaluations |
| `PUT` | `/admin/analysts/applications/:id/evaluations/categories` | Category ratings batch |
| `POST` | `/admin/analysts/applications/:id/decision` | Need info / reject / eligible |

### Category rating payload (conceptual)

`category` · `rating` · `notes` · `reviewerId` · `reviewedAt`

Categories: identity · trading_knowledge · research_quality · education_ability · communication · professionalism · social_presence · community · brand_compatibility · long_term_potential

### Overall score

Server-computed from categories; return `overallScore` (e.g. 0–100) + threshold metadata.

---

## Stage evaluations (reserved)

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/analysts/:id/stage-evaluations` | History across stages |
| `POST` | `/admin/analysts/:id/stage-evaluations` | Create/update stage evaluation |

Payload: `stage` · `rating` · `notes` · `decision` · `reviewerId` · `reviewedAt`

Stages: application · verification · partnership · agreement · onboarding · …

---

## Discord (Analyst role — reserved)

Reuse shared Discord sync infrastructure. Analyst-specific contracts:

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/analysts/discord` | Directory-style Discord ops list |
| `GET` | `/admin/analysts/:id/discord` | Control Center Discord tab |
| `POST` | `/admin/analysts/:id/discord/sync` | Trigger sync |
| `POST` | `/admin/analysts/:id/discord/assign-role` | Assign Analyst role (post-onboarding gate) |
| `POST` | `/admin/analysts/:id/discord/remove-role` | Remove Analyst role |

Trigger for assign (business rule): Application Approved → Agreement Accepted → Onboarding Complete → Assign Analyst Role.  
No payment / subscription validation.

---

## Future endpoints (not mocked yet)

Verification transitions · partnerships · commissions · payouts · automated alerts

---

## Client states

| State | Frontend expectation |
|-------|----------------------|
| Loading | `LoadingState` / Suspense (Directory already) |
| Empty | DataTable empty title when filters match nothing |
| Error | Follow Admin error patterns when API lands |

---

## Related

- Backend integration order: [`../02_Product_Architecture/ANALYST_BACKEND_INTEGRATION.md`](../02_Product_Architecture/ANALYST_BACKEND_INTEGRATION.md)  
- Domain model: [`../02_Product_Architecture/ANALYST_DOMAIN_MODEL.md`](../02_Product_Architecture/ANALYST_DOMAIN_MODEL.md)  
- Integration points: [`INTEGRATION_POINTS.md`](./INTEGRATION_POINTS.md)
