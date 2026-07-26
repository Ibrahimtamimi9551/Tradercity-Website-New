# Knowledge Vault — Component Structure

Component inventory for the Knowledge Vault homepage preview and future extractable surfaces.

Names below are the **target modular structure**. Existing files under `src/components/home/research-framework/` are the baseline until refactors land; update this doc when components are created, renamed, or split.

---

## Target composition map

```text
ResearchFrameworkSection          # section shell / section id / layout frame
├── StatsCards                    # knowledge statistics row
├── KnowledgeCategoryTabs         # category navigation / cards
├── LessonPreview                 # educational framework lesson preview
├── ResearchReader                # report / intelligence reader shell
└── JourneySection                # “A Journey Years in the Making”
```

Supporting / likely companions:

```text
ResearchFrameworkBackground       # atmospheric background for the section
KnowledgeCategoryCard             # individual category surface (if split from tabs)
ReportPreview                     # report teaser before full reader (if needed)
WeeklyIntelligencePreview         # future — weekly intelligence UI slice
MonthlyOutlookPreview             # future — monthly outlook UI slice
```

---

## Responsibilities

### `ResearchFrameworkSection`

- Owns the homepage section landmark (`id`, spacing, overflow).
- Composes child surfaces into one preview narrative.
- Must remain extractable as the root of a future dedicated vault page composition.

### `StatsCards`

- Displays knowledge statistics (counts, coverage, credibility signals).
- Single job: scannable proof of depth — not navigation.

### `KnowledgeCategoryTabs`

- Presents Knowledge Vault categories (education, research archive, weekly intelligence, outlooks, etc.).
- Handles category selection / focus state for the preview.
- Should not own full archive filtering logic (Phase 2).

### `LessonPreview`

- Renders the educational framework lesson preview.
- UI redesign only in Phase 1 — preserve existing learning content/data path.
- Keep reader-adjacent so it can become a vault lesson surface later.

### `ResearchReader`

- Hosts report / microstructure / intelligence reading UI.
- Reuses current report rendering architecture.
- Premium readability, hierarchy, and chrome — not a new content model.

### `JourneySection`

- Tells the long-form story: *A Journey Years in the Making*.
- Emotional / heritage beat after product surfaces.
- Should not compete with hero or lesson content for attention.

### `ResearchFrameworkBackground`

- Atmosphere only (gradients, depth, subtle motion).
- Must not carry primary content or interactive chrome.

---

## Coupling rules

| Allowed | Avoid |
|---------|--------|
| Shared design tokens / section primitives | Hard dependency on unrelated homepage sections |
| Local content adapters for existing lesson/report data | Importing Admin / Analyst / Member / Payment modules |
| Props that mirror future vault page needs | Homepage-only one-off layout hacks that block extraction |

---

## Current baseline files

| File | Role today |
|------|------------|
| `ResearchFramework.tsx` | Section shell |
| `ResearchFrameworkBackground.tsx` | Background |
| `ResearchFrameworkContent.tsx` | Main content composition |
| `learningFrameworks.ts` | Lesson / framework content source |
| `microstructureReports.ts` | Report content source |

As Phase 1 progresses, map each new component file path here.

---

## Future extraction target (Phase 2 sketch)

```text
src/
├── components/knowledge-vault/     # or content/knowledge-vault/
│   ├── section/
│   ├── preview/
│   ├── reader/
│   └── journey/
└── app/...                         # dedicated route (later)
```

Exact path will follow MODULE_OWNERSHIP / Platform v2.0 when activated. Prefer reusable components now so the move is mostly relocation + routing.
