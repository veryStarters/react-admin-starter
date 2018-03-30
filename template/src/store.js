import config from 'config'

const actionType = {
  CHANGE_APP_NAME: 'CHANGE_APP_NAME'
}

// reducers初始状态
const initState = {
  appName: config.appName
}

// 在此处定义reducers
export const reducers = (state = initState, action) => {
  switch (action.type) {
    case actionType.CHANGE_APP_NAME:
      return {
        ...state,
        appName: action.appName
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

