import getCurrentMenu from './getCurrentMenu'
export default (menus, pathname) => {
  let current = getCurrentMenu(menus, pathname)
  console.log(current)
  return ['demo']
}
