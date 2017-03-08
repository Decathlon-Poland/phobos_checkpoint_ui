import React, { Component, PropTypes } from 'react'

export default class extends Component {
  static get propTypes () {
    return {
      label: PropTypes.string,
      value: PropTypes.string
    }
  }

  render () {
    const { label, value, children } = this.props
    const body = children || null
    return (value || body) &&
      <div className='detail'>
        <p><label>{label}</label></p>
        {
          value
            ? <p className='value'>{value}</p>
            : body
        }
      </div>
  }
}
