import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { history } from 'routes'

import { fetchFailureDetails } from 'actions/failures/details'
import FailureOverviewDialog from 'components/failure/overview-dialog'
import FailureRetryDialog from 'components/failure/retry-dialog'

class FailureShow extends Component {
  static get propTypes () {
    return {
      fetchFailureDetails: PropTypes.func.isRequired
    }
  }

  componentDidMount () {
    this.props.params.id &&
      this.props.fetchFailureDetails({ id: this.props.params.id })
  }

  componentDidUpdate (prevProps) {
    if (this.isDialogClosed(prevProps)) {
      history.push('/failures')
    }
  }

  render () {
    const details = this.props.failureDetails
    const visible = !!details.id
    const failure = Object.assign({ overviewVisible: visible }, details)

    return (
      <div className='failure-details'>
        <FailureOverviewDialog failure={failure} />
        <FailureRetryDialog failure={failure} />
      </div>
    )
  }

  isDialogClosed (prevProps) {
    return prevProps.failureDetails.id !== undefined &&
      this.props.failureDetails.id === undefined
  }
}

export default connect(
  (state) => state, {
    fetchFailureDetails
  }
)(FailureShow)
