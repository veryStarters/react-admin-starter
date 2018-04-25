import React, { Component } from 'react'
import { Menu } from 'antd'
import createMenuItem from '../createMenuItem'
import { topMenus } from 'src/menus'

class TopMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      menus: []
    }
  }
  render() {
    const menuData = createMenuItem(topMenus.length ? topMenus : this.state.menus)
    return menuData.length > 0
      ? <Menu mode='horizontal'>{menuData}</Menu>
      : null
  }
}

export default TopMenu
