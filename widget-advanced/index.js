import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import todoApp from './reducers'
import DevTools from './DevTools'

const createFinalStore = compose(
  // Enables your middleware:
  applyMiddleware(), // any Redux middleware, e.g. redux-thunk
  // Provides support for DevTools:
  DevTools.instrument(),
)(createStore);

const store = createFinalStore(todoApp)

const rootElement = document.querySelector('.advanced-simulation')
render(
  <div>
    <Provider store={store}>
      <App />
    </Provider>
    <DevTools store={store}/>
  </div>,
  rootElement
)
