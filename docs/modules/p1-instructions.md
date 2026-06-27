# P1 — Instructions: the agent knows your project

*~8 min · Pillar: Instructions · [Score your repo →](/diagnose)*

::: tip Scorecard — this lesson is worth up to +20
Satisfy all four and you max out the Instructions pillar:
1. An `AGENTS.md` operating manual at the repo root
2. A tool-specific instruction file (`.github/copilot-instructions.md` or `CLAUDE.md`)
3. Instructions spell out hard constraints — *must*, *never*, *do not*
4. Instructions stay concise (~under 200 lines) and link out instead of inlining everything
:::

## The pain

You ask the agent for "a new API endpoint." It writes one. It looks fine.

Then you read it. It used `axios` — you ripped that out months ago. It put the route in the wrong folder. It wrote tests with Jest; your project moved to Vitest in March. It hardcoded a staging URL. None of this is in the diff description, so you only find out after you've half-reviewed it.

You didn't get bad code. You got code for *some other project* — a reasonable guess from a model that had no idea what your project actually is. So you type the corrections into chat. And tomorrow, in a fresh window, you type them again.

## The idea

Treat the agent like a brilliant intern with total amnesia. Sharp, fast, genuinely capable — but every morning they walk in remembering nothing about your stack, your rules, or yesterday's decisions.

You would not re-explain your project to a new intern out loud, every day, forever. You'd hand them an **operating manual**: what we build, what tools we use, what you must never do, and how to check your own work. Then you'd point them at the deeper docs for the rest.

That manual is `AGENTS.md`. It lives at the repo root, in version control, where every session can read it. The chat is amnesiac. The repo remembers.

<BeforeAfter before-label="Prompt-only" after-label="With harness">
<template #before>

**You, every single session:**

> "Add an endpoint. We use Fastify, not Express. Vitest, not Jest. No axios — use the built-in fetch. Routes go in `src/routes/`. Never log request bodies, they contain PII."

The agent obeys… until the next window, where it knows none of this again.

</template>
<template #after>

**You, once:**

> "Add an endpoint."

The agent reads `AGENTS.md`, sees the stack, the folder layout, and the "never log PII" rule, and gets it right on the first try — in every future session, without you saying a word.

</template>
</BeforeAfter>

## Copilot in practice

**1. Create the operating manual.** Make `AGENTS.md` at the repo root:

```markdown
# AGENTS.md

## Project purpose
A billing dashboard for SaaS teams. Read invoices, manage plans, export CSV.

## Tech stack (with versions)
- Node 20.x, TypeScript 5.5
- Fastify 4.x (NOT Express)
- Vitest 2.x (NOT Jest)
- Prisma 5.x → Postgres 16
- React 18 + Vite 5

## Hard constraints
- MUST use built-in `fetch`. Do NOT add axios or node-fetch.
- MUST put routes in `src/routes/`, one file per resource.
- NEVER log request bodies or tokens — they contain PII.
- NEVER edit files in `generated/` — they're built from the schema.
- DO NOT commit `.env` or anything under `secrets/`.

## Verification commands
- Install:  `npm ci`
- Lint:     `npm run lint`
- Test:     `npm run test`
- Typecheck:`npm run typecheck`
- Build:    `npm run build`

## Doc map (go deeper)
- API design        → docs/api.md
- Database & Prisma  → docs/data.md
- Frontend patterns  → docs/frontend.md
- Auth & security    → docs/security.md
```

**2. Add the Copilot-specific file.** Run the built-in slash command:

```text
/init
```

This generates `.github/copilot-instructions.md`. Trim it to the rules that apply *everywhere* and have it defer to the manual:

```markdown
# Copilot instructions
- Read AGENTS.md before starting any task. It is the source of truth.
- Follow every "MUST" and "NEVER" in AGENTS.md exactly.
- Run the verification commands in AGENTS.md before declaring work done.
- For folder-specific rules, see .github/instructions/.
```

::: warning Two files, not two sources of truth
`AGENTS.md` holds the facts. The tool file just *points* at it. Don't paste the whole manual into both — when they drift, the agent trusts the wrong one.
:::

## Universal pattern

Every coding agent looks for a root manual. The names differ; the job is identical.

| Tool | Reads |
|------|-------|
| GitHub Copilot | `.github/copilot-instructions.md` |
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursorrules` / `.cursor/rules` |
| **All of them** | **`AGENTS.md`** (the emerging shared standard) |

Tool-agnostic move: keep one real `AGENTS.md`, and make the tool file a thin pointer.

```markdown
<!-- CLAUDE.md -->
See AGENTS.md for project facts, constraints, and verification commands.
Always read it before acting.
```

Now switching tools — or onboarding a teammate on a different one — costs nothing. One brain, many faces.

::: details Go deeper (teams & advanced)
**Hard constraints are guardrails, not vibes.** "Prefer clean code" is noise — every agent already "prefers" it. "NEVER call the payments API without an idempotency key" is a guardrail that prevents a double-charge incident. Audit your constraints: if violating one wouldn't cause a real bug, security hole, or rollback, it isn't a hard constraint.

**Why ~200 lines is the ceiling.** Long manuals get *skimmed*, not read — by agents and humans alike. Past a couple hundred lines, the model starts missing sections, and the most important rule (yours) competes with filler. A short map that links to `docs/` is read in full. Progressive disclosure isn't tidiness; it's recall.

**Scope rules to where they apply.** For path-specific conventions, use `.github/instructions/*.instructions.md` with an `applyTo` glob so frontend rules don't pollute backend tasks. Keeps the root manual short and the rules sharp.

**Make it a PR check.** Treat `AGENTS.md` like code: review changes to it, and reject the giant-manual PR before it lands. The manual is the most leveraged file in the repo — every session reads it.
:::

## Try it

Open your project and create `AGENTS.md` from the skeleton above. Fill in the real **tech stack with version numbers** and **three hard constraints** that, if broken, would cause a real incident. Keep the whole file under 60 lines. Then run `/init` (or check your `CLAUDE.md`) and replace its body with a pointer to `AGENTS.md`.

## Checkpoint

1. What's the difference between `AGENTS.md` and `.github/copilot-instructions.md`?
2. Which of these belongs in "hard constraints": "write readable code" or "NEVER log tokens"?
3. Why cap instructions at ~200 lines instead of documenting everything inline?

<details>
<summary>Answers</summary>

1. `AGENTS.md` is the tool-agnostic source of truth (facts, constraints, commands). The Copilot file is the tool-specific entry point that points at `AGENTS.md`.
2. "NEVER log tokens" — it's a specific rule whose violation causes a real security bug. "Write readable code" is a vibe every model already has.
3. Long files get skimmed and sections get missed. A short map that links to `docs/` is actually read in full — better recall for the rules that matter.

</details>

## Further reading

- The shared standard for root manuals: [agents.md](https://agents.md)
- GitHub docs: [Adding repository custom instructions for Copilot](https://docs.github.com/en/copilot/customizing-copilot/adding-repository-custom-instructions-for-github-copilot)
- Course: [M05 — Small maps beat giant manuals](./p1-instructions) for the progressive-disclosure deep dive
- Next: [P2 — State: work survives the chat window](./p2-state)
