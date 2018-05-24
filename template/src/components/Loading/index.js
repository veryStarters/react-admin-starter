import React, { Component } from 'react'
import { Spin } from 'antd'

class Loading extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Spin />
      </div>
    )
  }
}

export default Loading
