import api from 'api'
// import store from 'store'
/**
 * 从后端或者store中获取menus数据
 * @param setSidebarMenu
 * @returns {Promise.<*>}
 */
export const getSidebarMenu = setSidebarMenu => {
  // 可以从store获取menus数据
  // const unsubscribe = store.subscribe(() => {
  //   const state = store.getState()
  //   const { sidebarMenus } = state.global.initState
  //   setSidebarMenu && setSidebarMenu(sidebarMenus && sidebarMenus.length && sidebarMenus)
  //   unsubscribe()
  // })

  // 也可以从接口获取menus数据
  api.getSidebarMenus().then(res => {
    setSidebarMenu(res && res.code === 0 && res.data)
  })
}
