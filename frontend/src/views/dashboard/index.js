import React, { Component } from 'react'
import { connect } from 'react-redux'

export class Dashboard extends Component {
  render () {
    return (
      <div className='dashboard'>Dashy board</div>
    )
  }
}

export default connect(
  (state) => state, {}
)(Dashboard)
