import api from 'api'
import config from 'config'
import * as topToolbars from './topToolbars.js'
import Footer from 'components/Footer'
import { getUserInfo, removeUserInfo, setUserInfo } from 'utils/loginHelper'

export default {
  theme: 'dark',

  // 固定顶部
  fixedHeader: false,

  // 右上角工具栏配置
  topToolbars: topToolbars,

  // 底部固定信息栏
  Footer: Footer || null,

  // 右上角弹出层配置
  userItem: {
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
    },
    // 登录的toolbar名称login为系统保留关键字，不允许修改成其它名称
    login: {
      title: '登录系统',
      action: async () => {
        const res = await api.login()
        if (res.code === 0 && res.data) {
          setUserInfo(res.data)
          location.href = config.homeRoute
        }
      }
    }
  }
}
