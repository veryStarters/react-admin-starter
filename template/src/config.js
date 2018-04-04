export default {
  appName: 'XXX 生 命 周 期',
  subName: '管理系统',
  homeRoute: '/',
  loginRoute: '/user/login',
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
  },
  // 需要提取到commonChunk中的依赖组件
  commonChunk: [
    'axios',
    'react',
    'react-dom',
    'react-redux',
    'redux-thunk',
    'react-router-dom',
    'moment',
    'antd/lib/table/Table',
    'antd/lib/button/button'
  ]
}
