
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

具体来说，在上述已经创建的index.js的目录下，创建一个store.js文件，系统将自动创建该文件的代码骨架。在该文件中相应的states, reducers和actions中
填充对应代码后，即可在index.js文件中直接使用。

####4、自动Mock
在src/api/index.js中按照对应格式定义api之后，系统会自动在src/api/mock目录下创建对应的mock文件，填充mock文件中的data字段即可返回mock数据。
本地mock的proxy配置在src/config中地proxyTable字段。默认情况下，本地mock服务运行在http://localhost:10086

####5、







