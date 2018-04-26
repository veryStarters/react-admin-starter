/**
 * 侧边菜单配置, 需要嵌套时请使用children属性
 */
const sidebarMenus = [
  {
    key: 'home',
    value: '首页',
    icon: 'home',
    url: '/'
  },
  {
    key: 'user',
    value: '用户管理',
    icon: 'solution',
    url: '/user'
  },
  {
    key: 'demo3',
    value: 'redux示例',
    icon: 'edit',
    url: '/demo/redux'
  },
  {
    key: 'demo',
    value: '示例',
    icon: 'edit',
    defaultOpened: true,
    children: [
      {
        key: 'demo1',
        value: '权限示例',
        icon: 'edit',
        url: '/demo/auth'
      },
      {
        key: 'demo2',
        value: '菜单项配置示例',
        icon: 'edit',
        url: '/demo/menutip'
      }
    ]
  }
]

/**
 * 顶部菜单配置
 * @type {[null,null,null]}
 */
export const topMenus = [
  {
    key: 'home',
    value: '首页',
    icon: 'home',
    url: '/'
  },
  {
    key: 'user',
    value: '用户管理',
    icon: 'solution',
    url: '/user'
  },
  {
    key: 'demo',
    value: '系统用法示例',
    icon: 'edit',
    children: [
      {
        key: 'demo1',
        value: 'demo1',
        icon: 'edit',
        url: '/demo/auth'
      },
      {
        key: 'demo2',
        value: 'demo2',
        icon: 'edit',
        url: '/demo/menutip'
      }
    ]
  }
]

export default sidebarMenus
