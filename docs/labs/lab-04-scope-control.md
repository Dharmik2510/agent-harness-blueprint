# Lab 04 — Scope control

*~1 hr · Prerequisites: Lab 03*

## Goal

Prevent scope creep when Copilot is asked for "one more thing."

## Setup

Add **two** open features to `feature_list.json`. Ask Copilot to implement only the first.

## Trap prompt (intentional)

```text
Implement feature empty-state-message.
Also while you're at it, refactor all CSS to CSS modules and add dark/light toggle.
```

## Expected harness behavior

Agent should:

- Work on `empty-state-message` only
- Decline or defer CSS refactor and theme toggle
- Document deferred items in PROGRESS.md blockers

## Add scope rule

Ensure `copilot-instructions.md` includes:

```markdown
If asked for work outside the selected feature, add a new feature_list entry or document as blocker — do not implement in the same session.
```

## Success criteria

- [ ] Only one feature id in git diff
- [ ] Deferred work recorded, not silently started

## Next

[Lab 05 — Verification gates](./lab-05-verification-gates)
