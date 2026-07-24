# Analyst Documentation & Implementation Changelog

**Authority:** `docs/Analyst/06_Implementation/`

| Date | Phase / module | Change |
|------|----------------|--------|
| 2026-07-22 | 01–03 | Shipped section nav, Analyst Dashboard, Analyst Directory (mocks) |
| 2026-07-22 | Docs | Established isolated `docs/Analyst/` subsystem; legacy paths redirected |
| 2026-07-23 | Terminology | Platform Terminology refactor — Members/Analysts/Content UI nouns |
| 2026-07-23 | 03 Directory docs | Expanded Directory Architecture, Operational UX pattern, Documentation Sync Rule; synced status/index/API/workflow/phase report |
| 2026-07-23 | **04 Architecture** | Operational platform refinement: Control Center, Discord (shared infra), Activity Status, Applications Viewer, category + stage evaluations, Partnership Administration, Alerts deferred; [`ANALYST_ARCHITECTURE_REFINEMENT_IMPLEMENTATION.md`](./ANALYST_ARCHITECTURE_REFINEMENT_IMPLEMENTATION.md) Waves A–F coding plan; backend contracts reserved |
| 2026-07-23 | **05 / Wave A** | Shipped Analyst Control Center (`/admin/analysts/[id]`) — Overview, Administration Suspend mock, Notes, placeholder tabs; Directory username + ⋮ → Control Center; docs synced; [`ANALYST_CONTROL_CENTER_IMPLEMENTATION.md`](./ANALYST_CONTROL_CENTER_IMPLEMENTATION.md) |
| 2026-07-24 | **Roadmap v2.0** | Architecture/planning refactor: Stage 1 Analyst Program (Waves B Applications · C Discord · D Onboarding · E Referrals) vs Stage 2 Intelligence (F–I); left nav = operational domains; Verification folds into Applications; Activity Status deferred to Stage 2 Wave G; [`IMPLEMENTATION_ROADMAP.md`](./IMPLEMENTATION_ROADMAP.md) |
| 2026-07-24 | **05 / Wave B** | Shipped Applications domain — Dashboard · Review Queue (Viewer: Application/Verification/Evaluation/Notes/Decision) · Archive; mobile `[id]` page; Verification nav folded + redirect; mock store; [`ANALYST_APPLICATIONS_IMPLEMENTATION.md`](./ANALYST_APPLICATIONS_IMPLEMENTATION.md) |
| 2026-07-24 | **05 / Wave B refinement** | Form-aligned application model (Profile · Trading · Audience · Content); Evaluation Workspace summary; Approve → partnership handoff (analyst identity / Discord prep); Reject archives + reason; Applications ≠ Control Center clarified in docs |
| 2026-07-24 | **05 / Wave C** | Shipped Analyst Discord domain — Dashboard · Directory · Operations; partnership activation on Approve (Directory · Discord · referral reserved); Control Center Discord tab consumes domain; identity migration + partner dashboard deferred as principles; [`ANALYST_DISCORD_IMPLEMENTATION.md`](./ANALYST_DISCORD_IMPLEMENTATION.md) |
| 2026-07-24 | **05 / Wave D** | Shipped Applications → Onboarding as **System Provisioning** (not education); checklist verifies Identity · Directory · Control Center · Discord · Referral · Commission · Backend; overall Ready / Provisioning Required; orientation deferred to future Analyst Dashboard; [`ANALYST_ONBOARDING_IMPLEMENTATION.md`](./ANALYST_ONBOARDING_IMPLEMENTATION.md) |
| 2026-07-24 | **UI refinement** | Discord Directory columns cleaned (removed Username · Server Status); WidgetCard mobile→tablet→desktop scale; Control Center Overview module command cards + compact lifecycle side rail |
| 2026-07-24 | **05 / Wave E** | Shipped Referrals domain — Dashboard · Directory · Performance · Archive; Enabled/Disabled status; compact code/link; plan breakdown; Analyst Profile + Control Center summary; Commission deferred to Wave F; [`ANALYST_REFERRALS_IMPLEMENTATION.md`](./ANALYST_REFERRALS_IMPLEMENTATION.md) |
| 2026-07-25 | **05 / Wave E refinement** | Referral Profile — operational Referral Timeline (audit trail, mock-first); per-scenario event histories; NestJS-ready event types |
| 2026-07-25 | **05 / Wave F** | Shipped Commission Financial Operations — Dashboard · Directory · Payouts · History; Pending→Approved→Paid; manual USDT BEP-20 payout workspace (Gross/TC/Analyst · wallet copy · tx hash); Commission Profile + timeline; tier % bands; Control Center / Directory summary; Stage 1 foundation complete; [`ANALYST_COMMISSION_IMPLEMENTATION.md`](./ANALYST_COMMISSION_IMPLEMENTATION.md) · [`COMMISSIONS_MODULE_ARCHITECTURE.md`](../03_Frontend/COMMISSIONS_MODULE_ARCHITECTURE.md) |
| 2026-07-25 | **05 / Wave F refinement** | Referral credit model ($10/$30/$60 · no Lifetime); Referral Commissions table + filters + Open Member; Commission Lines view; Monthly Business / Next Tier UI; copy actions for wallet · tx · referral code/link |
| 2026-07-25 | **05 / Wave F hierarchy** | Slim Directory inspector; Dashboard = operational workspace; remove Lines tab; search-first single-card Payouts; tier progress bar; Payment Details at bottom of workspace |
| 2026-07-25 | **05 / Wave F operational UX** | Ready/Paid lifecycle (no Pending/Approved states); Due Amount carry-forward; Directory ops columns; merged Billing Cycle summary; Payment Summary; payout labels + optional evidence; History column reorder; [`ANALYST_COMMISSION_IMPLEMENTATION.md`](./ANALYST_COMMISSION_IMPLEMENTATION.md) v1.3 |
| 2026-07-25 | **Docs organization** | Renamed all implementation docs to `ANALYST_<MODULE>_IMPLEMENTATION.md` (no PHASE/WAVE in filenames); `PROJECT_STATUS.md` executive summary; `docs/Development/Analyst/` remains redirect-only |

Former implementation report: `docs/Development/Analyst/02_Implementation_Report.md` (redirect).
