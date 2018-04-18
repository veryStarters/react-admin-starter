import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './store'
import App from './app'
import registerServiceWorker from './registerServiceWorker'
import api from 'api'
import config from 'config'

const { global } = store.getState()
const initApp = () => {
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
}

if (!config.needAuth || global.appInitData.permission) {
  initApp()
} else {
  api.getInitState().then(res => {
    if (res.code === 0 && res.data && res.data.permission) {
      store.dispatch({
        type: 'GET_INIT_DATA',
        appInitData: res.data
      })
      initApp()
    } else {
      console.log('当前项目需要权限校验，请增加getInitState接口并返回对应的数据结构。具体数据结构请见README.md！')
    }
  }).catch(e => {
    console.log('接口getInitState异常，请检查后再试！')
  })
}



