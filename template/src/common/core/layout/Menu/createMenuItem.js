import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'react-router-dom'

const SubMenu = Menu.SubMenu
const MenuItem = Menu.Item

const createMenus = (data = []) => data.map((item) => {
  if (item.children) {
    return (
      <SubMenu key={item.key} title={
        <span>
          <Icon type={item.icon}/>
          <span title={item.value}>{item.value}</span>
        </span>
      }>
        {createMenus(item.children)}
      </SubMenu>
    )
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

export default createMenus
