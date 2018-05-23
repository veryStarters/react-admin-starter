import React from 'react'
import { Icon } from 'antd'

const style = {
  wrapper: {
    textAlign: 'center',
    lineHeight: 5,
    color: 'red'
  }
}

class Forbidden extends React.Component {
  render() {
    return (
      <div style={style.wrapper}>
        <Icon type="cross-circle" />无权限访问
      </div>
    )
  }
}

export default Forbidden
