import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import Badge from 'components/badge'
import Paper from 'material-ui/Paper'
import { fetchFailureCount } from 'actions/dashboard/failure-count'
import { style } from 'views/style'

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
      <Paper zDepth={3} className='dashboard' style={style.view}>
        <div style={style.title}>
          Dashboard
        </div>
        <div style={style.body}>
          <div style={style.row}>
            <div style={style.heading}>
              There are
            </div>
            {
              <Badge
                classCondition={this.props.dashboard.failureCount === 0}
                text={this.props.dashboard.failureCount}
                loading={this.props.xhrStatus.isFetchingFailureCount} />
            }
            <div style={style.altHeading}>
              failures
            </div>
          </div>
        </div>
      </Paper>
    )
  }
}

export default connect(
  (state) => state, {
    fetchFailureCount
  }
)(Dashboard)
