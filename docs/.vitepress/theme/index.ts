import DefaultTheme from 'vitepress/theme'
import Scorecard from './components/Scorecard.vue'
import BeforeAfter from './components/BeforeAfter.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Scorecard', Scorecard)
    app.component('BeforeAfter', BeforeAfter)
  },
}
