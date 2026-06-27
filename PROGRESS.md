# Progress log

## 2026-06-27 — Harness Scorecard rebuild

- **Feature:** scorecard-rebuild
- **Status:** done
- **Changes:** Added the Harness Scorecard (rubric + `harness-score` CLI + interactive `/diagnose`); rebuilt curriculum around the five pillars (F/P/O modules); reframed the site as Diagnose → Learn → Build → Prove; visual identity (Journey, Pillars, BeforeAfter, mermaid rendering, new logo); readiness (README, community files, CI). Repo dogfoods at 100/100.
- **Verification:**
  - `npm run docs:build` — pass (no dead links)
  - `npm test` — 16/16 pass
  - `npm run score -- .` — 100/100
- **Next:** Open a PR from `harness-scorecard-rebuild` to `main`; publish the `harness-score` CLI to npm so `npx harness-score` works for everyone.

---

## 2026-06-20 — Initial course implementation

- **Feature:** course-v1
- **Status:** done
- **Changes:** Full repo scaffold — modules, labs, templates, Copilot guide, skill
- **Verification:** docs:build, validate-harness.sh
- **Next:** Push to GitHub, enable Pages
