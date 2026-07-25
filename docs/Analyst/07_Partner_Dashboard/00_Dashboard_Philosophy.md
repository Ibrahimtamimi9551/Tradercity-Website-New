# Dashboard Philosophy

**Version:** 1.1  
**Status:** Active  
**Authority:** `docs/Analyst/07_Partner_Dashboard/`

---

## Product identity

The Analyst Dashboard is **not** an administration panel. It is a **Partnership Performance Dashboard** — insight-driven, not action-driven.

| Dashboard | Identity | Job |
|-----------|----------|-----|
| **Admin Dashboard** | Platform Operations | Action-driven ops across the program |
| **Analyst Dashboard** | Partnership Performance | Insight-driven personal business portal |
| **VIP Dashboard** | Learning Center | Member access and learning |

---

## Analyst primary workflow

1. Monitor partnership performance  
2. Track referral growth  
3. Understand commission progression  
4. Request payouts (limited window)  
5. Contact support when required  

There are relatively few operational actions. The experience stays a **single-page, module-based dashboard** — no left sidebar, no multi-page navigation.

---

## Container principle

The dashboard is a **container**. Each business feature is an independent **Dashboard Module** with one clear responsibility. The page only orchestrates modules.

> **Analyst Management manages. Analyst Dashboard visualizes.**

Modules own presentation, loading, and slice consumption. They do **not** own commission/referral/payout calculation engines — those remain in Analyst Management.

---

## Story every login tells

1. Understand your partnership  
2. Measure referral performance  
3. Track commission progression  
4. See how earnings are calculated  
5. Request and monitor payouts  
6. Get help when needed  

---

## Anti feature-creep

| If the feature answers… | It belongs in… |
|-------------------------|----------------|
| How do we operate the program? | Analyst Management (Admin) |
| How is *my* partnership performing? | Analyst Dashboard |
| What can a member learn/access? | VIP / Member experience |
