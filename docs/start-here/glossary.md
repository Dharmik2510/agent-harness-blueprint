# Glossary

*~5 min read · Prerequisites: none*

Plain-language definitions used throughout this course. Terms link back here from every module.

## Agent / coding agent

An AI system that can read your codebase, edit files, run commands, and work across multiple steps — e.g. GitHub Copilot in VS Code, Cursor Agent, Claude Code, OpenAI Codex.

## Harness

Everything **outside the model weights** that shapes how an agent works: instructions, tools, environment setup, state files, verification commands, and session habits. A prompt file alone is **not** a harness.

## Harness engineering

Designing and maintaining that surrounding system so agents complete real tasks reliably — especially across long or multi-session work.

## The five pillars

The harness subsystems this course teaches:

1. **Instructions** — rules and maps the agent reads before acting
2. **State** — persisted progress (what's done, in progress, blocked)
3. **Verification** — commands that prove work is correct
4. **Scope** — boundaries on what to work on now
5. **Lifecycle** — bootstrap at session start, handoff at session end

## Capability gap

The difference between how well a model scores on benchmarks and how well it performs on your messy, real-world repo.

## Verification gap

The difference between the agent **believing** it is done and work **actually** being correct. One of the most common failure modes.

## Definition of done

A checklist of verifiable conditions — e.g. "all tests pass," "lint clean," "smoke URL returns 200." Without this, the agent invents its own standard.

## Progressive disclosure

Giving the agent a **map** (short index + links) instead of one giant instruction file. The agent pulls detail only when needed.

## Feature list

A machine-readable file (often `feature_list.json`) listing features, status, and acceptance criteria. Acts as a scope contract the agent cannot casually rewrite.

## Session handoff

End-of-session notes: what changed, what passed verification, what is blocked, and the exact next step for the following session.

## init.sh

A script run at the **start** of every agent session: install deps, run health checks, start dev services. Ensures the environment is ready before coding.

## AGENTS.md

A portable instruction file recognized by many agents (Copilot, Cursor, Codex). Project overview, stack, constraints, and links to deeper docs.

## copilot-instructions.md

GitHub Copilot's project-wide instruction file at `.github/copilot-instructions.md`. Auto-included in VS Code Copilot Chat requests.

## Diagnostic loop

When something fails: observe → map symptom to a pillar → fix that layer → retry. Repeat until stable. **Fix the harness before swapping models.**

## Smart intern metaphor

Throughout this course we compare agents to a capable intern: smart, fast, but needs clear tasks, written conventions, and someone to check their work before merge.
