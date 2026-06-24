import { defineConfig } from 'vitepress'

export default defineConfig({
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
      { text: 'Quick start', link: '/start-here/quick-start' },
      { text: 'Modules', link: '/modules/' },
      { text: 'Labs', link: '/labs/' },
      { text: 'Templates', link: '/resources/templates' },
      { text: 'Copilot', link: '/guide/copilot/' }
    ],
    sidebar: {
      '/start-here/': [
        {
          text: 'Start Here',
          items: [
            { text: 'Home', link: '/' },
            { text: 'Quick start (15 min)', link: '/start-here/quick-start' },
            { text: 'Glossary', link: '/start-here/glossary' },
            { text: 'Setup: VS Code Copilot', link: '/start-here/setup-copilot' },
            { text: 'Setup: Other Agents', link: '/start-here/setup-other-agents' }
          ]
        }
      ],
      '/modules/': [
        {
          text: 'Modules',
          items: [
            { text: 'Catalog', link: '/modules/' }
          ]
        },
        {
          text: 'Part 1 — Foundations',
          items: [
            { text: '01 · Model vs environment', link: '/modules/m01-when-the-model-is-not-the-problem' },
            { text: '02 · What a harness is', link: '/modules/m02-what-a-harness-really-is' },
            { text: '03 · Five pillars', link: '/modules/m03-the-five-pillars' }
          ]
        },
        {
          text: 'Part 2 — Workspace',
          items: [
            { text: '04 · Repo as memory', link: '/modules/m04-repo-as-source-of-truth' },
            { text: '05 · Progressive instructions', link: '/modules/m05-progressive-instructions' },
            { text: '06 · Session bootstrap', link: '/modules/m06-session-bootstrap' }
          ]
        },
        {
          text: 'Part 3 — Reliability',
          items: [
            { text: '07 · State across sessions', link: '/modules/m07-state-across-sessions' },
            { text: '08 · Scope & features', link: '/modules/m08-scope-and-feature-lists' },
            { text: '09 · Verification gates', link: '/modules/m09-verification-gates' }
          ]
        },
        {
          text: 'Part 4 — Operations',
          items: [
            { text: '10 · Handoff & observability', link: '/modules/m10-observability-and-handoff' }
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
