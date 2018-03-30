// actionType 定义
const actionType = {
  TEST: 'TEST'
}

// reducers初始状态
const initState = {
  testKey: 'testValue'
}

// 在此处定义reducers
export const reducers = (state = initState, action) => {
  switch (action.type) {
    case actionType.TEST:
      return {
        ...state,
        testKey: action.testKey
      }
    default:
      return state
  }
}

// 此处定义actions
export const actions = {
  test() {
    return dispatch => {
      dispatch({
        type: actionType.TEST,
        testKey: 'testValue'
      })
    }
  }
}
