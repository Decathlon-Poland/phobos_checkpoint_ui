import React, { Component, PropTypes } from 'react'
import { EVENTS_SEARCH_LIMIT } from 'api'
import RaisedButton from 'material-ui/RaisedButton'

export default class LoadMore extends Component {
  static get propTypes () {
    return {
      loadMoreSearchResults: PropTypes.func.isRequired,
      xhrStatus: PropTypes.shape({ lastEventsLoadSize: PropTypes.number }).isRequired
    }
  }

  render () {
    return (
      this.props.xhrStatus.lastEventsLoadSize === EVENTS_SEARCH_LIMIT &&
        <RaisedButton
          label='Load more'
          onClick={() => this.props.loadMoreSearchResults()}
          style={{margin: '10px'}}/>
    )
  }
}
