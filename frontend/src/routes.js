import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'

import store from 'store'
import Layout from 'views/layout'
import EventsSearch from 'views/events/search'
import EventDetails from 'views/events/details'
import FailuresSearch from 'views/failures/search'
import FailureDetails from 'views/failures/details'
import Dashboard from 'views/dashboard'

export const history = syncHistoryWithStore(browserHistory, store)

export default (
  <Router history={history}>
    <Route path='/' component={Layout}>
      <IndexRedirect to='/dashboard' />
      <Route path='/dashboard' component={Dashboard} />
      <Route path='/events' component={EventsSearch} />
      <Route path='/events/:id' component={EventDetails} />
      <Route path='/failures' component={FailuresSearch} />
      <Route path='/failures/:id' component={FailureDetails} />
    </Route>
  </Router>
)
