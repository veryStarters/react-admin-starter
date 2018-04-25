import storage from './storage'
import axios from 'axios'
import config from 'config'

const buildEnv = process.env.BUILD_ENV || 'development'
let fetcher = axios.create({
  method: 'post',
  withCredentials: true,
  headers: {
    'Accept': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'AccessToken': storage.get('AccessToken') || ''
  },
  transformRequest: [function (data) {
    const userInfo = storage.get('UserInfo')
    if (userInfo && data && !data.NOUSERINFO) {
      data.token = userInfo.token
    }
    return JSON.stringify(data)
  }]
})

fetcher.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

fetcher.interceptors.response.use(function (response) {
  return response.data
}, function (error) {
  return Promise.reject(error)
})

export default async (url = '', params = {}, option = {}) => {
  if (!url) {
    return Promise.reject(`params 'url' not exist！`)
  }
  let method = option.method || 'post'
  let prefixName = option.prefixName || 'default'
  if (url.indexOf('http') !== 0) {
    let baseUrl = config.baseUrl[prefixName]
    if (typeof baseUrl === 'object') {
      baseUrl = baseUrl[buildEnv]
    }
    console.log('API BASE_URL: ', baseUrl)
    url = baseUrl + url
  }
  switch (method) {
    case 'get':
      return fetcher.get(url, {
        params: params
      })
    case 'post':
    case 'put':
    case 'patch':
      return fetcher.post(url, params, option)
    default:
      return Promise.reject(`unKnown request method '${method}'`)
  }
}
