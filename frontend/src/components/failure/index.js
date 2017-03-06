import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { showFailureOverview } from 'actions/failures/overview'
import cardStyle, {
  formatTime,
  formattedEventType
} from 'components/event/card-style'

import { Card, CardHeader, CardTitle } from 'material-ui/Card'
import FailuresIcon from 'material-ui/svg-icons/communication/call-missed'
import FailureOverviewDialog from 'components/failure/overview-dialog'
import FailureRetryDialog from 'components/failure/retry-dialog'
import { red500 } from 'material-ui/styles/colors'

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
        style={cardStyle.card}
        onClick={() => this.showOverview()}>
        <CardHeader
          className='failure-header'
          avatar={<FailuresIcon className='failure-icon' color={red500} />}
          titleStyle={cardStyle.cardHeader.title}
          title={formatTime(this.props.failure.event_time)}
          subtitle={this.props.failure.topic}/>
        <CardTitle
          titleStyle={cardStyle.cardTitle}
          title={formattedEventType(this.props.failure.event_type)}/>
        <FailureOverviewDialog failure={this.props.failure} />
        <FailureRetryDialog failure={this.props.failure} />
      </Card>
    )
  }

  showOverview () {
    this.props.onShowOverview(this.props.failure)
  }
}

export default connect((state, ownProps) => ownProps, {
  onShowOverview: showFailureOverview
})(Failure)
