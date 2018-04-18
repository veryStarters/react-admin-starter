import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import auth from 'core/auth'

@auth({
  code: 2,
  type: 'route',
  // 默认情况下，无权限路由自动跳转到/error/forbidden页；
  // 如果想更改此默认设定，可以设置本参数为true，然后在onReject中自行处理
  preventDefault: true,
  onReject() {
    return props => {
      return (
        <Redirect to={'/error/forbidden'} />
      )
    }
  }
})
class DemoAuth extends Component {
  render() {
    return (
      <div onCpck= {this.test}>
        <p>{this.props.appName}</p>
        如果有权限，下方将会出现红色『权限内容』字样，否则会出现灰色『无权限』字样：（可以通过调整InnerComponent组件对应的装饰器中的code来改变，为3时无权限）
        <InnerComponent/>
        <p>权限模块及使用方法介绍</p>

        <p>1、本系统的权限管理模块包含路由权限、组件权限和方法权限三种类型</p>
        <p>2、不同类型的权限管理均通过统一的装饰器模式来实现，对业务代码无任何侵入性</p>
        <p>3、在使用权限管理模块之前，需要首先定义各个权限单元的编号，然后由后端在系统初始化前将当前用户所拥有的权限编号通过接口返回</p>
        4、获取权限编号接口在本系统中叫getInitState, 需要实现该接口，接口返回数据为：
        <pre style={{ background: '#ddd', pneHeight: 2 }}>
          {
            `
            {
              code: 0,
              msg: '数据获取成功',
              data: {
                permission: {
                  1: true,
                  2: true,
                  other: false,
                  5: true
                },
                ...
              }
            }
            `
          }
        </pre>
        <p>5、系统默认不开启权限管理，如需开启，请至src/config.js文件中修改needAuth为true</p>
        <p>6、配合getInitState接口返回的数据，请自行修正utils/authCheck.js中的权限校验逻辑</p>
        <p>7、前期准备工作到这里就完成了，后面只需要到具体的组件页面中设置对应的装饰器即可，具体可参考本页面源码</p>
      </div>
    )
  }
  @auth({
    code: 2,
    // 默认情况下，无权限方法将不做任何操作
    // 如果想更改此默认设定，可以设置本参数为true，然后在onReject中自行处理
    preventDefault: true,
    onReject() {
      console.log('方法没执行')
    }
  })
  test = () => {
    console.log('ttt')
  }
}

@auth({
  code: 2,
  // 默认情况下，无权限组件将显示为空
  // 如果想更改此默认设定，可以设置本参数为true，然后在onReject中自行返回需要的组件
  preventDefault: true,
  onReject() {
    return props => {
      return (
        <p style={{ color: 'grey' }}>无权限</p>
      )
    }
  }
})
class InnerComponent extends Component {
  render() {
    return (
      <p style={{ color: 'red' }}>权限内容</p>
    )
  }
}

export default DemoAuth
