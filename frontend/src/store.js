import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { browserHistory } from 'react-router'
import thunkMiddleware from 'redux-thunk'

import reducers from 'reducers'

const browserMiddleware = routerMiddleware(browserHistory)

const store = createStore(
  reducers,
  {}, // initial state
  compose(
    applyMiddleware(thunkMiddleware, browserMiddleware), // for async actions
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
)

export default store
