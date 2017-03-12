import React, { Component, PropTypes } from 'react'

import CircularProgress from 'material-ui/CircularProgress'

export default class Badge extends Component {
  static get propTypes () {
    return {
      classCondition: PropTypes.bool,
      text: PropTypes.number,
      loading: PropTypes.bool.isRequired
    }
  }

  render () {
    let badgeClass = this.props.classCondition
      ? 'success'
      : 'warning'

    return (
      <div className={`badge badge--${badgeClass}`}>
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
