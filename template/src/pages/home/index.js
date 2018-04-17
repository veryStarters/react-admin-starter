import React, { Component } from 'react'
import storeKit from 'storeKit'

// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class Home extends Component {
  render() {
    return (
      <div>
        Hello, world! {this.props.appName}
      </div>
    )
  }
}
export default Home
