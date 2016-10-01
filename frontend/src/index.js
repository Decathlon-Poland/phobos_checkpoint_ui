import './index.scss'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'

import store from 'store'
import Routes from 'routes'

const Root = (
  <Provider store={store}>
    {Routes}
  </Provider>
)

injectTapEventPlugin()
render(Root, document.getElementById('root'))
