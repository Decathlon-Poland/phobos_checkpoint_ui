import {
  RECEIVE_FAILURE_COUNT
} from 'actions'

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_FAILURE_COUNT:
      return {...state,
        failureCount: action.data
      }

    default:
      return state
  }
}
