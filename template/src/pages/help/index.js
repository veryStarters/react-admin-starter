import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const style = {
  demos: {
    margin: 0,
    padding: 0,
    li: {
      listStyle: 'none'
    }
  }
}

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
            <Link to={'/demo/redux'}>1、Redux 使用方法</Link>
          </li>
          <li>
            <Link to={'/demo/auth'}>2、Auth 使用方法</Link>
          </li>
          <li>
            <Link to={'/demo/menu'}>3、菜单栏 使用方法</Link>
          </li>
        </ul>
      </div>
    )
  }
}

export default Help
