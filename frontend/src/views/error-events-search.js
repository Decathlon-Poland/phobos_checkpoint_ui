import React, { Component } from 'react'
import { connect } from 'react-redux'

class ErrorEventsSearch extends Component {
  render () {
    return (
      <div className='dashboard'>
        <h1>Error events!</h1>
      </div>
    )
  }
}

export default connect(
  (state) => state, {
  }
)(ErrorEventsSearch)
