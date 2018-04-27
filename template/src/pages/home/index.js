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
      <div style={{ height: '1000px' }}>
        Hello, world! {this.props.appName}
        <p>
          I <i style={{ color: 'red' }} className='icon heart' /> You!!
        </p>
      </div>
    )
  }
}
export default Home
