#!/usr/bin/env node
// harness-score — grade a repository against the five harness pillars.
import fs from 'node:fs'
import process from 'node:process'
import { loadRubric, scoreRepo } from '../lib/score.js'
import { formatTerminal, formatMarkdown, formatJson } from '../lib/report.js'

const HELP = `harness-score — grade a repository against the five harness pillars

Usage:
  harness-score [path] [options]

Options:
  --json            Print the result as JSON
  --md [file]       Write a markdown report (default: report.md) and print path
  --min <n>         Exit non-zero if score is below <n> (CI gate)
  --no-color        Disable ANSI colors
  -h, --help        Show this help

Examples:
  harness-score .
  harness-score ../my-repo --md report.md
  harness-score . --min 70        # fail CI under 70/100
`

function parseArgs(argv) {
  const opts = { path: '.', json: false, md: null, min: null, color: true }
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a === '-h' || a === '--help') opts.help = true
    else if (a === '--json') opts.json = true
    else if (a === '--no-color') opts.color = false
    else if (a === '--md') {
      const next = argv[i + 1]
      if (next && !next.startsWith('-')) { opts.md = next; i++ } else { opts.md = 'report.md' }
    } else if (a === '--min') {
      opts.min = Number(argv[++i])
    } else if (!a.startsWith('-')) {
      opts.path = a
    }
  }
  return opts
}

function main() {
  const opts = parseArgs(process.argv.slice(2))
  if (opts.help) { process.stdout.write(HELP); return 0 }

  if (!fs.existsSync(opts.path) || !fs.statSync(opts.path).isDirectory()) {
    process.stderr.write(`error: not a directory: ${opts.path}\n\n${HELP}`)
    return 2
  }

  let rubric
  try {
    rubric = loadRubric()
  } catch (e) {
    process.stderr.write(`error: could not load rubric: ${e.message}\n`)
    return 2
  }

  const result = scoreRepo(opts.path, rubric)
  const color = opts.color && process.stdout.isTTY !== false && !process.env.NO_COLOR

  if (opts.json) {
    process.stdout.write(formatJson(result) + '\n')
  } else {
    process.stdout.write(formatTerminal(result, { color }) + '\n')
  }

  if (opts.md) {
    fs.writeFileSync(opts.md, formatMarkdown(result))
    if (!opts.json) process.stdout.write(`  Markdown report written to ${opts.md}\n\n`)
  }

  if (opts.min != null && result.total < opts.min) {
    if (!opts.json) process.stderr.write(`  Score ${result.total} is below the required ${opts.min}.\n`)
    return 1
  }
  return 0
}

process.exit(main())
