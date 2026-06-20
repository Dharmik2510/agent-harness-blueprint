# M10 — Leave the runway clean

*~8 min read · Part 4 — Operations · Prerequisites: [M09](./m09-verification-gates)*

## The problem

Session ends mid-refactor. Tests fail. `PROGRESS.md` is empty. The next person (or next Copilot chat) lands on a broken branch with no map.

## The idea

**Observability + handoff** make agent work debuggable and resumable.

Observability (inside the harness):

- PROGRESS.md with verification evidence
- Git commits scoped to one feature
- Optional: structured logs or session tags in commit messages

Handoff (end of every session):

- What changed and why
- What passed / what failed
- Exact next command or feature id
- Blockers needing human input

**The next session's success depends on this session's cleanup.**

## Copilot in practice

`SESSION_HANDOFF.md` checklist (also in instructions):

```markdown
## End-of-session checklist
- [ ] Verification commands run (note results)
- [ ] PROGRESS.md updated
- [ ] feature_list.json status accurate
- [ ] No debug code or commented-out blocks left
- [ ] Commit message references feature id
- [ ] Next action: _______________
```

Add to `copilot-instructions.md`:

```markdown
Do not end a session with failing verification unless documenting blockers in PROGRESS.md.
Prefer a clean, resumable state over "almost done."
```

## Universal pattern

Commit hygiene for agent sessions:

```text
feat(search-api): add pagination — feature search-api

Verification: npm test -- search (12 passed)
Next: highlight snippets (feature search-api still in_progress)
```

## Try it

End a session using only the handoff checklist. Start a fresh Copilot chat and resume **without** explaining prior context verbally. Success = agent continues from files alone.

## Checkpoint

1. What makes agent runtime observable?
2. What belongs in a handoff note?
3. Why avoid ending on failing tests?

<details>
<summary>Answers</summary>

1. Written logs (PROGRESS), verification evidence, scoped commits, clear feature status.
2. Changes, verification results, next action, blockers.
3. Next session inherits broken state; wastes context on recovery.

</details>

## Course complete — capstone

Put it all together: [Lab 06 — Full harness capstone](../labs/lab-06-full-harness-capstone)
