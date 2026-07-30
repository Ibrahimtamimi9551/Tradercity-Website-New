# Analyst Referrals Module Architecture

**Version:** 1.1  
**Status:** Active — Stage 1 Wave E (mock-first)  
**Authority:** `docs/Analyst/03_Frontend/`  
**Route:** `/admin/analysts/referrals`  
**Nav placement:** First-class Analysts sidebar domain  
**Roadmap:** [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)  
**Report:** [`../06_Implementation/ANALYST_REFERRALS_IMPLEMENTATION.md`](../06_Implementation/ANALYST_REFERRALS_IMPLEMENTATION.md)

---

## 1. Purpose

Make analyst partnership **commercially operational** through referral identity and performance — not revenue analytics.

This domain owns the **partnership growth relationship** between an analyst and TraderCity:

* Referral Identity  
* Referral Code  
* Referral Link  
* Referral Performance  
* Referral Status  
* Referral Members / attribution (backend later)  
* Conversion Tracking  

**Commission calculations are out of scope** (Wave F consumes this domain).

---

## 2. Business philosophy

Every analyst who reaches **Operationally Ready** (Wave D System Provisioning) automatically receives an activated referral identity.

```text
Application → Review → Approval → Discord Ready
  → System Provisioning → Operational Analyst Ready
  → Referral Activated → Commission (Wave F)
```

| Moment | Referral state |
|--------|----------------|
| Approve (partnership birth) | Identity **provisioned** · Status **Disabled** · not activated |
| Operationally Ready | Identity **activated** · Status **Enabled** |
| Ops pause / suspend | Status **Disabled** |
| Closed / expired | Archive |

No other module owns referral code, link, status, or conversion performance.

---

## 3. Left navigation

```text
Referrals
```

### Internal views

```text
Referrals
├── Dashboard
├── Directory
├── Performance
└── Archive
```

---

## 4. Referral Status

Only two operational states:

| Status | Meaning |
|--------|---------|
| **Enabled** | Active referral code / link |
| **Disabled** | Paused, not yet activated, or suspended |

Filterable from Dashboard deep-links and Directory filters.

---

## 5. Workspaces

### Dashboard

Lightweight operational cards:

* Total Analysts  
* Referral Enabled / Disabled  
* Total Referrals Generated  
* Successful Referrals  
* VIP Conversions  
* Pending Commission (amount from Commission domain · deep-link)  

### Directory

Primary operational workspace.

| Column | Notes |
|--------|-------|
| Analyst | Name + handle |
| Referral Code | `REF-X7K82` + shortened `tradercity.co/r/X7K82` |
| Referral Status | Enabled / Disabled |
| Total Referrals | Count |
| Successful Referrals | Count |
| Actions | Row → Referral Profile |

Full URL is copied via action — table never shows the full link.

### Referral Profile (inspector)

* **Identity** — Analyst · Code · Link · Status · Activation Date · Partnership Status  
* **Performance** — Total · Successful · Active VIP · Pending Conversions  
* **Successful Referral Breakdown** — Monthly · Quarterly · Yearly · Lifetime  
* **Referral Timeline** — operational audit trail (system · member · conversion · admin events); not analytics; not Analyst Activity Timeline  
* **Actions** — Copy code/link · Enable/Disable · Archive  

### Performance

Operational lists (no charts / revenue analytics):

* Top Referring Analysts  
* Recent Successful Referrals  
* Recently Activated Referral Codes  
* Disabled Referral Codes  
* Analysts Without Referrals  

### Archive

* Disabled / archived codes  
* Archived analysts  
* Expired partnerships  

---

## 6. Domain ownership

```text
Applications  → Creates Analyst
Discord       → Creates Discord Identity
Onboarding    → Verifies Operational Readiness
Referrals     → Creates Referral Identity · Tracks Performance
Commission    → Consumes Referral Performance (Wave F ✅)
```

---

## 7. Analyst Profile integration

| Surface | Role |
|---------|------|
| Directory Inspector | Concise referral summary + plan breakdown |
| Control Center Overview | Referral module card |
| Control Center Referrals tab | Summary + deep-links to domain |
| Control Center Commissions tab | Wave F — owned by Commission domain |

Summary fields: Total Referrals · Successful Referrals · Referral Status · Monthly / Quarterly / Yearly / Lifetime.

---

## 8. Commission consumption (Wave F ✅)

Referrals **expose** — Commission **owns amounts**:

* Referral Identity  
* Successful Referrals  
* Membership Plan Breakdown (counts)  
* Conversion Count  
* Referral Status  

Canonical Commission architecture: [`COMMISSIONS_MODULE_ARCHITECTURE.md`](./COMMISSIONS_MODULE_ARCHITECTURE.md)

---

## 9. Source ownership

```text
src/app/admin/analysts/referrals/page.tsx
src/app/admin/analysts/referrals/[id]/page.tsx
src/components/analysts/sections/referrals/
src/lib/analysts/mock/referrals.ts
src/lib/analysts/mock/referrals-mutations.ts
src/lib/analysts/hooks/useAnalystReferrals.ts
src/lib/analysts/format-referrals.ts
src/types/analysts/referrals.ts
```

`/admin/analysts/commissions` is the Commission Financial Operations domain (Wave F).

---

## 10. URL contract

```text
/admin/analysts/referrals
/admin/analysts/referrals?view=directory
/admin/analysts/referrals?view=directory&status=enabled
/admin/analysts/referrals?view=directory&referral=aref-a-001
/admin/analysts/referrals?view=performance
/admin/analysts/referrals?view=archive
/admin/analysts/referrals/[id]          # mobile Referral Profile
```

---

## 11. Backend philosophy

Backend owns: code/link generation · member attribution · conversion tracking · activation · status updates.  
Frontend visualizes and manages operational state.

---

## 12. Implementation status

| Capability | Status |
|------------|--------|
| Sidebar domain | **Shipped** |
| Dashboard · Directory · Performance · Archive | **Shipped** (mock) |
| Referral Profile + plan breakdown | **Shipped** (mock) |
| Analyst Profile / Control Center summary | **Shipped** (mock) |
| Commission math | Owned by Commission domain (Wave F ✅) |
| NestJS | Not started |

---

## Related

- Referrals report: [`../06_Implementation/ANALYST_REFERRALS_IMPLEMENTATION.md`](../06_Implementation/ANALYST_REFERRALS_IMPLEMENTATION.md)  
- Commission architecture: [`COMMISSIONS_MODULE_ARCHITECTURE.md`](./COMMISSIONS_MODULE_ARCHITECTURE.md)  
- Commission admin: [`../04_Admin/COMMISSION_MANAGEMENT.md`](../04_Admin/COMMISSION_MANAGEMENT.md)  
- Control Center: [`CONTROL_CENTER_ARCHITECTURE.md`](./CONTROL_CENTER_ARCHITECTURE.md)  
- Onboarding: [`ONBOARDING_MODULE_ARCHITECTURE.md`](./ONBOARDING_MODULE_ARCHITECTURE.md)
