# Knowledge Vault — Architecture

## Core principle

The homepage is **not** the destination.

The homepage only **previews** the Knowledge Vault system. It introduces frameworks, research, and learning surfaces so visitors understand the depth of TraderCity’s research ecosystem — then invites them deeper over time.

A dedicated Knowledge Vault page is **intentionally postponed** until Phase 2.

---

## System flow

```text
Homepage

↓

Knowledge Vault Preview

↓

Lesson Preview

↓

Future Dedicated Knowledge Vault
```

| Layer | Role today | Role later |
|-------|------------|------------|
| Homepage | Entry composition; brand + preview | Remains a lightweight teaser |
| Knowledge Vault Preview | Hero, stats, categories, journey | Becomes hub entry / marketing slice |
| Lesson Preview / Report Reader | In-section UI redesign only | Reusable reader shells for the vault |
| Dedicated Knowledge Vault | Not built | Search, filters, archive, progress, AI |

---

## Module independence

Treat Knowledge Vault as its own product surface even while Phase 1 ships inside the homepage.

### Do

- Keep components reusable and extractable
- Prefer domain-oriented folders over homepage-only coupling
- Preserve existing lesson/report data flow and rendering architecture
- Document decisions here as they land

### Do not

- Tightly bind vault UI to homepage-only layout primitives when avoidable
- Mix Admin, Analyst, Member, or Payment concerns into this module
- Implement a full vault route, search, filters, or bookmarks in Phase 1

---

## Ownership (transitional)

Until Engineering Platform v2.0 physical moves complete:

| Concern | Current paths (expected) | Domain direction |
|---------|--------------------------|------------------|
| Homepage preview section | `src/components/home/research-framework/**` (evolving toward knowledge-vault-oriented structure) | marketing preview → content |
| Shared types / mock content | co-located with section until extracted | content |
| Future dedicated page | not yet | content (+ thin `src/app` route) |

Exact folder renames will be recorded in [Changelog.md](./Changelog.md) and [Component_Structure.md](./Component_Structure.md) when they happen.

---

## Data & rendering constraints

- Preserve existing backend logic and data flow
- Reuse current lesson/report rendering architecture
- Phase 1 is a **UI / hierarchy / motion** elevation — not a content-platform rewrite

---

## Related docs

- [Homepage_Implementation.md](./Homepage_Implementation.md) — Phase 1 scope checklist
- [Future_Roadmap.md](./Future_Roadmap.md) — Phase 2+ expansion
- [Component_Structure.md](./Component_Structure.md) — extractable component map
