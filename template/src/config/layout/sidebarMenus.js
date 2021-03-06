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
    value: '示例',
    icon: 'bell',
    url: '/demo',
    defaultOpened: true,
    children: [
      {
        value: '图表统计',
        icon: 'scan',
        url: '/demo/chart'
      },
      {
        value: '表单',
        icon: 'tool',
        url: '/demo/form'
      },
      {
        value: '列表',
        icon: 'apple',
        url: '/demo/list'
      },
      {
        value: '设置权限',
        icon: 'setting',
        url: '/demo/setup'
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
        value: '架构思路',
        icon: 'book',
        url: '/help/design'
      },
      {
        value: '权限',
        icon: 'code',
        url: '/help/auth'
      },
      {
        value: '菜单',
        icon: 'smile',
        url: '/help/menu'
      },
      {
        value: 'Redux',
        icon: 'tag',
        url: '/help/redux'
      }
    ]
  }
]
