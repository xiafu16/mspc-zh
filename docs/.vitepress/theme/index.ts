import DefaultTheme from 'vitepress/theme'
import GlobalAudio from './components/GlobalAudio.vue'
import AudioPlayer from './components/AudioPlayer.vue'
import './custom.css'
import type { Theme } from 'vitepress'

const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app }) {
    app.component('GlobalAudio', GlobalAudio)
    app.component('AudioPlayer', AudioPlayer)
  },
}

export default theme