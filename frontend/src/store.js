import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'

import reducer from 'reducers'

const store = createStore(
  reducer,
  {}, // initial state
  compose(
    applyMiddleware(thunkMiddleware), // for async actions
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
)

export default store
