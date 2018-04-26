let menuKey
const tip = (menu) => {
  setTimeout(() => {
    console.log(`菜单项[${menu.value}]缺少关键配置(e.g: url, children)，请检查！`)
  }, 200)
}
const getCurrent = (menus, pathname) => {
  let len = menus.length
  while (len--) {
    let menu = menus[len]
    if (menu.children && menu.children.length) {
      if (menu.url === pathname) {
        if (!menuKey) {
          menuKey = menu.key
        }
        break
      } else {
        getCurrent(menu.children, pathname)
      }
    } else if (menu.url) {
      if (pathname.indexOf(menu.url) === 0) {
        if (!menuKey) {
          menuKey = menu.key
        }
        break
      }
    } else {
      tip(menu)
    }
  }
  return menuKey
}

export default (menus, pathname) => {
  menuKey = null
  return getCurrent(menus, pathname)
}
