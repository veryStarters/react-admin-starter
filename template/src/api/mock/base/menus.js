/**
* 可以采用mockjs来自动生成mock数据
* http://mockjs.com/examples.html#DPD
* @author taoqili
*/

import sleep from 'system-sleep'
import Mock from 'mockjs'

const createData = params => {
  return Mock.mock([
    {
      value: '首页',
      icon: 'home',
      url: '/'
    },
    {
      value: '示例',
      icon: 'solution',
      url: '/demo'
    },
    {
      value: '帮助',
      icon: 'solution',
      url: '/help'
    }
  ])
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
