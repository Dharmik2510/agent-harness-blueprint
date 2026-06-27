import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { globToRegex, detect, listFiles } from '../lib/detect.js'

function tmpRepo(files) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'hs-'))
  for (const [rel, content] of Object.entries(files)) {
    const full = path.join(root, rel)
    fs.mkdirSync(path.dirname(full), { recursive: true })
    fs.writeFileSync(full, content)
  }
  return root
}

test('globToRegex handles *, **, and braces', () => {
  assert.ok(globToRegex('.github/workflows/*.{yml,yaml}').test('.github/workflows/ci.yml'))
  assert.ok(globToRegex('.github/workflows/*.{yml,yaml}').test('.github/workflows/deploy.yaml'))
  assert.ok(!globToRegex('.github/workflows/*.{yml,yaml}').test('.github/workflows/sub/ci.yml'))
  assert.ok(globToRegex('**/*.test.ts').test('src/deep/a.test.ts'))
  assert.ok(globToRegex('**/*.test.ts').test('a.test.ts'))
  assert.ok(globToRegex('**/test_*.py').test('tests/test_foo.py'))
})

test('listFiles skips ignored directories', () => {
  const root = tmpRepo({ 'a.js': '1', 'node_modules/b.js': '2', '.git/c': '3', 'src/d.js': '4' })
  const files = listFiles(root)
  assert.ok(files.includes('a.js'))
  assert.ok(files.includes('src/d.js'))
  assert.ok(!files.some((f) => f.includes('node_modules')))
  assert.ok(!files.some((f) => f.includes('.git')))
})

test('file-exists and file-exists-any', () => {
  const root = tmpRepo({ 'AGENTS.md': 'x', 'CLAUDE.md': 'y' })
  const files = listFiles(root)
  assert.equal(detect(root, { type: 'file-exists', path: 'AGENTS.md' }, files), true)
  assert.equal(detect(root, { type: 'file-exists', path: 'MISSING.md' }, files), false)
  assert.equal(detect(root, { type: 'file-exists-any', paths: ['nope', 'CLAUDE.md'] }, files), true)
})

test('file-contains respects flags and multiple paths', () => {
  const root = tmpRepo({ 'AGENTS.md': 'One Feature at a time' })
  const files = listFiles(root)
  assert.equal(detect(root, { type: 'file-contains', paths: ['AGENTS.md'], pattern: 'one feature', flags: 'i' }, files), true)
  assert.equal(detect(root, { type: 'file-contains', paths: ['AGENTS.md'], pattern: 'one feature', flags: '' }, files), false)
})

test('file-line-max', () => {
  const root = tmpRepo({ 'short.md': 'a\nb\nc', 'long.md': Array(300).fill('x').join('\n') })
  const files = listFiles(root)
  assert.equal(detect(root, { type: 'file-line-max', path: 'short.md', max: 200 }, files), true)
  assert.equal(detect(root, { type: 'file-line-max', path: 'long.md', max: 200 }, files), false)
  assert.equal(detect(root, { type: 'file-line-max', path: 'missing.md', max: 200 }, files), false)
})

test('glob and package-script', () => {
  const root = tmpRepo({
    '.github/workflows/ci.yml': 'on: push',
    'package.json': JSON.stringify({ scripts: { test: 'vitest' } }),
  })
  const files = listFiles(root)
  assert.equal(detect(root, { type: 'glob', pattern: '.github/workflows/*.{yml,yaml}' }, files), true)
  assert.equal(detect(root, { type: 'package-script', script: 'test' }, files), true)
  assert.equal(detect(root, { type: 'package-script', script: 'lint' }, files), false)
})

test('any-of', () => {
  const root = tmpRepo({ 'package.json': JSON.stringify({ scripts: { test: 'x' } }) })
  const files = listFiles(root)
  const rule = { type: 'any-of', rules: [{ type: 'glob', pattern: '**/*.test.ts' }, { type: 'package-script', script: 'test' }] }
  assert.equal(detect(root, rule, files), true)
})
