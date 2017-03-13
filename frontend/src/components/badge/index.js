import React, { Component, PropTypes } from 'react'

import RefreshIndicator from 'material-ui/RefreshIndicator'

const style = {
  spinner: {
    margin: '50px',
    display: 'inline-block',
    position: 'relative'
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
          <RefreshIndicator
            size={50}
            left={0}
            top={0}
            status='loading'
            style={style.spinner} />
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
