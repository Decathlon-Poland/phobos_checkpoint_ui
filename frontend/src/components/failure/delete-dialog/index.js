import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Loading from 'components/event/loading'

import { hideFailureDelete, performFailureDelete } from 'actions/failures/delete'

import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'

class FailureDeleteDialog extends Component {
  static get propTypes () {
    return {
      onHideDelete: PropTypes.func.isRequired,
      onPerformDelete: PropTypes.func.isRequired,

      isRetryingEvent: PropTypes.bool,
      failure: PropTypes.shape({
        id: PropTypes.number,
        deleteVisible: PropTypes.bool
      }).isRequired
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
        modal={!!this.props.isRetryingEvent}
        title={this.renderTitle()}
        open={!!this.props.failure.deleteVisible}
        bodyStyle={{maxWidth: '300px'}}
        contentStyle={{maxWidth: '300px'}}
        onRequestClose={() => this.hide()}
        actions={[
          <RaisedButton
            primary
            label='Delete'
            disabled={this.props.isRetryingEvent}
            onClick={() => this.performDelete()}/>
        ]}>
        <div style={{textAlign: 'center'}}>
          <Loading visible={this.props.isRetryingEvent}/>
        </div>
      </Dialog>
    )
  }

  renderTitle () {
    if (this.props.isRetryingEvent) {
      return 'Deleting failure...'
    }
    return 'Are you sure?'
  }

  hide () {
    this.props.onHideDelete(this.props.failure)
  }

  performDelete () {
    this.props.onPerformDelete(this.props.failure)
  }
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isRetryingEvent: state.xhrStatus.isRetryingEvent
})

export default connect(mapStateToProps, {
  onHideDelete: hideFailureDelete,
  onPerformDelete: performFailureDelete
})(FailureDeleteDialog)
