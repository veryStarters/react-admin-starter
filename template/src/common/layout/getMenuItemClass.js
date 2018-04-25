import config from 'config'
import classNames from 'classnames'

export default url => {
  const pathName = location.pathname
  if (url !== config.homeRoute) {
    return classNames({
      'ant-menu-item-selected': pathName.indexOf(url) === 0,
      'no-margin': true
    })
  }
  return classNames({
    'ant-menu-item-selected': pathName === url,
    'no-margin': true
  })
}
