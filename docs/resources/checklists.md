# Checklists

## New project harness checklist

- [ ] Copy universal templates
- [ ] Add `.github/copilot-instructions.md` (or tool equivalent)
- [ ] Customize verification commands in `AGENTS.md`
- [ ] Add at least one feature to `feature_list.json`
- [ ] Run `validate-harness.sh` — fix all gaps
- [ ] Run Lab 01 on a pilot task

## Every agent session

- [ ] `bash scripts/init.sh` passes
- [ ] Read `PROGRESS.md` + `feature_list.json`
- [ ] One feature selected
- [ ] Verification run before done
- [ ] `PROGRESS.md` updated
- [ ] `SESSION_HANDOFF.md` completed

## Before merging agent PR

- [ ] CI green
- [ ] Scope matches one feature id
- [ ] No secrets or debug code
- [ ] Tests added for behavior changes
- [ ] Reviewer agent or human review completed

## Org rollout checklist

- [ ] Golden template repo created
- [ ] Org-level Copilot instructions for security/license
- [ ] Workshop scheduled (Lab 01 + setup-copilot)
- [ ] Metrics baseline captured

## Course completion checklist

- [ ] Modules M01–M10 read
- [ ] Labs 01–06 completed
- [ ] Ablation study documented (Lab 06)
- [ ] Harness copied to one production repo
