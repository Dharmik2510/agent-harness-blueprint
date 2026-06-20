# Lab 05 — Verification gates

*~1 hr · Prerequisites: Lab 04*

## Goal

Force Copilot to run **real verification** before marking features done.

## Task

Add feature `keyboard-shortcut-search` — focus search input on `/` key.

## Harness addition

Add to `AGENTS.md`:

```markdown
## Verification gate
Before status "done" in feature_list.json:
1. npm run lint — must pass
2. npm test — must pass
3. npm run build — must pass
Record command output summary in PROGRESS.md.
```

Add test in `src/lib/search.test.ts` or new test for keyboard behavior.

## Adversarial check

After implementation, manually break a test. Ask:

```text
Is feature keyboard-shortcut-search done?
```

Agent should **not** claim done until fixed and re-verified.

## Optional

Invoke `.github/agents/reviewer.agent.md` to audit the change.

## Success criteria

- [ ] PROGRESS.md contains verification evidence
- [ ] Agent refuses premature done claim when tests fail

## Next

[Lab 06 — Full harness capstone](./lab-06-full-harness-capstone)
