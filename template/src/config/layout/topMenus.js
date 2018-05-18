/**
 * 顶部菜单配置, 如果留空，则无顶部菜单
 * @type {[null,null,null]}
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
    url: '/demo/user'
  },
  {
    value: '帮助',
    icon: 'down',
    url: '/demo',
    children: [
      {
        value: '权限',
        icon: 'code',
        url: '/demo/help/auth'
      },
      {
        value: '菜单',
        icon: 'smile',
        url: '/demo/help/menu'
      },
      {
        value: 'Redux',
        icon: 'tag',
        url: '/demo/help/redux'
      }
    ]
  }
]
