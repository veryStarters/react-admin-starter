
let menuKey
let menuItem
let openKeys = []
let defaultOpenMenus = []

const showTip = menu => {
  console.log(`菜单项[${menu.value}]缺少关键配置(e.g: url, children)，请检查！`)
}

const getOpenKeys = current => {
  if (!current) {
    return
  }
  if (current.parent) {
    let key = current.parent.key
    if (openKeys.indexOf(key) === -1) {
      openKeys.push(key)
    }
    current = current.parent
    if (current) {
      getOpenKeys(current)
    }
  }
}

const getCurrent = (menus, keyOrPathname) => {
  let len = menus.length
  while (len--) {
    let menu = menus[len]
    if (!menu) {
      showTip(menu)
      continue
    }
    if (menu.children && menu.children.length) {
      if (menu.defaultOpened) {
        defaultOpenMenus.push(menu.key)
      }
      if (menu.url === keyOrPathname || menu.key === keyOrPathname) { // 直接访问submenu对应的url时的处理
        if (!menuKey) {
          menuKey = menu.key
          menuItem = menu
          break
        } else {
          break
        }
      } else {
        getCurrent(menu.children, keyOrPathname)
      }
    } else {
      if (keyOrPathname.indexOf(menu.url) === 0 || menu.key === keyOrPathname) {
        if (!menuKey) {
          menuKey = menu.key
          menuItem = menu
          break
        } else {
          break
        }
      }
    }
  }
}



export default (menus, pathname) => {
  menuKey = null
  menuItem = null
  getCurrent(menus, pathname)
  getOpenKeys(menuItem)
  return {
    currentKey: menuKey,
    currentItem: menuItem,
    openKeys: openKeys,
    defaultOpenKeys: defaultOpenMenus.concat(openKeys)
  }
}
