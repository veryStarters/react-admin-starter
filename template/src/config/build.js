const path = require('path')
const resolve = function (dir) {
  return path.resolve(__dirname, '..', dir)
}
module.exports = {
  // 入口JS
  appIndexJs: 'src/common/core/index.js',
  // 模块名称
  alias: {
    src: resolve('.'),
    api: resolve('api'),
    core: resolve('common/core'),
    auth: resolve('common/core/auth'),
    utils: resolve('common/utils'),
    pages: resolve('pages'),
    fonts: resolve('common/fonts'),
    config: resolve('config/app'),
    common: resolve('common'),
    styles: resolve('common/styles'),
    images: resolve('common/images'),
    storeKit: resolve('common/core/store/storeKit'),
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