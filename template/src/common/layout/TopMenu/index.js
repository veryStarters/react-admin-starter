import React, { Component } from 'react'
import { Menu } from 'antd'
import createMenus, { openedKeys } from '../createMenus'
import { topMenus } from 'src/menus'

class TopMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: '',
      mode: 'horizontal'
    }
  }
  handleClick = e => {
    this.setState({
      current: e.key
    })
  }
  render() {
    const menusData = createMenus(topMenus.length ? topMenus : this.state.menus)
    return menusData.length > 0 ? <Menu
      // theme='dark'
      mode={this.state.mode}
      defaultOpenKeys={openedKeys}
      style={{ border: 'none' }}>
      {menusData}
    </Menu> : null
  }
}

export default TopMenu
