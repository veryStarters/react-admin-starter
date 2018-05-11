import React, { Component } from 'react'
import { Menu } from 'antd'
import sidebarMenus from 'src/menus'
import api from 'api'
import createMenuItem from '../createMenuItem'
import getCurrentMenu from '../getCurrentMenu'
import layoutConfig from '../../config'

class SidebarMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      theme: layoutConfig.theme || 'dark',
      mode: 'inline',
      selectedKeys: [],
      openKeys: [],
      menus: sidebarMenus && sidebarMenus.lenght ? sidebarMenus : this.getMenus()
    }
  }

  getMenus() {
    const setDefaultMenus = () => {
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
        openKeys: [],
        selectedKeys: ['menuError']
      })
      console.log('getMenus接口返回数据为空或者出错')
    }
    api.getMenus().then(res => {
      if (res.code === 0 && res.data) {
        this.setState({
          menus: res.data,
          selectedKeys: getCurrentMenu(res.data, location.pathname)
        })
      } else {
        setDefaultMenus()
      }
    }).catch(e => {
      setDefaultMenus()
    })
    return []
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
      selectedKeys: [e.key]
    })
  }

  render() {
    const { menus, theme, mode, selectedKeys, openKeys } = this.state
    const menuData = createMenuItem(sidebarMenus.length ? sidebarMenus : menus)
    return menuData.length > 0
      ? <Menu
        theme={theme}
        mode={mode}
        selectedKeys={selectedKeys}
        openKeys={openKeys}
        // defaultOpenKeys={openedKeys}
        onClick={this.onClickHandler}
      >{menuData}</Menu>
      : null
  }
}

export default SidebarMenu
