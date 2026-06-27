# P3 — Verification: proof beats confidence

*~8 min · Pillar: Verification · [Score your repo →](/diagnose)*

::: tip Scorecard — this lesson is worth up to +20
Satisfy all four and you max out the Verification pillar:
1. Instructions list runnable verification commands (test / lint / build).
2. An explicit rule: do NOT claim done until verification passes.
3. The project actually has a test setup (a test script or test files).
4. CI runs the checks (a GitHub Actions workflow).
:::

## The pain

You ask Copilot to add a feature. Two minutes later, glowing green checkmarks in the chat: **"All done! The feature is working and all tests pass."**

You run the tests. Three are red. The build is broken. Nothing was "working" — the agent never ran anything. It *pattern-matched* its way to a confident sentence.

This is the single most common Copilot failure, and it is dangerous precisely because it sounds so reassuring. The agent isn't lying. It genuinely believes it's done. The problem is that an LLM's confidence is generated text, not evidence. "All done!" is just the most statistically likely thing to say after writing some code — whether or not the code actually runs.

Confidence is free. Proof costs a command. The whole pillar is about making the agent pay that cost.

## The idea

There is a gap between *the agent believes the work is correct* and *the work is correct*. Call it the **verification gap**. You close it with one rule: **the only acceptable evidence of "done" is the output of a command that passed.**

Three things turn that principle into a working harness:

1. **List the commands.** Put the exact test / lint / build commands in your instructions so the agent never has to guess how to check its work.
2. **Forbid premature "done."** Write it down explicitly: do not claim completion until those commands pass and you've seen the output.
3. **Back it with a real test setup and CI.** A rule to "run the tests" is hollow if there are no tests. CI is the backstop that catches it when the agent forgets.

<BeforeAfter before-label="Prompt-only" after-label="With harness">
<template #before>

> **You:** Add input validation to the signup form.
>
> **Copilot:** Done! I've added validation for email and password fields. Everything is working and the tests pass. ✅

*(No command was run. One test is red. The build doesn't compile.)*

</template>
<template #after>

> **You:** Add input validation to the signup form.
>
> **Copilot:** Added validation. Running verification per instructions...
>
> ```
> $ npm run lint   → 0 problems
> $ npm test       → 24 passed, 0 failed
> $ npm run build  → built in 1.2s
> ```
>
> All three gates pass. Updating PROGRESS.md and marking the feature done.

</template>
</BeforeAfter>

## Copilot in practice

**1. List the commands in your instructions.** Add this block to `.github/copilot-instructions.md` (or `AGENTS.md` if your tooling uses it). Copy-paste and swap in your stack's commands:

```markdown
## Verification (before claiming done)

Run ALL of these and paste or summarize the output. Do not say the
work is complete until every one passes:

- `npm run lint`
- `npm test`
- `npm run build`

Rules:
- "Done" requires passing output you actually ran — confidence is not proof.
- If a command fails, fix it or report the failure. Never claim success.
- Never delete or skip a failing test to make the suite green.
```

Adjust per language: Python → `ruff check .`, `pytest`, `mypy .`. Go → `go vet ./...`, `go test ./...`, `go build ./...`.

**2. Scope test rules to test files.** Create `.github/instructions/tests.instructions.md`:

```markdown
---
applyTo: "**/*.{test,spec}.{ts,tsx,js}"
---
- Add tests for every new function and edge case.
- Run the narrowest relevant test file first, then the full suite.
- Never weaken an assertion just to make a test pass.
```

**3. Add CI as the backstop.** Create `.github/workflows/ci.yml`:

```yaml
name: CI
on:
  push:
    branches: [main]
  pull_request:
jobs:
  verify:
    runs-on: ubuntu-latest
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

Now if the agent ever slips a red test past you, GitHub catches it on the pull request — and the agent can read the failed CI logs and fix it.

**Useful slash commands while you work:**
- `/tests` — ask Copilot to generate tests for the current file.
- `/fix` — point Copilot at a failing test or error and have it iterate until green.

## Universal pattern

The model doesn't matter. Every agent harness — Copilot, Claude, Cursor, a homegrown loop — needs the same three layers:

| Layer | Question it answers | Where it lives |
|-------|--------------------|----------------|
| Commands | *How do I check this?* | Instructions file |
| Rule | *When am I allowed to say "done"?* | Instructions file |
| CI | *What catches me when I forget?* | `.github/workflows/ci.yml` |

Think in **verification tiers** so the agent isn't slow during iteration:

| Tier | When | Example |
|------|------|---------|
| Fast | While iterating | one test file + lint |
| Standard | Before commit | full unit suite |
| Full | Before marking a feature done | build + smoke test |

::: details Go deeper (teams & advanced)
- **Reviewer agent.** Add a second agent (`.github/agents/reviewer.agent.md`) whose only job is to challenge "done" claims and re-run verification. An agent that didn't write the code is harder to fool than the one that did.
- **Branch protection.** Require the CI check to pass before merge in your repo settings. This makes the harness rule structural, not just advisory.
- **Flaky tests erode trust.** If a test fails randomly, the agent learns to ignore red. Quarantine or fix flaky tests fast — a noisy gate is worse than no gate.
- **Capture evidence in PROGRESS.md.** Paste the passing command output into your progress log so the *next* session can trust that the last one really finished.
:::

## Try it

1. Open a project and intentionally break one test (flip an assertion).
2. Ask Copilot to "fix the failing test."
3. Watch whether it runs the suite *before* declaring victory.

If it claims "done" without running anything, your instructions are missing the verification block above. Add it and try again — the difference is night and day.

## Checkpoint

1. What is the "verification gap"?
2. Why isn't an agent saying "all tests pass" good enough?
3. If the harness already lists test commands, why also add CI?

<details>
<summary>Answers</summary>

1. The distance between the agent *believing* the work is correct and the work *being* correct. Confidence is generated text, not evidence.
2. Because the words can be produced without ever running a command. Only passing output you actually ran counts as proof.
3. The agent will sometimes forget or skip the rule. CI is the automatic backstop that catches red tests on every push and pull request.

</details>

## Further reading

- [GitHub Actions: quickstart](https://docs.github.com/actions/quickstart) — your first CI workflow.
- [Branch protection rules](https://docs.github.com/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches) — require checks before merge.
- Next: [P4 — Scope: one feature at a time](./p4-scope)
