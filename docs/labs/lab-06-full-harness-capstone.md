# Lab 06 — Full harness capstone

*~2 hrs · Pillar focus: all five pillars · Pairs with [Module O2](../modules/o2-team-rollout)*

::: tip Measure first
**Starting score (typical): ~85–90/100** (carry in Labs 02–05). **Target after this lab: 90+/100 — Production harness.**
Run before and after:
```bash
cd labs/knowledge-hub
npx --yes harness-score .
```
:::

## What you'll build

The complete, teammate-grade harness — and you'll close the last open pillar, **Lifecycle 🔁**, to push past 90. Then you'll run one full feature through the entire Reliability Loop end to end: read state → pick one feature → implement with verification → hand off.

The Lifecycle pillar scores:

| Criterion | Points | How to earn it |
|-----------|:--:|----------------|
| Bootstrap script exists | 5 | `scripts/init.sh` or `Makefile` |
| Session workflow documented | 5 | start/end ritual in instructions |
| Handoff doc has a real checklist | 5 | `- [ ]` items in SESSION_HANDOFF.md |
| Instructions point at PROGRESS / feature_list | 5 | named in instructions |

## Setup

```bash
cd labs/knowledge-hub
npm install
```

Carry in the Lab 05 harness. By now you should have AGENTS.md, copilot-instructions.md, a scoped instructions file, docs/architecture.md, PROGRESS.md, SESSION_HANDOFF.md, feature_list.json, tests, and CI.

## Part A — Find the last gap

```bash
npx --yes harness-score .
```

Look at the 🔁 Lifecycle row — it's usually the last pillar trailing. Earlier labs gave you the handoff checklist and state pointers; what's typically missing is a **bootstrap script** and a **documented start/end ritual**. Note your total.

## Part B — Close Lifecycle and lock in the loop

Add a bootstrap script so every session starts the same clean way:

**`scripts/init.sh`**

```bash
#!/usr/bin/env bash
set -euo pipefail

echo "→ Installing deps"
npm install

echo "→ Current state"
echo "--- PROGRESS.md (exact next step) ---"
grep -A2 -i "next step" PROGRESS.md || true
echo "--- open features ---"
grep -i '"status": "open"' feature_list.json || echo "(none open)"

echo "→ Ready. Read PROGRESS.md, feature_list.json, then start one feature."
```

```bash
chmod +x scripts/init.sh
```

Document the session ritual so the workflow is part of the instructions:

**append to `AGENTS.md`**

```markdown
## Session lifecycle
**Start:** run `bash scripts/init.sh`, then read `PROGRESS.md` and
`feature_list.json`. Pick exactly one open feature.

**End:** update `PROGRESS.md` with what you did + verification output,
write the exact next step, and refresh the `SESSION_HANDOFF.md` checklist.
```

Make sure `SESSION_HANDOFF.md` still has real `- [ ]` checklist items (from Lab 03) and that AGENTS.md names `PROGRESS.md` and `feature_list.json` (it does, in the doc map and lifecycle section). That's all four Lifecycle criteria.

## Part C — Run the full Reliability Loop on a real feature

Add the capstone feature:

**add to `feature_list.json`**

```json
{
  "id": "export-results",
  "title": "Copy current search results as Markdown",
  "status": "open",
  "acceptance": [
    "A button copies visible results to the clipboard as a Markdown list",
    "Each item is '- **title** — body'",
    "Disabled when there are no results",
    "npm run lint passes",
    "npm test passes",
    "npm run build passes"
  ]
}
```

Run it through the whole harness in one session:

```text
Follow AGENTS.md end to end.
1. Run bash scripts/init.sh and read PROGRESS.md + feature_list.json.
2. Implement ONLY feature export-results to its acceptance criteria.
   Put the markdown-formatting logic as a pure function in src/lib with a test.
3. Run the Verification gate: npm run lint, npm test, npm run build.
4. Update PROGRESS.md with the verification output and the exact next step.
5. Refresh SESSION_HANDOFF.md. Mark export-results done only if all checks pass.
```

## Verify your gain

```bash
npx --yes harness-score .
```

Expected: **90+/100 — Production harness**, with every pillar at or near 20:

| Pillar | Target |
|--------|:--:|
| 📜 Instructions | 20 |
| 🧠 State | 20 |
| ✅ Verification | 20 |
| 🎯 Scope | 20 |
| 🔁 Lifecycle | 20 |
| **Total** | **100** |

Compare to Lab 01's starting **5/100**. Same app, same model — the difference is entirely the system you built.

## Optional — ablation study

Prove each pillar earns its points: disable one at a time, re-run a feature, and record the failure.

| Run | Disable | Expected failure |
|-----|---------|------------------|
| A | Verification (remove the gate) | Done claimed with failing checks |
| B | State (clear PROGRESS/HANDOFF) | Session 2 loses context |
| C | Scope (drop the one-feature rule) | Extra refactors in the diff |
| D | Lifecycle (remove init.sh) | Inconsistent / broken session start |
| E | Instructions (remove AGENTS.md) | Wrong patterns, no tests |

Write a short `labs/knowledge-hub/ABLATION.md` noting which pillar mattered most for `export-results`. (Re-score after to confirm each removal drops ~5–20 points.)

## Copilot prompts

**Run the loop:** use the capstone prompt in Part C.

**Final scorecard audit:**

```text
Score this repo against all five Harness Scorecard pillars. For any pillar
under 20, name the exact missing file or rule and the one-line fix.
```

## Checkpoint

- [ ] `scripts/init.sh` exists and is executable
- [ ] Session lifecycle (start + end ritual) is documented in AGENTS.md
- [ ] `export-results` implemented, tested, and verified
- [ ] Total score is **90+/100** with all pillars at/near 20
- [ ] (Optional) `ABLATION.md` shows each pillar's score impact

## Congratulations

You built a production-style agent harness from 5/100 to 90+. Copy these files into your team's repos, run `npx harness-score .` on them, and share [setup-copilot](../start-here/setup-copilot) with colleagues to roll the loop out at work.
