/**
 * 与业务有关联的dom操作
 */

// 更改最后一个面包屑的文本
export default (str) => {
  let breadItems = document.querySelectorAll('.breadcrumb-placeholder>a')
  breadItems = Array.from(breadItems)
  breadItems[breadItems.length - 1].innerText = str
}
