import API, { parseResponseError } from 'api'
import { addFlashMessage } from 'actions/flash-messages'

import {
  REQUEST_EVENT_DETAILS,
  RECEIVE_EVENT_DETAILS,
  REQUEST_EVENT_DETAILS_FAILED
} from 'actions'

const requestEventDetails = (event) => ({
  type: REQUEST_EVENT_DETAILS,
  event: event
})

const receiveEventDetails = (data) => ({
  type: RECEIVE_EVENT_DETAILS,
  event: data
})

const requestEventDetailsFailed = (event, error) => ({
  type: REQUEST_EVENT_DETAILS_FAILED,
  event: event,
  error
})

export const fetchEventDetails = (event) => (dispatch, getState) => {
  dispatch(requestEventDetails(event))

  return API.Event
    .findById({ id: event.id })
    .then((response) => dispatch(receiveEventDetails(response.data)))
    .catch((response) => {
      const error = parseResponseError(response)
      return Promise
        .resolve()
        .then(() => dispatch(requestEventDetailsFailed(event, error.message)))
        .then(() => dispatch(addFlashMessage({
          type: 'error',
          text: error.message
        })))
    })
}
