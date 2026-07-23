# Analyst Control Center Architecture

**Version:** 1.1  
**Status:** Active — Wave A shipped (mock)  
**Authority:** `docs/Analyst/03_Frontend/`  
**Route:** `/admin/analysts/[id]`  
**Phase record:** [`../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md)  
**Terminology:** UI = Control Center · Product = Analyst Platform  
**Last Updated:** July 24, 2026

---

## 1. Purpose

The Analyst Control Center is the **operational management hub for one analyst partner**.

It answers:

> What operational actions can I perform for this partner — and what is their full operational context?

Unlike Member Profile (primarily reflection + navigation into owning modules), the Analyst Control Center also **executes partnership business operations** (Suspend mock flow today; Close / Reactivate / Pause later).

**Boundary:** Control Center is for **active partnerships**. Candidates live in **Applications**. Approve creates a partnership handoff; it does not turn the Application Viewer into a Control Center.

Future **Analyst Profile** (Member Profile–like aggregation) will be enriched by Discord, Referrals, etc.; Control Center remains the ops workspace. **Partner-facing Analyst Dashboard** is deferred until Stage 1 operational foundation is complete — do not design it during Analyst Management.

---

## 2. Relationship to Directory Inspector

| Directory Inspector | Control Center |
|---------------------|----------------|
| Quick inspection only | Full operational management |
| Same page as Directory table | Own route `/admin/analysts/[id]` |
| Summary identity / status / health | Header + tabs + Administration |
| Does not mutate partnership state | Administration executes actions (mock) |

**Rule:** Keep the right-side Directory panel. Do not grow it into Control Center.

---

## 3. Navigation entry points (shipped)

| Entry | Behavior | Status |
|-------|----------|--------|
| Directory identity (name / handle) | → Control Center | **Shipped** |
| Directory ⋮ → Open Analyst Control Center | → Control Center | **Shipped** |
| Inspector “Open Control Center →” | → Control Center | **Shipped** |
| Row click | Selects Inspector only | Unchanged |

---

## 4. Tabs

```text
Overview · Timeline · Administration · Performance · Discord · Commissions · Notes
```

| Tab | Wave A maturity |
|-----|-----------------|
| Overview | **Implemented** — partnership summary, lifecycle, ops summary, quick stats |
| Administration | **Implemented** — Suspend guided mock flow; other actions placeholders |
| Notes | **Implemented** — add/list internal notes (mock) |
| Timeline | Placeholder + TODO(NestJS) |
| Discord | **Wave C** — consumes Discord domain (status · username · role · connection · last sync · deep-links) |
| Performance | Placeholder reserved |
| Commissions | Placeholder reserved |

URL: `?tab=<id>` (default Overview omits param).

---

## 5. Header (shipped)

Avatar · Name · Username · Status · Tier · Activity Status · Health · Specialization · Partner Since · Quick Actions (Administration / Suspend)

---

## 6. Administration — Suspend Partnership (mock)

```text
Suspend → Modal → Reason → Notes → Duration → Notify Analyst
        → Remove Discord Role (future, disabled)
        → Pause Commission (future, disabled)
        → Confirm
```

Confirm updates in-memory mock (Control Center + Directory row status). No NestJS.

Placeholders (disabled): Reactivate · Close · Archive · Pause Publishing · Pause Commission.

---

## 7. Source ownership (shipped)

```text
src/app/admin/analysts/[id]/page.tsx
src/components/analysts/sections/control-center/
src/lib/analysts/mock/control-center.ts
src/lib/analysts/hooks/useAnalystControlCenter.ts
src/lib/analysts/format-control-center.ts
src/types/analysts/control-center.ts
```

---

## 8. Backend expectations (planning only)

| Method | Path | Notes |
|--------|------|-------|
| `GET` | `/admin/analysts/:id` | Full Control Center projection |
| `GET` | `/admin/analysts/:id/timeline` | Timeline events |
| `POST` | `/admin/analysts/:id/notes` | Internal notes |
| `POST` | `/admin/analysts/:id/actions/suspend` | Partnership action |

See [`../05_Backend/API_EXPECTATIONS.md`](../05_Backend/API_EXPECTATIONS.md).

---

## 9. Implementation status

| Capability | Status |
|------------|--------|
| Route `/admin/analysts/[id]` | **Shipped** (mock) |
| Overview + Administration + Notes | **Shipped** (mock) |
| Placeholder tabs | **Shipped** |
| Directory identity → Control Center | **Shipped** |
| NestJS APIs | Not started |

---

## Related

- Directory: [`DIRECTORY_ARCHITECTURE.md`](./DIRECTORY_ARCHITECTURE.md)  
- Partnership admin: [`../04_Admin/PARTNERSHIP_ADMINISTRATION.md`](../04_Admin/PARTNERSHIP_ADMINISTRATION.md)  
- Wave A report: [`../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md`](../06_Implementation/PHASE_05_WAVE_A_IMPLEMENTATION.md)
