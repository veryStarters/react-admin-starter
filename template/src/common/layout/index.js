import React, { Component } from 'react'
import { Layout, Icon, Alert, Dropdown, Menu } from 'antd'
import { Link, Route, Redirect, Switch } from 'react-router-dom'
import SidebarMenu from './Menu/SidebarMenu'
import TopMenu from './Menu/TopMenu'
import Breadcrumb from './Breadcrumb'
import storage from 'utils/storage'
import config from 'config'
import layoutConfig from './config'
import NotFound from 'common/error/404'
import logo from 'images/logo.svg'
import style from './index.pcss'
import classnames from 'classnames'

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

  // 顶部菜单
  topMenu() {
    return <TopMenu {...this.props} />
  }

  // 退出登陆
  handleToolbar = async (item) => {
    let { toolbar } = layoutConfig
    toolbar[item.key].action.call(this)
  }
  getToolbar() {
    const keys = Object.keys(layoutConfig.toolbar)
    return (
      <Menu onClick={this.handleToolbar}>
        {
          userInfo.userName ? keys.map((key) => {
            let item = layoutConfig.toolbar[key]
            if (key === 'login') {
              return null
            }
            return (
              <MenuItem key={key}>{item.title}</MenuItem>
            )
          }) : <MenuItem key={'login'}>{layoutConfig.toolbar['login'].title}</MenuItem>
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
                <td width={'200'} className={style.rightWrapper}>
                  <Dropdown
                    overlay={this.getToolbar()}
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
