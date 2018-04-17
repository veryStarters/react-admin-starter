import React, { Component } from 'react'
import storeKit from 'storeKit'

@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class UserLogin extends Component {
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
        Hello, 当前页面名称叫 userLogin!
      </div>
    )
  }
}

export default UserLogin
