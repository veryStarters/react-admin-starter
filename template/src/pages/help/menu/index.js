import React, { PureComponent } from 'react'
import storeKit from 'storeKit'

@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class DemoMenutip extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div style={{ fontSize: '14px' }}>
        <p>侧边菜单栏的配置有两种方式：</p>
        <p>1、如果无需按照权限来动态生成，则仅需在config/layout/sidebarMenus中配置即可</p>
        <p>2、如果需要按照权限来动态生成，则需要提供一个getSidebarMenus接口来返回menus, 或者通过store获取</p>
        <p>3、getMenus的返回格式：</p>
        <pre style={{ background: '#ddd' }}>
          {
            `
            {
              code: 0,
              msg: '菜单获取成功',
              data: [
                {
                  value: '首页',
                  icon: 'home',
                  url: '/'
                },
                {
                  value: '用户管理',
                  icon: 'solution',
                  url: '/user'
                }
              ]
            }
            `
          }
        </pre>
      </div>
    )
  }
}

export default DemoMenutip
