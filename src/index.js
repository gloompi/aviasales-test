import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'
import AppContainer from 'react-hot-loader/lib/AppContainer'
import Routes from './pages/Routes'
import configureStore from './configureStore'

const store = configureStore(window.__INITIAL_STATE__)

const render = App => ReactDOM.hydrate(
  <Provider store={ store }>
    <AppContainer>
      <BrowserRouter>
        <div>{renderRoutes(Routes)}</div>
      </BrowserRouter>
    </AppContainer>
  </Provider>,
  document.getElementById('root')
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./pages/Routes.js', () => {
    const Routes = require('./pages/Routes').default
    render(Routes)
  })
}

render(Routes)