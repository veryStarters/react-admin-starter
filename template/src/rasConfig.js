const path = require('path')
const resolve = function (dir) {
  return path.resolve(__dirname, dir)
}
module.exports = {
  // 入口JS
  appIndexJs: 'src/common/core/index.js',
  // 模块名称
  alias: {
    src: resolve('.'),
    api: resolve('api'),
    utils: resolve('common/utils'),
    pages: resolve('pages'),
    config: resolve('config'),
    common: resolve('common'),
    core: resolve('common/core'),
    styles: resolve('common/styles'),
    fonts: resolve('common/fonts'),
    images: resolve('common/images'),
    components: resolve('components'),
    storeKit: resolve('common/core/store/storeKit')
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