import React, { PureComponent } from 'react'
import storeKit from 'storeKit'

@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class HomeMenutip extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <p>侧边菜单栏的配置有两种方式：</p>
        <p>1、如果无需按照权限来动态生成，则仅需在config.js中配置menus参数即可</p>
        <p>2、如果需要按照权限来动态生成，则需要提供一个getMenus接口来返回menus</p>
        <p>3、menus的格式：</p>
        <pre style={{ background: '#ddd' }}>
          {
            `
            [
              {
                key: 'index',
                value: '首页',
                icon: 'home',
                url: '/'
              },
              {
                key: 'user',
                value: '用户管理',
                icon: 'solution',
                url: '/user'
              }
            ]
            `
          }
        </pre>
        <p>4、getMenus接口的返回格式</p>
        <pre style={{ background: '#ddd' }}>
          {
            `
            {
              code: 0,
              msg: '菜单获取成功',
              data: [{}, {}]
            }
            `
          }
        </pre>
      </div>
    )
  }
}

export default HomeMenutip