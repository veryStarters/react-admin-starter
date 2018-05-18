import React, { Component } from 'react'
import { Icon } from 'antd'

class Loading extends Component {
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <Icon type={'reload'} spin={true} style={{ color: '#1890ff', fontSize: '25px', paddingTop: '20px' }} />
      </div>
    )
  }
}

export default Loading
