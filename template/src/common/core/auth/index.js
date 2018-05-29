import React from 'react'
import authCheck from './check'
import { Redirect } from 'react-router-dom'
import config from 'config'
const emptyFn = () => {}
const emptyInitializer = () => emptyFn
export default (
  {
    uiModuleId,
    associatedApi,
    funId,
    isRoute = false,
    onReject = emptyFn,
    onAccept = emptyFn,
    preventDefault = false,
    component = null,
    props = null
  }
) => {
  const authResult = !!authCheck(uiModuleId || associatedApi || funId)
  if (component) {
    const Com = component
    return (
      authResult ? <Com key={ '__' + setTimeout(0)} {...props} /> : null
    )
  }
  return (target, name, descriptor) => {
    // 方法装饰器
    if (descriptor &&
      (typeof descriptor.value === 'function' || typeof descriptor.initializer() === 'function')) {
      if (authResult) {
        onAccept({
          code: 0,
          msg: '允许执行本方法！'
        })
        return descriptor
      }
      if (preventDefault) {
        descriptor.value = onReject
        descriptor.initializer && (descriptor.initializer = () => onReject)
        return descriptor
      }
      onReject({
        code: -1,
        msg: '您当前暂无权限执行本方法！'
      })
      descriptor.value = emptyFn
      descriptor.initializer && (descriptor.initializer = emptyInitializer)
      return descriptor
    }

    // 路由装饰器
    if (isRoute) {
      if (authResult) {
        onAccept({
          code: 0,
          msg: '允许路由跳转'
        })
        return target
      }
      if (preventDefault) {
        return onReject({
          code: -1,
          msg: '拒绝本次路由请求'
        })
      }
      onReject({
        code: -1,
        msg: '拒绝本次路由请求'
      })
      return props => <Redirect to={{ pathname: `${config.homeRoute}common/forbidden` }} />
    }
    // 组件装饰器
    if (authResult) {
      onAccept({
        code: 0,
        msg: '本组件有显示权限'
      })
      return target
    }
    if (preventDefault) {
      return onReject({
        code: -1,
        msg: '不允许访问本组件'
      })
    }
    onReject({
      code: -1,
      msg: '不允许访问本组件'
    })
    return props => {
      return null
    }
  }
}
