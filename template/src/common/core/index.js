import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import store from './store'
import App from './app'
import registerServiceWorker from './registerServiceWorker'
import setInitState from 'setInitState'

setInitState()

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


