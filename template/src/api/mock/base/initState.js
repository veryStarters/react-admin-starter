/**
* 可以采用mockjs来自动生成mock数据
* http://mockjs.com/examples.html#DPD
* @author taoqili
*/
import Mock from 'mockjs'

const data = Mock.mock({
  permission: {
    uiModule1: true,
    uiModule2: true,
    funId1: true
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
