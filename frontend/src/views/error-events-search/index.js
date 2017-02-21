import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import LoadMore from 'components/load-more'
import EmptyEvent from 'components/empty-event'
import EventsList from 'components/events-list'
import SearchInput from 'components/search-input'
import CircularProgress from 'material-ui/CircularProgress'

import { fetchSearchResults } from 'actions/error-events-search'
import { showEventOverview } from 'actions/event-overview'

class ErrorEventsSearch extends Component {
  static get propTypes () {
    return {
      fetchSearchResults: PropTypes.func.isRequired,
      showEventOverview: PropTypes.func.isRequired
    }
  }

  componentDidMount () {
    this.props.events.length === 0 &&
      this.props.fetchSearchResults({ offset: 0 })
  }

  render () {
    const { events } = this.props
    const { type, value } = this.props.eventsFilters

    return (
      <div className='events-search'>
        <SearchInput filterType={type} filterValue={value}/>
        <div>
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

export default connect(
  (state) => state, {
    fetchSearchResults,
    showEventOverview
  }
)(ErrorEventsSearch)
