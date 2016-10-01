import React, { Component, PropTypes } from 'react'
import Event from 'components/event'

export default class extends Component {
  static get propTypes () {
    return {
      events: PropTypes.array
    }
  }

  render () {
    return (
      <div className='events-list'>
        {
          this.props.events.map((event) => (
            <Event
              key={`event-${event.id}`}
              event={event}/>
          ))
        }
      </div>
    )
  }
}
