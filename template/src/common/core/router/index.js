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
  const createRouter = path => {
    if (!custom.breadcrumbName && !custom.title && !custom.singlePage) {
      console.warn(path + '缺少面包屑配置，请到src/config/routes.js文件中配置')
    }
    return {
      title: custom.breadcrumbName || custom.title,
      path: path,
      exact: custom.exact || true,
      component: custom.component || routeComponent,
      onEnter: custom.onEnter || '',
      onLeave: custom.onLeave || '',
      singlePage: custom.singlePage || false,
      parentPath: getParentPath(custom.parent || custom.parentPath) || ''
    }
  }
  let path = name2path(routeName)
  routers.push(createRouter(custom.path || path))
})

// routers.push({
//   path: '*',
//   exact: true,
//   component: require('../error/404/index').default
// })

export default routers
