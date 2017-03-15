import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import MonitorCard from 'components/dashboard/monitor-card'
import Paper from 'material-ui/Paper'
import FailuresIcon from 'material-ui/svg-icons/communication/call-missed'

import { fetchFailureCount } from 'actions/dashboard/failure-count'
import { style } from 'views/style'
import { failureCardStyle } from 'components/dashboard/monitor-card/failure-style'

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
    this.props.fetchFailureCount()

    this.intervalId = setInterval(() => {
      this.props.fetchFailureCount()
    }, 10000)
  }

  componentWillUnmount () {
    clearInterval(this.intervalId)
  }

  render () {
    return (
      <Paper zDepth={3} className='dashboard' style={style.view}>
        <div style={style.title}>
          Dashboard
        </div>
        <div style={style.body}>
          <div style={style.row}>
            {
              <MonitorCard
                icon={<FailuresIcon style={failureCardStyle.primary} />}
                cardStyle={failureCardStyle}
                cardLabel='View Failures'
                linkPath='/failures'
                monitorLabel='Failures'
                monitorValue={this.props.dashboard.failureCount}
                hasFailed={this.props.xhrStatus.fetchFailureCountFailed}
                isLoading={this.isLoadingFirstPage()} />
            }
          </div>
        </div>
      </Paper>
    )
  }

  isLoadingFirstPage () {
    return this.props.dashboard.failureCount === null && this.props.xhrStatus.isFetchingFailureCount
  }
 }

export default connect(
  (state) => state, {
    fetchFailureCount
  }
)(Dashboard)
