import { defineConfig } from 'vitepress'
import timeline from "vitepress-markdown-timeline"

import { loadEnv } from 'vite'
const mode = process.env.NODE_ENV || 'development'
const { VITE_BASE_URL } = loadEnv(mode, process.cwd())

// 如果没有设置 VITE_BASE_URL，默认使用 '/'（适用于本地预览和根路径部署）
// const baseUrl = VITE_BASE_URL || '/'
const baseUrl = '/mspc-zh/' // 站点路径'

console.log('Mode:', process.env.NODE_ENV)
console.log('VITE_BASE_URL:', baseUrl)

export const sharedConfig = defineConfig({
  rewrites: { // 很重要，
    'zh/:rest*': ':rest*'
  },
  metaChunk: true,
  lang: 'zh-CN', // 语言
  title: "珠海海洋科普中心", // 站点名称
  titleTemplate: "珠海海洋科普中心", // 网页标题
  description: "海洋发现之旅", // 站点描述
    base:
    process.env.CF_PAGES === 'true'
      ? '/' // Cloudflare Pages 自定义域名或根路径部署
      : process.env.GITHUB_REPOSITORY
        ? baseUrl // GitHub Pages 仓库路径
        : '/',
  head: [ // favicon.ico 图标等
    ['link', { rel: "shortcut icon", href: `${baseUrl}icon-sml.ico` }],
    // 网站 favicon.ico 图标
    ['link', { rel: "icon", href: `${baseUrl}icon-sml.ico`, type: "image/svg+xml" }],
    // 引入 Google Fonts
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap', rel: 'stylesheet' }],
    // 网页视口
    ['meta', { name: "viewport", content: "width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no,shrink-to-fit=no" }],
    // 关键词和描述
    ['meta', { name: "keywords", content: "海洋,科普" }],
  ],
  appearance: true, // 主题模式，默认浅色且开启切换

  lastUpdated: true, // 上次更新
  vite: {
    build: {
      chunkSizeWarningLimit: 1600
    },
    plugins: [],
    server: {
      port: 18089
    }
  },
  markdown: { // markdown 配置
    math: true,
    lineNumbers: true, // 行号显示
    image: {
      // 开启图片懒加载
      lazyLoading: true
    },
    config: (md) => {
      md.use(timeline)
    }
  },
  themeConfig: { // 主题设置
    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: 'Search',
                buttonAriaLabel: 'Search',
              },
              modal: {
                displayDetails: 'Display detailed list',
                resetButtonTitle: 'Reset search',
                backButtonTitle: 'Close search',
                noResultsText: 'No results for',
                footer: {
                  selectText: 'to select',
                  selectKeyAriaLabel: 'enter',
                  navigateText: 'to navigate',
                  navigateUpKeyAriaLabel: 'up arrow',
                  navigateDownKeyAriaLabel: 'down arrow',
                  closeText: 'to close',
                  closeKeyAriaLabel: 'escape',
                },
              },
            },
          },

        },
      },
    },
    logo: '/logo.png',  // 左上角logo
  }
})