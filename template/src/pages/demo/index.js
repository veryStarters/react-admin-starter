import React, { Component } from 'react'
import storeKit from 'storeKit'

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
  render() {
    return (
      <div>
        <p>本系统叫 {this.props.appName}，我是从store中获取的哦</p>
        Hello, 当前页面名称叫 demo!
      </div>
    )
  }
}

export default Demo
