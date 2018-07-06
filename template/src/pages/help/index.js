import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import style from './style.pcss'

class Help extends Component {
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
            <Link to={'/help/redux'}>1、Redux 使用方法</Link>
          </li>
          <li>
            <Link to={'/help/auth'}>2、Auth 使用方法</Link>
          </li>
          <li>
            <Link to={'/help/menu'}>3、菜单栏 使用方法</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Help
