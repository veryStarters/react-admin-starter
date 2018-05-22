export default {
  // 应用名称
  appName: 'XXX 生 命 周 期',
  // 子名称
  subName: '管理系统',
  // 首页路由path
  homeRoute: '/',
  // 首页路由name
  homeName: 'home',
  // 是否开启权限校验, 默认false
  needAuth: true,
  // 会话过期时间，单位ms
  sessionDuration: 30 * 60 * 1000,
  // 登录路由
  loginRoute: '/login',
  // 监控全局路由变化
  onRouteChange(routeInfo) {
    // let { location, preLocation } = routeInfo
    // console.log('Preview route: %c' + preLocation.pathname + '\n', 'color: green')
    // console.log('Current route: %c' + location.pathname, 'color: green')
    // console.log('------------------')
  },
  // api域名前缀，支持向多个系统的api请求，只需要在此处定义prefixName，在api/index.js中添加{prefixName: 'defaultDomain'}参数即可
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
  }
}
