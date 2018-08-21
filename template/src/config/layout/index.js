/**
 * 系统布局配置，所以配置项均可省略，默认值见具体配置项
 */

import React from 'react'
import api from 'api'
import config from 'config'
import * as topToolbars from './topToolbars.js'
import Footer from 'components/Footer'
import { getUserInfo, removeUserInfo } from 'loginHelper'

// 防止topToolbars为空（默认会存在default）的情况
if (topToolbars.default) {
  topToolbars.default = props => null
}

export default {

  // 是否固定顶部菜单栏，默认值false，可省略
  fixedHeader: false,

  // 右上角工具栏组件列表，默认为{}，可省略
  topToolbars: topToolbars,

  // 底部信息栏，默认值为Footer组件，可省略
  Footer: Footer,

  // 右上角弹出层配置，默认值为 {}，可省略, title也支持component
  popupItems: {
    detail: {
      title: '详情',
      action: () => {
        const userInfo = getUserInfo()
        alert(`Hello, ${userInfo.username}!`)
      }
    },
    hello: {
      hidden: false,
      title: (props) => {
        return (
          <div onClick={() => { alert('你点了组件元素') }}>
            打开自定义
          </div>
        )
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
