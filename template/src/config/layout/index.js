import api from 'api'
import config from 'config'
// import * as topToolbars from './topToolbars.js'
// import Footer from 'components/Footer'
import { getUserInfo, removeUserInfo } from 'utils/loginHelper'

export default {

  // // 固定顶部
  // fixedHeader: false,
  //
  // // 右上角工具栏配置
  // topToolbars: topToolbars,
  //
  // // 底部固定信息栏
  // Footer: Footer || null,

  // 右上角弹出层配置
  popupItems: {
    detail: {
      title: '详情',
      action: () => {
        const userInfo = getUserInfo()
        alert(`Hello, ${userInfo.username}!`)
      }
    },
    logout: {
      title: '退出登录',
      action: async () => {
        const res = await api.logout()
        if (res.code === 0 && res.data) {
          removeUserInfo()
          location.href = config.loginRoute
        }
      }
    }
  }
}
