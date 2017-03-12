import React, { Component, PropTypes } from 'react'

export default class Badge extends Component {
  static get propTypes () {
    return {
      text: PropTypes.string.isRequired
    }
  }

  render () {
    return (
      <div className='badge'>
        {this.props.text}
      </div>
    )
  }
}
