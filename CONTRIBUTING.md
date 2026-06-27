# Contributing to Agent Harness Blueprint

Thank you for helping improve this course. Beginners welcome — see the [Code of Conduct](./CODE_OF_CONDUCT.md).

## Principles

- **Original prose** — write in your own words; do not copy other courses verbatim
- **Beginner-first** — short sentences, glossary links, estimated read times
- **Copilot-first** — every pillar module needs a "Copilot in practice" section
- **Measurable** — content ties back to the Harness Scorecard and the five pillars
- **Actionable** — prefer copy-ready files over theory alone

## Development

```bash
npm install
npm run docs:dev      # local site preview
npm run docs:build    # production build — fails on dead links
npm test              # scorecard CLI + rubric tests
npm run score -- .    # grade a repo against the five pillars
```

## Project layout

| Type | Location |
|------|----------|
| Module | `docs/modules/` (`f*` foundations, `p*` pillars, `o*` operations) |
| Lab write-up | `docs/labs/` + `labs/lab-XX-*/` |
| Template | `templates/` |
| Copilot guide | `docs/guide/copilot/` |
| Scorecard rubric / CLI | `scorecard/` |
| Reusable site components | `docs/.vitepress/theme/components/` |

## Editing the scorecard

The rubric is the single source of truth at [`scorecard/rubric.json`](./scorecard/rubric.json) — both the web quiz and the CLI read it. To add or change a criterion, edit the rubric (each criterion has a `question` for the web, a `detect` rule for the CLI, and a `fixLink`). Run `npm test` — it validates the rubric shape, scoring math, and every `detect` rule.

## Pull request checklist

- [ ] `npm run docs:build` passes (dead links fail the build)
- [ ] `npm test` passes if you touched `scorecard/`
- [ ] New templates raise the score when applied (`npm run score -- <path>`)
- [ ] Mermaid diagrams render; internal links resolve
- [ ] No plagiarized paragraphs

## License

By contributing, you agree your contributions are licensed under MIT.
