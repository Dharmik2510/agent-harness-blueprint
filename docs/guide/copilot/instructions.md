# Copilot instructions files

*~10 min read*

## Always-on instructions

### `.github/copilot-instructions.md`

Auto-included in every Copilot Chat request for the workspace.

**Use for:** verification gates, session lifecycle, scope rules, security constraints.

**Keep under ~100 lines.** Link to `docs/` for depth.

Generate starter with `/init` in Copilot Chat.

### `AGENTS.md`

Portable across agents. Copilot also reads this when present at workspace root.

**Strategy:** Write `AGENTS.md` as source of truth; keep `copilot-instructions.md` as Copilot-specific session rules that reference it.

## Scoped instructions

### `.github/instructions/*.instructions.md`

Applied when agent works on matching paths.

```markdown
---
applyTo: "src/api/**"
---
# API route conventions
- Use Zod for request validation
- Return RFC 7807 problem+json errors
```

Create with `/create-instruction` or copy from [templates](https://github.com/dharmiksoni/agent-harness-blueprint/tree/main/templates/copilot/minimal/instructions).

## Frontmatter reference

| Field | Purpose |
|-------|---------|
| `applyTo` | Glob pattern for files |
| `excludeAgent` | Optional: `"code-review"` or `"cloud-agent"` |

## Anti-patterns

- One 500-line `copilot-instructions.md`
- Duplicating the same rule in five files without sync plan
- Instructions that say "write good code" without verifiable commands

## Related

- [M05 — Small maps beat giant manuals](../../modules/m05-progressive-instructions)
- [Provider comparison](../providers)
