/**
 * 侧边菜单配置, 需要嵌套时请使用children属性
 * 如果此处留空，请实现api.getMenus接口
 */
const sidebarMenus = [
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
    value: 'demo1',
    icon: 'edit',
    // url: '/demo1',
    children: [
      {
        value: '权限示例',
        icon: 'edit',
        url: '/demo1/demo11'
      },
      {
        value: '菜单项配置示例',
        icon: 'edit',
        url: '/demo1/demo12'
      }
    ]
  },
  {
    value: '示例',
    icon: 'edit',
    defaultOpened: true,
    // url: '/demo',
    children: [
      {
        value: '权限示例',
        icon: 'edit',
        url: '/demo/auth'
      },
      {
        value: '菜单项配置示例',
        icon: 'edit',
        url: '/demo/menutip'
      }
    ]
  }
]

/**
 * 顶部菜单配置, 如果留空，则无顶部菜单
 * @type {[null,null,null]}
 */
export const topMenus = [
  // {
  //   key: 'home',
  //   value: '首页',
  //   icon: 'home',
  //   url: '/'
  // },
  // {
  //   key: 'user',
  //   value: '用户管理',
  //   icon: 'solution',
  //   url: '/user'
  // },
  // {
  //   key: 'demo',
  //   value: '系统用法示例',
  //   icon: 'edit',
  //   url: '/demo',
  //   children: [
  //     {
  //       key: 'demo1',
  //       value: 'demo1',
  //       icon: 'edit',
  //       url: '/demo/auth'
  //     },
  //     {
  //       key: 'demo2',
  //       value: 'demo2',
  //       icon: 'edit',
  //       url: '/demo/menutip'
  //     }
  //   ]
  // }
]

export default sidebarMenus
