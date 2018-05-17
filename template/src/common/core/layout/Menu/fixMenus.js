const fixMenus = (menus, parent = null) => {
  if (!menus || !menus.length) {
    return
  }
  menus.forEach(item => {
    if (item.children && item.children.length) {
      fixMenus(item.children, item)
    }
    item.key = 'menu_' + setTimeout(0)
    if (parent) {
      item.parent = parent
    }
  })
}
export default fixMenus
