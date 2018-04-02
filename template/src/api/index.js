import fetch from 'utils/fetch'

export default {
  login(params) {
    return fetch('/login', params)
  },
  logout(params) {
    return fetch('/logout', params)
  },
  getMenus(params) {
    return fetch('/user/menus', params)
  },
  getUserInfo(params) {
    return fetch('/user/info', params)
  }
}
