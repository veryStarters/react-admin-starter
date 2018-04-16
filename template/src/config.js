export default {
  // 应用名称
  appName: 'XXX 生 命 周 期',
  // 子名称
  subName: '管理系统',
  // 首页路由
  homeRoute: '/',
  // 登录路由
  loginRoute: '/user/login',
  // api域名
  baseUrl: {
    default: '/api',
    otherDomain: {
      development: '/other',
      test: '//test-api.xxx.com/',
      pre: '//pre-api.xxx.com',
      production: '//api.xxx.com'
    }
  },
  // 代理配置
  proxyTable: {
    '/api': {
      target: 'http://localhost:10086',
      changeOrigin: true,
      pathRewrite: {
        // '^/api': '/'
      }
    },
    '/other': {
      target: 'http://localhost:10086',
      changeOrigin: true,
      pathRewrite: {}
    }
  },
  menus: [

  ]
}
