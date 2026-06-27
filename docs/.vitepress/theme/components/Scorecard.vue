<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { withBase } from 'vitepress'
import rubric from '@rubric'

// Flatten criteria in stable order for compact URL encoding.
const allCriteria = rubric.pillars.flatMap((p) =>
  p.criteria.map((c) => ({ ...c, pillarId: p.id, pillarName: p.name, pillarIcon: p.icon })),
)

const answers = ref(allCriteria.map(() => false))
const started = ref(false)

const total = computed(() =>
  allCriteria.reduce((sum, c, i) => sum + (answers.value[i] ? c.points : 0), 0),
)

const displayTotal = ref(0)

const pillars = computed(() =>
  rubric.pillars.map((p) => {
    let score = 0
    const criteria = p.criteria.map((c) => {
      const idx = allCriteria.findIndex((x) => x.id === c.id)
      const checked = answers.value[idx]
      if (checked) score += c.points
      return { ...c, idx, checked }
    })
    return { ...p, score, ratio: p.max ? score / p.max : 0, criteria }
  }),
)

const weakest = computed(() => {
  let w = null
  for (const p of pillars.value) {
    if (!w || p.ratio < w.ratio) w = p
  }
  return w
})

const band = computed(
  () => rubric.bands.find((b) => total.value >= b.min && total.value <= b.max) || rubric.bands[0],
)

const pct = computed(() => Math.round((total.value / rubric.maxScore) * 100))

const gaps = computed(() =>
  pillars.value
    .flatMap((p) => p.criteria.filter((c) => !c.checked).map((c) => ({ ...c, pillarName: p.name })))
    .sort((a, b) => b.points - a.points),
)

function ratioColor(ratio) {
  if (ratio >= 0.7) return 'var(--ahb-good)'
  if (ratio >= 0.4) return 'var(--ahb-mid)'
  return 'var(--ahb-bad)'
}

// --- URL hash persistence (shareable result, no backend) ---
function encode() {
  return answers.value.map((a) => (a ? '1' : '0')).join('')
}
function decode(str) {
  if (!str || str.length !== allCriteria.length) return null
  return [...str].map((ch) => ch === '1')
}
function syncHash() {
  if (typeof window === 'undefined') return
  const s = encode()
  history.replaceState(null, '', s.includes('1') ? `#s=${s}` : location.pathname + location.search)
}

const copied = ref(false)
async function copyLink() {
  if (typeof window === 'undefined') return
  syncHash()
  try {
    await navigator.clipboard.writeText(location.href)
    copied.value = true
    setTimeout(() => (copied.value = false), 1800)
  } catch {
    /* clipboard blocked — no-op */
  }
}

function reset() {
  answers.value = allCriteria.map(() => false)
  started.value = true
}

