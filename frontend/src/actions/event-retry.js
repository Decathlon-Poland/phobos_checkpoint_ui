import API, { parseResponseError } from 'api'
import { addFlashMessage } from 'actions/flash-messages'

import {
  EVENT_SHOW_RETRY,
  EVENT_HIDE_RETRY,
  REQUEST_EVENT_RETRY,
  RECEIVE_EVENT_RETRY,
  REQUEST_EVENT_RETRY_FAILED
} from 'actions'

export const showEventRetry = (event) => ({
  type: EVENT_SHOW_RETRY,
  event
})

export const hideEventRetry = (event) => ({
  type: EVENT_HIDE_RETRY,
  event
})

const requestEventRetry = (event) => ({
  type: REQUEST_EVENT_RETRY,
  event: event
})

const receiveEventRetry = (event, data) => ({
  type: RECEIVE_EVENT_RETRY,
  event: event,
  acknowledged: data.acknowledged
})

const requestEventRetryFailed = (event, error) => ({
  type: REQUEST_EVENT_RETRY_FAILED,
  event: event,
  error
})

export const performEventRetry = (event) => (dispatch, getState) => {
  dispatch(requestEventRetry(event))
  return API.Event
    .retry({id: event.id})
    .then((response) => {
      return Promise
        .resolve()
        .then(() => dispatch(receiveEventRetry(event, response.data)))
        .then(() => dispatch(hideEventRetry(event)))
        .then(() => dispatch(addFlashMessage({
          type: 'success',
          text: `Event retried with success. Acknowledged: ${response.data.acknowledged}`,
          autoClose: true
        })))
    })
    .catch((response) => {
      const error = parseResponseError(response)
      dispatch(requestEventRetryFailed(event, error.message))
    })
}
