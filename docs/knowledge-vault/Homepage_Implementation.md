# Knowledge Vault — Homepage Implementation

Tracks Phase 1: **Knowledge Vault Homepage Preview**.

Status legend: `todo` · `in-progress` · `done`

---

## Milestone goal

Elevate the homepage Research Framework section into a premium Knowledge Vault preview with clear hierarchy, readable density, and intentional motion — without shipping a dedicated vault page.

---

## Scope checklist

| Surface | Status | Notes |
|---------|--------|-------|
| Hero — *Research. Frameworks. Context.* | todo | Brand-forward hero for the vault preview |
| Statistics cards | todo | Knowledge statistics / credibility signals |
| Knowledge Categories | todo | Category cards / tabs for vault domains |
| Lesson Preview | todo | UI redesign only; keep existing data/render path |
| Report Reader | todo | UI redesign only; keep existing reader architecture |
| Journey Section — *A Journey Years in the Making* | todo | Story / heritage section |
| Responsive Layout | todo | Desktop + mobile composition |
| Animation Strategy | todo | Subtle, premium motion — presence, not noise |

---

## Out of scope (Phase 1)

- Dedicated Knowledge Vault page / route
- Search
- Filters
- Bookmarks
- Reading progress
- Navigation beyond the homepage preview
- Admin / Analyst / Member / Payment work

---

## Implementation principles

1. One composition — the preview should read as a single elevated research experience, not a dashboard.
2. One job per subsection — hero, stats, categories, lesson, report, journey each have a clear purpose.
3. Preserve data flow — redesign shells around existing lesson/report content.
4. Extractable structure — components should move to a dedicated vault page later with minimal refactoring.
5. Keep [Design_System.md](./Design_System.md) and [Component_Structure.md](./Component_Structure.md) updated as work lands.

---

## Existing starting point

Current homepage research section (pre-redesign baseline on this branch):

```text
src/components/home/research-framework/
├── ResearchFramework.tsx
├── ResearchFrameworkBackground.tsx
├── ResearchFrameworkContent.tsx
├── learningFrameworks.ts
└── microstructureReports.ts
```

Phase 1 builds on this surface. Component renames/splits will be reflected here and in [Component_Structure.md](./Component_Structure.md).

---

## Verification

Before considering Phase 1 complete:

- [ ] Desktop composition reads as one premium preview
- [ ] Mobile layout holds hierarchy without cramped cards
- [ ] Lesson preview and report reader still function with existing data
- [ ] Motion respects reduced-motion preferences where applicable
- [ ] Docs changelog entry added for the release slice
