import React from 'react'
import api from 'api'
import storage from 'utils/storage'
import config from 'config'

/**
 * 最好放到外边去，此处仅为示例
 */
class Tip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handle = () => {
    alert('tip')
  }
  render() {
    return (
      <div onClick={this.handle}>
        <i className='icon setup' />Alert Tip
      </div>
    )
  }
}

export default {
  theme: 'dark',
  // 固定顶部
  fixedHeader: false,

  // 右上角工具栏配置
  topToolbar: {
    tip: Tip
  },

  // 右上角弹出层配置
  userItem: {
    detail: {
      title: '详情',
      action: () => {
        const userInfo = storage.get('UserInfo')
        alert(`Hello, ${userInfo.userName}!`)
      }
    },
    logout: {
      title: '退出登录',
      action: async () => {
        const res = await api.logout()
        if (res.code === 0 && res.data) {
          storage.set('UserInfo', {})
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
          storage.set('UserInfo', res.data)
          location.href = config.homeRoute
        }
      }
    }
  }
}
