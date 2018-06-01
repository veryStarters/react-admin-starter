import React, { Component } from 'react'
import storeKit from 'storeKit'
import { Auth } from 'auth'
// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class Demo extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  onReject = () => {
    return <div>xxx</div>
  }
  render() {
    return (
      <div>
        <p>本系统叫 {this.props.appName}，我是从store中获取的哦</p>
        Hello, 当前页面名称叫 demo!
        <Auth authName={'uiModule1'}>
          <div>有权限</div>
        </Auth>
        <Auth authName={'uiModule2'} onReject={this.onReject} preventDefault={true}>
          <div>无权限</div>
        </Auth>
      </div>
    )
  }
}

export default Demo
