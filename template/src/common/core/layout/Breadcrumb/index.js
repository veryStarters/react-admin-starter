import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Breadcrumb } from 'antd'
import config from 'config'
import style from './style.pcss'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      breadcrumbItems: []
    }
  }

  componentWillMount() {
    let path = this.props.match.match.path
    this.createBreadcrumbItems(path)
  }

  resolvePath(path, resolveRoutes) {
    let route = this.props.routes.find(route => {
      return route.path === path
    })
    let parentPath = route.parentPath
    resolveRoutes.unshift(route)
    if (parentPath) {
      return this.resolvePath(parentPath, resolveRoutes)
    }
    return resolveRoutes
  }

  createBreadcrumbItems(path) {
    let resolveRoutes = []
    resolveRoutes = this.resolvePath(path, resolveRoutes)
    let breadcrumbItems = resolveRoutes.map((resolveRoute, index, routes) => {
      return this.createBreadcrumbItem(resolveRoute, index, routes)
    })
    this.setState({
      breadcrumbItems
    })
  }

  replacePath(path, url) {
    let pathArr = path.split('/')
    let urlArr = url.split('/')
    return pathArr.map((pathStr, index) => {
      return urlArr[index]
    }).join('/')
  }

  createBreadcrumbItem(route, index, routes) {
    let breadcrumbName = route.breadcrumbName || route.title
    if (!breadcrumbName) {
      breadcrumbName = ''
      let params = this.props.match.match.params
      for (let i in params) {
        if (params.hasOwnProperty(i)) {
          if (params[i]) {
            breadcrumbName = params[i]
          }
        }
      }
    }
    let path = this.replacePath(route.path, this.props.match.match.url)
    return (
      <Breadcrumb.Item key={route.path} className={'breadcrumb-placeholder'}>
        <Link to={path}>{breadcrumbName}</Link>
      </Breadcrumb.Item>
    )
  }
  goBack = () => {
    window.history.go(-1)
  }

  render() {
    let isHome = this.state.breadcrumbItems.length === 1 && this.state.breadcrumbItems[0].key === config.homeRoute
    return (
      <Breadcrumb className={style.bread}>
        {!isHome
          ? (
            <Breadcrumb.Item>
              <span className={style.back} onClick={this.goBack}>返回</span>&nbsp;&nbsp;/&nbsp;&nbsp;
              <Link to={config.homeRoute}>首页</Link>
            </Breadcrumb.Item>
          )
          : null}
        {this.state.breadcrumbItems}
      </Breadcrumb>
    )
  }
}

export default App

