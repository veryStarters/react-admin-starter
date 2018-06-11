import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Anchor } from 'antd'
import auth from 'auth'
import injectRedux from 'injectRedux'
import config from 'config'
import style from './index.pcss'

const Link = Anchor.Link

@injectRedux(store => {
  return {
    appName: store.global.appName
  }
})
@auth({
  // UI模块ID
  authName: 'uiModule2',
  // 如果是页面级的路由组件，则需要明确指出该组件为Route组件
  isRoute: true,
  // 关联的API, 优先级低于UI模块ID
  associatedApi: '/api/xxx/xxx',
  // 可省略
  // 默认情况下，无权限路由自动跳转到/common/forbidden页；
  // 如果想更改此默认设定，可以设置本参数为true，然后在onReject中自行处理
  preventDefault: true,
  // 可省略
  onReject() {
    return props => {
      return (
        <Redirect to={{ pathname: config.homeRoute + 'common/forbidden' }}/>
      )
    }
  }
})
class DemoAuth extends Component {
  render() {
    return (
      <div className={style.wrapper}>
        <div className={style.section}>
          <p>对于后台管理系统来说，权限控制是一个绕不开的话题。同时由于需要跟后端进行深度对接，在代码组织和实现上往往不是那么直观和方便。</p>
          <p>RAS系统通过总结前期多个系统的权限设计实践，开发出了一套适合在各种场景下使用的权限管理机制，从而极大降低了用户的开发成本。</p>
          <p className={style.title}>内容导航</p>
          <Anchor>
            <Link href="#designIdea" title="设计思路及要求" />
            <Link href="#dataStructure" title="权限数据结构" />
            <Link href="#getStart" title="基本使用方式" />
            <Link href="#demo" title="实际代码示例" />
            <Link href="#another" title="方法形式的调用" />
            <Link href="#custom" title="自定义权限校验逻辑" />
          </Anchor>
        </div>
        <div className={style.section}>
          <p className={style.title} id={'designIdea'}>设计思路及要求：</p>
          <p>1、与具体业务代码解耦，对业务代码无侵入或者侵入性极弱</p>
          <p>2、能支持路由级别、API级别、组件级别和方法级别的多种权限控制方式</p>
          <p>3、能自定义被禁止访问时的后续处理逻辑</p>
          <p>4、能自定义权限校验逻辑</p>
        </div>
        <div className={style.section}>
          <p className={style.title} id={'dataStructure'}>权限数据结构：</p>
          <pre style={{ background: '#ddd', pneHeight: 2 }}>
            {
              `
              permission: {
                uiModule1: true,
                uiModule2: true,
                apiUrl1: true,
                apiUrl2: true,
                routeUrl1: true,
                routeUrl2: true,
                funName1: true,
                funName2: true
              }
              `
            }
          </pre>
          <p>PS: 关于如何生成该权限列表的问题，由于涉及面稍微有点广，此处暂时不再展开，后面会有专门详细论述，目前仅需把它当成一个已知的数据即可。</p>
        </div>
        <div className={style.section}>
          <p className={style.title} id={'getStart'}>基本使用方式</p>
          <p>为了尽最大可能地解耦权限控制代码与业务逻辑代码，本系统采用装饰器模式来实现权限控制机制。即通过在组件、方法等权限单元外部包装权限代码来决定该组件或者方法是否应该被渲染或者调用。</p>
          <p>通用的组件权限代码调用如下：</p>
          <pre style={{ background: '#ddd', pneHeight: 2 }}>
            {
              `
              @auth(authOption)
              class Something extends React.Component {
                render() {
                  return (
                    <div>我是有权限的人哦！</div>
                  )
                }
              }
              `
            }
          </pre>
          <p>可以看到，通过附加装饰器@auth，在不改动任何Something代码的情况下，我们即可实现Something组件的权限控制。下面我们再举例说明各种具体的情况。</p>
        </div>
        <div className={style.section}>
          <p className={style.title}>例子一：路由级别权限</p>
          <p>在前端路由大行其道的今天，路由级别的权限自然由之前的后端控制让渡到了前端控制。</p>
          <p>在vue以及之前版本的react中，路由权限的控制往往被实现在路由判断过程中（beforeEnter、onEnter等生命周期中）。</p>
          <p>这样的做法虽然可行，但是会让路由判断过程的复杂度呈现指数级上升（在路由过程中可能需要异步获取权限数据来决定最终的路由）。</p>
          <p>换个思路，路由的最终结果就是呈现一个组件，我们完全可以避开路由过程中的判断，转而在路由之后、渲染组件之前进行判断，也一样能达到相同的目的。</p>
          <p>基于这个思路，路由权限实质上就演变成了对应路由的那个组件的权限。</p>
        </div>
        <div className={style.section}>
          <p className={style.title}>例子二：API调用权限（不是API执行权限，那是后端同学需要做的）</p>
          <p>一般来讲，对API的调用有且仅有如下几种模式：1、程序初始化过程中主动调用；2、某个按钮或者其它界面元素上绑定的事件调用；</p>
          <p>对于前者，我们完全可以在代码中直接判断当前用户是否有调用该API的权限进行判断，如 if (permission['http://xxx.xxx.com/api/xxx']) {} ; </p>
          <p>对于后者，我们则可以将该API和这个界面组件进行关联对应，从而将API的权限变换成组件的权限</p>
        </div>
        <div className={style.section}>
          <p className={style.title}>例子三：组件权限</p>
          <p>由例子一和例子二的分析可以知道，无论是路由权限还是API调用权限，最终都可以归纳为组件权限。因此，此处我们仅提供一个组件权限的详细代码示例：</p>
          <pre style={{ background: '#ddd', pneHeight: 2 }}>
            {
              `
              @auth({
                authName: 'topHeaderRegister',      // 如果是路由组件或者纯UI组件，则直接给出一个名字
                isRoute: true,                        // 如果是路由组件，该参数不可省略（暂时没想到更好方法。。。）
                preventDefault: true,                 // 可省略。默认情况下，无权限路由组件跳转到指定禁止访问页，无权限普通组件隐藏显示；需要更改该默认设定时，此处设置成true
                onReject() {                          // 可省略。preventDefault为true时生效，在目标路由或者组件无权限时，可以自定义返回一个组件，完成重定向或者更换显示组件
                  return props => {
                    return (
                      <Redirect to={{ pathname: config.homeRoute + 'common/forbidden' }}/>
                    )
                  }
                },
                onAccept() {                                // 可省略。
                  console.log('有权限时的回调')
                }
              })
              class Something extends React.Component {
                render() {
                  return (
                    <div>我是有权限的人哦！</div>
                  )
                }
              }
              `
            }
          </pre>
        </div>
        <div className={style.section}>
          <p className={style.title}>例子三： 方法权限</p>
          <p>方法权限的使用同组件权限，只需要在指定方法上方加上权限装饰器即可</p>
          <pre style={{ background: '#ddd', pneHeight: 2 }}>
            {
              `
              class Something extends React.Component {
                @auth({
                  authName: 'doSomething',         // 自定义方法Id
                  preventDefault: true,         // 可省略。默认情况下，无权限方法将不执行任何操作；需要更改该默认设定时，此处设置成true
                  onReject() {                  // 可省略。preventDefault为true时生效，在目标方法无权限执行时，可以自定义执行某些操作
                    console.log('目前方法居然被禁止执行，只好我来代替了。。。')
                  }
                })
                domSomething() {
                  console.log('something')
                }
                render() {
                  return (
                    <div>我是有权限的人哦！</div>
                  )
                }
              }
              `
            }
          </pre>
        </div>
        <div className={style.section}>
          <p className={style.title} id={'demo'}>实际代码示例</p>
          <p>下方放置了两个组件(会分别显示『我应该会出现在界面上』和『我可能不会出现在界面上』)。实际显示结果跟预期相符。</p>
          <div onClick={this.test} style={{ cursor: 'pointer' }}>
            <Permission />(点击绿字可以体验方法权限)
            <Refuse />
          </div>
          <pre style={{ background: '#ddd', pneHeight: 2 }}>
            {
              `
              @auth({
                authName: 'uiModule2'
              })
              class Permission extends Component {
                render() {
                  return (
                    <p style={{ color: 'green' }}>我应该会出现在界面上</p>
                  )
                }
              }

              @auth({
                authName: 'uiModule3'
              })
              class Refuse extends Component {
                render() {
                  return (
                    <p style={{ color: 'red' }}>我可能不会出现在界面上</p>
                  )
                }
              }
              `
            }
          </pre>
        </div>

        <div className={style.section}>
          <p className={style.title} id={'another'}>方法形式的调用</p>
          <p>从上面的例子可以看到，必须为一个权限组件定义一个内部类（定义成方法形式的组件无效）才能使用装饰器，这对于一些很简单的按钮之类的元素，显得有点杀鸡用牛刀。有没有简单一点的使用方式呢？</p>
          <p>试试下面这两种方法吧！</p>
          <pre style={{ background: '#ddd', pneHeight: 2 }}>
            {
              `
              import React from 'react'
              import auth, { Auth } from 'auth'

              // 方法形式
              auth({
                authName: 'uiModule1',
                component: props => {
                  return (
                    <div style={{ lineHeight: 2, cursor: 'pointer', color: 'red' }}>不使用装饰器而使用方法形式的调用</div>
                  )
                }
              })

              // 包裹组件形式
              class Test extends from React.Component {
                render() {
                  return (
                    <div>
                      <Auth authName={'uiModule1'}>
                        <div>有权限</div>
                      </Auth>
                      <Auth authName={'uiModule3'} onReject={this.reject} preventDefault={true}>
                        <div>无权限</div>
                      </Auth>
                    </div>
                  )
                }
              }
              `
            }
          </pre>
          {
            [{
              authName: 'uiModule1',
              component: props => {
                return <div style={{ color: 'green' }}>有权限，显示出来了，下面还有一个是没有权限的，显示不出来</div>
              }
            }, {
              authName: 'uiModule3',
              component: props => {
                return <div style={{ color: 'red' }}>我是没权限的，估计没什么机会展示了。。。</div>
              }
            }].map(item => {
              return auth(item)
            })
          }
        </div>
        <div className={style.section}>
          <p className={style.title} id={'custom'}>自定义权限校验逻辑</p>
          <p>基于上述『权限数据结构』中的描述，RAS的权限校验逻辑特别简单,仅需判断permission是否存在对应的id即可。如果默认的权限数据结构不满足具体业务的需要，那也可以调整该数据结构，同时更新appKit/authCheck.js中的权限判断逻辑即可。</p>
          <p>默认的权限校验逻辑代码如下：</p>
          <pre style={{ background: '#ddd', pneHeight: 2 }}>
            {
              `
              import store from 'store'
              export default authName => {
                let state = store.getState()
                let permission = state.global.initState.permission
                return permission && !!permission[authName]
              }
              `
            }
          </pre>
        </div>
      </div>
    )
  }

  @auth({
    authName: 'funId1',
    // 可省略
    // 默认情况下，无权限方法将不做任何操作
    // 如果想更改此默认设定，可以设置本参数为true，然后在onReject中自行处理
    preventDefault: true,
    // 可省略
    onReject() {
      console.log('方法没执行')
    }
  })
  test = () => {
    alert('我被点击了！！如果希望弹出alert框的方法被禁止，修改源码中auth即可')
  }
}

@auth({
  authName: 'uiModule2'
})
class Permission extends Component {
  render() {
    return (
      <p style={{ color: 'green' }}>我应该会出现在界面上</p>
    )
  }
}

@auth({
  authName: 'uiModule3'
})
class Refuse extends Component {
  render() {
    return (
      <p style={{ color: 'red' }}>我可能不会出现在界面上</p>
    )
  }
}

export default DemoAuth
