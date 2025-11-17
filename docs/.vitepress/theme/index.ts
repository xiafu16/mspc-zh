import DefaultTheme from 'vitepress/theme'
import GlobalAudio from './components/GlobalAudio.vue'
import AudioPlayer from './components/AudioPlayer.vue'
import HomeUnderline from "./components/HomeUnderline.vue"

import './custom.css'
import './style/index.css'
import type { Theme } from 'vitepress'



const theme: Theme = {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    app.component('GlobalAudio', GlobalAudio)
    app.component('AudioPlayer', AudioPlayer)
    app.component('HomeUnderline' , HomeUnderline)
    //busuanzi
    // if (inBrowser) {
    //   router.onAfterRouteChange = () => {
    //     busuanzi.fetch()
    //   }
    // }
  },
}

export default theme