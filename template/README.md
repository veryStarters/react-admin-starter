
## React-Admin-Starter(RAS)


React-Admin-Starter是基于create-react-app基础上封装的一套高度自动化的前端脚手架。
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
2. 启动开发环境（yarn start），该命令会启动2个本地服务：一个是本地开发服务，另一个是本地数据模拟服务,默认端口为10082
3. 找到pages目录，新建一个目录test, 然后在该目录下创建一个index.js文件
4. 不用做任何事情稍等片刻，在浏览器中输入http://localhost:8080/test，见证奇迹的时刻！

###基础

通过上面的演示，我们可以看到，只是创建了一个index.js文件，但是整个系统已经可以跑起来并显示一些界面信息，这得归功于整个脚手架
的全自动模板和配置功能

###1、自动路由


