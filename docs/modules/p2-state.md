# P2 — State: work survives the chat window

*~8 min · Pillar: State · [Score your repo →](/diagnose)*

::: tip Scorecard — this lesson is worth up to +20
Satisfy all four and you max out the State pillar:
1. A `PROGRESS.md` running session log
2. A `feature_list.json` backlog / work tracker
3. A `SESSION_HANDOFF.md` end-of-session note
4. State records the EXACT next step so a fresh session can resume
:::

## The pain

Friday, 5:50 PM. You and the agent are deep into a migration — three tables done, one to go, a tricky foreign-key tangle half-untangled. You know exactly what's next. You close the laptop.

Monday, you open a fresh chat. The agent has no memory of any of it. The plan, the decisions, the "we tried X and it broke, so we're doing Y" — all gone. You spend forty minutes reconstructing it from the diff, get it slightly wrong, and re-untangle a foreign key you already untangled on Friday.

The work didn't survive the weekend. It only ever lived in a chat window, and chat windows die.

## The idea

The chat window is **amnesiac**. Close it, hit a context limit, switch machines — and everything in it is gone. That's not a bug to fight; it's a fact to plan around.

So stop storing memory in the conversation. Store it in the **repo**. The repo is the one thing that survives every session, every tool, every teammate. If a fact matters tomorrow, it goes in a file today.

Back to the amnesiac intern: a great intern who forgets everything overnight still ships, *if* they keep a notebook. Three pages do the whole job:

- **`PROGRESS.md`** — what happened (the running log)
- **`feature_list.json`** — what's left (the backlog)
- **`SESSION_HANDOFF.md`** — what to do next (the exact resume point)

<BeforeAfter before-label="Prompt-only" after-label="With harness">
<template #before>

**Monday, fresh chat:**

> "Uh… where were we? Read the recent commits and figure out what's left."

The agent guesses from the diff, misreads a half-finished change as done, and skips the one step you actually needed.

</template>
<template #after>

**Monday, fresh chat:**

> "Read SESSION_HANDOFF.md and continue."

The agent reads: *"Next step: migrate the `invoices` table — copy the pattern from `orders` in commit a1b2c3, then run `npm run db:verify`."* It picks up exactly where Friday-you left off.

</template>
</BeforeAfter>

## Copilot in practice

**1. The running log — `PROGRESS.md`.** Append a dated entry as work happens. Newest on top.

```markdown
# Progress log

## 2026-06-27 — Invoice migration
- DONE: migrated users, orders, plans tables to new schema
- DONE: added db:verify script
- DECISION: kept old `legacy_id` column for one release (rollback safety)
- BLOCKED: invoices table has a circular FK with line_items — needs a
  two-pass migration (insert, then backfill the FK)
- NEXT: write the two-pass migration for invoices, then run db:verify

## 2026-06-26 — Schema groundwork
- DONE: drafted new Prisma schema, reviewed with team
```

**2. The backlog — `feature_list.json`.** Structured so the agent can read *and update* it.

```json
{
  "features": [
    { "id": "mig-1", "title": "Migrate users table",    "status": "done" },
    { "id": "mig-2", "title": "Migrate orders table",   "status": "done" },
    { "id": "mig-3", "title": "Migrate invoices table", "status": "in_progress",
      "notes": "circular FK with line_items — needs two-pass" },
    { "id": "mig-4", "title": "Drop legacy_id columns",  "status": "todo",
      "blocked_by": "mig-3" }
  ]
}
```

**3. The handoff — `SESSION_HANDOFF.md`.** Write this as the *last* thing each session. It is the single most valuable file for a clean resume.

```markdown
# Session handoff

**State:** invoices migration in progress (mig-3).

**Exact next step:**
1. Open `prisma/migrations/` and copy the two-pass pattern hint in
   `PROGRESS.md` (2026-06-27 entry).
2. Write the invoices migration: insert rows first, backfill the
   line_items FK second.
3. Run `npm run db:verify` — it must print "0 orphaned rows".
4. Mark mig-3 "done" in feature_list.json and start mig-4.

**Watch out:** do NOT drop legacy_id yet (rollback safety, see DECISION).
```

**4. Wire it into startup.** Tell the agent to read state before doing anything. Add this to `.github/copilot-instructions.md`:

```markdown
## On startup, before any task
1. Read SESSION_HANDOFF.md — this is where we left off.
2. Read PROGRESS.md (latest entry) for context and decisions.
3. Read feature_list.json for the current backlog.
## Before ending a session
- Append a PROGRESS.md entry, update feature_list.json,
  and rewrite SESSION_HANDOFF.md with the EXACT next step.
```

::: warning "Continue" is only as good as your handoff
The killer criterion is #4: the **exact** next step. "Finish the migration" makes the agent re-plan and guess. "Write the two-pass invoices migration, then run `npm run db:verify`" makes it act. Name the file, the command, and the done-signal.
:::

## Universal pattern

This is pure repo convention — it works with any agent, because it's just files plus a startup instruction. In `AGENTS.md`:

```markdown
## State files (read on startup, update before ending)
- SESSION_HANDOFF.md — exact next step to resume
- PROGRESS.md        — running log of work + decisions
- feature_list.json  — backlog with statuses

Rule: the repo is the memory. If it matters tomorrow, write it to a file.
```

Any tool — Copilot, Claude Code, Cursor — that reads `AGENTS.md` now inherits a working memory across sessions.

::: details Go deeper (teams & advanced)
**State is also a team channel.** A teammate (or a different agent) can pick up `SESSION_HANDOFF.md` cold and continue. You've turned a private chat history into shared, reviewable context.

**Log decisions, not just actions.** "Migrated orders" is recoverable from the diff. "Kept `legacy_id` for one release for rollback safety" is *not* — and it's exactly what stops a future session from confidently deleting something load-bearing. Capture the *why*.

**Keep `PROGRESS.md` from sprawling.** Roll old entries into a `docs/decisions/` log (lightweight ADRs) and keep only the last few sessions hot. Same progressive-disclosure logic as instructions: the file you read every session must stay short.

**`feature_list.json` is machine-friendly on purpose.** JSON means the agent can update statuses programmatically and a CI step can assert "no `in_progress` items left on `main`." A markdown checklist works for humans; JSON scales to automation.
:::

## Try it

In your project, create all three files. Make a real `SESSION_HANDOFF.md` for whatever you're working on right now, and force yourself to write the **exact next step** — a file to open and a command to run, not a vague goal. Then add the startup/shutdown block to `.github/copilot-instructions.md`. Tomorrow, open a fresh chat and just say "read SESSION_HANDOFF.md and continue."

## Checkpoint

1. Why is the chat window the wrong place to store project memory?
2. What's the difference in purpose between `PROGRESS.md` and `feature_list.json`?
3. What makes a `SESSION_HANDOFF.md` actually resumable?

<details>
<summary>Answers</summary>

1. It's amnesiac — closing it, hitting a context limit, or switching tools erases it. The repo survives all of that, so memory belongs in files.
2. `PROGRESS.md` is the narrative log of what happened and *why* (decisions, blockers). `feature_list.json` is the structured backlog of what's left, with statuses an agent can update.
3. It records the **exact** next step — a specific file/command/done-signal — so a fresh session can act immediately instead of re-planning and guessing.

</details>

## Further reading

- Course: [M07 — State across sessions](./p2-state) and [M06 — Every session starts the same way](./p5-lifecycle)
- Course: [M08 — Scope and feature lists](./p4-scope) for backlog design
- Next: [P3 — Verification: the agent proves its work](./p3-verification)
