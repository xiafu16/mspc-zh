import { DefaultTheme } from 'vitepress'

// 中文导航
export const zhNav: DefaultTheme.NavItem[] = [
  { text: '首页', link: '/' },
  {
    text: '海洋生物', items: [
      { text: '鲨科', items: [{ text: '鲨鱼', link: '/life/shark' }, { text: '狭纹虎鲨', link: '/life/shark-01' }, { text: '条纹斑竹鲨', link: '/life/shark-02' }] },
      { text: '䲟鱼', link: '/life/remora' }],
  },
  { text: '海洋观测', link: '/observe/'},
  { text: '海洋发现', link: '/discover/'},
  { text: '珠海的海', link: '/zhuhai/'},
  // { text: '快速开始', link: '/quick-started/', activeMatch: '/quick-started/' },
  // { text: '参考', link: '/reference/', activeMatch: '/reference/' },
]