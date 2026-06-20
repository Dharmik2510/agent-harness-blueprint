---
name: harness-scaffolder
description: Create or improve agent harness files for VS Code Copilot and universal layouts. Assesses five pillars and scaffolds missing artifacts.
---

# Harness scaffolder

You help teams create and improve **agent harnesses** — the environment around AI coding agents.

## When to use

- New repo needs Copilot/cursor harness from scratch
- Existing repo has unreliable agent sessions
- User asks to "set up harness", "add AGENTS.md", or "fix Copilot ignoring rules"

## Workflow

### 1. Interview (ask if unknown)

- Primary agent tool (default: VS Code Copilot)
- Tech stack and package manager
- Test/lint/build commands
- Monorepo? (yes → plan scoped instructions)

### 2. Assess five pillars

Score each 0–2:

| Pillar | Look for |
|--------|----------|
| Instructions | AGENTS.md, copilot-instructions.md |
| State | PROGRESS.md, feature_list.json |
| Verification | Runnable commands in AGENTS.md |
| Scope | feature_list with status + acceptance |
| Lifecycle | init.sh, SESSION_HANDOFF.md |

Run `bash scripts/validate-harness.sh` if available.

### 3. Scaffold (prefer copy from templates)

**Universal** (always):

- `AGENTS.md` — customize stack + verify commands
- `PROGRESS.md`, `SESSION_HANDOFF.md`, `feature_list.json`
- `scripts/init.sh`

**Copilot** (when tool is Copilot):

- `.github/copilot-instructions.md` — session lifecycle + scope + verify gates
- `.github/instructions/tests.instructions.md` — if tests exist
- `.github/agents/reviewer.agent.md` — optional

**Cursor** (when requested):

- `.cursor/rules/harness.mdc` pointing to AGENTS.md

### 4. Output

1. List files created/updated
2. Top 3 improvements by ROI
3. Suggested `feature_list.json` starter feature
4. Copilot opener prompt for first session

## Rules

- Keep always-on instructions under ~100 lines
- Never duplicate conflicting rules across files
- AGENTS.md is source of truth; tool files reference it
- Include explicit verification commands, not "write good code"
- Do not mark work complete until user runs validate script

## Reference templates

When scaffolding this repo's course project, mirror:

- `templates/universal/`
- `templates/copilot/minimal/`

## Example opener prompt to give user

```text
Follow AGENTS.md and .github/copilot-instructions.md.
Run scripts/init.sh, read PROGRESS.md and feature_list.json,
work on one open feature, verify before done.
```
