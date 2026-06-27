import { defineConfig } from 'vitepress'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        '@rubric': fileURLToPath(new URL('../../scorecard/rubric.json', import.meta.url)),
      },
    },
    server: { fs: { allow: ['..'] } },
  },
  title: 'Agent Harness Blueprint',
  description: 'Turn VS Code Copilot into a reliable teammate — visual course + hands-on labs',
  base: '/agent-harness-blueprint/',
  head: [
    ['link', { rel: 'icon', href: '/agent-harness-blueprint/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#070b14' }],
    ['meta', { property: 'og:title', content: 'Agent Harness Blueprint' }],
    ['meta', { property: 'og:description', content: 'Copilot-first harness engineering course with labs and copy-ready templates.' }]
  ],
  appearance: 'dark',
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'Harness Blueprint',
    nav: [
      { text: 'Score your repo', link: '/diagnose' },
      { text: 'Quick start', link: '/start-here/quick-start' },
      { text: 'Modules', link: '/modules/' },
      { text: 'Labs', link: '/labs/' },
      { text: 'Templates', link: '/resources/templates' }
    ],
    sidebar: {
      '/diagnose': [
        {
          text: '① Diagnose',
          items: [
            { text: 'Score your repo', link: '/diagnose' },
            { text: 'Quick start (15 min)', link: '/start-here/quick-start' },
            { text: 'Glossary', link: '/start-here/glossary' }
          ]
        }
      ],
      '/start-here/': [
        {
          text: '① Diagnose & start here',
          items: [
            { text: 'Home', link: '/' },
            { text: 'Score your repo', link: '/diagnose' },
            { text: 'Quick start (15 min)', link: '/start-here/quick-start' },
            { text: 'Glossary', link: '/start-here/glossary' },
            { text: 'Setup: VS Code Copilot', link: '/start-here/setup-copilot' },
            { text: 'Setup: Other Agents', link: '/start-here/setup-other-agents' }
          ]
        }
      ],
      '/modules/': [
        {
          text: '② Learn',
          items: [
            { text: 'Module catalog', link: '/modules/' }
          ]
        },
        {
          text: 'Foundations',
          items: [
            { text: 'F1 · When the model isn’t the problem', link: '/modules/f1-when-the-model-is-not-the-problem' },
            { text: 'F2 · The harness & the scorecard', link: '/modules/f2-the-harness-and-the-scorecard' }
          ]
        },
        {
          text: 'The five pillars',
          items: [
            { text: 'P1 · 📜 Instructions', link: '/modules/p1-instructions' },
            { text: 'P2 · 🧠 State', link: '/modules/p2-state' },
            { text: 'P3 · ✅ Verification', link: '/modules/p3-verification' },
            { text: 'P4 · 🎯 Scope', link: '/modules/p4-scope' },
            { text: 'P5 · 🔁 Lifecycle', link: '/modules/p5-lifecycle' }
          ]
        },
        {
          text: 'Operations',
          items: [
            { text: 'O1 · Observability & handoff', link: '/modules/o1-observability-and-handoff' },
            { text: 'O2 · Team rollout', link: '/modules/o2-team-rollout' }
          ]
        }
      ],
      '/labs/': [
        {
          text: 'Labs',
          items: [
            { text: 'Lab catalog', link: '/labs/' },
            { text: '01 · Baseline vs harness', link: '/labs/lab-01-baseline-vs-harness' },
            { text: '02 · Readable workspace', link: '/labs/lab-02-agent-readable-workspace' },
            { text: '03 · Multi-session', link: '/labs/lab-03-multi-session-continuity' },
            { text: '04 · Scope control', link: '/labs/lab-04-scope-control' },
            { text: '05 · Verification gates', link: '/labs/lab-05-verification-gates' },
            { text: '06 · Capstone', link: '/labs/lab-06-full-harness-capstone' }
          ]
        }
      ],
      '/resources/': [
        {
          text: 'Resources',
          items: [
            { text: 'Templates', link: '/resources/templates' },
            { text: 'Checklists', link: '/resources/checklists' },
            { text: 'Failure modes', link: '/resources/failure-modes' }
          ]
        }
      ],
      '/guide/': [
        {
          text: 'Copilot Guide',
          items: [
            { text: 'Overview', link: '/guide/copilot/' },
            { text: 'Instructions files', link: '/guide/copilot/instructions' },
            { text: 'Custom agents', link: '/guide/copilot/custom-agents' },
            { text: 'Skills & hooks', link: '/guide/copilot/skills-and-hooks' },
            { text: 'Org rollout', link: '/guide/copilot/org-rollout' },
            { text: 'Provider comparison', link: '/guide/providers' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Dharmik2510/agent-harness-blueprint' }
    ],
    search: { provider: 'local' },
    footer: {
      message: 'Copilot-first harness engineering — learn by building.',
      copyright: 'MIT License'
    }
  }
})
