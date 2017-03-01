import React, { Component, PropTypes } from 'react'
import ErrorSVG from 'material-ui/svg-icons/alert/error'

export default class extends Component {
  static get propTypes () {
    return {
      message: PropTypes.string
    }
  }

  render () {
    return this.props.message ? (
      <div className='failure-error-message'>
        <ErrorSVG style={{marginRight: '10px'}}/>
        <span>{this.props.message}</span>
      </div>
    ) : null
  }
}
