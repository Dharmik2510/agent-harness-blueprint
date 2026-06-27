// Scoring core: load the rubric, run detection, compute per-pillar and total scores.
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { detect, listFiles } from './detect.js'

const here = path.dirname(fileURLToPath(import.meta.url))
export const RUBRIC_PATH = path.join(here, '..', 'rubric.json')

export function loadRubric(rubricPath = RUBRIC_PATH) {
  return JSON.parse(fs.readFileSync(rubricPath, 'utf8'))
}

function bandFor(rubric, total) {
  const bands = rubric.bands || []
  return bands.find((b) => total >= b.min && total <= b.max) || null
}

// Score a repository at `root` against `rubric`. Returns a structured result.
export function scoreRepo(root, rubric) {
  const files = listFiles(root)
  let total = 0
  const pillars = rubric.pillars.map((pillar) => {
    let pScore = 0
    const criteria = pillar.criteria.map((c) => {
      const satisfied = detect(root, c.detect, files)
      if (satisfied) pScore += c.points
      return {
        id: c.id,
        points: c.points,
        question: c.question,
        fixLink: c.fixLink || pillar.fixLink,
        satisfied,
      }
    })
    total += pScore
    return {
      id: pillar.id,
      name: pillar.name,
      icon: pillar.icon || '',
      tagline: pillar.tagline || '',
      fixLink: pillar.fixLink,
      score: pScore,
      max: pillar.max,
      ratio: pillar.max ? pScore / pillar.max : 0,
      criteria,
    }
  })

  // Weakest pillar: lowest ratio, then lowest absolute score, then rubric order.
  const weakest = [...pillars].sort((a, b) => a.ratio - b.ratio || a.score - b.score)[0] || null

  const gaps = pillars.flatMap((p) =>
    p.criteria.filter((c) => !c.satisfied).map((c) => ({
      pillar: p.name,
      pillarId: p.id,
      points: c.points,
      question: c.question,
      fixLink: c.fixLink,
    })),
  )

  return {
    total,
    maxScore: rubric.maxScore,
    band: bandFor(rubric, total),
    pillars,
    weakest,
    gaps,
  }
}
