import React, { Component } from 'react'
import { Icon, message } from 'antd'

/**
 * 最好放到外边去，此处仅为示例
 */
class Tip extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handle = () => {
    message.success('tip')
  }
  render() {
    return (
      <div onClick={this.handle}>
        <Icon type='bell' />Alert Tip
      </div>
    )
  }
}

export default Tip
