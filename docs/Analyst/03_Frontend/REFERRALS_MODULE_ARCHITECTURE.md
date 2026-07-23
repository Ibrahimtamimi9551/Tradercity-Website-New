# Analyst Referrals Module Architecture

**Version:** 1.0  
**Status:** Planned — Stage 1 Wave E  
**Authority:** `docs/Analyst/03_Frontend/`  
**Suggested route:** `/admin/analysts/referrals`  
**Nav placement:** First-class Analysts sidebar domain (Wave E)  
**Roadmap:** [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)

---

## 1. Purpose

Make analyst partnership **commercially operational** by mirroring Member Platform referral architecture.

Answers:

> What is this partner’s referral code/link performance, and what commission / credit posture do they have?

Reuse existing referral business logic and Admin interaction patterns wherever possible. Domain data and incentives remain Analyst-specific.

---

## 2. Left navigation

```text
Referrals
```

### Internal views

```text
Referrals
├── Referral Dashboard
├── Referral Directory
└── Referral Intelligence
```

Intelligence may deepen in Stage 2; Stage 1 Wave E ships Dashboard + Directory with commercial tracking foundations.

---

## 3. Scope (Wave E)

| Capability | Notes |
|------------|-------|
| Referral Code | Partner code identity |
| Invite Link | Shareable acquisition link |
| Referral Tracking | Attributed referrals |
| Referral Performance | Conversion / volume signals |
| Commission Tracking | Earnings reflection |
| Credit System | Analyst credit posture (mirror Member patterns where applicable) |
| Future Payout Preparation | Structure for payouts — no NestJS payout engine yet |

Legacy `/admin/analysts/commissions` shell folds commercially into this domain + Control Center Commissions tab.

---

## 4. UX pattern

Follow [`OPERATIONAL_UX_PATTERN.md`](./OPERATIONAL_UX_PATTERN.md):

```text
Referral Directory / Dashboard queues
        ↓
Referral Inspector
        ↓
Control Center → Referrals / Commissions tabs
```

Mirror Member Referrals domain structure (Dashboard · Intelligence) without forking Member SoT.

---

## 5. Source ownership (planned)

```text
src/app/admin/analysts/referrals/page.tsx
src/components/analysts/sections/referrals/
src/lib/analysts/mock/referrals.ts
src/types/analysts/referrals.ts
```

Shared referral primitives may exist under Member/Admin shared clients when backend exists — Analyst UI still owns presentation under `components/analysts/`.

---

## 6. Implementation status

| Capability | Status |
|------------|--------|
| Route shell | Exists (`ModulePlaceholder`; not in sidebar) |
| Sidebar domain | Not started (add in Wave E) |
| Dashboard / Directory | Not started |
| Commission / credit reflection | Not started |
| NestJS | Not started |

---

## Related

- Roadmap Wave E: [`../06_Implementation/IMPLEMENTATION_ROADMAP.md`](../06_Implementation/IMPLEMENTATION_ROADMAP.md)  
- Business model: [`../01_Product_Vision/ANALYST_BUSINESS_MODEL.md`](../01_Product_Vision/ANALYST_BUSINESS_MODEL.md)  
- Commission admin: [`../04_Admin/COMMISSION_MANAGEMENT.md`](../04_Admin/COMMISSION_MANAGEMENT.md)  
- Control Center: [`CONTROL_CENTER_ARCHITECTURE.md`](./CONTROL_CENTER_ARCHITECTURE.md)
