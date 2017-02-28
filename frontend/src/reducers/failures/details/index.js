import {
  FAILURE_SHOW_RETRY,
  FAILURE_HIDE_RETRY,
  FAILURE_HIDE_OVERVIEW,
  RECEIVE_FAILURE_DETAILS
} from 'actions'

function patchFailure (state, action, params) {
  if (state.id === action.failure.id) {
    return Object.assign(state, params)
  }
  return state
}

export default (state = {}, action) => {
  switch (action.type) {
    case FAILURE_SHOW_RETRY:
      return patchFailure(state, action, { retryVisible: true })

    case FAILURE_HIDE_RETRY:
      return patchFailure(state, action, { retryVisible: false })

    case FAILURE_HIDE_OVERVIEW:
      return {}

    case RECEIVE_FAILURE_DETAILS:
      return action.failure

    default:
      return state
  }
}
