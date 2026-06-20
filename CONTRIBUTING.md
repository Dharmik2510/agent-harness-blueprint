# Contributing to Agent Harness Blueprint

Thank you for helping improve this course.

## Principles

- **Original prose** — do not copy walkinglabs or other courses verbatim
- **Beginner-first** — short sentences, glossary links, estimated read times
- **Copilot-first** — every module needs a "Copilot in practice" section
- **Actionable** — prefer copy-ready templates over theory alone

## Development

```bash
npm install
npm run docs:dev
npm run validate
```

## Adding content

| Type | Location |
|------|----------|
| Module | `docs/modules/` |
| Lab write-up | `docs/labs/` + `labs/lab-XX-*/` |
| Template | `templates/` |
| Copilot guide | `docs/guide/copilot/` |

## Pull request checklist

- [ ] Links work in VitePress preview
- [ ] New templates pass `validate-harness.sh` when applied
- [ ] Mermaid diagrams render
- [ ] No plagiarized paragraphs from source courses

## License

By contributing, you agree your contributions are licensed under MIT.
