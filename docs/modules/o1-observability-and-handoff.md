# O1 — Observability & handoff: leave the runway clean

*~8 min · Operations · [Score your repo →](/diagnose)*

## The pain

The agent says "all done, everything works!" and the session ends.

You look closer. Did the tests actually pass — or did the agent just *believe* they would? The PROGRESS log says "fixed the bug," but not which bug, not how, not what proves it. There are three modified files sitting uncommitted next to two stray scratch files. The handoff note says "continue the feature." Which feature? Continue from where?

You can't see what happened. You can't trust what it claims. And you can't safely hand the repo to the next session — agent *or* human — because the runway is littered with debris.

This is the difference between a session that *ended* and a session that *landed*. Ending is easy. Landing clean is the operational skill that makes agent work actually compounding instead of a pile of half-trusted guesses.

## The idea

**A session is observable when an outsider can reconstruct what happened without asking you.** It's resumable when they can pick up the next step without guessing.

Three things make that true:

1. **Logs with evidence.** Don't write "tests pass." Paste the actual pass/fail output. A claim is a feeling; pasted output is proof.
2. **Clean git state.** No uncommitted changes, no stray files. The diff *is* the record of what changed — keep it honest.
3. **A handoff that is the single source of "what's next."** One file. One exact next step. No ambiguity about where to resume.

This is where the **State** and **Lifecycle** pillars cash out. State gives you the files (`PROGRESS.md`, `feature_list.json`, `SESSION_HANDOFF.md`). Lifecycle says *update them every session*. Observability is the quality bar: those files have to be good enough that someone who wasn't there can trust them and continue from them.

## Copilot in practice

**1. Log with evidence, not adjectives.** Make the agent paste the output it's claiming. In `.github/copilot-instructions.md`:

```markdown
## Logging rules
- When you claim verification passed, PASTE the command output into
  PROGRESS.md — do not just assert "tests pass".
- Record the command you ran, the result, and the date.
```

A good PROGRESS entry looks like this — claim plus receipt:

```markdown
## 2026-06-27 — Fix invoice rounding bug (mig-3)
- DONE: invoices now round half-up to 2dp (was truncating).
- WHY: finance reported off-by-a-cent totals on large orders.
- VERIFICATION (npm test -- invoices):
    PASS  src/invoices.test.ts (14 tests)
    Tests: 14 passed, 0 failed
- NEXT: backfill historical rows? Open question for finance — see handoff.
```

The pasted test summary is the load-bearing part. Anyone reading this can see *exactly* what "done" was backed by.

::: warning Pasted output beats "it works"
Agents are confident narrators. "Everything passes" is the single most expensive sentence in agent engineering, because it's often said *before* anything was run. Requiring pasted output turns an unverifiable boast into an auditable fact.
:::

**2. Leave git clean.** Add a shutdown rule so the diff stays trustworthy:

```markdown
## Before ending a session
- Commit finished work with a clear message, OR stash work-in-progress.
- Delete scratch/temp files you created.
- Run `git status` and paste it into PROGRESS.md — it should be clean.
```

A clean `git status` at the end of a session is observability you get for free: the diff between sessions is a perfect, reviewable record of what actually changed.

**3. Make the handoff the one source of "what's next."** Everything about resuming lives in `SESSION_HANDOFF.md` — not split across chat, comments, and your memory.

```markdown
# Session handoff

**State:** rounding fix shipped & verified (mig-3 done).

## Exact next step
1. Run `scripts/init.sh` — confirm green.
2. Decide with finance: backfill historical invoices, or only fix
   forward? (Blocking question — do not guess.)
3. If backfill: write a one-off script in `scripts/backfill/`, dry-run
   first, then run with `--commit`.

**Verification to expect:** `npm run db:verify` prints "0 mismatches".
```

One file. One next step. A fresh session reads this and moves — no archaeology required.

**Useful in practice:**
- Ask Copilot to "summarize this session into a PROGRESS entry with pasted verification output and rewrite the handoff." Make the wrap-up itself a single instruction you run every time.

## Go deeper

::: details Teams & advanced
- **Observability is for humans *and* agents.** A teammate who opens your repo cold should understand the last session as fast as the next agent does. Same artifacts serve both.
- **Decisions are the highest-value log entries.** "Migrated orders" is recoverable from the diff. "Kept `legacy_id` for one release for rollback safety" is not — and it's exactly what stops a future session from confidently deleting something load-bearing. Log the *why*.
- **Treat "all done" as unverified until you see output.** Build the reflex: no pasted result, no trust. This catches the most common agent failure — claiming success it never checked.
- **Enforce clean state in CI.** A check that fails the build if `main` has `in_progress` items or uncommitted artifacts turns "leave it clean" from a habit into a guarantee.
- **Short and hot.** Keep PROGRESS to the last few sessions; roll older entries into a `docs/decisions/` log. The file read every session must stay skimmable.
:::

## Try it

Take your most recent agent session and grade its landing:

1. Does PROGRESS.md show pasted verification output, or just a claim? If it's a claim, rerun the command and paste the real result.
2. Run `git status`. Is it clean? Commit, stash, or delete until it is.
3. Read SESSION_HANDOFF.md as if you'd never seen the project. Can you start immediately? If not, rewrite it with one exact next step.

Then add the logging and shutdown rules above so every future session lands the same way.

## Checkpoint

1. What makes a session "observable"?
2. Why paste command output into PROGRESS.md instead of writing "tests pass"?
3. Why should the handoff note be the *single* source of "what's next"?

<details>
<summary>Answers</summary>

1. An outsider can reconstruct what happened — what changed, why, and whether it was verified — without asking you, using the repo's logs, clean git diff, and handoff note.
2. Agents confidently claim success they haven't checked. Pasted output is auditable evidence; "tests pass" is an unverifiable assertion that's often made before anything ran.
3. So a fresh session (or teammate) resumes from one unambiguous place instead of stitching together scattered context from chat, comments, and memory — which leads to guessing and rework.

</details>

## Further reading

- Course: [P2 — State: work survives the chat window](./p2-state) and [P5 — Lifecycle](./p5-lifecycle) — the pillars this builds on.
- Course: [P3 — Verification: the agent proves its work](./p3-verification) — where the pasted evidence comes from.
- Next: [O2 — Roll it out to your team](./o2-team-rollout)
