# Copilot organization rollout

*~10 min read*

Rolling harness engineering to a team using **GitHub Copilot Business or Enterprise**.

## Phase 1 — Template repo (week 1)

1. Create an internal **golden repo** from this course's `templates/`
2. Run `validate-harness.sh` in CI on template repos
3. Document 15-minute quick start in internal wiki linking to [setup-copilot](../../start-here/setup-copilot)

## Phase 2 — Org instructions (week 2)

GitHub supports **organization-level custom instructions** shared across repos.

Add org-wide rules:

- Security (no secrets in commits)
- License headers
- Required verification before PR

Keep repo-specific rules in each project's `copilot-instructions.md`.

See [GitHub Docs: custom instructions](https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/add-custom-instructions).

## Phase 3 — Pilot teams (week 3–4)

Pick 2–3 teams. Require:

- `AGENTS.md` + `copilot-instructions.md` on new services
- `feature_list.json` for agent-assisted epics
- PROGRESS.md for multi-session work

Measure: rework rate, CI failure after agent PRs, time to resume sessions.

## Phase 4 — Scale

| Practice | Recommendation |
|----------|----------------|
| Monorepos | Scoped `*.instructions.md` per package |
| Mixed agents | Single `AGENTS.md`, tool-specific wrappers |
| Code review | Enable Copilot code review with custom instructions |
| Onboarding | Lab 01 as internal workshop (90 min) |

## Common org objections

| Objection | Response |
|-----------|----------|
| "Just prompt better" | Prompts are one pillar; reliability needs verification + state |
| "Too much files" | Minimal pack is 5 files; ROI after first saved incident |
| "Copilot is different from Cursor" | Five pillars are universal; only file paths differ |

## Metrics to track

- Verification gap rate (claimed done vs actually passing CI)
- Session resume time (with vs without PROGRESS.md)
- Scope creep (files changed outside feature)

## Related

- [Provider comparison](../providers)
- [Failure modes](../../resources/failure-modes)
