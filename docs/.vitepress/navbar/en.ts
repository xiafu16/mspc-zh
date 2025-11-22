import { DefaultTheme } from 'vitepress'

export const enNav: DefaultTheme.NavItem[] = [
  { text: 'Home', link: '/en/', activeMatch: '/en/' },
  {
    text: 'Biology', items: [
      { text: 'Selachii', items: [{ text: 'Shark', link: '/en/life/shark' }, { text: 'Zebra bullhead shark', link: '/en/life/shark-01' }, { text: 'Whitespotted bamboo shark', link: '/en/life/shark-02' }] },
      { text: 'Remora', link: '/en/life/remora' }],
  },
  { text: 'Observation', link: '/en/observe/' },
  { text: 'Discovery', link: '/en/discover/' },
  { text: 'Zhuhai', link: '/en/zhuhai/' },
]