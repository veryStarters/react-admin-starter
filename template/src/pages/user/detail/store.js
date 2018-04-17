
// action type
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
  // 同步action
  changeTestValue(value) {
    return dispatch => {
      dispatch({
        type: actionType.TEST,
        testKey: value
      })
    }
  },
  // 异步action，返回一个promise，且将当前state往下传递
  // test2() {
  //   return (dispatch, getState) => {
  //     dispatch({})
  //     return Promise.resolve(getState())
  //   }
  // }
}
