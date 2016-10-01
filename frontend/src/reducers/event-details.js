import {
  EVENT_SHOW_RETRY,
  EVENT_HIDE_RETRY,
  EVENT_HIDE_OVERVIEW,
  RECEIVE_EVENT_DETAILS
} from 'actions'

function patchEvent (state, action, params) {
  if (state.id === action.event.id) {
    return Object.assign(state, params)
  }
  return state
}

export default (state = {}, action) => {
  switch (action.type) {
    case EVENT_SHOW_RETRY:
      return patchEvent(state, action, { retryVisible: true })

    case EVENT_HIDE_RETRY:
      return patchEvent(state, action, { retryVisible: false })

    case EVENT_HIDE_OVERVIEW:
      return {}

    case RECEIVE_EVENT_DETAILS:
      return action.event

    default:
      return state
  }
}
