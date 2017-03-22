import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { history } from 'routes'

import { fetchEventDetails } from 'actions/event-details'
import EventOverviewDialog from 'components/event-overview-dialog'

class EventDetails extends Component {
  static get propTypes () {
    return {
      fetchEventDetails: PropTypes.func.isRequired
    }
  }

  componentDidMount () {
    this.props.params.id &&
      this.props.fetchEventDetails({ id: this.props.params.id })
  }

  componentDidUpdate (prevProps) {
    if (this.isDialogClosed(prevProps)) {
      history.push('/events')
    }
  }

  render () {
    const details = this.props.eventDetails
    const visible = !!details.id
    const event = Object.assign({ overviewVisible: visible }, details)

    return (
      <div className='event-details'>
        <EventOverviewDialog event={event} />
      </div>
    )
  }

  isDialogClosed (prevProps) {
    return prevProps.eventDetails.id !== undefined &&
      this.props.eventDetails.id === undefined
  }
}

export default connect(
  (state) => state, {
    fetchEventDetails
  }
)(EventDetails)
