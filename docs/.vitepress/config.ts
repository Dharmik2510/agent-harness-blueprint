import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Agent Harness Blueprint',
  description: 'Make AI coding agents reliable — a practical course for teams using VS Code Copilot',
  base: '/agent-harness-blueprint/',
  themeConfig: {
    nav: [
      { text: 'Start Here', link: '/start-here/glossary' },
      { text: 'Modules', link: '/modules/m01-when-the-model-is-not-the-problem' },
      { text: 'Labs', link: '/labs/lab-01-baseline-vs-harness' },
      { text: 'Resources', link: '/resources/templates' },
      { text: 'Copilot Guide', link: '/guide/copilot/' },
      { text: 'GitHub', link: 'https://github.com/Dharmik2510/agent-harness-blueprint' }
    ],
    sidebar: {
      '/start-here/': [
        {
          text: 'Start Here',
          items: [
            { text: 'Welcome', link: '/' },
            { text: 'Glossary', link: '/start-here/glossary' },
            { text: 'Setup: VS Code Copilot', link: '/start-here/setup-copilot' },
            { text: 'Setup: Other Agents', link: '/start-here/setup-other-agents' }
          ]
        }
      ],
      '/modules/': [
        {
          text: 'Part 1 — Foundations',
          items: [
            { text: 'M01 — When the model is not the problem', link: '/modules/m01-when-the-model-is-not-the-problem' },
            { text: 'M02 — What a harness really is', link: '/modules/m02-what-a-harness-really-is' },
            { text: 'M03 — The five pillars', link: '/modules/m03-the-five-pillars' }
          ]
        },
        {
          text: 'Part 2 — Workspace Design',
          items: [
            { text: 'M04 — Your repo is the agent\'s memory', link: '/modules/m04-repo-as-source-of-truth' },
            { text: 'M05 — Small maps beat giant manuals', link: '/modules/m05-progressive-instructions' },
            { text: 'M06 — Every session starts the same way', link: '/modules/m06-session-bootstrap' }
          ]
        },
        {
          text: 'Part 3 — Reliability',
          items: [
            { text: 'M07 — Pick up where you left off', link: '/modules/m07-state-across-sessions' },
            { text: 'M08 — One task at a time', link: '/modules/m08-scope-and-feature-lists' },
            { text: 'M09 — Proof beats confidence', link: '/modules/m09-verification-gates' }
          ]
        },
        {
          text: 'Part 4 — Operations',
          items: [
            { text: 'M10 — Leave the runway clean', link: '/modules/m10-observability-and-handoff' }
          ]
        }
      ],
      '/labs/': [
        {
          text: 'Hands-on Labs',
          items: [
            { text: 'Lab 01 — Baseline vs harness', link: '/labs/lab-01-baseline-vs-harness' },
            { text: 'Lab 02 — Agent-readable workspace', link: '/labs/lab-02-agent-readable-workspace' },
            { text: 'Lab 03 — Multi-session continuity', link: '/labs/lab-03-multi-session-continuity' },
            { text: 'Lab 04 — Scope control', link: '/labs/lab-04-scope-control' },
            { text: 'Lab 05 — Verification gates', link: '/labs/lab-05-verification-gates' },
            { text: 'Lab 06 — Full harness capstone', link: '/labs/lab-06-full-harness-capstone' }
          ]
        }
      ],
      '/resources/': [
        {
          text: 'Resource Library',
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
      message: 'Practical harness engineering for teams using VS Code Copilot.',
      copyright: 'MIT License'
    }
  }
})
