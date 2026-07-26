# Knowledge Vault

The Knowledge Vault is TraderCity's long-term research ecosystem.

It contains educational frameworks, research reports, weekly intelligence, outlooks, future analyst publications, and additional learning resources.

This documentation tracks the architecture, UI decisions, and future roadmap for the Knowledge Vault product module.

---

## Purpose of this folder

| Document | Role |
|----------|------|
| [Architecture.md](./Architecture.md) | System shape — homepage preview → future dedicated vault |
| [Homepage_Implementation.md](./Homepage_Implementation.md) | Phase 1 homepage preview implementation tracker |
| [Component_Structure.md](./Component_Structure.md) | Component inventory and responsibilities |
| [Design_System.md](./Design_System.md) | Visual language source of truth |
| [Future_Roadmap.md](./Future_Roadmap.md) | Phased product expansion |
| [Changelog.md](./Changelog.md) | Implementation history |

---

## Product positioning

Knowledge Vault is an **independent product module**. It evolves separately from:

- Admin Dashboard
- Analyst Platform
- Member Dashboard
- Payment System

Phase 1 lives on the homepage as a **preview**, but code should stay modular so it can extract into a dedicated Knowledge Vault experience in Phase 2 with minimal refactoring.

---

## Current branch

```text
feature/knowledge-vault
```

Base commit (branch start):

```text
cbc73886ef5f96a166c0178e3cc53d147b9e6030
```

---

## Commit convention

```text
feat(knowledge-vault): …
style(knowledge-vault): …
refactor(knowledge-vault): …
fix(knowledge-vault): …
docs(knowledge-vault): …
```

---

## Immediate milestone

**Knowledge Vault Homepage Preview** — elevate the existing Research Framework homepage section into a premium Knowledge Vault preview. No dedicated vault page, search, filters, or bookmarks in Phase 1.

Keep these docs synchronized with the codebase throughout implementation.
