import React, { Component, PropTypes } from 'react'

export default class EmptyFailure extends Component {
  static get propTypes () {
    return {
      failures: PropTypes.array.isRequired,
      isFetchingEvents: PropTypes.bool.isRequired
    }
  }

  render () {
    return (
      this.props.failures.length === 0 &&
        !this.props.isFetchingEvents &&
        <div className='empty-failure'>
          No failures found
        </div>
    )
  }
}
