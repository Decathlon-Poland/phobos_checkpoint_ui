import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import LoadMore from 'components/load-more'
import EmptyFailure from 'components/failure/empty'
import FailuresList from 'components/failures-list'
import SearchInput from 'components/search-input'
import CircularProgress from 'material-ui/CircularProgress'

import { fetchSearchResults, loadMoreSearchResults, triggerSearch } from 'actions/failures/search'
import { changeSearchInputFilterType, changeSearchInputFilterValue } from 'actions/search-input-filter'
import { showEventOverview } from 'actions/event-overview'

export class FailuresSearch extends Component {
  static get propTypes () {
    return {
      fetchSearchResults: PropTypes.func.isRequired,
      loadMoreSearchResults: PropTypes.func.isRequired,
      triggerSearch: PropTypes.func.isRequired,
      changeSearchInputFilterType: PropTypes.func.isRequired,
      changeSearchInputFilterValue: PropTypes.func.isRequired,
      showEventOverview: PropTypes.func.isRequired,

      xhrStatus: PropTypes.shape({
        type: PropTypes.string,
        value: PropTypes.string,
        isFetchingEvents: PropTypes.bool
      }),

      eventsFilters: PropTypes.shape({
        type: PropTypes.string,
        value: PropTypes.string
      }),

      failures: PropTypes.arrayOf(
        PropTypes.shape({
          onShowOverview: PropTypes.func,
          failure: PropTypes.shape({
            id: PropTypes.number,
            created_at: PropTypes.string,
            group_id: PropTypes.string,
            topic: PropTypes.string,
            entity_id: PropTypes.string,
            event_type: PropTypes.string,
            event_time: PropTypes.string,
            event_version: PropTypes.string,
            checksum: PropTypes.string,
            payload: PropTypes.object,
            metadata: PropTypes.object,
            error_class: PropTypes.string,
            error_message: PropTypes.string,
            error_backtrace: PropTypes.array
          })
        })
      ),

      location: PropTypes.shape({
        query: PropTypes.object
      })
    }
  }

  componentDidMount () {
    const { type, value } = this.props.location.query
    if (type && value) {
      this.props.changeSearchInputFilterType(type)
      this.props.changeSearchInputFilterValue(value)
    }

    this.props.failures.length === 0 &&
      this.props.fetchSearchResults({ offset: 0 })
  }

  render () {
    const { failures } = this.props
    const { type, value } = this.props.eventsFilters

    return (
      <div className='failures-search'>
        <SearchInput triggerSearch={this.props.triggerSearch} filterType={type} filterValue={value}/>
        <div>
          <FailuresList failures={failures} />
          <LoadMore {...this.props} />
          <EmptyFailure
            failures={failures}
            isFetchingEvents={this.props.xhrStatus.isFetchingEvents} />
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
    this.props.xhrStatus.isFetchingEvents &&
      this.props.failures.length === 0
  }
}

export default connect(
  (state) => state, {
    fetchSearchResults,
    loadMoreSearchResults,
    triggerSearch,
    changeSearchInputFilterType,
    changeSearchInputFilterValue,
    showEventOverview
  }
)(FailuresSearch)
