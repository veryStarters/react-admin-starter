/**
 * 本文件可定义系统全局状态
 */
import config from 'config'

const actionType = {
  CHANGE_APP_NAME: 'CHANGE_APP_NAME',
  GET_INIT_DATA: 'GET_INIT_DATA'
}

// reducers初始状态
const initState = {
  appName: config.appName,
  appInitData: {}
}

// 在此处定义reducers
export const reducers = (state = initState, action) => {
  switch (action.type) {
    case actionType.CHANGE_APP_NAME:
      return {
        ...state,
        appName: action.appName
      }
    // 这个action在core/index.js文件中直接触发
    case actionType.GET_INIT_DATA:
      return {
        ...state,
        appInitData: action.appInitData
      }
    default:
      return state
  }
}

// 此处定义actions
export const actions = {
  changeAppName(name) {
    return (dispatch) => {
      // 同步
      dispatch({
        type: actionType.CHANGE_APP_NAME,
        appName: name || 'React-App'
      })
    }
  }
}

