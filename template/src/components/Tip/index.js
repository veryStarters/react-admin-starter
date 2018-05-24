import React, { Component } from 'react'
import { Icon, message } from 'antd'

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
