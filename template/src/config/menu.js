/**
 * 侧边菜单配置, 需要嵌套时请使用children属性
 * 如果此处留空，请实现api.getMenus接口
 * api.getMenus接口返回数据格式详见api/mock/user/menus
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
    value: '组件示例',
    icon: 'edit',
    url: '/demo1',
    defaultOpened: true,
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
    value: '系统用法示例',
    icon: 'edit',
    url: '/demo',
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
      },
      {
        value: '表格使用示例',
        icon: 'edit',
        url: '/demo/table'
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
  //   value: '首页',
  //   icon: 'home',
  //   url: '/'
  // },
  // {
  //   value: '用户管理',
  //   icon: 'solution',
  //   url: '/user'
  // },
  // {
  //   value: '系统用法示例',
  //   icon: 'edit',
  //   url: '/demo',
  //   children: [
  //     {
  //       value: 'demo1',
  //       icon: 'edit',
  //       url: '/demo/auth'
  //     },
  //     {
  //       value: 'demo2',
  //       icon: 'edit',
  //       url: '/demo/menutip'
  //     }
  //   ]
  // }
]

export default sidebarMenus
