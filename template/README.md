
## React-Admin-Starter


React-Admin-Starter(以下简称RAS)是基于create-react-app基础上封装的一套高度自动化的前端脚手架。
它通过梳理日常开发中碰到的各种开发、测试和部署等相关问题，在尊重原框架的基础上，在以用例先行为指导原则的条件下，
站在开发者的角度来看待整个开发流程，进而探索出的一套适用于后台管理系统的最佳实践。

### 主要功能

1、基于create-react-app（react, babel, eslint, stylelint, postcss, jest）

2、常用功能整合（react-router, react-redux, code splitting, axios, antd以及一鸣之前封装admin-layout）

3、极简的代码组织结构（隔离并规范框架代码与业务代码，业务代码以模块拆分代替常用的类别拆分）

4、高度自动化（以page级组件作为开发入口，监测并自动生成各种类型的文件框架和中间配置，摒弃重复、低效的模板化编码）

### 开始
0. 安装vue-cli, 初始化一个项目
````
vue init veryStarters/react-admin-starter my-project
````
1. 进入my-project, 安装依赖（yarn install）
2. 启动开发环境（yarn start），该命令会启动2个本地服务：一个是本地开发服务，另一个是本地数据模拟服务,默认端口为10086
3. 找到pages目录，新建一个目录test, 然后在该目录下创建一个index.js文件
4. 不用做任何事情稍等片刻，在浏览器中输入http://localhost:8080/test，见证奇迹的时刻！

### 基础

通过上面的演示，我们可以看到，只是创建了一个index.js文件，但是整个系统已经可以跑起来并显示一些界面信息，这得归功于整个脚手架
的全自动模板和配置功能

####1、自动路由

在常见的React脚手架中，配置前端路由是个必须要进行的重复性工作。但事实上，我们完全可以借鉴后端的路由分发（dispatch）概念，依据文件路径等
外部约定来达到自动配置路由的目的。

在RAS中，目录pages作为所有业务的入口，在里面创建的任何index.js文件都将以该文件的目录层级作为前端路由的默认配置。

如页面组件pages/user/detail/index.js对应的前端路由为/user/detail。该默认配置将有系统自动完成，开发层面仅需创建index.js即可。

特殊情况下，如果需要配置当前路由的细节特性，可以直接在同步自动生成的route.js文件中设置即可。面包屑配置以及路由参数配置是该文件使用最多的两个场景。

####2、自动页面组件骨架

在pages中创建的所有index.js文件，都将自动创建代码骨架，业务开发仅需填充对应功能模块即可。

####3、简化并自动整合redux

react-redux巨量的模板代码时时刻刻在考验着开发者的耐性，为了简化开发流程，RAS脚手架通过在index.js中自动插入对应模板函数以及自动生成redux相关
概念模块的方式，来解决redux使用不便的问题。

具体来说，在上述已经创建的index.js的目录下，创建一个store.js文件，系统将自动创建该文件的代码骨架。

在该文件中相应的states, reducers和actions中填充对应代码后，即可在index.js文件中直接使用。

####4、自动Mock
在src/api/index.js中按照对应格式定义api之后，系统会自动在src/api/mock目录下创建对应的mock文件，填充mock文件中的data字段即可返回mock数据。

本地mock的proxy配置在src/config中地proxyTable字段。默认情况下，本地mock服务运行在http://localhost:10086

####5、接口环境切换与配置
除了利用webpack-dev-server的proxyTable实现多环境接口切换功能之外，还可以通过配置方便地实现一个前端工程同时对接多个后端工程

####6、权限管理
作为后台管理系统来说，权限问题至关重要。RAS将系统权限分成如下集中类型，分别是接口、菜单、路由、组件以及方法。

接口权限直接由后端项目控制。

菜单权限则通过获取菜单接口getMenus由后端返回，理论上也是由后端负责控制，前端来完成路由（包含嵌套）的渲染生成。

除了上述两种类型之外，后面的三种权限在RAS系统中统一通过装饰器@auth来实现，从而避免对业务代码的逻辑侵入。

A、路由权限：基于RAS系统的设定，pages下的每个index.js文件对应着一个页面，因此针对路由进行权限控制的装饰器实质上就是针对该页面组件的装饰器

````
@auth({
  code: 2,  // 权限标识
  type: 'route',   // 装饰器类型，默认值，可省略
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
class SomePage extends Component {
}
````

B、组件权限：组件权限跟路由权限基本一致，其type为component。

C、方法权限：方法权限无需指名type类型，系统自动判断。具体的例子可以参考/demo/auth/index.js文件


####7、代码拆分
RAS系统按照路由对代码进行了拆分，也即pages下的每一个index.js都将生成一个单独的文件

####8、脚手架升级
由于RAS系统还处在不断的升级和优化之中，如何将脚手架最新的设定与功能同步到已经在开发的项目中是大家关注的重点。
实际上，这个功能从一开始设计这个脚手架的时候就已经考虑到了。因此，RAS系统在设计上隔离了系统绝大部分脚手架代码与业务代码（除了部分配置性代码除外）
并提供了yarn updateRAS 命令来实现整个脚手架的核心功能升级，同时也给出了极少部分需要手动升级的操作提示











