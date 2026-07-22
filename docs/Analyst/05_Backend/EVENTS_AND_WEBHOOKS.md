# Analyst Events and Webhooks

**Version:** 0.1  
**Status:** Planned  
**Authority:** `docs/Analyst/05_Backend/`  
**Last Updated:** July 23, 2026

---

## Candidate domain events (future)

### Application / evaluation

`application.submitted` · `application.status_changed` · `application.evaluation_updated` · `application.decision_made`

### Lifecycle / stages

`analyst.stage_evaluation_recorded` · `analyst.verified` · `analyst.agreement_accepted` · `analyst.onboarding_completed` · `analyst.activated`

### Partnership administration

`analyst.suspended` · `analyst.reactivated` · `analyst.partnership_closed` · `analyst.publishing_paused` · `analyst.commission_paused`

### Discord (shared infra, Analyst triggers)

`analyst.discord_role_assigned` · `analyst.discord_role_removed` · `analyst.discord_sync_failed`

### Activity / alerts (later)

`analyst.activity_status_changed` · `analyst.alert_raised` · `analyst.alert_resolved`

### Commerce

`commission.earned` · `payout.requested` · `payout.approved`

Document payloads when backend design starts. Alerts events are deferred with the Alerts module.
