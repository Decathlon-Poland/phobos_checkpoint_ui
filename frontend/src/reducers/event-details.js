import {
  EVENT_HIDE_OVERVIEW,
  RECEIVE_EVENT_DETAILS
} from 'actions'

export default (state = {}, action) => {
  switch (action.type) {
    case EVENT_HIDE_OVERVIEW:
      return {}

    case RECEIVE_EVENT_DETAILS:
      return action.event

    default:
      return state
  }
}
