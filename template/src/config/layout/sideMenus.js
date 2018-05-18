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
    value: '系统用法示例',
    icon: 'eye',
    defaultOpened: true,
    url: '/demo',
    children: [
      {
        value: '权限',
        icon: 'code',
        url: '/demo/auth'
      },
      {
        value: '菜单项配置',
        icon: 'smile',
        url: '/demo/menutip'
      },
      {
        value: 'redux集成',
        icon: 'tag',
        url: '/demo/redux'
      }
    ]
  },
  {
    value: '组件示例',
    icon: 'bell',
    url: '/demo1',
    children: [
      {
        value: '更多ECharts示例',
        icon: 'scan',
        url: '/demo1/echarts'
      },
      {
        value: '权限',
        icon: 'tool',
        url: '/demo1/demo11'
      },
      {
        value: '菜单项配置',
        icon: 'apple',
        url: '/demo1/demo12'
      }
    ]
  }
]
