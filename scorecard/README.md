# Harness Scorecard

The measurable spine of this course. **One rubric, two surfaces** — so the web quiz and the CLI can never disagree.

```
rubric.json ──┬── web  → docs Scorecard component (self-report questions → score)
              └── cli  → harness-score (inspects a real repo → graded report)
```

## Score a real repo

```bash
npm run score -- /path/to/your/repo      # or: node scorecard/bin/harness-score.js .
```

Options:

| Flag | Effect |
|------|--------|
| `--json` | Machine-readable result |
| `--md [file]` | Write a markdown report (default `report.md`) |
| `--min <n>` | Exit non-zero below `<n>` — a CI gate |
| `--no-color` | Plain output |

## The rubric

`rubric.json` defines five pillars (20 points each, 100 total). Each criterion has:

- `question` — what the **web** scorecard asks the learner.
- `detect` — how the **CLI** checks a real repo (`file-exists`, `file-contains`, `glob`, `package-script`, `any-of`, …).
- `fixLink` — where to go learn it.

Edit `rubric.json` and **both** surfaces update. `rubric.schema.json` documents the shape; `npm test` validates structure, scoring math, and every detect rule.

## Layout

| File | Role |
|------|------|
| `rubric.json` | Source of truth |
| `rubric.schema.json` | Schema for the rubric |
| `lib/detect.js` | Detection engine (dependency-free glob + file checks) |
| `lib/score.js` | Loads rubric, runs detection, computes scores |
| `lib/report.js` | Terminal / markdown / JSON formatters |
| `bin/harness-score.js` | CLI entry point |
| `test/` | `node --test` suite |
