import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'

import { showFailureOverview } from 'actions/failures/overview'
import style from 'components/event/style'

import { Card, CardHeader, CardTitle } from 'material-ui/Card'
import FailureOverviewDialog from 'components/failure/overview-dialog'
// import EventRetryDialog from 'components/event-retry-dialog'

const TIME_FORMAT = 'h:mm:ss a'
const EMPTY_TYPE = '<no type>'

export function formatTime (time) {
  if (!time) return null
  const timeDate = new Date(time)
  return moment(timeDate).format(TIME_FORMAT)
}

export class Failure extends Component {
  static get propTypes () {
    return {
      onShowOverview: PropTypes.func,
      failure: PropTypes.shape({
        id: PropTypes.number,
        created_at: PropTypes.string,
        topic: PropTypes.string,
        group_id: PropTypes.string,
        entity_id: PropTypes.string,
        event_time: PropTypes.string,
        event_type: PropTypes.string,
        event_version: PropTypes.string,
        checksum: PropTypes.string,
        payload: PropTypes.object,
        metadata: PropTypes.object,
        error_class: PropTypes.string,
        error_message: PropTypes.string,
        error_backtrace: PropTypes.array
      })
    }
  }

  static get defaultProps () {
    return {
      failure: {}
    }
  }

  render () {
    return (
      <Card
        className='failure'
        style={style.card}
        onClick={() => this.showOverview()}>
        <CardHeader
          className='failure-header'
          titleStyle={style.cardHeader.title}
          subtitleStyle={style.cardHeader.subtitle}
          title={formatTime(this.props.failure.event_time)}
          subtitle={this.props.failure.topic}/>
        <CardTitle
          titleStyle={style.cardTitle}
          title={this.formattedEventType()}/>
        <FailureOverviewDialog event={this.props.failure} />
        {/* <EventRetryDialog event={this.props.failure} /> */}
      </Card>
    )
  }

  showOverview () {
    this.props.onShowOverview(this.props.failure)
  }

  formattedEventType () {
    return this.props.failure.event_type || EMPTY_TYPE
  }
}

export default connect((state, ownProps) => ownProps, {
  onShowOverview: showFailureOverview
})(Failure)
