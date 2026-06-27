# Agent Harness Blueprint — Measurable Rebuild (Harness Scorecard)

*Spec · 2026-06-27 · Branch: `harness-scorecard-rebuild`*

## Goal

Rebuild the Agent Harness Blueprint into a **visual, measurable, beginner-to-team course** where a single signature artifact — the **Harness Scorecard** — is the spine of the whole experience. Learners *diagnose* their repo, *learn* by pillar, *build* real harness files, and *re-score* to **prove** their improvement.

Success = a stranger lands on the repo, scores their project in 2 minutes, follows a clear path, and finishes comfortable with harness engineering using VS Code Copilot — with a measurable before/after to prove it.

## Audience

Layered. Beginner devs new to agents get a hand-held entry; working devs and teams get optional depth ("Go deeper" blocks, team rollout). Copilot-first, but universal/Cursor templates kept as a bonus.

## Non-negotiables

- VS Code Copilot is the primary agent throughout (real file paths, prompts, slash commands).
- Every module and lab maps to **scorecard points** so reading and building visibly move a number.
- The web scorecard and the CLI must never diverge — both read one rubric.
- `docs:build` stays green; the repo dogfoods its own harness.

## Core architecture: one rubric, two surfaces

A single source of truth, `rubric.json` (schema-validated), defines the 5 pillars, their criteria, point values, the question text (web), and the detection rule (CLI) for each criterion.

```
rubric.json
   ├── web  → Vue <Scorecard> component (questions → animated score)
   └── cli  → harness-score (inspects a real repo → graded report)
```

### Pillars & scoring (100 points total)

| Pillar | Points | Example criteria |
|--------|--------|------------------|
| Instructions | 20 | AGENTS.md present; tool mirror; constraints; under length budget |
| State | 20 | PROGRESS.md; feature_list.json; handoff doc |
| Verification | 20 | verification commands listed; "don't claim done until green" rule; CI |
| Scope | 20 | one-feature-at-a-time rule; feature statuses; scoped instructions |
| Lifecycle | 20 | init/bootstrap script; session workflow documented; handoff ritual |

Each criterion has: `id`, `pillar`, `points`, `question` (web), `detect` (CLI rule: file-exists / file-contains / glob), `fixLink` (module/lab to learn it).

## The journey (site re-spine)

Four stages, each a nav destination:

1. **① Diagnose** — interactive scorecard, glossary, Copilot setup.
2. **② Learn** — Foundations ×2 + one chapter per pillar ×5 + ops/team.
3. **③ Build** — 6 labs on the Knowledge Hub app, each tied to a pillar, each emitting real harness files.
4. **④ Prove** — re-score, measure delta, capstone, team rollout.

## Components

### 1. `rubric.json` + schema
Source of truth at repo root (or `scorecard/`). JSON Schema validates it in CI.

### 2. CLI `harness-score` (Node, replaces `validate-harness.sh`)
- `npx harness-score [path]` → colored terminal report: total /100, per-pillar bars, gaps, "fix next".
- `--json` and `--md report.md` outputs; non-zero exit below a threshold (CI gate).
- Cross-platform (Windows-safe). `validate-harness.sh` becomes a thin wrapper that calls it (back-compat).
- Unit-tested with the existing vitest setup (or a small test runner).

### 3. Web `<Scorecard>` (VitePress/Vue)
- Lives at `/diagnose` (and embedded on home). Reads `rubric.json`.
- Per-pillar questions → animated 0–100 score, per-pillar bars, **weakest pillar highlighted**, "Fix this next → M0X / Lab 0X" deep links. Result is shareable (URL hash encodes answers). No backend.

### 4. Curriculum (rebuilt modules)
Organized by pillar; each lesson has: visual before/after, *Copilot in practice* (real paths/prompts), the scorecard criteria it satisfies, a micro-exercise, a "Go deeper" block, and a checkpoint.
- Foundations: F1 When the model isn't the problem · F2 The harness & the scorecard.
- Pillars: Instructions · State · Verification · Scope · Lifecycle.
- Operations: Observability & handoff · Team rollout.

### 5. Labs (rebuilt)
6 labs on `labs/knowledge-hub`, each targeting a pillar and producing files the CLI then detects → measurable delta. Capstone = full harness scoring 90+. Each lab states its starting score and target score.

### 6. Visual identity
Reusable: pillar badges + icons, animated score bars, `<BeforeAfter>` component, consistent mermaid theme, upgraded color/type, refreshed logo & promo. Premium product feel.

### 7. Readiness
README rewrite (lead with "score your repo"), CONTRIBUTING, CODE_OF_CONDUCT, issue/PR templates, accurate badges, link-check in CI, `docs:build` green, this repo's own scorecard shown as a badge.

## Data flow

```
learner → /diagnose → answers (rubric.json) → score + weakest pillar
        → deep link → pillar module (learn) → lab (build real files)
        → npx harness-score . (CLI proves files exist) → higher score
```

## Error handling

- CLI: missing path → clear error + usage; unreadable files → counted as "not satisfied", never crash; malformed rubric → validation error naming the bad criterion.
- Web: no answers → score 0, neutral state; invalid URL hash → reset to clean state.
- Rubric drift: CI validates `rubric.json` against schema and runs CLI on this repo to assert an expected score.

## Testing

- `rubric.json` validates against schema (CI).
- `harness-score` unit tests: scoring math, each `detect` rule, report formatting, exit codes.
- `harness-score` run on a fixture repo (known files) asserts an exact score.
- `docs:build` succeeds; link-check passes.
- Manual: web scorecard produces same per-pillar result as CLI for an equivalent repo.

## Phasing (implementation order)

1. **Foundation** — `rubric.json` + schema; `harness-score` CLI + tests; wire into CI and `npm` scripts.
2. **Web scorecard** — Vue component reading the rubric; `/diagnose` page; home embed.
3. **Content** — rebuild modules (by pillar) and labs (emit real files), layered + Copilot-first.
4. **Visual polish** — components, theme, logo/promo, before/after.
5. **Readiness** — README/community files/CI link-check; dogfood scorecard badge.

Each phase is independently reviewable and leaves `docs:build` green.

## Out of scope (YAGNI)

- No backend/accounts/persistence for scores (URL hash only).
- No new agent integrations beyond existing Copilot/universal/Cursor.
- No video production (animated GIF/promo only).
