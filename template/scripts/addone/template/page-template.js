export default
`import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps } from 'common/core/store'

/**
 * 如有需通过redux来维护维护状态：
 * 1、请在static getStore中获取store内的数据
 * 2、使用this.props.actions[actionName]来调用action
 */
class <%className%> extends Component {
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
        Hello, 当前页面名称叫 <%humpName%>!
      </div>
    )
  }
}

export default connect(<%className%>.getStore, mapDispatchToProps)(<%className%>)
`
