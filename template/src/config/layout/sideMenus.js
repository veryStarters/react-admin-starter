/**
 * 侧边菜单配置, 需要嵌套时请使用children属性
 * 如果此处留空，请实现api.getMenus接口
 * api.getMenus接口返回数据格式详见api/mock/user/menus
 */
export default [
  {
    value: '首页',
    icon: 'home',
    url: '/'
  },
  {
    value: '用户管理',
    icon: 'solution',
    url: '/user'
  },
  {
    value: '示例',
    icon: 'bell',
    url: '/demo',
    children: [
      {
        value: '更多ECharts示例',
        icon: 'scan',
        url: '/demo/echarts'
      },
      {
        value: '权限',
        icon: 'tool',
        url: '/demo/demo11'
      },
      {
        value: '菜单项配置',
        icon: 'apple',
        url: '/demo/demo12'
      }
    ]
  },
  {
    value: '帮助',
    icon: 'question',
    defaultOpened: true,
    url: '/help',
    children: [
      {
        value: '权限',
        icon: 'code',
        url: '/help/auth'
      },
      {
        value: '菜单项配置',
        icon: 'smile',
        url: '/help/menu'
      },
      {
        value: 'redux集成',
        icon: 'tag',
        url: '/help/redux'
      }
    ]
  }
]
