import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './index.pcss'
class Demo extends Component {
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
        <ul className={style.demos}>
          <li>
            <Link to={'/demo/redux'}>1、Redux 使用方法</Link>
          </li>
          <li>
            <Link to={'/demo/auth'}>2、Auth 使用方法</Link>
          </li>
          <li>
            <Link to={'/demo/menutip'}>3、侧边菜单栏 使用方法</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Demo
