# Lab 02 — Agent-readable workspace

*~1 hr · Prerequisites: Lab 01*

## Goal

Restructure Knowledge Hub so Copilot can navigate the repo without burning context on exploration.

## Tasks

1. Add `docs/architecture.md` — component map + data flow
2. Expand `AGENTS.md` with doc map (progressive disclosure)
3. Add `.github/instructions/react.instructions.md` for `src/**`
4. Run `/init` merge with existing copilot-instructions

## Copilot prompt

```text
Read AGENTS.md doc map before structural changes.
Add docs/architecture.md for the Knowledge Hub app (React + Vite).
Keep copilot-instructions.md under 100 lines — link to docs for detail.
```

## Code

Continue in `labs/knowledge-hub`. Starter = Lab 01 solution harness.

## Success criteria

- [ ] New agent session finds architecture in &lt;2 minutes without guessing
- [ ] Root instruction files stay short with links

## Next

[Lab 03 — Multi-session continuity](./lab-03-multi-session-continuity)
