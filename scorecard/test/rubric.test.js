import { test } from 'node:test'
import assert from 'node:assert/strict'
import { loadRubric } from '../lib/score.js'

const rubric = loadRubric()
const DETECT_TYPES = new Set(['file-exists', 'file-exists-any', 'file-contains', 'file-line-max', 'glob', 'package-script', 'any-of'])

test('rubric has required top-level fields', () => {
  assert.ok(rubric.version)
  assert.equal(typeof rubric.maxScore, 'number')
  assert.ok(Array.isArray(rubric.pillars) && rubric.pillars.length === 5)
})

test('every criterion is well-formed', () => {
  const ids = new Set()
  for (const p of rubric.pillars) {
    assert.match(p.id, /^[a-z0-9-]+$/)
    assert.ok(p.name && typeof p.max === 'number')
    for (const c of p.criteria) {
      assert.ok(!ids.has(c.id), `duplicate criterion id: ${c.id}`)
      ids.add(c.id)
      assert.match(c.id, /^[a-z0-9-]+$/)
      assert.equal(typeof c.points, 'number')
      assert.ok(c.question, `criterion ${c.id} missing question`)
      assert.ok(c.detect && DETECT_TYPES.has(c.detect.type), `criterion ${c.id} bad detect type`)
    }
  }
})

test('bands cover the full 0..maxScore range without gaps', () => {
  const bands = [...rubric.bands].sort((a, b) => a.min - b.min)
  assert.equal(bands[0].min, 0)
  assert.equal(bands[bands.length - 1].max, rubric.maxScore)
  for (let i = 1; i < bands.length; i++) {
    assert.equal(bands[i].min, bands[i - 1].max + 1, 'bands must be contiguous')
  }
})
