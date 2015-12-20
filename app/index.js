import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import Main from './main.jsx'
import {trelloApp} from './reducers.js'
import thunk from 'redux-thunk';

const logger = store => next => action => {
  console.log('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  return result
}

const localStorer = store => next => action => {
  let result = next(action)
  window.localStorage['state'] =  window.JSON.stringify(store.getState());
  return result
}

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  logger,
  localStorer
)(createStore);

let store = createStoreWithMiddleware(trelloApp)


let rootElement = document.getElementById('app')
render(
  <Provider store={store}>
    <Main />
  </Provider>,
  rootElement
)
