import React, { Component } from 'react'
import storeKit from 'storeKit'
import { Table, Pagination } from 'antd'
import api from 'api'

// 注入redux
@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class DemoTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: [],
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

  fetchData(option) {
    api['getSomeList'](option).then(res => {
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
    let { dataSource, page } = this.state
    let columns = [
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: 'NAME',
        dataIndex: 'name',
        key: 'name'
      }
    ]
    return (
      <div>
        <Table
          dataSource={dataSource}
          columns={columns}
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

export default DemoTable
