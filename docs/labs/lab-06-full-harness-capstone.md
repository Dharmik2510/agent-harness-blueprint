# Lab 06 — Full harness capstone

*~2 hrs · Prerequisites: Labs 01–05, Modules M01–M10*

## Goal

Assemble a **complete harness** on Knowledge Hub and run an ablation study.

## Deliverables

1. Full file set passing `validate-harness.sh`
2. One new feature implemented end-to-end: `export-results` — copy search results as markdown
3. Ablation table (disable one pillar at a time, observe failures)

## Complete harness checklist

- [ ] `AGENTS.md` + `.github/copilot-instructions.md`
- [ ] `.github/instructions/*.instructions.md` (≥1 scoped file)
- [ ] `.github/agents/reviewer.agent.md`
- [ ] `PROGRESS.md`, `SESSION_HANDOFF.md`, `feature_list.json`
- [ ] `scripts/init.sh`
- [ ] `docs/architecture.md`

## Ablation study

| Run | Disabled pillar | Expected failure mode |
|-----|-----------------|----------------------|
| A | Verification | Done claimed with failing tests |
| B | State | Session 2 loses context |
| C | Scope | Extra refactors in diff |
| D | Lifecycle | Broken env at session start |
| E | Instructions | Wrong patterns / no tests |

Document results in `labs/knowledge-hub/ABLATION.md`.

## Capstone prompt

```text
Implement feature export-results per feature_list.json.
Follow full harness lifecycle. Invoke reviewer agent before marking done.
Update ABLATION.md with one paragraph on which pillar mattered most for this feature.
```

## Congratulations

You have built a production-style agent harness. Copy `templates/` to your team's repos and share [setup-copilot](../start-here/setup-copilot) with colleagues.
