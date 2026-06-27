# Lab 03 — Multi-session continuity

*~1 hr · Pillar focus: State 🧠 · Pairs with [Module P2](../modules/p2-state)*

::: tip Measure first
**Starting score (typical): ~50/100** (Instructions already at 20 from Lab 02). **Target after this lab: State 20/20.**
Run before and after:
```bash
cd labs/knowledge-hub
npx --yes harness-score .
```
:::

## What you'll build

Memory that outlives a chat window. You'll add a **PROGRESS.md** running log, a **feature_list.json** backlog, a **SESSION_HANDOFF.md** end-of-session note, and an **exact next step** — then prove it works by finishing a feature across **two separate Copilot chats** with zero verbal recap.

The State pillar scores:

| Criterion | Points | File |
|-----------|:--:|------|
| Running log exists | 5 | `PROGRESS.md` |
| Backlog exists | 5 | `feature_list.json` |
| Handoff note exists | 5 | `SESSION_HANDOFF.md` |
| State records the **exact next step** | 5 | next/resume language in PROGRESS or HANDOFF |

## Setup

```bash
cd labs/knowledge-hub
npm install
```

Carry in the Lab 02 harness. Add the feature you'll build across two sessions:

**add to `feature_list.json`**

```json
{
  "id": "doc-count-badge",
  "title": "Show match count badge next to the search input",
  "status": "open",
  "acceptance": [
    "Badge shows the number of matching documents",
    "Badge is hidden when the query is empty",
    "npm test passes"
  ]
}
```

## Part A — Watch state get lost (and score the gap)

Score and read the 🧠 row:

```bash
npx --yes harness-score .
```

You likely have PROGRESS.md and feature_list.json from earlier labs (10 pts), but **no SESSION_HANDOFF.md** and maybe no explicit next step — that's the 10 points you're leaving on the table. To feel why it matters: start a feature, then close the chat. A new chat has no idea what you did or what's next.

## Part B — Add the state files

**`PROGRESS.md`** (a real running log with an exact next step)

```markdown
# PROGRESS

## Session log
- 2026-06-27 · Session 1 · Started feature `doc-count-badge`.
  Added the badge UI skeleton in src/App.tsx. Count not wired up yet.
  Verification: not run (feature not done).

## Exact next step
Resume feature `doc-count-badge`: compute results.length, render it in
the badge, hide the badge when query is empty, add a test, then verify.
```

**`SESSION_HANDOFF.md`**

```markdown
# SESSION HANDOFF

## Handoff checklist
- [x] PROGRESS.md updated with what I did
- [x] Exact next step written down
- [ ] Feature marked done (NO — verification not run yet)

## Active feature
`doc-count-badge` — status: in_progress

## Pick up here
Open src/App.tsx. The badge element exists but shows nothing.
Next: bind it to results.length, hide when query is empty,
add a test in src/lib, run npm test, then mark done.

## Watch out for
Keep the empty-query case: badge must not render when query is "".
```

`feature_list.json` already holds the backlog from Setup. That's all four State criteria covered.

## Part B.2 — Prove it: two sessions, no recap

**Session 1 (chat #1):**

```text
Follow AGENTS.md. Work on feature doc-count-badge.
Build ONLY the UI skeleton for the badge in src/App.tsx — do not wire up
the count yet. Then update PROGRESS.md and SESSION_HANDOFF.md with the
exact next step. Do NOT mark the feature done.
```

Close that chat completely.

**Session 2 (a brand-new chat — no copy/paste of history):**

```text
Read PROGRESS.md and SESSION_HANDOFF.md. Resume feature doc-count-badge
from the exact next step. Implement the remaining acceptance criteria,
add a test, run npm test, update PROGRESS.md, and mark the feature done.
```

If session 2 picks up correctly without re-exploring the whole repo, your state files are doing their job.

## Verify your gain

```bash
npx --yes harness-score .
```

Expected: 🧠 **State 20/20**.

| Criterion | Before | After |
|-----------|:--:|:--:|
| PROGRESS.md | 5 | 5 |
| feature_list.json | 5 | 5 |
| SESSION_HANDOFF.md | 0 | 5 |
| Exact next step recorded | 0 | 5 |

Lifecycle also nudges up here — the handoff checklist and state pointers feed two of its criteria too.

## Copilot prompts

**Generate a handoff at the end of a session:**

```text
Write SESSION_HANDOFF.md for the current state of feature doc-count-badge:
a handoff checklist, the active feature, an exact "pick up here" step,
and any gotchas. Keep it under 30 lines.
```

**Open a fresh session from state only:**

```text
Read PROGRESS.md and SESSION_HANDOFF.md. Summarize: what was done last,
what the exact next step is, and what to watch out for. Then begin.
```

## Checkpoint

- [ ] `PROGRESS.md`, `feature_list.json`, `SESSION_HANDOFF.md` all exist
- [ ] State records an **exact next step** (next / resume / pick up here)
- [ ] State pillar reads **20/20**
- [ ] Session 2 finished the feature using only the files — no verbal recap

## Next

[Lab 04 — Scope control](./lab-04-scope-control) — keep the agent on one feature: Scope to 20/20.
