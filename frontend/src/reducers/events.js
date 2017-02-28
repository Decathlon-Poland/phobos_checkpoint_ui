import {
  EVENT_SHOW_OVERVIEW,
  EVENT_HIDE_OVERVIEW,
  RECEIVE_EVENTS_SEARCH_RESULTS,
  EVENT_SHOW_RETRY,
  EVENT_HIDE_RETRY,
  RECEIVE_EVENT_RETRY,
  REQUEST_EVENT_RETRY_FAILED
} from 'actions'

function patchEvent (state, action, params) {
  return state.map((event) => {
    if (event.id === action.event.id) {
      return Object.assign({}, event, params)
    }
    return event
  })
}

export default (state = [], action) => {
  switch (action.type) {
    case EVENT_SHOW_OVERVIEW:
      return patchEvent(state, action, { overviewVisible: true })

    case EVENT_HIDE_OVERVIEW:
      return patchEvent(state, action, { overviewVisible: false, error: null })

    case RECEIVE_EVENTS_SEARCH_RESULTS:
      return action.offset <= 0
        ? action.events
        : state.concat(action.events)

    case EVENT_SHOW_RETRY:
      return patchEvent(state, action, { retryVisible: true })

    case EVENT_HIDE_RETRY:
      return patchEvent(state, action, { retryVisible: false, error: null })

    case RECEIVE_EVENT_RETRY:
      return patchEvent(state, action, { acknowledged: action.acknowledged, error: null })

    case REQUEST_EVENT_RETRY_FAILED:
      return patchEvent(state, action, { error: action.error })

    default:
      return state
  }
}
