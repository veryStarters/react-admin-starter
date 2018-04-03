import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon } from 'antd'
import config from 'config'
import classNames from 'classnames'
import Style from './style.pcss'
import configMenus from 'src/menus'
import api from 'api'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

const getMenuItemClass = (str) => {
  const pathName = location.pathname
  if (str !== config.homeRoute) {
    return classNames({
      'ant-menu-item-selected': pathName.indexOf(str) === 0,
      'no-margin': true
    })
  }
  return classNames({
    'ant-menu-item-selected': pathName === str,
    'no-margin': true
  })
}

class MamsMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mode: 'inline',
      menus: []
    }
  }

  componentWillMount() {
    this.getMenus()
  }

  getMenus() {
    api.getMenus().then(res => {
      if (res.code === 0 && res.data) {
        this.setState({
          menus: res.data
        })
      } else {
        this.setState({
          menus: []
        })
      }
    }).catch(e => {
      this.setState({
        menus: []
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      mode: nextProps.collapsed ? 'vertical' : 'inline'
    })
  }

  render() {
    let openedKeys = []
    const loop = (data = []) => data.map((item) => {
      if (item.children) {
        if (item.defaultOpened) {
          openedKeys.push(item.key)
        }
        return (
          <SubMenu
            key={item.key}
            title={<span className={Style.ellip}>
              <Icon type={item.icon}/>
              <span title={item.value}>{item.value}</span>
            </span>}>
            {loop(item.children)}
          </SubMenu>
        )
      }
      return <MenuItem key={item.key} className={getMenuItemClass(item.url)}>
        <Link to={item.url} className={Style.ellip}>
          <Icon type={item.icon}/>
          <span title={item.value}>{item.value}</span>
        </Link>
      </MenuItem>
    })
    const menusData = loop(configMenus.length ? configMenus : this.state.menus)
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
