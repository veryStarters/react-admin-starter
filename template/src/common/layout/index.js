import React, { Component } from 'react'
import { Layout, Icon, Alert, Dropdown, Menu } from 'antd'
import {
  Link,
  Route,
  Redirect,
  Switch
} from 'react-router-dom'
import AppMenu from 'components/Menus'
import api from 'api'
import storage from 'utils/storage'
import config from 'config'
import YXBreadcrunb from 'components/Breadcrumb'
import style from './index.pcss'

const { Sider, Content } = Layout
const MenuItem = Menu.Item
const userInfo = storage.get('UserInfo') || {}

class MainLayout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: userInfo.userName || '',
      collapsed: false
    }
  }
  componentDidMount() {
  }

  // 设置是否可收起
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  // 拓展时用
  selectMenu() {
    const getMenuName = (pathName) => {
      if (!pathName || pathName === '/') return ''
      let reg = new RegExp(/\/(\b\w*\b)/)
      let matchName = pathName.match(reg)[1]
      let name = matchName.split('')
      name = name[0].toUpperCase() + name.slice(1).join('')
      return name
    }
    let pathName = decodeURI(location.pathname)
    let menuName = getMenuName(pathName)
    switch (menuName) {
      case 'App':
        return <AppMenu match={this.props.match} selectedMenu={this.props.selectedMenu} collapsed={this.state.collapsed}/>
      default :
        return <AppMenu match={this.props.match} selectedMenu={this.props.selectedMenu} collapsed={this.state.collapsed}/>
    }
  }
  // 退出登陆
  loginOut = async (item) => {
    // 退出登陆接口调用
    if (item.key === 'logout') {
      const userInfo = storage.get('UserInfo')
      const res = await api.logout(userInfo)
      if (res.code === 0) {
        storage.set('UserInfo', {})
        location.href = '/login'
      }
    }
  }

  render() {
    const { routes } = this.props
    const { collapsed, userName } = this.state
    return (
      <Layout className={style.layout}>
        <Sider className={style.sidebar} trigger={null} collapsible collapsed={collapsed}>
          <div className={style.logo}>
            <Link className={style['to-home']} to='/'>
              <img src={require('images/logo.svg')} alt='logo'/>
              {collapsed ? null : <div className={style.txt}>{config.appName}<div className={style['sub']}>管 理 系 统</div></div>}
            </Link>
          </div>
          <div className={style['menu-container']}>
            {this.selectMenu()}
          </div>
        </Sider>
        <Layout className={collapsed ? style['main-content-collapsed'] : style['main-content']}>
          {(/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor))
            ? '' : <Alert message='请使用google chrome浏览器使用系统' banner closable/>}
          <div className={style['header']}>
            <div className={style['header-button']} onClick={this.toggle}>
              <Icon type={collapsed ? 'menu-unfold' : 'menu-fold'}/>
            </div>
            <div className={style['left-wrapper']}>
            </div>
            <div className={style['right-wrapper']}>
              <Dropdown
                overlay={<Menu
                  onClick={this.loginOut}>
                  <MenuItem key='detail'>详情</MenuItem>
                  <MenuItem key='logout'>退出登录</MenuItem>
                </Menu>} placement='bottomCenter'>
                <span><Icon type='user'/> {userName}</span>
              </Dropdown>
            </div>
          </div>
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
                        return (route.path === '/' && route.path !== config.homeRoute) ? <Redirect to={config.homeRoute}/> : <div>
                          <YXBreadcrunb match={match} routes={routes}/>
                          <Content>
                            <route.component match={match}/>
                          </Content>
                        </div>
                      }}
                    />
                  )
                })
              }
            </Switch>
          </Layout>
        </Layout>
      </Layout>
    )
  }
}

export default MainLayout

