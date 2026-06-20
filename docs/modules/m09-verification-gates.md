# M09 — Proof beats confidence

*~8 min read · Part 3 — Reliability · Prerequisites: [M08](./m08-scope-and-feature-lists)*

## The problem

Copilot says **"Tests pass!"** but did not run them. Or it ran unit tests while the API returns 500 in integration.

## The idea

**Verification gap:** the agent's confidence ≠ correctness.

Close the gap with explicit, runnable commands listed in instructions:

```markdown
## Verification (run all before done)
npm run lint
npm test
npm run build
curl -f http://localhost:3000/health
```

Only a passing pipeline counts as evidence. Paste command output or summarize failures in PROGRESS.md.

## Copilot in practice

Scoped test rules in `.github/instructions/tests.instructions.md`:

```markdown
---
applyTo: "**/*.{test,spec}.{ts,tsx,js}"
---
- Never delete failing tests to make CI green
- Add tests for new endpoints and edge cases
- Run the narrowest test file first, then full suite before done
```

Optional reviewer agent (`.github/agents/reviewer.agent.md`) runs after implementation to challenge "done" claims.

## Universal pattern

Verification tiers:

| Tier | When | Example |
|------|------|---------|
| Fast | During iteration | single test file, lint |
| Standard | Before commit | full unit suite |
| Full | Before marking feature done | build + smoke e2e |

## Try it

Intentionally break a test. Ask Copilot to fix. Confirm it runs verification **before** claiming completion.

## Checkpoint

1. What is the verification gap?
2. Name three verification commands appropriate for your stack.
3. Should the agent skip verification when context is low?

<details>
<summary>Answers</summary>

1. Agent believes work is correct without runnable proof.
2. Answers vary — e.g. `pytest`, `npm test`, `mypy`, `curl` health check.
3. No — that's when agents rush; harness must require verification anyway.

</details>

Next: [M10 — Leave the runway clean](./m10-observability-and-handoff)
