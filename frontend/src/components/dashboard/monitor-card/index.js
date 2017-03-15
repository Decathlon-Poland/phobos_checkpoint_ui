import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'

import RefreshIndicator from 'material-ui/RefreshIndicator'
import SyncFailureIcon from 'material-ui/svg-icons/notification/sync-problem'
import LinkIcon from 'material-ui/svg-icons/navigation/arrow-forward'

const styles = {
  spinner: {
    margin: '50px',
    display: 'inline-block',
    position: 'relative'
  },
  icon: {
    margin: '50px',
    width: '50px',
    height: '50px',
    display: 'inline-block',
    position: 'relative'
  }
}

export default class MonitorCard extends Component {
  static get propTypes () {
    return {
      icon: PropTypes.element,
      text: PropTypes.number,
      cardStyle: PropTypes.shape({
        primary: PropTypes.shape({
          backgroundColor: PropTypes.string,
          color: PropTypes.string
        }),
        secondary: PropTypes.shape({
          backgroundColor: PropTypes.string,
          color: PropTypes.string
        })
      }).isRequired,
      hasFailed: PropTypes.bool,
      isLoading: PropTypes.bool.isRequired
    }
  }

  render () {
    return (
      <Paper zDepth={4} className='monitor-card'>
        <div className='content' style={this.props.cardStyle.primary}>
          {this.renderContent()}
        </div>
        <div className='bar' style={this.props.cardStyle.secondary}>
          <div className='bar--text'>
            View failures
          </div>
          <LinkIcon className='bar--link' style={this.props.cardStyle.secondary} />
        </div>
      </Paper>
    )
  }

  renderContent () {
    if (this.props.isLoading) {
      return (
        <div className='page-loader'>
          <RefreshIndicator
            size={50}
            left={0}
            top={0}
            status='loading'
            style={styles.spinner} />
        </div>
      )
    }

    if (this.props.hasFailed) {
      return (
        <SyncFailureIcon className='sync-failed' style={this.props.cardStyle.secondary} />
      )
    }

    return [
      <div className='content--icon'>
        {this.props.icon}
      </div>,
      <div className='monitor'>
        <div className='monitor--value'>
          <div className='monitor-card--text'>
            {this.props.text}
          </div>
        </div>
        <div className='monitor--label'>
          Failures
        </div>
      </div>
    ]
  }
}
