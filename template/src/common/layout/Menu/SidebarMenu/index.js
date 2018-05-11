import React, { Component } from 'react'
import { Menu } from 'antd'
import sidebarMenus from 'src/menus'
import api from 'api'
import createMenuItem, { defaultOpenKeys } from '../createMenuItem'
import getCurrentMenu from '../getCurrentMenu'
import getOpenMenuKeys from '../getOpenMenuKeys'
import layoutConfig from '../../config'

class SidebarMenu extends Component {
  constructor(props) {
    super(props)
    // console.log(sidebarMenus, 1)
    this.state = {
      theme: layoutConfig.theme || 'dark',
      mode: 'inline',
      current: '',
      openKeys: [],
      menus: sidebarMenus && sidebarMenus.length ? sidebarMenus : this.getMenus()
    }
  }

  componentDidMount() {
    // let { currentKey, parents } = getCurrentMenu(this.state.menus, location.pathname)
    // // console.log(this.state.menus, 2)
    // this.setState({
    //   current: currentKey,
    //   openKeys: parents
    // })
  }

  getMenus() {
    const setDefault = () => {
      const defaultMenus = [
        {
          icon: 'error',
          value: '未取到menus配置',
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
        let { currentKey, currentItem } = getCurrentMenu(res.data, location.pathname)
        this.setState({
          menus: res.data,
          current: currentKey,
          openKeys: getOpenMenuKeys(res.data, currentItem)
        })
      } else {
        setDefault()
      }
    }).catch(e => {
      setDefault()
    })
    return []
  }

  componentWillReceiveProps(nextProps) {
    // let { pathname } = nextProps.location
    // let { currentKey, currentItem } = getCurrentMenu(this.state.menus, pathname)
    // this.setState({
    //   mode: nextProps.collapsed ? 'vertical' : 'inline',
    //   current: currentKey,
    //   openKeys: getOpenMenuKeys(this.state.menus, currentItem)
    // })
  }

  onClickHandler = e => {
    // this.setState({
    //   current: e.key
    // })
  }

  render() {
    const { menus, theme, mode, current, openKeys } = this.state
    const menuData = createMenuItem(menus)
    return menuData.length > 0
      ? <Menu
        theme={theme}
        mode={mode}
        defaultSelectedKeys={['home']}
        selectedKeys={[current]}
        openKeys={openKeys}
        defaultOpenKeys={defaultOpenKeys}
        onClick={this.onClickHandler}
      >{menuData}</Menu>
      : null
  }
}

export default SidebarMenu
