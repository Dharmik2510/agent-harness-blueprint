# Quick start — 15 minutes to a working harness

*Your first win: Copilot sessions that verify before they claim "done".*

::: info Before you start
You need VS Code, GitHub Copilot Chat, and a repository you can edit. No prior harness experience required.
:::

## What you'll have at the end

```text
your-repo/
├── AGENTS.md
├── PROGRESS.md
├── feature_list.json
├── SESSION_HANDOFF.md
├── scripts/init.sh
└── .github/
    ├── copilot-instructions.md
    └── instructions/tests.instructions.md
```

## Step 1 — Generate Copilot instructions (3 min)

Open your repo in VS Code. In **Copilot Chat**, run:

```text
/init
```

Keep the generated file short. You will strengthen it in step 3.

## Step 2 — Copy template packs (5 min)

From this course repo, copy:

**Universal pack** → project root:

- `templates/universal/AGENTS.md`
- `templates/universal/PROGRESS.md`
- `templates/universal/feature_list.json`
- `templates/universal/SESSION_HANDOFF.md`
- `templates/universal/scripts/init.sh` → `your-repo/scripts/init.sh`

**Copilot pack** → `.github/`:

- `templates/copilot/minimal/copilot-instructions.md`
- `templates/copilot/minimal/instructions/tests.instructions.md`

Edit `AGENTS.md` — replace stack versions and verification commands with **your** project's real commands.

## Step 3 — Validate (2 min)

```bash
bash scripts/validate-harness.sh /path/to/your/repo
```

Fix anything the script flags.

## Step 4 — First harnessed session (5 min)

Paste into Copilot Chat:

```text
Follow AGENTS.md and .github/copilot-instructions.md.

1. Run bash scripts/init.sh
2. Read PROGRESS.md and feature_list.json
3. Pick one "open" feature — or help me add my first feature to feature_list.json
4. Run all verification commands before saying done
5. Update PROGRESS.md when finished
```

## What changed?

| Before harness | After harness |
|----------------|---------------|
| Copilot guesses conventions | Reads AGENTS.md |
| "Done!" with red tests | Verify gate blocks false done |
| New chat = amnesia | PROGRESS.md continues work |
| Scope creep | One feature_list item at a time |

## Next steps

<div class="ahb-bento">

<a class="ahb-card" href="./glossary">
  <strong>Glossary</strong>
  <span>Key terms in plain language.</span>
</a>

<a class="ahb-card" href="./setup-copilot">
  <strong>Copilot setup</strong>
  <span>Slash commands, agents, org tips.</span>
</a>

<a class="ahb-card" href="../labs/lab-01-baseline-vs-harness">
  <strong>Lab 01</strong>
  <span>See baseline vs harness on a real app.</span>
</a>

</div>
