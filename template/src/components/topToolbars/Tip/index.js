import React from 'react'
import { Icon } from 'antd'

/**
 * 最好放到外边去，此处仅为示例
 */
class Tip extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  handle = () => {
    alert('tip')
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
