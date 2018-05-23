import React, { Component } from 'react'
import { Layout, Icon, Alert, Dropdown, Menu } from 'antd'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import SidebarMenu from './Menu/SidebarMenu/index'
import TopMenu from './Menu/TopMenu/index'
import Breadcrumb from './Breadcrumb/index'
import config from 'config'
import layoutConfig from './config'
import logo from 'images/logo.svg'
import classnames from 'classnames'
import 'styles/index.pcss'
import style from './index.pcss'

import { getUserInfo, checkLogin } from 'utils/loginHelper'

const { Sider, Content } = Layout
const MenuItem = Menu.Item
const userInfo = getUserInfo()

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sidebarCollapsed: false
    }
    if (!checkLogin()) {
      location.href = config.loginRoute
    }
  }

  componentDidUpdate(preProps) {
    let location = this.props.location
    let preLocation = preProps.location
    if (location.pathname !== preLocation.pathname) {
      config.onRouteChange && config.onRouteChange({
        location,
        preLocation,
        props: this.props,
        preProps
      })
    }
    if (!checkLogin()) {
      location.href = config.loginRoute
    }
  }

  // 切换侧边栏状态
  toggleSidebar = () => {
    this.setState({
      sidebarCollapsed: !this.state.sidebarCollapsed,
    })
  }

  // 侧边菜单
  sidebarMenu() {
    return <SidebarMenu collapsed={this.state.sidebarCollapsed} {...this.props} />
  }

  topToolbar() {
    const toolbars = layoutConfig.topToolbars
    const keys = Object.keys(toolbars)
    return (
      <ul className={style.topToolbar}>
        {keys.map(key => {
          let Toolbar = toolbars[key].default || toolbars[key]
          return (
            <li key={key}>
              <Toolbar {...this.props} />
            </li>
          )
        })}
      </ul>
    )
  }

  // 顶部菜单
  topMenu() {
    return <TopMenu {...this.props} />
  }

  // 退出登陆
  handlePopupItems = async (item) => {
    if (item.key === 'rasLogin') {
      location.href = config.loginRoute
      return
    }
    let { popupItems } = layoutConfig
    popupItems[item.key].action.call(this)
  }
  popupItems() {
    const keys = Object.keys(layoutConfig.popupItems)
    return (
      <Menu onClick={this.handlePopupItems}>
        {
          userInfo.username ? keys.map((key) => {
            let item = layoutConfig.popupItems[key]
            return (
              <MenuItem key={key}>{item.title}</MenuItem>
            )
          }) : <MenuItem key={'rasLogin'}>{'登 录'}</MenuItem>
        }
      </Menu>
    )
  }

  render() {
    const { routes } = this.props
    const { sidebarCollapsed } = this.state
    const username = (() => {
      let name = userInfo.username
      if (!name) {
        return '游客'
      }
      return name.length <= 13 ? name : name.substr(0, 12) + '..'
    })()
    return (
      <Layout className={classnames({ [style.layout]: true, 'theme-light': layoutConfig.theme === 'light' })}>
        <Sider className={style.sidebar} trigger={null} collapsible collapsed={sidebarCollapsed}>
          <div className={style.logo}>
            <Link className={style.toHome} to={config.homeRoute}>
              <img src={logo} alt='logo'/>
              {
                !sidebarCollapsed
                  ? (
                    <div className={style.txt}>{config.appName}
                      <div className={style.sub}>{config.subName}</div>
                    </div>
                  ) : null
              }
            </Link>
          </div>
          <div className={style.menuContainer}>
            {this.sidebarMenu()}
          </div>
        </Sider>
        <Layout className={classnames({ [style.mainContentCollapsed]: sidebarCollapsed, [style.mainContent]: !sidebarCollapsed, 'fixed': layoutConfig.fixedHeader || false })}>
          {(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor))
            ? '' : <Alert message='请使用google chrome浏览器使用系统' banner closable/>}
          <table className={style.header}>
            <tbody>
              <tr width={'100%'}>
                <td width={'64'} className={style.collapseButton} onClick={this.toggleSidebar}>
                  <Icon type={sidebarCollapsed ? 'menu-unfold' : 'menu-fold'}/>
                </td>
                <td className={style.leftWrapper}>
                  {this.topMenu()}
                </td>
                <td width={'300'} className={style.topToolbar}>
                  {this.topToolbar()}
                </td>
                <td width={'130'} className={style.rightWrapper}>
                  <Dropdown
                    overlay={this.popupItems()}
                    placement='bottomCenter'
                  >
                    <span><Icon type='user'/> {username}</span>
                  </Dropdown>
                </td>
              </tr>
            </tbody>
          </table>
          <Layout className={style.body}>
            <Switch>
              {
                routes.map((route, index) => {
                  return (
                    <Route
                      key={index}
                      path={route.path}
                      exact={route.exact}
                      render={(match) => {
                        return (route.path === '/' && route.path !== config.homeRoute)
                          ? <Redirect to={config.homeRoute}/>
                          : <div>
                            <Breadcrumb match={match} routes={routes}/>
                            <Content>
                              <route.component match={match}/>
                            </Content>
                            <layoutConfig.Footer />
                          </div>
                      }}
                    />
                  )
                })
              }
              <Route path={'*'} render={ props => <Redirect to={{ pathname: config.homeRoute + 'common/error404' }} /> } />
            </Switch>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default MainLayout
