import { combineReducers } from 'redux'
import { bindActionCreators } from 'redux'
import * as modules from './modules'

let reducers = {}
let actions = {}
Object.keys(modules).forEach(key => {
  let module = modules[key]
  reducers[key] = module.reducers
  Object.keys(module.actions).forEach(actionKey => {
    if (actions[actionKey]) {
      console.error(actionKey + '方法同时存在于多个store模块，请按照『先到先得』原则检查并修改！！')
      return
    }
    actions[actionKey] = module.actions[actionKey]
  })
})

export const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default combineReducers(reducers)


