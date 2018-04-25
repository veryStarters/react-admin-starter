export default (menus, pathname) => {
  let len = menus.length
  let menuKey
  while (len--) {
    let menu = menus[len]
    if (pathname.indexOf(menu.url) === 0) {
      menuKey = menu.key
      break
    }
  }
  return menuKey
}
