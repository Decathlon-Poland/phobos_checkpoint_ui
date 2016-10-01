import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { EVENTS_SEARCH_LIMIT } from 'api'

import EventsList from 'components/events-list'
import SearchInput from 'components/search-input'
import CircularProgress from 'material-ui/CircularProgress'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchSearchResults, loadMoreSearchResults } from 'actions/events-search'
import { changeSearchInputFilterType, changeSearchInputFilterValue } from 'actions/search-input-filter'
import { showEventOverview } from 'actions/event-overview'

export class EventsSearch extends Component {
  static get propTypes () {
    return {
      fetchSearchResults: PropTypes.func.isRequired,
      loadMoreSearchResults: PropTypes.func.isRequired,
      changeSearchInputFilterType: PropTypes.func.isRequired,
      changeSearchInputFilterValue: PropTypes.func.isRequired,
      showEventOverview: PropTypes.func.isRequired
    }
  }

  componentDidMount () {
    const { type, value } = this.props.location.query
    if (type && value) {
      this.props.changeSearchInputFilterType(type)
      this.props.changeSearchInputFilterValue(value)
    }

    this.props.events.length === 0 &&
      this.props.fetchSearchResults({ offset: 0 })
  }

  render () {
    const { events } = this.props
    const { type, value } = this.props.eventsFilters

    return (
      <div className='events-search'>
        <SearchInput filterType={type} filterValue={value}/>
        <div className='timeline'>
          <EventsList events={events} />
          <LoadMore {...this.props} />
          <EmptyEvent
            events={events}
            isFetchingEvents={this.props.xhrStatus.isFetchingEvents}/>
        </div>
        {
          this.isFetchingFirstPage() &&
            <div className='page-loader'>
              <CircularProgress />
            </div>
        }
      </div>
    )
  }

  isFetchingFirstPage () {
    return this.props.xhrStatus.isFetchingEvents &&
      this.props.events.length === 0
  }
}

class LoadMore extends Component {
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
          style={{width: '100%', margin: '0 10px'}}/>
    )
  }
}

class EmptyEvent extends Component {
  static get propTypes () {
    return {
      events: PropTypes.array.isRequired,
      isFetchingEvents: PropTypes.bool.isRequired
    }
  }

  render () {
    return (
      this.props.events.length === 0 &&
        !this.props.isFetchingEvents &&
        <div className='empty-event'>
          No events found
        </div>
    )
  }
}

export default connect(
  (state) => state, {
    fetchSearchResults,
    loadMoreSearchResults,
    changeSearchInputFilterType,
    changeSearchInputFilterValue,
    showEventOverview
  }
)(EventsSearch)
