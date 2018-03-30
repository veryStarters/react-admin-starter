import React, { Component } from 'react'
import { connect } from 'react-redux'
import { mapDispatchToProps } from 'common/core/store'
import { Button, Table } from 'antd'
import api from 'api'

class UserDetail extends Component {
  // 从store中取出数据
  static getStore = store => {
    return {
      appName: store.global.appName,
      test: store.userDetail.testKey
    }
  }

  constructor(props) {
    super(props)
    this.state = {}
  }

  changeAppName = () => {
    this.props.actions.changeAppName('xxx管理系统')
  }

  componentDidMount() {
    api.getUserInfo().then(res => {
      console.log(res)
    })
  }

  render() {
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age'
      }
    ]
    const list = [
      {
        key: 1,
        title: '达到的',
        name: 'taoqili',
        age: 18
      }
    ]
    return (
      <div>
        Hello,userDetail!{this.props.appName} {this.props.test}
        <Table columns={columns} dataSource={list} />
        <p>
          <Button onClick={this.changeAppName}>更改AppName</Button>
        </p>
      </div>
    )
  }
}

export default connect(UserDetail.getStore, mapDispatchToProps)(UserDetail)
