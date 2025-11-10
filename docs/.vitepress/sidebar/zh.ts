import { DefaultTheme } from 'vitepress'
export const zhSidebar: DefaultTheme.Sidebar = {
  '/': [
    {
      text: '',
      collapsed: false,
      items: [
        { text: '', link: `/` },
      ]
    },
  ], 
  // 当用户位于 `life` 目录时，会显示此侧边栏
  '/life/': [
    {
      text: '',
      items: [
        { text: '海洋生物', link: '/life/' },
        // { text: '鲨鱼', link: '/life/shark' },
        { text: '鲨科', items: [
          { text: '鲨鱼', link: '/life/shark/' },
          { text: '狭纹虎鲨', link: '/life/shark-01' },
          { text: '条纹斑竹鲨', link: '/life/shark-02' }
        ] },
        { text: '䲟鱼', link: '/life/remora' }
      ]
    }
  ],
}