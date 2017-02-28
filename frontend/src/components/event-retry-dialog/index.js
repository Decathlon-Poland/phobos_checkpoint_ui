import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import ErrorMessage from 'components/event/error-message'
import Loading from 'components/event/loading'

import { hideEventRetry, performEventRetry } from 'actions/event-retry'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

class RetryDialog extends Component {
  static get propTypes () {
    return {
      onHideRetry: PropTypes.func.isRequired,
      onPerformRetry: PropTypes.func.isRequired,
      isRetryingEvent: PropTypes.bool,
      event: PropTypes.shape({
        id: PropTypes.number,
        retryVisible: PropTypes.bool
      }).isRequired
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
        modal={!!this.props.isRetryingEvent}
        title='Are you sure?'
        open={!!this.props.event.retryVisible}
        bodyStyle={{maxWidth: '300px'}}
        contentStyle={{maxWidth: '300px'}}
        onRequestClose={() => this.hide()}
        actions={[
          <RaisedButton
            primary
            label='Retry'
            onClick={() => this.performRetry()}/>
        ]}>
        <div style={{textAlign: 'center'}}>
          <Loading visible={this.props.isRetryingEvent}/>
          <ErrorMessage message={this.props.event.error}/>
        </div>
      </Dialog>
    )
  }

  hide () {
    this.props.onHideRetry(this.props.event)
  }

  performRetry () {
    this.props.onPerformRetry(this.props.event)
  }
}

const mapStateToProps = (state, ownProps) => (
  Object.assign({
    isRetryingEvent: state.xhrStatus.isRetryingEvent
  }, ownProps)
)

export default connect(mapStateToProps, {
  onHideRetry: hideEventRetry,
  onPerformRetry: performEventRetry
})(RetryDialog)
