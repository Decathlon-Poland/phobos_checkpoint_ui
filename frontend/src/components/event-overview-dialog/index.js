import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { hideEventOverview } from 'actions/event-overview'
import { showEventRetry } from 'actions/event-retry'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import EventOverview from 'components/event-overview'

class OverviewDialog extends Component {
  static get propTypes () {
    return {
      onHideOverview: PropTypes.func,
      onShowRetry: PropTypes.func,
      event: PropTypes.shape({
        id: PropTypes.number,
        group_id: PropTypes.string,
        topic: PropTypes.string,
        entity_id: PropTypes.string,
        event_type: PropTypes.string,
        event_time: PropTypes.string,
        event_version: PropTypes.string,
        checksum: PropTypes.string,
        payload: PropTypes.string,

        overviewVisible: PropTypes.bool
      })
    }
  }

  static get defaultProps () {
    return {
      event: {}
    }
  }

  render () {
    return (
      <Dialog
        modal={false}
        autoScrollBodyContent
        className='event-overview-dialog'
        title={this.dialogTitle()}
        open={!!this.props.event.overviewVisible}
        onRequestClose={() => this.hideOverview()}
        contentStyle={{maxWidth: '1024px'}}
        bodyStyle={{maxWidth: '1024px'}}
        actions={[
          <RaisedButton
            secondary
            label='Retry'
            onClick={() => this.showRetry()}/>
        ]}>
        <EventOverview {...this.props.event} />
      </Dialog>
    )
  }

  hideOverview () {
    this.props.onHideOverview(this.props.event)
  }

  showRetry () {
    this.props.onShowRetry(this.props.event)
  }

  dialogTitle () {
    return (
      <h3>
        <Link className='dialog-title' to={`/events/${this.props.event.id}`}>
          {`#${this.props.event.id}`}
        </Link>
      </h3>
    )
  }
}

export default connect(
  (state, ownProps) => ownProps, {
    onHideOverview: hideEventOverview,
    onShowRetry: showEventRetry
  }
)(OverviewDialog)
