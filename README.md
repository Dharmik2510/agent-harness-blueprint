# Agent Harness Blueprint

**Make AI coding agents reliable** — a beginner-friendly course for teams using VS Code Copilot (and other agents).

> Inspired by [walkinglabs/learn-harness-engineering](https://github.com/walkinglabs/learn-harness-engineering). All content here is **original and rephrased** for clarity — not a fork or translation.

## 15-minute quick start

If you use **VS Code Copilot** on a real project today, do this now:

1. **Open** your repo in VS Code with Copilot Chat enabled.
2. **Run** `/init` in chat to draft `.github/copilot-instructions.md`.
3. **Copy** the [Minimal Harness Pack](./templates/universal/) into your project root:
   - `AGENTS.md` — operating manual for any agent
   - `PROGRESS.md` — session log
   - `feature_list.json` — scoped task list
   - `scripts/init.sh` — install + verify before each session
4. **Copy** the [Copilot Harness Pack](./templates/copilot/minimal/) into `.github/`.
5. **Run** `bash scripts/init.sh` before every agent session.
6. **End** each session with the [Session Handoff](./templates/universal/SESSION_HANDOFF.md) checklist.

Validate your setup:

```bash
bash scripts/validate-harness.sh /path/to/your/repo
```

## What you'll learn

Harness engineering is **not** prompt engineering. It is designing the system around the model:

| Pillar | What it does |
|--------|----------------|
| **Instructions** | Tell the agent what to do and what to read first |
| **State** | Persist progress so the next session continues, not restarts |
| **Verification** | Require proof (tests, lint) before "done" |
| **Scope** | One feature at a time with explicit definition of done |
| **Lifecycle** | Bootstrap at start, clean handoff at end |

```text
  You give a task
       │
       ▼
  Agent reads harness files (instructions, state, scope)
       │
       ▼
  Agent works on ONE scoped item
       │
       ▼
  Agent runs verification ──fail──► fix and retry
       │ pass
       ▼
  Agent updates progress + handoff notes
```

## Learning path

| Step | Time | What |
|------|------|------|
| 1 | ~20 min | [Glossary](./docs/start-here/glossary.md) + [Copilot setup](./docs/start-here/setup-copilot.md) |
| 2 | ~2 hrs | Modules M01–M03 (foundations) |
| 3 | ~1 hr | [Lab 01](./labs/lab-01-baseline-vs-harness/) — see the difference |
| 4 | ~1 week | Modules M04–M10 + Labs 02–06 (part-time) |

**Full docs site:** run `npm install && npm run docs:dev` locally, or visit the GitHub Pages site after deploy.

## Repository layout

```text
agent-harness-blueprint/
├── docs/           # VitePress course (modules, labs, guides)
├── templates/      # Copy-ready harness packs (universal, copilot, cursor)
├── labs/           # Hands-on lab code (knowledge-hub app)
├── skills/         # harness-scaffolder agent skill
└── scripts/        # init.sh, validate-harness.sh
```

## Scaffold a harness for your project

```bash
npx skills add dharmiksoni/agent-harness-blueprint --skill harness-scaffolder
```

Or copy templates manually from [`templates/`](./templates/).

## Docs commands

```bash
npm install
npm run docs:dev      # local site at http://localhost:5173
npm run docs:build    # production build
npm run validate      # score this repo's harness
```

## Attribution

See [ATTRIBUTION.md](./ATTRIBUTION.md). This course synthesizes ideas from OpenAI, Anthropic, Microsoft, and the walkinglabs community — expressed in our own words with Copilot-first guidance.

## License

MIT — see [LICENSE](./LICENSE).
