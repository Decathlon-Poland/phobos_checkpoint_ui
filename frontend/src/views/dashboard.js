import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render () {
    return (
      <div className='dashboard'>
      </div>
    )
  }
}

export default connect(
  (state) => state, {
  }
)(Dashboard)
