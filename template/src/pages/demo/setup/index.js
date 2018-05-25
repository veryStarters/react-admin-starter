import React, { Component } from 'react'
import storeKit from 'storeKit'

// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class DemoSetup extends Component {
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
        ddd
      </div>
    )
  }
}

export default DemoSetup
