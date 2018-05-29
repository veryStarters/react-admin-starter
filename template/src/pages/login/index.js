import React, { Component } from 'react'
import storeKit from 'storeKit'
import style from './index.pcss'
import api from 'api'
import { setUserInfo } from 'loginHelper'
import config from 'config'

@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class UserLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }
  doLogin = () => {
    let { username, password } = this.state
    api.login({
      username: username,
      password: password
    }).then(res => {
      if (res.code === 0 && res.data) {
        setUserInfo(res.data)
        location.href = config.homeRoute
      }
    })
  }
  changeName = e => {
    this.setState({
      username: e.target.value
    })
  }
  changePassword = e => {
    this.setState({
      password: e.target.value
    })
  }
  render() {
    return (
      <div className={style.appLogin}>
        <div className={style.loginBox}>
          <p className={style.title}>系统登录</p>
          <form>
            <p>
              <input type="text" value={this.state.username} onChange={this.changeName} placeholder="请输入用户名" />
            </p>
            <p>
              <input type="password" value={this.state.password} onChange={this.changePassword} placeholder="请输入密码" />
            </p>
            <p className={style.tips}>PS: 密码请随意输入</p>
          </form>
          <button onClick={this.doLogin}>登  录</button>
        </div>
      </div>
    )
  }
}

export default UserLogin
