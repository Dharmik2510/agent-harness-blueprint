# AGENTS.md — Agent Harness Blueprint course repo

## Project

Educational repository: beginner harness engineering course with VS Code Copilot support.

## Commands

```bash
npm install
npm run docs:dev      # VitePress local site
npm run docs:build    # production build
npm run validate      # harness self-check
bash scripts/init.sh  # install + verify course repo
```

## Verification (before claiming done)

```bash
npm run docs:build
bash scripts/validate-harness.sh .
```

## Hard constraints

- All course content must be original prose
- Every module needs Copilot + universal sections
- Keep copilot-instructions.md in sync with harness principles

## Doc map

- Course index: `docs/index.md`
- Modules: `docs/modules/`
- Labs: `docs/labs/` + `labs/`
- Templates: `templates/`

## Session lifecycle

Read PROGRESS.md and feature_list.json before multi-session work on this repo.
