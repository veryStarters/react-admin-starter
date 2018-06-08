import React, { Component } from 'react'
import { Icon } from 'antd'
import style from './index.pcss'
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
        <section>
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
        <section>
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
              <li>6、部署环境区分问题</li>
            </ul>
            <p>RAS系统将主要围绕上面几个问题来设计整个框架，下文将一一展开。</p>
          </div>
        </section>
        <section>
          <p className={style.title}>1、代码组织结构</p>
          <div className={style.part}>
            <p>对于开发者来说，一个拥有良好代码组织结构的系统往往能起到降低业务耦合和系统复杂度，提升开发效率，愉悦开发体验等众多作用。</p>
          </div>
        </section>
      </div>
    )
  }
}

export default HelpDesign
