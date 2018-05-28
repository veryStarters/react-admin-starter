/**
 * 本文件提供系统权限校验逻辑，如无特殊权限控制需求，请勿导出默认模块，也即需注释掉下方所有代码，否则将覆盖系统默认的权限校验逻辑
 * 系统默认的权限校验逻辑为：在store.initState中有一个permission字段，内部存储着系统所有有权限的权限单元key值。
 * @param key  权限单元的key值（可以是数字，也可以是字符串，还可以是该权限单元对应的api地址）
 * @returns {boolean}
 */

// import store from 'store'
// export default key => {
//   let state = store.getState()
//   let permission = state.global.initState.permission
//   return !!permission && !!permission[key]
// }
