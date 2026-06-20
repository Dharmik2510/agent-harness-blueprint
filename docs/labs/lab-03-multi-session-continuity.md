# Lab 03 — Multi-session continuity

*~1 hr · Prerequisites: Lab 02*

## Goal

Complete a feature across **two separate Copilot sessions** using only `PROGRESS.md` and `feature_list.json` for memory.

## Setup

Add feature to `feature_list.json`:

```json
{
  "id": "doc-count-badge",
  "title": "Show match count badge next to search input",
  "status": "open",
  "acceptance": [
    "Badge shows number of matching documents",
    "Badge hidden when query empty",
    "npm test passes"
  ]
}
```

## Session 1

Implement UI skeleton only. End with PROGRESS.md and SESSION_HANDOFF.md filled. **Do not** mark feature done.

## Session 2

**New Copilot chat** — no verbal recap. Opener:

```text
Read PROGRESS.md and SESSION_HANDOFF.md. Continue feature doc-count-badge.
```

## Success criteria

- [ ] Session 2 continues without re-exploring entire repo
- [ ] Feature marked done only after full verification

## Next

[Lab 04 — Scope control](./lab-04-scope-control)
