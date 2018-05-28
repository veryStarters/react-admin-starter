/**
 * 系统初始状态，如果开启了权限验证功能，则主要需要返回的字段的是permission
 */
import api from 'api'
import store from 'store'
import { message } from 'antd'
import config from 'config'
const { global } = store.getState()

export default () => {
  if (!config.needAuth || (global.initState && global.initState.permission)) {
    return
  }
  api.getInitState().then(res => {
    if (res.code === 0 && res.data && res.data.permission) {
      store.dispatch({
        type: 'SET_INIT_STATE',
        initState: res.data
      })
    } else {
      message.error('当前项目已开启权限功能，请增加getInitState接口并返回对应权限数据结构。具体请见/help/auth')
    }
  }).catch(() => {
    message.error('接口getInitState异常，请检查后再试！')
  })
}


