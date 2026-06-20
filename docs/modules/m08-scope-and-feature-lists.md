# M08 — One task at a time

*~8 min read · Part 3 — Reliability · Prerequisites: [M07](./m07-state-across-sessions)*

## The problem

You asked for search. Copilot also refactored auth, updated dependencies, and left three features 80% done. Nothing is mergeable.

## The idea

**Scope is a contract.** The agent works on exactly one item until it meets definition of done.

`feature_list.json` makes scope machine-readable:

```json
{
  "id": "search-api",
  "title": "Search API endpoint",
  "status": "open",
  "acceptance": [
    "GET /api/search?q= returns paginated results",
    "npm test -- search passes"
  ]
}
```

Statuses: `open` → `in_progress` → `done` (never skip, never batch unrelated items).

## Copilot in practice

Add scope rules to `.github/copilot-instructions.md`:

```markdown
## Scope rules
- Pick exactly ONE feature with status "open" per session
- Mark "in_progress" before coding, "done" only after verification
- Do not edit feature_list.json to remove or shrink acceptance criteria
- Do not start refactors outside the selected feature unless blocking
```

Optional: use `.github/agents/planner.agent.md` to break epics into feature_list entries before implementation.

## Universal pattern

Definition of done template (per feature):

```markdown
Done when:
- [ ] Acceptance criteria met
- [ ] Verification commands pass (listed in feature)
- [ ] PROGRESS.md updated
- [ ] No unrelated file changes
```

## Try it

Add three features to `feature_list.json`. Run Copilot with scope rules. Confirm only **one** feature changes per session.

## Checkpoint

1. What is scope creep in agent sessions?
2. Why use JSON for features instead of only PROGRESS.md?
3. Can the agent mark a feature done without verification?

<details>
<summary>Answers</summary>

1. Working on multiple goals or drive-by refactors in one session.
2. Structured status is easier to validate and harder to casually rewrite.
3. Not under a proper harness — instructions must forbid it.

</details>

Next: [M09 — Proof beats confidence](./m09-verification-gates)
