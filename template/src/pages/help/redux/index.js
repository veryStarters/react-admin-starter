import React, { Component } from 'react'
import { Button } from 'antd'
import storeKit from 'storeKit'

// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName,
    testKey: store.helpRedux.testKey
  }
})
class DemoRedux extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  changeAppName = () => {
    this.props.actions.changeAppName('xxx管理系统')
  }
  changeTestKey = () => {
    this.props.actions.demoRedux.changeTestKey('testValue1')
  }
  render() {
    return (
      <div>
        <p>AppName: {this.props.appName}</p>
        <p>TestKey: {this.props.testKey}</p>
        <p>
          <Button onClick={this.changeAppName}>更改AppName</Button>
        </p>
        <p>
          <Button onClick={this.changeTestKey}>更改TestKey</Button>
        </p>
      </div>
    )
  }
}

export default DemoRedux
