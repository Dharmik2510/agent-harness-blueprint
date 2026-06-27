import DefaultTheme from 'vitepress/theme'
import Scorecard from './components/Scorecard.vue'
import BeforeAfter from './components/BeforeAfter.vue'
import Pillars from './components/Pillars.vue'
import Journey from './components/Journey.vue'
import './custom.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('Scorecard', Scorecard)
    app.component('BeforeAfter', BeforeAfter)
    app.component('Pillars', Pillars)
    app.component('Journey', Journey)
  },
}
