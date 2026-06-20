# Setup: Other Agents

*~8 min read · Prerequisites: [Glossary](./glossary)*

This course is **Copilot-first**, but harness principles are tool-agnostic. The same five pillars apply everywhere.

## Quick mapping

See the full [Provider comparison](../guide/providers) page. Summary:

| Harness piece | Copilot (VS Code) | Cursor | Claude Code | Codex |
|---------------|-------------------|--------|-------------|-------|
| Global instructions | `.github/copilot-instructions.md` | `.cursor/rules` or `AGENTS.md` | `CLAUDE.md` | `AGENTS.md` |
| Scoped instructions | `.github/instructions/*.instructions.md` | `.cursor/rules/*.mdc` | `.claude/rules/` | — |
| Skills | `.github/skills/` | `.cursor/skills/` | `.claude/skills/` | `.codex/skills/` |
| Subagents | `.github/agents/*.agent.md` | `.cursor/agents/` | `.claude/agents/` | `.codex/config.toml` |
| Hooks | `.github/hooks/` | `.cursor/hooks.json` | `.claude/settings.json` | `.codex/config.toml` |
| MCP | `.vscode/mcp.json` | `.cursor/mcp.json` | `.mcp.json` | `.codex/config.toml` |

## Universal files (all tools)

These work regardless of vendor:

- `AGENTS.md` — recognized by Copilot, Cursor, Codex, and others
- `PROGRESS.md` — session state
- `feature_list.json` — scope contract
- `scripts/init.sh` — environment bootstrap
- `SESSION_HANDOFF.md` — end-of-session checklist

Copy from [`templates/universal/`](https://github.com/dharmiksoni/agent-harness-blueprint/tree/main/templates/universal).

## Cursor

Copy optional mirror from [`templates/cursor/`](https://github.com/dharmiksoni/agent-harness-blueprint/tree/main/templates/cursor):

- `.cursor/rules/harness.mdc` — core harness rules
- Reference `AGENTS.md` from rules to avoid duplication

## Claude Code

- Add `CLAUDE.md` at repo root (can `@import` or summarize `AGENTS.md`)
- Skills in `.claude/skills/`
- Hooks in `.claude/settings.json` for session guardrails

## OpenAI Codex

- Primary prompt surface: `AGENTS.md`
- Extended config under `.codex/` (skills, MCP, agents in `config.toml`)

## Recommendation for mixed teams

1. Maintain **one** `AGENTS.md` as the source of truth for project facts.
2. Generate or mirror tool-specific wrappers (Copilot instructions, Cursor rules) that **point to** AGENTS.md sections — don't duplicate conflicting rules.
3. Keep **state and verification files** identical across tools (`PROGRESS.md`, `feature_list.json`, `init.sh`).

## Next step

Continue with [M01 — When the model is not the problem](../modules/m01-when-the-model-is-not-the-problem) or jump to [Lab 01](../labs/lab-01-baseline-vs-harness) if you learn by doing.
