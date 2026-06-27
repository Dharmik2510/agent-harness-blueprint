<script setup>
import { withBase } from 'vitepress'
import rubric from '@rubric'

// Driven by the same rubric the scorecard uses — names, icons, taglines never drift.
const pillars = rubric.pillars
</script>

<template>
  <div class="pl-grid">
    <a v-for="p in pillars" :key="p.id" class="pl-card" :href="withBase(p.fixLink)">
      <span class="pl-icon">{{ p.icon }}</span>
      <strong class="pl-name">{{ p.name }}</strong>
      <span class="pl-tag">{{ p.tagline }}</span>
      <span class="pl-max">/{{ p.max }}</span>
    </a>
  </div>
</template>

<style scoped>
.pl-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(170px, 1fr)); gap: 0.9rem; margin: 1.5rem 0; }
.pl-card {
  position: relative;
  display: flex; flex-direction: column; gap: 0.3rem;
  padding: 1.1rem 1.2rem;
  border-radius: 14px;
  border: 1px solid var(--ahb-card-border);
  background: linear-gradient(150deg, var(--vp-c-bg-elv), var(--vp-c-bg-alt));
  text-decoration: none !important; color: inherit !important;
  transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.pl-card:hover { transform: translateY(-3px); border-color: rgba(34, 211, 238, 0.45); box-shadow: 0 12px 28px -16px rgba(34, 211, 238, 0.6); }
.pl-icon { font-size: 1.6rem; }
.pl-name { font-size: 1.05rem; color: var(--vp-c-brand-1); }
.pl-tag { font-size: 0.85rem; color: var(--vp-c-text-2); line-height: 1.45; }
.pl-max { position: absolute; top: 0.9rem; right: 1.1rem; font-size: 0.75rem; font-weight: 700; color: var(--vp-c-text-2); opacity: 0.7; font-variant-numeric: tabular-nums; }
</style>
