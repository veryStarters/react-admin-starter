import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps } from 'core/store'

class Error404 extends Component {
  // 如有需通过redux来维护的数据，请在此处映射即可'
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
      <div style={{ textAlign: 'center', lineHeight: 3, fontSize: '30px' }}>
        404
      </div>
    )
  }
}

export default connect(Error404.getStore, mapDispatchToProps)(Error404)
