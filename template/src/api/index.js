import fetch from 'utils/fetch'

export default {
  getUserInfo(params) {
    return fetch('/user/info', params)
  }
}
