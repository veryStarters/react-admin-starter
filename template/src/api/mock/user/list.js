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
          name: '张三',
          age: 22
        },
        {
          key: 2,
          id: 2,
          name: '李四',
          age: 20
        },
        {
          key: 3,
          id: 3,
          name: '王五',
          age: 10
        },
        {
          key: 4,
          id: 4,
          name: '赵六',
          age: 18
        },
        {
          key: 5,
          id: 5,
          name: '丁袁',
          age: 44
        },
        {
          key: 6,
          id: 6,
          name: '王刚',
          age: 62
        },
        {
          key: 7,
          id: 7,
          name: '正阳',
          age: 42
        },
        {
          key: 8,
          id: 8,
          name: '郭靖',
          age: 21
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
          name: '黄蓉',
          age: 22
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
