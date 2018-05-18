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
    url: '/user'
  },
  {
    value: '系统用法示例',
    icon: 'edit',
    url: '/demo',
    children: [
      {
        value: '权限',
        icon: 'edit',
        url: '/demo/auth'
      },
      {
        value: '菜单项配置',
        icon: 'edit',
        url: '/demo/menutip'
      },
      {
        value: 'redux集成',
        icon: 'tag',
        url: '/demo/redux'
      }
    ]
  }
]
