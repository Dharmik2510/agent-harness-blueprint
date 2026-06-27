# Lab 04 — Scope control

*~1 hr · Pillar focus: Scope 🎯 · Pairs with [Module P4](../modules/p4-scope)*

::: tip Measure first
**Starting score (typical): ~70/100** (Instructions + State at 20). **Target after this lab: Scope 20/20.**
Run before and after:
```bash
cd labs/knowledge-hub
npx --yes harness-score .
```
:::

## What you'll build

Guardrails that keep Copilot on **one feature at a time** even when you bait it with "while you're at it…". You'll add **per-feature status**, explicit **acceptance criteria**, a **one-feature rule**, and a **scoped instruction file** that only applies to certain paths.

The Scope pillar scores:

| Criterion | Points | How to earn it |
|-----------|:--:|----------------|
| Feature list tracks `status` per item | 5 | `"status"` field on each feature |
| Features have acceptance criteria | 5 | `"acceptance"` field on each feature |
| One-feature-at-a-time rule | 5 | rule in AGENTS.md / copilot-instructions.md |
| Rules scoped to file patterns | 5 | `.github/instructions/*.instructions.md` with `applyTo` |

## Setup

```bash
cd labs/knowledge-hub
npm install
```

Carry in the Lab 03 harness.

## Part A — Bait the scope creep

Add **two** open features, then ask for only the first while baiting extra work:

**`feature_list.json`** (note `status` + `acceptance` on every item)

```json
{
  "features": [
    {
      "id": "empty-state-message",
      "title": "Friendly empty state when no documents match",
      "status": "open",
      "acceptance": [
        "When a non-empty query matches nothing, show a helpful message",
        "Message suggests trying a different term",
        "npm run lint passes",
        "npm test passes"
      ]
    },
    {
      "id": "dark-mode-toggle",
      "title": "Dark / light theme toggle",
      "status": "open",
      "acceptance": ["Toggle switches theme", "Preference persists"]
    }
  ]
}
```

The trap prompt (paste it as-is):

```text
Implement feature empty-state-message.
Also while you're at it, refactor all CSS to CSS modules and add the
dark/light toggle from the backlog.
```

Without a scope guard, Copilot happily does all three and your diff sprawls. Score before fixing and note the 🎯 row.

## Part B — Add the scope guardrails

Add the one-feature rule to your instructions (if Lab 02 already added "one feature at a time," confirm it's there):

**append to `.github/copilot-instructions.md`**

```markdown
## Scope
- Work on exactly **one feature** from feature_list.json per session.
- If asked for work outside the selected feature, **do not implement it**.
  Add a new feature_list entry (status "open") or note it as a blocker in
  PROGRESS.md, then continue the selected feature only.
- Stay in scope: the git diff should touch only files for the active feature.
```

Add a **scoped** instruction file — rules that apply only to source files. The `applyTo` front matter is what the scorecard detects, and it's how real Copilot scoping works:

**`.github/instructions/react.instructions.md`**

```markdown
---
applyTo: "src/**/*.{ts,tsx}"
---
# Rules for src/ (React + TypeScript)

- Keep search logic pure in `src/lib`; UI changes stay in `src/App.tsx`.
- Any new search behavior **must** come with a unit test in `src/lib`.
- No `any`. TypeScript strict. No drive-by refactors outside the active feature.
```

Now re-run the trap prompt. The agent should implement `empty-state-message` only, decline or defer the CSS refactor, and record `dark-mode-toggle` as an existing backlog item rather than building it.

## Verify your gain

```bash
npx --yes harness-score .
```

Expected: 🎯 **Scope 20/20**.

| Criterion | Before | After |
|-----------|:--:|:--:|
| status per feature | 0–5 | 5 |
| acceptance criteria | 0–5 | 5 |
| one-feature rule | 0–5 | 5 |
| scoped instruction file (`applyTo`) | 0 | 5 |

## Copilot prompts

**Refuse out-of-scope work correctly:**

```text
Follow AGENTS.md and the scope rules. Implement ONLY feature
empty-state-message. If I ask for anything else, add it to feature_list.json
or PROGRESS.md blockers instead of building it. Confirm the plan first.
```

**Self-check the diff stayed in scope:**

```text
Review the current git diff. List every file changed and which feature it
belongs to. Flag anything not tied to empty-state-message.
```

## Checkpoint

- [ ] Every feature in `feature_list.json` has `status` and `acceptance`
- [ ] One-feature-at-a-time rule is in your instructions
- [ ] `.github/instructions/react.instructions.md` exists with `applyTo`
- [ ] Scope pillar reads **20/20**
- [ ] On the trap prompt, only `empty-state-message` files appear in the diff

## Next

[Lab 05 — Verification gates](./lab-05-verification-gates) — make "done" mean proven: Verification to 20/20.
