// Detection engine for the Harness Scorecard CLI.
// Pure, dependency-free. Each detect rule maps to a boolean against a repo root.
import fs from 'node:fs'
import path from 'node:path'

const IGNORE_DIRS = new Set(['node_modules', '.git', 'dist', '.vitepress', '.venv-promo', 'coverage', '.next', 'build'])

function escapeRe(ch) {
  return /[.*+?^${}()|[\]\\]/.test(ch) ? '\\' + ch : ch
}

// Convert a glob (supporting **, *, ?, {a,b}) to an anchored RegExp.
export function globToRegex(glob) {
  let re = ''
  for (let i = 0; i < glob.length; i++) {
    const c = glob[i]
    if (c === '*') {
      if (glob[i + 1] === '*') {
        if (glob[i + 2] === '/') { re += '(?:.*/)?'; i += 2 } else { re += '.*'; i += 1 }
      } else {
        re += '[^/]*'
      }
    } else if (c === '?') {
      re += '[^/]'
    } else if (c === '{') {
      const j = glob.indexOf('}', i)
      if (j === -1) { re += '\\{'; continue }
      const opts = glob.slice(i + 1, j).split(',').map((o) => o.split('').map(escapeRe).join(''))
      re += '(?:' + opts.join('|') + ')'
      i = j
    } else {
      re += escapeRe(c)
    }
  }
  return new RegExp('^' + re + '$')
}

// Walk a repo once, returning all file paths relative to root (posix separators).
export function listFiles(root) {
  const out = []
  const walk = (dir) => {
    let entries
    try { entries = fs.readdirSync(dir, { withFileTypes: true }) } catch { return }
    for (const entry of entries) {
      if (entry.isDirectory()) {
        if (IGNORE_DIRS.has(entry.name)) continue
        walk(path.join(dir, entry.name))
      } else if (entry.isFile()) {
        out.push(path.relative(root, path.join(dir, entry.name)).split(path.sep).join('/'))
      }
    }
  }
  walk(root)
  return out
}

function exists(root, rel) {
  try { return fs.existsSync(path.join(root, rel)) } catch { return false }
}

function isFile(root, rel) {
  try { return fs.statSync(path.join(root, rel)).isFile() } catch { return false }
}

function readFile(root, rel) {
  try { return fs.readFileSync(path.join(root, rel), 'utf8') } catch { return null }
}

// Evaluate one detect rule. `files` is the cached file list (computed once per repo).
export function detect(root, rule, files) {
  switch (rule.type) {
    case 'file-exists':
      return isFile(root, rule.path)
    case 'file-exists-any':
      return (rule.paths || []).some((p) => exists(root, p))
    case 'file-contains': {
      const re = new RegExp(rule.pattern, rule.flags || '')
      return (rule.paths || []).some((p) => {
        const content = readFile(root, p)
        return content != null && re.test(content)
      })
    }
    case 'file-line-max': {
      const content = readFile(root, rule.path)
      if (content == null) return false
      return content.split('\n').length <= rule.max
    }
    case 'glob': {
      const re = globToRegex(rule.pattern)
      return files.some((f) => re.test(f))
    }
    case 'package-script': {
      const content = readFile(root, 'package.json')
      if (content == null) return false
      try {
        const pkg = JSON.parse(content)
        return Boolean(pkg.scripts && pkg.scripts[rule.script])
      } catch { return false }
    }
    case 'any-of':
      return (rule.rules || []).some((r) => detect(root, r, files))
    default:
      return false
  }
}
