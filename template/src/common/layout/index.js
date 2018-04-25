import React, { Component } from 'react'
import { Layout, Icon, Alert, Dropdown, Menu } from 'antd'
import {
  Link,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import SidebarMenu from './Menu/SidebarMenu'
// import TopMenu from './Menu/TopMenu'
import Breadcrumb from './Breadcrumb'
import api from 'api'
import storage from 'utils/storage'
import config from 'config'
import NotFound from 'common/error/404'
import logo from 'images/logo.svg'
import style from './index.pcss'

const { Sider, Content } = Layout
const MenuItem = Menu.Item
const userInfo = storage.get('UserInfo') || {}

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: userInfo.userName || '',
      collapsed: false,
      current: 'home'
    }
  }

  // 设置是否可收起
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  // 侧边菜单
  sidebarMenu() {
    return <SidebarMenu collapsed={this.state.collapsed} match={this.props.match} selectedMenu={this.props.selectedMenu}/>
  }

  // 顶部菜单
  topMenu() {
    return null
    // return <TopMenu />
  }

  // 退出登陆
  logout = async (item) => {
    // 退出登陆接口调用
    if (item.key === 'logout') {
      const userInfo = storage.get('UserInfo')
      const res = await api.logout(userInfo)
      if (res.code === 0 && res.data) {
        storage.set('UserInfo', {})
        location.href = config.loginRoute
      }
    }
    if (item.key === 'detail') {
      alert('detail')
    }
  }

  render() {
    const { routes } = this.props
    const { collapsed, userName } = this.state
    return (
      <Layout className={style.layout}>
        <Sider className={style.sidebar} trigger={null} collapsible collapsed={collapsed}>
          <div className={style.logo}>
            <Link className={style.toHome} to='/'>
              <img src={logo} alt='logo'/>
              {collapsed ? null : <div className={style.txt}>{config.appName}
                <div className={style.sub}>{config.subName}</div>
              </div>}
            </Link>
          </div>
          <div className={style.menuContainer}>
            {this.sidebarMenu()}
          </div>
        </Sider>
        <Layout className={collapsed ? style.mainContentCollapsed : style.mainContent}>
          {(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor))
            ? '' : <Alert message='请使用google chrome浏览器使用系统' banner closable/>}
          <table className={style.header}>
            <tbody>
              <tr width={'100%'}>
                <td width={'64'} className={style.collapseButton} onClick={this.toggle}>
                  <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
                </td>
                <td className={style.leftWrapper}>
                  {this.topMenu()}
                </td>
                <td width={'200'} className={style.rightWrapper}>
                  <Dropdown
                    overlay={<Menu
                      onClick={this.logout}>
                      <MenuItem key='detail'>详情</MenuItem>
                      <MenuItem key='logout'>退出登录</MenuItem>
                    </Menu>} placement='bottomCenter'>
                    <span><Icon type='user'/> {userName}</span>
                  </Dropdown>
                </td>
              </tr>
            </tbody>
          </table>
          <Layout style={{ padding: '0 24px 24px' }}>
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
