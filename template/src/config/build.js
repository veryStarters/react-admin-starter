/**
 * 系统编译相关配置
 */
const path = require('path')
const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}
module.exports = {
  // 入口JS
  appIndexJs: 'src/index.js',
  // 模块名称
  alias: {
    src: resolve('.'),
    api: resolve('api'),
    auth: resolve('common/core/auth'),
    utils: resolve('common/utils'),
    pages: resolve('pages'),
    store: resolve('common/core/store'),
    fonts: resolve('common/fonts'),
    config: resolve('config'),
    common: resolve('common'),
    styles: resolve('common/styles'),
    images: resolve('common/images'),
    injectRedux: resolve('common/core/store/injectRedux.js'),
    setGlobalStore: resolve('appkit/setGlobalStore.js'),
    setInitState: resolve('appkit/setInitState.js'),
    loginHelper: resolve('appkit/loginHelper.js'),
    menuHelper: resolve('appkit/menuHelper.js'),
    authCheck: resolve('appkit/authCheck'),
    components: resolve('components')
  },
  devHost: 'localhost',
  devPort: 3000,
  // 开发环境dll文件列表、生产环境commonChunk文件列表
  dll: [
    'axios',
    'react',
    'react-dom',
    'react-router-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'react-loadable'
  ]
}