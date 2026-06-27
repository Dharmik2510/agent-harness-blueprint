// Report formatters: terminal (colored), markdown, and json.

const C = {
  reset: '\x1b[0m', bold: '\x1b[1m', dim: '\x1b[2m',
  red: '\x1b[31m', green: '\x1b[32m', yellow: '\x1b[33m', cyan: '\x1b[36m', gray: '\x1b[90m',
}

function colorFor(ratio) {
  if (ratio >= 0.7) return C.green
  if (ratio >= 0.4) return C.yellow
  return C.red
}

function bar(score, max, width = 12) {
  const filled = max ? Math.round((score / max) * width) : 0
  return '█'.repeat(filled) + '░'.repeat(width - filled)
}

export function formatTerminal(result, { color = true } = {}) {
  const c = (code, s) => (color ? code + s + C.reset : s)
  const lines = []
  const pct = result.maxScore ? Math.round((result.total / result.maxScore) * 100) : 0
  const band = result.band

  lines.push('')
  lines.push(c(C.bold, '  Harness Scorecard'))
  lines.push(c(C.gray, '  ─────────────────'))
  lines.push('')
  const ratio = result.maxScore ? result.total / result.maxScore : 0
  lines.push(
    '  ' + c(C.bold + colorFor(ratio), `${result.total}/${result.maxScore}`) +
    c(C.gray, ` (${pct}%)`) + (band ? '  ' + c(colorFor(ratio), band.label) : ''),
  )
  if (band && band.blurb) lines.push(c(C.dim, '  ' + band.blurb))
  lines.push('')

  for (const p of result.pillars) {
    const col = colorFor(p.ratio)
    const label = `${p.icon ? p.icon + ' ' : ''}${p.name}`.padEnd(16)
    const isWeak = result.weakest && p.id === result.weakest.id
    lines.push(
      '  ' + label + ' ' + c(col, bar(p.score, p.max)) +
      c(C.gray, ` ${p.score}/${p.max}`) +
      (isWeak ? c(C.yellow, '  ← weakest') : ''),
    )
  }
  lines.push('')

  if (result.gaps.length) {
    lines.push(c(C.bold, '  Fix next:'))
    for (const g of result.gaps.slice(0, 5)) {
      lines.push('  ' + c(C.red, '✗') + ' ' + g.question + c(C.gray, `  (+${g.points}, ${g.pillar})`))
    }
    if (result.gaps.length > 5) lines.push(c(C.gray, `  …and ${result.gaps.length - 5} more`))
  } else {
    lines.push('  ' + c(C.green, '✓ Every criterion satisfied. Production-grade harness.'))
  }
  lines.push('')
  return lines.join('\n')
}

export function formatMarkdown(result) {
  const pct = result.maxScore ? Math.round((result.total / result.maxScore) * 100) : 0
  const out = []
  out.push('# Harness Scorecard report')
  out.push('')
  out.push(`**Score: ${result.total}/${result.maxScore} (${pct}%)** — ${result.band ? result.band.label : ''}`)
  out.push('')
  if (result.band && result.band.blurb) out.push('> ' + result.band.blurb + '\n')
  out.push('| Pillar | Score | Bar |')
  out.push('|--------|-------|-----|')
  for (const p of result.pillars) {
    const filled = p.max ? Math.round((p.score / p.max) * 10) : 0
    out.push(`| ${p.icon ? p.icon + ' ' : ''}${p.name}${result.weakest && p.id === result.weakest.id ? ' ⚠️' : ''} | ${p.score}/${p.max} | ${'█'.repeat(filled)}${'░'.repeat(10 - filled)} |`)
  }
  out.push('')
  if (result.gaps.length) {
    out.push('## Fix next')
    out.push('')
    for (const g of result.gaps) {
      out.push(`- [ ] **${g.pillar}** (+${g.points}) — ${g.question}`)
    }
  } else {
    out.push('All criteria satisfied. ✅')
  }
  out.push('')
  return out.join('\n')
}

export function formatJson(result) {
  return JSON.stringify(result, null, 2)
}
