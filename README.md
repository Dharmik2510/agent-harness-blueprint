<div align="center">

<img src="docs/public/logo.svg" width="96" alt="Agent Harness Blueprint logo" />

# Agent Harness Blueprint

### Turn VS Code Copilot into a reliable teammate

[![Docs site](https://img.shields.io/badge/docs-live-22d3ee?style=for-the-badge)](https://dharmik2510.github.io/agent-harness-blueprint/)
[![MIT](https://img.shields.io/badge/license-MIT-6366f1?style=for-the-badge)](LICENSE)
[![Copilot](https://img.shields.io/badge/VS_Code-Copilot-f97316?style=for-the-badge)](docs/start-here/setup-copilot.md)

**Visual course · 10 modules · 6 hands-on labs · Copy-ready templates**

[Start learning](https://dharmik2510.github.io/agent-harness-blueprint/start-here/quick-start) · [Lab 01](https://dharmik2510.github.io/agent-harness-blueprint/labs/lab-01-baseline-vs-harness) · [Templates](./templates/)

</div>

---

## Why this exists

Copilot writes code fast. It also says **"done"** when tests are red, forgets yesterday's session, and refactors three things at once.

**Harness engineering** fixes that — not with longer prompts, but with a **Reliability Loop** built into your repo:

```
Bootstrap → Scope → Build → Verify → Handoff → (repeat)
```

## Pick your path

| I want to… | Go here | Time |
|------------|---------|------|
| Fix my repo **today** | [15-min quick start](https://dharmik2510.github.io/agent-harness-blueprint/start-here/quick-start) | 15 min |
| **See proof** it works | [Lab 01 — baseline vs harness](./labs/lab-01-baseline-vs-harness/) | 45 min |
| **Read** the concepts | [Module catalog](https://dharmik2510.github.io/agent-harness-blueprint/modules/) | ~8 hrs |
| **Copy files** into a project | [templates/](./templates/) | 5 min |

## The five pillars

<table>
<tr>
<td align="center"><b>Instructions</b><br><sub>AGENTS.md · copilot-instructions</sub></td>
<td align="center"><b>State</b><br><sub>PROGRESS · feature_list</sub></td>
<td align="center"><b>Verification</b><br><sub>tests · lint · build</sub></td>
</tr>
<tr>
<td align="center"><b>Scope</b><br><sub>one feature at a time</sub></td>
<td align="center"><b>Lifecycle</b><br><sub>init.sh · handoff</sub></td>
<td align="center"><a href="https://dharmik2510.github.io/agent-harness-blueprint/"><b>Full course →</b></a></td>
</tr>
</table>

## Quick start (local)

```bash
git clone https://github.com/Dharmik2510/agent-harness-blueprint.git
cd agent-harness-blueprint
npm install && npm run docs:dev
# → http://localhost:5173/agent-harness-blueprint/
```

**Drop into your project:**

```bash
cp -r templates/universal/* /path/to/your/repo/
cp templates/copilot/minimal/copilot-instructions.md /path/to/your/repo/.github/
bash scripts/validate-harness.sh /path/to/your/repo
```

## What's inside

| Folder | What |
|--------|------|
| [`docs/`](./docs/) | VitePress course site (modules, labs, Copilot guide) |
| [`templates/`](./templates/) | Universal + Copilot harness packs |
| [`labs/knowledge-hub/`](./labs/knowledge-hub/) | React lab app |
| [`skills/harness-scaffolder/`](./skills/harness-scaffolder/) | Agent skill to scaffold harnesses |

## Docs & deploy

```bash
npm run docs:dev      # local preview
npm run docs:build    # production build
npm run validate      # score harness completeness
```

Live site: **https://dharmik2510.github.io/agent-harness-blueprint/**

## License

MIT — see [LICENSE](./LICENSE).
