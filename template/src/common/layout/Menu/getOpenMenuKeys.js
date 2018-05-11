let openKeys = []
const findParent = current => {
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
      findParent(current)
    }
  }
}
export default current => {
  openKeys = []
  findParent(current)
  return openKeys
}
