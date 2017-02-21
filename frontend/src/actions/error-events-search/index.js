import API, { EVENTS_SEARCH_LIMIT, parseResponseError } from 'api'
import { addFlashMessage } from 'actions/flash-messages'
import { history } from 'routes'

import {
  TRIGGER_SEARCH,
  REQUEST_SEARCH_RESULTS,
  RECEIVE_SEARCH_RESULTS,
  REQUEST_SEARCH_RESULTS_FAILED,
  LOAD_MORE_SEARCH_RESULTS
} from 'actions'

export const triggerSearch = () => (dispatch, getState) => {
  const filters = getState().eventsFilters
  return Promise
    .resolve()
    .then(() => history.push({ query: filters.value ? filters : {} }))
    .then(() => dispatch({ type: TRIGGER_SEARCH }))
    .then(() => dispatch(fetchSearchResults()))
}

const requestSearchResults = () => ({
  type: REQUEST_SEARCH_RESULTS
})

const receiveSearchResults = (data, offset) => ({
  type: RECEIVE_SEARCH_RESULTS,
  events: data,
  offset
})

const requestSearchResultsFailed = (query, error) => ({
  type: REQUEST_SEARCH_RESULTS_FAILED,
  query,
  error
})

export const fetchSearchResults = () => (dispatch, getState) => {
  dispatch(requestSearchResults())

  const filter = getState().eventsFilters
  const currentOffset = getState().xhrStatus.currentEventsOffset
  const query = filter.value
    ? {[filter.type]: filter.value}
    : {}

  Object.assign(query, { offset: currentOffset })

  return API.Event
    .search(query)
    .then((response) => {
      dispatch(receiveSearchResults(response.data, currentOffset))
    })
    .catch((response) => {
      const error = parseResponseError(response)
      return Promise
        .resolve()
        .then(() => dispatch(requestSearchResultsFailed(query, error.message)))
        .then(() => dispatch(addFlashMessage({
          type: 'error',
          text: `Events search failed. "${error.message}"`
        })))
    })
}

export const loadMoreSearchResults = () => (dispatch, getState) => {
  const currentOffset = getState().xhrStatus.currentEventsOffset
  return Promise
    .resolve()
    .then(() => dispatch({
      type: LOAD_MORE_SEARCH_RESULTS,
      offset: currentOffset + EVENTS_SEARCH_LIMIT
    }))
    .then(() => dispatch(fetchSearchResults()))
}
