import React, { Component } from 'react'
import { Menu } from 'antd'
import sidebarMenus from 'config/layout/sideMenus'
import createMenuItem from '../createMenuItem'
import getMenusInfo from '../getMenusInfo'
import fixMenus from '../fixMenus'
import layoutConfig from '../../config'
import { getSidebarMenu } from 'menuHelper'

class SidebarMenu extends Component {
  constructor(props) {
    super(props)
    let menusInfo = {}
    let selectedKeys = []
    let defaultOpenKeys = []
    if (sidebarMenus && sidebarMenus.length) {
      fixMenus(sidebarMenus)
      menusInfo = getMenusInfo(sidebarMenus, location.pathname)
      selectedKeys = [menusInfo.currentKey]
      defaultOpenKeys = menusInfo.defaultOpenKeys
    } else {
      this.setMenus()
    }
    this.state = {
      theme: layoutConfig.theme || 'dark',
      mode: 'inline',
      selectedKeys: selectedKeys,
      defaultOpenKeys: defaultOpenKeys,
      menus: sidebarMenus
    }
  }

  setDefaultMenus = () => {
    this.setState({
      menus: [
        {
          icon: 'error',
          value: '未取到menus配置',
          key: 'menuError',
          url: '/demo/menutip'
        }
      ],
      selectedKeys: ['menuError']
    })
    console.log('getMenus接口返回数据为空或者出错')
  }

  setMenus(params) {
    getSidebarMenu(params).then(menus => {
      menus = fixMenus(menus)
      let { currentKey, defaultOpenKeys } = getMenusInfo(menus, location.pathname)
      this.setState({
        menus: menus,
        defaultOpenKeys: defaultOpenKeys,
        selectedKeys: [currentKey]
      })
    }).catch(e => {
      this.setDefaultMenus()
    })
  }

  componentWillReceiveProps(nextProps) {
    let { pathname } = nextProps.location
    let menusInfo = getMenusInfo(this.state.menus, pathname)
    let selectedKeys = [menusInfo.currentKey]
    this.setState({
      mode: nextProps.collapsed ? 'vertical' : 'inline',
      selectedKeys
    })
  }

  onClickHandler = e => {
    this.setState({
      selectedKeys: [e.key],
    })
  }

  render() {
    const { menus, theme, mode, selectedKeys, defaultOpenKeys } = this.state
    const menuData = createMenuItem(menus)
    return menuData.length > 0
      ? <Menu
        theme={theme}
        mode={mode}
        defaultOpenKeys={defaultOpenKeys}
        selectedKeys={selectedKeys}
        onClick={this.onClickHandler}
        onOpenChange={this.onOpenChange}
      >{menuData}</Menu>
      : null
  }
}

export default SidebarMenu
