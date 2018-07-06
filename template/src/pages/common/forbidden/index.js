import React from 'react'
import { Icon } from 'antd'
import style from './style.pcss'
class Forbidden extends React.Component {
  render() {
    return (
      <div style={style.wrapper}>
        <Icon type="cross-circle" />无权限访问^^_
      </div>
    )
  }
}

export default Forbidden
