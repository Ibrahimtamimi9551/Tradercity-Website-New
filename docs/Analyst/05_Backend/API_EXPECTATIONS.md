# Analyst API Expectations

**Version:** 0.4  
**Status:** Draft — planning contracts from Admin frontend + Phase 4–5 architecture  
**Authority:** `docs/Analyst/05_Backend/`  
**Companion:** [`../03_Frontend/DIRECTORY_ARCHITECTURE.md`](../03_Frontend/DIRECTORY_ARCHITECTURE.md)  
**Last Updated:** July 25, 2026

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

## Discord (Analyst role — Wave C UI shipped on mocks)

Reuse shared Discord sync infrastructure. Analyst-specific contracts:

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/analysts/discord` | Directory-style Discord ops list |
| `GET` | `/admin/analysts/:id/discord` | Control Center Discord tab |
| `POST` | `/admin/analysts/:id/discord/invite` | Generate invite |
| `POST` | `/admin/analysts/:id/discord/connect` | Connect / reconnect account |
| `POST` | `/admin/analysts/:id/discord/sync` | Trigger sync |
| `POST` | `/admin/analysts/:id/discord/assign-role` | Assign Analyst role (verified in Applications → Onboarding) |
| `POST` | `/admin/analysts/:id/discord/remove-role` | Remove Analyst role |
| `POST` | `/admin/analysts/:id/discord/disconnect` | Disconnect account |
| `GET` | `/admin/analysts/applications/:id/provisioning` | System Provisioning checklist (Wave D) |
| `POST` | `/admin/analysts/applications/:id/provisioning/retry` | Retry failed provisioning step |

Trigger for **record creation:** Application Approved → partnership activation (backend creates; Admin verifies).  
Trigger for **assign role:** Discord Operations; Onboarding verifies Connected · Role Assigned.  
No payment / subscription validation.

**Reserved (later):** publishing / private / education / moderator channel permissions · identity migration merge.

---

## Referrals (Wave E UI shipped on mocks)

Referrals domain owns identity, code/link, status, and conversion performance. Commission **consumes** this domain (does not recalculate attribution).

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/analysts/referrals` | Directory list + filters (`status=enabled\|disabled`) |
| `GET` | `/admin/analysts/referrals/:id` | Referral Profile |
| `GET` | `/admin/analysts/:id/referrals` | Control Center Referrals tab |
| `POST` | `/admin/analysts/:id/referrals/provision` | Create identity at partnership birth (Disabled) |
| `POST` | `/admin/analysts/:id/referrals/activate` | Activate when Operationally Ready |
| `POST` | `/admin/analysts/referrals/:id/enable` | Enable code |
| `POST` | `/admin/analysts/referrals/:id/disable` | Disable code |
| `POST` | `/admin/analysts/referrals/:id/archive` | Archive identity |

Backend owns: code/link generation · member attribution · conversion tracking · activation · status updates · append-only referral timeline events.  
Frontend visualizes operational state and exposes plan breakdown for Commission.

**Dashboard data contract (mock):** totalAnalysts · referralEnabled · referralDisabled · totalReferralsGenerated · successfulReferrals · vipConversions · pendingCommissionLabel (points to Commission domain).

**Timeline contract (mock):** chronological events with `type` · `category` (system|member|conversion|administrative) · `title` · optional `description` · `timestamp`. Referral-specific only — not Analyst Activity Timeline.

---

## Commission (Wave F UI shipped on mocks)

Commission is **Financial Operations**. Frontend never calculates production amounts — NestJS owns math, tier assignment, and ledger mutations.

Canonical frontend types: `src/types/analysts/commissions.ts`  
Architecture: [`../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md)

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/analysts/commissions` | Directory + dashboard aggregates · filters (`status=none\|ready\|overdue\|paid`) |
| `GET` | `/admin/analysts/commissions/:id` | Commission workspace (summary · lines · payouts · timeline · wallet) |
| `GET` | `/admin/analysts/commissions/payouts/queue` | Ready-to-pay queue with Generated / Payable / Due / Total to Pay |
| `GET` | `/admin/analysts/commissions/payouts/history` | Permanent cross-analyst ledger |
| `GET` | `/admin/analysts/:id/commissions` | Control Center Commissions tab summary |
| `POST` | `/admin/analysts/commissions/:id/review` | Optional payment acknowledgement (not a lifecycle state) |
| `POST` | `/admin/analysts/commissions/:id/payouts/complete` | Body: `transactionHash`, optional `notes` / evidence · marks Ready lines Paid |
| `POST` | `/admin/analysts/commissions/:id/payouts/schedule` | Optional schedule marker (timeline event) |

### NestJS ownership

* Commission calculation from referral conversions  
* Referral → commission line mapping  
* Monthly cumulative business → tier % (40 / 50 / 60 / 70)  
* Due Amount carry-forward across billing cycles  
* Revenue split: Gross · TraderCity Share · Analyst Share  
* Payout generation · Ready → Paid transitions  
* Transaction hash · network · token · evidence recording  
* Append-only ledger (**never delete** financial records)  
* Partner Analyst Dashboard sync (read model; no duplicate store)

### Manual payout rail (current product)

* Network: BNB Smart Chain (BEP-20)  
* Token: USDT  
* Platform records ops; blockchain executes transfer  

### Dashboard data contract (mock)

```ts
{
  totalAnalysts: number;
  readyForPaymentCount: number;
  totalCommissionGeneratedUsd: number;
  totalAmountToPayUsd: number;
  paidCommissionUsd: number;
  outstandingDueUsd: number;
}
```

### Referral credit model (gross)

| Plan | Credit per successful referral |
|------|-------------------------------:|
| Monthly | $10 |
| Quarterly | $30 |
| Yearly | $60 |

Lifetime is **not** credited. Constants must match `ANALYST_REFERRAL_CREDIT_USD`.

### Tier bands (auto from monthly business — not manually editable)

| Monthly Business Generated | Analyst Share |
|---------------------------:|--------------:|
| Less than $1,000 | 40% |
| $1,000 – $2,999 | 50% |
| $3,000 – $9,999 | 60% |
| $10,000 or more | 70% |

Commission lines reference `memberId` → Member Management (single source of truth).

### Timeline contract (mock)

Events: `commission_generated` · `commission_approved` · `payment_scheduled` · `commission_paid` · `transaction_confirmed` · `wallet_recorded` · `tier_updated`  
Categories: `financial` · `payout` · `administrative`

### Reserved for later

* Payment evidence attachments (screenshot / receipt URLs)  
* Dispute module referencing commission + payout + tx hash + notes  
* On Hold / Cancelled / Reversed lifecycle states  
* Editable wallet forms (partner Analyst Dashboard)

---

## Future endpoints (not mocked yet)

Automated alerts · Analyst Activity Timeline · partner Analyst Dashboard aggregation APIs

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
