import './index.scss'

import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import store from 'store'
import Routes from 'routes'
import { load } from 'configs'

const Root = (
  <Provider store={store}>
    {Routes}
  </Provider>
)

const mountNode = document.getElementById('root')

load()
  .then(() => render(Root, mountNode))
  .catch(() => render(
    <div className='load-error'>Failed to load configs</div>,
    mountNode
  ))
