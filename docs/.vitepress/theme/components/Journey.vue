<script setup>
import { withBase } from 'vitepress'

const steps = [
  { n: '①', title: 'Diagnose', blurb: 'Score your repo. Find your weakest pillar.', link: '/diagnose', cta: 'Score now' },
  { n: '②', title: 'Learn', blurb: 'Read the pillar that hurts most. ~8 min each.', link: '/modules/', cta: 'Modules' },
  { n: '③', title: 'Build', blurb: 'Labs that emit real harness files.', link: '/labs/', cta: 'Labs' },
  { n: '④', title: 'Prove', blurb: 'Re-score. The number going up is the proof.', link: '/diagnose', cta: 'Re-score' },
]
</script>

<template>
  <div class="jy">
    <a v-for="(s, i) in steps" :key="s.title" class="jy-step" :href="withBase(s.link)">
      <span class="jy-n">{{ s.n }}</span>
      <strong class="jy-title">{{ s.title }}</strong>
      <span class="jy-blurb">{{ s.blurb }}</span>
      <span class="jy-cta">{{ s.cta }} →</span>
      <span v-if="i < steps.length - 1" class="jy-arrow">→</span>
    </a>
  </div>
</template>

<style scoped>
.jy { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.9rem; margin: 1.5rem 0; }
.jy-step {
  position: relative;
  display: flex; flex-direction: column; gap: 0.35rem;
  padding: 1.1rem 1.2rem;
  border-radius: 14px;
  border: 1px solid var(--ahb-card-border);
  background: var(--vp-c-bg-elv);
  text-decoration: none !important; color: inherit !important;
  transition: transform 0.2s, border-color 0.2s;
}
.jy-step:hover { transform: translateY(-3px); border-color: rgba(34, 211, 238, 0.45); }
.jy-n { font-size: 1.5rem; font-weight: 800; background: linear-gradient(135deg, #22d3ee, #818cf8); -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent; }
.jy-title { font-size: 1.05rem; }
.jy-blurb { font-size: 0.85rem; color: var(--vp-c-text-2); line-height: 1.45; flex: 1; }
.jy-cta { font-size: 0.8rem; font-weight: 600; color: var(--vp-c-brand-1); }
.jy-arrow { position: absolute; right: -0.75rem; top: 50%; transform: translateY(-50%); color: var(--vp-c-divider); font-weight: 700; z-index: 1; }
@media (max-width: 760px) {
  .jy { grid-template-columns: 1fr 1fr; }
  .jy-arrow { display: none; }
}
@media (max-width: 460px) { .jy { grid-template-columns: 1fr; } }
</style>
