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
    let { changeAppName } = this.props.actions
    changeAppName('管理系统')
  }
  changeTestKey = () => {
    let { changeTestKey } = this.props.actions.helpRedux
    changeTestKey('另外的值')
  }
  render() {
    return (
      <div style={{ fontSize: '14px' }}>
        <p>AppName: {this.props.appName}</p>
        <p>TestKey: {this.props.testKey}</p>
        <p style={{ marginTop: '10px' }}>
          <Button onClick={this.changeAppName}>更改AppName</Button>
          <Button onClick={this.changeTestKey}>更改TestKey</Button>
        </p>
      </div>
    )
  }
}

export default DemoRedux
