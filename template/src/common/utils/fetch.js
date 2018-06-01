import axios from 'axios'
import config from 'config'
import { getAccessToken } from 'loginHelper'

const buildEnv = process.env.BUILD_ENV || 'development'
let fetcher = axios.create({
  method: 'post',
  withCredentials: true,
  headers: {
    'Accept': '*',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'AccessToken': getAccessToken()
  },
  transformRequest: [data => {
    const accessToken = getAccessToken()
    if (accessToken && !data.AccessToken) {
      data.AccessToken = accessToken
    }
    return JSON.stringify(data)
  }]
})

fetcher.interceptors.request.use(config => {
  return config
}, function (error) {
  return Promise.reject(error)
})

fetcher.interceptors.response.use(response => {
  return config.responseInterceptor ? config.responseInterceptor(response) : response.data
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
    console.log('API Environment: ', buildEnv)
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
