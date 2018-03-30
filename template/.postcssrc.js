// https://github.com/michael-ciniawsky/postcss-load-config
module.exports = {
  plugins: {
    // bug修复
    'postcss-flexbugs-fixes': {},
    // @import支持
    'postcss-import': {},
    // cssnext
    'postcss-cssnext': {
      browsers: [
        '>1%',
        'last 4 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ]
    },
    // 嵌套
    'postcss-nested': {},
    // // mixin
    // 'postcss-mixins': {},
    // // 变量定义、循环语法
    // 'postcss-advanced-variables': function () {
    //   return {
    //     // 全局变量定义
    //     variables: {
    //       colorList: 'red, green, blue, yellow',
    //       fontMin: 12,
    //       fontMax: 52
    //     }
    //   }
    // }(),
    // 样式压缩、优化
    'cssnano': {
      zIndex: false,
      autoprefixer: false
    }
  }
}
