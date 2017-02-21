import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

export class Dashboard extends Component {
  static get propTypes () {
    return {
      failureCount: PropTypes.number.isRequired
    }
  }

  render () {
    return (
      <div className='dashboard'>
        <h1>Failure count</h1>
        <p>{this.props.failureCount} FAILURES</p>
      </div>
    )
  }
}

export default connect(
  (state) => state, {
  }
)(Dashboard)
