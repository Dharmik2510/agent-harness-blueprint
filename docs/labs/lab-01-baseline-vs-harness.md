# Lab 01 — Baseline vs harness

*~45 min · Prerequisites: [M03](/modules/m03-the-five-pillars)*

## Goal

Run the **same feature task** twice on the Knowledge Hub app — once prompt-only, once with a minimal harness. Measure the difference.

## App location

[`labs/knowledge-hub`](https://github.com/dharmiksoni/agent-harness-blueprint/tree/main/labs/knowledge-hub) — Vite + React document search.

## Part A — Prompt only (baseline)

1. Open `labs/knowledge-hub` in VS Code **without** copying harness files.
2. Use Copilot prompt from [`copilot-prompts.md`](https://github.com/dharmiksoni/agent-harness-blueprint/blob/main/labs/lab-01-baseline-vs-harness/copilot-prompts.md) — **Baseline section**.
3. Task: add highlight snippets to search results (bold matching query text).
4. Record: Did it claim done? Did `npm test` pass? Unrelated changes?

## Part B — Minimal harness

1. Copy [`templates/universal`](https://github.com/dharmiksoni/agent-harness-blueprint/tree/main/templates/universal) and [`templates/copilot/minimal`](https://github.com/dharmiksoni/agent-harness-blueprint/tree/main/templates/copilot/minimal) into the app.
2. Add feature to `feature_list.json`:

```json
{
  "id": "search-highlight",
  "title": "Highlight search matches in results",
  "status": "open",
  "acceptance": [
    "Matching query text is visually highlighted in results",
    "npm run lint passes",
    "npm test passes"
  ]
}
```

3. Run harness session prompt from `copilot-prompts.md` — **Harness section**.
4. Compare with Part A.

## Starter vs solution

| Folder | Contents |
|--------|----------|
| [`starter/`](https://github.com/dharmiksoni/agent-harness-blueprint/tree/main/labs/lab-01-baseline-vs-harness/starter) | Feature spec only — no harness |
| [`solution/`](https://github.com/dharmiksoni/agent-harness-blueprint/tree/main/labs/lab-01-baseline-vs-harness/solution) | Example harness file set |

## Success criteria

- [ ] Documented verification gap for baseline run
- [ ] Harness run passes `bash scripts/validate-harness.sh`
- [ ] Can explain which pillar fixed each baseline failure

## Next

[Lab 02 — Agent-readable workspace](./lab-02-agent-readable-workspace)
