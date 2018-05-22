import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import routes from './router'
import Layout from './layout'
import config from 'config'
import { checkLogin, loginMonitor } from 'utils/loginHelper'

class App extends Component {
  componentDidMount() {
    if (location.pathname !== config.loginRoute) {
      loginMonitor(state => {
        if (!state.isLogin) {
          location.href = config.loginRoute
        }
      }, 10)
    } else {
      if (checkLogin()) {
        location.href = config.homeRoute
      }
    }
  }
  render() {
    let singlePages = []
    let others = []
    routes.forEach(item => {
      item.singlePage ? singlePages.push(item) : others.push(item)
    })
    return (
      <Router>
        <Switch>
          {
            singlePages.map((item, index) => {
              let router = {
                key: index,
                path: item.path,
                exact: item.exact,
                onEnter: item.onEnter,
                onLeave: item.onLeave,
                component: item.component
              }
              return <Route {...router} />
            })
          }
          <Layout routes={others}/>
        </Switch>
      </Router>
    )
  }
}

export default App
