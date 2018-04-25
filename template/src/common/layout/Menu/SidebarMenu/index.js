import React, { Component } from 'react'
import { Menu } from 'antd'
import sidebarMenus from 'src/menus'
import api from 'api'
import createMenuItem, { openedKeys } from '../createMenuItem'
import getCurrentMenu from '../getCurrentMenu'

class SidebarMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: 'dark',
      mode: 'inline',
      current: '',
      menus: []
    }
  }

  componentWillMount() {
    if (sidebarMenus && sidebarMenus.length) {
      this.setState({
        menus: sidebarMenus,
        current: getCurrentMenu(sidebarMenus, location.pathname)
      })
      return
    }
    this.getMenus()
  }

  getMenus() {
    const setDefault = () => {
      const defaultMenus = [
        {
          icon: 'error',
          value: '未取到menus配置',
          key: 'menuError',
          url: '/demo/menutip'
        }
      ]
      this.setState({
        menus: defaultMenus,
        current: 'menuError'
      })
      console.log('getMenus接口返回数据为空或者出错')
    }
    api.getMenus().then(res => {
      if (res.code === 0 && res.data) {
        this.setState({
          menus: res.data,
          current: getCurrentMenu(res.data, location.pathname)
        })
      } else {
        setDefault()
      }
    }).catch(e => {
      setDefault()
    })
  }

  componentWillReceiveProps(nextProps) {
    let { pathname } = nextProps.location
    this.setState({
      mode: nextProps.collapsed ? 'vertical' : 'inline',
      current: getCurrentMenu(this.state.menus, pathname)
    })
  }

  onClickHandler = e => {
    this.setState({
      current: e.key
    })
  }

  render() {
    const { menus, theme, mode, current } = this.state
    const menuData = createMenuItem(sidebarMenus.length ? sidebarMenus : menus)
    return menuData.length > 0
      ? <Menu
        theme={theme}
        mode={mode}
        defaultSelectedKeys={['home']}
        selectedKeys={[current]}
        defaultOpenKeys={openedKeys}
        onClick={this.onClickHandler}
      >{menuData}</Menu>
      : null
  }
}

export default SidebarMenu
