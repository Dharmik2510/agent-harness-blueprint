# AGENTS.md — Operating manual for AI coding agents

## Project

**Name:** [Your project name]  
**Purpose:** [1–2 sentences: what this repo does]

## Tech stack

| Layer | Choice | Version |
|-------|--------|---------|
| Runtime | Node.js | see `.nvmrc` |
| Framework | [e.g. React + Vite] | [version] |
| Tests | [e.g. Vitest] | [version] |

## Commands

```bash
# Install and verify environment
bash scripts/init.sh

# Development
npm run dev

# Verification (run ALL before claiming done)
npm run lint
npm test
npm run build
```

## Hard constraints

- Do not commit secrets or `.env` files
- One feature at a time — see `feature_list.json`
- Do not mark work done until verification passes
- Prefer small, focused commits referencing feature ids

## Session lifecycle

**Start:** run `init.sh` → read `PROGRESS.md` → read `feature_list.json` → pick one `open` feature  
**End:** update `PROGRESS.md` → update feature status → complete `SESSION_HANDOFF.md`

## Doc map

- Architecture: `docs/architecture.md`
- API conventions: `docs/api.md`
- Testing guide: `docs/testing.md`

## Tool-specific notes

- **VS Code Copilot:** also follow `.github/copilot-instructions.md`
- **Cursor:** see `.cursor/rules/` if present
