import React, { Component } from 'react'
import injectRedux from 'injectRedux'

// 注入redux
@injectRedux(store => {
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
