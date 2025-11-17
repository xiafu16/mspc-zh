import DefaultTheme from 'vitepress/theme'
import GlobalAudio from './components/GlobalAudio.vue'
import AudioPlayer from './components/AudioPlayer.vue'
import HomeUnderline from "./components/HomeUnderline.vue"

import './custom.css'
import './style/index.css'
import type { Theme } from 'vitepress'
import MyLayout from './components/MyLayout.vue' // 导入布局组件

// 不蒜子
import bsz from "./components/BuSuanZi.vue"
import { inBrowser } from 'vitepress'
import busuanzi from 'busuanzi.pure.js'



const theme: Theme = {
  ...DefaultTheme,
  Layout: MyLayout, // 应用布局组件
  enhanceApp({ app, router }) {
    app.component('GlobalAudio', GlobalAudio)
    app.component('AudioPlayer', AudioPlayer)
    app.component('HomeUnderline' , HomeUnderline)
    //busuanzi
    if (inBrowser) {
      router.onAfterRouteChange = () => {
        busuanzi.fetch()
      }
    }
  },
}

export default theme