import {
  EVENT_SHOW_OVERVIEW,
  EVENT_HIDE_OVERVIEW,
  RECEIVE_EVENTS_SEARCH_RESULTS
} from 'actions'

function patchEvent (state, action, params) {
  return state.map((event) => {
    if (event.id === action.event.id) {
      return { ...event, ...params }
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

    default:
      return state
  }
}
