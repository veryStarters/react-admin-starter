/**
 * 本方法提供按照权限单元的code(可以是数字，也可以是字符串)来决定当前用户是否具有该单元的访问权限
 * 默认情况下，通过getInitState接口获取到的数据中包含permission字段，该字段为一个以权限单元code为key的简单对象
 */
import store from 'store'
export default code => {
  let state = store.getState()
  let permission = state.global.appInitData.permission
  return permission && !!permission[code]
}
