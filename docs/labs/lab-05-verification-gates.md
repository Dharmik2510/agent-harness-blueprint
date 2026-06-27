# Lab 05 — Verification gates

*~1 hr · Pillar focus: Verification ✅ · Pairs with [Module P3](../modules/p3-verification)*

::: tip Measure first
**Starting score (typical): ~85/100** (Instructions, State, Scope at 20). **Target after this lab: Verification 20/20.**
Run before and after:
```bash
cd labs/knowledge-hub
npx --yes harness-score .
```
:::

## What you'll build

The rule that turns "I think it's done" into "I proved it's done." You'll list **runnable verify commands**, add an explicit **don't-claim-done gate**, confirm **tests exist**, and add a **CI workflow** that runs the checks on every push.

The Verification pillar scores:

| Criterion | Points | How to earn it |
|-----------|:--:|----------------|
| Verify commands listed | 5 | test/lint/build commands in instructions |
| "Don't claim done until checks pass" rule | 5 | explicit gate phrasing |
| Tests actually exist | 5 | test script + test files (already true) |
| CI runs the checks | 5 | `.github/workflows/*.yml` |

## Setup

```bash
cd labs/knowledge-hub
npm install
```

Carry in the Lab 04 harness. Add the feature you'll gate:

**add to `feature_list.json`**

```json
{
  "id": "keyboard-shortcut-search",
  "title": "Focus the search input when the user presses /",
  "status": "open",
  "acceptance": [
    "Pressing / focuses the search input",
    "Typing / inside the input does not steal focus",
    "npm test passes"
  ]
}
```

## Part A — Find the verification gap

```bash
npx --yes harness-score .
```

Read the ✅ row. Tests already exist (5 pts). The two cheap wins are usually the **explicit gate rule** and the **CI workflow**. Note your current Verification sub-score.

## Part B — Install the gate

Spell out the gate so it's machine-detectable and unmissable:

**append to `AGENTS.md`**

```markdown
## Verification gate
Before setting a feature's status to "done" in feature_list.json, you must run:
1. `npm run lint` — must pass with zero warnings
2. `npm test` — must pass
3. `npm run build` — must pass

**Do not claim done until all three pass.** If any fail, fix and re-run.
Record the command output summary in PROGRESS.md as evidence.
```

Add CI so the checks also run independently of the agent's word:

**`.github/workflows/ci.yml`**

```yaml
name: CI
on:
  push:
  pull_request:
jobs:
  verify:
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: labs/knowledge-hub
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm test
      - run: npm run build
```

Tests already exist (`src/lib/search.test.ts`). When you build `keyboard-shortcut-search`, add a test for the focus behavior alongside it so the new feature is covered too.

## Part B.2 — Prove the gate bites (adversarial check)

Implement the feature, then **deliberately break a test** (e.g. flip an `expect` in `src/lib/search.test.ts`). Ask:

```text
Is feature keyboard-shortcut-search done? Run the verification gate first.
```

A harnessed agent runs the checks, sees the failure, and **refuses to claim done** until it's fixed and re-verified. Restore the test, re-run, and watch it pass the gate honestly.

## Verify your gain

```bash
npx --yes harness-score .
```

Expected: ✅ **Verification 20/20**.

| Criterion | Before | After |
|-----------|:--:|:--:|
| verify commands listed | 5 | 5 |
| don't-claim-done gate | 0 | 5 |
| tests exist | 5 | 5 |
| CI workflow | 0 | 5 |

You should now be hovering near the **Production harness** band (90+). Lab 06 closes the gap with Lifecycle.

## Copilot prompts

**Run the gate honestly:**

```text
Follow the Verification gate in AGENTS.md for feature
keyboard-shortcut-search. Run npm run lint, npm test, and npm run build.
Paste the results into PROGRESS.md. Only then update the feature status.
```

**Add the missing test:**

```text
Add a test for the / keyboard shortcut: pressing / focuses the search
input, and pressing / while typing in the input does not. Then run npm test.
```

## Checkpoint

- [ ] AGENTS.md lists the three verify commands and a don't-claim-done rule
- [ ] `.github/workflows/ci.yml` runs lint + test + build
- [ ] A test for the new feature exists
- [ ] Verification pillar reads **20/20**
- [ ] On a broken test, the agent refused to claim done

## Next

[Lab 06 — Full harness capstone](./lab-06-full-harness-capstone) — assemble everything and break 90/100.
