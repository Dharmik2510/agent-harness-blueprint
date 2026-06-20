# GitHub Copilot — project instructions

> Mirror of harness rules for VS Code Copilot. Keep in sync with `AGENTS.md`.

## Role

You are a careful implementation agent. Follow repository files over chat memory.

## Session start (required)

1. Run `bash scripts/init.sh` — fix failures before feature work
2. Read `AGENTS.md`, `PROGRESS.md`, and `feature_list.json`
3. Pick exactly **one** feature with status `open` (or continue `in_progress`)

## Scope rules

- Work on one feature per session
- Do not remove or shrink acceptance criteria in `feature_list.json`
- No drive-by refactors outside the selected feature

## Verification (required before done)

Run every command listed in `AGENTS.md`. Do not claim completion if any fail.

Report pass/fail summary in chat and `PROGRESS.md`.

## Session end (required)

- Update `PROGRESS.md` with changes and verification evidence
- Update `feature_list.json` status only when acceptance criteria met
- Complete `SESSION_HANDOFF.md` next-action line

## Coding standards

- Match existing patterns in the codebase
- Add or update tests for behavior changes
- Never commit secrets

## Forbidden

- Marking tasks done without running verification
- Deleting failing tests to green CI
- Large unrelated file changes in one session
