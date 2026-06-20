# Templates

Copy-ready harness packs. Customize stack versions and verification commands for your project.

## Minimal Harness Pack (universal)

Path: [`templates/universal/`](https://github.com/dharmiksoni/agent-harness-blueprint/tree/main/templates/universal)

| File | Purpose |
|------|---------|
| `AGENTS.md` | Portable operating manual |
| `PROGRESS.md` | Session log template |
| `feature_list.json` | Scope contract |
| `feature_list.schema.json` | JSON schema for validation |
| `SESSION_HANDOFF.md` | End-of-session checklist |
| `scripts/init.sh` | Bootstrap script |

```bash
cp -r templates/universal/AGENTS.md templates/universal/PROGRESS.md \
      templates/universal/feature_list.json templates/universal/SESSION_HANDOFF.md \
      /path/to/your/repo/
mkdir -p /path/to/your/repo/scripts
cp templates/universal/scripts/init.sh /path/to/your/repo/scripts/
chmod +x /path/to/your/repo/scripts/init.sh
```

## Copilot Harness Pack

Path: [`templates/copilot/minimal/`](https://github.com/dharmiksoni/agent-harness-blueprint/tree/main/templates/copilot/minimal)

```bash
mkdir -p /path/to/your/repo/.github/instructions /path/to/your/repo/.github/agents
cp templates/copilot/minimal/copilot-instructions.md /path/to/your/repo/.github/
cp templates/copilot/minimal/instructions/*.md /path/to/your/repo/.github/instructions/
cp templates/copilot/minimal/agents/*.md /path/to/your/repo/.github/agents/
```

## Cursor mirror (optional)

Path: [`templates/cursor/rules/harness.mdc`](https://github.com/dharmiksoni/agent-harness-blueprint/tree/main/templates/cursor)

## Validate after copy

```bash
bash scripts/validate-harness.sh /path/to/your/repo
```

## Scaffold with skill

```bash
npx skills add dharmiksoni/agent-harness-blueprint --skill harness-scaffolder
```

Ask the agent: "Scaffold a Copilot harness for this repo."
