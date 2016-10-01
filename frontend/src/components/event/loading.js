import React, { Component, PropTypes } from 'react'
import CircularProgress from 'material-ui/CircularProgress'

export default class extends Component {
  static get propTypes () {
    return {
      visible: PropTypes.bool.isRequired
    }
  }

  render () {
    return this.props.visible
      ? <CircularProgress />
      : null
  }
}
