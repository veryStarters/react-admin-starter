/**
* 可以采用mockjs来自动生成mock数据
* http://mockjs.com/examples.html#DPD
* @author taoqili
*/

import sleep from 'system-sleep'
import Mock from 'mockjs'

const data = Mock.mock([
  {
    value: '首页',
    icon: 'home',
    url: '/'
  },
  {
    value: '用户管理',
    icon: 'solution',
    url: '/user'
  },
  {
    value: '系统用法示例',
    icon: 'solution',
    url: '/demo'
  }
])

export default (req, res, next) => {
  // 模拟网络环境，延迟100ms返回
  sleep(100)
  return {
    ret: 'success',
    code: 0,
    msg: '接口提示信息',
    data: data
  }
}
