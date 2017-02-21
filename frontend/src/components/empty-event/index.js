import React, { Component, PropTypes } from 'react'

export default class EmptyEvent extends Component {
  static get propTypes () {
    return {
      events: PropTypes.array.isRequired,
      isFetchingEvents: PropTypes.bool.isRequired
    }
  }

  render () {
    return (
      this.props.events.length === 0 &&
        !this.props.isFetchingEvents &&
        <div className='empty-event'>
          No events found
        </div>
    )
  }
}
