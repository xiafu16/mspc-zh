import { DefaultTheme } from 'vitepress'
export const enSidebar: DefaultTheme.Sidebar = {
  '/en/': [
    {
      text: '',
      collapsed: false,
      items: [
        { text: '', link: `/en/` },
      ]
    },
  ],
  '/en/life/': [
    {
      text: '',
      items: [
        { text: 'Biology', link: '/en/life/' },
        {
          text: 'Selachii', items: [
            { text: 'Shark', link: '/en/life/shark/' },
            { text: 'Zebra bullhead shark', link: '/en/life/shark-01' },
            { text: 'Whitespotted bamboo shark', link: '/en/life/shark-02' }
          ]
        },
        { text: 'Remora', link: '/en/life/remora' }
      ]
    }
  ],
}