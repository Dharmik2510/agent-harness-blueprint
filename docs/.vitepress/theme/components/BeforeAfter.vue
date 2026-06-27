<script setup>
defineProps({
  title: { type: String, default: '' },
  beforeLabel: { type: String, default: 'Prompt-only' },
  afterLabel: { type: String, default: 'With harness' },
})
</script>

<template>
  <div class="ba">
    <p v-if="title" class="ba-title">{{ title }}</p>
    <div class="ba-grid">
      <div class="ba-col ba-before">
        <span class="ba-tag ba-tag-before">✗ {{ beforeLabel }}</span>
        <div class="ba-body"><slot name="before" /></div>
      </div>
      <div class="ba-col ba-after">
        <span class="ba-tag ba-tag-after">✓ {{ afterLabel }}</span>
        <div class="ba-body"><slot name="after" /></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ba { margin: 1.5rem 0; }
.ba-title { font-weight: 700; margin: 0 0 0.6rem; }
.ba-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.ba-col { border-radius: 14px; border: 1px solid var(--ahb-card-border); padding: 0.4rem 1.1rem 1.1rem; background: var(--vp-c-bg-elv); }
.ba-before { border-top: 3px solid #ef4444; }
.ba-after { border-top: 3px solid #22c55e; }
.ba-tag { display: inline-block; font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; padding: 0.25rem 0.6rem; border-radius: 999px; margin: 0.9rem 0 0.3rem; }
.ba-tag-before { background: rgba(239, 68, 68, 0.12); color: #ef4444; }
.ba-tag-after { background: rgba(34, 197, 94, 0.12); color: #22c55e; }
.ba-body :deep(p:first-child) { margin-top: 0.4rem; }
.ba-body :deep(div[class*='language-']) { margin: 0.5rem 0 0; }
@media (max-width: 640px) { .ba-grid { grid-template-columns: 1fr; } }
</style>
