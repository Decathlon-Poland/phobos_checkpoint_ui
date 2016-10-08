import React, { Component, PropTypes } from 'react'
import moment from 'moment'
import Event from 'components/event'

const SECTION_DATE_FORMAT = 'MMM DD, YYYY'
const EVENT_TIME_FORMAT = 'YYYY-MM-DD'

export default class extends Component {
  static get propTypes () {
    return {
      events: PropTypes.array
    }
  }

  render () {
    return (
      <div className='events-list'>
        <div className='timeline'>
          {this.renderTimeline()}
        </div>
      </div>
    )
  }

  renderTimeline () {
    let day
    let timeline = []

    this.props.events.forEach((event) => {
      const eventDay = formatEventDate(event.event_time)
      if (day !== eventDay) {
        day = eventDay
        timeline.push(this.renderDayHeader(day))
      }

      timeline.push(
        <Event key={`event-${event.id}`} event={event}/>
      )
    })

    return timeline
  }

  renderDayHeader (day) {
    return (
      <div key={`day-header-${day}`} className='day-header'>
        <span className='dot' />
        {formatSectionDate(day)}
      </div>
    )
  }
}

function formatEventDate (eventdate) {
  if (!eventdate) return null
  return moment(new Date(eventdate)).format(EVENT_TIME_FORMAT)
}

function formatSectionDate (date) {
  if (!date) return null
  return moment(new Date(date)).format(SECTION_DATE_FORMAT)
}
