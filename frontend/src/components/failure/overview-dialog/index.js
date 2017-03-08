import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { hideFailureOverview } from 'actions/failures/overview'
import { showFailureRetry } from 'actions/failures/retry'
import { showFailureDelete } from 'actions/failures/delete'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import FailureOverview from 'components/failure/overview'

class FailureOverviewDialog extends Component {
  static get propTypes () {
    return {
      onHideOverview: PropTypes.func,
      onShowRetry: PropTypes.func,
      onShowDelete: PropTypes.func,

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
        error_backtrace: PropTypes.array,

        overviewVisible: PropTypes.bool
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
      <Dialog
        modal={false}
        autoScrollBodyContent
        className='failure-overview-dialog'
        title={this.dialogTitle()}
        open={!!this.props.failure.overviewVisible}
        onRequestClose={() => this.hideOverview()}
        contentStyle={{maxWidth: '1024px'}}
        bodyStyle={{maxWidth: '1024px'}}
        actions={[
          <RaisedButton
            primary
            label='Retry'
            onClick={() => this.showRetry()}/>,
          <RaisedButton
            secondary
            label='Delete'
            onClick={() => this.showDelete()}/>
        ]}>
        <FailureOverview {...this.props.failure} />
      </Dialog>
    )
  }

  hideOverview () {
    this.props.onHideOverview(this.props.failure)
  }

  showRetry () {
    this.props.onShowRetry(this.props.failure)
  }

  showDelete () {
    this.props.onShowDelete(this.props.failure)
  }

  dialogTitle () {
    return (
      <h3>
        <Link className='dialog-title' to={`/failures/${this.props.failure.id}`}>
          {`#${this.props.failure.id}`}
        </Link>
      </h3>
    )
  }
}

export default connect(
  (state, ownProps) => ownProps, {
    onHideOverview: hideFailureOverview,
    onShowRetry: showFailureRetry,
    onShowDelete: showFailureDelete
  }
)(FailureOverviewDialog)
