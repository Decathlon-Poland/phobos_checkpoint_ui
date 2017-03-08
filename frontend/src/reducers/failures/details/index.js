import {
  FAILURE_SHOW_RETRY,
  FAILURE_HIDE_RETRY,
  FAILURE_HIDE_OVERVIEW,
  RECEIVE_FAILURE_DETAILS,
  REQUEST_EVENT_RETRY_FAILED
} from 'actions'

function patchFailure (state, params) {
  return { ...state, ...params }
}

export default (state = {}, action) => {
  switch (action.type) {
    case FAILURE_SHOW_RETRY:
      return patchFailure(state, { retryVisible: true })

    case FAILURE_HIDE_RETRY:
      return patchFailure(state, { retryVisible: false, error: null })

    case FAILURE_HIDE_OVERVIEW:
      return {}

    case RECEIVE_FAILURE_DETAILS:
      return action.failure

    case REQUEST_EVENT_RETRY_FAILED:
      return patchFailure(state, { error: action.error })

    default:
      return state
  }
}
