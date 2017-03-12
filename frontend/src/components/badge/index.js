import React, { Component, PropTypes } from 'react'

import CircularProgress from 'material-ui/CircularProgress'

export default class Badge extends Component {
  static get propTypes () {
    return {
      text: PropTypes.string.isRequired,
      loading: PropTypes.bool.isRequired
    }
  }

  render () {
    return (
      <div className='badge'>
        {this.renderContent()}
      </div>
    )
  }

  renderContent () {
    if (this.props.loading) {
      return (
        <div className='page-loader'>
          <CircularProgress />
        </div>
      )
    }

    return this.props.text
  }
}
