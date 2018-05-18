import React, { Component } from 'react'
import storeKit from 'storeKit'
import style from './index.pcss'
import api from 'api'

@storeKit(store => {
  return {
    appName: store.global.appName
  }
})
class UserLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: '',
      password: ''
    }
  }
  doLogin = () => {
    let { userName, password } = this.state
    debugger
    api.login({
      userName: userName,
      password: password
    }).then(res => {
      if (res.code === 0 && res.data) {
        location.href = '/'
      }
    })
  }
  changeName = e => {
    this.setState({
      userName: e.target.value
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
              <input type="text" value={this.state.userName} onChange={this.changeName} placeholder="请输入用户名" />
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
