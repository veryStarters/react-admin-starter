import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item
const style = {
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis'
}

let openedMenus = []
const createMenus = (data = []) => data.map((item) => {
  if (item.children) {
    if (item.defaultOpened) {
      openedKeys.push(item.key)
    }
    return (
      <SubMenu key={item.key} title={
        <span className={style.ellip}>
          <Icon type={item.icon}/>
          <span title={item.value}>{item.value}</span>
        </span>
      }>
        {createMenus(item.children)}
      </SubMenu>
    )
  }
  return (
    <MenuItem key={item.key}>
      <Link to={item.url} className={style.ellip}>
        <Icon type={item.icon}/>
        <span title={item.value}>{item.value}</span>
      </Link>
    </MenuItem>
  )
})

export const openedKeys = openedMenus

export default createMenus
