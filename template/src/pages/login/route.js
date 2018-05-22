/**
* 本文件主要用于设置当前页面的相关信息，包括路由以及面包屑等
* 可配置所有react-router支持的参数，常用于需要增加路由参数等需求的场景，如：
* { path: '/user/:id?' }
* title：面包屑名称；parent：上级路由名称(规则为所有目录的驼峰组合，如pages/user/detail => userDetail)
*/
export default {
  title: 'userLogin',
  // 当前页面脱离整个layout，单独一页
  singlePage: true
}
