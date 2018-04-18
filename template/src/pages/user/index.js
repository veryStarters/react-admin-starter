import React, { Component } from 'react'
import storeKit from 'storeKit'

@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class User extends Component {
  render() {
    return (
      <div style={{ lineHeight: 3 }}>
        系统名称{this.props.appName}
      </div>
    )
  }
}

export default User
