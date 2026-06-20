# Failure modes

Symptom → pillar → fix. **Fix the harness before swapping models.**

| Symptom | Pillar | Fix |
|---------|--------|-----|
| Agent says done but tests fail | Verification | Add verify commands to AGENTS.md + copilot-instructions; forbid done until pass |
| Agent forgets yesterday's work | State | Add PROGRESS.md; require read at session start |
| Agent refactors unrelated code | Scope | feature_list.json + one-feature-per-session rule |
| Agent stuck on npm install | Lifecycle | Fix init.sh; run before feature work |
| Agent uses wrong framework version | Instructions | Pin versions in AGENTS.md |
| Agent can't find conventions | Instructions | Move tribal knowledge into repo docs; add doc map |
| 600-line instruction file ignored | Instructions | Split into scoped `*.instructions.md` + docs/ |
| Agent deletes failing tests | Verification | Add tests.instructions.md forbidding deletion |
| Session ends mid-refactor | Lifecycle | SESSION_HANDOFF.md + no end on failing verify |
| Monorepo wrong package rules | Instructions | Scoped instructions with `applyTo` globs |
| Copilot ignores rules | Instructions | Confirm `.github/copilot-instructions.md` at workspace root |
| Same bug every session | State + Verification | Log failure in PROGRESS; add regression test |

## Diagnostic loop

1. Observe failure (specific, reproducible)
2. Map to pillar using table above
3. Edit the listed file(s)
4. Re-run same task without changing model
5. Log outcome in PROGRESS.md

After 3–5 loops, reliability should stabilize for that task class.

## Related

- [M01 — When the model is not the problem](../modules/m01-when-the-model-is-not-the-problem)
- [validate-harness.sh](https://github.com/dharmiksoni/agent-harness-blueprint/blob/main/scripts/validate-harness.sh)
