export default {
  appName: 'XXX 生 命 周 期',
  homeRoute: '/',
  baseUrl: {
    default: '/api',
    // otherDomain: {
    //   development: '/other',
    //   test: '//test-api.xxx.com/',
    //   pre: '//pre-api.xxx.com',
    //   production: '//api.xxx.com'
    // }
  },
  proxyTable: {
    '/api': {
      target: 'http://localhost:10082',
      changeOrigin: true,
      pathRewrite: {
        // '^/api': '/'
      }
    },
    // '/other': {
    //   target: 'http://localhost:10082',
    //   changeOrigin: true,
    //   pathRewrite: {
    //     // '^/api': '/'
    //   }
    // }
  }
}
