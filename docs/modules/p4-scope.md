# P4 — Scope: one feature at a time

*~8 min · Pillar: Scope · [Score your repo →](/diagnose)*

::: tip Scorecard — this lesson is worth up to +20
Satisfy all four and you max out the Scope pillar:
1. `feature_list.json` tracks a status per item (open / in_progress / done).
2. Features have explicit acceptance criteria (a definition of done).
3. A rule telling the agent to work on ONE feature/task at a time.
4. Rules scoped to file patterns (`.github/instructions/*.instructions.md` with `applyTo` globs).
:::

## The pain

You asked for one thing: "add a search endpoint."

You come back to a diff that touches forty files. Copilot added search — and also renamed half your variables, "modernized" the auth module, bumped three dependencies, and started a caching layer it never finished. Each change is individually plausible. Together they're an unmergeable mess. You can't review it, can't ship it, and can't even tell which edits were the feature you actually wanted.

This is **scope creep**, and agents are spectacularly prone to it. An LLM sees the whole codebase as fair game and has no instinct for "that's out of bounds." Every tangentially-related improvement looks like a good idea in isolation. Without a boundary, the agent will happily wander until it runs out of context — leaving you with three features at 80% instead of one at 100%.

## The idea

**Scope is a contract.** The agent works on exactly *one* item, until it meets a written definition of done, before touching anything else.

Two artifacts make that contract enforceable instead of wishful:

1. **`feature_list.json`** — a machine-readable backlog where every item has a `status`. The agent picks one `open` item, flips it to `in_progress`, and only marks it `done` after the work is verified. Structured status is hard to casually fudge.
2. **Acceptance criteria** — each feature carries its own definition of done. No criteria means "done" is a feeling; explicit criteria make it a checklist.

Then you pin the boundaries to *where* changes are allowed with `applyTo` globs, so the rules for test files differ from the rules for, say, database migrations.

<BeforeAfter before-label="Prompt-only" after-label="With harness">
<template #before>

> **You:** Add a search endpoint.
>
> **Copilot:** Done! I added the search endpoint, refactored the auth module while I was in there, upgraded the ORM, and started a Redis cache layer for performance. 🚀

*(40 files changed. Nothing fully finished. Impossible to review.)*

</template>
<template #after>

> **You:** Work on the next feature.
>
> **Copilot:** Picking `search-api` (status `open`) from feature_list.json.
> Marking it `in_progress`. I'll touch only the search endpoint and its
> tests. Acceptance criteria:
> - `GET /api/search?q=` returns paginated results
> - `npm test -- search` passes
>
> Done. Both criteria met, verification green. Marking `done`. No
> unrelated files were changed.

</template>
</BeforeAfter>

## Copilot in practice

**1. Create `feature_list.json` at the repo root.** Give every item an `id`, `title`, `status`, and `acceptance` list:

```json
{
  "features": [
    {
      "id": "search-api",
      "title": "Search API endpoint",
      "status": "open",
      "acceptance": [
        "GET /api/search?q= returns paginated JSON results",
        "Empty query returns 400 with a clear message",
        "npm test -- search passes"
      ]
    },
    {
      "id": "search-ui",
      "title": "Search box on the results page",
      "status": "open",
      "acceptance": [
        "Typing filters results live (debounced 300ms)",
        "npm test -- search-ui passes"
      ]
    }
  ]
}
```

Statuses move one way: `open` → `in_progress` → `done`. Never skip a stage, never batch unrelated items into one session.

**2. Add the one-task rule to `.github/copilot-instructions.md`:**

```markdown
## Scope rules

- Pick exactly ONE feature with status "open" per session.
- Set it to "in_progress" before coding; "done" only after verification passes.
- Do NOT edit other features' acceptance criteria to make them easier.
- Do NOT start refactors or upgrades outside the selected feature
  unless they directly block it (and if so, say why first).
- If you finish early, stop and report — do not grab a second feature.
```

**3. Scope rules to file patterns.** Different parts of a codebase deserve different guardrails. Create `.github/instructions/migrations.instructions.md`:

```markdown
---
applyTo: "**/migrations/**/*.sql"
---
- Migrations are append-only. Never edit or delete an existing migration.
- Every schema change needs a matching rollback.
- Touch migrations only when the selected feature explicitly requires it.
```

The `applyTo` frontmatter glob means these rules activate *only* when the agent is working on migration files — keeping instructions relevant instead of one giant wall of text the agent skims past.

**Useful slash command:**
- `/new` or your planner agent — break a big "epic" into individual `feature_list.json` entries *before* writing any code, so scope is decided up front.

## Universal pattern

Every harness needs a way to answer three questions, regardless of which agent you run:

| Question | Answered by |
|----------|-------------|
| *What am I allowed to work on?* | One `open` item in `feature_list.json` |
| *When is it finished?* | That item's `acceptance` criteria |
| *Where am I allowed to make changes?* | `applyTo` globs in scoped instructions |

A reusable **definition-of-done** template per feature:

```markdown
Done when:
- [ ] All acceptance criteria met
- [ ] Verification commands pass
- [ ] PROGRESS.md updated
- [ ] No unrelated files changed
```

::: details Go deeper (teams & advanced)
- **Planner / implementer split.** Use one agent to decompose work into `feature_list.json` entries and a separate agent to implement them one at a time. Separating "what to build" from "build it" keeps both honest.
- **Scope as a review gate.** In code review, a diff that touches files unrelated to the named feature is an automatic request-for-changes — for human *and* agent contributors alike.
- **Keep features small.** If a feature can't be finished in one focused session, it's an epic. Split it. Small scope is the cheapest reliability upgrade you can make.
- **Don't let the agent rewrite the backlog.** Forbid edits that shrink or delete acceptance criteria. The contract only works if the agent can't quietly renegotiate it.
:::

## Try it

1. Add three features to `feature_list.json`, all `open`.
2. Add the scope rules block above to your instructions.
3. Ask Copilot to "work on the next feature."

Confirm that exactly **one** feature flips to `in_progress`, only its files change, and it isn't marked `done` until its acceptance criteria are met. If the agent grabs a second feature or wanders into unrelated files, tighten the rule and rerun.

## Checkpoint

1. What is scope creep in an agent session, and why are agents prone to it?
2. Why track features in JSON instead of just a prose to-do list?
3. What does an `applyTo` glob in an `.instructions.md` file do?

<details>
<summary>Answers</summary>

1. The agent works on multiple goals or does drive-by refactors in one session. Agents see the whole codebase as fair game and have no built-in sense of "out of bounds," so every related tweak looks worthwhile.
2. Structured `status` and `acceptance` fields are easy to validate and hard to casually fudge; prose is ambiguous and the agent can quietly reinterpret it.
3. It restricts that instruction file's rules to files matching the glob, so guidance applies only where it's relevant instead of as one giant always-on prompt.

</details>

## Further reading

- [VS Code: custom instructions & `applyTo`](https://code.visualstudio.com/docs/copilot/copilot-customization) — scoping rules to file patterns.
- [Glob pattern syntax](https://code.visualstudio.com/docs/editor/glob-patterns) — writing `applyTo` globs that match exactly what you mean.
- Next: [P5 — Lifecycle: state across sessions](./p5-lifecycle)
