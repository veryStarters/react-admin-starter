import React, { Component } from 'react'
import { Menu } from 'antd'
import config from 'config'
import sidebarMenus from 'src/menus'
import api from 'api'
import createSubMenus, { openedKeys } from '../createSubMenus'

class MamsMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'inline',
      menus: []
    }
  }

  componentWillMount() {
    let menus = config.menus
    if (menus && menus.length) {
      this.setState({
        menus: menus
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
          key: 'error',
          url: '/demo/menutip'
        }
      ]
      this.setState({
        menus: defaultMenus
      })
      console.log('getMenus接口返回数据为空或者出错')
    }
    api.getMenus().then(res => {
      if (res.code === 0 && res.data) {
        this.setState({
          menus: res.data
        })
      } else {
        setDefault()
      }
    }).catch(e => {
      setDefault()
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.collapsed ? 'vertical' : 'inline'
    })
  }

  render() {
    const menusData = createSubMenus(sidebarMenus.length ? sidebarMenus : this.state.menus)
    return menusData.length > 0 ? <Menu
      theme='dark'
      mode={this.state.mode}
      defaultOpenKeys={openedKeys}
      style={{ border: 'none' }}>
      {menusData}
    </Menu> : null
  }
}

export default MamsMenu
