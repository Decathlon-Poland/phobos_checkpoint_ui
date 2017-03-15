import React, { Component, PropTypes } from 'react'
import Paper from 'material-ui/Paper'

import RefreshIndicator from 'material-ui/RefreshIndicator'
import SyncFailureIcon from 'material-ui/svg-icons/notification/sync-problem'
import LinkIcon from 'material-ui/svg-icons/navigation/arrow-forward'
import FailuresIcon from 'material-ui/svg-icons/communication/call-missed'

import {
  indigo700,
  cyan500,
  cyan50,
  cyan700
} from 'material-ui/styles/colors'

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
    color: indigo700,
    display: 'inline-block',
    position: 'relative'
  },
  content: {
    backgroundColor: cyan500,
    color: cyan50
  },
  bar: {
    backgroundColor: cyan700,
    color: cyan50
  }
}

export default class Badge extends Component {
  static get propTypes () {
    return {
      text: PropTypes.number,
      failed: PropTypes.bool,
      loading: PropTypes.bool.isRequired
    }
  }

  render () {
    return (
      <Paper zDepth={4} className='badge'>
        <div className='content' style={styles.content}>
          <FailuresIcon className='content--icon' style={styles.content} />
          <div className='monitor'>
            <div className='monitor--value'>
              {this.renderContent()}
            </div>
            <div className='monitor--label'>
              Failures
            </div>
          </div>
        </div>
        <div className='bar' style={styles.bar}>
          <div className='bar--text'>
            View failures
          </div>
          <LinkIcon className='bar--link' style={styles.bar} />
        </div>
      </Paper>
    )
  }

  renderContent () {
    if (this.props.loading) {
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

    if (this.props.failed) {
      return (
        <SyncFailureIcon className='sync-failed' style={styles.icon} />
      )
    }

    return (
      <div className='badge--text'>
        {this.props.text}
      </div>
    )
  }
}
