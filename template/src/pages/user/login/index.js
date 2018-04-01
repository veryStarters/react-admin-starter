import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps } from 'common/core/store'

class UserLogin extends Component {
  // 如有需通过redux来维护的数据，请在此处映射即可'
  static getStore = store => {
    return {
      appName: store.global.appName
    }
  }
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

export default connect(UserLogin.getStore, mapDispatchToProps)(UserLogin)
