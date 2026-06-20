# M07 — Pick up where you left off

*~8 min read · Part 3 — Reliability · Prerequisites: [M06](./m06-session-bootstrap)*

## The problem

Monday's Copilot session explored the codebase and half-built a feature. Tuesday's session has **no memory** — it re-reads files, repeats mistakes, or starts a different task.

## The idea

**Persist state to disk.** Chat context is ephemeral; git-tracked files are not.

| File | Purpose |
|------|---------|
| `PROGRESS.md` | Human-readable session log |
| `feature_list.json` | Machine-readable task status |
| `SESSION_HANDOFF.md` | End-of-session checklist + next step |

Every session **ends** by updating state. Every session **starts** by reading it.

## Copilot in practice

Required closing ritual in `copilot-instructions.md`:

```markdown
## Session end (required)
- Update PROGRESS.md with: date, what changed, verification results, blockers
- Update feature_list.json status only with evidence
- Fill SESSION_HANDOFF.md next-action line
```

**Opener prompt:**

```text
Read PROGRESS.md and feature_list.json before choosing work.
Continue the in_progress feature if one exists; do not start new features.
```

## Universal pattern

`PROGRESS.md` entry template:

```markdown
## 2026-06-20 — Session 3
- **Feature:** search-api (in_progress)
- **Done:** GET /api/search skeleton, pagination params
- **Verified:** `npm test -- search` pass
- **Blocked:** none
- **Next:** add highlight snippets + update feature_list to done
```

## Try it

Run two Copilot sessions on the same feature. Session 2 should need **zero** re-discovery if PROGRESS is accurate.

## Checkpoint

1. Why is chat history insufficient for long tasks?
2. What three files form the state pillar?
3. When should feature_list status change to "done"?

<details>
<summary>Answers</summary>

1. Context windows reset; chat is not a durable project record.
2. PROGRESS.md, feature_list.json, SESSION_HANDOFF.md (plus git history).
3. Only after verification commands pass with evidence recorded.

</details>

Next: [M08 — One task at a time](./m08-scope-and-feature-lists)
