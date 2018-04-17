import React, { Component } from 'react'
import { Button, Table } from 'antd'
import api from 'api'
import storeKit from 'storeKit'

@storeKit(store => {
  return {
    appName: store.global.appName,
    test: store.userDetail.testKey
  }
})

class UserDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  changeAppName = () => {
    this.props.actions.changeAppName('xxx管理系统')
    this.props.actions.userDetail.changeTestValue('testValue1')
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
        Hello,userDetail!!{this.props.appName} {this.props.test}
        <Table columns={columns} dataSource={list} />
        <p>
          <Button onClick={this.changeAppName}>更改AppName</Button>
        </p>
      </div>
    )
  }
}

export default UserDetail