// Count-up animation for the headline score.
let raf = null
watch(total, (target) => {
  if (typeof window === 'undefined') {
    displayTotal.value = target
    return
  }
  if (raf) cancelAnimationFrame(raf)
  const from = displayTotal.value
  const start = performance.now()
  const dur = 450
  const tick = (now) => {
    const t = Math.min(1, (now - start) / dur)
    const eased = 1 - Math.pow(1 - t, 3)
    displayTotal.value = Math.round(from + (target - from) * eased)
    if (t < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
})

watch(answers, syncHash, { deep: true })

onMounted(() => {
  const m = location.hash.match(/s=([01]+)/)
  const decoded = m && decode(m[1])
  if (decoded) {
    answers.value = decoded
    started.value = true
  }
  displayTotal.value = total.value
})
</script>

<template>
  <div class="sc">
    <!-- Result headline -->
    <div class="sc-head" :style="{ '--accent': ratioColor(total / rubric.maxScore) }">
      <div class="sc-score">
        <span class="sc-num">{{ displayTotal }}</span><span class="sc-den">/{{ rubric.maxScore }}</span>
      </div>
      <div class="sc-band">
        <span class="sc-band-label">{{ band.label }}</span>
        <span class="sc-band-pct">{{ pct }}%</span>
        <p class="sc-band-blurb">{{ band.blurb }}</p>
      </div>
    </div>

    <!-- Pillar bars -->
    <div class="sc-bars">
      <div v-for="p in pillars" :key="p.id" class="sc-bar-row" :class="{ weak: weakest && p.id === weakest.id }">
        <span class="sc-bar-label">{{ p.icon }} {{ p.name }}</span>
        <span class="sc-bar-track">
          <span class="sc-bar-fill" :style="{ width: (p.ratio * 100) + '%', background: ratioColor(p.ratio) }"></span>
        </span>
        <span class="sc-bar-val">{{ p.score }}/{{ p.max }}</span>
        <span v-if="weakest && p.id === weakest.id" class="sc-weak-tag">weakest</span>
      </div>
    </div>

    <!-- Questions, grouped by pillar -->
    <div class="sc-quiz">
      <details v-for="p in pillars" :key="p.id" class="sc-group" open>
        <summary>
          <span>{{ p.icon }} {{ p.name }}</span>
          <span class="sc-group-score">{{ p.score }}/{{ p.max }}</span>
        </summary>
        <label v-for="c in p.criteria" :key="c.id" class="sc-q">
          <input type="checkbox" v-model="answers[c.idx]" />
          <span class="sc-q-text">{{ c.question }}</span>
          <span class="sc-q-pts">+{{ c.points }}</span>
        </label>
      </details>
    </div>

    <!-- Your plan -->
    <div class="sc-plan" v-if="gaps.length">
      <h3>Your plan — fix these to climb</h3>
      <p class="sc-plan-lead" v-if="weakest">
        Start with your weakest pillar: <strong>{{ weakest.icon }} {{ weakest.name }}</strong>.
      </p>
      <a v-for="g in gaps.slice(0, 6)" :key="g.id" class="sc-plan-item" :href="withBase(g.fixLink)">
        <span class="sc-plan-pillar">{{ g.pillarName }}</span>
        <span class="sc-plan-q">{{ g.question }}</span>
        <span class="sc-plan-go">Learn this →</span>
      </a>
    </div>
    <div class="sc-plan sc-done" v-else>
      <h3>🏆 Production harness</h3>
      <p>Every criterion satisfied. Run <code>npm run score</code> in your real repo to prove it.</p>
    </div>

    <div class="sc-actions">
      <button class="sc-btn" @click="copyLink">{{ copied ? '✓ Link copied' : 'Copy shareable result' }}</button>
      <button class="sc-btn sc-btn-ghost" @click="reset">Reset</button>
    </div>
  </div>
</template>

<style scoped>
.sc {
  --ahb-good: #22c55e;
  --ahb-mid: #f59e0b;
  --ahb-bad: #ef4444;
  margin: 1.5rem 0 2rem;
}

.sc-head {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 1.75rem;
  border-radius: 18px;
  border: 1px solid var(--ahb-card-border);
  background: linear-gradient(135deg, var(--vp-c-bg-elv), var(--vp-c-bg-alt));
  box-shadow: 0 0 0 1px color-mix(in srgb, var(--accent) 18%, transparent),
    0 18px 40px -24px var(--accent);
}
.sc-score { line-height: 1; white-space: nowrap; }
.sc-num {
  font-size: 4rem;
  font-weight: 800;
  letter-spacing: -0.04em;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
}
.sc-den { font-size: 1.5rem; font-weight: 600; color: var(--vp-c-text-2); }
.sc-band-label {
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
  margin-right: 0.6rem;
}
.sc-band-pct {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: var(--vp-c-brand-soft);
  color: var(--vp-c-brand-1);
}
.sc-band-blurb { margin: 0.5rem 0 0; font-size: 0.9rem; color: var(--vp-c-text-2); line-height: 1.5; }

.sc-bars { margin: 1.5rem 0; display: grid; gap: 0.6rem; }
.sc-bar-row { display: grid; grid-template-columns: 9.5rem 1fr auto auto; align-items: center; gap: 0.75rem; }
.sc-bar-label { font-size: 0.9rem; font-weight: 600; }
.sc-bar-track { height: 10px; border-radius: 999px; background: var(--vp-c-bg-alt); overflow: hidden; border: 1px solid var(--ahb-card-border); }
.sc-bar-fill { display: block; height: 100%; border-radius: 999px; transition: width 0.5s cubic-bezier(0.22, 1, 0.36, 1); }
.sc-bar-val { font-size: 0.85rem; color: var(--vp-c-text-2); font-variant-numeric: tabular-nums; }
.sc-weak-tag { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--ahb-mid); }
.sc-bar-row.weak .sc-bar-label { color: var(--ahb-mid); }

.sc-quiz { display: grid; gap: 0.75rem; }
.sc-group { border: 1px solid var(--ahb-card-border); border-radius: 12px; background: var(--vp-c-bg-elv); padding: 0.4rem 0.9rem; }
.sc-group summary { display: flex; justify-content: space-between; align-items: center; cursor: pointer; font-weight: 700; padding: 0.5rem 0; list-style: none; }
.sc-group summary::-webkit-details-marker { display: none; }
.sc-group-score { font-size: 0.85rem; font-weight: 600; color: var(--vp-c-brand-1); font-variant-numeric: tabular-nums; }
.sc-q { display: grid; grid-template-columns: auto 1fr auto; gap: 0.6rem; align-items: start; padding: 0.5rem 0; border-top: 1px solid var(--ahb-card-border); cursor: pointer; }
.sc-q input { margin-top: 0.2rem; width: 1.05rem; height: 1.05rem; accent-color: var(--vp-c-brand-1); cursor: pointer; }
.sc-q-text { font-size: 0.92rem; line-height: 1.45; }
.sc-q-pts { font-size: 0.78rem; font-weight: 700; color: var(--vp-c-text-2); }

.sc-plan { margin-top: 1.75rem; padding: 1.25rem 1.5rem; border-radius: 14px; border: 1px solid var(--ahb-card-border); background: var(--vp-c-bg-alt); }
.sc-plan h3 { margin: 0 0 0.5rem; }
.sc-plan-lead { margin: 0 0 1rem; color: var(--vp-c-text-2); }
.sc-plan-item { display: grid; grid-template-columns: 7rem 1fr auto; gap: 0.75rem; align-items: center; padding: 0.7rem 0.9rem; margin: 0.4rem 0; border-radius: 10px; border: 1px solid var(--ahb-card-border); background: var(--vp-c-bg-elv); text-decoration: none !important; color: inherit !important; transition: border-color 0.2s, transform 0.2s; }
.sc-plan-item:hover { border-color: var(--vp-c-brand-1); transform: translateX(3px); }
.sc-plan-pillar { font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--vp-c-brand-1); }
.sc-plan-q { font-size: 0.9rem; }
.sc-plan-go { font-size: 0.82rem; font-weight: 600; color: var(--vp-c-brand-1); white-space: nowrap; }
.sc-done { text-align: center; }

.sc-actions { display: flex; gap: 0.75rem; margin-top: 1.5rem; flex-wrap: wrap; }
.sc-btn { font: inherit; font-weight: 600; font-size: 0.9rem; padding: 0.55rem 1.1rem; border-radius: 10px; border: 1px solid transparent; background: var(--vp-c-brand-1); color: #04121a; cursor: pointer; transition: filter 0.2s; }
.sc-btn:hover { filter: brightness(1.08); }
.sc-btn-ghost { background: transparent; border-color: var(--ahb-card-border); color: var(--vp-c-text-1); }

@media (max-width: 640px) {
  .sc-head { flex-direction: column; align-items: flex-start; gap: 0.75rem; }
  .sc-num { font-size: 3rem; }
  .sc-bar-row { grid-template-columns: 7rem 1fr auto; }
  .sc-weak-tag { display: none; }
  .sc-plan-item { grid-template-columns: 1fr; gap: 0.25rem; }
}
@media (prefers-reduced-motion: reduce) {
  .sc-bar-fill { transition: none; }
}
</style>
