import React, { Component } from 'react'
import { Icon, Anchor } from 'antd'
import style from './index.pcss'
const Link = Anchor.Link

class HelpDesign extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <section className={style.anchor}>
          <Anchor>
            <Link href='#intro' title='React Admin Starter（RAS）简介' />
            <Link href='#goal' title='RAS具体要解决什么问题'/>
            <Link href='#structure' title='代码组织结构'/>
            <Link href='#attention' title='开发者关注优化'/>
            <Link href='#efficiency' title='开发效率提升优化'/>
            <Link href='#mock' title='接口数据Mock'/>
          </Anchor>
        </section>
        <section id={'intro'}>
          <p className={style.title}>React Admin Starter（RAS）简介</p>
          <div className={style.part}>
            <p>
              RAS是基于Create React App 和 Ant Design基础之上开发的一套高度自动化的React后台开发框架（最佳实践）。
            </p>
            <p>
              它专注于解决使用React相关技术栈的后台系统在业务开发过程中会碰到的各种开发、测试和部署和调试问题，并试图提供一种『自然简便、合乎直觉』的业务开发模式，从而极大提升开发效率。
            </p>
          </div>
        </section>
        <section id={'goal'}>
          <p className={style.title}>RAS具体要解决什么问题</p>
          <div className={style.part}>
            <p>
              一套成熟、可靠的框架，必须要明确自身的定位，也就是它到底能帮助开发者解决什么样的问题。
            </p>
            <p>
              从简介中我们已经知道，RAS的目标是提供一种『自然简便、合乎直觉』业务开发模式，那到底什么是合乎直觉、自然简便的开发模式呢？
            </p>
            <p>
              我们不妨反过来看看哪些开发场景或者设定是不够自然简便、不合乎直觉的，排除了它们，剩下的当然就是我们所追求和希望的了。
            </p>
            <ul>
              <li>1、使用create react app（cra）创建了一个项目后，面对空荡荡的src目录，我们该如何开始后续的业务开发?</li>
              <li>2、好不容易借鉴了一个社区流行的基于cra的脚手架，发现简单创建一个hello world页面可能都需要创建五个文件夹、修改六个文件…</li>
              <li>3、终于创建好五个文件夹、六个文件了，产品过来说我还要一个hello china页面…<Icon type="meh" /></li>
              <li>4、hello china页面创建成功后，我想显示一个省份列表，但是后端接口却还没有开发…</li>
              <li>5、哼哧哼哧自己模拟了一堆省份数据，产品告诉我只有张三能看到所有省份，李四和王五不能查看港澳台…</li>
              <li>6、终于开发完成了，测试说你得给我搞出几个不同的测试环境、预发环境出来</li>
            </ul>
            <p className={style.subTitle}>
              从上面的这几个场景我们不难归纳出一个框架需要解决的一些通用问题：
            </p>
            <ul>
              <li>1、代码组织结构问题</li>
              <li>2、开发者的关注分离和关注聚焦问题</li>
              <li>3、开发效率问题</li>
              <li>4、接口数据mock问题</li>
              <li>5、访问权限问题</li>
              <li>6、部署问题</li>
            </ul>
            <p>RAS系统将主要围绕上面几个问题来设计整个框架，下文将一一展开。</p>
          </div>
        </section>
        <section id={'structure'}>
          <p className={style.title}>一、代码组织结构</p>
          <div className={style.part}>
            <p>这里讲的代码组织结构，特定是指系统模块的拆分和组合方式。对于开发者来说，一个拥有良好代码组织结构的系统往往能起到降低业务耦合和系统复杂度，提升开发效率，愉悦开发体验等众多作用。</p>
            <p>通常情况下，最基本的代码组织结构有两种，一种是按照业务进行模块划分，A、B业务模块各自包含各自的所有内容；另一种是按照功能类型进行模块划分，A、B业务模块中相同功能类型的组件或者设施放在一起，一个目录中可能包含很多个模块的内容。</p>
            <p>很难一刀切地说这两种代码组织结构孰优孰劣，特定的场景它们可能会表现出特定的优势和劣势。更多的情况是，一个系统往往综合两者的优势进行代码组织，RAS就是这样的一个系统。</p>
            <p className={style.subTitle}>项目整体结构</p>
            <div className={'clearfix'}>
              <img style={{ width: '200px', cssFloat: 'left' }} src={require('../images/dirs.jpg')} alt=""/>
              <div style={{ width: '800px', cssFloat: 'left', marginLeft: '20px' }}>
                <p>1、build：系统编译相关文件</p>
                <p>2、node_modules: npm依赖库</p>
                <p>3、public：无需预处理的相关静态文件</p>
                <p>4、script：相关命令脚本</p>
                <p>其中addone目录为RAS系统为create react app扩展的相关功能目录，用于实现各种自动化及部署功能</p>
                <p>5、src: 项目源文件</p>
                <p>源文件中分成接口、项目小工具、通用、组件、配置以及页面等几个模块, 其中接口、组件等按照功能类型方式进行代码组织；</p>
                <p>业务逻辑、样式、路由以及Redux等则按照业务（页面）进行代码组织。</p>
                <p>6、test: 测试相关文件</p>
              </div>
            </div>
          </div>
        </section>
        <section id={'attention'}>
          <p className={style.title}>二、开发者关注优化</p>
          <div className={style.part}>
            <p>开发者关注可以分为关注分离和关注聚焦两个维度。</p>
            <p>所谓关注分离，是指开发者在某个具体的业务开发过程中最好无需关注系统底层的实现以及其它业务的实现情况；
              而关注聚焦则是指开发者在某个具体的业务开发过程中能够无需分散注意力，在一个有限的关注空间内完成工作。</p>
            <p className={style.subTitle}>关注分离</p>
            <p>所有跟某个具体业务无关的内容，理论上都应该是业务开发人员无需关注的东西。这些内容可以包括代码编译打包、框架核心功能支持等。</p>
            <p>RAS基本就是朝着这个方向去设计整个系统的</p>
          </div>
        </section>
        <section id={'efficiency'}>
          <p className={style.title}>三、提升开发效率</p>
          <div className={style.part}>
            <p>11</p>
          </div>
        </section>
        <section id={'mock'}>
          <p className={style.title}>四、接口数据mock</p>
          <div className={style.part}>
            <p>11</p>
          </div>
        </section>
      </div>
    )
  }
}

export default HelpDesign
