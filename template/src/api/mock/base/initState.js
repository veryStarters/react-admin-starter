/**
* 可以采用mockjs来自动生成mock数据
* http://mockjs.com/examples.html#DPD
* @author taoqili
*/
import Mock from 'mockjs'

const data = Mock.mock({
  permission: {
    1: true,
    2: true,
    3: false
  }
})

export default (req, res, next) => {
  return {
    ret: 'success',
    code: 0,
    msg: '接口提示信息',
    data: data
  }
}
