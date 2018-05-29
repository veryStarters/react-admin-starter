import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './store'
import App from './app'
import registerServiceWorker from './registerServiceWorker'
import config from 'config'
import setInitState from 'setInitState'

// 刷新时除登录页外，其余页面均需检查权限
if (config.needAuth && location.pathname !== config.loginRoute) {
  setInitState()
}

ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <App/>
    </Provider>
  </AppContainer>,
  document.getElementById('root')
)

if (module.hot && process.env.NODE_ENV === 'development') {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <NextApp/>
        </Provider>
      </AppContainer>,
      document.getElementById('root')
    )
  })
}

registerServiceWorker()


