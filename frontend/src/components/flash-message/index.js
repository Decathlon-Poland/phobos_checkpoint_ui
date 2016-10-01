import React, { Component, PropTypes } from 'react'

export const AUTO_CLOSE_TIMEOUT = 5 * 1000

export default class extends Component {
  static get propTypes () {
    return {
      id: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      onClose: PropTypes.func.isRequired,
      autoClose: PropTypes.bool
    }
  }

  render () {
    return (
      <div className={`flash-message ${this.props.type}`}>
        <span className='text'>{this.props.text}</span>
        {this.closeButton()}
      </div>
    )
  }

  componentDidMount () {
    if (this.props.autoClose) {
      this.timeout = setTimeout(() => this.close(), AUTO_CLOSE_TIMEOUT)
    }
  }

  componentWillUnmount () {
    clearTimeout(this.timeout)
  }

  closeButton () {
    return !this.props.autoClose
      ? <span onClick={() => this.close()} className='close'> &times;</span>
      : null
  }

  close () {
    this.props.onClose &&
      this.props.onClose(this.props.id)
  }
}
