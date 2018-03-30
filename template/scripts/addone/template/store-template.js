export default
`/**
 * 本模板框架由系统自动生成，请不要改动reducers以及actions两个变量名称
 * 使用步骤：
 * 1、在actionType中定义action type
 * 2、在initState中定义本模块的state名称
 * 3、为该state创建一个reducer和一个action
 */

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
        testKey: 'testValue'
      }
    default:
      return state
  }
}

// 此处定义actions
export const actions = {
  // 同步action
  // test() {
  //   return dispatch => {
  //     dispatch({
  //       type: actionType.TEST,
  //       testKey: 'testValue'
  //     })
  //   }
  // },
  // 异步action，返回一个promise，且将当前state往下传递
  // test2() {
  //   return (dispatch, getState) => {
  //     dispatch({})
  //     return Promise.resolve(getState())
  //   }
  // }
}
`