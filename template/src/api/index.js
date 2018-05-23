import fetch from 'utils/fetch'

export default {
  login(params) {
    return fetch('/login', params)
  },
  logout(params) {
    return fetch('/logout', params)
  },
  getMenus(params) {
    return fetch('/base/menus', params)
  },
  // 获取APP初始化信息，包含权限等内容
  getInitState(params) {
    return fetch('/base/initState', params)
  },
  getUserList(params) {
    return fetch('/user/list', params)
  },
  getUserInfo(params) {
    return fetch('/user/info', params)
  },
}
