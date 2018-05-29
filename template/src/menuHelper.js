import api from 'api'

/**
 * 获取后端返回的菜单树,需要返回一个promise
 * @param params
 * @returns {Promise.<*>}
 */
export const getSidebarMenu = async params => {
  let res = await api.getSidebarMenus(params || {})
  if (res && res.code === 0 && res.data) {
    return Promise.resolve(res.data)
  }
  return Promise.reject(res)
}
