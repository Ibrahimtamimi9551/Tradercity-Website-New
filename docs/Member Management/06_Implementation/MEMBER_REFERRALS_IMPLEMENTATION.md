# Member Referrals — Implementation Report

**Phase:** 6  
**Status:** Complete (UI mock) · NestJS pending  
**Last Updated:** July 28, 2026

---

## What shipped

- Referral Operations dashboard (table, filters, sort, panel, mobile detail)  
- Module nav between Operations and Intelligence  
- Intelligence sections on mock BI data  
- Deep-links from Dashboard and Control Center  

## Key paths

```text
src/app/admin/referrals/*
src/components/members/sections/referrals/*
src/lib/members/hooks/useReferralsDirectory.ts
src/lib/members/mock/referral-members.ts
src/lib/members/mock/referral-intelligence.ts
src/types/members/referral.ts
src/types/members/referral-intelligence.ts
```

## Backend impact

Reserved referrals list/detail/redeem/intelligence endpoints.

## Remaining

Wire NestJS; redeem mutations; live intelligence; optional archival Phase-06 file in `docs/Development/Admin/`.

## Related

Architecture: [`../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md`](../03_Frontend/REFERRALS_MODULE_ARCHITECTURE.md)
