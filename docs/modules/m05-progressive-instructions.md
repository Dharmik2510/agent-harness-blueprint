# M05 — Small maps beat giant manuals

*~8 min read · Part 2 — Workspace Design · Prerequisites: [M04](./m04-repo-as-source-of-truth)*

## The problem

Someone merged a 600-line `copilot-instructions.md`. The agent skims it, misses the security section, and ships an unsafe default.

## The idea

**Progressive disclosure:** give a short map with links. The agent pulls detail on demand.

```text
AGENTS.md (≤80 lines)
├── Project summary
├── Verification commands
├── Hard constraints (bullets)
└── Doc map →
    ├── docs/api.md
    ├── docs/frontend.md
    └── docs/testing.md
```

Scoped rules live in small files applied only when relevant.

## Copilot in practice

Create `.github/instructions/frontend.instructions.md`:

```markdown
---
applyTo: "packages/frontend/**"
---
# Frontend conventions
- Functional components only
- Colocate tests as *.test.tsx
- Use design tokens from packages/ui/tokens.ts
```

Keep `.github/copilot-instructions.md` for rules that apply **everywhere** (security, PR hygiene, verification gates).

Use `/create-instruction` to generate new scoped files instead of bloating the root file.

## Universal pattern

| Content type | Where it lives |
|--------------|----------------|
| Always-on rules | `AGENTS.md`, `copilot-instructions.md` |
| Folder-specific | `.github/instructions/*.instructions.md` |
| Deep reference | `docs/` tree linked from map |

## Try it

Split an oversized instruction file: move 50%+ content into `docs/` and leave a 10-line map in the root file.

## Checkpoint

1. What is progressive disclosure?
2. When should you use `*.instructions.md` instead of the root file?
3. What is a reasonable max length for always-on instructions?

<details>
<summary>Answers</summary>

1. Short index + links; detail loaded when needed.
2. When rules apply only to specific paths, languages, or frameworks.
3. Roughly 80–120 lines; shorter is better if links cover the rest.

</details>

Next: [M06 — Every session starts the same way](./m06-session-bootstrap)
