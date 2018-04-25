import React, { Component } from 'react'
import { Menu } from 'antd'
import createMenus, { openedKeys } from '../createSubMenus'
import { topMenus } from 'src/menus'

class TopMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'horizontal'
    }
  }
  render() {
    const menusData = createMenus(topMenus.length ? topMenus : this.state.menus)
    return menusData.length > 0 ? <Menu
      mode={this.state.mode}
      defaultOpenKeys={openedKeys}
      style={{ border: 'none' }}>
      {menusData}
    </Menu> : null
  }
}

export default TopMenu
