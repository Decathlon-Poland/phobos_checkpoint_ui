import React, { Component, PropTypes } from 'react'

import RefreshIndicator from 'material-ui/RefreshIndicator'
import {
  green400,
  orange400,
  brown800
} from 'material-ui/styles/colors'

const styles = {
  spinner: {
    margin: '50px',
    display: 'inline-block',
    position: 'relative'
  },
  warning: {
    color: brown800,
    backgroundColor: orange400
  },
  success: {
    color: brown800,
    backgroundColor: green400
  }
}

export default class Badge extends Component {
  static get propTypes () {
    return {
      classCondition: PropTypes.bool,
      text: PropTypes.number,
      loading: PropTypes.bool.isRequired
    }
  }

  render () {
    return (
      <div className='badge'
        style={this.props.classCondition ? styles.success : styles.warning}>
        {this.renderContent()}
      </div>
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

    return (
      <div className='badge--text'>
        {this.props.text}
      </div>
    )
  }
}
