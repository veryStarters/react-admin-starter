import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from 'common/core/store'
import App from 'common/core/app'
import registerServiceWorker from 'common/core/registerServiceWorker'
import config from 'config'
import setInitState from 'setInitState'

const startApp = () => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <App/>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  )

  if (module.hot && process.env.NODE_ENV === 'development') {
    module.hot.accept('common/core/app', () => {
      const NextApp = require('common/core/app').default
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
}

// 刷新时除登录页外，其余页面均需检查权限
if (config.needAuth && location.pathname !== config.loginRoute) {
  setInitState(() => {
    startApp()
  })
} else {
  startApp()
}




