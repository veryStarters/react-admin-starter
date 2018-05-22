import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import config from 'config'

class Error404 extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  static goBack() {
    history.go(-1)
  }
  render() {
    return (
      <div style={{ textAlign: 'center', lineHeight: 3, fontSize: '30px' }}>
        o _ o，页面丢失了！
        <p>
          <Link to={config.homeRoute}> 返回首页 </Link>
          <span onClick={Error404.goBack} style={{ color: '#1890ff', cursor: 'pointer' }}> 返回上一页 </span>
        </p>
      </div>
    )
  }
}

export default Error404
