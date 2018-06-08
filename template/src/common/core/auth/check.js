import store from 'store'
import authCheck from 'authCheck'
/**
 * 默认情况下，通过getInitState接口获取到的数据中包含permission字段，该字段为一个以权限单元code为key的简单对象
 * @param authName  权限单元名称（可以是组件id，路由地址，api地址等能标识当前权限单元唯一性的任何id）
 * @param condition  额外条件 在权限单元确定的情况下，提供额外的判断手段（通常是角色、状态等第三方因素导致的）
 * @returns {*}
 */
const defaultAuthCheck = (authName, condition) => {
  if (!authName) {
    return false
  }
  condition = condition !== undefined ? condition : true
  if (typeof condition === 'function') {
    condition = condition()
  }
  let state = store.getState()
  let permission = state.global.initState.permission
  return permission && !!permission[authName] && condition
}

export default typeof authCheck === 'function' ? authCheck : defaultAuthCheck
