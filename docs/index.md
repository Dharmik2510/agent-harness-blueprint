# Agent Harness Blueprint

*Make AI coding agents reliable — a practical course for teams using VS Code Copilot.*

**Estimated time to first value:** 15 minutes (quick start) · **Full course:** ~2 weeks part-time

## The core idea

A smart AI model is like a capable intern on day one. Without an onboarding binder, clear tasks, and a way to check their work, they will guess, forget, and say "done" too early.

A **harness** is that onboarding binder — plus the tools, checks, and habits that make agent sessions repeatable.

```mermaid
flowchart LR
    task[YourTask] --> harness[HarnessFiles]
    harness --> agent[AIAgent]
    agent --> work[ScopedWork]
    work --> verify[Verification]
    verify -->|pass| state[UpdateState]
    verify -->|fail| work
    state --> handoff[SessionHandoff]
```

## Choose your path

### New to harness engineering?
1. [Glossary](./start-here/glossary) — key terms in plain language
2. [Setup: VS Code Copilot](./start-here/setup-copilot) — your org's primary tool
3. [M01 — When the model is not the problem](./modules/m01-when-the-model-is-not-the-problem)

### Want hands-on proof first?
Jump to [Lab 01 — Baseline vs harness](./labs/lab-01-baseline-vs-harness) after a 10-minute skim of [M03 — The five pillars](./modules/m03-the-five-pillars).

### Need copy-ready files today?
Go to [Resource Library → Templates](./resources/templates).

## The five pillars

| Pillar | One-line summary |
|--------|------------------|
| Instructions | What to do, in what order, what to read |
| State | What's done, what's next, what's blocked |
| Verification | Tests and checks before claiming "done" |
| Scope | One feature at a time, explicit definition of done |
| Lifecycle | Same bootstrap and handoff every session |

## Course map

**Part 1 — Foundations:** M01, M02, M03  
**Part 2 — Workspace Design:** M04, M05, M06  
**Part 3 — Reliability:** M07, M08, M09  
**Part 4 — Operations:** M10  
**Capstone:** Lab 06

## Quick links

- [Copilot Guide](./guide/copilot/) — first-class VS Code Copilot track
- [Provider comparison](./guide/providers) — Copilot vs Cursor vs Claude Code vs Codex
- [Failure modes](./resources/failure-modes) — symptom → fix lookup table
