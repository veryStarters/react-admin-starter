import React, { Component } from 'react'
import storeKit from 'storeKit'
import { Link } from 'react-router-dom'

@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class User extends Component {
  render() {
    return (
      <div style={{ lineHeight: 3 }}>
        用户列表{this.props.appName}
        <p>
          <Link to={'/user/detail'}>查看用户详情</Link>
        </p>
      </div>
    )
  }
}

export default User
