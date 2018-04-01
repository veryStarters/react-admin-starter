import config from 'config'
import * as routes from './routes'
import * as routesCustom from './routes-custom'
let routers = []
Object.keys(routes).forEach((routeName) => {
  let routeComponent = routes[routeName]
  let custom = routesCustom[routeName] || {}
  custom = custom.default || {}
  const name2path = name => {
    if (name === 'home') {
      return config.homeRoute
    }
    return `${config.homeRoute}${name.replace(/([A-Z])/g, '/$1').toLowerCase()}`
  }
  const getParentPath = parent => {
    let type = typeof parent
    if (type === 'string') {
      return parent.indexOf('/') === -1 ? name2path(parent) : parent
    }
    if (type === 'object') {
      if (parent.path) {
        return parent.path
      } else {
        throw Error(`route ${routeName} 存在错误的 parent 参数`)
      }
    }
  }
  const createRouter = () => {
    custom.path = custom.path || name2path(routeName)
    if (!custom.breadcrumbName && !custom.title && !custom.singlePage) {
      console.warn(custom.path + '缺少面包屑配置，请到src/config/routes.js文件中配置')
    }
    custom.parentPath = getParentPath(custom.parent || custom.parentPath)
    return Object.assign({
      title: '',
      path: '',
      exact: true,
      component: routeComponent,
      singlePage: false,
      parentPath: 'home'
    }, custom)
  }
  routers.push(createRouter())
})

export default routers
