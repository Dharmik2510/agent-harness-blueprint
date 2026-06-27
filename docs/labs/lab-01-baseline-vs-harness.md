# Lab 01 — Baseline vs harness

*~45 min · Pillar focus: the whole loop (baseline) · Pairs with [Module F2](../modules/f2-the-harness-and-the-scorecard)*

::: tip Measure first
**Starting score (typical): 5/100.** **Target after this lab: ~30/100.**
Run before and after:
```bash
cd labs/knowledge-hub
npx --yes harness-score .
```
:::

## What you'll build

You'll run Copilot on the Knowledge Hub app **with no harness**, watch it drift and claim done on broken code, then **score the repo**, add a handful of harness files, and **re-score** to see the number jump. This is the entire course in miniature: measure → improve → measure.

## Setup

```bash
cd labs/knowledge-hub
npm install
npm run dev   # http://localhost:5174 — a tiny React document search
```

Knowledge Hub is a Vite + React app. Search logic lives in `src/lib/search.ts` (with `src/lib/search.test.ts`), the UI in `src/App.tsx`. There is a real test script (`npm test` → vitest) and a lint script.

## Part A — Run Copilot blind, then score the repo

1. Open `labs/knowledge-hub` in VS Code with **no harness files added**.
2. Open Copilot Chat and paste the **Baseline** prompt (see [Copilot prompts](#copilot-prompts)). It asks for search highlighting and says nothing about tests, scope, or "done."
3. Watch what happens. Typical failures:
   - Copilot **claims it's done** without running `npm test`.
   - It edits unrelated files or restyles things you didn't ask for.
   - There is no record of what it did — close the chat and the context is gone.
4. Now score the bare repo:

```bash
npx --yes harness-score .
```

You'll see roughly:

```
5/100  Prompt-only
📜 Instructions   0/20   ← weakest
🧠 State          0/20
✅ Verification    5/20
🎯 Scope          0/20
🔁 Lifecycle      0/20
```

The agent is flying blind. The only points come from tests already existing in the project. **The failures you saw are missing-system problems, not model problems.**

## Part B — Add a minimal harness

Create these four files in `labs/knowledge-hub`. They are small on purpose — this is the floor, not the ceiling.

**`AGENTS.md`**

```markdown
# AGENTS.md — Knowledge Hub

Vite + React team document search. Lab app for Agent Harness Blueprint.

## Commands
- `npm run dev` — start the app on http://localhost:5174
- `npm run lint` — eslint, must pass with zero warnings
- `npm test` — vitest run
- `npm run build` — typecheck + build

## Hard constraints
- Work on **one feature at a time** — see `feature_list.json`.
- **Do not claim done** until `npm run lint`, `npm test`, and `npm run build` all pass.
- Record what you did in `PROGRESS.md` before ending a session.

## Where to start
Read `PROGRESS.md` and `feature_list.json` first.
```

**`.github/copilot-instructions.md`**

```markdown
# Copilot instructions — Knowledge Hub

Follow `AGENTS.md`. Before any change, read `PROGRESS.md` and `feature_list.json`.

- One feature at a time. Never refactor outside the selected feature.
- You must run `npm run lint` and `npm test` before saying a feature is done.
- Do not mark a feature done until verification passes.
```

**`feature_list.json`**

```json
{
  "features": [
    {
      "id": "search-highlight",
      "title": "Highlight matching query text in search results",
      "status": "open",
      "acceptance": [
        "Matching query text is visually highlighted in result title and body",
        "npm run lint passes",
        "npm test passes"
      ]
    }
  ]
}
```

**`PROGRESS.md`**

```markdown
# PROGRESS

## Session log
- (empty — first session)

## Next step
Implement feature `search-highlight` from `feature_list.json`. Resume here.
```

Now re-run Copilot with the **Harness** prompt below. It points at the files you just wrote, so the agent reads state, stays on one feature, and verifies before claiming done.

## Verify your gain

Re-score:

```bash
npx --yes harness-score .
```

Expected per-pillar delta from the four files:

| Pillar | Before | After | Why |
|--------|:--:|:--:|-----|
| 📜 Instructions | 0 | 20 | AGENTS.md + copilot-instructions.md + constraints + concise |
| 🧠 State | 0 | 15 | PROGRESS.md + feature_list.json + an exact next step |
| ✅ Verification | 5 | 15 | verify commands + "don't claim done" rule + tests exist |
| 🎯 Scope | 0 | 5 | one-feature rule (status/acceptance added in Lab 04) |
| 🔁 Lifecycle | 0 | 10 | instructions point at PROGRESS/feature_list |
| **Total** | **5** | **~30** | |

The number jumped because you supplied a **system**, not because the model got smarter. That is the whole idea.

::: warning Don't chase 100 yet
This lab only proves the loop. Labs 02–05 take each pillar to 20/20; Lab 06 assembles the full 90+ harness.
:::

## Copilot prompts

**Baseline (no harness — observe the gap):**

```text
Add highlight snippets to search results in this React app.
When the user searches, matching parts of the title and body should be
visually highlighted. Mark the task done when finished.
```

**Harness (files installed):**

```text
Follow AGENTS.md and .github/copilot-instructions.md.
1. Read PROGRESS.md and feature_list.json.
2. Work only on feature id "search-highlight".
3. Implement every acceptance criterion.
4. Run npm run lint and npm test before claiming done.
5. Update PROGRESS.md with what you did and the verification output.
6. Mark the feature done only if all checks pass.
```

**Reflection:**

```text
Compare my baseline and harness runs. For each failure in the baseline,
which of the five pillars prevented it in the harness run?
```

## Checkpoint

- [ ] Baseline score recorded (~5/100) and you saw at least one real failure
- [ ] Four harness files exist in `labs/knowledge-hub`
- [ ] Re-score is ~30/100 and you can name which file moved which pillar
- [ ] The harness run verified before claiming done

## Next

[Lab 02 — Agent-readable workspace](./lab-02-agent-readable-workspace) — take the Instructions pillar to a clean 20/20.
