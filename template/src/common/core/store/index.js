import { combineReducers } from 'redux'
import { bindActionCreators } from 'redux'
import * as modules from './modules'

let reducers = {}
let actions = {}
Object.keys(modules).forEach(key => {
  const module = modules[key]
  reducers[key] = module.reducers
  actions[key] = {}
  Object.keys(module.actions).forEach(actionKey => {
    const action = module.actions[actionKey]
    if (key === 'global') {
      actions[actionKey] = action
    }
    actions[key][actionKey] = action
  })
})

export const mapDispatchToProps = dispatch => {
  let acts = {}
  for (let i in actions) {
    acts[i] = bindActionCreators(actions[i], dispatch)
  }
  return {
    actions: acts
  }
}

export default combineReducers(reducers)


