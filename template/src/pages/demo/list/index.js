import React, { Component } from 'react'
import { Table, Pagination } from 'antd'
import injectRedux from 'injectRedux'
import api from 'api'

@injectRedux(store => {
  return {
    appName: store.global.appName
  }
})
class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
      loading: true,
      page: {
        pageNo: 1,
        totalSize: 9,
        pageSize: 8
      }
    }
  }

  componentDidMount() {
    this.fetchData({ pageNo: 1, pageSize: 8 })
  }

  componentWillUnmount() {
    this.isUnmount = true
  }

  fetchData(option) {
    api.getUserList(option).then(res => {
      if (this.isUnmount) {
        return
      }
      this.setState({
        loading: false
      })
      if (res.code === 0 && res.data) {
        this.setState({
          dataSource: res.data.data || []
        })
      }
    })
  }

  onPageChange = (pageNo) => {
    let { page } = this.state
    let newPage = {
      ...page,
      pageNo
    }
    this.fetchData({
      ...newPage
    })
    this.setState({
      page: newPage
    })
  }

  render() {
    let { dataSource, page, loading } = this.state
    let columns = [
      {
        title: '用户ID',
        dataIndex: 'id',
        key: 'id'
      },
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
    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
          loading={loading}
          pagination={false}
        />
        <Pagination
          total={page.totalSize}
          current={page.pageNo}
          pageSize={page.pageSize}
          showTotal={total => `共${total}条数据`}
          showQuickJumper
          onChange={this.onPageChange}
          style={{ marginTop: '15px', float: 'right' }}
        />
      </div>
    )
  }
}

export default User
