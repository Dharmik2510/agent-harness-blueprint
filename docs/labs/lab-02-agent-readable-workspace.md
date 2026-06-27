# Lab 02 — Agent-readable workspace

*~1 hr · Pillar focus: Instructions 📜 · Pairs with [Module P1](../modules/p1-instructions)*

::: tip Measure first
**Starting score (typical): ~30/100** (carry the Lab 01 harness in). **Target after this lab: Instructions 20/20.**
Run before and after:
```bash
cd labs/knowledge-hub
npx --yes harness-score .
```
:::

## What you'll build

A workspace Copilot can read like a teammate would: an **AGENTS.md** operating manual, a **tool-specific** instruction file, explicit **hard constraints**, and instructions kept **concise** with links out to deeper docs. Four criteria, five points each — you're driving the Instructions pillar to a clean 20/20.

The Instructions pillar scores:

| Criterion | Points | How to earn it |
|-----------|:--:|----------------|
| `AGENTS.md` exists at root | 5 | create it |
| Tool file exists (`.github/copilot-instructions.md` / `CLAUDE.md`) | 5 | create it |
| Hard constraints present (must / never / do not) | 5 | spell out rules |
| Concise (AGENTS.md under ~200 lines, links out) | 5 | keep it short |

## Setup

```bash
cd labs/knowledge-hub
npm install
```

Continue in the same app from Lab 01. If you skipped it, create the four Lab 01 files first.

## Part A — See where Instructions leaks points

Score and look only at the 📜 row:

```bash
npx --yes harness-score .
```

If your AGENTS.md is missing a section, balloons past 200 lines, or has no must/never language, you'll lose 5 points per gap. The "Fix next" list tells you exactly which criterion is unmet. Note your current Instructions sub-score.

## Part B — Write the instruction set

Replace `AGENTS.md` with a complete-but-concise operating manual. It links to a deeper architecture doc instead of inlining everything — that's progressive disclosure, and it's also what keeps you under the line limit.

**`AGENTS.md`**

```markdown
# AGENTS.md — Knowledge Hub

Vite + React + TypeScript team document search. Lab app for Agent Harness Blueprint.

## Doc map (read in this order)
1. `PROGRESS.md` — what happened last, and the exact next step
2. `feature_list.json` — the backlog and acceptance criteria
3. `docs/architecture.md` — components, data flow, where things live

## Stack
- React 19 + Vite 6, TypeScript, Vitest for tests, ESLint for lint.
- Search logic: `src/lib/search.ts` (pure functions, unit-tested).
- UI: `src/App.tsx`. Types: `src/types.ts`.

## Commands
- `npm run dev` — http://localhost:5174
- `npm run lint` — eslint, must pass with zero warnings
- `npm test` — vitest run
- `npm run build` — typecheck + build

## Hard constraints
- You **must** work on one feature at a time — see `feature_list.json`.
- You **must** run `npm run lint` and `npm test` before claiming done.
- **Never** refactor code outside the selected feature.
- **Do not** mark a feature done until verification passes.
- Keep search logic pure and tested; UI stays in `src/App.tsx`.

## Conventions
- TypeScript strict. No `any`. Prefer small pure functions in `src/lib`.
- New search behavior gets a unit test in `src/lib/*.test.ts`.
```

Create the architecture doc the manual links to (this is what keeps AGENTS.md short):

**`docs/architecture.md`**

```markdown
# Architecture — Knowledge Hub

## Components
- `src/main.tsx` — React entry point, mounts `<App/>`.
- `src/App.tsx` — search input + results list. Holds `query` state.
- `src/lib/search.ts` — `searchDocuments(docs, query)`: pure filter, no UI.
- `src/types.ts` — `Document { id, title, body }`.

## Data flow
User types → `query` state in App → `searchDocuments` filters SAMPLE_DOCS
→ results render in a `<ul>`. No network, no store — all in memory.

## Where to add things
- New search rules → `src/lib/search.ts` (+ a test in `search.test.ts`).
- New UI → `src/App.tsx`.
- New data shapes → `src/types.ts`.
```

Mirror the rules into the tool-specific file so Copilot loads them automatically:

**`.github/copilot-instructions.md`**

```markdown
# Copilot instructions — Knowledge Hub

Follow `AGENTS.md`. Read its doc map before editing: `PROGRESS.md`,
then `feature_list.json`, then `docs/architecture.md`.

## Rules
- One feature at a time. **Never** touch files outside the selected feature.
- You **must** run `npm run lint` and `npm test` before saying done.
- **Do not** mark a feature done until all verification passes.
- New search behavior **must** ship with a unit test.
```

## Verify your gain

```bash
npx --yes harness-score .
```

Expected: 📜 **Instructions 20/20**.

| Criterion | Before | After |
|-----------|:--:|:--:|
| AGENTS.md exists | 5 | 5 |
| Tool file exists | 5 | 5 |
| Hard constraints (must/never/do not) | 0–5 | 5 |
| Concise + links out | 0–5 | 5 |

If you're short 5, check: does AGENTS.md contain must/never/do not language, and is it under ~200 lines? The whole point of the architecture doc is to keep AGENTS.md skimmable.

## Copilot prompts

**Have Copilot draft the architecture doc from the real code:**

```text
Read src/ for the Knowledge Hub app. Write docs/architecture.md:
a component map and a one-paragraph data-flow description.
Keep it under 40 lines. Do not change any source files.
```

**Audit your own instructions for the rubric:**

```text
Review AGENTS.md and .github/copilot-instructions.md against the
Harness Scorecard Instructions pillar: (1) AGENTS.md exists,
(2) a tool instruction file exists, (3) hard constraints use
must/never/do not, (4) AGENTS.md is concise and links out.
List any criterion not yet met and a one-line fix.
```

## Checkpoint

- [ ] `AGENTS.md`, `.github/copilot-instructions.md`, `docs/architecture.md` all exist
- [ ] AGENTS.md uses must/never/do not language and stays under ~200 lines
- [ ] Instructions pillar reads **20/20**
- [ ] A fresh Copilot session can find the architecture in under 2 minutes

## Next

[Lab 03 — Multi-session continuity](./lab-03-multi-session-continuity) — make work survive the end of a chat: State to 20/20.
