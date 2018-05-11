import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

let defaultOpenedMenus = []
const createMenus = (data = [], parent = null) => data.map((item) => {
  if (item.children) {
    if (item.defaultOpened) {
      defaultOpenedMenus.push(item.key)
    }
    return (
      <SubMenu key={item.key} title={
        <span>
          <Icon type={item.icon}/>
          <span title={item.value}>{item.value}</span>
        </span>
      }>
        {createMenus(item.children, item)}
      </SubMenu>
    )
  }
  if (parent) {
    item.parent = parent
  }
  return (
    <MenuItem key={item.key} className={'no-margin'}>
      <Link to={item.url}>
        <Icon type={item.icon}/>
        <span title={item.value}>{item.value}</span>
      </Link>
    </MenuItem>
  )
})

export const defaultOpenKeys = defaultOpenedMenus

export default createMenus
