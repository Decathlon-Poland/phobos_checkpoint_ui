import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Badge from 'components/badge'
import { fetchFailureCount } from 'actions/dashboard/failure-count'

export class Dashboard extends Component {
  static get propTypes () {
    return {
      fetchFailureCount: PropTypes.func.isRequired,

      xhrStatus: PropTypes.shape({
        isFetchingFailureCount: PropTypes.bool
      })
    }
  }

  componentDidMount () {
    !this.props.failureCount &&
      this.props.fetchFailureCount()
  }

  render () {
    return (
      <div className='dashboard'>
        {
          <Badge
            classCondition={this.props.dashboard.failureCount === 0}
            text={this.props.dashboard.failureCount}
            loading={this.props.xhrStatus.isFetchingFailureCount} />
        }
      </div>
    )
  }
}

export default connect(
  (state) => state, {
    fetchFailureCount
  }
)(Dashboard)
