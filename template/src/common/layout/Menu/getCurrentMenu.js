import getOpenMenuKeys from './getOpenMenuKeys'

let menuKey
let menuItem

const showTip = menu => {
  console.log(`菜单项[${menu.value}]缺少关键配置(e.g: url, children)，请检查！`)
}

const getCurrent = (menus, pathname) => {
  let len = menus.length
  while (len--) {
    let menu = menus[len]
    if (menu.children && menu.children.length) {
      if (menu.url === pathname) { // 直接访问submenu对应的url时的处理
        if (!menuKey) {
          menuKey = menu.key
          menuItem = menu
          break
        } else {
          break
        }
      } else {
        getCurrent(menu.children, pathname)
      }
    } else if (menu.url) {
      if (pathname.indexOf(menu.url) === 0) {
        if (!menuKey) {
          menuKey = menu.key
          menuItem = menu
          break
        } else {
          break
        }
      }
    } else {
      showTip(menu)
    }
  }
}

export default (menus, pathname) => {
  menuKey = null
  menuItem = null
  getCurrent(menus, pathname)
  let parents = getOpenMenuKeys(menuItem)
  return {
    currentKey: menuKey,
    currentItem: menuItem,
    parents: parents
  }
}
