import React, { Component } from 'react'
import { Menu } from 'antd'
import createMenuItem from '../createMenuItem'
import getMenusInfo from '../getMenusInfo'
import fixMenus from '../fixMenus'
import { topMenus } from 'src/config/menu'

class TopMenu extends Component {
  constructor(props) {
    super(props)
    fixMenus(topMenus)
    let { currentKey } = getMenusInfo(topMenus, location.pathname)
    this.state = {
      selectedKeys: [currentKey],
      menus: topMenus || []
    }
  }
  componentWillReceiveProps(nextProps) {
    let { pathname } = nextProps.location
    let menusInfo = getMenusInfo(this.state.menus, pathname)
    let selectedKeys = [menusInfo.currentKey]
    this.setState({
      selectedKeys: selectedKeys
    })
  }
  onClickHandler = e => {
    this.setState({
      selectedKeys: [e.key]
    })
  }
  render() {
    const menuData = createMenuItem(this.state.menus)
    return menuData.length > 0
      ? <Menu mode='horizontal' selectedKeys={this.state.selectedKeys} onClick={this.onClickHandler}>{menuData}</Menu>
      : null
  }
}

export default TopMenu
