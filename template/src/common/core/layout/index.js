import React, { Component } from 'react'
import { Layout, Icon, Alert, Dropdown, Menu } from 'antd'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import SidebarMenu from './Menu/SidebarMenu/index'
import TopMenu from './Menu/TopMenu/index'
import Breadcrumb from './Breadcrumb/index'
import storage from 'utils/storage'
import config from 'config'
import layoutConfig from 'src/config/layout'
import NotFound from 'common/error/404'
import logo from 'images/logo.svg'
import classnames from 'classnames'
import 'styles/index.pcss'
import style from './index.pcss'


const { Sider, Content } = Layout
const MenuItem = Menu.Item
const userInfo = storage.get('UserInfo') || {}

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: userInfo.userName || '游客',
      sidebarCollapsed: false,
      fixed: layoutConfig.fixedHeader || false
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
  handleUserItem = async (item) => {
    let { userItem } = layoutConfig
    userItem[item.key].action.call(this)
  }
  userItem() {
    const keys = Object.keys(layoutConfig.userItem)
    return (
      <Menu onClick={this.handleUserItem}>
        {
          userInfo.userName ? keys.map((key) => {
            let item = layoutConfig.userItem[key]
            if (key === 'login') {
              return null
            }
            return (
              <MenuItem key={key}>{item.title}</MenuItem>
            )
          }) : <MenuItem key={'login'}>{layoutConfig.userItem['login'].title}</MenuItem>
        }
      </Menu>
    )
  }

  render() {
    const { routes } = this.props
    const { sidebarCollapsed, userName } = this.state
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
        <Layout className={classnames({ [style.mainContentCollapsed]: sidebarCollapsed, [style.mainContent]: !sidebarCollapsed, 'fixed': this.state.fixed })}>
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
                <td width={'120'} className={style.rightWrapper}>
                  <Dropdown
                    overlay={this.userItem()}
                    placement='bottomCenter'>
                    <span><Icon type='user'/> {userName}</span>
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
                          </div>
                      }}
                    />
                  )
                })
              }
              <Route path='*' component={NotFound}/>
            </Switch>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default MainLayout