import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps } from 'common/core/store'
import { Link } from 'react-router-dom'

class User extends Component {
  static getStore = store => {
    return {
      appName: store.global.appName
    }
  }

  render() {
    return (
      <div style={{ lineHeight: 3 }}>
        用户列表{this.props.appName}
        <p>
          <Link to={'/user/detail'}>查看用户详情</Link>
        </p>
      </div>
    )
  }
}

export default connect(User.getStore, mapDispatchToProps)(User)
