import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { loadRubric, scoreRepo } from '../lib/score.js'
import { formatMarkdown, formatTerminal, formatJson } from '../lib/report.js'

function tmpRepo(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hs-score-'))
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(root, rel)
    fs.mkdirSync(path.dirname(full), { recursive: true })
    fs.writeFileSync(full, content)
  }
  return root
}

const rubric = loadRubric()

test('rubric pillar maxes sum to maxScore', () => {
  const sum = rubric.pillars.reduce((a, p) => a + p.max, 0)
  assert.equal(sum, rubric.maxScore)
})

test('each pillar criteria points sum to its max', () => {
  for (const p of rubric.pillars) {
    const sum = p.criteria.reduce((a, c) => a + c.points, 0)
    assert.equal(sum, p.max, `pillar ${p.id} criteria sum ${sum} != max ${p.max}`)
  }
})

test('empty repo scores 0', () => {
  const root = tmpRepo({ 'readme.txt': 'nothing' })
  const result = scoreRepo(root, rubric)
  assert.equal(result.total, 0)
  assert.equal(result.gaps.length, rubric.pillars.flatMap((p) => p.criteria).length)
  assert.equal(result.band.label, 'Prompt-only')
})

test('full harness fixture scores 100', () => {
  const root = tmpRepo({
    'AGENTS.md': [
      '# AGENTS.md', '## Constraints', '- One feature at a time. Do not mark work done until tests pass.',
      '## Verification (before claiming done)', 'npm test', 'npm run lint', 'npm run build',
      '## Session lifecycle', 'Start: run init.sh, read PROGRESS.md and feature_list.json.',
    ].join('\n'),
    '.github/copilot-instructions.md': 'applyTo rules; must follow conventions; never commit secrets',
    '.github/instructions/tests.instructions.md': 'applyTo: **/*.test.ts',
    '.github/workflows/ci.yml': 'on: push',
    'PROGRESS.md': '## Session 1\nNext: implement search.',
    'SESSION_HANDOFF.md': '## Checklist\n- [ ] Ran verification\nhandoff',
    'feature_list.json': JSON.stringify({ features: [{ id: 'x', status: 'open', acceptance: ['done'] }] }),
    'scripts/init.sh': '#!/usr/bin/env bash\nnpm install',
    'package.json': JSON.stringify({ scripts: { test: 'vitest' } }),
    'src/app.test.ts': 'test()',
  })
  const result = scoreRepo(root, rubric)
  assert.equal(result.total, 100, JSON.stringify(result.gaps, null, 2))
  assert.equal(result.band.label, 'Production harness')
  assert.equal(result.gaps.length, 0)
})

test('partial harness identifies weakest pillar', () => {
  const root = tmpRepo({
    'AGENTS.md': '# A\nnpm test\nlint\nbuild\nbefore claiming done run tests\none feature at a time\nPROGRESS feature_list\nsession lifecycle init.sh',
    'PROGRESS.md': 'next step here',
    'scripts/init.sh': 'x',
    'SESSION_HANDOFF.md': '- [ ] handoff checklist',
  })
  const result = scoreRepo(root, rubric)
  // State is missing feature_list.json -> should not be perfect; weakest should be a low pillar
  assert.ok(result.total > 0 && result.total < 100)
  assert.ok(result.weakest)
})

test('report formatters produce output without throwing', () => {
  const root = tmpRepo({ 'AGENTS.md': 'must' })
  const result = scoreRepo(root, rubric)
  assert.ok(formatTerminal(result, { color: false }).includes('Harness Scorecard'))
  assert.ok(formatMarkdown(result).includes('# Harness Scorecard report'))
  assert.ok(JSON.parse(formatJson(result)).total >= 0)
})
