import Footer from 'components/Footer'
import layoutConfig from 'config/layout'

export default Object.assign({
  theme: 'dark',

  // 固定顶部
  fixedHeader: false,

  // 右上角工具栏配置
  topToolbars: {},

  // 底部固定信息栏
  Footer: Footer || null,

  // 右上角弹出层配置
  popupItems: {}
}, layoutConfig || {})
