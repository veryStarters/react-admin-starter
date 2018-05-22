import storage from './storage'
import config from 'config'

// 记录登录时间的local storage key
const loginTimeKey = 'USER_LOGIN_TIME'

// 用户信息
const userInfoKey = 'USER_INFO'

// accessTokenKey
const accessTokenKey = 'ACCESS_TOKEN'

const getLoginRemainingTime = () => {
  let loginTime = Math.ceil(+storage.get(loginTimeKey) / 1000)
  if (!loginTime) {
    return 0
  }
  return (config.sessionDuration || 30 * 60 * 1000) / 1000 - (Math.ceil(Date.now() / 1000) - loginTime)
}

export const removeUserInfo = () => {
  storage.remove(userInfoKey)
  storage.remove(accessTokenKey)
  storage.remove(loginTimeKey)
}

/**
 * 设置用户登录信息
 * @param userInfo
 */
export const setUserInfo = (userInfo) => {
  userInfo = userInfo || {}
  storage.set(userInfoKey, userInfo || '')
  storage.set(accessTokenKey, userInfo.accessToken || userInfo.AccessToken || userInfo.token || '')
  storage.set(loginTimeKey, Date.now())
}

/**
 * 获取用户信息
 */
export const getUserInfo = () => {
  return storage.get(userInfoKey) || ''
}

/**
 * 获取AccessToken
 */
export const getAccessToken = () => {
  return storage.get(accessTokenKey) || ''
}

/**
 * 判断当前是否登录
 * @returns {boolean}
 */
export const checkLogin = () => {
  return getUserInfo() && (getLoginRemainingTime() > 10)
}

export const loginMonitor = (() => {
  let timer
  return function (callback, rate) {
    callback = callback || function() {}
    if (timer) {
      clearInterval(timer)
    }
    timer = setInterval(() => {
      let remainingTime = getLoginRemainingTime()
      if (remainingTime < 1) { // 登录已经失效
        clearInterval(timer)
        removeUserInfo()
        callback({ isLogin: false })
      } else {
        callback({ isLogin: true })
      }
    }, (rate || 10) * 1000)
  }
})()
