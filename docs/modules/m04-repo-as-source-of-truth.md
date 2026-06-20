# M04 — Your repo is the agent's memory

*~8 min read · Part 2 — Workspace Design · Prerequisites: [M03](./m03-the-five-pillars)*

## The problem

Critical rules live in Slack threads, Notion pages, and someone's head. Copilot only sees what's in the workspace. If it is not in git, **the agent cannot rely on it.**

## The idea

Treat the repository as the **single source of truth** for anything the agent must follow:

- Architecture decisions → `docs/adr/` or `docs/architecture.md`
- Conventions → `AGENTS.md` + scoped instruction files
- Task status → `feature_list.json`, `PROGRESS.md`
- Verification → `package.json` scripts, `Makefile`, CI workflows

**Rule:** If a human needs to remember it for the agent to succeed, write it down in the repo.

## Copilot in practice

Add to `.github/copilot-instructions.md`:

```markdown
## Source of truth
- Prefer files in this repository over chat history
- If a convention is missing from docs, propose adding it to AGENTS.md before coding
- Read docs/architecture.md before structural changes
```

Use `/create-instruction` to add scoped rules for monorepo packages:

```text
/create-instruction Rules for packages/frontend: React 19, TanStack Query, no default exports
```

## Universal pattern

Repo readability checklist:

- [ ] `README.md` explains how to run and test
- [ ] `AGENTS.md` links to deeper docs (not duplicates them)
- [ ] Config files pin versions (`.nvmrc`, `package.json` engines)
- [ ] State files committed or gitignored intentionally (document which)

## Try it

List three "tribal knowledge" items your team knows but the repo does not. Add one to `AGENTS.md` today.

## Checkpoint

1. Why can't Copilot follow a rule that only exists in Slack?
2. Where should architecture decisions live?
3. What should an agent do when a convention is missing from the repo?

<details>
<summary>Answers</summary>

1. It only has access to workspace files and chat context — not external systems unless connected via MCP.
2. In versioned repo docs (`docs/`, ADRs), linked from `AGENTS.md`.
3. Propose documenting it in the repo before proceeding, or ask the human.

</details>

Next: [M05 — Small maps beat giant manuals](./m05-progressive-instructions)
