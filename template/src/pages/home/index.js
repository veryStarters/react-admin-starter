import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps } from 'common/core/store'

class Home extends Component {
  static getStore = store => {
    return {
      appName: store.global.appName
    }
  }

  render() {
    return (
      <div>
        Hello, world! {this.props.appName}
      </div>
    )
  }
}

export default connect(Home.getStore, mapDispatchToProps)(Home)
