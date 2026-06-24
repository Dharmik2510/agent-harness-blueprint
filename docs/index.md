---
layout: home

hero:
  name: "Agent Harness Blueprint"
  text: "Turn Copilot into a reliable teammate"
  tagline: "A visual, hands-on course for teams who use VS Code Copilot — build the workspace, checks, and habits that make AI sessions actually finish the job."
  image:
    src: /logo.svg
    alt: Agent Harness Blueprint
  actions:
    - theme: brand
      text: Start the 15-min quick start
      link: /start-here/quick-start
    - theme: alt
      text: Jump into Lab 01
      link: /labs/lab-01-baseline-vs-harness
    - theme: alt
      text: Copy templates
      link: /resources/templates

features:
  - icon: "🎯"
    title: Copilot-first
    details: Every module includes VS Code Copilot file paths, slash commands, and copy-paste chat prompts — not generic agent theory.
  - icon: "🧪"
    title: Learn by doing
    details: Six labs on a real React app. Watch prompt-only chaos vs harness discipline side by side.
  - icon: "📦"
    title: Ship-ready templates
    details: Drop AGENTS.md, copilot-instructions.md, feature lists, and init.sh into your repo today.
  - icon: "🔁"
    title: The Reliability Loop
    details: Bootstrap → scope → build → verify → handoff. One repeatable rhythm every session.
  - icon: "📊"
    title: Five pillars framework
    details: Instructions, state, verification, scope, lifecycle — diagnose any failure in seconds.
  - icon: "🏢"
    title: Team rollout guide
    details: Org-wide Copilot instructions, pilot plan, and metrics that matter for engineering managers.
---

## Pick your path

<div class="ahb-bento">

<a class="ahb-card" href="./start-here/quick-start">
  <span class="ahb-pill">15 minutes</span>
  <strong>Quick start</strong>
  <span>Copy templates, run validate, fix your repo today.</span>
</a>

<a class="ahb-card" href="./modules/">
  <span class="ahb-pill">~8 hrs read</span>
  <strong>Module track</strong>
  <span>10 short chapters from “why agents fail” to full harness design.</span>
</a>

<a class="ahb-card" href="./labs/lab-01-baseline-vs-harness">
  <span class="ahb-pill">Hands-on</span>
  <strong>Lab track</strong>
  <span>Build muscle memory on the Knowledge Hub app.</span>
</a>

<a class="ahb-card" href="./guide/copilot/">
  <span class="ahb-pill">Copilot deep dive</span>
  <strong>VS Code guide</strong>
  <span>Instructions, agents, skills, hooks, and org rollout.</span>
</a>

</div>

## The Reliability Loop

Most agent failures are not “bad model” problems. They are **missing systems** problems.

<div class="ahb-pillars">
  <div class="ahb-pillar"><div class="ahb-pillar-num">1</div><div class="ahb-pillar-label">Bootstrap</div></div>
  <div class="ahb-pillar"><div class="ahb-pillar-num">2</div><div class="ahb-pillar-label">Scope</div></div>
  <div class="ahb-pillar"><div class="ahb-pillar-num">3</div><div class="ahb-pillar-label">Build</div></div>
  <div class="ahb-pillar"><div class="ahb-pillar-num">4</div><div class="ahb-pillar-label">Verify</div></div>
  <div class="ahb-pillar"><div class="ahb-pillar-num">5</div><div class="ahb-pillar-label">Handoff</div></div>
</div>

```mermaid
flowchart LR
    subgraph loop [Reliability Loop]
        A[Bootstrap init.sh] --> B[Read state]
        B --> C[One feature]
        C --> D[Implement]
        D --> E{Verify}
        E -->|fail| D
        E -->|pass| F[Update PROGRESS]
        F --> G[Handoff]
    end
    G -.->|next session| A
```

::: tip Smart intern metaphor
Think of Copilot as a fast intern with amnesia. Your harness is the **onboarding binder** — tasks, rules, proof, and handoff notes that survive every new chat window.
:::

## What makes this course different

| You get | Typical agent tutorials |
|---------|-------------------------|
| Copilot-specific files and prompts | Generic “write a better prompt” |
| Copy-ready template packs | Theory only |
| Side-by-side lab comparisons | Single happy-path demo |
| Failure mode lookup table | Blame the model |
| 10 focused modules (~8 min each) | Marathon lecture series |

## New here?

1. [Glossary](./start-here/glossary) — plain-language terms
2. [Quick start](./start-here/quick-start) — working harness in 15 minutes
3. [Module 01](./modules/m01-when-the-model-is-not-the-problem) — why capability ≠ reliability
