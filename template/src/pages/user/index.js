import React, { Component } from 'react'
import { Table } from 'antd'
import storeKit from 'storeKit'
import api from 'api'

@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class User extends Component {
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
        name: '吕不韦',
        title: 'lvbuwei',
        age: 18
      },
      {
        key: 2,
        name: '张益达',
        title: 'zhangyida',
        age: 18
      }
    ]
    return (
      <div>
        <Table columns={columns} dataSource={list} />
      </div>
    )
  }
}

export default User
