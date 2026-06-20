# M06 — Every session starts the same way

*~8 min read · Part 2 — Workspace Design · Prerequisites: [M05](./m05-progressive-instructions)*

## The problem

Session 1: agent fights `npm install` errors for 15 minutes. Session 2: different Node version, tests fail mysteriously. Each chat reinvents environment setup.

## The idea

**Bootstrap is its own phase.** Before feature work, the agent must prove the environment is healthy.

`scripts/init.sh` should:

1. Install dependencies
2. Run quick health checks (lint or typecheck smoke)
3. Optionally start dev services
4. Exit non-zero on failure (agent must fix before coding)

## Copilot in practice

Add to `.github/copilot-instructions.md`:

```markdown
## Session start (required)
1. Run `bash scripts/init.sh` before any feature work
2. If init fails, fix environment issues first — do not patch around them
3. Report init output summary in chat
```

Copilot can run terminal commands when permitted — make init the **first** command every session.

## Universal pattern

Example `scripts/init.sh` structure:

```bash
#!/usr/bin/env bash
set -euo pipefail
npm ci
npm run lint
npm test -- --passWithNoTests
echo "✓ Environment ready"
```

Customize for your stack (Python `pip install`, `docker compose up`, etc.).

## Try it

Write `init.sh` for your repo. Run it twice on a clean clone. Both runs should succeed identically.

## Checkpoint

1. Why should init run before feature work?
2. What should init.sh do on failure?
3. Where do you document the init requirement?

<details>
<summary>Answers</summary>

1. Prevents wasting context on environment debugging mid-task.
2. Exit non-zero so the agent must fix the environment first.
3. `AGENTS.md`, `copilot-instructions.md`, and session opener prompts.

</details>

Next: [M07 — Pick up where you left off](./m07-state-across-sessions)
