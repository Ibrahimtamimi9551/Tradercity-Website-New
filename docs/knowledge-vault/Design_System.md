# Knowledge Vault — Design System

Source of truth for visual language on Knowledge Vault surfaces (homepage preview first; dedicated vault later).

Align with TraderCity’s premium marketing language. Prefer clarity and restraint over novelty. When this conflicts with a one-off homepage experiment, **this doc wins for Knowledge Vault work**.

---

## Design philosophy

- Premium over flashy
- Less is more
- One composition, clear hierarchy
- Motion for presence — not noise
- Extractable components, consistent shells

Avoid generic AI-default looks (purple-on-white themes, warm cream + terracotta clichés, broadsheet denseness) unless the live marketing system already requires a matching token.

---

## Typography

| Role | Intent |
|------|--------|
| Section hero / brand signal | Strong, expressive; vault identity must read before supporting copy |
| Headline | One clear job per subsection |
| Supporting sentence | Short; secondary to headline |
| Body / lesson / report | Optimized for reading comfort and scanability |
| Meta / labels | Quiet; never compete with titles |

Rules:

- Prefer purposeful type already used by the marketing site over default system stacks.
- Do not let body or meta overpower the hero signal.
- Maintain readable measure in lesson preview and report reader.

*(Fill concrete font families, sizes, and weights here as Phase 1 tokens are locked.)*

---

## Spacing

- Use a consistent vertical rhythm between hero → stats → categories → lesson/report → journey.
- Prefer generous section breathing room over packed card grids.
- Mobile: collapse density carefully; keep one primary focus per scroll beat.

*(Record spacing scale / Tailwind spacing decisions as they stabilize.)*

---

## Border radius

- Keep radius language consistent across stats, category cards, and reader chrome.
- Avoid mixing sharp editorial rules with heavy soft pills in the same subsection.
- Hero: avoid card-like inset media frames unless the existing system already mandates them.

*(Lock radius tokens during implementation.)*

---

## Card system

Default for marketing heroes: **no cards**.

For Knowledge Vault preview:

- Cards are allowed when they are the container for **interaction** (category selection, lesson/report focus).
- If removing border, shadow, background, or radius does not hurt understanding, it should not be a card.
- Stats and categories should feel related, not like a dashboard widget grid.

---

## Hover behaviour

- Subtle elevation, border, or underline shifts — not aggressive glow stacks.
- Keyboard focus must be as clear as hover.
- Hover should reveal affordance, not rearrange layout.

---

## Color identity

| Concern | Guidance |
|---------|----------|
| Section atmosphere | Depth via restrained gradients / existing background language |
| Accent | Align with TraderCity marketing accents already in use |
| Text | High readability on atmospheric backgrounds |
| Reader chrome | Calm; content is the hero |

*(Document exact CSS variables / Tailwind tokens as they are chosen.)*

---

## Animation rules

Ship intentional motion (typically 2–3 section-level beats), for example:

1. Hero / section entrance
2. Category or stats reveal
3. Lesson/report focus transition or journey entrance

Rules:

- Prefer opacity / translate / soft stagger over bounce and glow
- Respect `prefers-reduced-motion`
- No decorative motion that distracts from reading

---

## Section hierarchy

```text
1. Hero                    — Research. Frameworks. Context.
2. Statistics              — proof of depth
3. Knowledge Categories    — map of the vault
4. Lesson Preview          — education taste
5. Report Reader           — research taste
6. Journey Section         — story / heritage close
```

Each block: one purpose, one headline, usually one short supporting sentence.

---

## Accessibility

- Semantic section landmarks and headings
- Sufficient contrast for body and controls
- Focus-visible states on interactive category / reader controls
- Reduced-motion friendly transitions

---

## Update policy

When Phase 1 implementation locks a token (type size, radius, color variable, motion timing), update this file in the same PR / commit slice whenever practical so the design system stays synchronized with code.
