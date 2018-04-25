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
    // url: '/user'
    children: [
      {
        key: 'user1',
        value: '用户Test',
        icon: 'edit',
        url: '/user/test'
      }
    ]
  },
  {
    key: 'demo',
    value: '系统用法示例',
    icon: 'edit',
    url: '/demo'
  }
]

// 顶部菜单配置
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
    url: '/demo'
  }
]

export default sidebarMenus

