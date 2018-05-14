import React, { Component } from 'react'
import { Menu } from 'antd'
import createMenuItem from '../createMenuItem'
import getMenusInfo from '../getMenusInfo'
import { topMenus } from 'src/menus'

class TopMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: getMenusInfo(topMenus, location.pathname),
      menus: []
    }
  }
  componentWillReceiveProps(nextProps) {
    const location = nextProps.location
    let current = getMenusInfo(topMenus, location.pathname)
    this.setState({
      current: current
    })
  }
  onClickHandler = e => {
    this.setState({
      current: e.key
    })
  }
  render() {
    const menuData = createMenuItem(topMenus.length ? topMenus : this.state.menus)
    return menuData.length > 0
      ? <Menu mode='horizontal' selectedKeys={[this.state.current]} onClick={this.onClickHandler}>{menuData}</Menu>
      : null
  }
}

export default TopMenu
