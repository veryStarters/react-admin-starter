/**
 * 系统初始状态，如果开启了权限验证功能，则主要需要返回的字段的是permission
 */
import api from 'api'
import store from 'store'
import config from 'config'
import { message } from 'antd'
import { getAccessToken } from 'loginHelper'
const { global } = store.getState()


export default async (callback) => {
  if (!config.needAuth || (global.initState && global.initState.permission)) {
    callback && callback()
    return
  }
  let res = await api.getInitState({ token: getAccessToken() })
  if (res && res.code === 0 && res.data) {
    store.dispatch({
      type: 'SET_INIT_STATE',
      initState: res.data
    })
  } else {
    message.error('当前项目已开启权限功能，需要getInitState接口，并返回对应权限数据结构。具体请见/help/auth')
  }
  callback && callback()
}


