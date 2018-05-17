/**
* 可以采用mockjs来自动生成mock数据
* http://mockjs.com/examples.html#DPD
* @author taoqili
*/

import sleep from 'system-sleep'
import Mock from 'mockjs'

const createData = params => {
  if (params.pageNo === 1) {
    return Mock.mock({
      data: [
        {
          key: 1,
          id: 1,
          name: 1
        },
        {
          key: 2,
          id: 2,
          name: 2
        },
        {
          key: 3,
          id: 3,
          name: 3
        },
        {
          key: 4,
          id: 4,
          name: 4
        },
        {
          key: 5,
          id: 5,
          name: 5
        },
        {
          key: 6,
          id: 6,
          name: 6
        },
        {
          key: 7,
          id: 7,
          name: 7
        },
        {
          key: 8,
          id: 8,
          name: 8
        }
      ],
      page: {
        pageNo: 1,
        pageSize: 8,
        totalPage: 2,
        totalSize: 9
      }
    })
  } else if (params.pageNo === 2) {
    return Mock.mock({
      data: [
        {
          key: 9,
          id: 9,
          name: 9
        }
      ],
      page: {
        pageNo: 2,
        pageSize: 8,
        totalPage: 2,
        totalSize: 9
      }
    })
  }
}

export default (req, res, next) => {
  // 模拟网络环境，延迟100ms返回
  sleep(100)
  return {
    ret: 'success',
    code: 0,
    msg: '接口提示信息',
    data: createData(req.body)
  }
}
