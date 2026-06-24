# Copilot skills and hooks

*~8 min read*

## Agent Skills

Skills package repeatable workflows in `.github/skills/<name>/SKILL.md`.

Use when:

- Same multi-step process runs weekly (release, harness audit, migration)
- You want `/skill-name` invocation without re-prompting

This repo ships [`harness-scaffolder`](https://github.com/Dharmik2510/agent-harness-blueprint/tree/main/skills/harness-scaffolder) — scaffolds harness files for new projects.

Create new skills with `/create-skill` in Copilot Chat.

### Skill structure

```text
.github/skills/harness-audit/
├── SKILL.md          # Main skill instructions
└── references/       # Optional supporting docs
```

## Hooks (preview)

Hooks run scripts at agent lifecycle events (session start, before tool use, etc.).

Location: `.github/hooks/` (see current VS Code docs for supported events).

**Use for:**

- Remind agent to run `init.sh`
- Block edits to protected paths
- Log session activity

Hooks complement — not replace — instruction files.

## MCP integration

Connect external tools via `.vscode/mcp.json` (issue trackers, docs, databases).

Harness tip: document MCP usage rules in `copilot-instructions.md` (when to call which server).

## Related

- [harness-scaffolder skill](https://github.com/Dharmik2510/agent-harness-blueprint/tree/main/skills/harness-scaffolder)
- [VS Code customization overview](https://code.visualstudio.com/docs/copilot/customization/overview)
