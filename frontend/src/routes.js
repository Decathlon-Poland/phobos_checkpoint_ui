import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from 'store'
import Layout from 'views/layout'
import EventsSearch from 'views/events-search'
import EventDetails from 'views/event-details'

export const history = syncHistoryWithStore(browserHistory, store)

export default (
  <Router history={history}>
    <Route path='/' component={Layout}>
      <IndexRedirect to='/events' />
      <Route path='/events' component={EventsSearch} />
      <Route path='/events/:id' component={EventDetails} />
    </Route>
  </Router>
)
