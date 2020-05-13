import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import notificationReducer from './reducers/notificationReducer'

const reducer = combineReducers({
  notification: notificationReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

console.log(store.getState())
ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))