import {
  EVENT_SHOW_RETRY,
  EVENT_HIDE_RETRY,
  EVENT_HIDE_OVERVIEW,
  RECEIVE_EVENT_DETAILS,
  REQUEST_EVENT_RETRY_FAILED
} from 'actions'

function patchEvent (state, params) {
  return {...state, ...params}
}

export default (state = {}, action) => {
  switch (action.type) {
    case EVENT_SHOW_RETRY:
      return patchEvent(state, { retryVisible: true })

    case EVENT_HIDE_RETRY:
      return patchEvent(state, { retryVisible: false, error: null })

    case EVENT_HIDE_OVERVIEW:
      return {}

    case RECEIVE_EVENT_DETAILS:
      return action.event

    case REQUEST_EVENT_RETRY_FAILED:
      return patchEvent(state, { error: action.error })

    default:
      return state
  }
}
